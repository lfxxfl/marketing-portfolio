'use client';

import { createPortal } from 'react-dom';
import { useEffect, useState } from 'react';
import { InfiniteSpiral, type InfiniteSpiralItem } from './infinite-spiral';
import styles from './photography-spiral.module.css';

export function PhotographySpiral({ items }: { items: InfiniteSpiralItem[] }) {
  const [selected, setSelected] = useState<InfiniteSpiralItem | null>(null);

  useEffect(() => {
    if (!selected) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setSelected(null);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [selected]);

  return (
    <div className={styles.shell}>
      <header className={styles.guide}>
        <span>07 photographs · Infinite spiral</span>
        <span>
          Scroll or drag vertically · Select an image to view the original
        </span>
      </header>
      <div className={styles.viewport}>
        <InfiniteSpiral
          items={items}
          animationMode="all"
          speed={0.34}
          direction="up"
          radius={300}
          cardWidth={330}
          cardHeight={220}
          verticalSpacing={104}
          perspective={1150}
          cardRadius={16}
          centerScale={1.12}
          edgeFade={0.34}
          edgeBlur={5}
          cardsPerTurn={7}
          pauseOnHover
          imageFit="cover"
          onItemClick={setSelected}
        />
      </div>

      {selected
        ? createPortal(
            <dialog
              className={styles.lightbox}
              aria-label="Original photograph preview"
              open
            >
              <button
                className={styles.backdrop}
                type="button"
                aria-label="Close original photograph preview"
                onClick={() => setSelected(null)}
              />
              <button
                className={styles.close}
                type="button"
                aria-label="Close original photograph preview"
                onClick={() => setSelected(null)}
              >
                ×
              </button>
              <figure className={styles.original}>
                {/* The original asset is intentionally rendered without Next.js dimensions so portrait and landscape files keep their native aspect ratio. */}
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={selected.src} alt={selected.alt} />
              </figure>
            </dialog>,
            document.body,
          )
        : null}
    </div>
  );
}
