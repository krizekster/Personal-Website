# Krize Kster Personal Website — Product Requirements Document

**Status:** Active / living document  
**Last updated:** 28 July 2026  
**Owner:** Krize Kster  
**Repository:** `Personal Website` (Astro static site)

## 1. Product purpose

Create a personal website for **Krize Kster** that presents work, ventures, writing, and ideas with a confident editorial feel. The site should feel personal and considered rather than like a conventional developer portfolio.

**Identity note:** Krize Kster is the public two-word display name. **Krizekster** is the online/gaming name and should only appear where that context is useful.

## 2. Goals

- Establish a distinctive personal brand through a portrait-led first impression.
- Make ventures, writing, and the book easy to discover from every page.
- Present technical work in direct, human language.
- Use motion to create depth and flow without making the site difficult to read or use.
- Keep the site fast, responsive, and maintainable as a static Astro project.

## 3. Audience

- Potential collaborators, clients, and partners.
- People interested in KRI ZEK and Altered Brilliance.
- Readers interested in engineering, product thinking, games, and systems.
- Recruiters, founders, and peers looking for Krize’s work and point of view.

## 4. Experience principles

1. **Editorial, not corporate.** Use expressive hierarchy, generous spacing, and short, meaningful copy.
2. **Useful over noisy.** Every interaction should clarify navigation or add a sense of depth.
3. **Personal before technical.** Lead with the person and point of view; then make the work easy to explore.
4. **Quiet confidence.** The visual system should feel premium and deliberate, never overly decorative.
5. **Accessible by default.** Motion must respect `prefers-reduced-motion`; navigation and search must stay keyboard-friendly.

## 5. Design direction

The current direction takes inspiration from modern editorial portfolios, particularly the high-impact split-name hero and compact navigation approach of Nick Velten’s website, while remaining an original Krize Kster design.

### Visual language

- Warm pastel-white paper background with restrained sage and deep-ink tones.
- Large, tightly tracked sans-serif display typography paired with a compact mono metadata style.
- Rounded pill navigation and calls to action.
- Transparent portrait integrated into the page rather than framed as a standard profile image.
- Rounded, lightly textured content surfaces and section dividers.
- Dark green panels reserved for high-importance venture and contact moments.

## 6. Implemented scope

### Global foundation

- Rebuilt the site-wide visual system in `src/styles/global.css`.
- Added the Manrope and DM Mono type pairing.
- Replaced the previous dark terminal/brutalist visual language with the pastel editorial system.
- Updated shared metadata, header, footer, navigation, buttons, cards, and article styling.
- Updated the public display name to **Krize Kster** across page titles, metadata, navigation, footer, and primary copy.

### Homepage

- Created a portrait-led hero using `public/krize-kster-portrait.png`.
- Updated the hero wordmark to split the name into **KRIZE** and **KSTER**.
- Added direct pathways to About, Ventures, and Writing.
- Added featured venture cards for KRI ZEK and Altered Brilliance.
- Added a latest-writing section driven by the existing Astro content collection.

### Core pages

- Restyled the About page around a personal introduction, a visual timeline, and working principles.
- Restyled the Ventures page for KRI ZEK and Altered Brilliance, including external links to their sites.
- Restyled *The Power of Gaming* page with an editorial book-cover treatment and chapter themes.
- Restyled the Writing index and article pages for more readable editorial browsing.
- Rebuilt the writing search/filter interface while retaining client-side filtering.

### Motion and interaction

- Added a global reveal-on-scroll system for page sections and the footer.
- Added subtle parallax offsets to selected high-impact visual elements: hero wordmark, portrait, decorative shapes, editorial headings, venture headings, book cover, and footer heading.
- Built custom Dennis Snellenberg interactive physics engine (`src/scripts/snellenberg-effects.ts`):
  - Magnetic pull physics (`data-magnetic`) on pills, CTA buttons, and identity links.
  - Floating cursor-following thumbnail preview modal (`.snellenberg-preview-modal`) with magnetic action badges for project cards and writing items.
  - Kinetic scroll velocity horizontal marquee banner (`.kinetic-marquee`).
  - Curved SVG/CSS arc section dividers (`.rounded-div-wrap`) at top of dark section/footer that flatten dynamically on scroll.
  - Sticky floating magnetic menu badge (`.floating-menu-badge`) popping in after 280px scroll depth.
- Uses `requestAnimationFrame` and passive scroll listeners to keep scrolling smooth.
- Motion automatically disables when the visitor prefers reduced motion.

### Responsive behavior

- Validated the portrait-led homepage at desktop and mobile widths.
- Adjusted mobile portrait positioning so the image, wordmark, and supporting copy remain legible.
- Navigation scrolls horizontally on narrow viewports instead of collapsing access to important pages.

## 7. Current information architecture

| Route | Purpose |
| --- | --- |
| `/` | Personal introduction, featured ventures, and latest writing |
| `/about` | Personal approach, timeline, and principles |
| `/ventures` | KRI ZEK and Altered Brilliance overview |
| `/the-power-of-gaming` | Book landing page and themes |
| `/feed` | Searchable writing index |
| `/feed/[slug]` | Individual long-form articles |

## 8. Technical implementation

- **Framework:** Astro 6, static output.
- **Styling:** Tailwind CSS 4 plus custom global CSS components and tokens.
- **Content:** Astro content collection using Markdown in `src/content/feed/`.
- **Image asset:** Transparent portrait at `public/krize-kster-portrait.png`.
- **No runtime database or authentication dependency.**

### Important implementation files

| File | Responsibility |
| --- | --- |
| `src/layouts/BaseLayout.astro` | Shared layout, SEO defaults, reveal/parallax system |
| `src/styles/global.css` | Theme tokens, components, typography, responsive and motion rules |
| `src/components/Header.astro` | Main navigation and identity |
| `src/components/Footer.astro` | Contact call to action and LinkedIn path |
| `src/pages/index.astro` | Homepage hero and featured content |
| `src/components/FeedSearch.astro` | Client-side writing search and filtering |

## 9. Validation completed

- `npm run build` succeeds and generates all nine static routes.
- Confirmed local `200` responses for home, About, Ventures, book, Writing, a sample article, and the portrait asset.
- Confirmed Writing search filters “Witcher” down to one matching article.
- Confirmed motion initialization, active parallax offset changes during scroll, and section reveal activation in the local preview.

## 10. Content considerations

The current copy is intentionally broad in places. The LinkedIn profile could not be read automatically during implementation, so no unverified work history or credentials were invented.

Before a public launch, replace or confirm the following using approved source material:

- Current headline, roles, and professional bio.
- Verified education, employers, partnerships, awards, and dates.
- Venture descriptions, service offerings, and external links.
- Book availability, publisher details, and purchase destination.
- Preferred direct contact channel (email, scheduler, or form destination).

## 11. Product horizon

### Next up — content readiness

1. **Approve the core bio.** Add a concise, verified biography from Krize’s preferred source.
2. **Add selected case studies.** Give KRI ZEK and Altered Brilliance concrete outcomes, visual examples, responsibilities, and links.
3. **Complete contact details.** Add a professional email address or a lightweight contact form; retain LinkedIn as a secondary route.
4. **Add a professional social preview image.** Create a dedicated Open Graph image using the portrait and KRIZE / KSTER wordmark.

### Near-term — richer portfolio experience

1. Add individual case-study pages with problem, approach, contribution, outcome, and media.
2. Add a project index with filters for systems, product, writing, and gaming.
3. Add book purchase or waitlist functionality once an official destination exists.
4. Add tasteful image/video media to venture and book pages.
5. Add a downloadable one-page profile or résumé only if it supports the intended audience.

### Future — growth and operations

1. Add privacy-friendly analytics with defined conversion events: LinkedIn click, venture visit, article read, and contact action.
2. Add a lightweight CMS or content workflow if writing cadence increases beyond Markdown-based publishing.
3. Add RSS for writing and optional newsletter sign-up.
4. Add SEO review: canonical URL, sitemap, robots policy, structured data, Open Graph, and per-page metadata refinement.
5. Add accessibility review: contrast checks, keyboard traversal, motion audit, image alt text, and semantic heading audit.
6. Add performance review: responsive portrait variants, font loading strategy, image compression, and Lighthouse baselines.

## 12. Non-goals for the current version

- A client portal, user accounts, or authenticated dashboard.
- A heavy animation stack or scroll-jacking.
- Unverified claims copied from third-party profiles.
- A generic template-style portfolio with unrelated filler projects.

## 13. Change-log convention

For meaningful future work, append an entry under this heading using:

```md
### YYYY-MM-DD — Short change title
- What changed
- Why it changed
- Any follow-up work
```

### 2026-07-28 — Dennis Snellenberg Interactive Effects & Asset Fix
- Corrected hero portrait image asset path to `public/krize-kster-portrait.png`.
- Implemented custom lerp physics engine in `src/scripts/snellenberg-effects.ts` featuring magnetic buttons, floating work preview modal, kinetic velocity marquee, curved rounded-div footer transition, and floating magnetic navigation badge.
- Added comprehensive workspace tracking document at `docs/IMPLEMENTATION_STATUS.md`.

## 14. Open decisions

- What is the approved one-sentence professional headline for Krize Kster?
- Which 2–4 projects should become complete case studies first?
- Should contact be LinkedIn-only, email-first, or a form with spam protection?
- Is *The Power of Gaming* currently available, upcoming, or a concept page?
- Which analytics platform, if any, fits the privacy and product goals?
