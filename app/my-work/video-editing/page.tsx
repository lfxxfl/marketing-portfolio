import { CreativeWorkLayout } from '../../components/creative-work-layout';
import { assetPath } from '../../../lib/site-path';

export const dynamic = 'force-static';

export default function VideoEditingPage() {
  return (
    <CreativeWorkLayout
      number="02"
      label="Video Editing"
      title="Building feeling through rhythm and sequence."
      intro="An editing study shaped through pacing, visual continuity and the relationship between sound and image."
      currentHref="/my-work/video-editing"
      nextHref="/my-work/ai-work"
      nextLabel="Next: AI Work"
    >
      <article className="creative-video-feature">
        <div className="creative-video-heading">
          <span>Editing study · 01</span>
          <h2>Cruel Summer</h2>
          <p>Use the player controls to view the complete edit.</p>
        </div>
        <video controls playsInline preload="metadata">
          <source src={assetPath('/assets/projects/my-work/video-editing/cruel-summer-web.mp4')} type="video/mp4" />
          Your browser does not support embedded video.
        </video>
      </article>
    </CreativeWorkLayout>
  );
}
