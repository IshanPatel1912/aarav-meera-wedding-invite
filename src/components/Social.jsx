import { ExternalLink, Instagram, MapPin } from 'lucide-react';
import { wedding } from '../data';
import { Branch, Divider, Reveal } from './Ornaments';

export default function Social() {
  return (
    <section className="panel social" id="follow">
      <svg width="0" height="0" style={{ position: 'absolute' }} aria-hidden="true">
        <defs>
          <clipPath id="arch-clip" clipPathUnits="objectBoundingBox">
            <path d="M0 1 V.42 C0 .32 .09 .27 .18 .23 C.31 .18 .42 .11 .5 0 C.58 .11 .69 .18 .82 .23 C.91 .27 1 .32 1 .42 V1 Z" />
          </clipPath>
        </defs>
      </svg>

      <div className="social-top">
        <Branch className="branch-tr" flip />
        <Reveal className="panel-inner">
          <Instagram className="insta-mark" size={36} strokeWidth={1.5} />
          <h2 className="h-sm">Follow Our Wedding Journey</h2>
          <a className="handle-pill" href={'https://www.instagram.com/' + wedding.mainInstagram + '/'} target="_blank" rel="noreferrer">
            @{wedding.mainInstagram} <ExternalLink size={13} />
          </a>
          <div className="s-stack">
            {wedding.socialPhotos.map((p, i) => (
              <figure key={p.src} className={'s-photo s-photo-' + (i + 1)}><img src={p.src} alt={p.alt} loading="lazy" /></figure>
            ))}
          </div>
        </Reveal>
      </div>

      <div className="social-bottom">
        <div className="arch" style={{ backgroundImage: `url("${wedding.venueImage}")` }} role="img" aria-label={wedding.venue + ', ' + wedding.city}>
          <div className="arch-text">
            <Divider className="light" />
            <p className="arch-city">{wedding.city.toUpperCase()}</p>
            <h3>{wedding.venue}</h3>
            <p className="arch-tag">{wedding.destinationText}</p>
            <a href={wedding.mapUrl} target="_blank" rel="noreferrer"><MapPin size={12} /> View location</a>
          </div>
        </div>
      </div>
    </section>
  );
}
