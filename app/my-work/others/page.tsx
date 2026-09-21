import { CreativeWorkLayout } from '../../components/creative-work-layout';
import { assetPath } from '../../../lib/site-path';

export const dynamic = 'force-static';

export default function OthersPage() {
  return (
    <CreativeWorkLayout
      number="04"
      label="Others"
      title="Narrative thinking beyond a single format."
      intro="A scriptwriting project that translates complex information into a clear, audience-focused visual narrative."
      currentHref="/my-work/others"
      nextHref="/my-work"
      nextLabel="Back to My Work"
    >
      <article className="creative-video-feature creative-script-feature">
        <div className="creative-video-heading">
          <span>Scriptwriting · 01</span>
          <h2>Delta Variant</h2>
          <p>A completed horizontal-format production developed from the original scriptwriting work.</p>
        </div>
        <video controls playsInline preload="metadata">
          <source
            src={assetPath('/assets/projects/my-work/others/delta-virus-scriptwriting-web.mp4')}
            type="video/mp4"
          />
          Your browser does not support embedded video.
        </video>
      </article>
    </CreativeWorkLayout>
  );
}
