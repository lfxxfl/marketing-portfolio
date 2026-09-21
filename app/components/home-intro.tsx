'use client';

import { useEffect, useState } from 'react';

const marks = ['00', '10', '20', '30', '40', '50', '60', '70', '80', '90'];

export function HomeIntro() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    document.body.classList.add('home-intro-active');

    const finish = () => {
      document.body.classList.remove('home-intro-active');
      setVisible(false);
    };

    const timer = window.setTimeout(finish, 4700);
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') finish();
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.clearTimeout(timer);
      window.removeEventListener('keydown', handleKeyDown);
      document.body.classList.remove('home-intro-active');
    };
  }, []);

  if (!visible) return null;

  return (
    <div
      className="portfolio-intro"
      aria-hidden="true"
      onAnimationEnd={(event) => {
        if (event.target !== event.currentTarget) return;
        document.body.classList.remove('home-intro-active');
        setVisible(false);
      }}
    >
      <div className="intro-shutter intro-shutter-top" />
      <div className="intro-shutter intro-shutter-bottom" />

      <div className="intro-film-grid">
        {Array.from({ length: 6 }).map((_, laneIndex) => (
          <div className={`intro-film-lane lane-${laneIndex + 1}`} key={laneIndex}>
            {[...marks, ...marks].map((mark, markIndex) => (
              <span key={`${laneIndex}-${markIndex}`}>{mark}</span>
            ))}
          </div>
        ))}
      </div>

      <div className="intro-title-card">
        <p>Marketing Practitioner · AI Designer</p>
        <div className="intro-name" role="presentation">
          <span className="intro-name-mask">
            <span>Lauren</span>
          </span>
          <span className="intro-name-mask">
            <span>LUO</span>
          </span>
        </div>
        <div className="intro-title-rule">
          <span>Hong Kong</span>
          <span>Portfolio · 2026</span>
        </div>
      </div>

      <div className="intro-progress" aria-hidden="true">
        <span>00</span>
        <i />
        <span>100</span>
      </div>
    </div>
  );
}
