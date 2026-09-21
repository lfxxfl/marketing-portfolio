import { ArrowUpRight, Mail, MapPin, Phone } from 'lucide-react';
import { AircordHomeHero } from './components/aircord-home-hero';
import { AnchorIntelligenceModule } from './components/anchor-intelligence-module';
import { HomeIntro } from './components/home-intro';
import { HomeLiquidTransition } from './components/home-liquid-transition';
import { HomeScrollSequence } from './components/home-scroll-sequence';
import { PortfolioNav } from './components/portfolio-nav';
import { ParticleText } from './components/particle-text';
import { RippleDistortion } from './components/ripple-distortion';
import { SectionGlowCursor } from './components/section-glow-cursor';
import { WonderParallaxModule } from './components/wonder-parallax-module';
import styles from './home-about.module.css';
import { assetPath, routePath } from '../lib/site-path';

export const dynamic = 'force-static';

const fiberEndpoints = Array.from({ length: 11 }, (_, index) => 84 + index * 103.2);

export default function Home() {
  return (
    <main className="home-page">
      <HomeIntro />
      <PortfolioNav active="/" />

      <HomeScrollSequence hero={<AircordHomeHero />} transition={<HomeLiquidTransition />} />

      <section className={`home-overview ${styles.aboutChapter}`} id="about">
        <SectionGlowCursor className={styles.glowCursor} />
        <div className={styles.blackBridge} aria-hidden="true" />

        <div className={styles.portal}>
          <div className={styles.portalGlow} aria-hidden="true" />
          <svg className={styles.portalArc} viewBox="0 0 1200 250" preserveAspectRatio="none" aria-hidden="true">
            <defs>
              <linearGradient id="about-arc-gradient" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0" stopColor="#5477c9" stopOpacity=".28" />
                <stop offset=".5" stopColor="#d8d4ff" stopOpacity=".78" />
                <stop offset="1" stopColor="#6fb5c0" stopOpacity=".28" />
              </linearGradient>
              <filter id="about-arc-glow" x="-300%" y="-300%" width="700%" height="700%">
                <feGaussianBlur stdDeviation="7" result="blur" />
                <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
              </filter>
            </defs>
            <path d="M 0 242 Q 600 -18 1200 242" fill="none" stroke="url(#about-arc-gradient)" strokeWidth="1.4" />
            <circle r="4" fill="#fff" filter="url(#about-arc-glow)">
              <animateMotion dur="6.8s" repeatCount="indefinite" path="M 1200 242 Q 600 -18 0 242" />
            </circle>
          </svg>
          <div className={styles.lightNode} aria-hidden="true"><i /></div>
          <svg className={styles.fiberLines} viewBox="0 0 1200 900" preserveAspectRatio="none" aria-hidden="true">
            <defs>
              <linearGradient id="about-fiber-gradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0" stopColor="#f7f4ff" stopOpacity=".72" />
                <stop offset=".56" stopColor="#a7b8ff" stopOpacity=".25" />
                <stop offset="1" stopColor="#78d7d1" stopOpacity="0" />
              </linearGradient>
              <filter id="about-fiber-glow" x="-300%" y="-300%" width="700%" height="700%">
                <feGaussianBlur stdDeviation="6" result="blur" />
                <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
              </filter>
            </defs>
            {fiberEndpoints.map((endpoint, index) => {
              const path = `M 600 0 C 600 140 600 215 600 260 C 600 420 ${endpoint} 500 ${endpoint} 900`;
              return (
                <g key={endpoint}>
                  <path className={styles.fiberPath} d={path} />
                  <circle className={styles.fiberRunner} r="3.4" filter="url(#about-fiber-glow)">
                    <animateMotion
                      begin={`${(index * .71).toFixed(2)}s`}
                      dur={`${(5.2 + index % 4 * .55).toFixed(2)}s`}
                      repeatCount="indefinite"
                      path={path}
                    />
                  </circle>
                </g>
              );
            })}
          </svg>

          <div className={styles.portalInner}>
            <div className={`about-layout ${styles.aboutLayout}`}>
              <div className={`about-copy ${styles.aboutCopy}`}>
                <p className={`section-kicker ${styles.aboutKicker}`}>About me</p>
                <p className={`about-lead ${styles.aboutLead}`}>I am a growth‑minded marketer with experience across mobile apps, e‑commerce, healthcare, furniture and digital content.</p>
                <p>I am most effective when a challenge needs both structure and momentum: clarifying what matters to the audience, translating product value into persuasive messages, coordinating creative and operational teams, and using results to improve the next iteration.</p>
              </div>
              <div className={`about-portrait ${styles.aboutPortrait}`}>
                <button className={`portrait-flip ${styles.portraitFlip}`} type="button" aria-label="Lauren Luo portraits. Hover or focus to reveal the alternate portrait.">
                  <span className={`portrait-flip-inner ${styles.portraitFlipInner}`}>
                    <img className="portrait-front" src={assetPath('/assets/lauren-about-blue.png')} alt="Lauren Luo in a blue halftone portrait" />
                    <img className="portrait-back" src={assetPath('/assets/lauren-about.png')} alt="Lauren Luo in front of pink flowers" />
                  </span>
                </button>
                <div className={`about-portrait-meta ${styles.portraitMeta}`}><span>Based in Hong Kong</span><span>Hover / tap to reveal</span></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <WonderParallaxModule />

      <AnchorIntelligenceModule />

      <footer className="home-footer compact-home-footer">
        <section className="contact-stage" id="contact-me">
          <div className="contact-transition-fade" aria-hidden="true" />
          <RippleDistortion
            src={assetPath('/assets/contact-ripple-background.svg')}
            brushSize={190}
            strength={0.085}
            swirl={0.65}
            rings={4}
            spread={4.2}
            fade={2.8}
            spacing={16}
            dispersion={0.018}
            glint={0.14}
            tint="#a99cff"
            tintAmount={0.14}
            highlightColor="#e9f9ff"
            grayscale={false}
            trigger="hover"
            quality="low"
            className="contact-ripple-background"
            style={{ zIndex: -2 }}
          />
          <div className="contact-glow" aria-hidden="true" />
          <div className="contact-stage-inner">
            <p className="section-kicker">Contact · Hong Kong</p>
            <h2>
              Let&apos;s build marketing that{' '}
              <em className="contact-moves-effect">
                <ParticleText
                  text="moves."
                  particleSize={2.25}
                  density={3}
                  color="#f4f1ff"
                  highlightColor="#9f91ef"
                  scatter={120}
                  gatherDuration={1350}
                  stagger={320}
                  pointerRepel={34}
                  repelRadius={105}
                  idleDrift={0.55}
                  trigger="hover"
                  fontSize="1em"
                  fontWeight={400}
                  fontFamily="inherit"
                  glow
                  style={{ width: '100%', height: '100%', minHeight: 0 }}
                />
              </em>
            </h2>
            <p className="contact-intro">I am interested in opportunities where growth strategy, creative execution and audience understanding need to work together. I would welcome a conversation about how I can contribute across product marketing, digital marketing, growth, content, campaigns or brand experience.</p>
            <div className="contact-links">
              <a href="mailto:mengxinluo00618@gmail.com"><Mail aria-hidden="true" />mengxinluo00618@gmail.com<ArrowUpRight aria-hidden="true" /></a>
              <a href="tel:+85251086428"><Phone aria-hidden="true" />+852 5108 6428<ArrowUpRight aria-hidden="true" /></a>
              <span><MapPin aria-hidden="true" />Hong Kong</span>
            </div>
            <a className="contact-detail-button" href={routePath('/contact')}>Experience & working style <ArrowUpRight aria-hidden="true" /></a>
            <p className="contact-signoff">
              <span>Lauren Luo</span>
              <span>© Lauren Luo · All rights reserved.</span>
              <span>Thank you for viewing.</span>
            </p>
          </div>
        </section>
      </footer>
    </main>
  );
}
