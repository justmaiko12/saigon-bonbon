"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useEffect } from "react";

export default function IntroSection({ setBgColor }: { setBgColor: (color: string) => void }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { margin: "-40% 0px" });

  useEffect(() => {
    if (isInView) {
      setBgColor("linear-gradient(180deg, #FF5E00 0%, #67B626 100%)");
    }
  }, [isInView, setBgColor]);

  return (
    <section ref={ref} className="relative min-h-[80vh] flex flex-col items-center justify-center py-24 px-6 text-center">
      {/* 3 Lions Animation */}
      <div className="flex gap-4 md:gap-8 mb-12">
        {[1, 2, 3].map((i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0.1, y: 0, scale: 1 }}
            whileInView={{ opacity: 0.05, y: 20, scale: 0.9 }}
            transition={{ duration: 1, delay: i * 0.2 }}
            viewport={{ once: true }}
            className="w-24 h-24 md:w-32 md:h-32 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm"
          >
            <span className="text-white/50 text-xs font-mono">Lion Face {i}</span>
          </motion.div>
        ))}
      </div>

      <motion.h2 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.6 }}
        viewport={{ once: true }}
        className="font-serif text-3xl md:text-5xl font-bold text-white max-w-4xl leading-relaxed"
      >
        AUTHENTIC<br/>
        VIETNAMESE-INSPIRED FLAVORS<br/>
        YOU CAN ENJOY NOW,<br/>
        AND EVERY DAY AFTER.
      </motion.h2>
    </section>
  );
}