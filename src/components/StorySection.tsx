"use client";

import { motion } from "framer-motion";

export default function StorySection() {
  return (
    <section className="relative py-24 px-4 flex justify-center items-center" id="about">
      <div className="w-full max-w-5xl flex flex-col items-center">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, margin: "-10% 0px" }}
          className="glass-panel p-8 md:p-16 rounded-3xl max-w-3xl w-full shadow-2xl"
        >
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-white mb-8 tracking-wide">
            HOW IT CAME TO BEING
          </h2>
          
          <div className="space-y-6 text-white/90 text-sm md:text-base leading-relaxed font-medium">
            <p>Saigon Bonbon is a confluence of three worlds.</p>
            <p>From Tee Tran's childhood memories and cherished Vietnamese upbringing;</p>
            <p>Bao Han's journey of evolution, survival, and finding joy in the simplest things;</p>
            <p>And of Maiko taking the world by storm - using social media to showcase real Vietnamese talent that speaks to the new generation.</p>
            <p>Together, these three form the Creative Triad of Saigon Bonbon. Tee provides the vision, Bao Han is the heart, and Maiko drives the movement.</p>
            <p>Saigon Bonbon is not just in the business of selling candy - it's all about sharing our joy, heritage, and dreams of a future where uniqueness is celebrated, not hidden. It's a celebration in candy form.</p>
          </div>
        </motion.div>

        {/* Photoshoot Placeholder */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="w-full max-w-4xl aspect-[21/9] bg-white/5 rounded-3xl mt-16 flex items-center justify-center border border-white/10 backdrop-blur-sm shadow-xl"
        >
          <span className="text-white/40 font-mono tracking-widest text-sm text-center px-4 uppercase">
            [Add Image from Photoshoot Here]
          </span>
        </motion.div>
      </div>
    </section>
  );
}