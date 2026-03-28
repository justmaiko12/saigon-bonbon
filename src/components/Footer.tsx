"use client";

import { ArrowRight } from "lucide-react";
import { useEffect, useRef } from "react";
import { useInView } from "framer-motion";
import Image from "next/image";
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
        {/* Newsletter — full width on top */}
        <Draggable id="footer-newsletter">
          <div className="max-w-md w-full text-center mb-10">
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

        {/* Bottom row: Logo left + Links right */}
        <div className="w-full flex flex-row items-start gap-6 md:gap-12 md:justify-center">
          {/* Logo */}
          <Draggable id="footer-logo">
            <div className="flex-shrink-0">
              <div className="relative w-24 h-36 md:w-32 md:h-44">
                <Image src="/assets/footer-logo.png" alt="Saigon Bonbon" fill className="object-contain" />
              </div>
            </div>
          </Draggable>

          {/* Links */}
          <Draggable id="footer-links">
            <div className="flex flex-col text-left">
              <EditableText id="footer-contact-label" as="p" className="text-white font-bold text-xs md:text-sm tracking-widest mb-2">
                {footer.contactLabel}
              </EditableText>
              <a href={`mailto:${footer.contactEmail}`} className="text-white/80 hover:text-white text-xs md:text-sm font-medium transition-colors block">
                <EditableText id="footer-email">{footer.contactEmail}</EditableText>
              </a>

              <EditableText id="footer-links-label" as="p" className="text-white font-bold text-xs md:text-sm tracking-widest mt-4 mb-1.5">
                {footer.usefulLinksLabel}
              </EditableText>
              <ul className="space-y-1">
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
