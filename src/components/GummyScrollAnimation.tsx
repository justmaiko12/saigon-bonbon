"use client";

import { useRef, useEffect, useState, useCallback } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { gummyScroll } from "@/site-content";

export default function GummyScrollAnimation() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [frames, setFrames] = useState<ImageBitmap[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const textOpacity = useTransform(scrollYProgress, [0.6, 0.8], [0, 1]);
  const textY = useTransform(scrollYProgress, [0.6, 0.8], [40, 0]);

  const extractFrames = useCallback(async () => {
    const video = document.createElement("video");
    video.src = gummyScroll.videoSrc;
    video.muted = true;
    video.playsInline = true;
    video.preload = "auto";

    await new Promise<void>((resolve) => {
      video.onloadeddata = () => resolve();
      video.load();
    });

    const canvas = document.createElement("canvas");
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const ctx = canvas.getContext("2d")!;

    const duration = video.duration;
    const totalFrames = Math.min(Math.floor(duration * 30), 120);
    const extractedFrames: ImageBitmap[] = [];

    for (let i = 0; i < totalFrames; i++) {
      video.currentTime = (i / totalFrames) * duration;
      await new Promise<void>((resolve) => {
        video.onseeked = () => resolve();
      });
      ctx.drawImage(video, 0, 0);
      const bitmap = await createImageBitmap(canvas);
      extractedFrames.push(bitmap);
    }

    setFrames(extractedFrames);
    setIsLoading(false);
  }, []);

  useEffect(() => {
    extractFrames();
  }, [extractFrames]);

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

    return () => unsubscribe();
  }, [frames, scrollYProgress]);

  return (
    <section ref={containerRef} className="relative h-[300vh]">
      <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden">
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-8 h-8 border-2 border-white/30 border-t-white rounded-full animate-spin" />
          </div>
        )}

        <canvas
          ref={canvasRef}
          className="w-full h-full object-contain"
          style={{ maxHeight: "100vh" }}
        />

        <motion.div
          className="absolute inset-0 flex flex-col items-center justify-end pb-24 pointer-events-none"
          style={{ opacity: textOpacity, y: textY }}
        >
          <h2 className="font-bolero text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-white font-bold text-center leading-tight tracking-wide drop-shadow-lg">
            {gummyScroll.heading}
          </h2>
          <p className="font-bold text-white/80 text-xs sm:text-sm md:text-base tracking-[0.3em] uppercase mt-4 drop-shadow-md">
            {gummyScroll.subheading}
          </p>
        </motion.div>
      </div>
    </section>
  );
}
