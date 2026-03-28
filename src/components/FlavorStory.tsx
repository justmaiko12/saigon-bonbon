"use client";

import { motion } from "framer-motion";
import Image from "next/image";

interface FlavorStoryProps {
  id: string;
  heading: string;
  body: string[];
  image: string;
  imageAlt: string;
}

export default function FlavorStory({ id, heading, body, image, imageAlt }: FlavorStoryProps) {
  return (
    <section id={id} className="relative py-16 md:py-24 px-6 overflow-hidden">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-8 md:gap-12">
        {/* Text — slides in from left */}
        <motion.div
          initial={{ opacity: 0, x: -80 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true, margin: "-15%" }}
          className="flex-1 md:flex-[1.1]"
        >
          <h2 className="font-bolero iridescent-text text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-[0.95] tracking-wide mb-8 whitespace-pre-line">
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

        {/* Image — slides in from right, shows full image */}
        <motion.div
          initial={{ opacity: 0, x: 80 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.1 }}
          viewport={{ once: true, margin: "-15%" }}
          className="flex-1 relative w-full min-h-[450px] sm:min-h-[550px] md:min-h-[650px] lg:min-h-[700px] overflow-hidden"
        >
          {/* Crop bottom 1/3 (faded edge) and zoom in */}
          <div className="absolute inset-0 -bottom-[45%] scale-[1.3] origin-top">
            <Image
              src={image}
              alt={imageAlt}
              fill
              className="object-contain object-top"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
