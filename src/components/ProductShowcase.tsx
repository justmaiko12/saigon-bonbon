"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import { useInView } from "framer-motion";
import { ChevronLeft, ChevronRight, RotateCcw } from "lucide-react";
import Image from "next/image";

const flavors = [
  {
    id: "lychee",
    name: "LUSCIOUS LYCHEE ROSE",
    desc: "Light lychee infused with soft floral rose. Modern girl, free spirit, and elegant. As alluring a summer Vietnamese home.",
    bg: "linear-gradient(180deg, #FF107A 0%, #FF5E00 100%)",
    color: "#FF107A",
    nutritionColor: "#FF5E00",
    video: "/assets/lychee-flip.webm"
  },
  {
    id: "mango",
    name: "SPICY MANGO TAMARIND",
    desc: "Juicy mango, tangy tamarind, and a subtle chili kick. Just like the street snacks we used to love.",
    bg: "linear-gradient(180deg, #FF5E00 0%, #67B626 100%)",
    color: "#FF5E00",
    nutritionColor: "#FF5E00",
    video: "/assets/mango-flip.webm"
  },
  {
    id: "coconut",
    name: "COCONUT PANDAN CRUSH",
    desc: "Creamy coconut meets fragrant pandan — smooth, toasty, and unmistakably Southeast Asian. A Vietnamese dessert classic that always hits.",
    bg: "linear-gradient(180deg, #67B626 0%, #009045 100%)",
    color: "#67B626",
    nutritionColor: "#67B626",
    video: "/assets/pandan-flip.webm"
  }
];

export default function ProductShowcase({ setBgColor }: { setBgColor: (color: string) => void }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const backVideoRef = useRef<HTMLVideoElement>(null);
  const reverseReqId = useRef<number | null>(null);
  
  const ref = useRef(null);
  const isInView = useInView(ref, { margin: "-40% 0px" });

  useEffect(() => {
    if (isInView) {
      setBgColor(flavors[currentIndex].bg);
    }
  }, [currentIndex, isInView, setBgColor]);

  const activeFlavor = flavors[currentIndex];

  const handleFlipToBack = () => {
    setIsFlipped(true);
    if (reverseReqId.current) cancelAnimationFrame(reverseReqId.current);
    if (videoRef.current && activeFlavor.video) {
      if (videoRef.current.currentTime === videoRef.current.duration) {
        videoRef.current.currentTime = 0;
      }
      videoRef.current.playbackRate = 2.5; // Speed up video by 2.5x
      videoRef.current.play();
    }
  };

  const handleFlipToFront = () => {
    setIsFlipped(false);
    if (videoRef.current && activeFlavor.video) {
      videoRef.current.pause();
      
      // If the video somehow reset, push it to the end so it can reverse
      if (videoRef.current.currentTime === 0 && videoRef.current.duration > 0) {
        videoRef.current.currentTime = videoRef.current.duration;
      }
      
      let lastTime = performance.now();
      
      const step = (time: number) => {
        if (!videoRef.current) return;
        const dt = (time - lastTime) / 1000;
        lastTime = time;
        
        // Cap dt to prevent massive jumps
        const clampedDt = Math.min(dt, 0.1);
        
        const newTime = videoRef.current.currentTime - (clampedDt * 2.5); // 2.5x speed reverse
        
        if (newTime <= 0) {
          videoRef.current.currentTime = 0;
        } else {
          videoRef.current.currentTime = newTime;
          reverseReqId.current = requestAnimationFrame(step);
        }
      };
      
      reverseReqId.current = requestAnimationFrame(step);
    }
  };

  const next = () => {
    setIsFlipped(false);
    if (reverseReqId.current) cancelAnimationFrame(reverseReqId.current);
    setCurrentIndex((prev) => (prev + 1) % flavors.length);
  };

  const prev = () => {
    setIsFlipped(false);
    if (reverseReqId.current) cancelAnimationFrame(reverseReqId.current);
    setCurrentIndex((prev) => (prev - 1 + flavors.length) % flavors.length);
  };

  return (
    <section ref={ref} className="relative min-h-screen flex flex-col items-center justify-center py-24 px-4 overflow-hidden" id="flavors">
      <div className="w-full max-w-5xl relative scale-[0.85] sm:scale-100 origin-top md:origin-center" style={{ perspective: "2000px" }}>
        
        {/* Floating Pouch Video (Stays on top, outside the CSS flip) */}
        <AnimatePresence mode="wait">
          <motion.div 
            key={`video-${currentIndex}`}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.4 }}
            className={`absolute left-1/2 -translate-x-1/2 md:left-auto md:translate-x-0 md:-left-40 lg:-left-24 top-[10px] sm:top-[5px] md:top-[38%] lg:top-[40%] md:-translate-y-1/2 w-[450px] sm:w-[550px] md:w-[450px] lg:w-[550px] aspect-square z-50 pointer-events-none flex flex-col items-center justify-center transition-colors duration-500 ${!activeFlavor.video ? 'shadow-[0_20px_50px_rgba(0,0,0,0.3)] rounded-2xl overflow-hidden' : ''}`} style={{ backgroundColor: activeFlavor.video ? 'transparent' : activeFlavor.color }}
          >
            {activeFlavor.video ? (
              <video 
                ref={videoRef}
                src={activeFlavor.video}
                className="w-full h-full object-contain"
                muted
                playsInline
              />
            ) : (
              <>
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent pointer-events-none" />
                <span className="text-white font-bolero text-xl md:text-2xl z-10 text-center px-4 leading-tight drop-shadow-md">
                  {activeFlavor.name}<br/>(FRONT POUCH)
                </span>
                {/* Floating Fruits Placeholder */}
                <motion.div 
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-8 -right-8 md:-top-12 md:-right-12 w-24 h-24 md:w-40 md:h-40 bg-white/20 rounded-full blur-2xl pointer-events-none" 
                />
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
              className={`w-[88%] sm:w-[90%] md:w-[85%] lg:w-[75%] p-4 sm:p-6 md:p-16 rounded-[2rem] min-h-[300px] md:min-h-[400px] flex flex-col justify-end md:justify-center relative shadow-2xl transition-colors duration-500 glass-panel pt-[280px] sm:pt-[380px] md:pt-16 mt-0`}
            >
            <div className="w-full flex flex-col items-center md:items-start pt-12 md:pl-[45%] lg:pl-24 md:pt-0">
              
              {/* Shared Layout Title */}
              <motion.h2 
                layout="position"
                key={`title-${currentIndex}`}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="font-bolero text-center md:text-left text-[8vw] sm:text-[6vw] md:text-[2.5vw] lg:text-[1.8rem] xl:text-[2rem] font-bold mb-3 md:mb-6 mt-8 sm:mt-16 md:mt-0 leading-none tracking-wide drop-shadow-sm iridescent-text whitespace-normal md:whitespace-nowrap"
                style={{ paddingRight: '20px' }}
              >
                {activeFlavor.name}&nbsp;
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
                    <p className="text-white/90 text-xs sm:text-sm md:text-lg mb-8 md:mb-12 leading-relaxed font-medium max-w-xl">
                      {activeFlavor.desc}
                    </p>
                  </motion.div>
                ) : (
                  <motion.div
                    key={`back-${currentIndex}`}
                    initial={{ opacity: 0, y: 10, height: 0 }}
                    animate={{ opacity: 1, y: 0, height: "auto" }}
                    exit={{ opacity: 0, y: -10, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="flex flex-col overflow-hidden w-full md:w-[115%] lg:w-full"
                  >
                    {/* Nutrition Badges */}
                    <div className="grid grid-cols-2 lg:flex lg:flex-nowrap items-start lg:items-center justify-items-center lg:justify-start w-full md:pl-[5%] lg:pl-0 max-w-2xl mb-8 md:mb-12 mt-2 md:mt-4 gap-y-6 sm:gap-y-8 gap-x-2 sm:gap-x-4 lg:gap-8">
                      <div className="text-center w-full lg:w-auto">
                        <span className="font-bolero text-[4rem] sm:text-6xl md:text-5xl lg:text-6xl text-white leading-none">4g</span><br/>
                        <span className="text-white/90 text-[13px] sm:text-sm md:text-xs lg:text-sm font-bold tracking-widest mt-1 md:mt-2 block leading-tight uppercase">SUGAR</span>
                      </div>
                      <div className="hidden lg:block w-px h-12 lg:h-20 bg-white/30" />
                      <div className="text-center w-full lg:w-auto">
                        <span className="font-bolero text-[4rem] sm:text-6xl md:text-5xl lg:text-6xl text-white leading-none">100%</span><br/>
                        <span className="text-white/90 text-[13px] sm:text-sm md:text-xs lg:text-sm font-bold tracking-widest mt-1 md:mt-2 block leading-tight uppercase">PLANT<br/>BASED</span>
                      </div>
                      <div className="hidden lg:block w-px h-12 lg:h-20 bg-white/30" />
                      <div className="text-center w-full lg:w-auto">
                        <span className="font-bolero text-[4rem] sm:text-6xl md:text-5xl lg:text-6xl text-white leading-none">10g</span><br/>
                        <span className="text-white/90 text-[13px] sm:text-sm md:text-xs lg:text-sm font-bold tracking-widest mt-1 md:mt-2 block leading-tight uppercase">PREBIOTIC<br/>FIBER</span>
                      </div>
                      <div className="hidden lg:block w-px h-12 lg:h-20 bg-white/30" />
                      <div className="text-center w-full lg:w-auto">
                        <span className="font-bolero text-[4rem] sm:text-6xl md:text-5xl lg:text-6xl text-white leading-none">ZERO</span><br/>
                        <span className="text-white/90 text-[13px] sm:text-sm md:text-xs lg:text-sm font-bold tracking-widest mt-1 md:mt-2 block leading-tight uppercase">SUGAR<br/>ALCOHOLS</span>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <motion.div layout="position" className="flex justify-center md:justify-start w-full">
                <button 
                  onClick={isFlipped ? handleFlipToFront : handleFlipToBack}
                  className="flex items-center gap-2 md:gap-3 px-4 md:px-6 py-2.5 md:py-3.5 rounded-full border border-white/30 text-white hover:bg-white/20 transition-colors text-[10px] md:text-xs font-bold tracking-widest shadow-lg w-fit mt-6 md:mt-0 mb-4 md:mb-0"
                >
                  <RotateCcw size={16} className="w-3 h-3 md:w-4 md:h-4" />
                  {isFlipped ? "DESCRIPTION" : "INGREDIENTS & NUTRITIONAL VALUES"}
                </button>
              </motion.div>

              <AnimatePresence>
                {isFlipped && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    transition={{ duration: 0.3 }}
                    className="absolute right-2 bottom-2 md:right-6 md:bottom-6 pointer-events-none w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 lg:w-[100px] lg:h-[100px] z-10"
                  >
                    <Image 
                      src="/assets/usa-stamp-transparent.png" 
                      alt="Crafted in California Made in USA" 
                      fill
                      className="object-contain drop-shadow-2xl"
                    />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
          </AnimatePresence>
        </div>

        {/* Carousel Controls (Below Card) */}
        <div className="flex items-center justify-center gap-6 mt-16 relative z-10">
          <button onClick={prev} className="w-12 h-12 rounded-full border border-white/30 flex items-center justify-center text-white hover:bg-white/20 transition-colors bg-white/5 backdrop-blur-sm">
            <ChevronLeft size={20} />
          </button>
          <div className="flex gap-3">
            {flavors.map((_, idx) => (
              <div key={idx} className={`h-1.5 rounded-full transition-all duration-300 ${idx === currentIndex ? "w-8 bg-white" : "w-2 bg-white/30"}`} />
            ))}
          </div>
          <button onClick={next} className="w-12 h-12 rounded-full border border-white/30 flex items-center justify-center text-white hover:bg-white/20 transition-colors bg-white/5 backdrop-blur-sm">
            <ChevronRight size={20} />
          </button>
        </div>

      </div>
    </section>
  );
}