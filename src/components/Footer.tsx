"use client";

import { ArrowRight } from "lucide-react";
import { useEffect, useRef } from "react";
import { useInView } from "framer-motion";
import { footer } from "@/site-content";
import { EditableText, Draggable } from "@/components/EditMode";

export default function Footer({ setBgColor }: { setBgColor?: (color: string) => void }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { margin: "-20% 0px" });

  useEffect(() => {
    if (isInView && setBgColor) {
      setBgColor(footer.bgGradient);
    }
  }, [isInView, setBgColor]);

  return (
    <footer ref={ref} className="relative pt-16 pb-16 px-6 overflow-hidden mt-8">
      {/* Sunburst background rays */}
      <div
        className="absolute inset-0 -z-10 mix-blend-overlay bg-bottom bg-no-repeat bg-cover opacity-60"
        style={{
          backgroundImage: `url('${footer.raysImage}')`,
          maskImage: "linear-gradient(to bottom, transparent, black 20%)",
          WebkitMaskImage: "linear-gradient(to bottom, transparent, black 20%)"
        }}
      />

      <div className="max-w-6xl mx-auto flex flex-col items-center">
        {/* Bottom Section */}
        <div className="w-full max-w-5xl flex flex-col md:flex-row gap-12 justify-between items-start">

          {/* Logo */}
          <Draggable id="footer-logo">
            <div className="flex-shrink-0 flex items-center justify-center w-full md:w-auto">
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mb-2 border border-white/20">
                  <span className="text-[10px] text-white/50 font-mono">ICON</span>
                </div>
                <span className="font-serif text-xl font-bold text-white tracking-widest leading-tight text-center">SAIGON<br/>BONBON</span>
              </div>
            </div>
          </Draggable>

          {/* Newsletter */}
          <Draggable id="footer-newsletter">
            <div className="max-w-md w-full text-center md:text-left">
              <EditableText id="footer-newsletter-headline" as="h3" className="font-serif text-xl md:text-2xl font-bold text-white mb-4">
                {footer.newsletterHeadline}
              </EditableText>
              <EditableText id="footer-newsletter-desc" as="p" className="text-white/80 text-xs md:text-sm mb-6 leading-relaxed font-medium">
                {footer.newsletterDescription.replace(/\n/g, " ")}
              </EditableText>
              <div className="flex items-center border-b border-white/50 pb-2 w-full group focus-within:border-white transition-colors">
                <input
                  type="email"
                  placeholder={footer.emailPlaceholder}
                  className="bg-transparent border-none outline-none text-white placeholder:text-white/50 flex-1 text-sm px-2 font-medium"
                />
                <button className="text-white hover:text-white/80 transition-colors pr-2">
                  <div className="bg-white rounded-full p-1 text-[#D92384]">
                    <ArrowRight size={16} strokeWidth={3} />
                  </div>
                </button>
              </div>
            </div>
          </Draggable>

          {/* Links */}
          <Draggable id="footer-links">
            <div className="flex flex-col text-center md:text-left w-full md:w-auto mt-4 md:mt-0">
              <EditableText id="footer-contact-label" as="p" className="text-white font-bold text-xs md:text-sm tracking-widest mb-3">
                {footer.contactLabel}
              </EditableText>
              <a href={`mailto:${footer.contactEmail}`} className="text-white/80 hover:text-white text-xs md:text-sm font-medium transition-colors block">
              <EditableText id="footer-email">{footer.contactEmail}</EditableText>
            </a>

              <EditableText id="footer-links-label" as="p" className="text-white font-bold text-xs md:text-sm tracking-widest mt-8 mb-4">
                {footer.usefulLinksLabel}
              </EditableText>
              <ul className="space-y-3">
                {footer.usefulLinks.map(link => (
                  <li key={link}>
                    <a href="#" className="text-white/80 hover:text-white text-xs md:text-sm font-medium transition-colors">{link}</a>
                  </li>
                ))}
              </ul>
            </div>
          </Draggable>
        </div>
      </div>
    </footer>
  );
}
