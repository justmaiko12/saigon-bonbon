"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { shop } from "@/site-content";
import { EditableText, EditableImage, Draggable } from "@/components/EditMode";
import { useDiscount } from "@/lib/discount";

interface ShopifyProduct {
  id: number;
  title: string;
  handle: string;
  checkoutUrl: string;
  variants: { id: number; title: string; price: string; available: boolean }[];
}

const SALE_PRICES: Record<string, string> = {
  "$19.99": "$16.00",
  "$39.98": "$31.99",
};

function PackCard({ pack, id, checkoutUrl, freeShipping }: { pack: typeof shop.threePack; id: string; checkoutUrl?: string; freeShipping?: boolean }) {
  const [isLoading, setIsLoading] = useState(false);
  const { hasDiscount, discountCode } = useDiscount();
  const salePrice = SALE_PRICES[pack.price] || pack.price;

  const handleBuy = () => {
    if (!checkoutUrl) {
      window.open("https://saigonbonbon.com", "_blank");
      return;
    }
    setIsLoading(true);
    // Use Shopify's /discount/ route to reliably apply code before cart redirect
    if (hasDiscount) {
      const cartPath = new URL(checkoutUrl).pathname;
      window.location.href = `https://saigon-bonbon.myshopify.com/discount/${discountCode}?redirect=${cartPath}`;
    } else {
      window.location.href = checkoutUrl;
    }
  };

  return (
    <Draggable id={`shop-${id}`}>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="glass-panel p-8 md:p-12 rounded-3xl flex flex-col items-center text-center shadow-2xl relative overflow-hidden"
      >
        {hasDiscount && (
          <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-sm border border-white/30 rounded-full px-3 py-1">
            <span className="text-[10px] font-bold tracking-widest text-white uppercase">20% Exclusive</span>
          </div>
        )}

        {freeShipping && (
          <div className="absolute top-0 right-0 z-10 pointer-events-none overflow-hidden rounded-tr-3xl" style={{ width: "120px", height: "120px" }}>
            {/* Corner triangle */}
            <div
              className="absolute inset-0"
              style={{
                background: "linear-gradient(225deg, #AF0032 0%, #E51088 50%, transparent 50%)",
              }}
            />
            {/* Text image on diagonal */}
            <div
              className="absolute"
              style={{
                top: "8px",
                right: "8px",
                width: "70px",
                height: "70px",
                transform: "rotate(5deg)",
              }}
            >
              <img src="/assets/free-shipping-text.png" alt="Free Shipping!" className="w-full h-full object-contain drop-shadow-lg" />
            </div>
          </div>
        )}

        <EditableText id={`shop-${id}-label`} as="h3" className="font-bold tracking-widest text-sm md:text-base mb-2 iridescent-text">
          {pack.label}
        </EditableText>
        <EditableText id={`shop-${id}-title`} as="h2" className={`font-bolero text-2xl md:text-3xl font-bold ${hasDiscount ? "mb-2" : "mb-10"} tracking-wide iridescent-text`}>
          {pack.title}
        </EditableText>

        {hasDiscount && (
          <p className="text-white/60 text-[11px] font-bold tracking-[0.2em] uppercase mb-8">Exclusive Launch Pricing</p>
        )}

        <div className="w-full relative h-[250px] md:h-[300px] mb-10">
          <EditableImage
            id={`shop-${id}-image`}
            src={pack.image}
            alt={`${pack.label} ${pack.title}`}
            fill
            className="object-contain"
          />
        </div>

        <div className="flex items-center justify-between w-full mt-auto">
          {hasDiscount ? (
            <div className="flex items-baseline gap-3">
              <span className="text-white text-2xl font-bold">{salePrice}</span>
              <span className="text-white/40 text-base line-through">{pack.price}</span>
            </div>
          ) : (
            <span className="text-white/90 text-2xl font-medium">{pack.price}</span>
          )}
          <button
            onClick={handleBuy}
            disabled={isLoading}
            className="bg-white/20 hover:bg-white text-white hover:text-black transition-colors px-6 py-3 rounded-full font-bold text-xs tracking-widest border border-white/30 disabled:opacity-50"
          >
            {isLoading ? "..." : pack.buttonText}
          </button>
        </div>
      </motion.div>
    </Draggable>
  );
}

export default function ShopSection({ variant = "full" }: { variant?: "full" | "no-badges" }) {
  const [products, setProducts] = useState<ShopifyProduct[]>([]);

  useEffect(() => {
    fetch("/api/shopify/products")
      .then((r) => r.json())
      .then((data) => {
        if (data.products) setProducts(data.products);
      })
      .catch((err) => console.error("Failed to fetch products:", err));
  }, []);

  // Match by title
  const threePack = products.find((p) => p.title.toLowerCase().includes("3"));
  const sixPack = products.find((p) => p.title.toLowerCase().includes("6"));

  return (
    <section className="relative pt-24 pb-8 px-4 flex flex-col items-center justify-center" id="shop">
      <div className="w-full max-w-5xl">
        <div className="grid md:grid-cols-2 gap-8 md:gap-12">
          <PackCard pack={shop.threePack} id="3pack" checkoutUrl={threePack?.checkoutUrl} />
          <PackCard pack={shop.sixPack} id="6pack" checkoutUrl={sixPack?.checkoutUrl} freeShipping />
        </div>

        {/* Badges — triangle on mobile (1 top centered, 2 bottom), row on desktop */}
        {variant === "full" && <div className="grid grid-cols-2 md:flex md:flex-row items-center justify-center gap-6 md:gap-12 lg:gap-16 mt-20">
          {shop.badges.map((badge, i) => (
            <Draggable key={i} id={`shop-badge-${i}`}>
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                viewport={{ once: true }}
                className={`flex items-center gap-3 md:gap-4 ${i === 0 ? "col-span-2 justify-center" : "justify-center"}`}
              >
                {badge.icon === "lion" ? (
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#FF5E00] to-[#DDA2AC] flex items-center justify-center p-2 relative overflow-hidden">
                    <div className="absolute inset-0 bg-white/20" />
                    <EditableImage id={`badge-${i}-icon`} src={badge.image!} alt={badge.label} width={24} height={24} className="object-contain z-10 drop-shadow-md brightness-0 invert" />
                  </div>
                ) : badge.icon === "leaf" ? (
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
                ) : (
                  <div className="w-12 h-12 relative flex items-center justify-center rounded-full overflow-hidden p-[2px] bg-gradient-to-br from-[#D5A1E3] via-[#FFD2CD] to-[#B4FFED]">
                    <div className="w-full h-full bg-black/40 rounded-full flex items-center justify-center backdrop-blur-md relative">
                      <EditableImage id={`badge-${i}-icon`} src={badge.image!} alt={badge.label} fill className="object-contain p-1 opacity-90 drop-shadow-md brightness-200" />
                    </div>
                  </div>
                )}
                <span className="font-bold text-xs md:text-sm tracking-widest w-32 leading-tight uppercase font-bolero iridescent-text whitespace-pre-line">
                  {badge.label}
                </span>
              </motion.div>
            </Draggable>
          ))}
        </div>}
      </div>
    </section>
  );
}
