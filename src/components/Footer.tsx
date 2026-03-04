"use client";

import { ArrowRight } from "lucide-react";
import { useEffect, useRef } from "react";
import { useInView } from "framer-motion";

export default function Footer({ setBgColor }: { setBgColor?: (color: string) => void }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { margin: "-20% 0px" });

  useEffect(() => {
    if (isInView && setBgColor) {
      setBgColor("linear-gradient(180deg, #D92384 0%, #E35E28 100%)"); // A vibrant pink to orange based on the screenshot
    }
  }, [isInView, setBgColor]);

  return (
    <footer ref={ref} className="relative pt-32 pb-16 px-6 overflow-hidden mt-24">
      {/* Sunburst background rays */}
      <div 
        className="absolute inset-0 -z-10 mix-blend-overlay bg-bottom bg-no-repeat bg-cover opacity-60" 
        style={{ 
          backgroundImage: "url('/assets/footer-rays.png')",
          maskImage: "linear-gradient(to bottom, transparent, black 20%)",
          WebkitMaskImage: "linear-gradient(to bottom, transparent, black 20%)"
        }}
      />
      
      <div className="max-w-6xl mx-auto flex flex-col items-center">
        {/* Top Glass Card */}
        <div className="glass-panel p-8 md:p-16 rounded-3xl max-w-4xl w-full mb-16 shadow-2xl text-center md:text-left">
          <h2 className="font-serif text-2xl md:text-4xl font-bold text-white mb-6 tracking-wide">
            WE ARE SAIGON BONBON.
          </h2>
          <div className="space-y-4 text-white/90 text-sm md:text-base font-medium leading-relaxed max-w-3xl">
            <p>We honor where we come from and celebrate who we're becoming.<br/>Rooted in heritage, made with pride. We are Saigon Bonbon. This is our flavor.</p>
            <p>Saigon Bon Bon is for people who live through feeling. People who understand<br/>that flavor is not just taste, but a way memory, culture, and joy move through<br/>everyday life.</p>
          </div>
          <button className="mt-8 px-8 py-3 border border-white/30 rounded-full text-white text-xs font-bold tracking-widest hover:bg-white hover:text-black transition-colors">
            READ MORE
          </button>
        </div>

        <div className="h-[1px] w-full bg-white/30 mb-12 max-w-5xl" />

        {/* Bottom Section */}
        <div className="w-full max-w-5xl flex flex-col md:flex-row gap-12 justify-between items-start">
          
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center justify-center w-full md:w-auto">
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mb-2 border border-white/20">
                <span className="text-[10px] text-white/50 font-mono">ICON</span>
              </div>
              <span className="font-serif text-xl font-bold text-white tracking-widest leading-tight text-center">SAIGON<br/>BONBON</span>
            </div>
          </div>

          {/* Newsletter */}
          <div className="max-w-md w-full text-center md:text-left">
            <h3 className="font-serif text-xl md:text-2xl font-bold text-white mb-4">BE AN EARLY BONBONIST!</h3>
            <p className="text-white/80 text-xs md:text-sm mb-6 leading-relaxed font-medium">
              If our story resonates with you, we'd love to stay connected.<br/>
              Join our mailing list for quiet updates, thoughtful drops,<br/>
              and a little more of the culture we're proud to share.
            </p>
            <div className="flex items-center border-b border-white/50 pb-2 w-full group focus-within:border-white transition-colors">
              <input 
                type="email" 
                placeholder="Enter email address" 
                className="bg-transparent border-none outline-none text-white placeholder:text-white/50 flex-1 text-sm px-2 font-medium"
              />
              <button className="text-white hover:text-white/80 transition-colors pr-2">
                <div className="bg-white rounded-full p-1 text-[#D92384]">
                  <ArrowRight size={16} strokeWidth={3} />
                </div>
              </button>
            </div>
          </div>

          {/* Links */}
          <div className="flex flex-col text-center md:text-left w-full md:w-auto mt-4 md:mt-0">
            <p className="text-white font-bold text-xs md:text-sm tracking-widest mb-3">Wanna Chat? Email us at</p>
            <a href="mailto:hello@saigonbonbon.com" className="text-white/80 hover:text-white text-xs md:text-sm font-medium transition-colors block">hello@saigonbonbon.com</a>
            
            <p className="text-white font-bold text-xs md:text-sm tracking-widest mt-8 mb-4">Useful Links</p>
            <ul className="space-y-3">
              {['Our Story', 'Flavors', 'Shop'].map(link => (
                <li key={link}>
                  <a href="#" className="text-white/80 hover:text-white text-xs md:text-sm font-medium transition-colors">{link}</a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}