"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Play, X } from "lucide-react";
import { video } from "@/site-content";
import { EditableText, Draggable } from "@/components/EditMode";

export default function VideoModalSection({ variant = "full" }: { variant?: "full" | "compact" }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <section className="relative pt-8 pb-24 px-4 flex flex-col items-center justify-center">
      <div className="w-full max-w-5xl flex flex-col items-center text-center">

        <Draggable id="video-headline">
          <EditableText id="video-headline-text" as="h2" className="font-serif text-3xl md:text-5xl font-bold text-white mb-12">
            {video.headline}
          </EditableText>
        </Draggable>

        {/* Video Thumbnail */}
        <Draggable id="video-thumbnail">
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="relative w-full max-w-4xl aspect-[16/9] md:aspect-[2.35/1] rounded-3xl overflow-hidden cursor-pointer group shadow-2xl"
            onClick={() => setIsOpen(true)}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-[#FF5E00] to-[#FF107A] flex items-center justify-center">
              <EditableText id="video-thumb-text" className="text-white/80 font-mono tracking-widest text-sm md:text-base">{video.thumbnailPlaceholder}</EditableText>
            </div>
            <div className="absolute inset-0 bg-black/10 flex items-end p-6 md:p-8">
               <div className="flex items-center gap-3 bg-white/20 backdrop-blur-md px-6 py-3 rounded-full text-white font-bold text-xs tracking-widest border border-white/30 group-hover:bg-white/30 transition-colors">
                 <Play size={16} fill="currentColor" />
                 <EditableText id="video-btn-text">{video.buttonText}</EditableText>
               </div>
            </div>
          </motion.div>
        </Draggable>

        {/* Story Text */}
        {variant === "full" ? (
          <Draggable id="video-text-block">
            <div className="mt-16 max-w-2xl text-white/90 text-left md:text-center text-sm md:text-base leading-relaxed space-y-6">
              {video.paragraphs.map((p, i) => (
                <EditableText key={i} id={`video-p${i}`} as="p">
                  {p.replace(/\n/g, " ")}
                </EditableText>
              ))}
              <EditableText id="video-closing" as="p" className="font-bold italic">
                {video.closingLine.replace(/\n/g, " ")}
              </EditableText>
            </div>
          </Draggable>
        ) : (
          <EditableText id="video-closing-compact" as="p" className="mt-10 max-w-xl text-white/90 text-center text-sm md:text-lg font-bold italic leading-relaxed">
            {video.closingLine.replace(/\n/g, " ")}
          </EditableText>
        )}
      </div>

      {/* Video Modal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-md p-4"
          >
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-6 right-6 md:top-8 md:right-8 w-12 h-12 bg-white/10 rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-colors"
            >
              <X size={24} />
            </button>
            <div className="w-full max-w-5xl aspect-video bg-black rounded-2xl overflow-hidden border border-white/10 flex items-center justify-center shadow-2xl">
               <span className="text-white/50 font-mono tracking-widest">Full Music Video Player</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
