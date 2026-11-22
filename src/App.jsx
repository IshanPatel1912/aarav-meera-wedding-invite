import { useEffect, useRef, useState } from 'react';
import {
  ArrowDown, ArrowLeft, ArrowRight, CalendarDays, Clock3, Instagram,
  MapPin, Menu, Play, Sparkles, X
} from 'lucide-react';
import { wedding } from './data';

function scrollTrack(ref, direction) {
  if (!ref.current) return;
  ref.current.scrollBy({ left: Math.max(280, ref.current.clientWidth * 0.72) * direction, behavior: 'smooth' });
}

function useReveal(opened) {
  useEffect(() => {
    if (!opened) return;
    const nodes = document.querySelectorAll('.reveal');
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    nodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, [opened]);
}

function Ornament({ className = '' }) {
  return <span className={`ornament ${className}`} aria-hidden="true">✧</span>;
}

function SectionHeading({ eyebrow, title, subtitle }) {
  return <div className="section-heading reveal">
    <span className="eyebrow">{eyebrow}</span>
    <div className="heading-rule"><span /><Ornament /><span /></div>
    <h2>{title}</h2>
    {subtitle && <p>{subtitle}</p>}
  </div>;
}

function Intro({ onOpen }) {
  const [opening, setOpening] = useState(false);
  const handleOpen = () => {
    if (opening) return;
    setOpening(true);
    window.setTimeout(onOpen, 1650);
  };
  return <div className={`intro-screen ${opening ? 'intro-opening' : ''}`}>
    <div className="intro-grain" />
    <div className="intro-topline"><span>AN INVITATION TO CELEBRATE</span><span>{wedding.dateLine}</span></div>
    <div className="envelope-wrap">
      <div className="envelope-shadow" />
      <div className="envelope">
        <div className="envelope-back" />
        <div className="envelope-letter">
          <span className="letter-kicker">WITH THE BLESSINGS OF OUR FAMILIES</span>
          <span className="letter-names">{wedding.groom} <i>&amp;</i> {wedding.bride}</span>
          <span className="letter-date">{wedding.dateLine}</span>
          <span className="letter-city">{wedding.city}</span>
        </div>
        <div className="envelope-front" />
        <div className="envelope-flap" />
        <button className="wax-seal" onClick={handleOpen} aria-label="Open the wedding invitation"><span>{wedding.monogram}</span></button>
      </div>
    </div>
    <div className="intro-bottom">
      <p>AN INVITATION TO OUR WEDDING</p>
      <button onClick={handleOpen} className="open-invite">OPEN INVITATION <ArrowDown size={15} /></button>
      <span className="intro-hint">TAP THE SEAL TO OPEN</span>
    </div>
    <div className="intro-flower flower-left">✿</div><div className="intro-flower flower-right">✿</div>
  </div>;
}

function EventCard({ event, index }) {
  return <article className={`event-card ${event.tone}`}>
    <div className="event-photo-wrap"><img src={event.image} alt={`${event.name} celebration`} className="event-photo"/><span className="event-index">0{index + 1}</span></div>
    <div className="event-card-body">
      <span className="event-symbol">{event.symbol}</span><h3>{event.name}</h3><p className="event-subtitle">{event.subtitle}</p>
      <div className="event-line"><CalendarDays size={14}/><span>{event.date}</span></div>
      <div className="event-line"><Clock3 size={14}/><span>{event.time}</span></div>
      <div className="event-line"><MapPin size={14}/><span>{event.venue}</span></div>
      <div className="dress-code"><span className="dress-label">DRESS CODE</span><span className="dress-value">{event.dress}</span></div>
      <a className="event-instagram" href={`https://www.instagram.com/${event.handle}/`} target="_blank" rel="noreferrer"><Instagram size={15}/> @{event.handle}</a>
    </div>
  </article>;
}

function GalleryCard({ photo, index }) {
  return <figure className={`gallery-card gallery-card-${index + 1}`}>
    <img src={photo.src} alt={photo.alt} loading="lazy"/>
    <figcaption><span>{photo.note}</span><span>0{index + 1}</span></figcaption>
  </figure>;
}

export default function App() {
  const [opened, setOpened] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);
  const [filmPlaying, setFilmPlaying] = useState(false);
  const eventsTrack = useRef(null);
  const galleryTrack = useRef(null);
  const videoRef = useRef(null);
  useReveal(opened);

  const openSite = () => {
    setOpened(true);
    document.body.classList.add('site-open');
    window.scrollTo({ top: 0, behavior: 'instant' });
  };
  const closeMenu = () => setMobileMenu(false);
  const playFilm = () => {
    if (!videoRef.current) return;
    if (filmPlaying) {
      videoRef.current.pause();
      setFilmPlaying(false);
    } else {
      videoRef.current.play().then(() => setFilmPlaying(true)).catch(() => setFilmPlaying(false));
    }
  };
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const ended = () => setFilmPlaying(false);
    video.addEventListener('ended', ended);
    return () => video.removeEventListener('ended', ended);
  }, [opened]);

  if (!opened) return <Intro onOpen={openSite}/>;

  return <main className="website-shell">
    <header className="site-header">
      <a href="#home" className="brand-mark" onClick={closeMenu}>{wedding.monogram}</a>
      <button className="mobile-menu-toggle" onClick={() => setMobileMenu(!mobileMenu)} aria-label="Toggle navigation">{mobileMenu ? <X size={22}/> : <Menu size={22}/>}</button>
      <nav className={mobileMenu ? 'nav-open' : ''}>
        <a href="#home" onClick={closeMenu}>HOME</a><a href="#story" onClick={closeMenu}>OUR STORY</a><a href="#celebrations" onClick={closeMenu}>CELEBRATIONS</a><a href="#gallery" onClick={closeMenu}>GALLERY</a><a href="#film" onClick={closeMenu}>THE FILM</a>
      </nav>
      <a className="header-instagram" href={`https://www.instagram.com/${wedding.mainInstagram}/`} target="_blank" rel="noreferrer"><Instagram size={16}/><span>@{wedding.mainInstagram}</span></a>
    </header>

    <section className="hero" id="home">
      <div className="hero-image" style={{ backgroundImage: `url("${wedding.heroImage}")` }}/><div className="hero-vignette"/>
      <div className="hero-copy reveal">
        <p className="hero-kicker">TOGETHER WITH OUR FAMILIES</p>
        <h1><span>{wedding.groom}</span><em>&amp;</em><span>{wedding.bride}</span></h1>
        <div className="hero-divider"><span/><Ornament/><span/></div>
        <p className="hero-caption">WE INVITE YOU TO SHARE IN OUR JOY<br/>AS WE BEGIN OUR FOREVER</p>
        <p className="hero-date">{wedding.dateLine} <i>·</i> {wedding.city}</p>
      </div>
      <a href="#story" className="scroll-cue"><span>SCROLL TO DISCOVER</span><ArrowDown size={17}/></a>
      <div className="hero-side-note">A CELEBRATION OF LOVE · FAMILY · TOGETHERNESS</div>
    </section>

    <section className="story-section paper-section" id="story">
      <div className="story-flower flower-one">✿</div>
      <div className="story-inner">
        <div className="story-copy reveal"><span className="eyebrow">A LITTLE ABOUT US</span><h2>Two hearts,<br/><i>one beautiful</i> journey.</h2><div className="short-rule"/><p>{wedding.story}</p><span className="story-signature">With love, {wedding.groom} &amp; {wedding.bride}</span></div>
        <div className="story-photo reveal"><img src={wedding.storyImage} alt="Aarav and Meera together" loading="lazy"/><span className="photo-stamp">OUR<br/>STORY</span></div>
        <div className="story-detail-photo reveal"><img src={wedding.detailImage} alt="A close-up of their rings" loading="lazy"/></div>
      </div>
    </section>

    <section className="celebrations-section" id="celebrations">
      <div className="celebrations-bg-ornament">✿</div>
      <SectionHeading eyebrow="THE WEDDING FESTIVITIES" title="The Celebrations" subtitle="Four days, a thousand little moments, and everyone we love."/>
      <div className="carousel-controls event-controls"><button onClick={() => scrollTrack(eventsTrack, -1)} aria-label="Previous functions"><ArrowLeft size={18}/></button><span>SWIPE TO EXPLORE</span><button onClick={() => scrollTrack(eventsTrack, 1)} aria-label="Next functions"><ArrowRight size={18}/></button></div>
      <div className="event-track" ref={eventsTrack}>{wedding.events.map((event, index) => <EventCard key={event.id} event={event} index={index}/>)}</div>
      <div className="track-footnote"><span/> DRAG OR SWIPE TO SEE EVERY CELEBRATION <span/></div>
    </section>

    <section className="gallery-section paper-section" id="gallery">
      <div className="gallery-heading-row">
        <div className="gallery-intro reveal"><span className="eyebrow">THE TWO OF US</span><h2>Frames from<br/><i>our forever.</i></h2><p>A few favourite moments from the beginning of our always.</p></div>
        <div className="gallery-actions reveal"><span>PRE-WEDDING<br/>PHOTO DIARY</span><div className="carousel-controls"><button onClick={() => scrollTrack(galleryTrack, -1)} aria-label="Previous photographs"><ArrowLeft size={18}/></button><button onClick={() => scrollTrack(galleryTrack, 1)} aria-label="Next photographs"><ArrowRight size={18}/></button></div></div>
      </div>
      <div className="gallery-track" ref={galleryTrack}>{wedding.gallery.map((photo, index) => <GalleryCard key={photo.src} photo={photo} index={index}/>)}</div>
      <div className="gallery-bottom-note"><Ornament/> THE LITTLE THINGS WE WANT TO REMEMBER <Ornament/></div>
    </section>

    <section className="film-section" id="film">
      <div className="film-copy reveal"><span className="eyebrow">A MOMENT IN MOTION</span><h2>Before the<br/><i>big day.</i></h2><p>A little film of two people, one story, and the places that hold our memories.</p><span className="film-signature">{wedding.groom} &amp; {wedding.bride}</span></div>
      <div className="film-frame reveal">
        <video ref={videoRef} src={wedding.film} poster={wedding.filmPoster} playsInline preload="metadata" controls={filmPlaying}/>
        {!filmPlaying && <button className="film-play" onClick={playFilm} aria-label="Play the pre-wedding film"><Play size={24} fill="currentColor"/></button>}
        <span className="film-caption">OUR PRE-WEDDING FILM · SAMPLE VIDEO</span>
      </div>
      <div className="film-watermark">A <span>&amp;</span> M</div>
    </section>

    <section className="venue-section paper-section" id="details">
      <SectionHeading eyebrow="SAVE THE PLACE IN YOUR HEART" title="Where we meet" subtitle="A beautiful setting for a beautiful beginning."/>
      <div className="venue-card reveal"><div className="venue-image" style={{ backgroundImage: `linear-gradient(0deg, rgba(37,27,20,.1), transparent), url("${wedding.venueImage}")` }}/><div className="venue-details"><span className="eyebrow">THE WEDDING VENUE</span><h3>{wedding.venue}</h3><p>{wedding.address}</p><div className="venue-date"><CalendarDays size={16}/>{wedding.dateLine}</div><a href="https://www.google.com/maps/search/?api=1&query=Lake+Palace+Udaipur+Rajasthan" target="_blank" rel="noreferrer" className="map-link">VIEW LOCATION <ArrowRight size={15}/></a></div></div>
    </section>

    <footer className="site-footer"><div className="footer-flower">✿</div><span className="eyebrow">WITH LOVE, AND A LITTLE BIT OF MAGIC</span><h2>{wedding.groom} <i>&amp;</i> {wedding.bride}</h2><div className="footer-rule"><span/><Ornament/><span/></div><p>{wedding.dateLine} <i>·</i> {wedding.city}</p><a href={`https://www.instagram.com/${wedding.mainInstagram}/`} target="_blank" rel="noreferrer"><Instagram size={16}/> @{wedding.mainInstagram}</a><small>MADE WITH LOVE FOR OUR FAVOURITE PEOPLE</small></footer>
  </main>;
}
