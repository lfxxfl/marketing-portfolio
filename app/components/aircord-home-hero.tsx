'use client';

import Image from 'next/image';
import {
  useEffect,
  useRef,
  type CSSProperties,
  type MouseEvent as ReactMouseEvent,
  type PointerEvent as ReactPointerEvent,
} from 'react';
import styles from './aircord-home-hero.module.css';
import { assetPath, routePath } from '../../lib/site-path';

const reelFrames = [
  { src: assetPath('/assets/projects-reel/mist-cycle/morning.webp'), alt: 'Mist-covered field in soft morning light' },
  { src: assetPath('/assets/projects-reel/mist-cycle/night.webp'), alt: 'Mist-covered field at night' },
  { src: assetPath('/assets/projects-reel/mist-cycle/sunset.webp'), alt: 'Mist-covered field at sunset' },
  { src: assetPath('/assets/projects-reel/mist-cycle/dawn.webp'), alt: 'Mist-covered field at dawn' },
];

type WaterRipple = {
  x: number;
  y: number;
  radius: number;
  alpha: number;
  strength: number;
};

export function AircordHomeHero() {
  const heroRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const projectWindowRef = useRef<HTMLAnchorElement>(null);
  const navigationStartedRef = useRef(false);
  const targetRef = useRef({ x: 0, y: 0 });
  const currentRef = useRef({ x: 0, y: 0 });
  const pointerRef = useRef({ x: 0, y: 0, clientX: 0, clientY: 0, time: 0, waterActive: false });
  const rippleQueueRef = useRef<WaterRipple[]>([]);

  useEffect(() => {
    const hero = heroRef.current;
    if (!hero || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    let frame = 0;
    const tick = () => {
      const current = currentRef.current;
      const target = targetRef.current;
      current.x += (target.x - current.x) * 0.055;
      current.y += (target.y - current.y) * 0.055;

      // Keep horizontal movement unified while allowing the project window a deeper tilt.
      hero.style.setProperty('--hero-text-shift-x', `${(current.x * 10).toFixed(3)}px`);
      hero.style.setProperty('--hero-window-shift-x', `${(current.x * 14).toFixed(3)}px`);
      hero.style.setProperty('--hero-text-rotate-y', `${(current.x * 8).toFixed(3)}deg`);
      hero.style.setProperty('--hero-window-rotate-y', `${(current.x * 30).toFixed(3)}deg`);
      frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    const hero = heroRef.current;
    if (!canvas || !hero) return;

    const context = canvas.getContext('2d');
    if (!context) return;

    let width = 0;
    let height = 0;
    let dpr = 1;
    let animationFrame = 0;
    let ripples: WaterRipple[] = [];
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const resize = () => {
      const bounds = hero.getBoundingClientRect();
      width = Math.max(1, bounds.width);
      height = Math.max(1, bounds.height);
      dpr = Math.min(window.devicePixelRatio || 1, 1.25);
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      context.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const observer = new ResizeObserver(resize);
    observer.observe(hero);
    resize();

    const draw = (time: number) => {
      const waterY = height * 0.62;
      const phase = reducedMotion ? 0 : time * 0.00016;

      context.clearRect(0, 0, width, height);
      const waterGradient = context.createLinearGradient(0, waterY, 0, height);
      waterGradient.addColorStop(0, 'rgba(86, 91, 90, 0)');
      waterGradient.addColorStop(0.14, 'rgba(81, 86, 85, .13)');
      waterGradient.addColorStop(0.58, 'rgba(72, 78, 77, .2)');
      waterGradient.addColorStop(1, 'rgba(65, 71, 70, .28)');
      context.fillStyle = waterGradient;
      context.fillRect(0, waterY, width, height - waterY);

      context.save();
      context.beginPath();
      context.rect(0, waterY, width, height - waterY);
      context.clip();
      context.globalCompositeOperation = 'screen';
      context.lineCap = 'round';
      context.lineJoin = 'round';

      // Two slow sine fields cross to form soft, constantly changing water caustics.
      const horizontalCount = Math.max(11, Math.round(width / 105));
      for (let row = 0; row <= horizontalCount; row += 1) {
        const depth = row / horizontalCount;
        const baseY = waterY + depth * (height - waterY);
        context.beginPath();
        for (let x = -30; x <= width + 30; x += 18) {
          const y = baseY
            + Math.sin(x * 0.011 + row * 1.37 + phase * 10) * (3.2 + depth * 5.8)
            + Math.sin(x * 0.023 - row * 0.81 - phase * 6) * (1.4 + depth * 3.1);
          if (x === -30) context.moveTo(x, y);
          else context.lineTo(x, y);
        }
        context.strokeStyle = `rgba(246, 247, 236, ${0.018 + depth * 0.032})`;
        context.lineWidth = 0.65 + depth * 0.8;
        context.stroke();
      }

      const verticalCount = Math.max(15, Math.round(width / 72));
      for (let column = 0; column <= verticalCount; column += 1) {
        const baseX = (column / verticalCount) * width;
        context.beginPath();
        for (let y = waterY - 12; y <= height + 16; y += 14) {
          const depth = (y - waterY) / Math.max(1, height - waterY);
          const x = baseX
            + Math.sin(y * 0.014 + column * 1.11 - phase * 8) * (3.4 + depth * 8)
            + Math.sin(y * 0.031 - column * 0.62 + phase * 5) * (1.2 + depth * 3.8);
          if (y === waterY - 12) context.moveTo(x, y);
          else context.lineTo(x, y);
        }
        context.strokeStyle = 'rgba(247, 248, 239, .02)';
        context.lineWidth = 0.8;
        context.stroke();
      }

      const cellWidth = Math.max(92, width / Math.ceil(width / 112));
      const cellHeight = Math.max(52, (height - waterY) / 6.5);
      const cellColumns = Math.ceil(width / cellWidth) + 1;
      const cellRows = Math.ceil((height - waterY) / cellHeight) + 1;
      context.shadowColor = 'rgba(250, 250, 242, .12)';
      context.shadowBlur = 4.5;
      for (let row = -1; row < cellRows; row += 1) {
        for (let column = -1; column < cellColumns; column += 1) {
          const stagger = row % 2 === 0 ? 0 : cellWidth * 0.48;
          const centerX = column * cellWidth + stagger
            + Math.sin(row * 1.6 + column * 0.7 + phase * 7) * cellWidth * 0.12;
          const centerY = waterY + row * cellHeight
            + Math.sin(column * 1.2 - row * 0.5 - phase * 5) * cellHeight * 0.16;
          const radiusX = cellWidth * (0.48 + Math.sin(column * 1.8 + phase * 4) * 0.08);
          const radiusY = cellHeight * (0.48 + Math.cos(row * 1.4 - phase * 3) * 0.1);
          context.beginPath();
          for (let point = 0; point <= 18; point += 1) {
            const angle = (point / 18) * Math.PI * 2;
            const warp = 1
              + Math.sin(angle * 3 + row * 0.9 + phase * 6) * 0.13
              + Math.cos(angle * 5 - column * 0.6 - phase * 4) * 0.06;
            const x = centerX + Math.cos(angle) * radiusX * warp;
            const y = centerY + Math.sin(angle) * radiusY * warp;
            if (point === 0) context.moveTo(x, y);
            else context.lineTo(x, y);
          }
          context.strokeStyle = 'rgba(250, 250, 241, .052)';
          context.lineWidth = 0.9;
          context.stroke();
        }
      }
      context.shadowBlur = 0;

      if (rippleQueueRef.current.length) {
        ripples.push(...rippleQueueRef.current.splice(0));
        if (ripples.length > 28) ripples = ripples.slice(-28);
      }
      ripples = ripples.filter((ripple) => ripple.alpha > 0.008 && ripple.radius < width * 0.2);
      for (const ripple of ripples) {
        ripple.radius += 0.62 + ripple.strength * 0.9;
        ripple.alpha *= 0.982;
        for (let ring = 0; ring < 3; ring += 1) {
          const ringRadius = Math.max(1, ripple.radius - ring * 10);
          context.beginPath();
          context.ellipse(ripple.x, ripple.y, ringRadius, ringRadius * 0.26, 0, 0, Math.PI * 2);
          context.strokeStyle = `rgba(250, 250, 241, ${ripple.alpha * (1 - ring * 0.22)})`;
          context.lineWidth = 0.8 + ripple.strength * 0.45;
          context.stroke();
        }
      }
      context.restore();

      animationFrame = requestAnimationFrame(draw);
    };

    animationFrame = requestAnimationFrame(draw);
    return () => {
      cancelAnimationFrame(animationFrame);
      observer.disconnect();
    };
  }, []);

  const handlePointerMove = (event: ReactPointerEvent<HTMLElement>) => {
    const bounds = event.currentTarget.getBoundingClientRect();
    const pointer = pointerRef.current;
    const now = performance.now();
    const elapsed = Math.max(12, now - pointer.time);
    const localX = event.clientX - bounds.left;
    const localY = event.clientY - bounds.top;
    const distance = Math.hypot(localX - pointer.clientX, localY - pointer.clientY);
    const nextX = ((event.clientX - bounds.left) / bounds.width - 0.5) * 2;
    const nextY = ((event.clientY - bounds.top) / bounds.height - 0.5) * 2;

    pointer.x = nextX;
    pointer.y = nextY;
    pointer.waterActive = nextY > 0.2;
    if (pointer.waterActive && (distance > 8 || elapsed > 80)) {
      rippleQueueRef.current.push({
        x: localX,
        y: localY,
        radius: 3,
        alpha: Math.min(0.36, 0.14 + distance / 180),
        strength: Math.min(1.5, 0.55 + distance / Math.max(50, elapsed * 1.4)),
      });
    }
    pointer.clientX = localX;
    pointer.clientY = localY;
    pointer.time = now;
    targetRef.current = { x: nextX, y: nextY };
  };

  const resetPointer = () => {
    targetRef.current = { x: 0, y: 0 };
    pointerRef.current.x = 0;
    pointerRef.current.y = 0;
    pointerRef.current.waterActive = false;
  };

  const handleProjectsClick = (event: ReactMouseEvent<HTMLAnchorElement>) => {
    if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;

    window.sessionStorage.setItem('projects-reel-entry', 'hero-window');
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    event.preventDefault();
    if (navigationStartedRef.current) return;
    navigationStartedRef.current = true;

    const source = projectWindowRef.current;
    const hero = heroRef.current;
    if (!source || !hero) {
      window.location.assign(routePath('/projects'));
      return;
    }

    const bounds = source.getBoundingClientRect();
    const clone = source.cloneNode(true) as HTMLAnchorElement;
    clone.removeAttribute('href');
    clone.setAttribute('aria-hidden', 'true');
    clone.classList.add(styles.transitionClone);
    Object.assign(clone.style, {
      top: `${bounds.top}px`,
      left: `${bounds.left}px`,
      width: `${bounds.width}px`,
      height: `${bounds.height}px`,
    });

    document.body.appendChild(clone);
    document.body.classList.add(styles.transitionLock);
    hero.classList.add(styles.leaving);

    const animation = clone.animate(
      [
        {
          top: `${bounds.top}px`,
          left: `${bounds.left}px`,
          width: `${bounds.width}px`,
          height: `${bounds.height}px`,
          borderRadius: '.28rem',
          filter: 'brightness(1)',
        },
        {
          top: '0px',
          left: '0px',
          width: '100vw',
          height: '100vh',
          borderRadius: '0rem',
          filter: 'brightness(.82)',
        },
      ],
      {
        duration: 1180,
        easing: 'cubic-bezier(.76, 0, .24, 1)',
        fill: 'forwards',
      },
    );

    let navigated = false;
    const navigate = () => {
      if (navigated) return;
      navigated = true;
      window.location.assign(routePath('/projects'));
    };
    void animation.finished.then(navigate).catch(navigate);
    window.setTimeout(navigate, 1350);
  };

  return (
    <section
      className={`aircord-home-hero ${styles.heroRoot}`}
      aria-labelledby="home-title"
      ref={heroRef}
      onPointerMove={handlePointerMove}
      onPointerLeave={resetPointer}
    >
      <canvas className="aircord-water-canvas" ref={canvasRef} aria-hidden="true" />
      <div className="aircord-hero-grain" aria-hidden="true" />
      <div className="aircord-hero-horizon" aria-hidden="true" />

      <div className="aircord-hero-stage">
        <h1 id="home-title" className="aircord-hero-title">
          <span className="aircord-title-line-primary">Marketing</span>
          <span className="aircord-title-line-secondary">Made visible</span>
        </h1>

        <div className="aircord-hero-identity">
          <strong>LAUREN LUO</strong>
          <p>
            I turn market signals into clear propositions, testable creative and measurable growth across digital products,
            e-commerce, social media, websites and live experiences.
          </p>
        </div>

        <a
          className="aircord-project-window"
          href={routePath('/projects')}
          aria-label="View the Projects Reel"
          ref={projectWindowRef}
          onClick={handleProjectsClick}
        >
          <span className="aircord-project-cube">
            <span className="aircord-project-cube-depth" aria-hidden="true">
              <span className="aircord-project-cube-face aircord-project-cube-back" />
              <span className="aircord-project-cube-face aircord-project-cube-top" />
              <span className="aircord-project-cube-face aircord-project-cube-right" />
              <span className="aircord-project-cube-face aircord-project-cube-bottom" />
              <span className="aircord-project-cube-face aircord-project-cube-left" />
            </span>
            <span className="aircord-project-scene">
              <span className="aircord-project-media" aria-hidden="true">
                <span className="aircord-project-ring">
                  {[...reelFrames, ...reelFrames].map((frame, index) => (
                    <span
                      className="aircord-project-card"
                      style={{ '--ring-index': index } as CSSProperties}
                      key={`${frame.src}-${index}`}
                    >
                      <Image src={frame.src} alt="" fill sizes="(max-width: 700px) 24vw, 11vw" />
                    </span>
                  ))}
                </span>
                <span className="aircord-project-reflection" />
              </span>
            </span>
          </span>
          <span className="aircord-project-button"><span>View projects</span></span>
        </a>

        <div className="aircord-hero-meta" aria-hidden="true">
          <span>© LAUREN LUO</span>
          <span>PORTFOLIO · HONG KONG</span>
        </div>
      </div>
    </section>
  );
}
