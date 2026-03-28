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
    <section id={id} className="relative py-24 md:py-32 px-6 overflow-hidden">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-12 md:gap-16">
        <motion.div
          initial={{ opacity: 0, x: -80 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true, margin: "-15%" }}
          className="flex-1"
        >
          <h2 className="font-bolero text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-white font-bold leading-[0.95] tracking-wide mb-8 whitespace-pre-line">
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

        <motion.div
          initial={{ opacity: 0, x: 80 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.1 }}
          viewport={{ once: true, margin: "-15%" }}
          className="flex-1 relative w-full aspect-[3/4] max-w-md"
        >
          <Image
            src={image}
            alt={imageAlt}
            fill
            className="object-cover rounded-2xl"
          />
        </motion.div>
      </div>
    </section>
  );
}
