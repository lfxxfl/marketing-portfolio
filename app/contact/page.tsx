import { ArrowLeft, Mail, Phone } from 'lucide-react';
import { PortfolioNav } from '../components/portfolio-nav';
import { routePath } from '../../lib/site-path';

export const dynamic = 'force-static';

const process = [
  ['01', 'Discover', 'Read the market, audience and evidence.'], ['02', 'Define', 'Frame the problem and sharpen the proposition.'],
  ['03', 'Create', 'Translate strategy into messages and experiences.'], ['04', 'Launch', 'Coordinate people, channels and production.'],
  ['05', 'Learn', 'Use performance and feedback to improve.'], ['06', 'Scale', 'Turn what works into a repeatable system.'],
];

const timeline = [
  { company: 'Flow Furniture Ltd.', role: 'Marketing Executive', period: 'Apr 2025 — Apr 2026', scope: 'Social media · Events · Website · Collateral · Tender support' },
  { company: 'Wondershare', role: 'ASO Specialist', period: 'Jul 2024 — Mar 2025', scope: 'GTM · ASO · Localization · Testing · Campaigns' },
  { company: 'ByteDance', role: 'Strategic Assistant Intern', period: 'Dec 2023 — Feb 2024', scope: 'Operations · Discovery · Piracy and copyright research' },
  { company: 'JD Health', role: 'Project Coordinator Intern', period: 'Aug 2022 — Feb 2023', scope: 'E-commerce · Campaigns · Senior UX · Content' },
];

export default function ContactPage() {
  return (
    <main className="home-page route-page contact-detail-page">
      <PortfolioNav active="/contact" />
      <header className="route-masthead"><a className="route-back" href={routePath('/')}><ArrowLeft aria-hidden="true" />Home</a><p>Experience & working style</p></header>
      <section className="contact-detail-hero">
        <p className="section-kicker">Lauren Luo · Hong Kong</p><h1>How I turn insight into <em>momentum.</em></h1>
        <div><a href="mailto:mengxinluo00618@gmail.com"><Mail aria-hidden="true" />mengxinluo00618@gmail.com</a><a href="tel:+85251086428"><Phone aria-hidden="true" />+852 5108 6428</a></div>
      </section>
      <section className="working-section">
        <div className="subsection-heading"><p className="section-kicker">From insight to iteration</p><h3>How I move the work forward.</h3></div>
        <div className="home-process-grid">{process.map(([number, title, copy]) => <article key={title}><span>{number}</span><h4>{title}</h4><p>{copy}</p></article>)}</div>
        <div className="collaboration-note"><p className="section-kicker">How I collaborate</p><p>I work comfortably across marketing, product, design, operations, sales, project and external partner teams. I value clear briefs, visible priorities, direct feedback and shared definitions of success.</p></div>
      </section>
      <section className="career-section">
        <div className="subsection-heading"><p className="section-kicker">Experience & education</p><h3>A practice built across product, commerce and brand.</h3></div>
        <div className="career-layout">
          <div className="timeline-list">{timeline.map((item, index) => <article key={item.company}><span>0{index + 1}</span><div><h4>{item.company}</h4><p>{item.role}</p></div><div><p>{item.period}</p><small>{item.scope}</small></div></article>)}</div>
          <aside className="education-card"><p className="section-kicker">Education</p><div><span>2023 — 2024</span><h4>City University of Hong Kong</h4><p>MA Communication and New Media · Data Track</p><small>GPA 3.36</small></div><div><span>2019 — 2023</span><h4>Sichuan University</h4><p>BA International Chinese Education</p><small>GPA 3.71</small></div></aside>
        </div>
        <div className="footer-line"><span>Lauren Luo · Marketing Portfolio</span><a href={routePath('/')}>Return home ↑</a></div>
      </section>
    </main>
  );
}
