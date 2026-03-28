"use client";

import { useState } from "react";
import Navigation from "@/components/Navigation";
import Background from "@/components/Background";
import HeroVideo from "@/components/HeroVideo";
import FlavorStory from "@/components/FlavorStory";
import GummyScrollAnimation from "@/components/GummyScrollAnimation";
import ProductShowcase from "@/components/ProductShowcase";
import NutritionHighlights from "@/components/NutritionHighlights";
import ShopSection from "@/components/ShopSection";
import Footer from "@/components/Footer";
import { EditProvider } from "@/components/EditMode";
import { storySections } from "@/site-content";

export default function Home() {
  const [bgColor, setBgColor] = useState("linear-gradient(180deg, #FF107A 0%, #FF5E00 100%)");

  return (
    <EditProvider>
      <main className="relative min-h-screen">
        <Background color={bgColor} />
        <Navigation />

        <HeroVideo />

        {storySections.map((section) => (
          <FlavorStory key={section.id} {...section} />
        ))}

        <GummyScrollAnimation />

        <ProductShowcase setBgColor={setBgColor} />
        <NutritionHighlights />
        <ShopSection />

        <Footer setBgColor={setBgColor} />
      </main>
    </EditProvider>
  );
}
