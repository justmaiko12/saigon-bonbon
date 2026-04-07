"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import Background from "@/components/Background";

const ORIGINAL_HTML = `
<h1 style="text-align: center; font-size: 3rem; font-weight: 700; margin-bottom: 0.5rem;">Let's Connect!</h1>
<div style="max-width: 480px; margin: 0 auto; padding: 2rem 1rem; font-family: inherit; text-align: center;">
<img src="https://cdn.shopify.com/s/files/1/0802/7720/9343/files/tee.jpg?v=1773481637" alt="Tee Tran" style="width: 120px; height: 120px; border-radius: 50%; object-fit: cover; object-position: center top; margin-bottom: 1.25rem; display: block; margin-left: auto; margin-right: auto;">
<p style="font-size: 1.5rem; font-weight: 600; margin: 0 0 0.25rem;">Tee Tran</p>
<p style="margin: 0 0 1.25rem; opacity: 0.6; font-size: 0.95rem;">Founder &amp; CEO, Saigon Bonbon Inc.</p>
<p style="margin: 0 0 2rem; font-size: 1rem; line-height: 1.7;">I founded Saigon Bonbon, a modern Vietnamese American candy brand celebrating identity through flavor and expression. Let's talk!</p>
<a style="display: inline-block; padding: 0.75rem 2rem; background: #000; color: #fff; text-decoration: none; border-radius: 4px; font-size: 0.95rem; margin-bottom: 2.5rem;" href="https://cdn.shopify.com/s/files/1/0802/7720/9343/files/Tee_Tran_-_Saigon_Bonbon.vcf?v=1773479585" id="vcf-download">Save Contact</a>
<p style="margin: 0 0 0.75rem; font-size: 0.85rem; opacity: 0.5; text-transform: uppercase; letter-spacing: 0.08em;">Follow along</p>
<div style="display: flex; justify-content: center; gap: 1rem; flex-wrap: wrap;">
<a style="text-decoration: none; color: inherit; font-size: 0.95rem; opacity: 0.75;" href="https://linkedin.com/in/teetranofficial">LinkedIn</a>
<a style="text-decoration: none; color: inherit; font-size: 0.95rem; opacity: 0.75;" href="https://instagram.com/teetranofficial">Instagram</a>
<a style="text-decoration: none; color: inherit; font-size: 0.95rem; opacity: 0.75;" href="https://tiktok.com/@teetranofficial">TikTok</a>
<a style="text-decoration: none; color: inherit; font-size: 0.95rem; opacity: 0.75;" href="https://youtube.com/@teetranofficial">YouTube</a>
</div>
</div>
`;

const SOCIALS = [
  { name: "LinkedIn", href: "https://linkedin.com/in/teetranofficial" },
  { name: "Instagram", href: "https://instagram.com/teetranofficial" },
  { name: "TikTok", href: "https://tiktok.com/@teetranofficial" },
  { name: "YouTube", href: "https://youtube.com/@teetranofficial" },
];

const VCF_URL =
  "https://cdn.shopify.com/s/files/1/0802/7720/9343/files/Tee_Tran_-_Saigon_Bonbon.vcf?v=1773479585";

export default function TeeTranContactPage() {
  const [version, setVersion] = useState<1 | 2>(2);

  return (
    <main className="relative min-h-screen">
      {/* Version toggle */}
      <div className="fixed top-4 right-4 z-50 flex items-center gap-0.5 rounded-full bg-black/60 p-1 text-[11px] font-semibold uppercase tracking-wider text-white backdrop-blur-xl border border-white/10 shadow-lg">
        <button
          onClick={() => setVersion(1)}
          className={`px-3.5 py-1.5 rounded-full transition-all duration-300 ${
            version === 1 ? "bg-white text-black shadow" : "hover:text-white/80"
          }`}
        >
          Original
        </button>
        <button
          onClick={() => setVersion(2)}
          className={`px-3.5 py-1.5 rounded-full transition-all duration-300 ${
            version === 2 ? "bg-white text-black shadow" : "hover:text-white/80"
          }`}
        >
          Brand
        </button>
      </div>

      {version === 1 ? <OriginalVersion /> : <BrandVersion />}
    </main>
  );
}

function OriginalVersion() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-white px-4 py-16 text-neutral-900">
      <div dangerouslySetInnerHTML={{ __html: ORIGINAL_HTML }} />
    </div>
  );
}

function BrandVersion() {
  return (
    <div className="relative min-h-screen overflow-hidden">
      <Background color="linear-gradient(180deg, #FF107A 0%, #FF5E00 100%)" />

      {/* Subtle grain overlay */}
      <div
        className="pointer-events-none fixed inset-0 z-0 opacity-[0.12] mix-blend-overlay"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
        }}
      />

      <div className="relative z-10 flex min-h-screen flex-col items-center justify-center px-6 py-24">
        <div className="flex w-full max-w-lg flex-col items-center text-center">
          {/* Portrait */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="relative mb-7 h-44 w-44 md:h-52 md:w-52"
          >
            <div className="absolute -inset-2 rounded-full bg-white/20 blur-xl" />
            <div className="relative h-full w-full overflow-hidden rounded-full ring-[3px] ring-white/40 shadow-[0_20px_60px_rgba(0,0,0,0.35)]">
              <Image
                src="/assets/tee-portrait.jpg"
                alt="Tee Tran"
                fill
                className="object-cover object-top"
                sizes="(max-width: 768px) 176px, 208px"
                priority
              />
            </div>
          </motion.div>

          {/* Label */}
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-3 text-[10px] font-bold uppercase tracking-[0.28em] text-white/70 md:text-xs"
          >
            Founder &amp; CEO · Saigon Bonbon
          </motion.p>

          {/* Name */}
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.85, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="font-bolero iridescent-text mb-5 text-5xl font-bold leading-[0.9] tracking-wide sm:text-6xl md:text-7xl"
          >
            TEE TRAN
          </motion.h1>

          {/* Bio */}
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, delay: 0.42 }}
            className="mb-9 max-w-md text-sm font-medium leading-relaxed text-white/90 md:text-base"
          >
            I founded Saigon Bonbon, a modern Vietnamese American candy brand
            celebrating identity through flavor and expression.{" "}
            <em className="not-italic font-semibold text-white">Let&apos;s talk.</em>
          </motion.p>

          {/* CTA */}
          <motion.a
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, delay: 0.52 }}
            whileHover={{ scale: 1.04, y: -2 }}
            whileTap={{ scale: 0.98 }}
            href={VCF_URL}
            className="group mb-11 inline-flex items-center gap-2.5 rounded-full bg-white px-9 py-3.5 text-[13px] font-bold uppercase tracking-[0.12em] text-black shadow-[0_14px_40px_rgba(0,0,0,0.28)] transition-shadow duration-300 hover:shadow-[0_20px_55px_rgba(0,0,0,0.4)]"
          >
            <span>Save Contact</span>
            <svg
              width="15"
              height="15"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.75"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="transition-transform duration-300 group-hover:translate-y-0.5"
            >
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="7 10 12 15 17 10" />
              <line x1="12" y1="15" x2="12" y2="3" />
            </svg>
          </motion.a>

          {/* Divider label */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.68 }}
            className="mb-4 flex items-center gap-3 text-[10px] font-bold uppercase tracking-[0.28em] text-white/55"
          >
            <span className="h-px w-8 bg-white/30" />
            <span>Follow Along</span>
            <span className="h-px w-8 bg-white/30" />
          </motion.div>

          {/* Social chips */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: 0.08, delayChildren: 0.75 } },
            }}
            className="flex flex-wrap justify-center gap-2"
          >
            {SOCIALS.map((s) => (
              <motion.a
                key={s.name}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                variants={{
                  hidden: { opacity: 0, y: 12 },
                  visible: { opacity: 1, y: 0 },
                }}
                whileHover={{ scale: 1.06, y: -2 }}
                whileTap={{ scale: 0.96 }}
                className="rounded-full border border-white/35 bg-white/15 px-5 py-2 text-[11px] font-bold uppercase tracking-[0.14em] text-white backdrop-blur-md transition-colors duration-300 hover:bg-white hover:text-black"
              >
                {s.name}
              </motion.a>
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  );
}
