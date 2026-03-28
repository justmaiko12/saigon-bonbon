"use client";

import { createContext, useContext, useState, useCallback, useEffect } from "react";
import { storefront, CREATE_CART, ADD_TO_CART } from "./shopify";

interface CartLine {
  id: string;
  quantity: number;
  variantId: string;
  title: string;
  price: string;
}

interface CartContextType {
  cartId: string | null;
  lines: CartLine[];
  totalAmount: string;
  itemCount: number;
  isLoading: boolean;
  addToCart: (variantId: string, quantity?: number) => Promise<void>;
  buyNow: (variantId: string, quantity?: number) => Promise<void>;
}

const CartContext = createContext<CartContextType>({
  cartId: null,
  lines: [],
  totalAmount: "0.00",
  itemCount: 0,
  isLoading: false,
  addToCart: async () => {},
  buyNow: async () => {},
});

export const useCart = () => useContext(CartContext);

function parseCart(cart: any): { cartId: string; lines: CartLine[]; totalAmount: string; checkoutUrl: string } {
  return {
    cartId: cart.id,
    checkoutUrl: cart.checkoutUrl,
    totalAmount: cart.cost.totalAmount.amount,
    lines: cart.lines.edges.map((e: any) => ({
      id: e.node.id,
      quantity: e.node.quantity,
      variantId: e.node.merchandise.id,
      title: e.node.merchandise.title,
      price: e.node.merchandise.price.amount,
    })),
  };
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cartId, setCartId] = useState<string | null>(null);
  const [checkoutUrl, setCheckoutUrl] = useState<string | null>(null);
  const [lines, setLines] = useState<CartLine[]>([]);
  const [totalAmount, setTotalAmount] = useState("0.00");
  const [isLoading, setIsLoading] = useState(false);

  // Restore cart ID from localStorage
  useEffect(() => {
    const saved = localStorage.getItem("sbb-cart-id");
    if (saved) setCartId(saved);
  }, []);

  const createCart = useCallback(async (variantId: string, quantity: number) => {
    const data = await storefront(CREATE_CART, {
      input: {
        lines: [{ merchandiseId: variantId, quantity }],
      },
    });

    const cart = data.cartCreate.cart;
    if (data.cartCreate.userErrors.length > 0) {
      throw new Error(data.cartCreate.userErrors[0].message);
    }

    const parsed = parseCart(cart);
    setCartId(parsed.cartId);
    setCheckoutUrl(parsed.checkoutUrl);
    setLines(parsed.lines);
    setTotalAmount(parsed.totalAmount);
    localStorage.setItem("sbb-cart-id", parsed.cartId);
    return parsed;
  }, []);

  const addToCart = useCallback(async (variantId: string, quantity = 1) => {
    setIsLoading(true);
    try {
      if (!cartId) {
        await createCart(variantId, quantity);
      } else {
        const data = await storefront(ADD_TO_CART, {
          cartId,
          lines: [{ merchandiseId: variantId, quantity }],
        });

        const cart = data.cartLinesAdd.cart;
        if (data.cartLinesAdd.userErrors.length > 0) {
          throw new Error(data.cartLinesAdd.userErrors[0].message);
        }

        const parsed = parseCart(cart);
        setCheckoutUrl(parsed.checkoutUrl);
        setLines(parsed.lines);
        setTotalAmount(parsed.totalAmount);
      }
    } catch (err) {
      console.error("Add to cart failed:", err);
      // Cart might be expired — create a new one
      if (cartId) {
        localStorage.removeItem("sbb-cart-id");
        setCartId(null);
        await createCart(variantId, quantity);
      }
    } finally {
      setIsLoading(false);
    }
  }, [cartId, createCart]);

  const buyNow = useCallback(async (variantId: string, quantity = 1) => {
    setIsLoading(true);
    try {
      const parsed = await createCart(variantId, quantity);
      window.location.href = parsed.checkoutUrl;
    } catch (err) {
      console.error("Buy now failed:", err);
    } finally {
      setIsLoading(false);
    }
  }, [createCart]);

  const itemCount = lines.reduce((sum, l) => sum + l.quantity, 0);

  return (
    <CartContext.Provider value={{ cartId, lines, totalAmount, itemCount, isLoading, addToCart, buyNow }}>
      {children}
    </CartContext.Provider>
  );
}
