"use client";

import { motion } from "framer-motion";

export default function Background({ color }: { color: string }) {
  return (
    <motion.div 
      className="fixed inset-0 -z-50 pointer-events-none"
      animate={{ background: color }}
      transition={{ duration: 1, ease: "easeInOut" }}
    >
      {/* Pattern overlay placeholder (for the subtle mandala/sunburst pattern) */}
      <div className="absolute inset-0 opacity-[0.05] mix-blend-overlay bg-repeat" 
           style={{ backgroundImage: "radial-gradient(circle at center, #ffffff 1px, transparent 1px)", backgroundSize: "40px 40px" }} />
    </motion.div>
  );
}