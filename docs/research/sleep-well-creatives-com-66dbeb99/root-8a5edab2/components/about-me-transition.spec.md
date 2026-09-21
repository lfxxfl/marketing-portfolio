# Component spec: About Me curved transition

## Scope and geometry

- Full-bleed black chapter begins immediately below the cinematic transition with no border.
- Black breathing space: `clamp(8rem, 17vw, 17rem)` before the curved color field.
- Curved field spans the viewport; its upper edge is a shallow ellipse that rises at the center by approximately `8–11vw`.
- Internal content width follows the existing site maximum (`87rem`) and side gutters.
- Desktop content grid: approximately `1.08fr / 0.92fr`, gap `clamp(3rem, 8vw, 9rem)`.
- Portrait: circular, `clamp(19rem, 31vw, 31rem)`, aligned to the right column.

## Visual tokens

- Canvas black: `rgb(0, 0, 0)`.
- Portal base: `#11193a`.
- Portal highlights: `rgba(92, 118, 210, .42)`, `rgba(84, 191, 190, .25)`, `rgba(182, 151, 225, .22)`.
- Primary text: warm white from the current theme.
- Supporting text: current muted ink token with sufficient contrast.
- Node: 22–30px pearl core, lilac and aqua halo.
- Fiber lines: 1px or less, lilac/aqua, 12–42% opacity, fading to transparent.

## Content contract

- Do not add reference-site text.
- Preserve the exact existing About Me label, lead paragraph, two supporting paragraphs, location metadata, image alt text, and hover instruction.
- Remove only the duplicated `SectionHeading` that repeats the cinematic transition copy.

## Interaction states

- Portrait default: existing blue halftone portrait.
- Portrait hover/focus: existing alternate flower portrait via 3D Y-axis flip.
- Node/fibers: slow ambient breathing; no pointer tracking required.
- Focus: preserve visible focus ring around portrait control.
- Reduced motion: stop node, fiber, and portrait transition animations.

## Responsive behavior

- At `<= 760px`: stack copy then portrait; center portrait; reduce arc height and ray span; keep all text readable on the colored field.
- At `<= 480px`: use 1rem page gutters, portrait width `min(78vw, 20rem)`, and reduce the black buffer to avoid an empty first screen.

