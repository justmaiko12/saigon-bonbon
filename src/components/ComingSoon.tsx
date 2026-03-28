"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

const BYPASS_KEY = "sbb-preview";

export default function ComingSoon({ children }: { children: React.ReactNode }) {
  const [unlocked, setUnlocked] = useState(false);
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    // Check URL param or localStorage for bypass
    const params = new URLSearchParams(window.location.search);
    if (params.get("preview") === "true" || localStorage.getItem(BYPASS_KEY) === "true") {
      localStorage.setItem(BYPASS_KEY, "true");
      setUnlocked(true);
    }
    setChecking(false);
  }, []);

  if (checking) return null;

  if (unlocked) return <>{children}</>;

  return (
    <div
      className="fixed inset-0 flex flex-col items-center justify-center px-6 text-center"
      style={{ background: "linear-gradient(180deg, #FF107A 0%, #FF5E00 100%)" }}
    >
      {/* Amulet pattern overlay */}
      <div
        className="absolute inset-0 opacity-40 pointer-events-none"
        style={{
          backgroundImage: "url('/assets/amulet-pattern-top.png')",
          backgroundRepeat: "no-repeat",
          backgroundSize: "100% auto",
          backgroundPosition: "top center",
        }}
      />

      <div className="relative z-10 flex flex-col items-center">
        {/* Logo */}
        <div className="relative w-40 h-56 sm:w-48 sm:h-64 mb-8">
          <Image
            src="/assets/footer-logo.png"
            alt="Saigon Bonbon"
            fill
            className="object-contain"
            priority
          />
        </div>

        {/* Headline */}
        <h1 className="font-bolero iridescent-text text-3xl sm:text-4xl md:text-5xl font-bold tracking-wide mb-4 leading-tight">
          WEBSITE GOING<br />LIVE SOON.
        </h1>

        <p className="text-white/80 text-sm sm:text-base font-medium tracking-wider uppercase mb-10">
          Stay tuned.
        </p>

        {/* Email signup */}
        <div className="w-full max-w-sm">
          <div className="flex items-center border-b border-white/50 pb-2 group focus-within:border-white transition-colors">
            <input
              type="email"
              placeholder="Enter email address"
              className="bg-transparent border-none outline-none text-white placeholder:text-white/50 flex-1 text-sm px-2 font-medium"
            />
            <button className="text-white hover:text-white/80 transition-colors pr-2">
              <div className="bg-white rounded-full p-1.5 text-[#D92384]">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14" />
                  <path d="m12 5 7 7-7 7" />
                </svg>
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
