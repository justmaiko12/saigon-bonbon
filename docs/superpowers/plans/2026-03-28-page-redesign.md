# Saigon Bonbon Page Redesign Implementation Plan

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Restructure the Saigon Bonbon single-page website to match updated mockups — hero video, storytelling sections, scroll-driven gummy animation, repositioned flavor carousel.

**Architecture:** Replace current section order in `page.tsx` with new flow. Create 4 new components (HeroVideo, StorySection×2, GummyScrollAnimation). Reposition existing components (ProductShowcase, ShopSection, Footer). Remove unused components (old HeroSection, IntroSection, VideoModalSection, AccordionSection). Update `site-content.ts` with new section content.

**Tech Stack:** Next.js (App Router), React, Framer Motion, TypeScript, Tailwind CSS, Canvas API (frame scrubbing)

**Spec:** `docs/superpowers/specs/2026-03-28-page-redesign.md`

---

## File Structure

**Create:**
- `src/components/HeroVideo.tsx` — Full-width autoplay video with mute toggle
- `src/components/FlavorStory.tsx` — Reusable two-column story section (text left, image right, slide-in animations) — used for both "Flavor is More Than Taste" and "Beyond Special Occasion"
- `src/components/GummyScrollAnimation.tsx` — Canvas frame-scrubbing tied to scroll position
- `src/components/NutritionHighlights.tsx` — "Feels As Good As It Tastes" + "Made With Intention" combined section

**Modify:**
- `src/app/page.tsx` — New section order, remove old imports
- `src/site-content.ts` — Add content for new sections

**Copy assets:**
- `~/Downloads/SBB-Brand-Video-Master.mov` → `public/assets/brand-video.mp4` (ffmpeg convert)
- `~/Downloads/video play.png` → `public/assets/tee-pink.png`
- `~/Downloads/video play (1).png` → `public/assets/lion-dance-orange.png`
- `~/Downloads/gummy close up and line up animation for website_MP3.mp4` → `public/assets/gummy-scroll.mp4`

**Delete (after page.tsx updated):**
- `src/components/HeroSection.tsx`
- `src/components/IntroSection.tsx`
- `src/components/VideoModalSection.tsx`
- `src/components/AccordionSection.tsx`
- `src/components/StorySection.tsx`
- `src/components/ProofStrip.tsx`

---

## Task 1: Copy and convert assets

**Files:**
- Create: `public/assets/brand-video.mp4`, `public/assets/tee-pink.png`, `public/assets/lion-dance-orange.png`, `public/assets/gummy-scroll.mp4`

- [ ] **Step 1: Convert .mov to .mp4 and copy images**

```bash
cd ~/PROJECTS/Saigon\ BonBon

# Convert MOV to MP4 (web-compatible, H.264)
ffmpeg -i ~/Downloads/SBB-Brand-Video-Master.mov -c:v libx264 -crf 23 -preset medium -c:a aac -b:a 128k -movflags +faststart public/assets/brand-video.mp4

# Copy images
cp ~/Downloads/video\ play.png public/assets/tee-pink.png
cp ~/Downloads/video\ play\ \(1\).png public/assets/lion-dance-orange.png

# Copy gummy animation video
cp ~/Downloads/gummy\ close\ up\ and\ line\ up\ animation\ for\ website_MP3.mp4 public/assets/gummy-scroll.mp4
```

- [ ] **Step 2: Verify files exist**

```bash
ls -lh public/assets/brand-video.mp4 public/assets/tee-pink.png public/assets/lion-dance-orange.png public/assets/gummy-scroll.mp4
```

Expected: All 4 files present with reasonable sizes.

- [ ] **Step 3: Commit**

```bash
git add public/assets/brand-video.mp4 public/assets/tee-pink.png public/assets/lion-dance-orange.png public/assets/gummy-scroll.mp4
git commit -m "feat: add assets for page redesign (hero video, story images, gummy animation)"
```

---

## Task 2: Update site-content.ts with new section content

**Files:**
- Modify: `src/site-content.ts`

- [ ] **Step 1: Add new content exports**

Add these new exports to `src/site-content.ts` (keep existing `flavors`, `nutritionStats`, `shop`, `footer`, `nav` exports — remove `hero`, `intro`, `video`, `story`, `accordion` exports):

```ts
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
    { icon: "droplet", label: "ONLY 4g\nSUGAR" },
    { icon: "ban", label: "ZERO\nSUGAR\nALCOHOLS" },
    { icon: "leaf", label: "10g\nPREBIOTIC\nFIBER" },
    { icon: "sprout", label: "100%\nPLANT\nBASED" },
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
```

- [ ] **Step 2: Remove old unused exports**

Remove these exports from `site-content.ts`: `hero`, `intro`, `video`, `story`, `accordion`. Keep: `nav`, `flavors`, `nutritionStats`, `shop`, `footer`.

- [ ] **Step 3: Commit**

```bash
git add src/site-content.ts
git commit -m "feat: update site-content with new section content for redesign"
```

---

## Task 3: Create HeroVideo component

**Files:**
- Create: `src/components/HeroVideo.tsx`

- [ ] **Step 1: Create the component**

```tsx
"use client";

import { useRef, useState } from "react";
import { Volume2, VolumeX } from "lucide-react";
import { heroVideo } from "@/site-content";

export default function HeroVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isMuted, setIsMuted] = useState(true);

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
      setIsMuted(videoRef.current.muted);
    }
  };

  return (
    <section className="relative w-full h-[85vh] overflow-hidden">
      <video
        ref={videoRef}
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
      >
        <source src={heroVideo.src} type="video/mp4" />
      </video>

      {/* Gradient overlay at bottom for transition */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black/30 to-transparent" />

      {/* Mute toggle */}
      <button
        onClick={toggleMute}
        className="absolute bottom-8 right-8 z-10 w-12 h-12 rounded-full bg-black/40 backdrop-blur-md border border-white/20 flex items-center justify-center text-white hover:bg-black/60 transition-colors"
      >
        {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
      </button>
    </section>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/HeroVideo.tsx
git commit -m "feat: add HeroVideo component with autoplay and mute toggle"
```

---

## Task 4: Create FlavorStory component

**Files:**
- Create: `src/components/FlavorStory.tsx`

- [ ] **Step 1: Create the component**

A reusable two-column section. Text slides in from left, image slides in from right on scroll. Used for both story sections.

```tsx
"use client";

import { motion } from "framer-motion";
import Image from "next/image";

interface FlavorStoryProps {
  id: string;
  heading: string;
  body: string[];
  image: string;
  imageAlt: string;
}

export default function FlavorStory({ id, heading, body, image, imageAlt }: FlavorStoryProps) {
  return (
    <section id={id} className="relative py-24 md:py-32 px-6 overflow-hidden">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-12 md:gap-16">
        {/* Text — slides in from left */}
        <motion.div
          initial={{ opacity: 0, x: -80 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true, margin: "-15%" }}
          className="flex-1"
        >
          <h2 className="font-bolero text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-white font-bold leading-[0.95] tracking-wide mb-8 whitespace-pre-line">
            {heading}
          </h2>
          <div className="text-white/85 text-sm md:text-base leading-relaxed font-medium space-y-1">
            {body.map((line, i) =>
              line === "" ? (
                <br key={i} />
              ) : (
                <p key={i}>{line}</p>
              )
            )}
          </div>
        </motion.div>

        {/* Image — slides in from right */}
        <motion.div
          initial={{ opacity: 0, x: 80 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.1 }}
          viewport={{ once: true, margin: "-15%" }}
          className="flex-1 relative w-full aspect-[3/4] max-w-md"
        >
          <Image
            src={image}
            alt={imageAlt}
            fill
            className="object-cover rounded-2xl"
          />
        </motion.div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/FlavorStory.tsx
git commit -m "feat: add FlavorStory component with slide-in scroll animations"
```

---

## Task 5: Create GummyScrollAnimation component

**Files:**
- Create: `src/components/GummyScrollAnimation.tsx`

- [ ] **Step 1: Create the component**

Canvas frame-scrubbing component. Extracts frames from video, pins section during scroll, maps scroll progress to frame index.

```tsx
"use client";

import { useRef, useEffect, useState, useCallback } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { gummyScroll } from "@/site-content";

export default function GummyScrollAnimation() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [frames, setFrames] = useState<ImageBitmap[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const textOpacity = useTransform(scrollYProgress, [0.6, 0.8], [0, 1]);
  const textY = useTransform(scrollYProgress, [0.6, 0.8], [40, 0]);

  // Extract frames from video
  const extractFrames = useCallback(async () => {
    const video = document.createElement("video");
    video.src = gummyScroll.videoSrc;
    video.muted = true;
    video.playsInline = true;
    video.preload = "auto";

    await new Promise<void>((resolve) => {
      video.onloadeddata = () => resolve();
      video.load();
    });

    const canvas = document.createElement("canvas");
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const ctx = canvas.getContext("2d")!;

    const duration = video.duration;
    const totalFrames = Math.min(Math.floor(duration * 30), 120); // Cap at 120 frames
    const extractedFrames: ImageBitmap[] = [];

    for (let i = 0; i < totalFrames; i++) {
      video.currentTime = (i / totalFrames) * duration;
      await new Promise<void>((resolve) => {
        video.onseeked = () => resolve();
      });
      ctx.drawImage(video, 0, 0);
      const bitmap = await createImageBitmap(canvas);
      extractedFrames.push(bitmap);
    }

    setFrames(extractedFrames);
    setIsLoading(false);
  }, []);

  useEffect(() => {
    extractFrames();
  }, [extractFrames]);

  // Render frame based on scroll
  useEffect(() => {
    if (frames.length === 0) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set canvas size to match first frame
    canvas.width = frames[0].width;
    canvas.height = frames[0].height;

    const unsubscribe = scrollYProgress.on("change", (progress) => {
      const frameIndex = Math.min(
        Math.floor(progress * frames.length),
        frames.length - 1
      );
      if (frameIndex >= 0 && frames[frameIndex]) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(frames[frameIndex], 0, 0);
      }
    });

    // Render first frame
    ctx.drawImage(frames[0], 0, 0);

    return () => unsubscribe();
  }, [frames, scrollYProgress]);

  return (
    <section ref={containerRef} className="relative h-[300vh]">
      <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden">
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-8 h-8 border-2 border-white/30 border-t-white rounded-full animate-spin" />
          </div>
        )}

        <canvas
          ref={canvasRef}
          className="w-full h-full object-contain"
          style={{ maxHeight: "100vh" }}
        />

        {/* Overlay text — fades in at end of scroll */}
        <motion.div
          className="absolute inset-0 flex flex-col items-center justify-end pb-24 pointer-events-none"
          style={{ opacity: textOpacity, y: textY }}
        >
          <h2 className="font-bolero text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-white font-bold text-center leading-tight tracking-wide drop-shadow-lg">
            {gummyScroll.heading}
          </h2>
          <p className="font-bold text-white/80 text-xs sm:text-sm md:text-base tracking-[0.3em] uppercase mt-4 drop-shadow-md">
            {gummyScroll.subheading}
          </p>
        </motion.div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/GummyScrollAnimation.tsx
git commit -m "feat: add GummyScrollAnimation with canvas frame-scrubbing"
```

---

## Task 6: Create NutritionHighlights component

**Files:**
- Create: `src/components/NutritionHighlights.tsx`

- [ ] **Step 1: Create the component**

Combines "Feels As Good As It Tastes" stats with "Made With Intention" items.

```tsx
"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { nutritionHighlights, madeWithIntention } from "@/site-content";

export default function NutritionHighlights() {
  return (
    <>
      {/* Feels As Good As It Tastes */}
      <section className="relative py-24 md:py-32 px-6 overflow-hidden">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-12 md:gap-16">
          {/* Stats — left side */}
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            viewport={{ once: true }}
            className="flex-1"
          >
            <h2 className="font-bolero text-4xl sm:text-5xl md:text-6xl text-white font-bold leading-[0.95] tracking-wide mb-10 whitespace-pre-line">
              {nutritionHighlights.heading}
            </h2>
            <div className="space-y-6">
              {nutritionHighlights.stats.map((stat, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  viewport={{ once: true }}
                  className="flex items-center gap-4"
                >
                  <div className="w-10 h-10 rounded-full bg-white/15 flex items-center justify-center flex-shrink-0">
                    <span className="text-white text-sm">✦</span>
                  </div>
                  <span className="text-white font-bold text-sm md:text-base tracking-widest uppercase whitespace-pre-line leading-tight">
                    {stat.label}
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Image — right side */}
          <motion.div
            initial={{ opacity: 0, x: 60 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: "easeOut", delay: 0.1 }}
            viewport={{ once: true }}
            className="flex-1 relative w-full aspect-[3/4] max-w-md"
          >
            <Image
              src={nutritionHighlights.image}
              alt={nutritionHighlights.imageAlt}
              fill
              className="object-cover rounded-2xl"
            />
          </motion.div>
        </div>
      </section>

      {/* Made With Intention */}
      <section className="relative py-16 md:py-24 px-6">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-start gap-12 md:gap-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            viewport={{ once: true }}
            className="flex-1"
          >
            <h2 className="font-bolero text-3xl sm:text-4xl md:text-5xl text-white font-bold leading-[0.95] tracking-wide mb-8 whitespace-pre-line">
              {madeWithIntention.heading}
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut", delay: 0.15 }}
            viewport={{ once: true }}
            className="flex-1 space-y-4"
          >
            {madeWithIntention.items.map((item, i) => (
              <div key={i} className="flex items-center gap-3">
                <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0">
                  <span className="text-white text-xs">✓</span>
                </div>
                <span className="text-white font-bold text-xs md:text-sm tracking-widest uppercase">
                  {item}
                </span>
              </div>
            ))}
          </motion.div>
        </div>
      </section>
    </>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/NutritionHighlights.tsx
git commit -m "feat: add NutritionHighlights and MadeWithIntention sections"
```

---

## Task 7: Rewire page.tsx with new section order

**Files:**
- Modify: `src/app/page.tsx`

- [ ] **Step 1: Update page.tsx**

Replace the entire content of `src/app/page.tsx`:

```tsx
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
```

- [ ] **Step 2: Commit**

```bash
git add src/app/page.tsx
git commit -m "feat: rewire page.tsx with new section order for redesign"
```

---

## Task 8: Delete unused components and clean up

**Files:**
- Delete: `src/components/HeroSection.tsx`, `src/components/IntroSection.tsx`, `src/components/VideoModalSection.tsx`, `src/components/AccordionSection.tsx`, `src/components/StorySection.tsx`, `src/components/ProofStrip.tsx`

- [ ] **Step 1: Delete old components**

```bash
cd ~/PROJECTS/Saigon\ BonBon
rm src/components/HeroSection.tsx
rm src/components/IntroSection.tsx
rm src/components/VideoModalSection.tsx
rm src/components/AccordionSection.tsx
rm src/components/StorySection.tsx
rm src/components/ProofStrip.tsx
```

- [ ] **Step 2: Verify no broken imports**

```bash
npx tsc --noEmit 2>&1 | head -30
```

Expected: No errors referencing deleted components. If there are import errors in other files, fix them.

- [ ] **Step 3: Commit**

```bash
git add -A
git commit -m "chore: remove unused components (HeroSection, IntroSection, VideoModalSection, AccordionSection, StorySection, ProofStrip)"
```

---

## Task 9: Verify and test

- [ ] **Step 1: Run dev server**

```bash
cd ~/PROJECTS/Saigon\ BonBon && npm run dev
```

- [ ] **Step 2: Visual verification checklist**

Open `http://localhost:3000` and verify:
1. Hero video autoplays muted, click toggles mute
2. Navigation morphs to sticky pill on scroll
3. "Flavor is More Than Taste" — text slides from left, Tee image from right
4. "Beyond Special Occasion" — text slides from left, lion dance image from right
5. Gummy animation scrubs with scroll (frames advance as you scroll)
6. Flavor carousel works (swipe, flip cards, nutrition info)
7. "Feels As Good As It Tastes" stats display correctly
8. "Made With Intention" items show
9. Shop section with 3-pack / 6-pack cards
10. Footer with newsletter signup
11. Background gradient transitions smoothly between sections

- [ ] **Step 3: Fix any visual issues found during testing**

- [ ] **Step 4: Build check**

```bash
npm run build
```

Expected: Build succeeds with no errors.

- [ ] **Step 5: Final commit and push**

```bash
git add -A
git commit -m "feat: complete page redesign — hero video, story sections, gummy scroll animation"
git push origin main
```
