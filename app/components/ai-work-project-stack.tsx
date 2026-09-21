'use client';

import { motion, useReducedMotion, useScroll, useTransform, type MotionValue } from 'framer-motion';
import Image from 'next/image';
import { createPortal } from 'react-dom';
import { useEffect, useRef, useState, type CSSProperties } from 'react';
import { AccordionGallery, type AccordionGalleryItem } from './accordion-gallery';
import styles from './ai-work-project-stack.module.css';

export type AiWorkArtwork = {
  label: string;
  images: AccordionGalleryItem[];
};

export function AiWorkProjectStack({ artworks }: { artworks: AiWorkArtwork[] }) {
  const sectionRef = useRef<HTMLElement>(null);
  const [selectedImage, setSelectedImage] = useState<AccordionGalleryItem | null>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end'],
  });

  useEffect(() => {
    if (!selectedImage) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const handleKeyDown = (event: globalThis.KeyboardEvent) => {
      if (event.key === 'Escape') setSelectedImage(null);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [selectedImage]);

  return (
    <section ref={sectionRef} className={styles.stack} aria-label="AI-assisted project studies">
      {artworks.map((artwork, index) => (
        <StackedArtworkCard
          artwork={artwork}
          index={index}
          key={`${artwork.label}-${index}`}
          progress={scrollYProgress}
          totalCards={artworks.length}
          onSelectImage={setSelectedImage}
        />
      ))}
      {selectedImage ? createPortal(
        <dialog
          className={styles.lightbox}
          aria-label="Full image preview"
          open
        >
          <button className={styles.backdrop} type="button" aria-label="Close full image preview" onClick={() => setSelectedImage(null)} />
          <button className={styles.close} type="button" aria-label="Close full image preview" onClick={() => setSelectedImage(null)}>×</button>
          <Image
            className={styles.lightboxImage}
            src={selectedImage.image}
            alt={selectedImage.alt || selectedImage.label || 'AI work image'}
            width={selectedImage.width}
            height={selectedImage.height}
            priority
          />
        </dialog>,
        document.body,
      ) : null}
    </section>
  );
}

function StackedArtworkCard({
  artwork,
  index,
  progress,
  totalCards,
  onSelectImage,
}: {
  artwork: AiWorkArtwork;
  index: number;
  progress: MotionValue<number>;
  totalCards: number;
  onSelectImage: (item: AccordionGalleryItem) => void;
}) {
  const reduceMotion = useReducedMotion();
  const rangeStart = index / totalCards;
  const targetScale = 1 - (totalCards - 1 - index) * .03;
  const scale = useTransform(progress, [rangeStart, 1], [1, targetScale]);
  const cardIndex = { '--card-index': index } as CSSProperties;

  return (
    <div className={styles.slot} style={cardIndex}>
      <motion.figure
        className={styles.card}
        style={{ ...cardIndex, scale: reduceMotion ? 1 : scale, zIndex: index + 1 }}
      >
        <figcaption className={styles.caption}>
          <span>{artwork.label}</span>
          <strong>{String(index + 1).padStart(2, '0')}</strong>
        </figcaption>
        <div className={styles.imageWrap}>
          <AccordionGallery
            items={artwork.images}
            defaultIndex={artwork.images.length > 2 ? 1 : 0}
            expandRatio={artwork.images.length === 2 ? .64 : .52}
            gap={artwork.images.length === 1 ? 0 : 10}
            radius={0}
            height={460}
            tilt={artwork.images.length > 2 ? 6 : 4}
            trigger="hover"
            grayscale
            className={styles.gallery}
            onItemClick={onSelectImage}
          />
        </div>
      </motion.figure>
    </div>
  );
}
