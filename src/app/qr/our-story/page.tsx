"use client";

import { DiscountProvider } from "@/lib/discount";
import OurStoryPage from "@/app/our-story/page";

export default function QROurStoryPage() {
  return (
    <DiscountProvider hasDiscount={true}>
      <OurStoryPage />
    </DiscountProvider>
  );
}
