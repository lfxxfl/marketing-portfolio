'use client';

import { useEffect, useRef } from 'react';
import styles from './anchor-intelligence-module.module.css';

type Point = {
  phase: number;
  size: number;
  treeX: number;
  treeY: number;
  cubeX: number;
  cubeY: number;
  cubeZ: number;
  depth: number;
};

const orbitMetrics = [
  ['5', 'Apps supported across iOS and Android'],
  ['100+', 'A/B tests and experiments'],
  ['60%+', 'Creative optimization rate'],
  ['7', 'Keywords ranked in the Top 3'],
  ['50+', 'Integrated campaigns'],
  ['7', 'Commerce platforms managed'],
  ['80%', 'Repurchase rate'],
  ['4,000+', 'SKUs operated'],
  ['20+', 'Commerce campaigns delivered'],
  ['70%+', 'GMV increase from promotion'],
  ['10+', 'WeChat articles published'],
  ['1,500+', 'Average article reads'],
];

const capabilities = [
  ['Growth & ASO', 'Keyword strategy, store positioning, creative testing and conversion.'],
  ['Campaign & Commerce', 'Merchandising, promotion systems, channel execution and performance learning.'],
  ['Brand, Social & Content', 'Content pillars, editorial systems and consistent brand presence.'],
  ['Experience Marketing', 'Events and environments designed around a complete visitor journey.'],
  ['UX, Web & Collateral', 'Connected digital and physical touchpoints that help people decide.'],
  ['Marketing Operations', 'Clear briefs, cross-team coordination and repeatable delivery systems.'],
];

const clamp = (value: number, min = 0, max = 1) => Math.min(max, Math.max(min, value));
const mix = (start: number, end: number, amount: number) => start + (end - start) * amount;
const smoothstep = (start: number, end: number, value: number) => {
  const progress = clamp((value - start) / Math.max(.0001, end - start));
  return progress * progress * (3 - 2 * progress);
};

function seededRandom(seed: number) {
  let value = seed >>> 0;
  return () => {
    value = (value * 1664525 + 1013904223) >>> 0;
    return value / 4294967296;
  };
}

function addBranch(points: Point[], random: () => number, count: number, start: [number, number], end: [number, number], width: number) {
  for (let index = 0; index < count; index += 1) {
    const progress = random();
    const taper = mix(width, .002, progress);
    points.push({
      phase: random() * Math.PI * 2,
      size: mix(.7, 2.15, random()),
      treeX: mix(start[0], end[0], progress) + (random() - .5) * taper,
      treeY: mix(start[1], end[1], progress) + (random() - .5) * taper,
      cubeX: 0,
      cubeY: 0,
      cubeZ: 0,
      depth: random(),
    });
  }
}

function createPoints(count: number) {
  const random = seededRandom(73197);
  const points: Point[] = [];

  addBranch(points, random, Math.round(count * .18), [.5, .82], [.5, .39], .075);
  const branches: Array<[[number, number], [number, number], number]> = [
    [[.5, .53], [.29, .31], .038],
    [[.5, .51], [.72, .27], .038],
    [[.49, .43], [.38, .2], .03],
    [[.51, .42], [.62, .18], .03],
    [[.43, .43], [.2, .4], .024],
    [[.57, .4], [.81, .37], .024],
  ];
  branches.forEach(([start, end, width]) => addBranch(points, random, Math.round(count * .055), start, end, width));

  while (points.length < count) {
    const angle = random() * Math.PI * 2;
    const radius = Math.sqrt(random());
    const cluster = Math.floor(random() * 6);
    const centers = [
      [.3, .3], [.43, .22], [.57, .2], [.7, .29], [.5, .31], [.22, .4],
    ];
    const [centerX, centerY] = centers[cluster];
    points.push({
      phase: random() * Math.PI * 2,
      size: mix(.7, 2.45, random()),
      treeX: centerX + Math.cos(angle) * radius * mix(.055, .14, random()),
      treeY: centerY + Math.sin(angle) * radius * mix(.045, .105, random()),
      cubeX: 0,
      cubeY: 0,
      cubeZ: 0,
      depth: random(),
    });
  }

  points.forEach((point) => {
    const face = Math.floor(random() * 6);
    const x = random() * 2 - 1;
    const y = random() * 2 - 1;
    const z = random() * 2 - 1;
    point.cubeX = face === 0 ? -1 : face === 1 ? 1 : x;
    point.cubeY = face === 2 ? -1 : face === 3 ? 1 : y;
    point.cubeZ = face === 4 ? -1 : face === 5 ? 1 : z;
  });

  return points;
}

export function AnchorIntelligenceModule() {
  const sectionRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const systemRef = useRef<HTMLDivElement>(null);
  const orbitRef = useRef<HTMLDivElement>(null);
  const cursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const canvas = canvasRef.current;
    const hero = heroRef.current;
    const system = systemRef.current;
    const orbit = orbitRef.current;
    const cursor = cursorRef.current;
    if (!section || !canvas || !hero || !system || !orbit || !cursor) return;

    const context = canvas.getContext('2d');
    if (!context) return;

    const points = createPoints(window.innerWidth < 720 ? 1900 : 3900);
    const random = seededRandom(41832);
    const stars = Array.from({ length: window.innerWidth < 720 ? 130 : 260 }, () => ({
      phase: random() * Math.PI * 2,
      size: mix(.35, 1.35, random()),
      x: random(),
      y: random() * .86,
    }));
    const orbitItems = Array.from(orbit.querySelectorAll<HTMLElement>('[data-orbit-label]'));
    const featureCards = Array.from(system.querySelectorAll<HTMLElement>('[data-feature-card]'));
    const pointer = { x: -1000, y: -1000, active: false };
    let width = 1;
    let height = 1;
    let pixelRatio = 1;
    let progress = 0;
    let animationFrame = 0;

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      width = Math.max(1, rect.width);
      height = Math.max(1, rect.height);
      pixelRatio = Math.min(window.devicePixelRatio || 1, 1.65);
      canvas.width = Math.round(width * pixelRatio);
      canvas.height = Math.round(height * pixelRatio);
      context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
    };

    const updateProgress = () => {
      const rect = section.getBoundingClientRect();
      progress = clamp(-rect.top / Math.max(1, section.offsetHeight - window.innerHeight));
      const heroExit = smoothstep(.13, .31, progress);
      const systemEnter = smoothstep(.69, .86, progress);
      hero.style.opacity = `${1 - heroExit}`;
      hero.style.transform = `translate3d(0, ${heroExit * 24}px, 0)`;
      hero.style.pointerEvents = heroExit > .75 ? 'none' : 'auto';
      system.style.opacity = `${systemEnter}`;
      system.style.transform = `translate3d(0, ${mix(32, 0, systemEnter)}px, 0)`;
      system.style.visibility = systemEnter > .01 ? 'visible' : 'hidden';
      const rightToLeftOrder = [2, 1, 0, 5, 4, 3];
      featureCards.forEach((card, index) => {
        const sequenceIndex = rightToLeftOrder.indexOf(index);
        const cardEnter = smoothstep(.73 + sequenceIndex * .028, .84 + sequenceIndex * .018, progress);
        card.style.opacity = `${cardEnter}`;
        card.style.transform = `translate3d(${mix(180, 0, cardEnter)}px, 0, 0)`;
      });
    };

    const draw = (time: number) => {
      const seconds = time * .001;
      context.clearRect(0, 0, width, height);

      const morph = smoothstep(.42, .77, progress);
      const centerX = width * .5;
      const waterY = height * .72;
      const sceneScale = Math.min(width, height * 1.48);

      stars.forEach((star) => {
        const twinkle = .3 + (.5 + Math.sin(seconds * .42 + star.phase) * .5) * .55;
        context.beginPath();
        context.fillStyle = `rgba(152, 183, 255, ${twinkle * .48})`;
        context.arc(star.x * width, star.y * height, star.size, 0, Math.PI * 2);
        context.fill();
      });

      const halo = context.createRadialGradient(centerX, height * .37, 0, centerX, height * .37, sceneScale * .53);
      halo.addColorStop(0, `rgba(28, 110, 255, ${mix(.14, .24, morph)})`);
      halo.addColorStop(.45, `rgba(7, 38, 106, ${mix(.1, .17, morph)})`);
      halo.addColorStop(1, 'rgba(0, 0, 0, 0)');
      context.fillStyle = halo;
      context.fillRect(0, 0, width, height);

      context.save();
      context.globalCompositeOperation = 'lighter';

      for (let band = 0; band < 11; band += 1) {
        const maximum = Math.max(190, width * .72);
        const cycle = (seconds * 27 + band * maximum / 10.2) % maximum;
        const fade = 1 - cycle / maximum;
        context.beginPath();
        context.strokeStyle = `rgba(28, 116, 255, ${.3 * fade})`;
        context.lineWidth = mix(.35, 1.65, fade);
        context.shadowColor = 'rgba(24, 118, 255, .7)';
        context.shadowBlur = 8 * fade;
        context.ellipse(centerX, waterY + Math.sin(seconds * .7 + band) * 2, cycle * 1.35, cycle * .135, 0, 0, Math.PI * 2);
        context.stroke();
      }
      context.shadowBlur = 0;

      points.forEach((point) => {
        const wind = Math.sin(seconds * .78 + point.phase) * mix(.003, .0008, morph) * sceneScale;
        const rotationY = seconds * .16 + progress * 2.3;
        const rotationX = .2 + Math.sin(seconds * .22) * .045;
        const xRotated = point.cubeX * Math.cos(rotationY) + point.cubeZ * Math.sin(rotationY);
        const zRotated = -point.cubeX * Math.sin(rotationY) + point.cubeZ * Math.cos(rotationY);
        const yRotated = point.cubeY * Math.cos(rotationX) - zRotated * Math.sin(rotationX);
        const zFinal = point.cubeY * Math.sin(rotationX) + zRotated * Math.cos(rotationX);
        const cubeScale = Math.min(width, height) * .19;
        const perspective = 1 + zFinal * .085;
        const cubeScreenX = width * .55 + xRotated * cubeScale * perspective;
        const cubeScreenY = height * .39 + yRotated * cubeScale * perspective;
        let x = mix(point.treeX * width, cubeScreenX, morph) + wind;
        let y = mix(point.treeY * height, cubeScreenY, morph);
        const dx = x - pointer.x;
        const dy = y - pointer.y;
        const distance = Math.hypot(dx, dy);
        if (pointer.active && distance < 135) {
          const repel = (1 - distance / 135) ** 2 * 46;
          x += dx / Math.max(1, distance) * repel;
          y += dy / Math.max(1, distance) * repel;
        }

        const twinkle = .58 + Math.sin(seconds * 1.35 + point.phase) * .28;
        const radius = point.size * mix(.82, 1.05, morph) * mix(1.14, .72, point.depth);
        const alpha = mix(.34, .82, twinkle) * mix(1, .82, point.depth);
        context.beginPath();
        context.fillStyle = morph > .5
          ? `rgba(76, 177, 255, ${alpha})`
          : `rgba(${Math.round(mix(38, 128, twinkle))}, ${Math.round(mix(124, 225, twinkle))}, 255, ${alpha})`;
        context.arc(x, y, radius, 0, Math.PI * 2);
        context.fill();

        if (y < waterY) {
          const reflectedY = waterY + (waterY - y) * .52;
          const ripple = Math.sin((waterY - y) * .055 - seconds * 1.5 + point.phase) * 5;
          context.beginPath();
          context.fillStyle = `rgba(34, 128, 255, ${alpha * .22 * (1 - clamp((reflectedY - waterY) / (height * .34)))})`;
          context.ellipse(x + ripple, reflectedY, radius * 1.65, Math.max(.35, radius * .35), 0, 0, Math.PI * 2);
          context.fill();
        }
      });

      context.restore();

      const labelEnter = smoothstep(.17, .28, progress);
      const labelExit = smoothstep(.5, .64, progress);
      const labelOpacity = labelEnter * (1 - labelExit);
      orbitItems.forEach((item, index) => {
        const angle = seconds * .17 + progress * 4.6 + index / orbitItems.length * Math.PI * 2;
        const depth = (Math.sin(angle) + 1) / 2;
        const x = centerX + Math.cos(angle) * Math.min(width * .39, 570);
        const y = height * .52 + Math.sin(angle) * Math.min(height * .25, 190);
        const scale = mix(.72, 1.12, depth);
        item.style.opacity = `${labelOpacity * mix(.48, 1, depth)}`;
        item.style.zIndex = `${Math.round(5 + depth * 12)}`;
        item.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%) scale(${scale})`;
      });

      animationFrame = requestAnimationFrame(draw);
    };

    const onPointerMove = (event: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      pointer.x = event.clientX - rect.left;
      pointer.y = event.clientY - rect.top;
      pointer.active = true;
      cursor.style.opacity = '1';
      cursor.style.transform = `translate3d(${pointer.x}px, ${pointer.y}px, 0) translate(-50%, -50%)`;
    };
    const onPointerLeave = () => {
      pointer.active = false;
      cursor.style.opacity = '0';
    };

    resize();
    updateProgress();
    animationFrame = requestAnimationFrame(draw);
    window.addEventListener('resize', resize);
    window.addEventListener('scroll', updateProgress, { passive: true });
    canvas.addEventListener('pointermove', onPointerMove, { passive: true });
    canvas.addEventListener('pointerleave', onPointerLeave);

    return () => {
      cancelAnimationFrame(animationFrame);
      window.removeEventListener('resize', resize);
      window.removeEventListener('scroll', updateProgress);
      canvas.removeEventListener('pointermove', onPointerMove);
      canvas.removeEventListener('pointerleave', onPointerLeave);
    };
  }, []);

  return (
    <section ref={sectionRef} className={styles.sequence} aria-label="Marketing intelligence system">
      <div className={styles.viewport}>
        <canvas ref={canvasRef} className={styles.canvas} aria-hidden="true" />
        <div className={styles.vignette} aria-hidden="true" />

        <div ref={orbitRef} className={styles.orbit} aria-label="Impact metrics orbiting the intelligence tree">
          {orbitMetrics.map(([value, label]) => (
            <span data-orbit-label key={`${value}-${label}`}><strong>{value}</strong><em>{label}</em></span>
          ))}
        </div>
        <div ref={cursorRef} className={styles.pointerRing} aria-hidden="true" />

        <div ref={heroRef} className={styles.hero}>
          <div className={styles.heroTitle}>
            <p className={styles.kicker}><i /> Operational intelligence</p>
            <h2>Impact at a glance</h2>
          </div>
          <p className={styles.heroCopy}>Evidence across products, channels and markets.</p>
          <div className={styles.scrollCue} aria-hidden="true"><span>Scroll to transform</span><i /></div>
        </div>

        <div ref={systemRef} className={styles.system}>
          <div className={styles.systemHeading}>
            <h2>Create marketing value</h2>
            <p>One connected practice, six ways to contribute.</p>
          </div>
          <div className={styles.featureGrid}>
            {capabilities.map(([title, copy], index) => (
              <article data-feature-card key={title}><span>{String(index + 1).padStart(2, '0')}</span><div><h3>{title}</h3><p>{copy}</p></div></article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
