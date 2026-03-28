"use client";

import { useState } from "react";
import Navigation from "@/components/Navigation";
import Background from "@/components/Background";
import HeroSection from "@/components/HeroSection";
import IntroSection from "@/components/IntroSection";
import ProductShowcase from "@/components/ProductShowcase";
import VideoModalSection from "@/components/VideoModalSection";
import AccordionSection from "@/components/AccordionSection";
import ShopSection from "@/components/ShopSection";
import Footer from "@/components/Footer";
import { EditProvider } from "@/components/EditMode";

export default function Home() {
  const [bgColor, setBgColor] = useState("linear-gradient(180deg, #FF107A 0%, #FF5E00 100%)");

  return (
    <EditProvider>
      <main className="relative min-h-screen">
        <Background color={bgColor} />
        <Navigation />

        <HeroSection setBgColor={setBgColor} />
        <IntroSection setBgColor={setBgColor} />
        <ProductShowcase setBgColor={setBgColor} />
        <VideoModalSection />
        <AccordionSection />
        <ShopSection />

        <Footer setBgColor={setBgColor} />
      </main>
    </EditProvider>
  );
}
