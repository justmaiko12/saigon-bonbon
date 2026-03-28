# Saigon Bonbon Page Redesign

## Overview
Restructure the single-page website to match updated mockups. New storytelling flow with hero video, scroll-driven gummy animation, and reorganized sections. Existing components (flavor carousel, shop, footer, navigation) are preserved and repositioned.

## New Section Order (Top-to-Bottom)

### 1. Navigation (keep existing)
- Banner morphs to sticky floating pill on scroll > 150px
- No changes needed

### 2. Hero Video Section (NEW)
- **Video:** `SBB-Brand-Video-Master.mov` — copy to `public/assets/`
- Full-width, edge-to-edge, ~85vh height
- Autoplay, muted, looping
- Click anywhere on video to unmute/mute (toggle)
- Visual unmute indicator (speaker icon overlay)
- No modal, no "WATCH FULL VIDEO" button — just inline play with unmute on click

### 3. "Flavor is More Than Taste" Section (NEW)
- **Layout:** Two-column — text left, image right
- **Image:** `video play.png` from Downloads → copy to `public/assets/tee-pink.png`
- **Background:** Pink gradient (matching brand pink)
- **Copy (verbatim from mockup):**
  - Heading: "FLAVOR IS MORE THAN TASTE."
  - Body: "It's how culture lives. In the traditions that shape us. In how we express who we are. In how each generation adds something new. At Saigon Bonbon, we turn that into flavor. Vietnamese-inspired gummy candy."
- **Animation:** Text slides in from left, image slides in from right (`whileInView`, Framer Motion)
- **Fonts:** Heading in LostType (serif), body in Montserrat

### 4. "Beyond Special Occasion" Section (NEW)
- **Layout:** Two-column — text left, image right
- **Image:** `video play (1).png` from Downloads → copy to `public/assets/lion-dance-orange.png`
- **Background:** Orange gradient (smooth transition from pink section above)
- **Copy (verbatim from mockup):**
  - Heading: "BEYOND SPECIAL OCCASION."
  - Body: "In Vietnamese culture, Lân appears at Lunar New Year, weddings, and grand openings to bring good fortune, joy, and new beginnings. It's reserved for moments that matter. But life isn't just those moments. We believe there's something worth celebrating every day. So we made it part of our everyday."
- **Animation:** Same slide-in pattern as section 3 (text from left, image from right)
- **Fonts:** Same as section 3

### 5. "Now It Takes Shape" — Scroll-Driven Gummy Animation (NEW)
- **Video source:** `gummy close up and line up animation for website_MP3.mp4` → copy to `public/assets/`
- **Technique:** Canvas frame-scrubbing tied to scroll position (Apple-style)
  - Extract frames from video on load
  - Use `useScroll()` to map scroll progress (0-1) to frame index
  - Render current frame to `<canvas>` element
  - Pin section during scroll (sticky positioning)
- **Height:** Tall section (~300vh) to give enough scroll distance for smooth animation
- **Overlay text:** "NOW IT TAKES SHAPE." + "THE LÂN, REIMAGINED IN GUMMY FORM." — appears as scroll progresses
- **Background:** Transition to green gradient

### 6. "Find Your Flavor" Carousel (EXISTING — reposition)
- Move existing `ProductShowcase` component to this position
- Keep all functionality: 3D flip cards, video canvas rendering, nutrition info, swipe navigation
- Keep dynamic background gradient per flavor
- **Note:** Video flip animation may be updated in the future — leave architecture flexible

### 7. "Feels As Good As It Tastes" (EXISTING — reposition + restyle)
- **Layout:** Two-column — stats left, Michael photo right
- **Stats (4 items with icons):**
  - Only 4g Sugar
  - Zero Sugar Alcohols
  - 10g Prebiotic Fiber
  - 100% Plant Based
- **Image:** Michael holding gummy (existing or new asset)
- **Fonts:** LostType heading, Montserrat stats

### 8. "Made With Intention" (EXISTING — reposition)
- Bullet items from current accordion, simplified to flat list:
  - Designed in Southern California
  - Crafted in the USA
  - Quality You Can Trust
- No accordion expand/collapse — just visible items

### 9. "Shop Saigon Bonbon" (EXISTING — keep as-is)
- Existing `ShopSection` component
- 3-pack ($19.99) and 6-pack ($39.98) glass cards
- Shopify checkout integration

### 10. Footer (EXISTING — keep as-is)
- "Be An Early Bonbonist!" newsletter signup
- Contact info + useful links

## Sections Removed
- `HeroSection` (old hero image + intro text + gummies trio)
- `IntroSection` (lion silhouettes + headline)
- `VideoModalSection` (video thumbnail + modal)
- `AccordionSection` (3 expandable items + media panel)
- `StorySection` (already removed)
- `PageOption3` (already removed)

## Background Gradient Flow
Smooth scroll-driven gradient transitions:
- Hero: dark/video (no gradient overlay needed)
- Sections 3-4: Pink (`#FF107A`) → Orange (`#FF5E00`)
- Section 5: Orange → Green (`#67B626`)
- Section 6: Dynamic per flavor (existing behavior)
- Sections 7-9: Continue from last flavor gradient
- Footer: Dark pink → orange (`#D92384 → #E35E28`)

## Assets to Copy
| Source | Destination |
|--------|-------------|
| `~/Downloads/SBB-Brand-Video-Master.mov` | `public/assets/brand-video.mp4` (convert to mp4) |
| `~/Downloads/video play.png` | `public/assets/tee-pink.png` |
| `~/Downloads/video play (1).png` | `public/assets/lion-dance-orange.png` |
| `~/Downloads/gummy close up and line up animation for website_MP3.mp4` | `public/assets/gummy-scroll.mp4` |

## Technical Notes
- Convert `.mov` to `.mp4` (web-compatible) using ffmpeg
- Frame scrubbing: pre-extract frames to canvas on load, map scroll to frame index
- All new sections use Framer Motion `whileInView` with `viewport={{ once: true }}`
- Keep `EditMode` system working across new sections
- Keep `site-content.ts` pattern — add new section content there
- Responsive: mobile stacks two-column sections vertically
