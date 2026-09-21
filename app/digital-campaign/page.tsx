import { PortfolioNav } from '../components/portfolio-nav';
import { ProjectPageEffects } from '../components/project-page-effects';
import { SectionHeading } from '../components/section-heading';
import { FlowCafeCarousel } from '../components/flow-cafe-carousel';
import { assetPath, routePath } from '../../lib/site-path';

export const dynamic = 'force-static';

const flowCafeOnePhotos = [
  { src: assetPath('/assets/projects/flow-cafe/flow-cafe-1-01.jpg'), alt: 'Flow Cafe 1.0 school well-being activation, photograph 1' },
  { src: assetPath('/assets/projects/flow-cafe/flow-cafe-1-02.jpg'), alt: 'Flow Cafe 1.0 school well-being activation, photograph 2' },
  { src: assetPath('/assets/projects/flow-cafe/flow-cafe-1-03.jpg'), alt: 'Flow Cafe 1.0 school well-being activation, photograph 3' },
  { src: assetPath('/assets/projects/flow-cafe/flow-cafe-1-04.jpg'), alt: 'Flow Cafe 1.0 school well-being activation, photograph 4' },
  { src: assetPath('/assets/projects/flow-cafe/flow-cafe-1-05.png'), alt: 'Flow Cafe 1.0 school well-being activation, photograph 5' },
];

const flowCafeTwoPhotos = [
  { src: assetPath('/assets/projects/flow-cafe/flow-cafe-2-11.jpg'), alt: 'Flow Cafe 2.0 school well-being activation, photograph 1' },
  { src: assetPath('/assets/projects/flow-cafe/flow-cafe-2-05.jpg'), alt: 'Flow Cafe 2.0 school well-being activation, photograph 2' },
  { src: assetPath('/assets/projects/flow-cafe/flow-cafe-2-07.jpg'), alt: 'Flow Cafe 2.0 school well-being activation, photograph 3' },
  { src: assetPath('/assets/projects/flow-cafe/flow-cafe-2-10.jpg'), alt: 'Flow Cafe 2.0 school well-being activation, photograph 4' },
];

export default function DigitalCampaignPage() {
  return (
    <main className="home-page route-page project-effects-page">
      <ProjectPageEffects />
      <PortfolioNav active="/digital-campaign" />
      <header className="route-masthead route-masthead-label"><p>Selected discipline · 03</p></header>
      <section className="home-chapter route-chapter">
        <SectionHeading number="03" label="Digital & Campaign Marketing" title="Connect the physical moment to the full brand system." intro="Campaigns, events, web and sales materials designed as one continuous experience." />
        <article className="editorial-case case-feature event-case">
          <div className="case-copy"><div className="case-meta"><span>ARCHIDEX Malaysia · Flow Cafe</span><span>Experience marketing</span></div><h3>Turning Events into Brand Experiences</h3><p className="case-lead">I developed exhibition and community moments end to end—from the brief and external coordination to booth flow, collateral and follow-up touchpoints.</p><p>Backdrops, brochures, product displays and QR journeys mapped a visitor path from consult to procure, quality control, delivery and installation. I also organized two school events that connected lead generation with community.</p></div>
          <div className="event-gallery event-photo-flip" tabIndex={0} aria-label="ARCHIDEX exhibition experience. Hover or focus to view the second photograph.">
            <div className="event-photo-flip-inner">
              <img className="event-photo-front" src={assetPath('/assets/projects/archidex-event-front.jpg')} alt="Visitors engaging with the Flow Contracting and Furniture team at ARCHIDEX" />
              <img className="event-photo-back" src={assetPath('/assets/projects/archidex-event-back.jpg')} alt="Flow Contracting and Furniture team at the ARCHIDEX exhibition booth" />
            </div>
          </div>
        </article>
        <section className="editorial-case event-deliverables" aria-label="ARCHIDEX exhibition materials">
          <article className="event-deliverable event-deliverable-catalog">
            <header className="event-deliverable-heading"><span>Exhibition Asset · 01</span><h4>Catalog</h4></header>
            <figure className="event-asset-frame">
              <img src={assetPath('/assets/projects/archidex-catalog-board.png')} alt="ARCHIDEX commercial furniture and renovation materials catalog presentation" loading="lazy" decoding="async" />
            </figure>
            <a className="button button-quiet event-download-link" href={assetPath('/assets/documents/archidex-2025-catalog.pdf')} download="Lauren-Luo-ARCHIDEX-2025-Catalog.pdf">Download PDF <span aria-hidden="true">↓</span></a>
          </article>
          <article className="event-deliverable event-deliverable-backdrop">
            <header className="event-deliverable-heading"><span>Exhibition Asset · 02</span><h4>Exhibition Backdrop</h4></header>
            <figure className="event-asset-frame">
              <img src={assetPath('/assets/projects/archidex-backdrop-display.png')} alt="Flow exhibition backdrop displayed in the ARCHIDEX booth environment" loading="lazy" decoding="async" />
            </figure>
          </article>
          <article className="event-deliverable event-deliverable-leaflet">
            <header className="event-deliverable-heading"><span>Exhibition Asset · 03</span><h4>Leaflet</h4></header>
            <figure className="event-asset-frame">
              <img src={assetPath('/assets/projects/archidex-exhibition-leaflet.png')} alt="ARCHIDEX exhibition leaflet for Flow commercial furniture and renovation materials" loading="lazy" decoding="async" />
            </figure>
          </article>
        </section>
        <section className="editorial-case flow-cafe-section">
          <header className="flow-cafe-intro">
            <div className="case-meta"><span>Purpose-led activation</span><span>School community · CSR</span></div>
            <h3>Flow Cafe — Turning Care into a Brand Experience</h3>
            <p className="case-lead">Across two Flow Cafe activations, I helped transform a school well-being initiative into a purpose-led brand experience. Teachers became servers, while students ordered according to their mood and used the bill to express how they felt—creating a relaxed setting that encouraged connection and emotional exchange. The event strengthened the company’s brand by demonstrating empathy for school communities and turning corporate social responsibility into a visible, participatory experience. I managed end-to-end coordination with schools across venue planning, menus, promotional materials and participant arrangements, while also handling external procurement, supplier communication, transport and on-site logistics. My role connected brand strategy with operational delivery, ensuring the experience was meaningful to participants and consistent with the company’s positioning.</p>
          </header>
          <div className="flow-cafe-galleries">
            <FlowCafeCarousel edition="Flow Cafe 1.0" photos={flowCafeOnePhotos} />
            <FlowCafeCarousel edition="Flow Cafe 2.0" photos={flowCafeTwoPhotos} />
          </div>
        </section>
        <article className="editorial-case case-split reverse system-case website-system-case">
          <div className="case-visual website-showcase" aria-label="Flow corporate website projects">
            <a className="website-project-card" href="https://flowcontracting.hk/en/homepage/" target="_blank" rel="noreferrer" aria-label="Visit the Flow Contracting website">
              <header><div><span>Corporate Website · 01</span><h4>Flow Contracting</h4></div><small>Visit website ↗</small></header>
              <div className="website-computer-stack" aria-hidden="true">
                <img className="website-computer-image website-computer-image-first" src={assetPath('/assets/projects/flow-contracting-website-01-cutout.png')} alt="" loading="lazy" decoding="async" />
                <img className="website-computer-image website-computer-image-second" src={assetPath('/assets/projects/flow-contracting-website-02-cutout.png')} alt="" loading="lazy" decoding="async" />
              </div>
            </a>
            <a className="website-project-card" href="https://flowfurniture.hk/en/" target="_blank" rel="noreferrer" aria-label="Visit the Flow Furniture website">
              <header><div><span>Corporate Website · 02</span><h4>Flow Furniture</h4></div><small>Visit website ↗</small></header>
              <div className="website-computer-stack" aria-hidden="true">
                <img className="website-computer-image website-computer-image-first" src={assetPath('/assets/projects/flow-furniture-website-01-cutout.png')} alt="" loading="lazy" decoding="async" />
                <img className="website-computer-image website-computer-image-second" src={assetPath('/assets/projects/flow-furniture-website-02-cutout.png')} alt="" loading="lazy" decoding="async" />
              </div>
            </a>
          </div>
          <div className="case-copy"><div className="case-meta"><span>Website · Catalogues</span><span>Sales enablement</span></div><h3>Creating a Connected B2B Marketing System</h3><p className="case-lead">I supported the development and ongoing maintenance of two corporate websites, translating the companies’ positioning, services and visual identity into clear digital experiences. Through regular content updates, visual consistency checks and website maintenance, I ensured both platforms remained accurate, relevant and aligned with the brands. The websites served not only as information channels, but also as key touchpoints for building credibility, communicating expertise and creating a consistent brand experience for potential clients.</p></div>
        </article>
      </section>
      <footer className="route-next"><p>Continue exploring</p><a href={routePath('/my-work')}>Next: My Work →</a></footer>
    </main>
  );
}
