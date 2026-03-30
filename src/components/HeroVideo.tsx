"use client";

import { useRef, useState } from "react";
import { Volume2, VolumeX } from "lucide-react";
import { heroVideo } from "@/site-content";

export default function HeroVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isMuted, setIsMuted] = useState(true);
  const [hasError, setHasError] = useState(false);

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
      setIsMuted(videoRef.current.muted);
    }
  };

  return (
    <section className="relative w-full pt-20 sm:pt-24 pb-20 sm:pb-28 md:pb-36 px-4 sm:px-6 md:px-10">
      <div className="relative w-full max-w-7xl mx-auto h-[75vh] sm:h-[80vh] overflow-hidden rounded-3xl bg-gradient-to-br from-[#FF107A] to-[#FF5E00]">
        {!hasError && (
          <video
            ref={videoRef}
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            onVolumeChange={() => setIsMuted(videoRef.current?.muted ?? true)}
            onError={() => setHasError(true)}
            className="absolute inset-0 w-full h-full object-cover"
          >
            <source src={heroVideo.src} type="video/mp4" />
          </video>
        )}

        {!hasError && (
          <button
            onClick={toggleMute}
            className="absolute bottom-6 right-6 z-10 w-10 h-10 rounded-full bg-black/40 backdrop-blur-md border border-white/20 flex items-center justify-center text-white hover:bg-black/60 transition-colors"
          >
            {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
          </button>
        )}
      </div>
    </section>
  );
}
