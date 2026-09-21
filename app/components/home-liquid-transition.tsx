'use client';

import { useEffect, useRef, type PointerEvent as ReactPointerEvent, type RefObject } from 'react';
import styles from './home-liquid-transition.module.css';
import { SectionGlowCursor } from './section-glow-cursor';

type Ripple = { x: number; y: number; radius: number; alpha: number };

export function HomeLiquidTransition() {
  const sectionRef = useRef<HTMLElement>(null);
  const waterRef = useRef<HTMLCanvasElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const copyRef = useRef<HTMLParagraphElement>(null);
  const rippleQueueRef = useRef<Ripple[]>([]);
  const pointerRef = useRef({ x: 0, y: 0, time: 0 });

  useEffect(() => {
    const section = sectionRef.current;
    const canvas = waterRef.current;
    if (!section || !canvas) return;

    const context = canvas.getContext('2d');
    if (!context) return;

    let width = 0;
    let height = 0;
    let dpr = 1;
    let frame = 0;
    let ripples: Ripple[] = [];
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const resize = () => {
      const bounds = section.getBoundingClientRect();
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
    observer.observe(section);
    resize();

    const draw = (time: number) => {
      const bridgeHeight = height * 0.48;
      const phase = reducedMotion ? 0 : time * 0.00016;
      context.clearRect(0, 0, width, height);

      context.save();
      context.beginPath();
      context.rect(0, 0, width, bridgeHeight);
      context.clip();

      const wash = context.createLinearGradient(0, 0, 0, bridgeHeight);
      wash.addColorStop(0, 'rgba(65, 71, 70, .18)');
      wash.addColorStop(0.28, 'rgba(63, 69, 68, .14)');
      wash.addColorStop(0.66, 'rgba(54, 59, 58, .08)');
      wash.addColorStop(1, 'rgba(32, 35, 34, 0)');
      context.fillStyle = wash;
      context.fillRect(0, 0, width, bridgeHeight);

      context.globalCompositeOperation = 'screen';
      context.lineCap = 'round';
      context.lineJoin = 'round';

      const horizontalCount = Math.max(10, Math.round(width / 108));
      for (let row = 1; row <= horizontalCount; row += 1) {
        const depth = row / horizontalCount;
        const baseY = depth * bridgeHeight;
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
        for (let y = -12; y <= bridgeHeight + 16; y += 14) {
          const depth = y / Math.max(1, bridgeHeight);
          const x = baseX
            + Math.sin(y * 0.014 + column * 1.11 - phase * 8) * (3.4 + depth * 8)
            + Math.sin(y * 0.031 - column * 0.62 + phase * 5) * (1.2 + depth * 3.8);
          if (y === -12) context.moveTo(x, y);
          else context.lineTo(x, y);
        }
        context.strokeStyle = 'rgba(247, 248, 239, .02)';
        context.lineWidth = 0.8;
        context.stroke();
      }

      const cellWidth = Math.max(92, width / Math.ceil(width / 112));
      const cellHeight = Math.max(52, bridgeHeight / 6.5);
      const columns = Math.ceil(width / cellWidth) + 1;
      const rows = Math.ceil(bridgeHeight / cellHeight) + 1;
      context.shadowColor = 'rgba(250, 250, 242, .12)';
      context.shadowBlur = 4.5;
      for (let row = -1; row < rows; row += 1) {
        for (let column = -1; column < columns; column += 1) {
          const stagger = row % 2 === 0 ? 0 : cellWidth * 0.48;
          const centerX = column * cellWidth + stagger
            + Math.sin(row * 1.6 + column * 0.7 + phase * 7) * cellWidth * 0.12;
          const centerY = row * cellHeight
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

      if (rippleQueueRef.current.length) ripples.push(...rippleQueueRef.current.splice(0));
      ripples = ripples.filter((ripple) => ripple.alpha > 0.008 && ripple.radius < width * 0.18).slice(-24);
      for (const ripple of ripples) {
        ripple.radius += 1.1;
        ripple.alpha *= 0.981;
        for (let ring = 0; ring < 3; ring += 1) {
          const radius = Math.max(1, ripple.radius - ring * 10);
          context.beginPath();
          context.ellipse(ripple.x, ripple.y, radius, radius * 0.26, 0, 0, Math.PI * 2);
          context.strokeStyle = `rgba(250, 250, 241, ${ripple.alpha * (1 - ring * 0.22)})`;
          context.lineWidth = 0.9;
          context.stroke();
        }
      }

      context.restore();
      frame = requestAnimationFrame(draw);
    };

    frame = requestAnimationFrame(draw);
    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    const section = sectionRef.current;
    const heading = headingRef.current;
    const copy = copyRef.current;
    if (!section || !heading || !copy) return;

    const headingLines = Array.from(heading.querySelectorAll<HTMLElement>('[data-scroll-line]'));
    const copyCharacters = Array.from(copy.querySelectorAll<HTMLElement>('[data-copy-char]'));
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    let frame = 0;

    const clamp = (value: number) => Math.min(1, Math.max(0, value));
    const ease = (value: number) => value * value * (3 - 2 * value);

    const update = () => {
      frame = 0;
      const viewportHeight = Math.max(1, window.innerHeight);
      const sectionTop = section.getBoundingClientRect().top;
      const copyProgress = reducedMotion.matches ? 1 : ease(clamp((viewportHeight * .38 - sectionTop) / (viewportHeight * .56)));
      const exitProgress = reducedMotion.matches ? 0 : ease(clamp((-sectionTop / viewportHeight - .12) / .38));
      const exitOpacity = 1 - exitProgress;

      headingLines.forEach((line, lineIndex) => {
        const lineStart = .68 - lineIndex * .18;
        const lineEnd = -.08 - lineIndex * .04;
        const lineProgress = reducedMotion.matches
          ? 1
          : ease(clamp((viewportHeight * lineStart - sectionTop) / (viewportHeight * (lineStart - lineEnd))));
        const characters = Array.from(line.querySelectorAll<HTMLElement>('[data-heading-char]'));
        const center = (characters.length - 1) / 2;
        characters.forEach((character, index) => {
          const distance = index - center;
          const remaining = 1 - lineProgress;
          const x = distance * 31 * remaining;
          const y = Math.abs(distance) * 1.6 * remaining;
          const rotateX = Math.max(-76, Math.min(76, distance * 7.5)) * remaining;
          character.style.opacity = `${(.08 + lineProgress * .92) * exitOpacity}`;
          character.style.filter = `blur(${remaining * 3.6}px)`;
          character.style.transform = `translate3d(${x}px, ${y}px, 0) rotateX(${rotateX}deg)`;
        });
      });

      const copyCenter = (copyCharacters.length - 1) / 2;
      copyCharacters.forEach((character, index) => {
        const distance = index - copyCenter;
        const remaining = 1 - copyProgress;
        const x = distance * 8 * remaining;
        const y = Math.abs(distance) * 1.05 * remaining;
        const scale = .72 + copyProgress * .28;
        character.style.opacity = `${(.04 + copyProgress * .96) * exitOpacity}`;
        character.style.filter = `blur(${remaining * 4.2}px)`;
        character.style.transform = `translate3d(${x}px, ${y}px, 0) scale(${scale})`;
      });
    };

    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule);
    reducedMotion.addEventListener('change', schedule);

    return () => {
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', schedule);
      reducedMotion.removeEventListener('change', schedule);
    };
  }, []);

  const handlePointerMove = (event: ReactPointerEvent<HTMLElement>) => {
    const bounds = event.currentTarget.getBoundingClientRect();
    const x = event.clientX - bounds.left;
    const y = event.clientY - bounds.top;
    if (y > bounds.height * 0.48) return;

    const now = performance.now();
    const pointer = pointerRef.current;
    const distance = Math.hypot(x - pointer.x, y - pointer.y);
    if (distance > 8 || now - pointer.time > 90) {
      rippleQueueRef.current.push({ x, y, radius: 3, alpha: Math.min(.32, .14 + distance / 220) });
    }
    pointerRef.current = { x, y, time: now };
  };

  return (
    <section
      className={`home-liquid-transition home-cinematic-cta ${styles.stage}`}
      ref={sectionRef}
      aria-labelledby="home-transition-title"
      onPointerMove={handlePointerMove}
    >
      <div
        className="home-liquid-top-fade"
        aria-hidden="true"
        style={{
          background:
            'linear-gradient(to bottom, rgb(105, 111, 109) 0%, rgba(101, 107, 105, .98) 8%, rgba(91, 97, 95, .88) 18%, rgba(70, 75, 74, .58) 31%, rgba(31, 34, 33, .24) 47%, transparent 76%)',
        }}
      />
      <div className="home-liquid-bottom-fade" aria-hidden="true" />
      <canvas className="home-liquid-bridge-canvas" ref={waterRef} aria-hidden="true" />
      <SectionGlowCursor className={styles.glowCursor} />

      <div className="home-liquid-content">
        <h2
          className={styles.heading}
          id="home-transition-title"
          ref={headingRef}
          aria-label="Strategy with momentum. Creative with a reason."
          style={{ width: 'min(100%, 64rem)', maxWidth: '64rem' }}
        >
          <AnimatedLine text="Strategy with momentum." />
          <AnimatedLine text="Creative with a reason." />
        </h2>
        <AnimatedCopy
          text="A growth-minded marketing practice at the intersection of audience insight, creative direction and execution."
          copyRef={copyRef}
        />
      </div>
    </section>
  );
}

function AnimatedLine({ text }: { text: string }) {
  return (
    <span className={styles.line} data-scroll-line aria-hidden="true">
      {Array.from(text).map((character, index) => (
        <span
          className={`${styles.headingCharacter} ${character === ' ' ? styles.space : ''}`}
          data-heading-char
          key={`${character}-${index}`}
        >
          {character === ' ' ? '\u00A0' : character}
        </span>
      ))}
    </span>
  );
}

function AnimatedCopy({ text, copyRef }: { text: string; copyRef: RefObject<HTMLParagraphElement | null> }) {
  let characterIndex = 0;

  return (
    <p className={styles.copy} ref={copyRef} aria-label={text}>
      {text.split(' ').map((word, wordIndex) => (
        <span className={styles.word} key={`${word}-${wordIndex}`} aria-hidden="true">
          {Array.from(word).map((character) => {
            const index = characterIndex;
            characterIndex += 1;
            return <span className={styles.copyCharacter} data-copy-char key={`${character}-${index}`}>{character}</span>;
          })}
        </span>
      ))}
    </p>
  );
}
