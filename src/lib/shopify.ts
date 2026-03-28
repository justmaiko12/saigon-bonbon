import { createStorefrontClient } from "@shopify/hydrogen-react";

const client = createStorefrontClient({
  storeDomain: "saigon-bonbon.myshopify.com",
  publicStorefrontToken: process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_TOKEN!,
});

export const getStorefrontApiUrl = client.getStorefrontApiUrl;
export const getPublicTokenHeaders = client.getPublicTokenHeaders;

// ─── Storefront API helper ──────────────────────────────────
export async function storefront<T = any>(query: string, variables?: Record<string, any>): Promise<T> {
  const res = await fetch(getStorefrontApiUrl(), {
    method: "POST",
    headers: {
      ...getPublicTokenHeaders(),
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ query, variables }),
  });

  const json = await res.json();
  if (json.errors) {
    console.error("Storefront API errors:", json.errors);
    throw new Error(json.errors[0]?.message ?? "Storefront API error");
  }
  return json.data as T;
}

// ─── Queries ────────────────────────────────────────────────
export const GET_PRODUCTS = `
  query GetProducts($first: Int!) {
    products(first: $first) {
      edges {
        node {
          id
          title
          handle
          description
          priceRange {
            minVariantPrice {
              amount
              currencyCode
            }
          }
          images(first: 3) {
            edges {
              node {
                url
                altText
                width
                height
              }
            }
          }
          variants(first: 10) {
            edges {
              node {
                id
                title
                availableForSale
                price {
                  amount
                  currencyCode
                }
              }
            }
          }
        }
      }
    }
  }
`;

export const CREATE_CART = `
  mutation CartCreate($input: CartInput!) {
    cartCreate(input: $input) {
      cart {
        id
        checkoutUrl
        lines(first: 10) {
          edges {
            node {
              id
              quantity
              merchandise {
                ... on ProductVariant {
                  id
                  title
                  price {
                    amount
                    currencyCode
                  }
                }
              }
            }
          }
        }
        cost {
          totalAmount {
            amount
            currencyCode
          }
        }
      }
      userErrors {
        field
        message
      }
    }
  }
`;

export const ADD_TO_CART = `
  mutation CartLinesAdd($cartId: ID!, $lines: [CartLineInput!]!) {
    cartLinesAdd(cartId: $cartId, lines: $lines) {
      cart {
        id
        checkoutUrl
        lines(first: 10) {
          edges {
            node {
              id
              quantity
              merchandise {
                ... on ProductVariant {
                  id
                  title
                  price {
                    amount
                    currencyCode
                  }
                }
              }
            }
          }
        }
        cost {
          totalAmount {
            amount
            currencyCode
          }
        }
      }
      userErrors {
        field
        message
      }
    }
  }
`;
