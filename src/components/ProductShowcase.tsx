"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import { useInView } from "framer-motion";
import { ChevronLeft, ChevronRight, RotateCcw } from "lucide-react";

const flavors = [
  {
    id: "lychee",
    name: "LUSCIOUS LYCHEE ROSE",
    desc: "Light lychee infused with soft floral rose. Modern girl, free spirit, and elegant. As alluring a summer Vietnamese home.",
    bg: "linear-gradient(180deg, #FF107A 0%, #FF5E00 100%)",
    color: "#FF107A"
  },
  {
    id: "mango",
    name: "SPICY MANGO TAMARIND",
    desc: "Juicy mango, tangy tamarind, and a subtle chili kick. Just like the street snacks we used to love.",
    bg: "linear-gradient(180deg, #FF5E00 0%, #67B626 100%)",
    color: "#FF5E00"
  },
  {
    id: "coconut",
    name: "COCONUT PANDAN CRUSH",
    desc: "Creamy coconut meets fragrant pandan — smooth, toasty, and unmistakably Southeast Asian. A Vietnamese dessert classic that always hits.",
    bg: "linear-gradient(180deg, #67B626 0%, #009045 100%)",
    color: "#67B626"
  }
];

export default function ProductShowcase({ setBgColor }: { setBgColor: (color: string) => void }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  
  const ref = useRef(null);
  const isInView = useInView(ref, { margin: "-40% 0px" });

  useEffect(() => {
    if (isInView) {
      setBgColor(flavors[currentIndex].bg);
    }
  }, [currentIndex, isInView, setBgColor]);

  const activeFlavor = flavors[currentIndex];

  const next = () => {
    setIsFlipped(false);
    setCurrentIndex((prev) => (prev + 1) % flavors.length);
  };

  const prev = () => {
    setIsFlipped(false);
    setCurrentIndex((prev) => (prev - 1 + flavors.length) % flavors.length);
  };

  return (
    <section ref={ref} className="relative min-h-screen flex items-center justify-center py-24 px-4" id="flavors">
      <div className="w-full max-w-6xl flex flex-col md:flex-row items-center gap-12 md:gap-24">
        
        {/* Left Side: Product Pouch (3D Flip) */}
        <div className="w-full md:w-1/2 flex justify-center" style={{ perspective: "1000px" }}>
          <motion.div
            className="relative w-[300px] h-[400px] cursor-pointer"
            style={{ transformStyle: "preserve-3d" }}
            animate={{ rotateY: isFlipped ? 180 : 0 }}
            transition={{ duration: 0.8, type: "spring", stiffness: 70, damping: 15 }}
            onClick={() => setIsFlipped(!isFlipped)}
          >
            {/* Front Side */}
            <div className="absolute inset-0 flex items-center justify-center" style={{ backfaceVisibility: "hidden" }}>
              {/* Product Placeholder Card */}
              <div className="w-full h-full rounded-2xl shadow-2xl flex flex-col items-center justify-center relative overflow-hidden transition-colors duration-500" style={{ backgroundColor: activeFlavor.color }}>
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent pointer-events-none" />
                <span className="text-white font-bold text-xl z-10 text-center px-4">
                  {activeFlavor.name}<br/>(FRONT)
                </span>
                
                {/* Floating Fruits Placeholder */}
                {!isFlipped && (
                  <motion.div 
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-8 -right-8 w-32 h-32 bg-white/20 rounded-full blur-2xl pointer-events-none" 
                  />
                )}
              </div>
            </div>

            {/* Back Side */}
            <div className="absolute inset-0 flex items-center justify-center" style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}>
               {/* Nutritional Info Placeholder Card */}
               <div className="w-full h-full bg-[#1A1A1A] rounded-2xl border border-white/10 shadow-2xl flex flex-col items-center justify-center p-6">
                <h3 className="text-white font-bold mb-4 tracking-wider text-sm">NUTRITION FACTS</h3>
                <div className="w-full h-48 bg-white/5 rounded-lg border border-white/10 flex items-center justify-center">
                  <span className="text-white/30 text-xs">Ingredients Data</span>
                </div>
                <p className="text-white/40 text-xs mt-6 text-center uppercase tracking-widest">Click to flip back</p>
               </div>
            </div>
          </motion.div>
        </div>

        {/* Right Side: Text & Controls */}
        <div className="w-full md:w-1/2 text-left">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.4 }}
              className="glass-panel p-8 md:p-12 rounded-3xl"
            >
              <h2 className="font-bolero text-3xl md:text-5xl font-bold text-white mb-6 leading-tight">
                {activeFlavor.name}
              </h2>
              <p className="text-white/90 text-base md:text-lg mb-10 leading-relaxed font-medium">
                {activeFlavor.desc}
              </p>

              <button 
                onClick={() => setIsFlipped(!isFlipped)}
                className="flex items-center gap-3 px-6 py-3.5 rounded-full border border-white/30 text-white hover:bg-white/10 transition-colors text-xs font-bold tracking-widest"
              >
                <RotateCcw size={16} />
                INGREDIENTS & NUTRITIONAL VALUES
              </button>
            </motion.div>
          </AnimatePresence>

          {/* Carousel Controls */}
          <div className="flex items-center gap-6 mt-8 ml-2">
            <button onClick={prev} className="w-12 h-12 rounded-full border border-white/30 flex items-center justify-center text-white hover:bg-white/20 transition-colors">
              <ChevronLeft size={20} />
            </button>
            <div className="flex gap-2">
              {flavors.map((_, idx) => (
                <div key={idx} className={`h-1.5 rounded-full transition-all duration-300 ${idx === currentIndex ? "w-8 bg-white" : "w-2 bg-white/30"}`} />
              ))}
            </div>
            <button onClick={next} className="w-12 h-12 rounded-full border border-white/30 flex items-center justify-center text-white hover:bg-white/20 transition-colors">
              <ChevronRight size={20} />
            </button>
          </div>
        </div>

      </div>
    </section>
  );
}