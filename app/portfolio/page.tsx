import {
  ArrowDown,
  ArrowUpRight,
  ChartNoAxesCombined,
  Layers3,
  Mail,
  MapPin,
  WandSparkles,
  Workflow,
} from 'lucide-react';
import { assetPath, routePath } from '../../lib/site-path';

export const dynamic = 'force-static';

const metrics = [
  { value: '+37.18%', label: 'Downloads through ASO' },
  { value: '+18.47%', label: 'Sales through ASO' },
  { value: '10M+', label: 'GMV from Senior Card Zone' },
  { value: '100+', label: 'A/B tests and experiments' },
];

const experience = [
  ['2025—2026', 'Flow Furniture', 'Marketing Executive'],
  ['2024—2025', 'Wondershare', 'App Store Optimization Specialist'],
  ['2023—2024', 'ByteDance', 'Strategy Assistant'],
  ['2022—2023', 'JD Health', 'Project Coordinator'],
];

const strengths = [
  {
    number: '01',
    icon: ChartNoAxesCombined,
    title: 'Growth systems',
    text: 'I turn audience intent, keyword data and performance signals into focused experiments that teams can repeat and scale.',
    tags: ['GTM', 'ASO', 'Testing'],
  },
  {
    number: '02',
    icon: Layers3,
    title: 'Creative translation',
    text: 'I make complex product value easy to see—through benefit-led messaging, visual sequencing and platform-native content.',
    tags: ['Positioning', 'Content', 'UX'],
  },
  {
    number: '03',
    icon: WandSparkles,
    title: 'AI-assisted design',
    text: 'I use AI as a fast visual thinking partner: exploring directions, shaping systems and accelerating production without losing judgment.',
    tags: ['Ideation', 'Systems', 'Prototyping'],
  },
  {
    number: '04',
    icon: Workflow,
    title: 'End-to-end delivery',
    text: 'I connect strategy, creative, operations and launch—keeping ownership clear and every decision tied to a user or business need.',
    tags: ['Briefing', 'Launch', 'Iteration'],
  },
];

export default function Portfolio() {
  return (
    <main className="portfolio-shell" id="top">
      <header className="site-nav">
        <a href={routePath('/')} className="site-brand" aria-label="Return to visual opening">
          <span className="site-brand-symbol">LL</span>
          <span>Lauren Luo</span>
        </a>

        <nav className="desktop-nav" aria-label="Primary navigation">
          <a href="#work">Work</a>
          <a href="#about">About</a>
          <a href="#strengths">Strengths</a>
        </nav>

        <a className="nav-contact" href="#contact">
          Let&apos;s talk <ArrowUpRight aria-hidden="true" />
        </a>
      </header>

      <section className="portfolio-hero" aria-labelledby="portfolio-title">
        <div className="hero-copy">
          <div className="availability">
            <span aria-hidden="true" /> Available for select opportunities
          </div>
          <p className="section-kicker">Marketing Practitioner · AI Designer</p>
          <h1 id="portfolio-title">
            Strategy with a pulse. <em>Creativity with proof.</em>
          </h1>
          <p className="hero-summary">
            I shape growth strategies, brand experiences and AI-assisted creative
            systems that make value clearer—and momentum measurable.
          </p>
          <div className="hero-actions">
            <a className="button button-primary" href="#work">
              View selected work <ArrowDown aria-hidden="true" />
            </a>
            <a className="button button-quiet" href="mailto:mengxinluo00618@gmail.com">
              Email me
            </a>
          </div>
        </div>

        <div className="hero-visual" aria-label="Visual collage of Lauren's creative and product work">
          <div className="hero-poster">
            <img src={assetPath('/assets/references/blue-blur-poster.png')} alt="Soft cobalt abstract poster" />
            <div className="poster-label">
              <span>Visual systems</span>
              <span>AI / 2026</span>
            </div>
          </div>
          <div className="hero-device">
            <img src={assetPath('/assets/projects/mobiletrans-1.png')} alt="MobileTrans App Store creative" />
          </div>
          <div className="hero-orbit orbit-one" aria-hidden="true" />
          <div className="hero-orbit orbit-two" aria-hidden="true" />
          <div className="hero-proof">
            <span>Selected outcome</span>
            <strong>+37.18%</strong>
            <small>downloads through ASO</small>
          </div>
        </div>

        <div className="hero-footnote">
          <span>Based in Hong Kong</span>
          <span>Growth · Brand · Content · Experience</span>
        </div>
      </section>

      <section className="about-section" id="about" aria-labelledby="about-title">
        <div className="section-heading-row">
          <p className="section-number">01 / Profile</p>
          <p className="section-note">An audience-first marketing practice</p>
        </div>

        <div className="about-grid">
          <div className="about-mark-wrap">
            <img className="about-mark" src={assetPath('/assets/lmx-mark.png')} alt="LMX personal monogram" />
            <div className="about-location">
              <MapPin aria-hidden="true" />
              <span>Hong Kong</span>
            </div>
          </div>

          <div className="about-copy">
            <p className="section-kicker">About Lauren</p>
            <h2 id="about-title">
              I turn market signals into <em>clear propositions, testable creative</em>
              {' '}and measurable growth.
            </h2>
            <div className="about-columns">
              <p>
                My work sits at the intersection of strategy, audience insight,
                creative direction and execution. I am most effective when a
                challenge needs both structure and momentum.
              </p>
              <p>
                Across mobile apps, e-commerce, healthcare, furniture and digital
                content, I translate product value into messages and experiences
                people can understand quickly.
              </p>
            </div>
            <div className="contact-links">
              <a href="mailto:mengxinluo00618@gmail.com">
                <Mail aria-hidden="true" /> mengxinluo00618@gmail.com
              </a>
              <a href="tel:+85251086428">+852 5108 6428</a>
            </div>
          </div>
        </div>

        <div className="metrics-grid" aria-label="Selected career results">
          {metrics.map((metric) => (
            <article className="metric-card" key={metric.label}>
              <strong>{metric.value}</strong>
              <span>{metric.label}</span>
            </article>
          ))}
        </div>

        <div className="experience-list" aria-label="Selected experience">
          {experience.map(([year, company, role]) => (
            <div className="experience-row" key={company}>
              <span>{year}</span>
              <strong>{company}</strong>
              <p>{role}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="work-section" id="work" aria-labelledby="work-title">
        <div className="section-heading-row">
          <p className="section-number">02 / Selected work</p>
          <p className="section-note">Strategy translated into visible evidence</p>
        </div>

        <div className="work-intro">
          <h2 id="work-title">A portfolio of <em>growth, experience and clarity.</em></h2>
          <p>
            Each project connects a real audience problem with a clearer message,
            a stronger system and a result teams can learn from.
          </p>
        </div>

        <article className="project-card project-featured">
          <div className="project-copy">
            <div className="project-meta">
              <span>01</span>
              <span>Wondershare</span>
              <span>Growth & ASO</span>
            </div>
            <h3>Building a scalable App Store growth engine</h3>
            <p>
              Connected market research, keyword opportunity, benefit-led creative,
              localization and testing across five data-management products.
            </p>
            <div className="project-results">
              <span><strong>5</strong> apps</span>
              <span><strong>100+</strong> tests</span>
              <span><strong>7</strong> top-three keywords</span>
            </div>
          </div>
          <div className="aso-gallery" aria-label="MobileTrans App Store screenshots">
            {['mobiletrans-1.png', 'mobiletrans-2.png', 'mobiletrans-3.png', 'mobiletrans-4.png'].map((image, index) => (
              <img
                src={assetPath(`/assets/projects/${image}`)}
                alt={`MobileTrans benefit-led screenshot ${index + 1}`}
                key={image}
              />
            ))}
          </div>
        </article>

        <div className="project-pair">
          <article className="project-card project-commerce">
            <div className="project-meta">
              <span>02</span>
              <span>JD Health</span>
              <span>Campaign & Commerce</span>
            </div>
            <h3>Scaling an age-friendly commerce destination</h3>
            <p>
              Expanded the Senior Card Zone across seven platforms and connected
              navigation, merchandising and seasonal campaigns around older users.
            </p>
            <div className="commerce-visual">
              <img src={assetPath('/assets/projects/jd-senior-ui.png')} alt="Age-friendly JD Health mobile interface" />
              <img src={assetPath('/assets/projects/jd-category.png')} alt="JD Health food and grain category page" />
            </div>
            <div className="project-bottom-line">
              <span>10M+ GMV</span>
              <span>80% repurchase rate</span>
            </div>
          </article>

          <article className="project-card project-experience">
            <div className="project-meta">
              <span>03</span>
              <span>Flow Furniture</span>
              <span>Brand Experience</span>
            </div>
            <h3>Turning a B2B promise into a physical experience</h3>
            <p>
              Shaped exhibition and school-event touchpoints across booth design,
              collateral, content, participation and visitor flow.
            </p>
            <div className="experience-visual">
              <img src={assetPath('/assets/projects/archidex-booth.jpg')} alt="Flow Furniture booth at ARCHIDEX" />
              <span className="image-caption">ARCHIDEX · Malaysia</span>
            </div>
            <div className="project-bottom-line">
              <span>International exhibition</span>
              <span>2 school activations</span>
            </div>
          </article>
        </div>

        <article className="project-card project-editorial">
          <div className="editorial-image image-one">
            <img src={assetPath('/assets/projects/photography-night.jpg')} alt="Night street photography under an elevated road" />
          </div>
          <div className="editorial-copy">
            <div className="project-meta">
              <span>04</span>
              <span>Creative Practice</span>
              <span>Content & Visual Direction</span>
            </div>
            <h3>Hands-on making sharpens strategic judgment</h3>
            <p>
              Photography, video editing, editorial development and AI-assisted
              prototyping help me move from an abstract brief to a tangible visual
              direction—then judge what deserves to stay.
            </p>
            <div className="creative-tags">
              <span>Photography</span>
              <span>Video</span>
              <span>AI workflows</span>
              <span>Editorial</span>
            </div>
          </div>
          <div className="editorial-image image-two">
            <img src={assetPath('/assets/projects/photography-haze.jpg')} alt="Atmospheric city and temple landscape photography" />
          </div>
        </article>
      </section>

      <section className="strengths-section" id="strengths" aria-labelledby="strengths-title">
        <div className="section-heading-row">
          <p className="section-number">03 / Strengths</p>
          <p className="section-note">How I create marketing value</p>
        </div>
        <div className="strengths-intro">
          <h2 id="strengths-title">Structure for the problem. <em>Momentum for the work.</em></h2>
          <p>
            I work across marketing, product, design, operations and external
            partners—building shared clarity before pushing into execution.
          </p>
        </div>

        <div className="strengths-grid">
          {strengths.map((strength) => {
            const Icon = strength.icon;
            return (
              <article className="strength-card" key={strength.title}>
                <div className="strength-top">
                  <span>{strength.number}</span>
                  <Icon aria-hidden="true" />
                </div>
                <h3>{strength.title}</h3>
                <p>{strength.text}</p>
                <div className="strength-tags">
                  {strength.tags.map((tag) => <span key={tag}>{tag}</span>)}
                </div>
              </article>
            );
          })}
        </div>

        <div className="process-line" aria-label="Lauren's working process">
          {['Discover', 'Define', 'Create', 'Launch', 'Learn'].map((step, index) => (
            <div key={step}>
              <span>{String(index + 1).padStart(2, '0')}</span>
              <strong>{step}</strong>
            </div>
          ))}
        </div>
      </section>

      <footer className="contact-section" id="contact">
        <img src={assetPath('/assets/references/horizon-blur.jpg')} alt="Soft blurred horizon" />
        <div className="contact-overlay" aria-hidden="true" />
        <div className="contact-content">
          <div>
            <p className="section-kicker">Have a project or role in mind?</p>
            <h2>Let&apos;s build marketing that <em>moves.</em></h2>
          </div>
          <a className="contact-cta" href="mailto:mengxinluo00618@gmail.com">
            <span>Start a conversation</span>
            <ArrowUpRight aria-hidden="true" />
          </a>
        </div>
        <div className="footer-line">
          <span>Lauren Luo · Marketing Practitioner & AI Designer</span>
          <a href="mailto:mengxinluo00618@gmail.com">mengxinluo00618@gmail.com</a>
          <a href="#top">Back to top ↑</a>
        </div>
      </footer>
    </main>
  );
}
