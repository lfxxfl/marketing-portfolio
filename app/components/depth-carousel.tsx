'use client';

import Image from 'next/image';
import { gsap } from 'gsap';
import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type CSSProperties,
} from 'react';
import styles from './depth-carousel.module.css';

export type DepthCarouselItem = {
  image: string;
  alt: string;
  label?: string;
};

type DepthCarouselProps = {
  items: DepthCarouselItem[];
  ariaLabel: string;
  cardWidth: number;
  cardHeight: number;
  depth?: number;
  spread?: number;
  tilt?: number;
  perspective?: number;
  visibleCards?: number;
  falloff?: number;
  blur?: number;
  duration?: number;
  autoplay?: boolean;
  autoplayDelay?: number;
  loop?: boolean;
  fit?: 'contain' | 'cover';
};

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

export function DepthCarousel({
  items,
  ariaLabel,
  cardWidth,
  cardHeight,
  depth = 175,
  spread = 108,
  tilt = 17,
  perspective = 1450,
  visibleCards = 5,
  falloff = 0.16,
  blur = 3,
  duration = 0.72,
  autoplay = true,
  autoplayDelay = 3200,
  loop = true,
  fit = 'contain',
}: DepthCarouselProps) {
  const rootRef = useRef<HTMLElement>(null);
  const cardRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const autoplayTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const activeRef = useRef(0);
  const dragRef = useRef({ active: false, pointerId: -1, x: 0 });
  const wheelLockRef = useRef(false);
  const [activeIndex, setActiveIndex] = useState(0);

  const stopAutoplay = useCallback(() => {
    if (autoplayTimer.current) {
      clearInterval(autoplayTimer.current);
      autoplayTimer.current = null;
    }
  }, []);

  const resolveIndex = useCallback(
    (index: number) => {
      if (!items.length) return 0;
      if (loop) return ((index % items.length) + items.length) % items.length;
      return clamp(index, 0, items.length - 1);
    },
    [items.length, loop],
  );

  const animateTo = useCallback(
    (nextIndex: number, immediate = false) => {
      if (!items.length) return;
      const resolved = resolveIndex(nextIndex);
      activeRef.current = resolved;
      setActiveIndex(resolved);
      const reducedMotion = window.matchMedia(
        '(prefers-reduced-motion: reduce)',
      ).matches;
      const tweenDuration = immediate || reducedMotion ? 0 : duration;

      cardRefs.current.forEach((card, index) => {
        if (!card) return;
        let distance = index - resolved;
        if (loop && items.length > 2) {
          const half = items.length / 2;
          if (distance > half) distance -= items.length;
          if (distance < -half) distance += items.length;
        }

        const absoluteDistance = Math.abs(distance);
        const visible =
          absoluteDistance <= Math.max(1, Math.floor(visibleCards / 2));
        const opacity = visible
          ? clamp(1 - absoluteDistance * falloff, 0.12, 1)
          : 0;
        const scale = visible
          ? Math.max(0.74, 1 - absoluteDistance * 0.055)
          : 0.7;

        card.style.pointerEvents = visible ? 'auto' : 'none';
        card.tabIndex = visible ? 0 : -1;
        card.setAttribute('aria-current', distance === 0 ? 'true' : 'false');
        gsap.killTweensOf(card);
        gsap.to(card, {
          xPercent: -50,
          yPercent: -50,
          x: distance * spread,
          y: absoluteDistance * 13,
          z: -absoluteDistance * depth,
          rotationY: -distance * tilt,
          scale,
          opacity,
          zIndex: items.length - Math.round(absoluteDistance),
          filter: `blur(${absoluteDistance * blur}px) brightness(${Math.max(0.44, 1 - absoluteDistance * 0.12)})`,
          duration: tweenDuration,
          ease: 'power3.out',
          overwrite: true,
        });
      });
    },
    [
      blur,
      depth,
      duration,
      falloff,
      items.length,
      loop,
      resolveIndex,
      spread,
      tilt,
      visibleCards,
    ],
  );

  const scheduleAutoplay = useCallback(() => {
    stopAutoplay();
    const root = rootRef.current;
    if (
      !autoplay ||
      items.length < 2 ||
      root?.matches(':hover') ||
      root?.contains(document.activeElement)
    )
      return;
    autoplayTimer.current = setInterval(() => {
      animateTo(activeRef.current + 1);
    }, autoplayDelay);
  }, [animateTo, autoplay, autoplayDelay, items.length, stopAutoplay]);

  const goTo = useCallback(
    (index: number) => {
      animateTo(index);
      scheduleAutoplay();
    },
    [animateTo, scheduleAutoplay],
  );

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const resize = () => {
      const rect = root.getBoundingClientRect();
      const widthScale = rect.width / (cardWidth + spread * 2 + 150);
      const heightScale = rect.height / (cardHeight + 112);
      const scale = clamp(Math.min(widthScale, heightScale, 1), 0.34, 1);
      root.style.setProperty('--depth-carousel-scale', scale.toFixed(3));
    };

    const observer = new ResizeObserver(resize);
    observer.observe(root);
    resize();
    animateTo(activeRef.current, true);
    scheduleAutoplay();

    const handlePointerDown = (event: PointerEvent) => {
      if (
        (event.target as Element)
          .closest('button')
          ?.hasAttribute('data-carousel-control')
      )
        return;
      dragRef.current = {
        active: true,
        pointerId: event.pointerId,
        x: event.clientX,
      };
      root.setPointerCapture?.(event.pointerId);
      stopAutoplay();
    };

    const handlePointerMove = (event: PointerEvent) => {
      if (
        !dragRef.current.active ||
        dragRef.current.pointerId !== event.pointerId
      )
        return;
      const delta = event.clientX - dragRef.current.x;
      if (Math.abs(delta) < 46) return;
      animateTo(activeRef.current + (delta < 0 ? 1 : -1));
      dragRef.current.x = event.clientX;
    };

    const handlePointerUp = (event: PointerEvent) => {
      if (dragRef.current.pointerId !== event.pointerId) return;
      dragRef.current.active = false;
      root.releasePointerCapture?.(event.pointerId);
      scheduleAutoplay();
    };

    const handleWheel = (event: WheelEvent) => {
      if (
        wheelLockRef.current ||
        Math.max(Math.abs(event.deltaX), Math.abs(event.deltaY)) < 8
      )
        return;
      wheelLockRef.current = true;
      animateTo(
        activeRef.current + ((event.deltaX || event.deltaY) > 0 ? 1 : -1),
      );
      scheduleAutoplay();
      window.setTimeout(() => {
        wheelLockRef.current = false;
      }, 430);
    };

    const handleFocusIn = () => stopAutoplay();
    const handleFocusOut = (event: FocusEvent) => {
      if (!root.contains(event.relatedTarget as Node | null))
        scheduleAutoplay();
    };

    root.addEventListener('pointerdown', handlePointerDown);
    root.addEventListener('pointermove', handlePointerMove);
    root.addEventListener('pointerup', handlePointerUp);
    root.addEventListener('pointercancel', handlePointerUp);
    root.addEventListener('wheel', handleWheel, { passive: true });
    root.addEventListener('mouseenter', stopAutoplay);
    root.addEventListener('mouseleave', scheduleAutoplay);
    root.addEventListener('focusin', handleFocusIn);
    root.addEventListener('focusout', handleFocusOut);
    const cards = cardRefs.current.slice();

    return () => {
      observer.disconnect();
      stopAutoplay();
      root.removeEventListener('pointerdown', handlePointerDown);
      root.removeEventListener('pointermove', handlePointerMove);
      root.removeEventListener('pointerup', handlePointerUp);
      root.removeEventListener('pointercancel', handlePointerUp);
      root.removeEventListener('wheel', handleWheel);
      root.removeEventListener('mouseenter', stopAutoplay);
      root.removeEventListener('mouseleave', scheduleAutoplay);
      root.removeEventListener('focusin', handleFocusIn);
      root.removeEventListener('focusout', handleFocusOut);
      cards.forEach((card) => card && gsap.killTweensOf(card));
    };
  }, [
    animateTo,
    cardHeight,
    cardWidth,
    scheduleAutoplay,
    spread,
    stopAutoplay,
  ]);

  const customProperties = {
    '--depth-card-width': `${cardWidth}px`,
    '--depth-card-height': `${cardHeight}px`,
    '--depth-perspective': `${perspective}px`,
  } as CSSProperties;

  return (
    <section
      ref={rootRef}
      className={styles.root}
      style={customProperties}
      data-fit={fit}
      aria-label={ariaLabel}
      aria-roledescription="carousel"
    >
      <div className={styles.stage}>
        <div className={styles.track}>
          {items.map((item, index) => (
            <button
              ref={(node) => {
                cardRefs.current[index] = node;
              }}
              className={styles.card}
              data-depth-card
              type="button"
              onClick={() => goTo(index)}
              onFocus={() => animateTo(index)}
              onKeyDown={(event) => {
                if (event.key === 'ArrowLeft') {
                  event.preventDefault();
                  goTo(activeRef.current - 1);
                }
                if (event.key === 'ArrowRight') {
                  event.preventDefault();
                  goTo(activeRef.current + 1);
                }
              }}
              aria-label={`${item.label ?? item.alt}, item ${index + 1} of ${items.length}`}
              key={item.image}
            >
              <span className={styles.media}>
                <Image
                  src={item.image}
                  alt={item.alt}
                  fill
                  sizes="(max-width: 768px) 82vw, 42rem"
                />
              </span>
              {item.label ? (
                <span className={styles.label}>{item.label}</span>
              ) : null}
              <span className={styles.number} aria-hidden="true">
                {String(index + 1).padStart(2, '0')}
              </span>
            </button>
          ))}
        </div>
      </div>

      <div className={styles.controls}>
        <button
          data-carousel-control
          type="button"
          onClick={() => goTo(activeRef.current - 1)}
          aria-label="Previous image"
        >
          ←
        </button>
        <div className={styles.indicators} aria-label="Choose an image">
          {items.map((item, index) => (
            <button
              data-carousel-control
              type="button"
              className={index === activeIndex ? styles.activeIndicator : ''}
              onClick={() => goTo(index)}
              aria-label={`Show ${item.label ?? `image ${index + 1}`}`}
              aria-current={index === activeIndex ? 'true' : undefined}
              key={`${item.image}-indicator`}
            />
          ))}
        </div>
        <button
          data-carousel-control
          type="button"
          onClick={() => goTo(activeRef.current + 1)}
          aria-label="Next image"
        >
          →
        </button>
      </div>
      <p className={styles.status} aria-live="polite">
        {activeIndex + 1} of {items.length}
      </p>
    </section>
  );
}
