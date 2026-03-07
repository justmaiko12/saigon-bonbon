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
        className="absolute inset-0 opacity-[0.6] mix-blend-multiply"
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
