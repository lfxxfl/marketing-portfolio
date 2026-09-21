import { ChevronDown } from 'lucide-react';
import { routePath } from '../../lib/site-path';

const projectLinks = [
  { title: 'Growth & Commerce', href: '/growth-commerce' },
  { title: 'Social & Brand', href: '/social-brand' },
  { title: 'Digital & Campaign Marketing', href: '/digital-campaign' },
];

const myWorkLinks = [
  { title: 'Photography', href: '/my-work/photography' },
  { title: 'Video Editing', href: '/my-work/video-editing' },
  { title: 'AI Work', href: '/my-work/ai-work' },
  { title: 'Others', href: '/my-work/others' },
];

export function PortfolioNav({ active }: { active?: string }) {
  const projectsIsActive = active === '/projects' || projectLinks.some((link) => link.href === active);
  const myWorkIsActive = active === '/my-work' || active?.startsWith('/my-work/');

  return (
    <nav className="floating-tabs" aria-label="Portfolio categories">
      <a className={active === '/' ? 'active' : undefined} href={routePath('/')} aria-current={active === '/' ? 'page' : undefined}>
        Home
      </a>

      <details className={`nav-dropdown${projectsIsActive ? ' active' : ''}`} name="portfolio-navigation">
        <summary aria-label="Open Projects menu">
          <span>Projects</span>
          <ChevronDown aria-hidden="true" />
        </summary>
        <div className="nav-dropdown-menu">
          {projectLinks.map((link) => (
            <a
              className={active === link.href ? 'active' : undefined}
              href={routePath(link.href)}
              aria-current={active === link.href ? 'page' : undefined}
              key={link.href}
            >
              {link.title}
            </a>
          ))}
        </div>
      </details>

      <details className={`nav-dropdown${myWorkIsActive ? ' active' : ''}`} name="portfolio-navigation">
        <summary aria-label="Open My Work menu">
          <span>My Work</span>
          <ChevronDown aria-hidden="true" />
        </summary>
        <div className="nav-dropdown-menu">
          {myWorkLinks.map((link) => (
            <a
              className={active === link.href ? 'active' : undefined}
              href={routePath(link.href)}
              aria-current={active === link.href ? 'page' : undefined}
              key={link.href}
            >
              {link.title}
            </a>
          ))}
        </div>
      </details>

      <a
        className={active === '/contact' ? 'active' : undefined}
        href={routePath('/contact')}
        aria-current={active === '/contact' ? 'page' : undefined}
      >
        Contact
      </a>
    </nav>
  );
}
