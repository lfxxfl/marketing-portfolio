'use client';

import { useEffect } from 'react';
import { GlowCursor } from './glow-cursor';
import styles from './project-page-effects.module.css';

const BORDER_TARGETS = [
  '.editorial-case',
  '.product-comparison',
  '.comparison-panel',
  '.campaign-asset',
  '.campaign-text-links > a',
  '.product-category-page',
  '[data-depth-card]',
  '.catalog-project',
  '.event-deliverable',
  '.flow-cafe-gallery-card',
  '.website-project-card',
].join(',');

const SPOTLIGHT_RADIUS = 300;

export function ProjectPageEffects() {
  useEffect(() => {
    const scope = document.querySelector<HTMLElement>('main.project-effects-page');
    if (!scope) return;

    const reducedEffects = window.matchMedia('(max-width: 768px), (pointer: coarse), (prefers-reduced-motion: reduce)').matches;
    const cards = Array.from(scope.querySelectorAll<HTMLElement>(BORDER_TARGETS));
    cards.forEach((card) => card.classList.add(styles.borderCard));

    if (reducedEffects) {
      return () => cards.forEach((card) => card.classList.remove(styles.borderCard));
    }

    let pointerX = 0;
    let pointerY = 0;
    let animationFrame = 0;

    const reset = () => {
      cards.forEach((card) => card.style.setProperty('--project-glow-intensity', '0'));
    };

    const paint = () => {
      animationFrame = 0;
      const proximity = SPOTLIGHT_RADIUS * .5;
      const fadeDistance = SPOTLIGHT_RADIUS * .75;

      cards.forEach((card) => {
        const rect = card.getBoundingClientRect();
        const relativeX = ((pointerX - rect.left) / Math.max(rect.width, 1)) * 100;
        const relativeY = ((pointerY - rect.top) / Math.max(rect.height, 1)) * 100;
        const distanceX = Math.max(rect.left - pointerX, 0, pointerX - rect.right);
        const distanceY = Math.max(rect.top - pointerY, 0, pointerY - rect.bottom);
        const distance = Math.hypot(distanceX, distanceY);
        const intensity = distance <= proximity
          ? 1
          : distance <= fadeDistance
            ? (fadeDistance - distance) / (fadeDistance - proximity)
            : 0;

        card.style.setProperty('--project-glow-x', `${relativeX}%`);
        card.style.setProperty('--project-glow-y', `${relativeY}%`);
        card.style.setProperty('--project-glow-intensity', intensity.toFixed(3));
        card.style.setProperty('--project-glow-radius', `${SPOTLIGHT_RADIUS}px`);
      });
    };

    const handlePointerMove = (event: PointerEvent) => {
      pointerX = event.clientX;
      pointerY = event.clientY;
      if (!animationFrame) animationFrame = requestAnimationFrame(paint);
    };

    window.addEventListener('pointermove', handlePointerMove, { passive: true });
    window.addEventListener('blur', reset);
    document.documentElement.addEventListener('pointerleave', reset);

    return () => {
      if (animationFrame) cancelAnimationFrame(animationFrame);
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('blur', reset);
      document.documentElement.removeEventListener('pointerleave', reset);
      cards.forEach((card) => {
        card.classList.remove(styles.borderCard);
        card.style.removeProperty('--project-glow-x');
        card.style.removeProperty('--project-glow-y');
        card.style.removeProperty('--project-glow-intensity');
        card.style.removeProperty('--project-glow-radius');
      });
    };
  }, []);

  return (
    <GlowCursor
      color="#67e8f9"
      secondaryColor="#a78bfa"
      trailLength={40}
      trailWidth={8}
      trailTaper={.8}
      followSpeed={.16}
      glowIntensity={1.9}
      glowSpread={1.2}
      hotspot={.65}
      brightness={1.25}
      opacity={1}
      pulseSpeed={1.1}
      noiseStrength={.035}
      idleFade
      idleTimeout={700}
      fadeDuration={900}
      blendMode="screen"
      maxDevicePixelRatio={1.5}
      className={styles.cursor}
    />
  );
}
