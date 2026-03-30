"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

export default function LoadingScreen({ children }: { children: React.ReactNode }) {
  const [ready, setReady] = useState(false);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    let cancelled = false;

    const fontsReady = document.fonts?.ready ?? Promise.resolve();
    // Minimum 800ms so the screen doesn't flash, max 3s so it doesn't hang
    const minWait = new Promise<void>((r) => setTimeout(r, 800));
    const maxWait = new Promise<void>((r) => setTimeout(r, 3000));

    Promise.race([
      Promise.all([fontsReady, minWait]),
      maxWait,
    ]).then(() => {
      if (cancelled) return;
      setFadeOut(true);
      setTimeout(() => {
        if (!cancelled) setReady(true);
      }, 500);
    });

    return () => { cancelled = true; };
  }, []);

  return (
    <>
      {children}
      {!ready && (
        <div
          className={`fixed inset-0 z-[9999] flex flex-col items-center justify-center transition-opacity duration-500 ${
            fadeOut ? "opacity-0 pointer-events-none" : "opacity-100"
          }`}
          style={{ background: "linear-gradient(180deg, #FF107A 0%, #FF5E00 100%)" }}
        >
          <div className="animate-pulse">
            <Image
              src="/assets/logo-transparent.png"
              alt="Saigon Bonbon"
              width={120}
              height={120}
              priority
            />
          </div>
        </div>
      )}
    </>
  );
}
