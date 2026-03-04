"use client";

import { ArrowRight } from "lucide-react";

export default function Footer() {
  return (
    <footer className="relative pt-32 pb-16 px-6 overflow-hidden mt-24">
      {/* Sunburst background rays */}
      <div 
        className="absolute inset-0 -z-10 opacity-30 mix-blend-overlay bg-bottom bg-no-repeat bg-cover" 
        style={{ backgroundImage: "url('/assets/footer-rays.png')" }}
      />
      
      <div className="max-w-6xl mx-auto flex flex-col items-center">
        {/* Top Glass Card */}
        <div className="glass-panel p-8 md:p-16 rounded-3xl max-w-4xl w-full mb-20 shadow-2xl text-center md:text-left">
          <h2 className="font-serif text-2xl md:text-4xl font-bold text-white mb-8 tracking-wide">
            WE ARE SAIGON BONBON.
          </h2>
          <div className="space-y-6 text-white/90 text-sm md:text-base font-medium leading-relaxed max-w-3xl">
            <p>We honor where we come from and celebrate who we're becoming. Rooted in heritage, made with pride. We are Saigon Bonbon. This is our flavor.</p>
            <p>Saigon Bon Bon is for people who live through feeling. People who understand that flavor is not just taste, but a way memory, culture, and joy move through everyday life.</p>
          </div>
          <button className="mt-10 px-8 py-3 border border-white/30 rounded-full text-white text-xs font-bold tracking-widest hover:bg-white hover:text-black transition-colors">
            READ MORE
          </button>
        </div>

        <div className="h-[1px] w-full bg-white/10 mb-16 max-w-5xl" />

        {/* Bottom Section */}
        <div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-8">
          {/* Logo */}
          <div className="md:col-span-3 flex flex-col items-center md:items-start text-center md:text-left">
            <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mb-6 border border-white/20">
              <span className="text-[10px] text-white/50 font-mono">LOGO</span>
            </div>
            <span className="font-serif text-2xl font-bold text-white tracking-widest leading-tight">SAIGON<br/>BONBON</span>
          </div>

          {/* Newsletter */}
          <div className="md:col-span-5 flex flex-col items-center md:items-start text-center md:text-left">
            <h3 className="font-serif text-xl md:text-2xl font-bold text-white mb-4">BE AN EARLY BONBONIST!</h3>
            <p className="text-white/70 text-sm mb-8 max-w-sm leading-relaxed">
              If our story resonates with you, we'd love to stay connected. Join our mailing list for quiet updates, thoughtful drops, and a little more of the culture we're proud to share.
            </p>
            <div className="flex items-center border-b border-white/30 pb-2 w-full max-w-md group focus-within:border-white transition-colors">
              <input 
                type="email" 
                placeholder="Enter email address" 
                className="bg-transparent border-none outline-none text-white placeholder:text-white/40 flex-1 text-sm px-2"
              />
              <button className="text-white/50 hover:text-white transition-colors pr-2">
                <ArrowRight size={20} />
              </button>
            </div>
          </div>

          {/* Links */}
          <div className="md:col-span-4 grid grid-cols-2 gap-8 text-center md:text-left mt-8 md:mt-0">
            <div>
              <p className="text-white font-bold text-xs tracking-widest mb-6">Wanna Chat? Email us at</p>
              <a href="mailto:hello@saigonbonbon.com" className="text-white/70 hover:text-white text-sm transition-colors block">hello@saigonbonbon.com</a>
            </div>
            <div>
              <p className="text-white font-bold text-xs tracking-widest mb-6">Useful Links</p>
              <ul className="space-y-4">
                {['Our Story', 'Flavors', 'Shop', 'FAQ', 'Blog'].map(link => (
                  <li key={link}>
                    <a href="#" className="text-white/70 hover:text-white text-sm transition-colors">{link}</a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}