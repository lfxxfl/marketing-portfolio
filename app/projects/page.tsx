import type { Metadata } from 'next';
import { PortfolioNav } from '../components/portfolio-nav';
import { ProjectsFilm } from '../components/projects-film';

export const dynamic = 'force-static';

export const metadata: Metadata = {
  title: 'Projects — Lauren Luo',
  description: 'Explore Lauren Luo’s work across growth, brand, campaigns and creative practice.',
};

export default function ProjectsPage() {
  return (
    <main className="projects-reel-page">
      <PortfolioNav active="/projects" />
      <ProjectsFilm />
    </main>
  );
}
