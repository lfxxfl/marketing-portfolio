# Home Hero Specification

## Overview

- Target: `app/components/aircord-home-hero.tsx`
- Interaction model: time-driven ambient animation, pointer parallax, hover-driven project preview
- Scope: replace only the existing Home Hero

## Source Measurements at 1280 × 720

- Hero: `1280 × 720`, full viewport.
- Palette: background around `#9b9b9b`; foreground `#f8f8e4`; dark preview `#06080a`.
- Typeface: Neue Montreal-style grotesk; existing site sans-serif stack is used as the closest local match.
- Oversized title: `213.325px` in the source, uppercase, single-line, clipped at the viewport edges.
- Grid gutter: `15px`; double gutter: `30px`; fixed header and footer rail height: `60px`.
- Supporting copy: upper-left at `x:15px`, `y:265px`, about `316px` wide.
- Primary project link: centered, about `515 × 290px`, vertically centered, with a `45px` rounded action below.
- Secondary reel: lower-right, about `195 × 115px`, `10px` radius.

## DOM Structure

- `section.aircord-home-hero`
  - background texture and reflection layers
  - oversized title
  - identity/copy block
  - centered `/projects` link with a miniature Projects Reel composition
  - secondary cycling visual
  - two small footer labels

## States & Behaviors

- Pointer movement updates normalized X/Y variables and smoothly offsets the scene layers.
- The central preview brightens and scales slightly on hover/focus; its film strip advances continuously.
- The orb follows the pointer locally and emits concentric ripples on hover.
- The secondary reel crossfades among the four existing portfolio images.
- Reduced-motion mode disables continuous and pointer-driven motion while preserving the layout and link.

## Text Content

- Primary: `Marketing, made visible`
- Name: `LAUREN LUO`
- Proposition: `I turn market signals into clear propositions, testable creative and measurable growth across digital products, e-commerce, social media, websites and live experiences.`
- CTA: `View projects`

## Assets

- `/assets/projects-reel/growth-commerce.png`
- `/assets/projects-reel/social-brand.png`
- `/assets/projects-reel/digital-campaign.png`
- `/assets/projects-reel/my-work.png`

## Responsive Behavior

- Desktop: oversized single-line title, central project surface, left copy and lower-right secondary reel.
- Tablet: title reduces, project surface stays centered, supporting blocks move inward.
- Mobile: title wraps into three lines, project surface becomes full-width below the copy, secondary reel is omitted, and all text remains readable without horizontal overflow.
