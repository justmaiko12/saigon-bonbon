"use client";

import { motion } from "framer-motion";

export default function Background({ color }: { color: string }) {
  return (
    <motion.div
      className="fixed -z-50 pointer-events-none"
      style={{
        top: '-5vh',
        bottom: '-5vh',
        left: '-5vw',
        right: '-5vw',
      }}
      animate={{ background: color }}
      transition={{ duration: 1, ease: "easeInOut" }}
    >
      <div
        className="absolute inset-0 opacity-[0.35] mix-blend-overlay"
        style={{
          backgroundImage: "url('/assets/pattern.png')",
          backgroundRepeat: "repeat",
          backgroundSize: "400px",
          filter: "invert(1)"
        }}
      />
    </motion.div>
  );
}
