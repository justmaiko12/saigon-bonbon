"use client";

import { useState } from "react";
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