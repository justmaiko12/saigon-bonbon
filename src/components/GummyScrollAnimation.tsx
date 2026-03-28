"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { gummyScroll } from "@/site-content";

export default function GummyScrollAnimation() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [frames, setFrames] = useState<ImageBitmap[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  const isNearView = useInView(containerRef, { margin: "200% 0px" });
  const hasStartedRef = useRef(false);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const textOpacity = useTransform(scrollYProgress, [0.5, 0.7], [0, 1]);
  const textY = useTransform(scrollYProgress, [0.5, 0.7], [40, 0]);

  // Extract frames with black background removal
  useEffect(() => {
    if (!isNearView || hasStartedRef.current) return;
    hasStartedRef.current = true;

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
        if (!cancelled) setHasError(true);
        setIsLoading(false);
        return;
      }

      const w = video.videoWidth;
      const h = video.videoHeight;
      const offscreen = document.createElement("canvas");
      offscreen.width = w;
      offscreen.height = h;
      const ctx = offscreen.getContext("2d", { willReadFrequently: true })!;

      const duration = video.duration;
      const totalFrames = Math.min(Math.floor(duration * 24), 90);
      const extractedFrames: ImageBitmap[] = [];

      for (let i = 0; i < totalFrames; i++) {
        if (cancelled) {
          extractedFrames.forEach((b) => b.close());
          break;
        }

        video.currentTime = (i / totalFrames) * duration;
        await new Promise<void>((resolve) => {
          const onSeeked = () => {
            video?.removeEventListener("seeked", onSeeked);
            resolve();
          };
          video!.addEventListener("seeked", onSeeked, { once: true });
        });

        if (cancelled) {
          extractedFrames.forEach((b) => b.close());
          break;
        }

        ctx.drawImage(video, 0, 0);

        // Remove black background — make dark pixels transparent
        const imageData = ctx.getImageData(0, 0, w, h);
        const data = imageData.data;
        for (let p = 0; p < data.length; p += 4) {
          const r = data[p], g = data[p + 1], b = data[p + 2];
          const brightness = (r + g + b) / 3;
          if (brightness < 25) {
            data[p + 3] = 0; // Fully transparent
          } else if (brightness < 60) {
            data[p + 3] = Math.min(255, (brightness - 25) * (255 / 35)); // Fade in
          }
        }
        ctx.putImageData(imageData, 0, 0);

        const bitmap = await createImageBitmap(offscreen);
        extractedFrames.push(bitmap);
      }

      if (!cancelled && extractedFrames.length > 0) {
        setFrames(extractedFrames);
        setIsLoading(false);
      }
    };

    extract().catch(() => {
      if (!cancelled) {
        setHasError(true);
        setIsLoading(false);
      }
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

  // Render frames on scroll
  useEffect(() => {
    if (frames.length === 0) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = frames[0].width;
    canvas.height = frames[0].height;

    const unsubscribe = scrollYProgress.on("change", (progress) => {
      const frameIndex = Math.min(
        Math.floor(progress * frames.length),
        frames.length - 1
      );
      if (frameIndex >= 0 && frames[frameIndex]) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(frames[frameIndex], 0, 0);
      }
    });

    ctx.drawImage(frames[0], 0, 0);

    return () => {
      unsubscribe();
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

        <canvas
          ref={canvasRef}
          className="w-full h-full object-contain"
          style={{ maxHeight: "100vh" }}
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
