"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useRef, useCallback } from "react";
import { useInView } from "framer-motion";
import { ChevronLeft, ChevronRight, RotateCcw } from "lucide-react";
import Image from "next/image";
import { flavors, nutritionStats } from "@/site-content";
import { EditableText, EditableImage, Draggable, useEdit } from "@/components/EditMode";

export default function ProductShowcase({ setBgColor }: { setBgColor: (color: string) => void }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const renderLoopRef = useRef<number | null>(null);
  const reverseListenerRef = useRef<(() => void) | null>(null);
  const isRenderingRef = useRef(false);
  const touchStartX = useRef<number | null>(null);
  const { isEditing } = useEdit();

  const ref = useRef(null);
  const isInView = useInView(ref, { margin: "-40% 0px" });

  const chromaKey = useCallback((data: Uint8ClampedArray) => {
    for (let i = 0; i < data.length; i += 4) {
      const r = data[i], g = data[i + 1], b = data[i + 2];
      const maxRG = r > g ? r : g; // avoid Math.max for speed
      const blueDom = b - maxRG;
      if (blueDom > 60) {
        data[i + 3] = 0;
      } else if (blueDom > 10) {
        const t = (blueDom - 10) * 0.02; // /50
        data[i] = r + (220 - r) * t | 0;
        data[i + 1] = g + (90 - g) * t | 0;
        data[i + 2] = b - blueDom * t | 0;
      }
    }
  }, []);

  const renderFrame = useCallback((halfRes?: boolean) => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    if (!video || !canvas || video.videoWidth === 0) return;
    const ctx = canvas.getContext('2d', { willReadFrequently: true });
    if (!ctx) return;
    // Use half resolution during animation for performance
    const full = video.videoWidth;
    const size = halfRes ? full >> 1 : full;
    if (canvas.width !== size || canvas.height !== size) { canvas.width = size; canvas.height = size; }
    ctx.clearRect(0, 0, size, size);
    ctx.drawImage(video, 0, 0, size, size);
    const imageData = ctx.getImageData(0, 0, size, size);
    chromaKey(imageData.data);
    ctx.putImageData(imageData, 0, 0);
  }, [chromaKey]);

  const startRenderLoop = useCallback(() => {
    if (isRenderingRef.current) return;
    isRenderingRef.current = true;
    const loop = () => { renderFrame(true); if (isRenderingRef.current) { renderLoopRef.current = requestAnimationFrame(loop); } };
    renderLoopRef.current = requestAnimationFrame(loop);
  }, [renderFrame]);

  const stopRenderLoop = useCallback(() => {
    isRenderingRef.current = false;
    if (renderLoopRef.current) { cancelAnimationFrame(renderLoopRef.current); renderLoopRef.current = null; }
    renderFrame(false); // final frame at full resolution
  }, [renderFrame]);

  // Render first frame when the video element is ready — called directly from the element,
  // so it works regardless of AnimatePresence exit/enter timing
  const handleVideoReady = useCallback(() => {
    const video = videoRef.current;
    if (!video || video.videoWidth === 0) return;
    // Video naturally starts at position 0, just render the current frame
    renderFrame(false);
  }, [renderFrame]);

  useEffect(() => {
    if (isInView) setBgColor(flavors[currentIndex].bg);
  }, [currentIndex, isInView, setBgColor]);

  const activeFlavor = flavors[currentIndex];

  // Clean up any active reverse seek listener
  const cleanupReverse = useCallback(() => {
    if (reverseListenerRef.current && videoRef.current) {
      videoRef.current.removeEventListener('seeked', reverseListenerRef.current);
      reverseListenerRef.current = null;
    }
  }, []);

  const handleFlipToBack = () => {
    setIsFlipped(true); setIsAnimating(true);
    cleanupReverse();
    const vid = videoRef.current;
    if (vid && activeFlavor.video) {
      vid.onended = () => { stopRenderLoop(); setIsAnimating(false); };
      vid.playbackRate = 2.6;

      // Don't set currentTime = 0 if already there (no-op in some browsers).
      // After handleFlipToFront or initial load, video is already at 0.
      const doPlay = () => {
        startRenderLoop();
        vid.play().catch(() => {});
      };

      if (vid.readyState >= 3) {
        doPlay();
      } else {
        const onReady = () => {
          vid.removeEventListener('canplay', onReady);
          doPlay();
        };
        vid.addEventListener('canplay', onReady);
        setTimeout(() => {
          vid.removeEventListener('canplay', onReady);
          doPlay();
        }, 300);
      }
    }
  };

  const handleFlipToFront = () => {
    setIsFlipped(false);
    cleanupReverse();
    const vid = videoRef.current;
    if (!vid || !activeFlavor.video) return;
    vid.pause();
    vid.onended = null;

    const totalDuration = vid.duration;
    if (!totalDuration || isNaN(totalDuration)) { stopRenderLoop(); setIsAnimating(false); return; }

    const endPos = vid.currentTime > 0.1 ? vid.currentTime : totalDuration;
    const steps = 20;
    const seekTargets: number[] = [];
    for (let s = steps - 1; s >= 0; s--) {
      seekTargets.push((endPos * s) / steps);
    }
    seekTargets.push(0);

    let stepIdx = 0;
    startRenderLoop();

    const onSeeked = () => {
      stepIdx++;
      if (stepIdx >= seekTargets.length) {
        vid.removeEventListener('seeked', onSeeked);
        reverseListenerRef.current = null;
        vid.currentTime = 0;
        stopRenderLoop();
        setIsAnimating(false);
      } else {
        vid.currentTime = seekTargets[stepIdx];
      }
    };

    reverseListenerRef.current = onSeeked;
    vid.addEventListener('seeked', onSeeked);
    vid.currentTime = seekTargets[0];
  };

  const next = () => { setIsFlipped(false); setIsAnimating(false); stopRenderLoop(); cleanupReverse(); setCurrentIndex((prev) => (prev + 1) % flavors.length); };
  const prev = () => { setIsFlipped(false); setIsAnimating(false); stopRenderLoop(); cleanupReverse(); setCurrentIndex((prev) => (prev - 1 + flavors.length) % flavors.length); };

  return (
    <section
      ref={ref}
      className="relative min-h-screen flex flex-col items-center justify-center pt-24 pb-8 px-4 overflow-hidden"
      id="flavors"
      onTouchStart={(e) => { touchStartX.current = e.touches[0].clientX; }}
      onTouchEnd={(e) => {
        if (touchStartX.current === null) return;
        const diff = e.changedTouches[0].clientX - touchStartX.current;
        touchStartX.current = null;
        if (Math.abs(diff) > 50) { if (diff < 0) next(); else prev(); }
      }}
    >
      <div className="w-full max-w-5xl relative scale-[0.85] sm:scale-100 origin-top md:origin-center" style={{ perspective: "2000px" }}>

        {/* Floating Pouch — NO Draggable wrapping canvas/video to avoid breaking positioning */}
        <AnimatePresence mode="wait">
          <motion.div
            key={`video-${currentIndex}`}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.4 }}
            className={`absolute left-1/2 -translate-x-1/2 md:left-auto md:translate-x-0 md:-left-56 lg:-left-24 top-[-65px] sm:top-[-75px] md:top-[26%] lg:top-[28%] md:-translate-y-1/2 w-[500px] sm:w-[600px] md:w-[500px] lg:w-[600px] aspect-square z-50 pointer-events-none flex flex-col items-center justify-center transition-colors duration-500 ${!activeFlavor.video ? 'shadow-[0_20px_50px_rgba(0,0,0,0.3)] rounded-2xl overflow-hidden' : ''}`}
            style={{ backgroundColor: activeFlavor.video ? 'transparent' : activeFlavor.color }}
          >
            {activeFlavor.video ? (
              <>
                <video
                  ref={videoRef}
                  className="absolute top-0 left-0 w-full h-full opacity-0 pointer-events-none"
                  muted
                  playsInline
                  preload="auto"
                  onLoadedData={handleVideoReady}
                  onCanPlay={handleVideoReady}
                >
                  <source src={activeFlavor.video} type={activeFlavor.video.endsWith('.webm') ? 'video/webm' : 'video/mp4'} />
                </video>
                <canvas ref={canvasRef} className="w-full h-full object-contain" />
                {!isAnimating && activeFlavor.poster && (
                  isEditing ? (
                    <div className="absolute inset-0 z-10 pointer-events-auto">
                      <EditableImage id={`flavor-poster-${activeFlavor.id}`} src={activeFlavor.poster} alt={activeFlavor.name} fill className="object-contain" />
                    </div>
                  ) : (
                    <Image src={activeFlavor.poster} alt={activeFlavor.name} fill className="object-contain z-10" priority />
                  )
                )}
              </>
            ) : (
              <>
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent pointer-events-none" />
                <span className="text-white font-bolero text-xl md:text-2xl z-10 text-center px-4 leading-tight drop-shadow-md">
                  {activeFlavor.name}<br/>(FRONT POUCH)
                </span>
                <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="absolute -top-8 -right-8 md:-top-12 md:-right-12 w-24 h-24 md:w-40 md:h-40 bg-white/20 rounded-full blur-2xl pointer-events-none" />
              </>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Main Card Container */}
        <div className="relative w-full flex justify-center lg:justify-end mt-[80px] sm:mt-[200px] md:mt-0">
          <AnimatePresence mode="wait">
            <motion.div
              key={`card-${currentIndex}`}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              layout
              className="w-[88%] sm:w-[90%] md:w-[85%] lg:w-[75%] p-4 sm:p-6 md:p-16 min-h-[300px] md:min-h-[400px] flex flex-col justify-end md:justify-center relative shadow-2xl transition-colors duration-500 glass-panel pt-[280px] sm:pt-[380px] md:pt-16 mt-0"
              style={{ borderRadius: "var(--flavor-card-radius)" }}
            >
              <div className="w-full flex flex-col items-center md:items-start pt-12 md:pl-[50%] lg:pl-24 md:pt-0 relative z-[60]">

                <motion.h2
                  layout="position"
                  key={`title-${currentIndex}`}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="font-bolero text-center md:text-left text-[8vw] sm:text-[6vw] md:text-[5.5vw] lg:text-[1.8rem] xl:text-[2rem] font-bold mb-3 md:mb-6 mt-8 sm:mt-16 md:mt-0 leading-none tracking-wide drop-shadow-sm iridescent-text whitespace-normal lg:whitespace-nowrap translate-x-3 md:translate-x-0"
                  style={{ paddingRight: '20px' }}
                >
                  <EditableText id={`flavor-name-${activeFlavor.id}`}>{activeFlavor.name}</EditableText>&nbsp;
                </motion.h2>

                <AnimatePresence mode="wait">
                  {!isFlipped ? (
                    <motion.div
                      key={`front-${currentIndex}`}
                      initial={{ opacity: 0, y: 10, height: 0 }}
                      animate={{ opacity: 1, y: 0, height: "auto" }}
                      exit={{ opacity: 0, y: -10, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="flex flex-col overflow-hidden items-center md:items-start text-center md:text-left"
                    >
                      <EditableText id={`flavor-desc-${activeFlavor.id}`} as="p" className="text-white/90 text-xs sm:text-sm md:text-lg mb-8 md:mb-12 leading-relaxed font-medium max-w-xl">
                        {activeFlavor.desc}
                      </EditableText>
                    </motion.div>
                  ) : (
                    <motion.div
                      key={`back-${currentIndex}`}
                      initial={{ opacity: 0, y: 10, height: 0 }}
                      animate={{ opacity: 1, y: 0, height: "auto" }}
                      exit={{ opacity: 0, y: -10, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="flex flex-col overflow-y-hidden overflow-x-visible w-full md:w-[115%] lg:w-full md:-ml-8 lg:ml-0"
                    >
                      <div className="grid grid-cols-2 lg:flex lg:flex-nowrap items-start lg:items-center justify-items-center lg:justify-start w-full md:pl-0 lg:pl-0 max-w-2xl mb-8 md:mb-12 mt-2 md:mt-4 gap-y-6 sm:gap-y-8 gap-x-2 sm:gap-x-4 lg:gap-8">
                        {nutritionStats.map((stat, i) => (
                          <div key={i} className="contents">
                            <div className="text-center w-full lg:w-auto">
                              <EditableText id={`nutrition-value-${i}`} className="font-bolero text-[4rem] sm:text-6xl md:text-5xl lg:text-6xl text-white leading-none">{stat.value}</EditableText>
                              <br/>
                              <EditableText id={`nutrition-label-${i}`} className="text-white/90 text-[13px] sm:text-sm md:text-xs lg:text-sm font-bold tracking-widest mt-1 md:mt-2 block leading-tight uppercase">{stat.label}</EditableText>
                            </div>
                            {i < nutritionStats.length - 1 && <div className="hidden lg:block w-px h-12 lg:h-20 bg-white/30" />}
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                <motion.div layout="position" className="flex justify-center md:justify-start w-full">
                  <motion.button
                    onClick={isFlipped ? handleFlipToFront : handleFlipToBack}
                    animate={!isFlipped ? { opacity: [0.7, 1, 0.7] } : { opacity: 1 }}
                    transition={!isFlipped ? { duration: 2, repeat: 2, ease: "easeInOut" } : {}}
                    className="flex items-center gap-2 md:gap-3 px-4 md:px-6 py-2.5 md:py-3.5 rounded-full border border-white/30 bg-white/10 hover:bg-white/20 text-white transition-colors text-[10px] md:text-xs font-bold tracking-widest shadow-lg w-fit mt-6 md:mt-0 mb-4 md:mb-0"
                  >
                    <RotateCcw size={16} className="w-3 h-3 md:w-4 md:h-4" />
                    <EditableText id="flavor-flip-btn">{isFlipped ? "DESCRIPTION" : "INGREDIENTS & NUTRITIONAL VALUES"}</EditableText>
                  </motion.button>
                </motion.div>

                <AnimatePresence>
                  {isFlipped && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      transition={{ duration: 0.3 }}
                      className="absolute right-3 bottom-3 md:right-4 md:bottom-4 pointer-events-none w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 lg:w-[70px] lg:h-[70px] z-10"
                    >
                      <Image src="/assets/usa-stamp-transparent.png" alt="Crafted in California Made in USA" fill className="object-contain drop-shadow-2xl" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Carousel Controls */}
        <div className="flex items-center justify-center gap-6 mt-16 relative z-10">
          <button onClick={prev} className="w-12 h-12 rounded-full border border-white/30 flex items-center justify-center text-white hover:bg-white/20 transition-colors bg-white/5 backdrop-blur-sm"><ChevronLeft size={20} /></button>
          <div className="flex gap-3">
            {flavors.map((_, idx) => (<div key={idx} className={`h-1.5 rounded-full transition-all duration-300 ${idx === currentIndex ? "w-8 bg-white" : "w-2 bg-white/30"}`} />))}
          </div>
          <button onClick={next} className="w-12 h-12 rounded-full border border-white/30 flex items-center justify-center text-white hover:bg-white/20 transition-colors bg-white/5 backdrop-blur-sm"><ChevronRight size={20} /></button>
        </div>

      </div>
    </section>
  );
}
