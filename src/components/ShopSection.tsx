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
                src="/assets/3_pack.png" 
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
                src="/assets/6_pack.png" 
                alt="6-Pack Signature Flavors"
                fill
                className="object-contain scale-110"
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
        <div className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-16 mt-20">
          {[
            { title: "THOUGHTFULLY MADE", icon: "🌱" },
            { title: "NO ARTIFICIAL COLORS OR FLAVORS", icon: "🚫" },
            { title: "CRAFTED IN THE USA", icon: "🇺🇸" }
          ].map((badge, i) => (
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              viewport={{ once: true }}
              key={i} 
              className="flex items-center gap-4"
            >
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-white/20 to-white/5 border border-white/20 flex items-center justify-center text-lg">
                {badge.icon}
              </div>
              <span className="text-white/80 font-bold text-xs tracking-widest w-32 leading-tight">{badge.title}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}