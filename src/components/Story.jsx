import { useState } from 'react';
import { wedding } from '../data';
import { Branch, Divider, Reveal } from './Ornaments';
import { useSwipe, ringOffset } from '../lib/useSwipe';

function Gallery() {
  const photos = wedding.gallery;
  const n = photos.length;
  const [active, setActive] = useState(0);
  const go = (d) => setActive((a) => (a + d + n) % n);
  const swipe = useSwipe(() => go(-1), () => go(1));

  return (
    <div className="gallery" role="group" aria-roledescription="carousel" aria-label="Photo gallery">
      <div className="gallery-stage" {...swipe}>
        {photos.map((p, i) => {
          const off = ringOffset(i, active, n);
          return (
            <figure
              key={p.src}
              className={'g-photo' + (off === 0 ? ' is-active' : '')}
              data-off={Math.abs(off) > 2 ? 'hide' : off}
              aria-hidden={off !== 0}
              onClick={() => off !== 0 && setActive(i)}
            >
              <img src={p.src} alt={p.alt} loading="lazy" draggable="false" />
            </figure>
          );
        })}
      </div>
      <div className="dots" role="tablist" aria-label="Choose photograph">
        {photos.map((p, i) => (
          <button key={p.src} role="tab" aria-selected={i === active} aria-label={'Photograph ' + (i + 1)} className={i === active ? 'active' : ''} onClick={() => setActive(i)} />
        ))}
      </div>
    </div>
  );
}

export default function Story() {
  return (
    <section className="panel story" id="story">
      <Branch className="branch-tl" />
      <Branch className="branch-tr" flip />
      <div className="panel-inner">
        <Reveal className="story-head">
          <Divider />
          <h2>Our Story</h2>
          <p>{wedding.story}</p>
        </Reveal>
        <Reveal className="story-photo" delay={120}>
          <img src={wedding.storyImage} alt="Aarav and Meera together" />
        </Reveal>
        <Reveal className="moments" id="gallery" delay={80}>
          <Divider />
          <h2 className="h-sm">A Few Moments</h2>
          <Gallery />
        </Reveal>
      </div>
    </section>
  );
}
