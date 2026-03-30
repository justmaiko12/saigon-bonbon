"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

const CRITICAL_IMAGES = [
  "/assets/logo-transparent.png",
  "/assets/tee-pink.png",
  "/assets/lion-dance-orange.png",
  "/assets/3_pack-transparent.png",
  "/assets/6_pack-transparent.png",
];

export default function LoadingScreen({ children }: { children: React.ReactNode }) {
  const [ready, setReady] = useState(false);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    let cancelled = false;

    const preloadImages = CRITICAL_IMAGES.map(
      (src) =>
        new Promise<void>((resolve) => {
          const img = new window.Image();
          img.onload = () => resolve();
          img.onerror = () => resolve(); // Don't block on failures
          img.src = src;
        })
    );

    const fontsReady = document.fonts?.ready ?? Promise.resolve();

    // Wait for images + fonts, but cap at 4 seconds max
    const timeout = new Promise<void>((resolve) => setTimeout(resolve, 4000));

    Promise.race([
      Promise.all([...preloadImages, fontsReady]),
      timeout,
    ]).then(() => {
      if (cancelled) return;
      setFadeOut(true);
      setTimeout(() => {
        if (!cancelled) setReady(true);
      }, 600);
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
