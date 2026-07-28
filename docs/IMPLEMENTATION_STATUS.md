# Personal Website — Implementation & Roadmap Status

**Last Updated:** 28 July 2026  
**Owner:** Krize Kster  
**Repository:** `Personal Website` (Astro Static Site)

---

## 1. Overview & Purpose

This document serves as the single source of truth for tracking **implemented features** and **future planned milestones** for the personal website of Krize Kster.

---

## 2. Currently Implemented Features

### 🟢 Core Framework & Build System
- **Static Site Generator:** Astro `^6.4.2` with static HTML export output (`./dist/`).
- **Styling Engine:** Tailwind CSS `^4.3.0` integrated via `@tailwindcss/vite`.
- **Content Engine:** Astro Content Collections (`src/content/feed/` & `src/content.config.ts`) supporting Markdown and `@astrojs/mdx`.
- **Node Requirement:** Node.js `>=22.12.0`.
- **Asset Pipeline:** Corrected primary hero asset at [`public/krize-kster-portrait.png`](file:///z:/Play/Personal%20Website/public/krize-kster-portrait.png).
- **Official Links Directory:** Embedded categorized link pills with SVG icons across footer, ventures page, and Person JSON-LD schema (LinkedIn Personal, LinkedIn Company, krizek.tech, Play Store app, Crunchbase, Happenstance AI, Instagrams).

---

### 🟢 Global Design & Typography System
- **Type Pairing:** Manrope (Display & Sans body) paired with DM Mono (Metadata & Eyebrows) loaded via Google Fonts.
- **Editorial Palette:** Warm pastel-white paper background (`#f5f5ef`), dark ink (`#1d2921`), sage green accents (`#73836d`), and mist lines (`rgba(29,41,33,.17)`).
- **Core Design Tokens:** Tokenized in [`src/styles/global.css`](file:///z:/Play/Personal%20Website/src/styles/global.css).

---

### 🟢 Interactive Physics & Motion System ("Dennis Snellenberg Engine")
- **Floating Overlay Menu Drawer (`NavDrawer.astro`):** Slide-in dark panel (`#1c1d20`) with dynamic SVG curve edge path (`drawer-svg-curve`) that bows out elastically during open/close transitions via `requestAnimationFrame` lerp loop in `snellenberg-effects.ts`. Triggered by top-right magnetic floating badge button (`Menu`) and equipped with staggered entrance links, active route dot indicators (`.active-route-dot`), magnetic close button ('✕'), and social link directory. Includes body scroll locking (`overflow: hidden`) and `Escape` key handlers.
- **Centered Hover Work Preview Modal (`.snellenberg-preview-modal`):** Interactive cursor-following project preview thumbnail overlay with a centered magnetic action badge ("DOI" / "View" / "Read") mathematically offset (`translate(-50%, -50%)`) to align directly on the mouse pointer tip. Attached to selected research cards, venture items, and journal entries with full-card click navigation.
- **Official Links Directory:** Embedded categorized link pills with custom SVG icons across footer, ventures page, and Person JSON-LD schema (LinkedIn Personal, LinkedIn Company, krizek.tech, Play Store app, Crunchbase, Happenstance AI, Instagrams).
- **Typography & Copy Refinements:** Formatted Kri Zek section heading on Ventures page to **KRI / ZEK** (ALL CAPS across two lines) and updated main footer heading to **Growth Meets Gaming.**.
- **Kinetic Velocity Marquee (`.kinetic-marquee`):** Infinite horizontal scrolling marquee text banner ("— KRIZE KSTER — INDEPENDENT ENGINEER & PRODUCT THINKER —") that accelerates dynamically with scroll speed.
- **Curved Section & Footer Arc Transitions (`.rounded-div-wrap`):** Dynamic SVG/CSS rounded top dividers on dark sections and footers that flatten out smoothly as users scroll into view.
- **Sticky Floating Navigation Badge (`.floating-menu-badge`):** Magnetic floating badge button popping in smoothly past 280px scroll depth for instant top navigation & overlay menu drawer toggle.
- **Parallax & Reveal System:** Global scroll-reveal via `IntersectionObserver` and depth parallax offsets via `requestAnimationFrame`.
- **Reduced Motion Safety:** Automatically disables physics calculations when `prefers-reduced-motion: reduce` is detected.

---

### 🟢 Page Architecture & Routes

| Route | Status | File Location | Key Capabilities |
| :--- | :--- | :--- | :--- |
| `/` | 🟢 Complete | [`src/pages/index.astro`](file:///z:/Play/Personal%20Website/src/pages/index.astro) | Split wordmark hero, portrait, kinetic marquee, featured ventures, selected research block, latest journal notes |
| `/about` | 🟢 Complete | [`src/pages/about.astro`](file:///z:/Play/Personal%20Website/src/pages/about.astro) | Verified Krishna Soni bio, dual-entity structure, timeline, principles, `Person` JSON-LD |
| `/research` | 🟢 Complete | [`src/pages/research/index.astro`](file:///z:/Play/Personal%20Website/src/pages/research/index.astro) | Indexed bibliography by Krishna Soni, 8-vector CSS animated figure, Google Scholar & JSON-LD metadata, copyable citation |
| `/research/[slug]` | 🟢 Complete | [`src/pages/research/[slug].astro`](file:///z:/Play/Personal%20Website/src/pages/research/[slug].astro) | Individual research paper detail view with DOI link and citation headers |
| `/ventures` | 🟢 Complete | [`src/pages/ventures.astro`](file:///z:/Play/Personal%20Website/src/pages/ventures.astro) | Science & telemetry (Kri Zek), Altered Brilliance, WOWCube console games, Codename TGX-1 |
| `/the-power-of-gaming` | 🟢 Complete | [`src/pages/the-power-of-gaming.astro`](file:///z:/Play/Personal%20Website/src/pages/the-power-of-gaming.astro) | Book page with Play Books listing ID `J1GUEQAAQBAJ`, 100+ research studies reference, and *The Balancing Factor* preview |
| `/feed` | 🟢 Complete | [`src/pages/feed/index.astro`](file:///z:/Play/Personal%20Website/src/pages/feed/index.astro) | Searchable writing directory with client-side filter ([`FeedSearch.astro`](file:///z:/Play/Personal%20Website/src/components/FeedSearch.astro)) |
| `/feed/[slug]` | 🟢 Complete | [`src/pages/feed/[slug].astro`](file:///z:/Play/Personal%20Website/src/pages/feed/[slug].astro) | Dynamic Markdown article reader |

---

## 3. Future Implementation Roadmap

### 🟡 Phase 1: Verified Source Material & Media Assets (Completed / Ongoing)
- [x] **Approve Final Bio Copy:** Updated bio, timeline, ventures, and book details using verified source material.
- [x] **Research Publications Section:** Built `/research` route with DOI links, Google Scholar meta tags, and 8-Vector figure.
- [ ] **Social Preview Image (Open Graph):** Create dedicated `og-image.jpg` with portrait and KRIZE / KSTER wordmark.
- [ ] **High-Resolution Case Study Media:** Add crisp UI screenshots and video demonstrations for KRI ZEK and Altered Brilliance.
- [ ] **Direct Contact Channel:** Add a lightweight contact form or dedicated scheduler endpoint alongside LinkedIn.

---

### 🔵 Phase 2: Richer Portfolio & Case Study System (Near-Term)
- [ ] **Individual Case Study Pages:** `/ventures/[slug]` pages featuring Problem, Approach, Technical Architecture, Outcome, and Media.
- [ ] **Categorized Project Index:** Project grid with interactive filter tags (Systems, Consumer, Gaming, Infrastructure).
- [ ] **Book Purchase / Waitlist Integration:** Add purchase link or newsletter waitlist once *The Power of Gaming* destination is live.
- [ ] **Downloadable Resume/Profile:** Optional one-page PDF download for recruiters and clients.

---

### 🟣 Phase 3: Analytics, SEO & Performance Audits (Future)
- [ ] **Privacy-Friendly Analytics:** Integrate minimal analytics (e.g., Plausible / Fathom) tracking key conversion events (LinkedIn clicks, venture visits, article reads).
- [ ] **RSS Feed & Newsletter:** Generate `/rss.xml` feed for journal posts.
- [ ] **SEO Review:** Add sitemap (`@astrojs/sitemap`), canonical URLs, JSON-LD structured data, and per-page meta tag polish.
- [ ] **Lighthouse Performance Optimization:** Generate responsive image srcset variants for hero portrait and run Lighthouse auditing.

---

## 4. Verification & Build Logs

To verify workspace build integrity at any time:
```bash
npm run build
```
*Last static build test:* **Clean completion (9/9 routes compiled successfully).**
