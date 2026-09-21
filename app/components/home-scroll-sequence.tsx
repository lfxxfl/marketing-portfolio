'use client';

import { useEffect, useRef, type ReactNode } from 'react';
import styles from './home-scroll-sequence.module.css';

type HomeScrollSequenceProps = {
  hero: ReactNode;
  transition: ReactNode;
};

const clamp = (value: number) => Math.min(1, Math.max(0, value));
const smoothstep = (value: number) => value * value * (3 - 2 * value);

export function HomeScrollSequence({ hero, transition }: HomeScrollSequenceProps) {
  const sequenceRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const sequence = sequenceRef.current;
    if (!sequence) return;

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    let frame = 0;

    const update = () => {
      frame = 0;

      if (reducedMotion.matches) {
        sequence.style.setProperty('--home-hero-progress', '0');
        sequence.style.setProperty('--home-hero-opacity', '1');
        sequence.style.setProperty('--home-hero-shift-x', '0vw');
        sequence.style.setProperty('--home-hero-rotate-y', '0deg');
        sequence.style.setProperty('--home-hero-scale', '1');
        sequence.style.setProperty('--home-water-opacity', '1');
        sequence.style.setProperty('--home-next-opacity', '1');
        sequence.style.setProperty('--home-next-y', '0rem');
        return;
      }

      const viewportHeight = Math.max(1, window.innerHeight);
      const scrollDistance = -sequence.getBoundingClientRect().top / viewportHeight;
      const heroProgress = smoothstep(clamp(scrollDistance));
      const transitionProgress = smoothstep(clamp(scrollDistance - 1));
      const heroOpacity = 1 - smoothstep(clamp((scrollDistance - 0.08) / 0.76));
      const nextOpacity = smoothstep(clamp((transitionProgress - 0.16) / 0.74));
      const waterOpacity = 1 - smoothstep(clamp((transitionProgress - 0.12) / 0.78));
      const isCompact = window.innerWidth <= 700;
      const horizontalShift = heroProgress * (isCompact ? 8 : 14);
      const rotation = heroProgress * (isCompact ? -12 : -20);
      const scale = 1 + heroProgress * (isCompact ? 0.16 : 0.24);

      sequence.style.setProperty('--home-hero-progress', heroProgress.toFixed(4));
      sequence.style.setProperty('--home-hero-opacity', heroOpacity.toFixed(4));
      sequence.style.setProperty('--home-hero-shift-x', `${horizontalShift.toFixed(3)}vw`);
      sequence.style.setProperty('--home-hero-rotate-y', `${rotation.toFixed(3)}deg`);
      sequence.style.setProperty('--home-hero-scale', scale.toFixed(4));
      sequence.style.setProperty('--home-water-opacity', waterOpacity.toFixed(4));
      sequence.style.setProperty('--home-next-opacity', nextOpacity.toFixed(4));
      sequence.style.setProperty('--home-next-y', `${((1 - nextOpacity) * 2.4).toFixed(3)}rem`);
    };

    const requestUpdate = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener('scroll', requestUpdate, { passive: true });
    window.addEventListener('resize', requestUpdate);
    reducedMotion.addEventListener('change', requestUpdate);

    return () => {
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener('scroll', requestUpdate);
      window.removeEventListener('resize', requestUpdate);
      reducedMotion.removeEventListener('change', requestUpdate);
    };
  }, []);

  return (
    <div className={styles.sequence} ref={sequenceRef}>
      <div className={styles.heroPin}>
        <div className={styles.heroShell}>{hero}</div>
      </div>
      {transition}
    </div>
  );
}
