"use client";

import { createContext, useContext } from "react";

const DISCOUNT_CODE = "EARLYBIRD20";

interface DiscountContextType {
  hasDiscount: boolean;
  discountCode: string;
  discountPercent: number;
}

const DiscountContext = createContext<DiscountContextType>({
  hasDiscount: false,
  discountCode: DISCOUNT_CODE,
  discountPercent: 20,
});

export function DiscountProvider({ hasDiscount, children }: { hasDiscount: boolean; children: React.ReactNode }) {
  return (
    <DiscountContext.Provider value={{ hasDiscount, discountCode: DISCOUNT_CODE, discountPercent: 20 }}>
      {children}
    </DiscountContext.Provider>
  );
}

export function useDiscount() {
  return useContext(DiscountContext);
}
