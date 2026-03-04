"use client";

import { motion, useScroll, useMotionValueEvent } from "framer-motion";
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

  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>, targetId: string) => {
    e.preventDefault();
    if (targetId === "top") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      const elem = document.getElementById(targetId);
      if (elem) {
        elem.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

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
      <button onClick={(e) => handleScroll(e, 'top')} className="hover:text-white transition-colors cursor-pointer">
        Home
      </button>
      <button onClick={(e) => handleScroll(e, 'about')} className="hover:text-white transition-colors cursor-pointer">
        Our Story
      </button>
      
      {/* Centered Logo */}
      <button onClick={(e) => handleScroll(e, 'top')} className="relative w-32 h-10 md:w-48 md:h-12 mx-4 hover:opacity-80 transition-opacity cursor-pointer">
        <Image 
          src="/assets/logo.png" 
          alt="Saigon Bonbon Logo" 
          fill
          className="object-contain mix-blend-screen"
          priority
        />
      </button>

      <button onClick={(e) => handleScroll(e, 'flavors')} className="hover:text-white transition-colors cursor-pointer">
        Flavors
      </button>
      <button onClick={(e) => handleScroll(e, 'shop')} className="hover:text-white transition-colors cursor-pointer">
        Shop
      </button>
    </motion.nav>
  );
}