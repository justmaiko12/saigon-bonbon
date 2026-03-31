"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { heroVideo, gummyScroll, flavors } from "@/site-content";

// Preload all video assets into browser cache
function preloadVideos(): Promise<void> {
  const urls = [
    heroVideo.src,
    gummyScroll.videoSrc,
    ...flavors.map(f => f.video).filter(Boolean),
  ] as string[];

  return Promise.all(
    urls.map(url => fetch(url).catch(() => {}))
  ).then(() => {});
}

export default function LoadingScreen({ children }: { children: React.ReactNode }) {
  const [ready, setReady] = useState(false);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    let cancelled = false;

    const fontsReady = document.fonts?.ready ?? Promise.resolve();
    const videosReady = preloadVideos();
    // Minimum 800ms so the screen doesn't flash, max 6s for slow connections
    const minWait = new Promise<void>((r) => setTimeout(r, 800));
    const maxWait = new Promise<void>((r) => setTimeout(r, 6000));

    Promise.race([
      Promise.all([fontsReady, videosReady, minWait]),
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
