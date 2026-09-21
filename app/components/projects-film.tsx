'use client';

import Image from 'next/image';
import {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type PointerEvent as ReactPointerEvent,
  type WheelEvent as ReactWheelEvent,
} from 'react';
import styles from './projects-film.module.css';
import { RippleDistortion } from './ripple-distortion';
import { assetPath, routePath } from '../../lib/site-path';

const films = [
  { number: '01', title: 'Growth & Commerce', href: '/growth-commerce', image: assetPath('/assets/projects-reel/mist-cycle/morning.webp') },
  { number: '02', title: 'Social & Brand', href: '/social-brand', image: assetPath('/assets/projects-reel/mist-cycle/night.webp') },
  { number: '03', title: 'Digital & Campaign Marketing', href: '/digital-campaign', image: assetPath('/assets/projects-reel/mist-cycle/sunset.webp') },
  { number: '04', title: 'My Work', href: '/my-work', image: assetPath('/assets/projects-reel/mist-cycle/dawn.webp') },
];

const reelFilms = films.map((film, index) => ({
  ...film,
  filmIndex: index,
  instance: index,
}));

const wrap = (value: number, span: number) =>
  ((value + span / 2) % span + span) % span - span / 2;

export function ProjectsFilm() {
  const stageRef = useRef<HTMLElement>(null);
  const cardRefs = useRef<Array<HTMLAnchorElement | null>>([]);
  const offsetRef = useRef(0);
  const velocityRef = useRef(-24);
  const previousSpacingRef = useRef(0);
  const initializedRef = useRef(false);
  const draggingRef = useRef(false);
  const hoveredRef = useRef(false);
  const pointerRef = useRef({ x: 0, time: 0 });
  const dragDistanceRef = useRef(0);
  const draggedRef = useRef(false);
  const parallaxTargetRef = useRef({ x: 0, y: 0 });
  const parallaxCurrentRef = useRef({ x: 0, y: 0 });
  const [dragging, setDragging] = useState(false);
  const [hovered, setHovered] = useState<number | null>(null);
  const [entered, setEntered] = useState(false);

  useEffect(() => {
    const firstFrame = window.requestAnimationFrame(() => {
      window.requestAnimationFrame(() => setEntered(true));
    });
    window.sessionStorage.removeItem('projects-reel-entry');
    return () => window.cancelAnimationFrame(firstFrame);
  }, []);

  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (reducedMotion.matches) return;

    let animationFrame = 0;
    let previousTime = performance.now();

    const render = (now: number) => {
      const elapsed = Math.min((now - previousTime) / 1000, 0.05);
      previousTime = now;

      const viewportWidth = stage.clientWidth;
      const cardWidth = Math.min(viewportWidth * (viewportWidth < 700 ? 0.84 : 0.54), 896);
      const spacing = Math.min(cardWidth * 0.82, viewportWidth * 0.38);
      const span = spacing * reelFilms.length;

      if (!initializedRef.current) {
        offsetRef.current = 0;
        initializedRef.current = true;
      } else if (previousSpacingRef.current && previousSpacingRef.current !== spacing) {
        offsetRef.current *= spacing / previousSpacingRef.current;
      }
      previousSpacingRef.current = spacing;

      if (!draggingRef.current) {
        const targetVelocity = hoveredRef.current ? 0 : -16;
        const easing = 1 - Math.exp(-3.2 * elapsed);
        velocityRef.current += (targetVelocity - velocityRef.current) * easing;
        offsetRef.current += velocityRef.current * elapsed;
      }

      offsetRef.current = wrap(offsetRef.current, span);

      const parallaxEasing = 1 - Math.exp(-4.4 * elapsed);
      parallaxCurrentRef.current.x += (parallaxTargetRef.current.x - parallaxCurrentRef.current.x) * parallaxEasing;
      parallaxCurrentRef.current.y += (parallaxTargetRef.current.y - parallaxCurrentRef.current.y) * parallaxEasing;
      stage.style.setProperty('--reel-shift-x', `${parallaxCurrentRef.current.x * 13}px`);
      stage.style.setProperty('--reel-tilt-x', `${parallaxCurrentRef.current.y * -1.8}deg`);
      stage.style.setProperty('--reel-tilt-y', `${parallaxCurrentRef.current.x * 4.2}deg`);

      cardRefs.current.forEach((card, index) => {
        if (!card) return;

        const x = wrap(index * spacing + offsetRef.current, span);
        const distance = Math.abs(x) / Math.max(viewportWidth * 0.5, 1);
        const curve = Math.min(distance, 1.82);
        const proximity = 1 - curve / 1.82;
        const depth = -520 + Math.pow(proximity, 1.45) * 710;
        const y = -36 + Math.pow(proximity, 1.32) * 80;
        const rotation = Math.max(-56, Math.min(56, (-x / viewportWidth) * 84));
        const scale = 0.5 + Math.pow(proximity, 1.18) * 0.62;
        const opacity = Math.max(0, Math.min(1, 0.3 + proximity * 0.76));
        const visible = distance < 1.86;

        card.style.setProperty('--film-x', `${x}px`);
        card.style.setProperty('--film-y', `${y}px`);
        card.style.setProperty('--film-z', `${depth}px`);
        card.style.setProperty('--film-rotate', `${rotation}deg`);
        card.style.setProperty('--film-scale', `${scale}`);
        card.style.opacity = visible ? `${opacity}` : '0';
        card.style.zIndex = `${Math.max(1, 10000 - Math.round(Math.abs(x)))}`;
        card.style.visibility = visible ? 'visible' : 'hidden';
        card.style.pointerEvents = visible && opacity > 0.34 ? 'auto' : 'none';
      });

      animationFrame = requestAnimationFrame(render);
    };

    animationFrame = requestAnimationFrame(render);
    return () => cancelAnimationFrame(animationFrame);
  }, []);

  const handlePointerDown = (event: ReactPointerEvent<HTMLElement>) => {
    if (event.button !== 0) return;
    draggingRef.current = true;
    draggedRef.current = false;
    dragDistanceRef.current = 0;
    pointerRef.current = { x: event.clientX, time: performance.now() };
    setDragging(true);
  };

  const handlePointerMove = (event: ReactPointerEvent<HTMLElement>) => {
    const bounds = event.currentTarget.getBoundingClientRect();
    parallaxTargetRef.current = {
      x: Math.max(-1, Math.min(1, ((event.clientX - bounds.left) / bounds.width - 0.5) * 2)),
      y: Math.max(-1, Math.min(1, ((event.clientY - bounds.top) / bounds.height - 0.5) * 2)),
    };

    if (!draggingRef.current) return;

    const now = performance.now();
    const deltaX = event.clientX - pointerRef.current.x;
    const deltaTime = Math.max(now - pointerRef.current.time, 8);
    dragDistanceRef.current += Math.abs(deltaX);

    if (dragDistanceRef.current > 6) {
      draggedRef.current = true;
      if (!event.currentTarget.hasPointerCapture(event.pointerId)) {
        event.currentTarget.setPointerCapture(event.pointerId);
      }
    }

    offsetRef.current += deltaX;
    velocityRef.current = (deltaX / deltaTime) * 1000;
    pointerRef.current = { x: event.clientX, time: now };
  };

  const finishDrag = (event: ReactPointerEvent<HTMLElement>) => {
    draggingRef.current = false;
    setDragging(false);
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
    window.setTimeout(() => {
      draggedRef.current = false;
    }, 0);
  };

  const handleWheel = (event: ReactWheelEvent<HTMLElement>) => {
    event.preventDefault();
    const movement = Math.abs(event.deltaX) > Math.abs(event.deltaY) ? event.deltaX : event.deltaY;
    const delta = -movement * 0.72;
    offsetRef.current += delta;
    velocityRef.current = Math.max(-980, Math.min(980, delta * 18));
  };

  const updateRippleOrigin = (event: ReactPointerEvent<HTMLAnchorElement>) => {
    const bounds = event.currentTarget.getBoundingClientRect();
    const x = ((event.clientX - bounds.left) / bounds.width) * 100;
    const y = ((event.clientY - bounds.top) / bounds.height) * 100;
    event.currentTarget.style.setProperty('--pointer-x', `${x}%`);
    event.currentTarget.style.setProperty('--pointer-y', `${y}%`);
  };

  return (
    <section
      className={`projects-film-stage ${styles.stage}${dragging ? ' is-dragging' : ''}${entered ? ` ${styles.entered}` : ''}`}
      aria-labelledby="projects-reel-title"
      ref={stageRef}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={finishDrag}
      onPointerCancel={finishDrag}
      onPointerLeave={() => {
        parallaxTargetRef.current = { x: 0, y: 0 };
      }}
      onWheel={handleWheel}
      onClickCapture={(event) => {
        if (!draggedRef.current) return;
        event.preventDefault();
        event.stopPropagation();
      }}
    >
      <div className="projects-water" aria-hidden="true"><span /><span /><span /></div>

      <header className={`projects-reel-heading ${styles.heading}`}>
        <p>Selected pathways · 01—04</p>
        <h1 id="projects-reel-title">Projects</h1>
      </header>

      <div className={styles.reelEntrance}>
        <div className="projects-film-orbit">
          {reelFilms.map((film) => (
            <a
              className={`projects-film-card${hovered === film.instance ? ' is-hovered' : ''}`}
              href={routePath(film.href)}
              key={film.href}
              data-film-index={film.filmIndex}
              ref={(node) => { cardRefs.current[film.instance] = node; }}
              aria-label={`Open ${film.title}`}
              style={{ '--film-entry-delay': `${film.instance * 95}ms` } as CSSProperties}
              onPointerEnter={() => {
                hoveredRef.current = true;
                setHovered(film.instance);
              }}
              onPointerLeave={() => {
                hoveredRef.current = false;
                setHovered((current) => (current === film.instance ? null : current));
              }}
              onPointerMove={updateRippleOrigin}
              onFocus={() => {
                hoveredRef.current = true;
                setHovered(film.instance);
              }}
              onBlur={() => {
                hoveredRef.current = false;
                setHovered(null);
              }}
            >
              <span className="projects-film-surface">
                <Image src={film.image} alt="" fill sizes="(max-width: 700px) 84vw, 54vw" draggable="false" />
                {hovered === film.instance ? (
                  <RippleDistortion
                    src={film.image}
                    brushSize={132}
                    strength={0.12}
                    swirl={0.7}
                    rings={4}
                    spread={3.7}
                    fade={2.4}
                    spacing={12}
                    dispersion={0.035}
                    glint={0.16}
                    tint="#9c8cff"
                    tintAmount={0.12}
                    highlightColor="#eef1ff"
                    grayscale={false}
                    trigger="hover"
                    quality="low"
                  />
                ) : null}
                <span className="projects-film-shade" aria-hidden="true" />
                <span className="projects-film-ripple" aria-hidden="true" />
                <span className="projects-film-title">
                  <small>{film.number}</small>
                  <strong>{film.title}</strong>
                  <em>View project</em>
                </span>
              </span>
              <span className="projects-film-reflection" aria-hidden="true">
                <Image src={film.image} alt="" fill sizes="(max-width: 700px) 84vw, 54vw" draggable="false" />
                <span />
              </span>
            </a>
          ))}
        </div>
      </div>

      <div className={`projects-reel-footer ${styles.footer}`} aria-hidden="true">
        <span>Hover a frame to hold the reel</span>
        <span>Continuous project archive</span>
      </div>

      <svg className="projects-ripple-defs" aria-hidden="true" focusable="false">
        <filter id="project-card-ripple" x="-10%" y="-18%" width="120%" height="136%">
          <feTurbulence type="fractalNoise" baseFrequency="0.012 0.055" numOctaves="2" seed="7" result="noise">
            <animate attributeName="baseFrequency" dur="3.8s" values="0.012 0.055;0.018 0.038;0.012 0.055" repeatCount="indefinite" />
          </feTurbulence>
          <feDisplacementMap in="SourceGraphic" in2="noise" scale="12" xChannelSelector="R" yChannelSelector="B" />
        </filter>
        <filter id="project-reflection-ripple" x="-12%" y="-22%" width="124%" height="144%">
          <feTurbulence type="fractalNoise" baseFrequency="0.008 0.085" numOctaves="2" seed="11" result="reflectionNoise">
            <animate attributeName="baseFrequency" dur="6.8s" values="0.008 0.085;0.014 0.055;0.008 0.085" repeatCount="indefinite" />
          </feTurbulence>
          <feDisplacementMap in="SourceGraphic" in2="reflectionNoise" scale="22" xChannelSelector="R" yChannelSelector="B" />
        </filter>
      </svg>
    </section>
  );
}
