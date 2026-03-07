"use client";

import HeroSection from "@/components/HeroSection";
import ProductShowcase from "@/components/ProductShowcase";
import ProofStrip from "@/components/ProofStrip";
import VideoModalSection from "@/components/VideoModalSection";
import StorySection from "@/components/StorySection";
import ShopSection from "@/components/ShopSection";

export default function PageOption2({ setBgColor }: { setBgColor: (color: string) => void }) {
  return (
    <>
      <HeroSection setBgColor={setBgColor} variant="minimal" />
      <ProductShowcase setBgColor={setBgColor} />
      <ProofStrip />
      <VideoModalSection variant="compact" />
      <StorySection variant="condensed" />
      <ShopSection variant="no-badges" />
    </>
  );
}