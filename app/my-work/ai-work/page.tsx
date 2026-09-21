import { CreativeWorkLayout } from '../../components/creative-work-layout';
import { AiWorkProjectStack, type AiWorkArtwork } from '../../components/ai-work-project-stack';
import { assetPath } from '../../../lib/site-path';

export const dynamic = 'force-static';

const artworks: AiWorkArtwork[] = [
  {
    label: 'Work',
    images: [
      { image: assetPath('/assets/projects/my-work/ai-work/gallery/work-1/01.png'), alt: 'Misty landscape study at dawn', label: 'Dawn', width: 2560, height: 1440 },
      { image: assetPath('/assets/projects/my-work/ai-work/gallery/work-1/02.png'), alt: 'Misty landscape study in morning light', label: 'Morning', width: 2560, height: 1440 },
      { image: assetPath('/assets/projects/my-work/ai-work/gallery/work-1/03.png'), alt: 'Misty landscape study at night', label: 'Night', width: 2560, height: 1440 },
      { image: assetPath('/assets/projects/my-work/ai-work/gallery/work-1/04.png'), alt: 'Misty landscape study at sunset', label: 'Sunset', width: 2560, height: 1440 },
    ],
  },
  {
    label: 'Work',
    images: [
      { image: assetPath('/assets/projects/my-work/ai-work/gallery/work-2/01.png'), alt: 'Surreal transparent bubble still life', label: 'Bubble', width: 2560, height: 1440 },
      { image: assetPath('/assets/projects/my-work/ai-work/gallery/work-2/02.png'), alt: 'Cosmic portal environment', label: 'Portal', width: 4096, height: 2304 },
    ],
  },
  {
    label: 'Work',
    images: [
      { image: assetPath('/assets/projects/my-work/ai-work/gallery/work-3/01.png'), alt: 'Diamond foreground environment artwork', label: 'Environment', width: 4096, height: 2313 },
    ],
  },
];

export default function AiWorkPage() {
  return (
    <CreativeWorkLayout
      number="03"
      label="AI Work"
      title="Visual direction shaped through intelligent tools."
      intro="A selection of AI-assisted image experiments exploring character, colour, styling and contemporary editorial worlds."
      currentHref="/my-work/ai-work"
      nextHref="/my-work/others"
      nextLabel="Next: Others"
    >
      <AiWorkProjectStack artworks={artworks} />
    </CreativeWorkLayout>
  );
}
