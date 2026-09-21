import { PortfolioNav } from '../components/portfolio-nav';
import { ProjectPageEffects } from '../components/project-page-effects';
import { SectionHeading } from '../components/section-heading';
import { DepthCarousel } from '../components/depth-carousel';
import { assetPath, routePath } from '../../lib/site-path';

export const dynamic = 'force-static';

const comparisons = [
  {
    product: 'MobileTrans',
    platform: 'Google Play',
    originalLabel: 'Original version',
    revisedLabel: 'Version 2',
    original: ['1', '2', '3', '6', '4', '5', '7'].map((name) => assetPath(`/assets/projects/compare/mobiletrans-original/${name}.jpg`)),
    revised: ['v7', 'v1', 'v3', 'v8', 'v2', 'v4', 'v5', 'v6'].map((name) => assetPath(`/assets/projects/compare/mobiletrans-v2/${name}.png`)),
  },
  {
    product: 'Dr.Fone',
    platform: 'iOS App Store',
    originalLabel: 'Original version',
    revisedLabel: 'Revised version',
    original: ['1', '2', '3', '4', '5', '6'].map((name) => assetPath(`/assets/projects/compare/drfone-ios-original/${name}.png`)),
    revised: ['n3', 'n1', 'n6', 'n5', 'n2', 'n4', 'n7'].map((name) => assetPath(`/assets/projects/compare/drfone-ios-revised/${name}.png`)),
  },
];

const localizationComparisons = [
  {
    product: 'WaLastseen',
    market: 'India localization',
    originalLabel: 'Original version',
    revisedLabel: 'Localized version',
    original: [1, 2, 3, 4, 5].map((number) => assetPath(`/assets/projects/compare/walastseen-india-original/${number}.png`)),
    revised: [1, 2, 3, 4, 5, 6, 7].map((number) => assetPath(`/assets/projects/compare/walastseen-india-revised/${number}.png`)),
  },
  {
    product: 'Recover Everything',
    market: 'Japan localization',
    originalLabel: 'Original version',
    revisedLabel: 'Localized version',
    original: [1, 2, 3, 4, 5, 6].map((number) => assetPath(`/assets/projects/compare/recover-japan-original/${number}.png`)),
    revised: [1, 2, 3, 4, 5, 6, 7].map((number) => assetPath(`/assets/projects/compare/recover-japan-revised/n${number}.png`)),
  },
];

const seniorUiTimeline = [
  {
    version: '1.0',
    image: assetPath('/assets/projects/senior-ui-timeline/ver-1.0.png'),
    description: 'Differentiate between disability care subsidies and senior allowances.',
  },
  {
    version: '2.0',
    image: assetPath('/assets/projects/senior-ui-timeline/ver-2.0.png'),
    description: 'Enlarge fonts and icons for better accessibility. Remove spending restrictions on disability subsidies.',
  },
  {
    version: '2.1',
    image: assetPath('/assets/projects/senior-ui-timeline/ver-2.1.png'),
    description: 'Add categorized directories for easier navigation and search.',
  },
  {
    version: '2.2',
    image: assetPath('/assets/projects/senior-ui-timeline/ver-2.2.png'),
    description: 'Major supermarkets re-evaluate and restock products.',
  },
  {
    version: '2.3',
    image: assetPath('/assets/projects/senior-ui-timeline/ver-2.3.png'),
    description: <>Integrate <a href="https://jd.com/" target="_blank" rel="noreferrer">JD.com</a> logistics services and establish partnership. Launch prescription drug payment via the senior care card.</>,
  },
];

const flashSaleImages = Array.from(
  { length: 9 },
  (_, index) => ({
    image: assetPath(`/assets/projects/jd-promotional-engine/website-orbit/website-${String(index + 1).padStart(2, '0')}.png`),
    alt: `JD Health website flash sale banner ${index + 1}`,
  }),
);

const productCategoryPages = [
  { label: 'Health & Beauty', image: assetPath('/assets/projects/jd-product-category/health-beauty.png'), alt: 'Health and Beauty product category page design' },
  { label: 'Food & Grain', image: assetPath('/assets/projects/jd-product-category/food-grain.png'), alt: 'Food and Grain product category page design' },
  { label: 'Fresh Meat', image: assetPath('/assets/projects/jd-product-category/fresh-meat.png'), alt: 'Fresh Meat product category page design' },
  { label: 'Furniture', image: assetPath('/assets/projects/jd-product-category/furniture.png'), alt: 'Furniture product category page design' },
  { label: 'Services', image: assetPath('/assets/projects/jd-product-category/service.png'), alt: 'Services product category page design' },
];

function ComparisonPanel({ label, images, revised }: { label: string; images: string[]; revised?: boolean }) {
  return (
    <div className={`comparison-panel ${revised ? 'is-revised' : 'is-original'}`} tabIndex={0} aria-label={`${label}, ${images.length} screenshots. Focus to reveal all.`}>
      <div className="comparison-panel-label"><span>{revised ? 'After' : 'Before'}</span><strong>{label}</strong></div>
      <div className="comparison-image-row">
        {images.map((src, index) => <img src={src} alt={`${label} store creative ${index + 1}`} key={src} />)}
      </div>
    </div>
  );
}

export default function GrowthCommercePage() {
  return (
    <main className="home-page route-page project-effects-page">
      <ProjectPageEffects />
      <PortfolioNav active="/growth-commerce" />
      <header className="route-masthead route-masthead-label"><p>Selected discipline · 01</p></header>
      <section className="home-chapter route-chapter">
        <SectionHeading number="01" label="Growth & Commerce" title="From product value to measurable action." intro="Positioning, creative systems and commerce journeys designed to make the next decision easier." />

        <article className="editorial-case comparison-case">
          <div className="case-copy comparison-intro">
            <div className="case-meta"><span>Wondershare</span><span>ASO · Conversion</span></div><h3>From Features to a Clear Conversion Story</h3>
            <p className="case-lead">I reframed app-store creative around one user need, one benefit and one piece of proof—making complex products easier to understand and act on.</p>
            <div className="case-notes"><span>Lead with intent</span><span>Show product proof</span><span>Reduce cognitive load</span><span>Design for testing</span></div>
            <div className="case-results"><span><strong>+37.18%</strong> downloads</span><span><strong>+18.47%</strong> sales</span><span><strong>7</strong> Top 3 keywords</span><span><strong>60%+</strong> optimization rate</span></div>
          </div>
          <div className="product-comparison-stack">
            {comparisons.map((comparison, index) => (
              <section className="product-comparison" aria-labelledby={`comparison-${index}`} key={comparison.product}>
                <header><div><span>0{index + 1}</span><p>{comparison.platform}</p></div><h4 id={`comparison-${index}`}>{comparison.product}</h4><small>Hover a side to reveal all</small></header>
                <div className="comparison-panels">
                  <ComparisonPanel label={comparison.originalLabel} images={comparison.original} />
                  <div className="comparison-divider" aria-hidden="true"><span>VS</span></div>
                  <ComparisonPanel label={comparison.revisedLabel} images={comparison.revised} revised />
                </div>
              </section>
            ))}
          </div>
        </article>

        <article className="editorial-case comparison-case localization-comparison-case">
          <div className="case-copy comparison-intro">
            <div className="case-meta"><span>India · Japan</span><span>Localization</span></div>
            <h3>Localization Beyond Translation</h3>
            <p className="case-lead">I treated localization as market fit: adapting proposition, visual proof, platform conventions and cultural cues—not simply changing words.</p>
            <p>Across WaLastseen and Recover Everything, I tailored store experiences to local audience intent. The work demonstrates market sensitivity and the ability to keep a global product coherent while making it locally persuasive.</p>
          </div>
          <div className="product-comparison-stack localization-stack">
            {localizationComparisons.map((comparison, index) => (
              <section className="product-comparison" aria-labelledby={`localization-comparison-${index}`} key={comparison.product}>
                <header><div><span>0{index + 1}</span><p>{comparison.market}</p></div><h4 id={`localization-comparison-${index}`}>{comparison.product}</h4><small>Hover a side to reveal all</small></header>
                <div className="comparison-panels">
                  <ComparisonPanel label={comparison.originalLabel} images={comparison.original} />
                  <div className="comparison-divider" aria-hidden="true"><span>VS</span></div>
                  <ComparisonPanel label={comparison.revisedLabel} images={comparison.revised} revised />
                </div>
              </section>
            ))}
          </div>
        </article>

        <article className="editorial-case senior-timeline-case">
          <div className="case-copy senior-timeline-intro">
            <div className="case-meta"><span>JD Health</span><span>Audience · E-commerce</span></div>
            <h3>Scaling the Senior Card Zone</h3>
            <p className="case-lead">Built around older consumers, the Senior Card Zone evolved through five UI iterations—connecting accessibility, clearer navigation and stronger service integration.</p>
            <div className="case-results compact"><span><strong>7</strong> platforms</span><span><strong>10M+</strong> GMV</span><span><strong>80%</strong> repurchase</span><span><strong>4,000+</strong> SKUs</span></div>
          </div>
          <div className="senior-timeline-heading"><span>UI evolution · Version 1.0—2.3</span><p>Scroll horizontally · Hover a stage to focus</p></div>
          <div className="senior-ui-timeline" tabIndex={0} aria-label="Five-stage Senior Card Zone interface timeline">
            <div className="senior-ui-track">
              {seniorUiTimeline.map((step, index) => (
                <figure className="senior-ui-step" key={step.version}>
                  <div className="senior-ui-frame"><img src={step.image} alt={`Senior Card Zone interface version ${step.version}`} /></div>
                  <figcaption>
                    <div className="senior-timeline-marker"><i aria-hidden="true" /><span>0{index + 1}</span><strong>Version {step.version}</strong></div>
                    <p>{step.description}</p>
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>
        </article>

        <article className="editorial-case promotion-engine-case">
          <div className="case-copy campaign-engine-intro">
            <div className="case-meta"><span>JD Health</span><span>Integrated commerce</span></div>
            <h3>Building an Always-On Promotional Engine</h3>
            <p className="case-lead">More than twenty commerce campaigns became a repeatable operating rhythm: Plan, Merchandise, Create, Launch and Learn.</p>
            <p>I connected high-frequency conversion creative, complete promotion journeys and editorial storytelling—carrying one commercial idea from discovery through purchase.</p>
            <div className="case-results compact"><span><strong>20+</strong> campaigns</span><span><strong>70%+</strong> GMV increase</span><span><strong>10+</strong> articles</span></div>
          </div>

          <div className="campaign-content-system" id="campaign-editorial-work">
            <section className="campaign-asset flash-sale-gallery" aria-labelledby="flash-sale-title">
              <header className="campaign-asset-heading">
                <span className="campaign-asset-number">01</span>
                <div><p>Conversion creative system</p><h4 id="flash-sale-title">Flash Sale Page Design</h4></div>
                <span className="campaign-asset-count">9 website banners</span>
                <small>Drag, scroll or use the arrows to explore</small>
              </header>
              <div className="flash-sale-depth-stage">
                <DepthCarousel
                  items={flashSaleImages}
                  ariaLabel="Nine JD Health flash sale banner designs"
                  cardWidth={660}
                  cardHeight={270}
                  depth={180}
                  spread={300}
                  tilt={16}
                  perspective={1500}
                  visibleCards={7}
                  falloff={0.17}
                  blur={2.4}
                  autoplayDelay={3000}
                  fit="contain"
                />
              </div>
            </section>

            <section className="campaign-asset campaign-editorial-index" aria-labelledby="campaign-library-title">
              <header className="campaign-asset-heading">
                <span className="campaign-asset-number">02</span>
                <div><p>Campaign journey & editorial</p><h4 id="campaign-library-title">Promotion & WeChat</h4></div>
                <span className="campaign-asset-count">2 complete stories</span>
                <small>Select a title to view the complete work</small>
              </header>
              <nav className="campaign-text-links" aria-label="Complete promotional work">
                <a href="#promotion-page-full">
                  <span><small>Campaign journey</small>Promotion Page</span>
                  <strong>View complete work ↗</strong>
                </a>
                <a href="#wechat-article-2-full">
                  <span><small>Editorial story</small>WeChat Article</span>
                  <strong>Read complete article ↗</strong>
                </a>
              </nav>
            </section>
          </div>

          <div className="campaign-lightbox" id="promotion-page-full" role="dialog" aria-modal="true" aria-labelledby="promotion-page-lightbox-title">
            <a className="campaign-lightbox-backdrop" href="#campaign-editorial-work" aria-label="Close complete promotion page" />
            <div className="campaign-lightbox-panel">
              <header><div><span>Campaign journey</span><h4 id="promotion-page-lightbox-title">Promotion Page</h4></div><a href="#campaign-editorial-work" aria-label="Close complete promotion page">Close ×</a></header>
              <div className="campaign-lightbox-scroll"><img src={assetPath('/assets/projects/jd-promotional-engine/promotion-page.png')} alt="Complete JD Health promotion page design" /></div>
            </div>
          </div>

          <div className="campaign-lightbox" id="wechat-article-2-full" role="dialog" aria-modal="true" aria-labelledby="wechat-article-title">
            <a className="campaign-lightbox-backdrop" href="#campaign-editorial-work" aria-label="Close WeChat article" />
            <div className="campaign-lightbox-panel is-article">
              <header><div><span>Editorial story</span><h4 id="wechat-article-title">WeChat Article</h4></div><a href="#campaign-editorial-work" aria-label="Close WeChat article">Close ×</a></header>
              <div className="campaign-lightbox-scroll"><img src={assetPath('/assets/projects/jd-promotional-engine/wechat-article-2.jpg')} alt="Complete JD Health WeChat article" /></div>
            </div>
          </div>
        </article>

        <article className="insight-panel"><div><p className="section-kicker">Audience-led UX</p><h3>Designing for Older Audience</h3></div><div><p>I simplified hierarchy and navigation, increased category cues and contrast, and organized around practical needs. The goal was to meet accessibility and commercial objectives at the same moment.</p><blockquote>UX is marketing when clarity determines whether people trust, understand and buy.</blockquote></div></article>

        <section className="product-category-showcase" aria-labelledby="product-category-title">
          <header>
            <div><p>JD Health · Product category system</p><h3 id="product-category-title">Page Design</h3></div>
            <span>Drag, scroll or use the arrows to explore</span>
          </header>
          <div className="product-category-depth-stage">
            <DepthCarousel
              items={productCategoryPages}
              ariaLabel="Five JD Health product category page designs"
              cardWidth={330}
              cardHeight={600}
              depth={190}
              spread={230}
              tilt={18}
              perspective={1550}
              visibleCards={5}
              falloff={0.16}
              blur={2.5}
              autoplayDelay={3600}
              fit="contain"
            />
          </div>
        </section>
      </section>
      <footer className="route-next"><p>Continue exploring</p><a href={routePath('/social-brand')}>Next: Social & Brand →</a></footer>
    </main>
  );
}
