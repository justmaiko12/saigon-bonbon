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
import { DiscountProvider } from "@/lib/discount";
import LoadingScreen from "@/components/LoadingScreen";
import { storySections } from "@/site-content";

export default function QRPage() {
  const [bgColor, setBgColor] = useState("linear-gradient(180deg, #FF107A 0%, #FF5E00 100%)");

  return (
    <DiscountProvider hasDiscount={true}>
    <LoadingScreen>
    <EditProvider>
      <main className="relative min-h-screen">
        <Background color={bgColor} />
        <Navigation />

        <HeroVideo />

        {storySections.map((section, i) => (
          <FlavorStory key={section.id} {...section} flipped={i % 2 === 1} />
        ))}

        <GummyScrollAnimation />

        <ProductShowcase setBgColor={setBgColor} />
        <NutritionHighlights />
        <ShopSection />

        <Footer setBgColor={setBgColor} />
      </main>
    </EditProvider>
    </LoadingScreen>
    </DiscountProvider>
  );
}
