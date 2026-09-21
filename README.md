# Lauren Luo Portfolio

A dark editorial portfolio for a marketing practitioner and AI designer. The site is intentionally split into a visual opening and a content-rich portfolio page.

## Content structure

1. `/` — immersive visual opening with one primary action.
2. `/portfolio` hero — positioning, availability and primary contact actions.
3. Profile — introduction, contact details, selected metrics and career timeline.
4. Selected work — Wondershare ASO, JD Health commerce, Flow Furniture brand experience and creative practice.
5. Strengths — growth systems, creative translation, AI-assisted design and end-to-end delivery.
6. Contact — full-width closing statement and direct email action.

## Design system

- Visual thesis: Editorial Soft Tech × Dreamy Collage.
- Type: Instrument Serif for display; Manrope for navigation, body and data.
- Core colors: Night `#0B0C10`, Ink `#F6F5F1`, Iris `#8290FF`, Aqua `#7DDAD0`, Lilac `#C7B8EE`.
- Desktop: maximum content width 1408px, wide editorial gutters, two-column hero and mixed project-card grid.
- Tablet: single-column hero, two-column metrics and strengths.
- Mobile: 16px outer margin, stacked CTAs, single-column cards, two-image ASO sequence and vertical process timeline.
- Motion: slow image drift, subtle lift states and reduced-motion support.

## Local preview

```bash
pnpm install
pnpm dev
```

Open `http://localhost:3000/`. The portfolio page is available at `http://localhost:3000/portfolio`.

## Editing map

- Page copy and content: `app/portfolio/page.tsx`
- Shared theme and responsive rules: `app/globals.css`
- Visual opening: `app/page.tsx`
- Portfolio assets: `public/assets/`
