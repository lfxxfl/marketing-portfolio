'use client';

import { useEffect, useRef, useState, type CSSProperties } from 'react';
import Image from 'next/image';
import styles from './wonder-parallax-module.module.css';
import { assetPath } from '../../lib/site-path';
import { SectionGlowCursor } from './section-glow-cursor';

const PORTAL_BG = assetPath('/assets/wonder/portal-frame.png');
const CURTAIN_LEFT = assetPath('/assets/wonder/curtain-left.png');
const CURTAIN_RIGHT = assetPath('/assets/wonder/curtain-right.png');
const WORLD_BG = assetPath('/assets/wonder/world-background.png');
const BOTTOM_CLOUDS = assetPath('/assets/wonder/bottom-diamonds.png');
const PORTAL_WIDTH = 1920;
const PORTAL_HEIGHT = 1080;
const CURTAIN_WIDTH = 850;
const WINDOW_LEFT = .375;
const WINDOW_RIGHT = .63;

const arcCards = [
  { title: 'Audience first', desc: 'Start with user intent, behavior, friction and cultural context.', image: assetPath('/assets/wonder/lens-cards/audience-first.avif') },
  { title: 'Value made visible', desc: 'Turn product features into concise benefits and memorable visual stories.', image: assetPath('/assets/wonder/lens-cards/value-made-visible.png') },
  { title: 'Experiment to learn', desc: 'Use keyword data, creative testing, results and feedback to improve the next move.', image: assetPath('/assets/wonder/lens-cards/experiment-to-learn.png') },
  { title: 'Execute end to end', desc: 'Move from brief and alignment through production, launch, monitoring and iteration.', image: assetPath('/assets/wonder/lens-cards/execute-end-to-end.png') },
];

const clamp = (value: number, min = 0, max = 1) => Math.min(max, Math.max(min, value));
const lerp = (start: number, end: number, amount: number) => start + (end - start) * amount;
const easeInOut = (value: number) => value < 0.5 ? 2 * value * value : -1 + (4 - 2 * value) * value;

export function WonderParallaxModule() {
  const sectionRef = useRef<HTMLElement>(null);
  const worldRef = useRef<HTMLDivElement>(null);
  const cloudsRef = useRef<HTMLDivElement>(null);
  const portalRef = useRef<HTMLDivElement>(null);
  const starfieldRef = useRef<HTMLDivElement>(null);
  const curtainLRef = useRef<HTMLDivElement>(null);
  const curtainRRef = useRef<HTMLDivElement>(null);
  const sceneOneRef = useRef<HTMLDivElement>(null);
  const sliderRef = useRef<HTMLDivElement>(null);
  const transitionFadeRef = useRef<HTMLDivElement>(null);
  const [uiVisible, setUiVisible] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;
    const world = worldRef.current;
    const clouds = cloudsRef.current;
    const portal = portalRef.current;
    const starfield = starfieldRef.current;
    const curtainLeft = curtainLRef.current;
    const curtainRight = curtainRRef.current;
    const sceneOne = sceneOneRef.current;
    const slider = sliderRef.current;
    const transitionFade = transitionFadeRef.current;
    if (!section || !world || !clouds || !portal || !starfield || !curtainLeft || !curtainRight || !sceneOne || !slider || !transitionFade) return;

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const rawMouse = { x: 0, y: 0 };
    const smoothMouse = { x: 0, y: 0 };
    let frame = 0;
    let entered = false;
    let uiTimer = 0;
    let dragPointerId: number | null = null;
    let dragStartX = 0;
    let dragStartOffset = 0;
    let dragOffset = 0;
    let scrollRotationOffset = 0;

    const update = () => {
      frame = 0;
      const viewportHeight = Math.max(1, window.innerHeight);
      const total = Math.max(1, section.offsetHeight - viewportHeight);
      const sectionTop = section.getBoundingClientRect().top;
      const progress = clamp(-sectionTop / total);
      const approachProgress = clamp(1 - Math.max(0, sectionTop) / viewportHeight);
      const eased = easeInOut(progress);
      const mobile = window.innerWidth < 768;
      const mouseSpeed = reducedMotion.matches || mobile ? 1 : .07;
      smoothMouse.x = lerp(smoothMouse.x, rawMouse.x, mouseSpeed);
      smoothMouse.y = lerp(smoothMouse.y, rawMouse.y, mouseSpeed);

      const move = (magnitude: number, yDamping = 1) => ({
        x: -smoothMouse.x * magnitude,
        y: -smoothMouse.y * magnitude * yDamping,
      });
      const worldMove = move(6);
      const cloudMove = move(9, .4);
      const portalMove = move(7);

      world.style.transform = `translate3d(${worldMove.x}px, ${worldMove.y}px, 0) scale(${lerp(1, 1.18, eased)})`;
      clouds.style.transform = `translate3d(${cloudMove.x}px, ${cloudMove.y}px, 0) scale(${lerp(1, 1.4, eased)})`;
      clouds.style.opacity = `${lerp(.7, 1, clamp(progress / .05))}`;
      const portalScale = lerp(1, 7.5, eased);
      const portalOpacity = 1 - clamp((portalScale - 2.3) / 1.5);
      portal.style.transform = `translate3d(${portalMove.x}px, ${portalMove.y}px, 0) scale(${portalScale})`;
      portal.style.opacity = `${portalOpacity}`;
      starfield.style.transform = `translate3d(${portalMove.x}px, ${portalMove.y}px, 0) scale(${portalScale})`;
      starfield.style.opacity = `${1 - clamp((portalScale - 2.3) / 1.4)}`;

      const curtainExitProgress = easeInOut(clamp(portalScale - 1));
      const coverScale = Math.max(window.innerWidth / PORTAL_WIDTH, viewportHeight / PORTAL_HEIGHT);
      const portalWidth = PORTAL_WIDTH * coverScale;
      const portalHeight = PORTAL_HEIGHT * coverScale;
      const portalLeft = (window.innerWidth - portalWidth) / 2;
      const portalTop = (viewportHeight - portalHeight) / 2;
      const portalRight = portalLeft + portalWidth;
      const curtainWidth = CURTAIN_WIDTH * coverScale;
      const portalOriginX = window.innerWidth * .52;
      const portalOriginY = viewportHeight * .38;
      const windowLeft = portalOriginX + (portalLeft + portalWidth * WINDOW_LEFT - portalOriginX) * portalScale + portalMove.x;
      const windowRight = portalOriginX + (portalLeft + portalWidth * WINDOW_RIGHT - portalOriginX) * portalScale + portalMove.x;
      const leftClip = curtainLeft.parentElement;
      const rightClip = curtainRight.parentElement;
      const clippedWindowLeft = clamp(windowLeft, 0, window.innerWidth);
      const clippedWindowRight = clamp(windowRight, 0, window.innerWidth);
      const rightCurtainLeft = portalRight - curtainWidth;
      const curtainTravel = curtainWidth * .16 * curtainExitProgress;
      const curtainOpacity = approachProgress * (1 - clamp(portalScale - 1));
      if (leftClip && rightClip) {
        leftClip.style.left = '0px';
        leftClip.style.width = `${clippedWindowLeft}px`;
        rightClip.style.left = `${clippedWindowRight}px`;
        rightClip.style.width = `${Math.max(0, window.innerWidth - clippedWindowRight)}px`;
      }
      curtainLeft.style.top = `${portalTop}px`;
      curtainLeft.style.left = `${portalLeft}px`;
      curtainLeft.style.width = `${curtainWidth}px`;
      curtainLeft.style.height = `${portalHeight}px`;
      curtainLeft.style.transformOrigin = `${portalOriginX - portalLeft}px ${portalOriginY - portalTop}px`;
      curtainLeft.style.transform = `translate3d(${portalMove.x - curtainTravel}px, ${portalMove.y}px, 0) scale(${portalScale})`;
      curtainRight.style.top = `${portalTop}px`;
      curtainRight.style.left = `${rightCurtainLeft - clippedWindowRight}px`;
      curtainRight.style.width = `${curtainWidth}px`;
      curtainRight.style.height = `${portalHeight}px`;
      curtainRight.style.transformOrigin = `${portalOriginX - rightCurtainLeft}px ${portalOriginY - portalTop}px`;
      curtainRight.style.transform = `translate3d(${portalMove.x + curtainTravel}px, ${portalMove.y}px, 0) scale(${portalScale})`;
      curtainLeft.style.opacity = `${curtainOpacity}`;
      curtainRight.style.opacity = `${curtainOpacity}`;

      const sceneOneOpacity = clamp(1 - progress / .22);
      const sliderOpacity = clamp((portalScale - 3.8) / .9);
      sceneOne.style.opacity = `${sceneOneOpacity}`;
      sceneOne.style.pointerEvents = sceneOneOpacity > .4 ? 'auto' : 'none';
      slider.style.opacity = `${sliderOpacity}`;
      slider.style.pointerEvents = sliderOpacity > .2 ? 'auto' : 'none';
      transitionFade.style.opacity = `${easeInOut(clamp((progress - .88) / .12))}`;

      const sweep = (arcCards.length - 1) * 10;
      const spacing = mobile ? 12 : 9;
      const centeredOffset = (arcCards.length - 1) * spacing / 2;
      scrollRotationOffset = lerp(0, centeredOffset, clamp((progress - .93) / .07));
      const rotationOffset = clamp(scrollRotationOffset + dragOffset, 0, sweep);
      const radius = mobile ? 700 : 1100;
      const cardWidth = mobile ? 160 : 220;
      const baseBottom = mobile ? 140 : 200;
      const center = Math.floor(arcCards.length / 2);
      slider.querySelectorAll<HTMLElement>('[data-arc-card]').forEach((card, index) => {
        const baseDegrees = (index - center) * spacing;
        const degrees = baseDegrees - rotationOffset + center * spacing;
        const radians = degrees * Math.PI / 180;
        const x = Math.sin(radians) * radius;
        const y = radius - Math.cos(radians) * radius;
        card.style.left = `calc(50% + ${x - cardWidth / 2}px)`;
        card.style.bottom = `${-y + baseBottom}px`;
        card.style.transform = `rotate(${degrees}deg)`;
        card.style.transformOrigin = `${cardWidth / 2}px ${radius}px`;
      });

      if (!reducedMotion.matches && (Math.abs(rawMouse.x - smoothMouse.x) > .002 || Math.abs(rawMouse.y - smoothMouse.y) > .002)) {
        frame = requestAnimationFrame(update);
      }
    };

    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    const onMouseMove = (event: MouseEvent) => {
      rawMouse.x = (event.clientX / Math.max(1, window.innerWidth) - .5) * 2;
      rawMouse.y = (event.clientY / Math.max(1, window.innerHeight) - .5) * 2;
      schedule();
    };

    const onPointerDown = (event: PointerEvent) => {
      if (Number.parseFloat(slider.style.opacity || '0') <= .2) return;
      event.preventDefault();
      dragPointerId = event.pointerId;
      dragStartX = event.clientX;
      dragStartOffset = dragOffset;
      try { slider.setPointerCapture(event.pointerId); } catch { /* Synthetic pointers do not own capture. */ }
      slider.dataset.dragging = 'true';
    };

    const onPointerMove = (event: PointerEvent) => {
      if (dragPointerId !== event.pointerId) return;
      event.preventDefault();
      const sweep = (arcCards.length - 1) * 10;
      dragOffset = clamp(dragStartOffset - (event.clientX - dragStartX) * .14, -scrollRotationOffset, sweep - scrollRotationOffset);
      schedule();
    };

    const endDrag = (event: PointerEvent) => {
      if (dragPointerId !== event.pointerId) return;
      dragPointerId = null;
      slider.dataset.dragging = 'false';
      try {
        if (slider.hasPointerCapture(event.pointerId)) slider.releasePointerCapture(event.pointerId);
      } catch { /* Capture may already be released by the browser. */ }
    };

    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting || entered) return;
      entered = true;
      uiTimer = window.setTimeout(() => setUiVisible(true), 600);
    }, { rootMargin: '20% 0px', threshold: .05 });

    observer.observe(section);
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule);
    window.addEventListener('mousemove', onMouseMove, { passive: true });
    slider.addEventListener('pointerdown', onPointerDown);
    slider.addEventListener('pointermove', onPointerMove);
    slider.addEventListener('pointerup', endDrag);
    slider.addEventListener('pointercancel', endDrag);
    reducedMotion.addEventListener('change', schedule);
    update();

    return () => {
      observer.disconnect();
      if (frame) cancelAnimationFrame(frame);
      window.clearTimeout(uiTimer);
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', schedule);
      window.removeEventListener('mousemove', onMouseMove);
      slider.removeEventListener('pointerdown', onPointerDown);
      slider.removeEventListener('pointermove', onPointerMove);
      slider.removeEventListener('pointerup', endDrag);
      slider.removeEventListener('pointercancel', endDrag);
      reducedMotion.removeEventListener('change', schedule);
    };
  }, []);

  return (
    <section className={styles.sequence} ref={sectionRef} id="wonder-parallax" aria-label="Step into wonder — an immersive visual journey">
      <div className={styles.viewport}>
        <div ref={worldRef} className={styles.world} style={{ '--asset': `url(${WORLD_BG})` } as CSSProperties} aria-hidden="true" />
        <div ref={cloudsRef} className={styles.clouds} style={{ '--asset': `url(${BOTTOM_CLOUDS})` } as CSSProperties} aria-hidden="true" />

        <div className={styles.arcSlider} ref={sliderRef} aria-label="Drag to explore four marketing lens cards">
          {arcCards.map((card, index) => (
            <article className={styles.arcCard} data-arc-card key={card.title}>
              <span>{String(index + 1).padStart(2, '0')}</span>
              <Image className={styles.arcCardImage} src={card.image} alt="" width={1024} height={1024} unoptimized />
              <div><h3>{card.title}</h3><p>{card.desc}</p></div>
            </article>
          ))}
        </div>

        <div ref={starfieldRef} className={styles.windowStarfield} aria-hidden="true" />
        <div ref={portalRef} className={styles.portal} style={{ '--asset': `url(${PORTAL_BG})` } as CSSProperties} aria-hidden="true" />
        <div className={styles.bottomFade} aria-hidden="true" />
        <div className={`${styles.curtainClip} ${styles.curtainClipLeft}`} aria-hidden="true">
          <div ref={curtainLRef} className={`${styles.curtain} ${styles.curtainLeft}`} style={{ '--asset': `url(${CURTAIN_LEFT})` } as CSSProperties} />
        </div>
        <div className={`${styles.curtainClip} ${styles.curtainClipRight}`} aria-hidden="true">
          <div ref={curtainRRef} className={`${styles.curtain} ${styles.curtainRight}`} style={{ '--asset': `url(${CURTAIN_RIGHT})` } as CSSProperties} />
        </div>
        <div className={styles.topFade} aria-hidden="true" />
        <SectionGlowCursor className={styles.glowCursor} />
        <div ref={transitionFadeRef} className={styles.transitionFade} aria-hidden="true" />

        <div ref={sceneOneRef} className={`${styles.sceneOne} ${uiVisible ? styles.visible : ''}`}>
          <div className={styles.mobileSceneOne}>
            <SceneHeading />
          </div>

          <div className={styles.tabletSceneOne}>
            <SceneHeading />
          </div>

          <div className={styles.desktopHeading}><SceneHeading /></div>

          <div className={styles.scrollCue} aria-hidden="true"><span>Descend</span><i><b /></i></div>
        </div>
      </div>
    </section>
  );
}

function SceneHeading() {
  return (
    <div className={styles.sceneHeading}>
      <h2>My Marketing Lens</h2>
      <p>Four principles that keep the work clear.</p>
    </div>
  );
}
