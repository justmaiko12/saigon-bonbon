/**
 * ═══════════════════════════════════════════════════════════════
 *  SAIGON BONBON — SITE CONTENT CONFIG
 * ═══════════════════════════════════════════════════════════════
 *
 *  HOW TO USE:
 *  1. Run the dev server:  cd "Saigon BonBon" && npm run dev
 *  2. Open http://localhost:3000 in your browser
 *  3. Edit ANY value below → save → browser updates instantly
 *
 *  SWAPPING IMAGES:
 *  - Drop the new file into  public/assets/
 *  - Update the path below (e.g. "/assets/my-new-photo.png")
 *
 *  ADJUSTING LAYOUT / SPACING:
 *  - See src/site-layout.css for padding, sizes, gaps
 *
 * ═══════════════════════════════════════════════════════════════
 */

// ─── NAVIGATION ─────────────────────────────────────────────
export const nav = {
  logo: "/assets/logo-transparent.png",
  links: [
    { label: "Home", target: "top" },
    { label: "Our Story", target: "flavor-story" },
    { label: "Flavors", target: "flavors" },
    { label: "Shop", target: "shop" },
  ],
  buyButtonText: "Buy",
};

// ─── HERO VIDEO ────────────────────────────────────────────
export const heroVideo = {
  src: "/assets/brand-video.mp4",
};

// ─── STORY SECTIONS ────────────────────────────────────────
export const storySections = [
  {
    id: "flavor-story",
    heading: "FLAVOR IS\nMORE THAN\nTASTE.",
    body: [
      "It's how culture lives.",
      "In the traditions that shape us.",
      "In how we express who we are.",
      "In how each generation adds something new.",
      "",
      "At Saigon Bonbon, we turn that into flavor.",
      "Vietnamese-inspired gummy candy.",
    ],
    image: "/assets/tee-pink.png",
    imageAlt: "Tee Tran with Saigon Bonbon",
    imageScale: "w-[90%] md:w-[85%]",
    textGap: "mb-1",
    compact: true,
  },
  {
    id: "beyond-story",
    heading: "BEYOND\nSPECIAL\nOCCASION.",
    body: [
      "In Vietnamese culture, Lân appears at Lunar New Year, weddings, and grand openings to bring good fortune, joy, and new beginnings.",
      "",
      "It's reserved for moments that matter.",
      "",
      "But life isn't just those moments.",
      "We believe there's something worth celebrating every day.",
      "So we made it part of our everyday.",
    ],
    image: "/assets/lion-dance-orange.png",
    imageAlt: "Vietnamese Lion Dance",
  },
];

// ─── GUMMY SCROLL ANIMATION ───────────────────────────────
export const gummyScroll = {
  heading: "NOW IT TAKES SHAPE.",
  subheading: "THE LÂN, REIMAGINED IN GUMMY FORM.",
  videoSrc: "/assets/gummy-scroll.mp4",
};

// ─── NUTRITION HIGHLIGHTS ──────────────────────────────────
export const nutritionHighlights = {
  heading: "FEELS AS GOOD\nAS IT TASTES.",
  stats: [
    { label: "ONLY 4g\nSUGAR" },
    { label: "ZERO\nSUGAR\nALCOHOLS" },
    { label: "10g\nPREBIOTIC\nFIBER" },
    { label: "100%\nPLANT\nBASED" },
  ],
  image: "/assets/pattern.png", // Replace with Michael holding gummy photo when available
  imageAlt: "Michael holding Saigon Bonbon gummy",
};

export const madeWithIntention = {
  heading: "MADE WITH\nINTENTION",
  items: [
    "DESIGNED IN SOUTHERN CALIFORNIA.",
    "CRAFTED IN THE USA.",
    "QUALITY YOU CAN TRUST.",
  ],
};

// ─── PRODUCT SHOWCASE (FLAVORS) ─────────────────────────────
export const flavors = [
  {
    id: "lychee",
    name: "LUSCIOUS LYCHEE ROSE",
    desc: "Light lychee infused with soft floral rose. Modern girl, free spirit, and elegant. As alluring a summer Vietnamese home.",
    bg: "linear-gradient(180deg, #FF107A 0%, #FF5E00 100%)",
    color: "#FF107A",
    nutritionColor: "#FF5E00",
    video: "/assets/lychee-flip.webm",
    poster: "/assets/lychee-front.png",
  },
  {
    id: "mango",
    name: "SPICY MANGO TAMARIND",
    desc: "Juicy mango, tangy tamarind, and a subtle chili kick. Just like the street snacks we used to love.",
    bg: "linear-gradient(180deg, #FF5E00 0%, #67B626 100%)",
    color: "#FF5E00",
    nutritionColor: "#FF5E00",
    video: "/assets/mango-flip.webm",
    poster: "/assets/mango-front.png",
  },
  {
    id: "coconut",
    name: "COCONUT PANDAN CRUSH",
    desc: "Creamy coconut meets fragrant pandan — smooth, toasty, and unmistakably Southeast Asian. A Vietnamese dessert classic that always hits.",
    bg: "linear-gradient(180deg, #67B626 0%, #009045 100%)",
    color: "#67B626",
    nutritionColor: "#67B626",
    video: "/assets/pandan-flip.webm",
    poster: "/assets/pandan-front.png",
  },
];

export const nutritionStats = [
  { value: "4g", label: "SUGAR" },
  { value: "100%", label: "PLANT\nBASED" },
  { value: "10g", label: "PREBIOTIC\nFIBER" },
  { value: "ZERO", label: "SUGAR\nALCOHOLS" },
];

// ─── SHOP SECTION ───────────────────────────────────────────
export const shop = {
  threePack: {
    label: "3-PACK",
    title: "SIGNATURE FLAVORS",
    image: "/assets/3_pack-transparent.png",
    price: "$19.99",
    buttonText: "ADD TO CART",
  },
  sixPack: {
    label: "6-PACK",
    title: "SIGNATURE FLAVORS",
    image: "/assets/6_pack-transparent.png",
    price: "$39.98",
    buttonText: "ADD TO CART",
  },
  badges: [
    {
      icon: "lion" as const,
      label: "THOUGHTFULLY\nMADE",
      image: "/assets/lion-silhouettes-transparent.png",
    },
    {
      icon: "leaf" as const,
      label: "NO ARTIFICIAL\nCOLORS OR FLAVORS",
    },
    {
      icon: "usa" as const,
      label: "CRAFTED\nIN THE USA",
      image: "/assets/usa-stamp-transparent.png",
    },
  ],
};

// ─── FOOTER ─────────────────────────────────────────────────
export const footer = {
  bgGradient: "linear-gradient(180deg, #D92384 0%, #E35E28 100%)",
  raysImage: "/assets/footer-rays.png",

  headline: "WE ARE SAIGON BONBON.",
  paragraphs: [
    "We honor where we come from and celebrate who we're becoming.\nRooted in heritage, made with pride. We are Saigon Bonbon. This is our flavor.",
    "Saigon Bon Bon is for people who live through feeling. People who understand\nthat flavor is not just taste, but a way memory, culture, and joy move through\neveryday life.",
  ],
  ctaText: "READ MORE",

  newsletterHeadline: "BE AN EARLY BONBONIST!",
  newsletterDescription:
    "If our story resonates with you, we'd love to stay connected.\nJoin our mailing list for quiet updates, thoughtful drops,\nand a little more of the culture we're proud to share.",
  emailPlaceholder: "Enter email address",

  contactLabel: "Wanna Chat? Email us at",
  contactEmail: "hello@saigonbonbon.com",
  usefulLinksLabel: "Useful Links",
  usefulLinks: ["Our Story", "Flavors", "Shop"],
};
