"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";
import { accordion } from "@/site-content";
import { EditableText, Draggable } from "@/components/EditMode";

export default function AccordionSection() {
  const [openId, setOpenId] = useState(accordion[0].id);

  return (
    <section className="relative pt-24 pb-8 px-4 flex items-center justify-center">
      <div className="w-full max-w-5xl flex flex-col md:flex-row gap-12 md:gap-24 items-center">

        {/* Accordion Left */}
        <Draggable id="accordion-left" className="w-full md:w-1/2 space-y-4">
          {accordion.map((item, i) => {
            const isOpen = openId === item.id;
            return (
              <div
                key={item.id}
                className={`glass-panel rounded-2xl overflow-hidden transition-colors duration-300 ${isOpen ? 'bg-white/10' : ''}`}
              >
                <button
                  onClick={() => setOpenId(item.id)}
                  className="w-full flex items-center gap-4 p-6 text-left"
                >
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center border transition-colors flex-shrink-0 ${isOpen ? 'bg-white border-white text-black' : 'border-white/30 text-white'}`}>
                    {isOpen ? <Minus size={14} /> : <Plus size={14} />}
                  </div>
                  <span className={`font-bolero font-bold tracking-widest text-lg md:text-xl transition-colors ${isOpen ? 'iridescent-text' : 'text-white/60'}`}>
                    <EditableText id={`accordion-title-${i}`}>{item.title}</EditableText>
                  </span>
                </button>

                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden"
                    >
                      <div className="p-6 pt-0 text-white/80 text-sm leading-relaxed border-t border-white/10 mt-2 pt-4">
                        <EditableText id={`accordion-content-${i}`}>{item.content}</EditableText>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </Draggable>

        {/* Media Right */}
        <Draggable id="accordion-media" className="w-full md:w-1/2 flex justify-center">
          <div className="w-full max-w-[280px] md:max-w-[320px] aspect-[9/16] rounded-3xl overflow-hidden glass-panel-dark flex items-center justify-center relative shadow-2xl">
            <AnimatePresence mode="wait">
              <motion.div
                key={openId}
                initial={{ opacity: 0, scale: 1.05 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                className="absolute inset-0 flex items-center justify-center bg-zinc-800/80"
              >
                <div className="text-center px-6">
                  <EditableText id="accordion-media-label" as="span" className="text-white/50 text-xs font-mono tracking-widest uppercase">
                    Vlog Style Video
                  </EditableText>
                  <p className="text-white mt-2 text-sm font-medium">
                    <EditableText id={`accordion-media-${accordion.findIndex(a => a.id === openId)}`}>
                      {accordion.find(a => a.id === openId)?.media ?? ""}
                    </EditableText>
                  </p>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </Draggable>

      </div>
    </section>
  );
}
