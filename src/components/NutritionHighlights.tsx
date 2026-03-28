"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { nutritionHighlights, madeWithIntention } from "@/site-content";

export default function NutritionHighlights() {
  return (
    <>
      <section className="relative py-24 md:py-32 px-6 overflow-hidden">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-12 md:gap-16">
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            viewport={{ once: true }}
            className="flex-1"
          >
            <h2 className="font-bolero text-4xl sm:text-5xl md:text-6xl text-white font-bold leading-[0.95] tracking-wide mb-10 whitespace-pre-line">
              {nutritionHighlights.heading}
            </h2>
            <div className="space-y-6">
              {nutritionHighlights.stats.map((stat, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  viewport={{ once: true }}
                  className="flex items-center gap-4"
                >
                  <div className="w-10 h-10 rounded-full bg-white/15 flex items-center justify-center flex-shrink-0">
                    <span className="text-white text-sm">✦</span>
                  </div>
                  <span className="text-white font-bold text-sm md:text-base tracking-widest uppercase whitespace-pre-line leading-tight">
                    {stat.label}
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 60 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: "easeOut", delay: 0.1 }}
            viewport={{ once: true }}
            className="flex-1 relative w-full aspect-[3/4] max-w-md"
          >
            <Image
              src={nutritionHighlights.image}
              alt={nutritionHighlights.imageAlt}
              fill
              className="object-cover rounded-2xl"
            />
          </motion.div>
        </div>
      </section>

      <section className="relative py-16 md:py-24 px-6">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-start gap-12 md:gap-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            viewport={{ once: true }}
            className="flex-1"
          >
            <h2 className="font-bolero text-3xl sm:text-4xl md:text-5xl text-white font-bold leading-[0.95] tracking-wide mb-8 whitespace-pre-line">
              {madeWithIntention.heading}
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut", delay: 0.15 }}
            viewport={{ once: true }}
            className="flex-1 space-y-4"
          >
            {madeWithIntention.items.map((item, i) => (
              <div key={i} className="flex items-center gap-3">
                <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0">
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
