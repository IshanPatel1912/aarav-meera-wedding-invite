import { useEffect, useRef, useState } from 'react';
import { ChevronDown, CalendarPlus } from 'lucide-react';
import { wedding } from '../data';
import { Divider, Lotus } from './Ornaments';

export default function Hero({ ready, onAddMain }) {
  const ref = useRef(null);
  const [seen, setSeen] = useState(typeof IntersectionObserver === 'undefined');

  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === 'undefined') return undefined;
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setSeen(true); io.disconnect(); } }, { threshold: 0.35 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const revealed = ready && seen; // one-shot: stays revealed

  return (
    <section className="panel hero" id="home" ref={ref}>
      <div className="hero-bg" style={{ backgroundImage: `url("${wedding.heroImage}")` }} />
      <div className="hero-shade" />
      <header className="hero-nav">
        <a href="#home" className="nav-logo" aria-label="Home"><Lotus size={26} /></a>
        <nav aria-label="Primary">
          <a href="#home">Home</a>
          <a href="#story">Our Story</a>
          <a href="#celebrations">Functions</a>
          <a href="#gallery">Gallery</a>
        </nav>
      </header>

      <div className="hero-center">
        <svg className="hero-arch" viewBox="0 0 300 430" preserveAspectRatio="none" aria-hidden="true">
          <path d="M2 430 V160 C2 118 30 96 62 84 C92 72 118 52 150 6 C182 52 208 72 238 84 C270 96 298 118 298 160 V430" fill="none" stroke="rgba(244,237,223,.75)" strokeWidth="1.2" vectorEffect="non-scaling-stroke" />
        </svg>
        <p className="hero-kicker">THE<br />WEDDING OF</p>
        <h1 className="hero-names">
          <span>{wedding.groom}</span>
          <i>&amp;</i>
          <span>{wedding.bride}</span>
        </h1>
        <Divider className="light" />
      </div>

      <div className={'hero-date ' + (revealed ? 'revealed' : '')}>
        <strong><span>{wedding.dateLine}</span></strong>
        <small>{wedding.city.toUpperCase()}</small>
        <button className="hero-cal" onClick={onAddMain}><CalendarPlus size={13} /> ADD TO CALENDAR</button>
      </div>

      <a className="hero-scroll" href="#story" aria-label="Scroll to our story"><ChevronDown size={22} strokeWidth={1.2} /></a>
    </section>
  );
}
