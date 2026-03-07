"use client";

import { motion } from "framer-motion";

export default function LayoutToggle({
  layout,
  setLayout,
}: {
  layout: "option1" | "option2";
  setLayout: (layout: "option1" | "option2") => void;
}) {
  return (
    <div className="fixed bottom-6 right-6 z-[90] flex rounded-full border border-white/20 bg-black/30 backdrop-blur-md overflow-hidden shadow-lg">
      <button
        onClick={() => {
          setLayout("option1");
          window.scrollTo({ top: 0, behavior: "smooth" });
        }}
        className="relative px-4 py-2 text-[10px] font-bold tracking-widest"
      >
        {layout === "option1" && (
          <motion.div
            layoutId="layout-pill"
            className="absolute inset-0 bg-white/20 rounded-full"
            transition={{ type: "spring", stiffness: 400, damping: 30 }}
          />
        )}
        <span className={`relative z-10 ${layout === "option1" ? "text-white" : "text-white/40"}`}>
          OPTION 1
        </span>
      </button>
      <button
        onClick={() => {
          setLayout("option2");
          window.scrollTo({ top: 0, behavior: "smooth" });
        }}
        className="relative px-4 py-2 text-[10px] font-bold tracking-widest"
      >
        {layout === "option2" && (
          <motion.div
            layoutId="layout-pill"
            className="absolute inset-0 bg-white/20 rounded-full"
            transition={{ type: "spring", stiffness: 400, damping: 30 }}
          />
        )}
        <span className={`relative z-10 ${layout === "option2" ? "text-white" : "text-white/40"}`}>
          OPTION 2
        </span>
      </button>
    </div>
  );
}