"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Draggable } from "@/components/EditMode";

interface FlavorStoryProps {
  id: string;
  heading: string;
  body: string[];
  image: string;
  imageAlt: string;
  flipped?: boolean;
  imageScale?: string;
  textGap?: string;
  compact?: boolean;
  imageOffset?: { x: number; y: number };
  imageZoom?: number;
}

export default function FlavorStory({ id, heading, body, image, imageAlt, flipped = false, imageScale, textGap, compact, imageOffset, imageZoom }: FlavorStoryProps) {
  return (
    <section id={id} className={`relative px-6 overflow-x-hidden overflow-y-visible ${compact ? "pt-16 pb-6 md:pt-20 md:pb-12" : "py-16 md:py-24"}`}>
      <div className={`max-w-6xl mx-auto relative ${compact ? "min-h-[700px] sm:min-h-[850px] md:min-h-[1000px]" : "min-h-[600px] sm:min-h-[700px] md:min-h-[800px]"}`}>
        {/* Text — z-index above image */}
        <Draggable id={`${id}-text`} className="relative z-10">
          <motion.div
            initial={{ opacity: 0, x: flipped ? 80 : -80 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ once: true, margin: "-15%" }}
            className={`relative max-w-[55%] md:max-w-[50%] ${flipped ? "ml-auto" : compact ? "ml-[8%] md:ml-[12%]" : ""}`}
          >
            <h2 className={`font-bolero iridescent-text text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-[0.95] tracking-wide whitespace-pre-line ${textGap || "mb-8"}`}>
              {heading}
            </h2>
            <div className="text-white/85 text-sm md:text-base leading-relaxed font-medium space-y-1">
              {body.map((line, i) =>
                line === "" ? (
                  <br key={i} />
                ) : (
                  <p key={i}>{line}</p>
                )
              )}
            </div>
          </motion.div>
        </Draggable>

        {/* Image — large, overlapping */}
        <Draggable id={`${id}-image`} className={`absolute top-0 ${flipped ? "left-0" : "right-0"} h-full z-0 ${imageScale || "w-[70%] md:w-[65%]"}`}>
          <motion.div
            initial={imageZoom ? { opacity: 0 } : { opacity: 0, x: flipped ? -80 : 80 }}
            whileInView={imageZoom ? { opacity: 1 } : { opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.1 }}
            viewport={{ once: true, margin: "-15%" }}
            className="w-full h-full"
            style={{
              minHeight: "100%",
              ...(imageOffset && { marginLeft: `${imageOffset.x}px`, marginTop: `${imageOffset.y}px` }),
              ...(imageZoom && { transform: `scale(${imageZoom})`, transformOrigin: "top center" }),
            }}
          >
            {/* Soft fade at bottom edge */}
            <div
              className="absolute inset-0 -top-[10%] -bottom-[10%]"
              style={{
                maskImage: "linear-gradient(to bottom, black 75%, transparent 100%)",
                WebkitMaskImage: "linear-gradient(to bottom, black 75%, transparent 100%)",
              }}
            >
              <Image
                src={image}
                alt={imageAlt}
                fill
                className="object-contain object-top"
                sizes="(max-width: 768px) 100vw, 65vw"
              />
            </div>
          </motion.div>
        </Draggable>
      </div>
    </section>
  );
}
