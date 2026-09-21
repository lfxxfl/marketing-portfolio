'use client';

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';

type FlowCafePhoto = {
  src: string;
  alt: string;
};

type FlowCafeCarouselProps = {
  edition: string;
  photos: FlowCafePhoto[];
};

export function FlowCafeCarousel({ edition, photos }: FlowCafeCarouselProps) {
  return (
    <article className="flow-cafe-gallery-card">
      <header className="flow-cafe-gallery-heading">
        <div>
          <span>Brand activation</span>
          <h4>{edition}</h4>
        </div>
        <p>{String(photos.length).padStart(2, '0')} photographs · Drag to explore</p>
      </header>
      <Carousel className="flow-cafe-carousel" opts={{ align: 'start', loop: true }} aria-label={`${edition} photo gallery`}>
        <CarouselContent>
          {photos.map((photo, index) => (
            <CarouselItem key={photo.src} className="flow-cafe-slide">
              <figure>
                <img src={photo.src} alt={photo.alt} loading={index === 0 ? 'eager' : 'lazy'} decoding="async" />
                <figcaption>{String(index + 1).padStart(2, '0')} / {String(photos.length).padStart(2, '0')}</figcaption>
              </figure>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="flow-cafe-carousel-button flow-cafe-carousel-prev" />
        <CarouselNext className="flow-cafe-carousel-button flow-cafe-carousel-next" />
      </Carousel>
    </article>
  );
}
