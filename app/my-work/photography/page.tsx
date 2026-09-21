import { CreativeWorkLayout } from '../../components/creative-work-layout';
import { PhotographySpiral } from '../../components/photography-spiral';
import { assetPath } from '../../../lib/site-path';

export const dynamic = 'force-static';

const photographs = [
  {
    src: assetPath('/assets/projects/my-work/photography/spiral/photo-01.jpg'),
    alt: 'A lone taxi travelling along a curved city road at night',
    label: 'Night Passage · 01',
  },
  {
    src: assetPath('/assets/projects/my-work/photography/spiral/photo-02.jpg'),
    alt: 'A dense collection of colourful figurines at a street stall',
    label: 'Street Finds · 02',
  },
  {
    src: assetPath('/assets/projects/my-work/photography/spiral/photo-03.jpg'),
    alt: 'A misty riverside cityscape seen above traditional rooftops',
    label: 'River Haze · 03',
  },
  {
    src: assetPath('/assets/projects/my-work/photography/spiral/photo-04.jpg'),
    alt: 'A woman and a white dog beside a flower stall at night',
    label: 'Night Companion · 04',
  },
  {
    src: assetPath('/assets/projects/my-work/photography/spiral/photo-05.jpeg'),
    alt: 'A glowing fire dragon moving through a crowded night street',
    label: 'Fire Dragon · 05',
  },
  {
    src: assetPath('/assets/projects/my-work/photography/spiral/photo-06.jpeg'),
    alt: 'Festival lanterns moving above a dense night crowd',
    label: 'Festival Current · 06',
  },
  {
    src: assetPath('/assets/projects/my-work/photography/spiral/photo-07.jpeg'),
    alt: 'A quiet island silhouette across the water at dusk',
    label: 'Dusk Island · 07',
  },
];

export default function PhotographyPage() {
  return (
    <CreativeWorkLayout
      number="01"
      label="Photography"
      title="Observing atmosphere in the in-between moments."
      intro="A personal photography selection focused on light, place and small moments of human presence."
      currentHref="/my-work/photography"
      nextHref="/my-work/video-editing"
      nextLabel="Next: Video Editing"
    >
      <PhotographySpiral items={photographs} />
    </CreativeWorkLayout>
  );
}
