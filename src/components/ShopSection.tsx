"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function ShopSection() {
  return (
    <section className="relative py-24 px-4 flex flex-col items-center justify-center" id="shop">
      <div className="w-full max-w-5xl">
        <div className="grid md:grid-cols-2 gap-8 md:gap-12">
          
          {/* 3-Pack */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="glass-panel p-8 md:p-12 rounded-3xl flex flex-col items-center text-center shadow-2xl"
          >
            <h3 className="font-bold tracking-widest text-sm md:text-base mb-2 iridescent-text">3-PACK</h3>
            <h2 className="font-bolero text-2xl md:text-3xl font-bold mb-10 tracking-wide iridescent-text">SIGNATURE FLAVORS</h2>
            
            <div className="w-full relative h-[250px] md:h-[300px] mb-10">
              <Image 
                src="/assets/3_pack-transparent.png" 
                alt="3-Pack Signature Flavors"
                fill
                className="object-contain"
              />
            </div>

            <div className="flex items-center justify-between w-full mt-auto">
              <span className="text-white/90 text-2xl font-medium">$19.99</span>
              <button className="bg-white/20 hover:bg-white text-white hover:text-black transition-colors px-6 py-3 rounded-full font-bold text-xs tracking-widest border border-white/30">
                ADD TO CART
              </button>
            </div>
          </motion.div>

          {/* 6-Pack */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="glass-panel p-8 md:p-12 rounded-3xl flex flex-col items-center text-center shadow-2xl"
          >
            <h3 className="font-bold tracking-widest text-sm md:text-base mb-2 iridescent-text">6-PACK</h3>
            <h2 className="font-bolero text-2xl md:text-3xl font-bold mb-10 tracking-wide iridescent-text">SIGNATURE FLAVORS</h2>
            
            <div className="w-full relative h-[250px] md:h-[300px] mb-10">
              <Image 
                src="/assets/6_pack-transparent.png" 
                alt="6-Pack Signature Flavors"
                fill
                className="object-contain"
              />
            </div>

            <div className="flex items-center justify-between w-full mt-auto">
              <span className="text-white/90 text-2xl font-medium">$37.99</span>
              <button className="bg-white/20 hover:bg-white text-white hover:text-black transition-colors px-6 py-3 rounded-full font-bold text-xs tracking-widest border border-white/30">
                ADD TO CART
              </button>
            </div>
          </motion.div>

        </div>

        {/* Badges */}
        <div className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-12 lg:gap-16 mt-20">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0 }}
            viewport={{ once: true }}
            className="flex items-center gap-4"
          >
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#FF5E00] to-[#DDA2AC] flex items-center justify-center p-2 relative overflow-hidden">
              <div className="absolute inset-0 bg-white/20" />
              <Image src="/assets/lion-silhouettes-transparent.png" alt="Thoughtfully Made" width={24} height={24} className="object-contain z-10 drop-shadow-md brightness-0 invert" />
            </div>
            <span className="font-bold text-xs md:text-sm tracking-widest w-32 leading-tight uppercase font-bolero iridescent-text">THOUGHTFULLY<br/>MADE</span>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
            className="flex items-center gap-4"
          >
            <div className="w-12 h-12 rounded-full p-[2px] bg-gradient-to-br from-[#D5A1E3] via-[#FFD2CD] to-[#B4FFED]">
              <div className="w-full h-full bg-black/40 rounded-full flex items-center justify-center backdrop-blur-md">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="url(#iridescent-gradient)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <defs>
                    <linearGradient id="iridescent-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#D5A1E3" />
                      <stop offset="50%" stopColor="#FFD2CD" />
                      <stop offset="100%" stopColor="#B4FFED" />
                    </linearGradient>
                  </defs>
                  <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z"/>
                  <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12"/>
                </svg>
              </div>
            </div>
            <span className="font-bold text-xs md:text-sm tracking-widest w-32 leading-tight uppercase font-bolero iridescent-text">NO ARTIFICIAL<br/>COLORS OR FLAVORS</span>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="flex items-center gap-4"
          >
            <div className="w-12 h-12 relative flex items-center justify-center rounded-full overflow-hidden p-[2px] bg-gradient-to-br from-[#D5A1E3] via-[#FFD2CD] to-[#B4FFED]">
              <div className="w-full h-full bg-black/40 rounded-full flex items-center justify-center backdrop-blur-md relative">
                <Image src="/assets/usa-stamp-transparent.png" alt="Crafted in USA" fill className="object-contain p-1 opacity-90 drop-shadow-md brightness-200" />
              </div>
            </div>
            <span className="font-bold text-xs md:text-sm tracking-widest w-32 leading-tight uppercase font-bolero iridescent-text">CRAFTED<br/>IN THE USA</span>
          </motion.div>
        </div>
      </div>
    </section>
  );
}