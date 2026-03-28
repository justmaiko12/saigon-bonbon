"use client";

import { motion } from "framer-motion";
import Image from "next/image";

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
}

export default function FlavorStory({ id, heading, body, image, imageAlt, flipped = false, imageScale, textGap, compact }: FlavorStoryProps) {
  return (
    <section id={id} className={`relative px-6 overflow-hidden ${compact ? "py-6 md:py-12" : "py-16 md:py-24"}`}>
      <div className={`max-w-6xl mx-auto relative ${compact ? "min-h-[500px] sm:min-h-[600px] md:min-h-[700px]" : "min-h-[600px] sm:min-h-[700px] md:min-h-[800px]"}`}>
        {/* Text — z-index above image */}
        <motion.div
          initial={{ opacity: 0, x: flipped ? 80 : -80 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true, margin: "-15%" }}
          className={`relative z-10 max-w-[55%] md:max-w-[50%] ${flipped ? "ml-auto" : ""}`}
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

        {/* Image — large, overlapping */}
        <motion.div
          initial={{ opacity: 0, x: flipped ? -80 : 80 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.1 }}
          viewport={{ once: true, margin: "-15%" }}
          className={`absolute top-0 ${flipped ? "left-0" : "right-0"} h-full ${imageScale || "w-[70%] md:w-[65%]"}`}
          style={{ minHeight: "100%" }}
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
      </div>
    </section>
  );
}
