"use client";

import { motion } from "framer-motion";
import { useEffect } from "react";
import { hero } from "@/site-content";
import { EditableText, EditableImage, Draggable } from "@/components/EditMode";

export default function HeroSection({ setBgColor, variant = "full" }: { setBgColor: (color: string) => void; variant?: "full" | "minimal" }) {
  useEffect(() => {
    setBgColor(hero.bgGradient);
  }, [setBgColor]);

  if (variant === "minimal") {
    return (
      <section className="relative flex flex-col items-center justify-center px-6 pt-32 pb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-center z-10 flex flex-col items-center"
        >
          <EditableText id="hero-subtitle" as="p" className="text-white font-serif italic text-sm md:text-base mb-2 uppercase font-bold tracking-[0.1em]">{hero.subtitle}</EditableText>
          <EditableText id="hero-brand" as="h2" className="font-serif text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-2 tracking-wide">{hero.brand}</EditableText>
          <h1 className="font-serif text-6xl md:text-8xl lg:text-[7rem] font-bold iridescent-animated-text mb-8 leading-[0.9]">
            <EditableText id="hero-headline">{hero.headline.replace("\n", " ")}</EditableText>
          </h1>
        </motion.div>
        <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.5 }} className="text-white/80 text-sm md:text-lg font-medium mt-4 italic">
          <EditableText id="hero-tagline-minimal">{hero.tagline}</EditableText>
        </motion.p>
      </section>
    );
  }

  return (
    <section className="relative min-h-screen flex flex-col">
      {/* Full-width Hero Image */}
      <div className="relative w-full flex-1 min-h-[70vh] md:min-h-[85vh] overflow-hidden">
        {/* Background image placeholder — replace via edit mode */}
        <div className="absolute inset-0 z-0">
          <EditableImage
            id="hero-bg-image"
            src="/assets/pattern.png"
            alt="Hero background"
            fill
            className="object-cover opacity-30"
          />
        </div>

        {/* Gradient overlay for text readability */}
        <div className="absolute inset-0 z-[1] bg-gradient-to-t from-black/40 via-transparent to-transparent" />

        {/* Hero headline overlaid on image */}
        <Draggable id="hero-headline-block" className="absolute inset-0 z-10 flex items-center justify-center px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="text-center"
          >
            <h1 className="font-serif text-[12vw] sm:text-[10vw] md:text-[8vw] lg:text-[7rem] font-bold iridescent-animated-text leading-[0.9] drop-shadow-2xl">
              <EditableText id="hero-headline">{hero.headline.replace("\n", " ")}</EditableText>
            </h1>
          </motion.div>
        </Draggable>

        {/* Placeholder hint for when no image is set */}
        <div className="absolute inset-0 z-[2] flex items-center justify-center pointer-events-none">
          <p className="text-white/20 text-lg font-mono tracking-widest uppercase">[Hero Photo — Click Edit to Replace]</p>
        </div>
      </div>

      {/* Intro: Two-column — text left, photo right */}
      <div className="relative z-10 w-full max-w-6xl mx-auto px-6 py-16 md:py-24">
        <div className="flex flex-col md:flex-row gap-12 md:gap-16 items-start">

          {/* Left — Text */}
          <Draggable id="hero-intro-text" className="flex-1">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <EditableText id="hero-subtitle" as="p" className="text-white font-serif italic text-sm md:text-base mb-2 uppercase font-bold tracking-[0.15em]">
                {hero.subtitle}
              </EditableText>
              <EditableText id="hero-brand" as="h2" className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold iridescent-text mb-8 tracking-wide">
                {hero.brand}
              </EditableText>

              <div className="space-y-5">
                {hero.introParagraphs.map((p, i) => (
                  <EditableText key={i} id={`hero-intro-p${i}`} as="p" className="text-white/90 text-sm md:text-base leading-relaxed font-medium">
                    {p}
                  </EditableText>
                ))}
                <EditableText id="hero-tagline" as="p" className="text-white/90 text-sm md:text-base leading-relaxed font-bold italic">
                  {hero.tagline}
                </EditableText>
              </div>
            </motion.div>
          </Draggable>

          {/* Right — Photo placeholder */}
          <Draggable id="hero-intro-photo" className="flex-1 flex justify-center md:justify-end">
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className="relative w-full max-w-md aspect-[3/4] rounded-2xl overflow-hidden"
            >
              <EditableImage
                id="hero-founders-photo"
                src="/assets/pattern.png"
                alt="Founders photo"
                fill
                className="object-cover opacity-30"
              />
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <p className="text-white/20 text-sm font-mono tracking-widest uppercase text-center px-4">[Founders Photo — Click Edit to Replace]</p>
              </div>
            </motion.div>
          </Draggable>
        </div>

        {/* Gummies Trio */}
        <Draggable id="hero-gummies" className="mt-10 md:mt-16 flex justify-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="relative w-full max-w-xl aspect-[2/1]"
          >
            <EditableImage
              id="hero-gummies-img"
              src="/assets/gummies-trio.png"
              alt="Three Lân gummies"
              fill
              className="object-contain drop-shadow-2xl"
            />
          </motion.div>
        </Draggable>
      </div>
    </section>
  );
}
