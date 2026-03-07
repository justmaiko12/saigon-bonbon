"use client";

import { useState, useEffect } from "react";
import Navigation from "@/components/Navigation";
import Background from "@/components/Background";
import HeroSection from "@/components/HeroSection";
import IntroSection from "@/components/IntroSection";
import ProductShowcase from "@/components/ProductShowcase";
import VideoModalSection from "@/components/VideoModalSection";
import AccordionSection from "@/components/AccordionSection";
import StorySection from "@/components/StorySection";
import ShopSection from "@/components/ShopSection";
import Footer from "@/components/Footer";

export default function Home() {
  const [bgColor, setBgColor] = useState("linear-gradient(180deg, #FF107A 0%, #FF5E00 100%)");

  // Sync safe area colors: theme-color for top, body bg for bottom
  useEffect(() => {
    const colors = bgColor.match(/#[0-9A-Fa-f]{6}/g);
    if (!colors) return;
    const topColor = colors[0];
    const bottomColor = colors[colors.length - 1];

    // Top safe area (iOS status bar)
    let meta = document.querySelector('meta[name="theme-color"]') as HTMLMetaElement | null;
    if (!meta) {
      meta = document.createElement('meta');
      meta.name = 'theme-color';
      document.head.appendChild(meta);
    }
    meta.content = topColor;

    // Bottom safe area + html fallback
    document.documentElement.style.backgroundColor = topColor;
    document.body.style.backgroundColor = bottomColor;
  }, [bgColor]);

  return (
    <main className="relative min-h-screen">
      <Background color={bgColor} />
      <Navigation />
      
      {/* Sections */}
      <HeroSection setBgColor={setBgColor} />
      <IntroSection setBgColor={setBgColor} />
      <ProductShowcase setBgColor={setBgColor} />
      <VideoModalSection />
      <StorySection />
      <AccordionSection />
      <ShopSection />
      
      <Footer setBgColor={setBgColor} />
    </main>
  );
}