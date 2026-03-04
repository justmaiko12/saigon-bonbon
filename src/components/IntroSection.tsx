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
    <section ref={ref} className="relative min-h-[80vh] flex flex-col items-center justify-center py-24 px-6 text-center overflow-hidden">
      
      {/* Background Silhouettes */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 0.4, scale: 1 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        viewport={{ once: true }}
        className="absolute inset-0 flex items-center justify-center pointer-events-none -z-10"
      >
        <div 
          className="w-full h-full max-w-[1400px] bg-contain bg-center bg-no-repeat"
          style={{ backgroundImage: "url('/assets/lion-silhouettes-transparent.png')" }}
        />
      </motion.div>

      <motion.h2 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        viewport={{ once: true }}
        className="font-serif text-3xl md:text-5xl lg:text-6xl font-bold text-white max-w-5xl leading-[1.4] tracking-wide"
      >
        AUTHENTIC<br/>
        VIETNAMESE-INSPIRED<br/>
        FLAVORS<br/>
        YOU CAN ENJOY NOW,<br/>
        AND EVERY DAY AFTER.
      </motion.h2>
    </section>
  );
}