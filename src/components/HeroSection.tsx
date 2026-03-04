"use client";

import { motion } from "framer-motion";
import { useEffect } from "react";

export default function HeroSection({ setBgColor }: { setBgColor: (color: string) => void }) {
  // Set hero bg color when in view
  useEffect(() => {
    // Pink to Orange gradient for Hero
    setBgColor("linear-gradient(180deg, #FF107A 0%, #FF5E00 100%)");
  }, [setBgColor]);

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center pt-24 pb-12 px-6">
      
      {/* Background Video Placeholder */}
      <div className="absolute inset-0 overflow-hidden -z-10 flex items-center justify-center pointer-events-none opacity-20">
        <p className="text-white/50 text-2xl absolute font-mono">Lion Dance Video Placeholder</p>
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="text-center z-10 flex flex-col items-center"
      >
        <p className="text-white font-serif italic text-sm md:text-base mb-2 uppercase font-bold tracking-[0.1em]">Introducing</p>
        <h2 className="font-serif text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-2 tracking-wide">
          SAIGON BONBON
        </h2>
        <h1 className="font-serif text-6xl md:text-8xl lg:text-[7rem] font-bold iridescent-animated-text mb-8 leading-[0.9]">
          THIS IS<br/>OUR FLAVOR.
        </h1>
      </motion.div>

      {/* Glassmorphic Intro Card */}
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.5 }}
        className="glass-panel max-w-2xl p-8 md:p-10 rounded-3xl mt-12 text-center shadow-2xl"
      >
        <p className="text-white/90 text-sm md:text-base leading-relaxed mb-6 font-medium">
          Saigon Bonbon is a Vietnamese-American company rooted in something universal — the desire to celebrate who we are, fully and unapologetically. Our roots shape us, and our joy is meant to be shared.
        </p>
        <p className="text-white/90 text-sm md:text-base leading-relaxed mb-6 font-medium">
          Our iconic gummy and mascot, Lan, embodies that spirit. In Vietnamese culture, Lan is a mythical guardian symbolizing prosperity, peace, and good fortune, and the star of the Múa Lân during Lunar New Year and Mid-Autumn celebrations.
        </p>
        <p className="text-white/90 text-sm md:text-base leading-relaxed font-bold italic">
          More than candy; it's a celebration in gummy form.
        </p>
      </motion.div>
    </section>
  );
}