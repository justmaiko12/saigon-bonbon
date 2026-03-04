"use client";

import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import Link from "next/link";
import { useState } from "react";

export default function Navigation() {
  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() ?? 0;
    if (latest > previous && latest > 150) {
      setHidden(true);
    } else {
      setHidden(false);
    }
  });

  return (
    <motion.nav 
      variants={{
        visible: { y: 0 },
        hidden: { y: "-150%" }
      }}
      animate={hidden ? "hidden" : "visible"}
      transition={{ duration: 0.35, ease: "easeInOut" }}
      className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[90%] max-w-4xl glass-panel rounded-full px-6 py-3 flex items-center justify-between"
    >
      <Link href="/" className="font-serif font-bold text-xl tracking-wider text-white">
        SAIGON BONBON
      </Link>
      
      <div className="flex items-center gap-6">
        <Link href="#about" className="text-sm font-medium text-white/80 hover:text-white transition-colors">
          About
        </Link>
        <Link 
          href="#shop" 
          className="bg-white/20 text-white px-4 py-1.5 rounded-full text-sm font-bold hover:bg-white hover:text-black transition-colors"
        >
          Buy
        </Link>
      </div>
    </motion.nav>
  );
}