"use client";

import { motion, useScroll, useMotionValueEvent, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { nav } from "@/site-content";
import { EditableText, EditableImage } from "@/components/EditMode";

export default function Navigation() {
  const { scrollY } = useScroll();
  const [isScrolled, setIsScrolled] = useState(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsScrolled(latest > 150);
  });

  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>, targetId: string) => {
    e.preventDefault();
    if (targetId === "top") { window.scrollTo({ top: 0, behavior: "smooth" }); }
    else { document.getElementById(targetId)?.scrollIntoView({ behavior: "smooth" }); }
  };

  return (
    <>
      {/* Top Banner Navigation */}
      <motion.nav
        variants={{ visible: { opacity: 1, y: 0 }, hidden: { opacity: 0, y: -20 } }}
        animate={isScrolled ? "hidden" : "visible"}
        transition={{ duration: 0.3 }}
        className="fixed top-0 left-0 w-full z-[100] pt-4 sm:pt-8 pb-4 flex justify-center items-center gap-4 sm:gap-8 md:gap-16 text-white/80 text-[10px] sm:text-xs md:text-sm font-medium tracking-widest uppercase mix-blend-screen"
        style={{ pointerEvents: isScrolled ? "none" : "auto" }}
      >
        {nav.links.slice(0, 2).map((link, i) => (
          <button key={link.target} onClick={(e) => handleScroll(e, link.target)} className="hover:text-white transition-colors cursor-pointer">
            <EditableText id={`nav-link-${i}`}>{link.label}</EditableText>
          </button>
        ))}

        <button onClick={(e) => handleScroll(e, 'top')} className="relative w-24 h-8 sm:w-32 sm:h-10 md:w-48 md:h-12 mx-1 sm:mx-4 hover:opacity-80 transition-opacity cursor-pointer">
          <EditableImage id="nav-logo" src={nav.logo} alt="Saigon Bonbon Logo" fill className="object-contain" />
        </button>

        {nav.links.slice(2).map((link, i) => (
          <button key={link.target} onClick={(e) => handleScroll(e, link.target)} className="hover:text-white transition-colors cursor-pointer">
            <EditableText id={`nav-link-${i + 2}`}>{link.label}</EditableText>
          </button>
        ))}
      </motion.nav>

      {/* Floating Sticky Navigation */}
      <AnimatePresence>
        {isScrolled && (
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            transition={{ duration: 0.4, type: "spring", stiffness: 100 }}
            className="fixed top-6 left-1/2 -translate-x-1/2 z-[100] w-[90%] max-w-4xl bg-black/60 backdrop-blur-xl rounded-full px-6 py-3 flex items-center justify-between shadow-2xl border border-white/20"
          >
            <button onClick={(e) => handleScroll(e, 'top')} className="relative w-32 h-8 hover:opacity-80 transition-opacity cursor-pointer">
              <EditableImage id="nav-logo-sticky" src={nav.logo} alt="Saigon Bonbon Logo" fill className="object-contain object-left" />
            </button>
            <button onClick={(e) => handleScroll(e, 'shop')} className="bg-gradient-to-r from-cyan-200 via-pink-200 to-orange-200 text-black px-6 py-2 rounded-full text-xs font-bold tracking-widest hover:opacity-90 transition-opacity shadow-lg">
              <EditableText id="nav-buy-btn">{nav.buyButtonText}</EditableText>
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
