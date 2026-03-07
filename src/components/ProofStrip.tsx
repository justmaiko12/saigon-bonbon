"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function ProofStrip() {
  return (
    <section className="relative py-12 px-4">
      <div className="w-full max-w-5xl mx-auto space-y-12">

        {/* Nutrition Stats */}
        <div className="flex flex-wrap justify-center gap-8 md:gap-12 lg:gap-16">
          {[
            { value: "4g", label: "SUGAR" },
            { value: "100%", label: "PLANT\nBASED" },
            { value: "10g", label: "PREBIOTIC\nFIBER" },
            { value: "ZERO", label: "SUGAR\nALCOHOLS" },
          ].map((stat, i) => (
            <motion.div
              key={stat.value}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              viewport={{ once: true }}
              className="text-center flex flex-col items-center"
            >
              <span className="font-bolero text-5xl md:text-6xl text-white leading-none">{stat.value}</span>
              <span className="text-white/80 text-[11px] md:text-xs font-bold tracking-widest mt-2 block leading-tight uppercase whitespace-pre-line">
                {stat.label}
              </span>
            </motion.div>
          ))}
        </div>

        <div className="h-px w-full bg-white/20 max-w-3xl mx-auto" />

        {/* Trust Badges */}
        <div className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-12 lg:gap-16">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="flex items-center gap-4"
          >
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#FF5E00] to-[#DDA2AC] flex items-center justify-center p-2 relative overflow-hidden">
              <div className="absolute inset-0 bg-white/20" />
              <Image src="/assets/lion-silhouettes-transparent.png" alt="Thoughtfully Made" width={24} height={24} className="object-contain z-10 drop-shadow-md brightness-0 invert" />
            </div>
            <span className="font-bold text-xs md:text-sm tracking-widest w-32 leading-tight uppercase font-bolero iridescent-text">THOUGHTFULLY<br/>MADE</span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
            className="flex items-center gap-4"
          >
            <div className="w-12 h-12 rounded-full p-[2px] bg-gradient-to-br from-[#D5A1E3] via-[#FFD2CD] to-[#B4FFED]">
              <div className="w-full h-full bg-black/40 rounded-full flex items-center justify-center backdrop-blur-md">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="url(#proof-gradient)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <defs>
                    <linearGradient id="proof-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#D5A1E3" />
                      <stop offset="50%" stopColor="#FFD2CD" />
                      <stop offset="100%" stopColor="#B4FFED" />
                    </linearGradient>
                  </defs>
                  <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z"/>
                  <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12"/>
                </svg>
              </div>
            </div>
            <span className="font-bold text-xs md:text-sm tracking-widest w-32 leading-tight uppercase font-bolero iridescent-text">NO ARTIFICIAL<br/>COLORS OR FLAVORS</span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="flex items-center gap-4"
          >
            <div className="w-12 h-12 relative flex items-center justify-center rounded-full overflow-hidden p-[2px] bg-gradient-to-br from-[#D5A1E3] via-[#FFD2CD] to-[#B4FFED]">
              <div className="w-full h-full bg-black/40 rounded-full flex items-center justify-center backdrop-blur-md relative">
                <Image src="/assets/usa-stamp-transparent.png" alt="Crafted in USA" fill className="object-contain p-1 opacity-90 drop-shadow-md brightness-200" />
              </div>
            </div>
            <span className="font-bold text-xs md:text-sm tracking-widest w-32 leading-tight uppercase font-bolero iridescent-text">CRAFTED<br/>IN THE USA</span>
          </motion.div>
        </div>

      </div>
    </section>
  );
}