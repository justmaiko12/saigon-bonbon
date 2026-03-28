"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useEffect } from "react";
import { intro } from "@/site-content";
import { EditableText, Draggable } from "@/components/EditMode";

export default function IntroSection({ setBgColor }: { setBgColor: (color: string) => void }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { margin: "-40% 0px" });

  useEffect(() => {
    if (isInView) {
      setBgColor(intro.bgGradient);
    }
  }, [isInView, setBgColor]);

  return (
    <section ref={ref} className="relative flex flex-col items-center justify-center -mt-8 md:-mt-12 pb-16 md:pb-24 px-6 text-center overflow-hidden">

      {/* Background Silhouettes */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 0.8, scale: 1 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        viewport={{ once: true }}
        className="absolute inset-0 flex items-center justify-center pointer-events-none z-0"
      >
        <div
          className="w-full h-full max-w-[1400px] bg-contain bg-center bg-no-repeat"
          style={{ backgroundImage: `url('${intro.bgImage}')` }}
        />
      </motion.div>

      <Draggable id="intro-headline" className="relative z-10">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="font-serif text-xl md:text-2xl lg:text-3xl font-bold text-white max-w-4xl leading-[1.4] tracking-wide"
        >
          <EditableText id="intro-headline-text">
            {intro.headline.replace(/\n/g, " ")}
          </EditableText>
        </motion.h2>
      </Draggable>
    </section>
  );
}
