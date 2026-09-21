# Reference behavior notes

## Observed

- The reference moves between large color fields with a very broad, shallow curved boundary rather than a straight divider.
- A small luminous medallion/node sits on the center axis above a fan of extremely fine lines.
- The fan lines are low contrast, longest toward the outside, and act as depth guides rather than decoration with strong contrast.
- The primary content stage uses an asymmetrical desktop split: editorial heading and supporting copy on the left, a dominant circular visual on the right.
- Content fades and drifts subtly during scroll; the composition is readable without depending on the motion.
- The reference uses visible texture/noise to prevent large flat fields from appearing sterile.

## Adapted behavior

- The node gently breathes and the fiber fan changes opacity/scale at a slow rate.
- The circular portrait retains the site's existing 3D hover/focus flip.
- Motion is disabled under `prefers-reduced-motion`.
- No new navigation, audio, autoplay media, or scroll hijacking is introduced.

## Responsive note

- Desktop maintains a left-copy/right-portrait split.
- Below 760px, content stacks, the portrait becomes centered, and the fiber fan is shortened to avoid crossing text excessively.

