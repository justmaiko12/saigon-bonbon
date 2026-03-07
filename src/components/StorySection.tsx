"use client";

import { motion } from "framer-motion";

export default function StorySection({ variant = "full" }: { variant?: "full" | "condensed" }) {
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
          
          {variant === "full" ? (
            <div className="space-y-6 text-white/90 text-sm md:text-base leading-relaxed font-medium">
              <p>Saigon Bonbon is a confluence of three worlds.</p>
              <p>From Tee Tran&apos;s childhood memories and cherished Vietnamese upbringing;</p>
              <p>Bao Han&apos;s journey of evolution, survival, and finding joy in the simplest things;</p>
              <p>And of Maiko taking the world by storm - using social media to showcase real Vietnamese talent that speaks to the new generation.</p>
              <p>Together, these three form the Creative Triad of Saigon Bonbon. Tee provides the vision, Bao Han is the heart, and Maiko drives the movement.</p>
              <p>Saigon Bonbon is not just in the business of selling candy - it&apos;s all about sharing our joy, heritage, and dreams of a future where uniqueness is celebrated, not hidden. It&apos;s a celebration in candy form.</p>
            </div>
          ) : (
            <div className="space-y-5 text-white/90 text-sm md:text-base leading-relaxed font-medium">
              <p>Born from the vision of <strong>Tee Tran</strong>, the heart of <strong>Bao Han</strong>, and the movement of <strong>Maiko</strong> — three Vietnamese-Americans who refused to keep their joy quiet.</p>
              <p>We&apos;re not just selling candy. We&apos;re sharing heritage, dreams, and a future where uniqueness is celebrated.</p>
              <p className="font-bold italic">A celebration in candy form.</p>
            </div>
          )}
        </motion.div>

        {variant === "full" && (
          /* Photoshoot Placeholder */
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
        )}
      </div>
    </section>
  );
}