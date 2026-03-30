"use client";

import { useRef, useEffect, useState, useCallback } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { gummyScroll } from "@/site-content";

function isMobile() {
  if (typeof window === "undefined") return false;
  return /iPhone|iPad|iPod|Android/i.test(navigator.userAgent) || window.innerWidth < 768;
}

export default function GummyScrollAnimation() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [frames, setFrames] = useState<ImageBitmap[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [useFallback, setUseFallback] = useState(false);

  const isNearView = useInView(containerRef, { margin: "50% 0px" });
  const hasStartedRef = useRef(false);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const textOpacity = useTransform(scrollYProgress, [0.5, 0.7], [0, 1]);
  const textY = useTransform(scrollYProgress, [0.5, 0.7], [40, 0]);

  // Mobile: use video playback driven by scroll instead of frame extraction
  const mobile = useRef(false);
  useEffect(() => { mobile.current = isMobile(); }, []);

  // Mobile fallback: scrub video by scroll position
  useEffect(() => {
    if (!useFallback) return;
    const vid = videoRef.current;
    if (!vid) return;

    const onReady = () => setIsLoading(false);
    vid.addEventListener("loadeddata", onReady, { once: true });

    // iOS Safari won't preload video — force buffer with a brief play/pause
    let buffering = false;
    if (/iPhone|iPad|iPod/i.test(navigator.userAgent)) {
      buffering = true;
      vid.play().then(() => { vid.pause(); vid.currentTime = 0; buffering = false; }).catch(() => { buffering = false; });
    }

    const unsubscribe = scrollYProgress.on("change", (progress) => {
      if (!buffering && vid.duration && !isNaN(vid.duration)) {
        vid.currentTime = progress * vid.duration;
      }
    });

    return () => {
      unsubscribe();
      vid.removeEventListener("loadeddata", onReady);
    };
  }, [useFallback, scrollYProgress]);

  // Desktop: extract frames with black background removal
  useEffect(() => {
    if (!isNearView || hasStartedRef.current) return;
    hasStartedRef.current = true;

    // Mobile: try frame extraction with lower resolution and fewer frames
    // Only fall back to video scrub if extraction actually fails
    const isMobileDevice = mobile.current;

    let cancelled = false;
    let video: HTMLVideoElement | null = null;

    const extract = async () => {
      video = document.createElement("video");
      video.src = gummyScroll.videoSrc;
      video.muted = true;
      video.playsInline = true;
      video.preload = "auto";
      video.crossOrigin = "anonymous";

      const loaded = await Promise.race([
        new Promise<boolean>((resolve) => {
          video!.onloadeddata = () => resolve(true);
          video!.onerror = () => resolve(false);
          video!.load();
        }),
        new Promise<boolean>((resolve) =>
          setTimeout(() => resolve(false), 10000)
        ),
      ]);

      if (!loaded || cancelled) {
        if (!cancelled) { setUseFallback(true); }
        return;
      }

      // Check if seeking actually works (some browsers don't support it)
      try {
        video.currentTime = 0.1;
        await Promise.race([
          new Promise<void>((resolve) => {
            video!.addEventListener("seeked", () => resolve(), { once: true });
          }),
          new Promise<void>((_, reject) => setTimeout(() => reject(new Error("seek timeout")), 3000)),
        ]);
      } catch {
        // Seeking doesn't work — fall back to video scrub
        if (!cancelled) { setUseFallback(true); }
        return;
      }

      // Lower resolution on mobile (1/3) vs desktop (1/2) for performance
      const divisor = isMobileDevice ? 3 : 2;
      const w = Math.round(video.videoWidth / divisor);
      const h = Math.round(video.videoHeight / divisor);
      const offscreen = document.createElement("canvas");
      offscreen.width = w;
      offscreen.height = h;
      const ctx = offscreen.getContext("2d", { willReadFrequently: true })!;

      const duration = video.duration;
      const fps = isMobileDevice ? 8 : 12;
      const maxFrames = isMobileDevice ? 24 : 36;
      const totalFrames = Math.min(Math.floor(duration * fps), maxFrames);
      const extractedFrames: ImageBitmap[] = [];

      for (let i = 0; i < totalFrames; i++) {
        if (cancelled) {
          extractedFrames.forEach((b) => b.close());
          break;
        }

        video.currentTime = (i / totalFrames) * duration;
        await new Promise<void>((resolve) => {
          video!.addEventListener("seeked", () => resolve(), { once: true });
        });

        if (cancelled) {
          extractedFrames.forEach((b) => b.close());
          break;
        }

        ctx.drawImage(video, 0, 0, w, h);

        // Remove black background — make dark pixels transparent
        const imageData = ctx.getImageData(0, 0, w, h);
        const data = imageData.data;
        for (let p = 0; p < data.length; p += 4) {
          const r = data[p], g = data[p + 1], b = data[p + 2];
          const brightness = (r + g + b) / 3;
          if (brightness < 25) {
            data[p + 3] = 0;
          } else if (brightness < 60) {
            data[p + 3] = Math.min(255, (brightness - 25) * (255 / 35));
          }
        }
        ctx.putImageData(imageData, 0, 0);

        try {
          const bitmap = await createImageBitmap(offscreen);
          extractedFrames.push(bitmap);
        } catch {
          // createImageBitmap not supported — fallback
          if (!cancelled) { setUseFallback(true); }
          extractedFrames.forEach((b) => b.close());
          return;
        }

        // Yield to main thread every few frames
        if (i % 4 === 3) await new Promise<void>((r) => setTimeout(r, 0));
      }

      if (!cancelled && extractedFrames.length > 0) {
        setFrames(extractedFrames);
        setIsLoading(false);
      }
    };

    extract().catch(() => {
      if (!cancelled) setUseFallback(true);
    });

    return () => {
      cancelled = true;
      if (video) {
        video.pause();
        video.src = "";
        video.load();
      }
    };
  }, [isNearView]);

  // Desktop: render frames on scroll
  useEffect(() => {
    if (frames.length === 0) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      const parent = canvas.parentElement;
      if (!parent) return;
      const w = parent.clientWidth;
      const h = parent.clientHeight;
      const dpr = window.devicePixelRatio || 1;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = w + "px";
      canvas.style.height = h + "px";
    };
    resize();
    window.addEventListener("resize", resize);

    const drawFrame = (frame: ImageBitmap) => {
      const cw = canvas.width;
      const ch = canvas.height;
      const fw = frame.width;
      const fh = frame.height;
      const scale = Math.max(cw / fw, ch / fh);
      const sw = fw * scale;
      const sh = fh * scale;
      const sx = (cw - sw) / 2;
      const sy = (ch - sh) / 2;
      ctx.clearRect(0, 0, cw, ch);
      ctx.drawImage(frame, sx, sy, sw, sh);
    };

    const unsubscribe = scrollYProgress.on("change", (progress) => {
      const frameIndex = Math.min(
        Math.floor(progress * frames.length),
        frames.length - 1
      );
      if (frameIndex >= 0 && frames[frameIndex]) {
        drawFrame(frames[frameIndex]);
      }
    });

    drawFrame(frames[0]);

    return () => {
      unsubscribe();
      window.removeEventListener("resize", resize);
      frames.forEach((b) => b.close());
    };
  }, [frames, scrollYProgress]);

  return (
    <section ref={containerRef} className="relative h-[300vh]">
      <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden">
        {isLoading && !hasError && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-8 h-8 border-2 border-white/30 border-t-white rounded-full animate-spin" />
          </div>
        )}

        {/* Desktop: canvas-based frame rendering */}
        {!useFallback && (
          <canvas
            ref={canvasRef}
            className="absolute top-0 left-0"
          />
        )}

        {/* Mobile fallback: direct video scrub */}
        {useFallback && (
          <video
            ref={videoRef}
            src={gummyScroll.videoSrc}
            muted
            playsInline
            preload="auto"
            className="absolute inset-0 w-full h-full object-cover"
          />
        )}

        {/* Overlay text */}
        <motion.div
          className="absolute inset-0 flex flex-col items-center justify-end pb-16 sm:pb-24 pointer-events-none px-4"
          style={{ opacity: textOpacity, y: textY }}
        >
          <h2 className="font-bolero iridescent-text text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-center leading-tight tracking-wide drop-shadow-lg">
            {gummyScroll.heading}
          </h2>
          <p className="font-bold text-white/80 text-[10px] sm:text-sm md:text-base tracking-[0.2em] sm:tracking-[0.3em] uppercase mt-3 sm:mt-4 drop-shadow-md text-center">
            {gummyScroll.subheading}
          </p>
        </motion.div>
      </div>
    </section>
  );
}
