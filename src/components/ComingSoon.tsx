"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

const BYPASS_KEY = "sbb-preview";

const SECRET_PASS = "sb26";

export default function ComingSoon({ children }: { children: React.ReactNode }) {
  const [unlocked, setUnlocked] = useState(false);
  const [checking, setChecking] = useState(true);
  const [passInput, setPassInput] = useState("");
  const [shake, setShake] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get("preview") === "true" || localStorage.getItem(BYPASS_KEY) === "true") {
      localStorage.setItem(BYPASS_KEY, "true");
      setUnlocked(true);
    }
    setChecking(false);
  }, []);

  const handleSubmitPass = () => {
    if (passInput === SECRET_PASS) {
      localStorage.setItem(BYPASS_KEY, "true");
      setUnlocked(true);
    } else {
      setShake(true);
      setTimeout(() => setShake(false), 500);
      setPassInput("");
    }
  };

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

        {/* Secret pass — minimal, just looks like part of the page */}
        <div className={`w-full max-w-[200px] mt-16 ${shake ? "animate-[shake_0.3s_ease-in-out]" : ""}`}>
          <input
            type="password"
            value={passInput}
            onChange={(e) => setPassInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSubmitPass()}
            placeholder="- - - -"
            className="w-full bg-transparent border-none outline-none text-white/60 placeholder:text-white/20 text-sm font-medium tracking-[0.5em] text-center pb-2 border-b border-white/20 focus:border-white/40 transition-colors"
            style={{ borderBottom: "1px solid rgba(255,255,255,0.2)" }}
          />
        </div>
      </div>
    </div>
  );
}
