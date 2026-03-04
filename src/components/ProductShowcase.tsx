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
    video: null
  },
  {
    id: "coconut",
    name: "COCONUT PANDAN CRUSH",
    desc: "Creamy coconut meets fragrant pandan — smooth, toasty, and unmistakably Southeast Asian. A Vietnamese dessert classic that always hits.",
    bg: "linear-gradient(180deg, #67B626 0%, #009045 100%)",
    color: "#67B626",
    nutritionColor: "#67B626",
    video: null
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
      let lastTime = performance.now();
      
      const step = (time: number) => {
        if (!videoRef.current) return;
        const dt = (time - lastTime) / 1000;
        lastTime = time;
        
        const newTime = videoRef.current.currentTime - (dt * 2.5); // 2.5x speed reverse
        
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
      <div className="w-full max-w-5xl relative" style={{ perspective: "2000px" }}>
        
        {/* Floating Pouch Video (Stays on top, outside the CSS flip) */}
        <div className={`absolute -left-4 md:-left-16 lg:-left-24 top-[45%] md:top-[40%] -translate-y-1/2 w-[350px] md:w-[500px] lg:w-[550px] aspect-square z-50 pointer-events-none flex flex-col items-center justify-center transition-colors duration-500 ${!activeFlavor.video ? 'shadow-[0_20px_50px_rgba(0,0,0,0.3)] rounded-2xl overflow-hidden' : ''}`} style={{ backgroundColor: activeFlavor.video ? 'transparent' : activeFlavor.color }}>
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
              <span className="text-white font-bolero text-2xl z-10 text-center px-4 leading-tight drop-shadow-md">
                {activeFlavor.name}<br/>(FRONT POUCH)
              </span>
              {/* Floating Fruits Placeholder */}
              <motion.div 
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute -top-12 -right-12 w-40 h-40 bg-white/20 rounded-full blur-2xl pointer-events-none" 
              />
            </>
          )}
        </div>

        {/* Main Card Container */}
        <div className="relative w-full flex justify-end">
          <motion.div layout className={`w-full md:w-[85%] lg:w-[75%] p-8 md:p-16 rounded-[2rem] min-h-[400px] flex flex-col justify-center relative shadow-2xl transition-colors duration-500 glass-panel`}>
            <div className="w-full md:pl-16 lg:pl-24 flex flex-col">
              
              {/* Shared Layout Title */}
              <motion.h2 
                layout="position"
                key={`title-${currentIndex}`}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="font-bolero text-2xl md:text-3xl lg:text-4xl font-bold mb-6 leading-tight tracking-wide drop-shadow-sm iridescent-text whitespace-nowrap"
                style={{ paddingRight: '20px' }}
              >
                {activeFlavor.name}
              </motion.h2>

              <AnimatePresence mode="wait">
                {!isFlipped ? (
                  <motion.div
                    key={`front-${currentIndex}`}
                    initial={{ opacity: 0, y: 10, height: 0 }}
                    animate={{ opacity: 1, y: 0, height: "auto" }}
                    exit={{ opacity: 0, y: -10, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="flex flex-col overflow-hidden"
                  >
                    <p className="text-white/90 text-base md:text-lg mb-12 leading-relaxed font-medium max-w-xl">
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
                    className="flex flex-col overflow-hidden"
                  >
                    <p className="text-white/80 text-sm md:text-base mb-8 leading-relaxed font-medium max-w-xl">
                      80 calories per serving bla bla natural bla bla
                    </p>
                    
                    {/* Nutrition Badges */}
                    <div className="flex flex-wrap items-center gap-4 md:gap-8 mb-12">
                      <div className="text-center min-w-[60px]">
                        <span className="font-bolero text-4xl md:text-5xl text-white">4g</span><br/>
                        <span className="text-white/90 text-xs md:text-sm font-bold tracking-widest mt-3 block leading-tight">SUGAR</span>
                      </div>
                      <div className="w-px h-16 bg-white/30 hidden md:block" />
                      <div className="text-center min-w-[60px]">
                        <span className="font-bolero text-4xl md:text-5xl text-white">100%</span><br/>
                        <span className="text-white/90 text-xs md:text-sm font-bold tracking-widest mt-3 block leading-tight">PLANT<br/>BASED</span>
                      </div>
                      <div className="w-px h-16 bg-white/30 hidden md:block" />
                      <div className="text-center min-w-[60px]">
                        <span className="font-bolero text-4xl md:text-5xl text-white">10g</span><br/>
                        <span className="text-white/90 text-xs md:text-sm font-bold tracking-widest mt-3 block leading-tight">PREBIOTIC<br/>FIBER</span>
                      </div>
                      <div className="w-px h-16 bg-white/30 hidden md:block" />
                      <div className="text-center min-w-[60px]">
                        <span className="font-bolero text-4xl md:text-5xl text-white">ZERO</span><br/>
                        <span className="text-white/90 text-xs md:text-sm font-bold tracking-widest mt-3 block leading-tight">SUGAR<br/>ALCOHOLS</span>
                      </div>
                      <div className="ml-auto flex items-center justify-center">
                        <Image 
                          src="/assets/usa-stamp-transparent.png" 
                          alt="Crafted in California Made in USA" 
                          width={100} 
                          height={100}
                          className="object-contain drop-shadow-md"
                        />
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <motion.div layout="position">
                <button 
                  onClick={isFlipped ? handleFlipToFront : handleFlipToBack}
                  className="flex items-center gap-3 px-6 py-3.5 rounded-full border border-white/30 text-white hover:bg-white/20 transition-colors text-xs font-bold tracking-widest shadow-lg w-fit"
                >
                  <RotateCcw size={16} />
                  INGREDIENTS & NUTRITIONAL VALUES
                </button>
              </motion.div>
            </div>
          </motion.div>
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