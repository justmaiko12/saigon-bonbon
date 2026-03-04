"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Play, X } from "lucide-react";

export default function VideoModalSection() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <section className="relative py-24 px-4 flex flex-col items-center justify-center">
      <div className="w-full max-w-5xl flex flex-col items-center text-center">
        
        <h2 className="font-serif text-3xl md:text-5xl font-bold text-white mb-12">
          EVERY DAY WE DANCE
        </h2>

        {/* Video Thumbnail */}
        <motion.div 
          whileHover={{ scale: 1.02 }}
          className="relative w-full max-w-4xl aspect-[16/9] md:aspect-[2.35/1] rounded-3xl overflow-hidden cursor-pointer group shadow-2xl"
          onClick={() => setIsOpen(true)}
        >
          {/* Placeholder Background */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#FF5E00] to-[#FF107A] flex items-center justify-center">
            <span className="text-white/80 font-mono tracking-widest text-sm md:text-base">Lion Dance + Bao Han Video Thumbnail</span>
          </div>
          
          {/* Play Button Overlay */}
          <div className="absolute inset-0 bg-black/10 flex items-end p-6 md:p-8">
             <div className="flex items-center gap-3 bg-white/20 backdrop-blur-md px-6 py-3 rounded-full text-white font-bold text-xs tracking-widest border border-white/30 group-hover:bg-white/30 transition-colors">
               <Play size={16} fill="currentColor" />
               WATCH THE FILM
             </div>
          </div>
        </motion.div>

        {/* Story Text */}
        <div className="mt-16 max-w-2xl text-white/90 text-left md:text-center text-sm md:text-base leading-relaxed space-y-6">
          <p>Long have we searched for something that truly reflected us. Something to stand behind. Something to be proud of.</p>
          <p>Now, it's here.<br/>This is us—no longer quiet, no longer waiting.</p>
          <p>We don't ask for permission.<br/>We don't save our joy for special occasions.</p>
          <p className="font-bold italic">Because every day is a gift.<br/>Every day, we dance.</p>
        </div>
      </div>

      {/* Video Modal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-md p-4"
          >
            <button 
              onClick={() => setIsOpen(false)}
              className="absolute top-6 right-6 md:top-8 md:right-8 w-12 h-12 bg-white/10 rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-colors"
            >
              <X size={24} />
            </button>
            <div className="w-full max-w-5xl aspect-video bg-black rounded-2xl overflow-hidden border border-white/10 flex items-center justify-center shadow-2xl">
               <span className="text-white/50 font-mono tracking-widest">Full Music Video Player</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}