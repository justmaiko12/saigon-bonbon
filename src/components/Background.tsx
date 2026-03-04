"use client";

import { motion } from "framer-motion";

export default function Background({ color }: { color: string }) {
  return (
    <motion.div 
      className="fixed inset-0 -z-50 pointer-events-none"
      animate={{ background: color }}
      transition={{ duration: 1, ease: "easeInOut" }}
    >
      <div 
        className="absolute inset-0 opacity-20 mix-blend-overlay"
        style={{
          backgroundImage: "url('/assets/pattern.png')",
          backgroundRepeat: "repeat",
          backgroundSize: "400px" // Adjust size as necessary
        }}
      />
    </motion.div>
  );
}