import { ArrowUpRight } from 'lucide-react';
import { PortfolioNav } from '../components/portfolio-nav';
import { SectionHeading } from '../components/section-heading';
import { assetPath, routePath } from '../../lib/site-path';

export const dynamic = 'force-static';

const sections = [
  {
    number: '01',
    title: 'Photography',
    description: 'Quiet observations of place, people and atmosphere.',
    image: assetPath('/assets/projects/my-work/photography/photography-01.jpg'),
    href: '/my-work/photography',
    mediaType: 'image',
  },
  {
    number: '02',
    title: 'Video Editing',
    description: 'Rhythm, pacing and emotional continuity in motion.',
    image: assetPath('/assets/projects/my-work/video-editing/cruel-summer-web.mp4'),
    href: '/my-work/video-editing',
    mediaType: 'video',
  },
  {
    number: '03',
    title: 'AI Work',
    description: 'AI-assisted visual direction and speculative image making.',
    image: assetPath('/assets/projects/my-work/ai-work/gallery/work-3/01.png'),
    href: '/my-work/ai-work',
    mediaType: 'image',
  },
  {
    number: '04',
    title: 'Others',
    description: 'Scriptwriting and narrative-led communication.',
    image: assetPath('/assets/projects/my-work/others/delta-virus-scriptwriting-web.mp4'),
    href: '/my-work/others',
    mediaType: 'video',
  },
];

export default function MyWorkPage() {
  return (
    <main className="home-page route-page">
      <PortfolioNav active="/my-work" />
      <header className="route-masthead route-masthead-label">
        <p>Creative practice · 04</p>
      </header>
      <section className="home-chapter route-chapter work-index-page">
        <SectionHeading
          number="04"
          label="My Work"
          title="Selected projects, connected by clarity."
          intro="Photography, moving image, AI-assisted visual work and narrative projects—four distinct practices connected by a clear point of view."
        />
        <div className="work-index-grid">
          {sections.map((section) => (
            <article className="work-index-card" key={section.title}>
              <div className="work-index-image">
                {section.mediaType === 'video' ? (
                  <div className="work-index-motion-art" aria-hidden="true">
                    <span>{section.title === 'Others' ? 'Story / Script' : 'Motion / Edit'}</span>
                    <strong>{section.title === 'Others' ? 'WORDS\nTO\nFRAME' : 'CUT\nPACE\nFEEL'}</strong>
                    <i>{section.number}</i>
                  </div>
                ) : (
                  <img src={section.image} alt="" />
                )}
              </div>
              <div className="work-index-copy">
                <span>{section.number} · My Work</span>
                <h2>{section.title}</h2>
                <p>{section.description}</p>
                <a className="work-index-button" href={routePath(section.href)}>
                  View section
                  <ArrowUpRight aria-hidden="true" />
                </a>
              </div>
            </article>
          ))}
        </div>
      </section>
      <footer className="route-next"><p>See how I work</p><a href={routePath('/contact')}>Experience & working style →</a></footer>
    </main>
  );
}
