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

  // Mobile fallback: scroll-driven canvas rendering with black background removal
  useEffect(() => {
    if (!useFallback) return;
    const vid = videoRef.current;
    const canvas = canvasRef.current;
    if (!vid || !canvas) return;
    const ctx = canvas.getContext("2d", { willReadFrequently: true });
    if (!ctx) return;

    // Size canvas to parent (half res on mobile for chroma key performance)
    const resize = () => {
      const parent = canvas.parentElement;
      if (!parent) return;
      const w = parent.clientWidth;
      const h = parent.clientHeight;
      const scale = mobile.current ? 0.5 : (window.devicePixelRatio || 1);
      canvas.width = Math.round(w * scale);
      canvas.height = Math.round(h * scale);
      canvas.style.width = w + "px";
      canvas.style.height = h + "px";
    };
    resize();
    window.addEventListener("resize", resize);

    const renderVideoFrame = () => {
      if (vid.videoWidth === 0) return;
      const cw = canvas.width;
      const ch = canvas.height;
      const fw = vid.videoWidth;
      const fh = vid.videoHeight;
      const s = Math.max(cw / fw, ch / fh);
      const sw = fw * s;
      const sh = fh * s;
      ctx.clearRect(0, 0, cw, ch);
      ctx.drawImage(vid, (cw - sw) / 2, (ch - sh) / 2, sw, sh);
      // Remove black background
      const imageData = ctx.getImageData(0, 0, cw, ch);
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
    };

    // Force iOS to buffer the video, then render first frame
    let ready = false;
    const onLoaded = () => {
      ready = true;
      setIsLoading(false);
      renderVideoFrame();
    };
    vid.addEventListener("loadeddata", onLoaded, { once: true });
    vid.play().then(() => { vid.pause(); vid.currentTime = 0; }).catch(() => {});

    // Render on each completed seek
    const onSeeked = () => renderVideoFrame();
    vid.addEventListener("seeked", onSeeked);

    // Seek video on scroll
    const unsubscribe = scrollYProgress.on("change", (progress) => {
      if (ready && vid.duration && !isNaN(vid.duration)) {
        vid.currentTime = progress * vid.duration;
      }
    });

    return () => {
      unsubscribe();
      vid.removeEventListener("loadeddata", onLoaded);
      vid.removeEventListener("seeked", onSeeked);
      window.removeEventListener("resize", resize);
    };
  }, [useFallback, scrollYProgress]);

  // Desktop: extract frames with black background removal
  useEffect(() => {
    if (!isNearView || hasStartedRef.current) return;
    hasStartedRef.current = true;

    // On mobile, skip frame extraction — use autoplay fallback instead
    if (mobile.current) {
      setUseFallback(true);
      return;
    }

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

      // Use half resolution to reduce memory and CPU
      const w = Math.round(video.videoWidth / 2);
      const h = Math.round(video.videoHeight / 2);
      const offscreen = document.createElement("canvas");
      offscreen.width = w;
      offscreen.height = h;
      const ctx = offscreen.getContext("2d", { willReadFrequently: true })!;

      const duration = video.duration;
      const totalFrames = Math.min(Math.floor(duration * 12), 36);
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

        {/* Hidden video source for mobile scroll-driven rendering */}
        <video
          ref={videoRef}
          src={gummyScroll.videoSrc}
          muted
          playsInline
          preload="auto"
          className="absolute inset-0 w-full h-full opacity-0 pointer-events-none"
        />

        {/* Canvas for both desktop (pre-extracted frames) and mobile (live rendering) */}
        <canvas
          ref={canvasRef}
          className="absolute top-0 left-0"
        />

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
