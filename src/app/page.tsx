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
import LayoutToggle from "@/components/LayoutToggle";
import PageOption2 from "@/components/PageOption2";

export default function Home() {
  const [bgColor, setBgColor] = useState("linear-gradient(180deg, #FF107A 0%, #FF5E00 100%)");
  const [layout, setLayout] = useState<"option1" | "option2">("option1");

  useEffect(() => {
    const saved = localStorage.getItem("sbb-layout") as "option1" | "option2" | null;
    if (saved) setLayout(saved);
  }, []);

  const handleSetLayout = (l: "option1" | "option2") => {
    setLayout(l);
    localStorage.setItem("sbb-layout", l);
  };

  return (
    <main className="relative min-h-screen">
      <Background color={bgColor} />
      <Navigation />
      <LayoutToggle layout={layout} setLayout={handleSetLayout} />

      {layout === "option1" ? (
        <>
          <HeroSection setBgColor={setBgColor} />
          <IntroSection setBgColor={setBgColor} />
          <ProductShowcase setBgColor={setBgColor} />
          <VideoModalSection />
          <StorySection />
          <AccordionSection />
          <ShopSection />
        </>
      ) : (
        <PageOption2 setBgColor={setBgColor} />
      )}

      <Footer setBgColor={setBgColor} />
    </main>
  );
}