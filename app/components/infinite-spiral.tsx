'use client';

import Image from 'next/image';
import { useEffect, useMemo, useRef, type CSSProperties } from 'react';
import styles from './infinite-spiral.module.css';

export type InfiniteSpiralItem = {
  src: string;
  alt: string;
  label?: string;
  id?: string;
};

type InfiniteSpiralProps = {
  items: InfiniteSpiralItem[];
  speed?: number;
  direction?: 'up' | 'down';
  animationMode?: 'auto' | 'drag' | 'scroll' | 'all';
  radius?: number;
  cardWidth?: number;
  cardHeight?: number;
  verticalSpacing?: number;
  perspective?: number;
  cardsPerTurn?: number;
  rotation?: number;
  cardTilt?: number;
  cardRadius?: number;
  centerScale?: number;
  edgeFade?: number;
  edgeBlur?: number;
  pauseOnHover?: boolean;
  imageFit?: 'cover' | 'contain';
  grayscale?: number;
  onItemClick?: (item: InfiniteSpiralItem) => void;
};

const clamp = (value: number, min: number, max: number) =>
  Math.min(Math.max(value, min), max);
const modulo = (value: number, divisor: number) =>
  ((value % divisor) + divisor) % divisor;
const smoothstep = (min: number, max: number, value: number) => {
  const progress = clamp((value - min) / (max - min || 1), 0, 1);
  return progress * progress * (3 - 2 * progress);
};

export function InfiniteSpiral({
  items,
  speed = 0.55,
  direction = 'up',
  animationMode = 'auto',
  radius = 170,
  cardWidth = 100,
  cardHeight = 100,
  verticalSpacing = 60,
  perspective = 1000,
  cardsPerTurn = 7,
  rotation = 0,
  cardTilt = 0,
  cardRadius = 10,
  centerScale = 1.2,
  edgeFade = 0.3,
  edgeBlur = 6,
  pauseOnHover = true,
  imageFit = 'cover',
  grayscale = 0,
  onItemClick,
}: InfiniteSpiralProps) {
  const rootRef = useRef<HTMLElement>(null);
  const cardRefs = useRef<Array<HTMLLIElement | null>>([]);
  const progressRef = useRef(0);
  const targetProgressRef = useRef(0);
  const autoSpeedRef = useRef(0);
  const hoveredRef = useRef(false);
  const visibleRef = useRef(true);
  const draggingRef = useRef(false);
  const dragStartYRef = useRef(0);
  const lastPointerYRef = useRef(0);
  const dragMovedRef = useRef(false);

  const normalizedItems = useMemo(
    () =>
      items.map((item, index) => ({
        ...item,
        alt: item.alt || `Photograph ${index + 1}`,
      })),
    [items],
  );

  useEffect(() => {
    const root = rootRef.current;
    if (!root || !normalizedItems.length) return;

    let frameId = 0;
    let previousTime = performance.now();
    let bounds = root.getBoundingClientRect();
    let lastScrollY = window.scrollY;
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const scrollEnabled = animationMode === 'scroll' || animationMode === 'all';
    const dragEnabled = animationMode === 'drag' || animationMode === 'all';
    const scrollSpeedMultiplier = Math.max(speed, 0) / 0.55;

    const resizeObserver = new ResizeObserver(() => {
      bounds = root.getBoundingClientRect();
    });
    resizeObserver.observe(root);

    const intersectionObserver = new IntersectionObserver(
      ([entry]) => {
        visibleRef.current = entry.isIntersecting;
      },
      { threshold: 0.02 },
    );
    intersectionObserver.observe(root);

    const handleScroll = () => {
      const nextScrollY = window.scrollY;
      const scrollDelta = nextScrollY - lastScrollY;
      lastScrollY = nextScrollY;
      if (!scrollEnabled || !visibleRef.current || scrollDelta === 0) return;
      targetProgressRef.current += clamp(
        (scrollDelta * scrollSpeedMultiplier) /
          Math.max(verticalSpacing * 2, 1),
        -1.5,
        1.5,
      );
    };

    const handlePointerEnter = () => {
      hoveredRef.current = true;
    };
    const handlePointerLeave = () => {
      hoveredRef.current = false;
    };
    const handlePointerDown = (event: PointerEvent) => {
      if (!dragEnabled || event.button !== 0) return;
      draggingRef.current = true;
      dragMovedRef.current = false;
      dragStartYRef.current = event.clientY;
      lastPointerYRef.current = event.clientY;
      targetProgressRef.current = progressRef.current;
      root.style.cursor = 'grabbing';
    };
    const handlePointerMove = (event: PointerEvent) => {
      if (!draggingRef.current) return;
      const pointerDelta = event.clientY - lastPointerYRef.current;
      lastPointerYRef.current = event.clientY;
      if (
        Math.abs(event.clientY - dragStartYRef.current) > 8 &&
        !dragMovedRef.current
      ) {
        dragMovedRef.current = true;
        root.setPointerCapture?.(event.pointerId);
      }
      targetProgressRef.current -= pointerDelta / Math.max(verticalSpacing, 1);
    };
    const stopDragging = (event: PointerEvent) => {
      if (!draggingRef.current) return;
      draggingRef.current = false;
      if (root.hasPointerCapture?.(event.pointerId))
        root.releasePointerCapture(event.pointerId);
      root.style.cursor = dragEnabled ? 'grab' : 'default';
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    root.addEventListener('pointerenter', handlePointerEnter);
    root.addEventListener('pointerleave', handlePointerLeave);
    root.addEventListener('pointerdown', handlePointerDown);
    root.addEventListener('pointermove', handlePointerMove);
    root.addEventListener('pointerup', stopDragging);
    root.addEventListener('pointercancel', stopDragging);

    const render = (time: number) => {
      const delta = Math.min((time - previousTime) / 1000, 0.05);
      previousTime = time;

      const autoEnabled = animationMode === 'auto' || animationMode === 'all';
      const motionPaused =
        draggingRef.current || (pauseOnHover && hoveredRef.current);
      const directionMultiplier = direction === 'down' ? -1 : 1;
      const desiredAutoSpeed =
        autoEnabled &&
        visibleRef.current &&
        !reducedMotion.matches &&
        !motionPaused
          ? speed * directionMultiplier
          : 0;
      const speedBlend = 1 - Math.exp(-delta * 7);
      autoSpeedRef.current +=
        (desiredAutoSpeed - autoSpeedRef.current) * speedBlend;
      targetProgressRef.current += autoSpeedRef.current * delta;

      const followBlend =
        1 - Math.exp(-delta * (draggingRef.current ? 22 : 11));
      progressRef.current +=
        (targetProgressRef.current - progressRef.current) * followBlend;

      const count = normalizedItems.length;
      const half = count / 2;
      const width = Math.max(bounds.width, 1);
      const height = Math.max(bounds.height, 1);
      const fit = Math.min(
        1,
        width / (cardWidth * 2.8),
        height / (cardHeight * 2.35),
      );
      const responsiveRadius =
        Math.min(radius, Math.max(72, width * 0.36)) * fit;
      const fadeStart = clamp(1 - edgeFade, 0, 0.98);
      const turnSize = Math.max(cardsPerTurn, 1);

      cardRefs.current.forEach((card, index) => {
        if (!card) return;
        let offset = index - progressRef.current;
        offset = modulo(offset + half, count) - half;

        const edge = Math.min(Math.abs(offset) / Math.max(half, 1), 1);
        const opacity = 1 - smoothstep(fadeStart, 1, edge);
        const focus =
          1 - Math.min(Math.abs(offset) / Math.max(turnSize * 0.65, 1), 1);
        const scale = (1 + (centerScale - 1) * focus) * fit;
        const angle = offset * (360 / turnSize) + rotation;
        const angleRadians = (angle * Math.PI) / 180;
        const x = Math.sin(angleRadians) * responsiveRadius;
        const z = Math.cos(angleRadians) * responsiveRadius;
        const depthScale = clamp(
          perspective / Math.max(perspective - z, 1),
          0.72,
          1.45,
        );
        const visualScale = scale * depthScale;
        const depthOrder = (z / Math.max(responsiveRadius, 1) + 1) / 2;
        const blurAmount = edgeBlur * smoothstep(0.35, 1, edge);

        card.style.transform = `translate(-50%, -50%) translate3d(${x}px, ${offset * verticalSpacing * fit}px, 0) rotateZ(${cardTilt}deg) scale(${visualScale})`;
        card.style.opacity = opacity.toFixed(3);
        card.style.filter =
          blurAmount > 0.01 ? `blur(${blurAmount.toFixed(2)}px)` : 'none';
        card.style.zIndex = String(Math.round(depthOrder * 100000) + index);
        card.style.pointerEvents = opacity > 0.25 ? 'auto' : 'none';
      });

      frameId = requestAnimationFrame(render);
    };

    frameId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(frameId);
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
      window.removeEventListener('scroll', handleScroll);
      root.removeEventListener('pointerenter', handlePointerEnter);
      root.removeEventListener('pointerleave', handlePointerLeave);
      root.removeEventListener('pointerdown', handlePointerDown);
      root.removeEventListener('pointermove', handlePointerMove);
      root.removeEventListener('pointerup', stopDragging);
      root.removeEventListener('pointercancel', stopDragging);
    };
  }, [
    animationMode,
    cardHeight,
    cardTilt,
    cardWidth,
    cardsPerTurn,
    centerScale,
    direction,
    edgeBlur,
    edgeFade,
    normalizedItems,
    pauseOnHover,
    perspective,
    radius,
    rotation,
    speed,
    verticalSpacing,
  ]);

  const rootStyle = {
    '--spiral-card-width': `${cardWidth}px`,
    '--spiral-card-height': `${cardHeight}px`,
    '--spiral-card-radius': `${cardRadius}px`,
    '--spiral-image-fit': imageFit,
    '--spiral-grayscale': Math.min(1, Math.max(0, grayscale)),
    '--spiral-perspective': `${perspective}px`,
    cursor:
      animationMode === 'drag' || animationMode === 'all' ? 'grab' : 'default',
  } as CSSProperties;

  return (
    <section
      ref={rootRef}
      className={styles.root}
      style={rootStyle}
      aria-label="Infinite spiral photography gallery"
      aria-roledescription="carousel"
    >
      <ul className={styles.stage}>
        {normalizedItems.map((item, index) => (
          <li
            ref={(node) => {
              cardRefs.current[index] = node;
            }}
            className={styles.item}
            key={item.id ?? `${item.src}-${index}`}
          >
            <button
              className={styles.openButton}
              type="button"
              onClick={() => {
                if (dragMovedRef.current) {
                  dragMovedRef.current = false;
                  return;
                }
                onItemClick?.(item);
              }}
              aria-label={`Open original: ${item.label ?? item.alt}`}
            >
              <Image
                className={styles.image}
                src={item.src}
                alt={item.alt}
                fill
                sizes="(max-width: 700px) 72vw, 22rem"
                priority={index < 3}
                draggable={false}
              />
              <span className={styles.label} aria-hidden="true">
                {item.label ??
                  `Photograph ${String(index + 1).padStart(2, '0')}`}
              </span>
            </button>
          </li>
        ))}
      </ul>
    </section>
  );
}
