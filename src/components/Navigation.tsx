"use client";

import { motion, useScroll, useMotionValueEvent, AnimatePresence } from "framer-motion";
import { useState } from "react";
import Image from "next/image";

export default function Navigation() {
  const { scrollY } = useScroll();
  const [isScrolled, setIsScrolled] = useState(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    if (latest > 150) {
      setIsScrolled(true);
    } else {
      setIsScrolled(false);
    }
  });

  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>, targetId: string) => {
    e.preventDefault();
    if (targetId === "top") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      const elem = document.getElementById(targetId);
      if (elem) {
        elem.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <>
      {/* Top Banner Navigation */}
      <motion.nav 
        variants={{
          visible: { opacity: 1, y: 0 },
          hidden: { opacity: 0, y: -20 }
        }}
        animate={isScrolled ? "hidden" : "visible"}
        transition={{ duration: 0.3 }}
        className="fixed top-0 left-0 w-full z-[100] pt-8 pb-4 flex justify-center items-center gap-8 md:gap-16 text-white/80 text-xs md:text-sm font-medium tracking-widest uppercase mix-blend-screen"
        style={{ pointerEvents: isScrolled ? "none" : "auto" }}
      >
        <button onClick={(e) => handleScroll(e, 'top')} className="hover:text-white transition-colors cursor-pointer">
          Home
        </button>
        <button onClick={(e) => handleScroll(e, 'about')} className="hover:text-white transition-colors cursor-pointer">
          Our Story
        </button>
        
        {/* Centered Logo */}
        <button onClick={(e) => handleScroll(e, 'top')} className="relative w-32 h-10 md:w-48 md:h-12 mx-4 hover:opacity-80 transition-opacity cursor-pointer">
          <Image 
            src="/assets/logo.png" 
            alt="Saigon Bonbon Logo" 
            fill
            className="object-contain"
            priority
          />
        </button>

        <button onClick={(e) => handleScroll(e, 'flavors')} className="hover:text-white transition-colors cursor-pointer">
          Flavors
        </button>
        <button onClick={(e) => handleScroll(e, 'shop')} className="hover:text-white transition-colors cursor-pointer">
          Shop
        </button>
      </motion.nav>

      {/* Floating Sticky Navigation */}
      <AnimatePresence>
        {isScrolled && (
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            transition={{ duration: 0.4, type: "spring", stiffness: 100 }}
            className="fixed top-6 left-1/2 -translate-x-1/2 z-[100] w-[90%] max-w-4xl bg-black/60 backdrop-blur-xl rounded-full px-6 py-3 flex items-center justify-between shadow-2xl border border-white/20"
          >
            {/* Logo on the left */}
            <button onClick={(e) => handleScroll(e, 'top')} className="relative w-32 h-8 hover:opacity-80 transition-opacity cursor-pointer">
              <Image 
                src="/assets/logo.png" 
                alt="Saigon Bonbon Logo" 
                fill
                className="object-contain object-left mix-blend-screen"
                style={{ mixBlendMode: 'screen' }}
                priority
              />
            </button>
            
            {/* Buy Button on the right */}
            <button 
              onClick={(e) => handleScroll(e, 'shop')}
              className="bg-gradient-to-r from-cyan-200 via-pink-200 to-orange-200 text-black px-6 py-2 rounded-full text-xs font-bold tracking-widest hover:opacity-90 transition-opacity shadow-lg"
            >
              Buy
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}