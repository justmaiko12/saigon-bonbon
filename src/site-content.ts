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
    { label: "Our Story", target: "about" },
    { label: "Flavors", target: "flavors" },
    { label: "Shop", target: "shop" },
  ],
  buyButtonText: "Buy",
};

// ─── HERO SECTION ───────────────────────────────────────────
export const hero = {
  subtitle: "Introducing",
  brand: "SAIGON BONBON",
  headline: "THIS IS\nOUR FLAVOR.",
  bgGradient: "linear-gradient(180deg, #FF107A 0%, #FF5E00 100%)",

  // Full variant — intro text (left column)
  introParagraphs: [
    "Saigon Bonbon is a Vietnamese-American company rooted in something universal — the desire to celebrate who we are, fully and unapologetically. Our roots shape us, and our joy is meant to be shared.",
    "Our iconic gummy and mascot, Lân, embodies that spirit. In Vietnamese culture, Lân is a mythical guardian symbolizing prosperity, peace, and good fortune, and the star of the Múa Lân during Lunar New Year and Mid-Autumn celebrations.",
    "To us, the Lân honors where we come from while moving boldly into what's next. Saigon Bonbon turns that spirit into something you can taste — because culture isn't meant to be dimmed. It's meant to be celebrated.",
  ],
  tagline: "More than candy, it's a celebration in gummy form.",

  // Images
  heroImage: "/assets/pattern.png",        // Replace with hero photo
  foundersImage: "/assets/pattern.png",     // Replace with founders photo
  gummiesImage: "/assets/gummies-trio.png", // Three Lân gummies
};

// ─── INTRO SECTION ──────────────────────────────────────────
export const intro = {
  headline: "AUTHENTIC\nVIETNAMESE-INSPIRED\nFLAVORS\nYOU CAN ENJOY NOW,\nAND EVERY DAY AFTER.",
  bgImage: "/assets/lion-silhouettes-transparent.png",
  bgGradient: "linear-gradient(180deg, #FF5E00 0%, #67B626 100%)",
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

// ─── VIDEO SECTION ──────────────────────────────────────────
export const video = {
  headline: "EVERY DAY WE DANCE",
  thumbnailPlaceholder: "Lion Dance + Bao Han Video Thumbnail",
  buttonText: "WATCH THE FILM",

  // Full variant paragraphs
  paragraphs: [
    "Long have we searched for something that truly reflected us. Something to stand behind. Something to be proud of.",
    "Now, it's here.\nThis is us—no longer quiet, no longer waiting.",
    "We don't ask for permission.\nWe don't save our joy for special occasions.",
  ],
  closingLine: "Because every day is a gift.\nEvery day, we dance.",
};

// ─── STORY SECTION ──────────────────────────────────────────
export const story = {
  headline: "HOW IT CAME TO BEING",

  // Full variant
  paragraphs: [
    "Saigon Bonbon is a confluence of three worlds.",
    "From Tee Tran's childhood memories and cherished Vietnamese upbringing;",
    "Bao Han's journey of evolution, survival, and finding joy in the simplest things;",
    "And of Maiko taking the world by storm - using social media to showcase real Vietnamese talent that speaks to the new generation.",
    "Together, these three form the Creative Triad of Saigon Bonbon. Tee provides the vision, Bao Han is the heart, and Maiko drives the movement.",
    "Saigon Bonbon is not just in the business of selling candy - it's all about sharing our joy, heritage, and dreams of a future where uniqueness is celebrated, not hidden. It's a celebration in candy form.",
  ],

  // Condensed variant
  condensedParagraphs: [
    'Born from the vision of <strong>Tee Tran</strong>, the heart of <strong>Bao Han</strong>, and the movement of <strong>Maiko</strong> — three Vietnamese-Americans who refused to keep their joy quiet.',
    "We're not just selling candy. We're sharing heritage, dreams, and a future where uniqueness is celebrated.",
  ],
  condensedClosing: "A celebration in candy form.",

  photoshootPlaceholder: "[Add Image from Photoshoot Here]",
};

// ─── ACCORDION SECTION ──────────────────────────────────────
export const accordion = [
  {
    id: "thoughtfully-made",
    title: "THOUGHTFULLY MADE",
    content:
      "Made with wellness in mind. Less sugar so you can indulge in the flavors without guilt. This is a treat you can enjoy everyday.",
    media: "Manufacturing Line - Sugar Reduction",
  },
  {
    id: "crafted-usa",
    title: "CRAFTED IN THE USA",
    content:
      "Saigon Bonbon is proudly crafted in the USA, a melting pot of culture and creativity. Every batch we make is crafted with care, supports local production, and uplifts the communities we live in.",
    media: "Manufacturing Line - USA Facility",
  },
  {
    id: "custom-shape",
    title: "CUSTOM SHAPE",
    content:
      "Our gummies are made with a custom mould that we designed ourselves, shaped in the likeness of the Lân. A small symbol of joy and good fortune - carried in every bite.",
    media: "Manufacturing Line - Gummy Moulds",
  },
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
