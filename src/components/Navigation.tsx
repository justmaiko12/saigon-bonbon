"use client";

import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import Link from "next/link";
import { useState } from "react";

import Image from "next/image";

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
        hidden: { y: "-100%" }
      }}
      animate={hidden ? "hidden" : "visible"}
      transition={{ duration: 0.35, ease: "easeInOut" }}
      className="fixed top-0 left-0 w-full z-50 pt-8 pb-4 flex justify-center items-center gap-8 md:gap-16 text-white/80 text-xs md:text-sm font-medium tracking-widest uppercase"
    >
      <Link href="/" className="hover:text-white transition-colors">
        Home
      </Link>
      <Link href="#about" className="hover:text-white transition-colors">
        Our Story
      </Link>
      
      {/* Centered Logo */}
      <Link href="/" className="relative w-32 h-10 md:w-48 md:h-12 mx-4 hover:opacity-80 transition-opacity">
        <Image 
          src="/assets/logo.png" 
          alt="Saigon Bonbon Logo" 
          fill
          className="object-contain"
          priority
        />
      </Link>

      <Link href="#flavors" className="hover:text-white transition-colors">
        Flavors
      </Link>
      <Link href="#shop" className="hover:text-white transition-colors">
        Shop
      </Link>
    </motion.nav>
  );
}