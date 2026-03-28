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
    <section className="relative w-full h-[85vh] overflow-hidden bg-gradient-to-br from-[#FF107A] to-[#FF5E00]">
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

      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black/30 to-transparent" />

      {!hasError && (
        <button
          onClick={toggleMute}
          className="absolute bottom-8 right-8 z-10 w-12 h-12 rounded-full bg-black/40 backdrop-blur-md border border-white/20 flex items-center justify-center text-white hover:bg-black/60 transition-colors"
        >
          {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
        </button>
      )}
    </section>
  );
}
