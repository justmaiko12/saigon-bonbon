"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { madeWithIntention } from "@/site-content";

export default function NutritionHighlights() {
  return (
    <>
      {/* Feels As Good As It Tastes — pre-designed composition */}
      <section className="relative py-12 md:py-20 px-4 sm:px-6 md:px-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true, margin: "-10%" }}
          className="max-w-5xl mx-auto"
        >
          <div className="relative w-full aspect-[875/638] rounded-3xl overflow-hidden bg-black/20">
            <Image
              src="/assets/michael-gummy.png"
              alt="Michael holding Saigon Bonbon gummy — Feels as good as it tastes"
              fill
              className="object-contain"
              sizes="(max-width: 768px) 100vw, 960px"
              priority
            />
          </div>
        </motion.div>
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
