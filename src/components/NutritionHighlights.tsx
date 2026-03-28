"use client";

import { motion } from "framer-motion";
import { nutritionHighlights, madeWithIntention } from "@/site-content";

export default function NutritionHighlights() {
  return (
    <>
      {/* Feels As Good As It Tastes */}
      <section className="relative py-20 md:py-28 px-6 overflow-hidden">
        <div className="max-w-5xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            viewport={{ once: true }}
            className="font-bolero iridescent-text text-4xl sm:text-5xl md:text-6xl font-bold leading-[0.95] tracking-wide mb-12 md:mb-16 whitespace-pre-line text-center"
          >
            {nutritionHighlights.heading}
          </motion.h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-6">
            {nutritionHighlights.stats.map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                viewport={{ once: true }}
                className="flex flex-col items-center text-center gap-3"
              >
                <div className="w-14 h-14 rounded-full bg-white/15 backdrop-blur-sm flex items-center justify-center border border-white/20">
                  <span className="text-white text-lg">✦</span>
                </div>
                <span className="text-white font-bold text-xs md:text-sm tracking-widest uppercase whitespace-pre-line leading-tight">
                  {stat.label}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Made With Intention */}
      <section className="relative py-16 md:py-24 px-6">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-start gap-8 md:gap-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            viewport={{ once: true }}
            className="flex-1"
          >
            <h2 className="font-bolero iridescent-text text-3xl sm:text-4xl md:text-5xl font-bold leading-[0.95] tracking-wide mb-8 md:mb-0 whitespace-pre-line">
              {madeWithIntention.heading}
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut", delay: 0.15 }}
            viewport={{ once: true }}
            className="flex-1 space-y-5"
          >
            {madeWithIntention.items.map((item, i) => (
              <div key={i} className="flex items-center gap-3">
                <div className="w-7 h-7 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0 border border-white/15">
                  <span className="text-white text-xs">✓</span>
                </div>
                <span className="text-white font-bold text-xs md:text-sm tracking-widest uppercase">
                  {item}
                </span>
              </div>
            ))}
          </motion.div>
        </div>
      </section>
    </>
  );
}
