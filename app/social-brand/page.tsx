import { PortfolioNav } from '../components/portfolio-nav';
import { ProjectPageEffects } from '../components/project-page-effects';
import { SectionHeading } from '../components/section-heading';
import { assetPath, routePath } from '../../lib/site-path';

export const dynamic = 'force-static';

export default function SocialBrandPage() {
  return (
    <main className="home-page route-page project-effects-page">
      <ProjectPageEffects />
      <PortfolioNav active="/social-brand" />
      <header className="route-masthead route-masthead-label"><p>Selected discipline · 02</p></header>
      <section className="home-chapter route-chapter">
        <SectionHeading number="02" label="Social & Brand" title="Make the brand recognizable before it is explained." intro="Systems that turn expertise, product proof and editorial judgment into a consistent public presence." />
        <article className="editorial-case case-feature brand-case">
          <div className="case-copy"><div className="case-meta"><span>Flow Furniture</span><span>Instagram · Facebook</span></div><h3>Building a Consistent B2B Brand Presence</h3><p className="case-lead">For education and commercial interiors, I created an always-on content structure that made the brand useful, credible and visually coherent.</p><div className="pillar-grid"><span>Product value</span><span>Project proof</span><span>Events & community</span><span>Brand expertise</span></div><p>The system sustained audience engagement and visibility while giving every post a clear role within the broader brand story.</p></div>
          <div className="brand-visual brand-phone-stage" aria-label="Flow Furniture and Flow Contracting Instagram brand presence">
            <a className="brand-phone brand-phone-contracting" href="https://www.instagram.com/flow_contracting_hk/" target="_blank" rel="noreferrer" aria-label="Visit Flow Contracting on Instagram">
              <img src={assetPath('/assets/projects/flow-social/flow-contracting-instagram-final.png')} alt="Flow Contracting Instagram profile shown on a phone" loading="lazy" decoding="async" />
            </a>
            <a className="brand-phone brand-phone-furniture" href="https://www.instagram.com/flowfurniture.hk/" target="_blank" rel="noreferrer" aria-label="Visit Flow Furniture on Instagram">
              <img src={assetPath('/assets/projects/flow-social/flow-furniture-instagram-final.png')} alt="Flow Furniture Instagram profile shown on a phone" loading="lazy" decoding="async" />
            </a>
          </div>
        </article>
        <article className="editorial-case content-case catalog-content-case">
          <header className="catalog-intro">
            <div className="case-meta"><span>Product Education · Brand Experience</span><span>Flow Furniture</span></div>
            <h3>Turning Product Knowledge into Useful Brand Experiences</h3>
            <p className="case-lead">I identified two critical information gaps in the customer journey: choosing the right school furniture before purchase, and maintaining materials correctly after renovation. I translated technical knowledge and product information into two practical catalogs that support decision-making, reduce uncertainty and strengthen the brand’s role as a long-term partner.</p>
          </header>

          <section className="catalog-project">
            <div className="catalog-project-visual">
              <img src={assetPath('/assets/projects/flow-cleaning-manual.png')} alt="Material Cleaning Manual catalog presentation" loading="lazy" decoding="async" />
            </div>
            <div className="catalog-project-copy">
              <p className="catalog-project-number">Project 01</p>
              <h4>Material Cleaning Manual</h4>
              <h5>Extending the Brand Beyond Project Handover</h5>
              <p>School renovations involve different boards, finishes and furniture materials, each requiring specific care. Incorrect cleaning can damage surfaces and increase long-term maintenance costs.</p>
              <p>I created a practical cleaning manual that translates technical requirements into clear instructions for clients. By extending support beyond project completion, the manual positions the company as a knowledgeable and responsible partner—not simply a renovation contractor. It reinforces professional credibility, improves the after-sales experience and helps clients protect the long-term value of their spaces.</p>
              <a className="button button-quiet catalog-download-link" href={assetPath('/assets/documents/material-cleaning-manual.pdf')} download="Lauren-Luo-Material-Cleaning-Manual.pdf">Download PDF <span aria-hidden="true">↓</span></a>
            </div>
          </section>

          <section className="catalog-project">
            <div className="catalog-project-visual">
              <img src={assetPath('/assets/projects/flow-school-furniture-catalog.png')} alt="School Furniture Catalog presentation" loading="lazy" decoding="async" />
            </div>
            <div className="catalog-project-copy">
              <p className="catalog-project-number">Project 02</p>
              <h4>School Furniture Catalog</h4>
              <h5>Simplifying Product Selection</h5>
              <p>Student desks and chairs are one of the company’s key product categories, but comparing models, specifications and configurations can be time-consuming for clients.</p>
              <p>I developed a dedicated catalog that organizes the product range into a clear and visually consistent selection tool. It enables clients to compare options more efficiently while supporting smoother sales conversations. From a branding perspective, the catalog strengthens the company’s specialization in school furniture, creates a consistent customer experience and turns product information into a practical tool for decision-making and conversion.</p>
              <a className="button button-quiet catalog-download-link" href={assetPath('/assets/documents/school-furniture-catalog.pdf')} download="Lauren-Luo-School-Furniture-Catalog.pdf">Download PDF <span aria-hidden="true">↓</span></a>
            </div>
          </section>
        </article>
      </section>
      <footer className="route-next"><p>Continue exploring</p><a href={routePath('/digital-campaign')}>Next: Digital & Campaign Marketing →</a></footer>
    </main>
  );
}
