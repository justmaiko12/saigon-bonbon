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
        className="absolute inset-0 opacity-40"
        style={{
          backgroundImage: "url('/assets/amulet-pattern-top.png')",
          backgroundRepeat: "no-repeat",
          backgroundSize: "100% auto",
          backgroundPosition: "top center",
        }}
      />
    </motion.div>
  );
}
