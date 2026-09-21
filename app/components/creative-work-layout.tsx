import type { ReactNode } from 'react';
import { routePath } from '../../lib/site-path';
import { PortfolioNav } from './portfolio-nav';
import { SectionHeading } from './section-heading';

type CreativeWorkLayoutProps = {
  number: string;
  label: string;
  title: string;
  intro: string;
  currentHref: string;
  nextHref: string;
  nextLabel: string;
  children: ReactNode;
};

export function CreativeWorkLayout({
  number,
  label,
  title,
  intro,
  currentHref,
  nextHref,
  nextLabel,
  children,
}: CreativeWorkLayoutProps) {
  return (
    <main className="home-page route-page creative-work-page">
      <PortfolioNav active={currentHref} />
      <header className="route-masthead route-masthead-label">
        <p>My Work · {number}</p>
      </header>
      <section className="home-chapter route-chapter creative-work-chapter">
        <SectionHeading number={number} label={label} title={title} intro={intro} />
        {children}
      </section>
      <footer className="route-next">
        <p>Continue exploring</p>
        <a href={routePath(nextHref)}>{nextLabel} →</a>
      </footer>
    </main>
  );
}
