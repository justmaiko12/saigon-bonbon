"use client";

import { motion } from "framer-motion";
import { story } from "@/site-content";
import { EditableText, Draggable } from "@/components/EditMode";

export default function StorySection({ variant = "full" }: { variant?: "full" | "condensed" }) {
  return (
    <section className="relative py-24 px-4 flex justify-center items-center" id="about">
      <div className="w-full max-w-5xl flex flex-col items-center">
        <Draggable id="story-card">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true, margin: "-10% 0px" }}
            className="glass-panel p-8 md:p-16 rounded-3xl max-w-3xl w-full shadow-2xl"
          >
            <EditableText id="story-headline" as="h2" className="font-serif text-3xl md:text-4xl font-bold text-white mb-8 tracking-wide">
              {story.headline}
            </EditableText>

            {variant === "full" ? (
              <div className="space-y-6 text-white/90 text-sm md:text-base leading-relaxed font-medium">
                {story.paragraphs.map((p, i) => (
                  <EditableText key={i} id={`story-p${i}`} as="p">{p}</EditableText>
                ))}
              </div>
            ) : (
              <div className="space-y-5 text-white/90 text-sm md:text-base leading-relaxed font-medium">
                {story.condensedParagraphs.map((p, i) => (
                  <p key={i} dangerouslySetInnerHTML={{ __html: p }} />
                ))}
                <EditableText id="story-condensed-closing" as="p" className="font-bold italic">{story.condensedClosing}</EditableText>
              </div>
            )}
          </motion.div>
        </Draggable>

        {variant === "full" && (
          <Draggable id="story-photoshoot">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className="w-full max-w-4xl aspect-[21/9] bg-white/5 rounded-3xl mt-16 flex items-center justify-center border border-white/10 backdrop-blur-sm shadow-xl"
            >
              <span className="text-white/40 font-mono tracking-widest text-sm text-center px-4 uppercase">
                {story.photoshootPlaceholder}
              </span>
            </motion.div>
          </Draggable>
        )}
      </div>
    </section>
  );
}
