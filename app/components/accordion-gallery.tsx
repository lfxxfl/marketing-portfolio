'use client';

import { gsap } from 'gsap';
import Image from 'next/image';
import { useReducedMotion } from 'framer-motion';
import { useCallback, useEffect, useRef, useState, type CSSProperties, type KeyboardEvent, type MouseEvent } from 'react';
import styles from './accordion-gallery.module.css';

export type AccordionGalleryItem = {
  image: string;
  label?: string;
  alt?: string;
  width: number;
  height: number;
};

type AccordionGalleryProps = {
  items: AccordionGalleryItem[];
  defaultIndex?: number;
  accentColor?: string;
  overlayColor?: string;
  textColor?: string;
  height?: number;
  gap?: number;
  radius?: number;
  expandRatio?: number;
  orientation?: 'horizontal' | 'vertical';
  duration?: number;
  ease?: string;
  parallax?: number;
  tilt?: number;
  stagger?: number;
  trigger?: 'hover' | 'click';
  showLabels?: boolean;
  grayscale?: boolean;
  className?: string;
  onItemClick?: (item: AccordionGalleryItem, index: number) => void;
};

type GalleryVars = CSSProperties & {
  '--ag-accent': string;
  '--ag-overlay': string;
  '--ag-text': string;
  '--ag-gap': string;
  '--ag-radius': string;
};

export function AccordionGallery({
  items,
  defaultIndex = 0,
  accentColor = '#d7e2ea',
  overlayColor = '#060010',
  textColor = '#ffffff',
  height = 460,
  gap = 10,
  radius = 18,
  expandRatio = .52,
  orientation = 'horizontal',
  duration = .6,
  ease = 'power3.out',
  parallax = .5,
  tilt = 8,
  stagger = .06,
  trigger = 'hover',
  showLabels = true,
  grayscale = true,
  className = '',
  onItemClick,
}: AccordionGalleryProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const panelRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const mediaRefs = useRef<Array<HTMLSpanElement | null>>([]);
  const barRefs = useRef<Array<HTMLSpanElement | null>>([]);
  const textRefs = useRef<Array<HTMLSpanElement | null>>([]);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);
  const firstRunRef = useRef(true);
  const mediaSizeRef = useRef(320);
  const reducedMotion = Boolean(useReducedMotion());
  const vertical = orientation === 'vertical';
  const count = items.length;
  const [active, setActive] = useState(Math.min(Math.max(defaultIndex, 0), Math.max(0, count - 1)));

  const applyLayout = useCallback((animate: boolean) => {
    const panels = panelRefs.current;
    if (!panels.length || count === 0) return;

    const ratio = Math.min(Math.max(expandRatio, .2), .9);
    const grow = count > 1 ? (ratio * (count - 1)) / (1 - ratio) : 1;
    const mediaSize = mediaSizeRef.current;
    timelineRef.current?.kill();
    const animationDuration = animate && !reducedMotion ? duration : 0;
    const timeline = gsap.timeline();

    panels.forEach((panel, index) => {
      if (!panel) return;
      const isActive = index === active;
      const rotation = isActive ? 0 : index < active ? tilt : -tilt;
      const rotationProperties = vertical ? { rotateX: -rotation } : { rotateY: rotation };
      timeline.to(panel, { flexGrow: isActive ? grow : 1, ...rotationProperties, duration: animationDuration, ease }, 0);

      const media = mediaRefs.current[index];
      if (media) {
        const drift = Math.max(-1.5, Math.min(1.5, active - index));
        const shift = drift * parallax * mediaSize * .06;
        timeline.to(media, {
          xPercent: -50,
          yPercent: -50,
          x: vertical ? 0 : isActive ? 0 : shift,
          y: vertical ? isActive ? 0 : shift : 0,
          '--ag-gray': grayscale ? isActive ? 0 : 1 : 0,
          '--ag-dim': isActive ? 0 : .35,
          duration: animationDuration,
          ease,
        }, 0);
      }

      const bar = barRefs.current[index];
      const text = textRefs.current[index];
      if (showLabels && bar && text) {
        if (isActive) {
          timeline.to([bar, text], { opacity: 1, x: 0, duration: animationDuration, ease, stagger: reducedMotion ? 0 : stagger }, 0);
        } else {
          timeline.to([bar, text], { opacity: 0, x: -14, duration: animationDuration * .6, ease }, 0);
        }
      }
    });

    timelineRef.current = timeline;
  }, [active, count, duration, ease, expandRatio, grayscale, parallax, reducedMotion, showLabels, stagger, tilt, vertical]);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const measure = () => {
      const rect = root.getBoundingClientRect();
      const total = vertical ? rect.height : rect.width;
      const usable = Math.max(total - gap * Math.max(0, count - 1), 120);
      const size = Math.max(140, usable * Math.min(Math.max(expandRatio, .2), .9) * 1.22);
      mediaSizeRef.current = size;
      root.style.setProperty('--ag-media-size', `${size}px`);
      applyLayout(!firstRunRef.current);
    };

    measure();
    const resizeObserver = new ResizeObserver(measure);
    resizeObserver.observe(root);
    return () => resizeObserver.disconnect();
  }, [applyLayout, count, expandRatio, gap, vertical]);

  useEffect(() => {
    applyLayout(!firstRunRef.current);
    firstRunRef.current = false;
  }, [applyLayout]);

  useEffect(() => () => {
    timelineRef.current?.kill();
  }, []);

  const handleClick = (index: number, event: MouseEvent<HTMLButtonElement>) => {
    if (index !== active) {
      event.preventDefault();
      setActive(index);
      return;
    }
    onItemClick?.(items[index], index);
  };

  const handleKeyDown = (index: number, event: KeyboardEvent<HTMLButtonElement>) => {
    if (event.key === 'ArrowRight' || event.key === 'ArrowDown') {
      event.preventDefault();
      setActive((index + 1) % count);
    } else if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') {
      event.preventDefault();
      setActive((index - 1 + count) % count);
    }
  };

  const rootStyle: GalleryVars = {
    '--ag-accent': accentColor,
    '--ag-overlay': overlayColor,
    '--ag-text': textColor,
    '--ag-gap': `${gap}px`,
    '--ag-radius': `${radius}px`,
    height: vertical ? `${Math.round(height * 1.6)}px` : `${height}px`,
  };

  return (
    <section
      ref={rootRef}
      className={`${styles.root}${vertical ? ` ${styles.vertical}` : ''}${count === 1 ? ` ${styles.single}` : ''}${className ? ` ${className}` : ''}`}
      style={rootStyle}
      aria-label="Image accordion gallery"
    >
      {items.map((item, index) => {
        const isActive = index === active;
        return (
          <button
            className={styles.panel}
            key={item.image}
            onClick={(event) => handleClick(index, event)}
            onFocus={() => setActive(index)}
            onKeyDown={(event) => handleKeyDown(index, event)}
            onMouseEnter={() => trigger === 'hover' && setActive(index)}
            ref={(element) => { panelRefs.current[index] = element; }}
            type="button"
            aria-current={isActive ? 'true' : undefined}
            aria-label={`${item.label || `Image ${index + 1}`}. Click to view full image.`}
          >
            <span className={styles.frame}>
              <span className={styles.media} ref={(element) => { mediaRefs.current[index] = element; }}>
                <Image src={item.image} alt={item.alt || item.label || ''} fill sizes="(max-width: 520px) calc(100vw - 3rem), 70vw" />
              </span>
              <span className={styles.overlay} aria-hidden="true" />
            </span>
            {showLabels ? (
              <span className={styles.label} aria-hidden="true">
                <span className={styles.bar} ref={(element) => { barRefs.current[index] = element; }} />
                <span className={styles.text} ref={(element) => { textRefs.current[index] = element; }}>{item.label}</span>
              </span>
            ) : null}
          </button>
        );
      })}
    </section>
  );
}
