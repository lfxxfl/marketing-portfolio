'use client';

import type { CSSProperties } from 'react';
import { GlowCursor } from './glow-cursor';

export function SectionGlowCursor({ className = '', style }: { className?: string; style?: CSSProperties }) {
  return (
    <GlowCursor
      color="#67e8f9"
      secondaryColor="#a78bfa"
      trailLength={38}
      trailWidth={6}
      trailTaper={.84}
      followSpeed={.17}
      glowIntensity={1.6}
      glowSpread={1.08}
      hotspot={.68}
      brightness={1.12}
      opacity={.78}
      pulseSpeed={1.05}
      noiseStrength={.025}
      idleFade
      idleTimeout={680}
      fadeDuration={820}
      blendMode="screen"
      maxDevicePixelRatio={1.35}
      className={className}
      style={style}
    />
  );
}
