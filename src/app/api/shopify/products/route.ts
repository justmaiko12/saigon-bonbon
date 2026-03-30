import { NextResponse } from "next/server";

// Direct checkout URLs using product handles
// These bypass the product page and go straight to cart → checkout
const SHOP = "saigon-bonbon.myshopify.com";

export async function GET() {
  // We hardcode the product data since we know the products
  // The checkout URL format /cart/VARIANT_ID:QTY goes directly to checkout
  // To get variant IDs, we use the Storefront-accessible product JSON
  try {
    const [threePackRes, sixPackRes] = await Promise.all([
      fetch(`https://${SHOP}/products/3-pack-signature-flavors.json`),
      fetch(`https://${SHOP}/products/saigon-bonbon-6-pack-signature-flavors.json`),
    ]);

    const products = [];

    if (threePackRes.ok) {
      const data = await threePackRes.json();
      const p = data.product;
      const variantId = p.variants[0]?.id;
      products.push({
        id: p.id,
        title: p.title,
        handle: p.handle,
        price: p.variants[0]?.price,
        checkoutUrl: `https://${SHOP}/cart/${variantId}:1`,
      });
    }

    if (sixPackRes.ok) {
      const data = await sixPackRes.json();
      const p = data.product;
      const variantId = p.variants[0]?.id;
      products.push({
        id: p.id,
        title: p.title,
        handle: p.handle,
        price: p.variants[0]?.price,
        checkoutUrl: `https://${SHOP}/cart/${variantId}:1`,
      });
    }

    // Fallback: try fetching all products via the public JSON API
    if (products.length === 0) {
      const allRes = await fetch(`https://${SHOP}/products.json`);
      if (allRes.ok) {
        const data = await allRes.json();
        for (const p of data.products) {
          const variantId = p.variants[0]?.id;
          products.push({
            id: p.id,
            title: p.title,
            handle: p.handle,
            price: p.variants[0]?.price,
            checkoutUrl: `https://${SHOP}/cart/${variantId}:1`,
          });
        }
      }
    }

    return NextResponse.json({ products });
  } catch (err: any) {
    console.error("Shopify fetch error:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
