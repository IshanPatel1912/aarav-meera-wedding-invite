import { useEffect, useRef, useState } from 'react';
import {
  ArrowDown, ArrowLeft, ArrowRight, CalendarDays, Clock3, ExternalLink,
  Instagram, MapPin, Menu, Play, X
} from 'lucide-react';
import { wedding } from './data';

function scrollTrack(ref, direction) {
  if (!ref.current) return;
  ref.current.scrollBy({ left: Math.max(220, ref.current.clientWidth * 0.72) * direction, behavior: 'smooth' });
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
    }, { threshold: 0.1 });
    nodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, [opened]);
}

function Ornament({ className = '' }) {
  return <span className={'ornament ' + className} aria-hidden="true">❀</span>;
}

function SectionMark() {
  return <div className="section-mark" aria-hidden="true"><span/><Ornament/><span/></div>;
}

function icsEscape(value = '') {
  return String(value).replace(/\\/g, '\\\\').replace(/\r?\n/g, '\\n').replace(/,/g, '\\,').replace(/;/g, '\\;');
}

function icsDate(value) {
  return new Date(value).toISOString().replace(/[-:]/g, '').replace(/\.\d{3}Z$/, 'Z');
}

function downloadCalendarEvents(events, fileName = 'aarav-meera-wedding.ics') {
  if (!events || !events.length) return;
  const stamp = icsDate(new Date().toISOString());
  const entries = events.map((event) => {
    const start = new Date(event.startAt);
    const end = new Date(start.getTime() + (event.durationMinutes || 180) * 60000);
    const description = [
      event.subtitle,
      'Dress code: ' + event.dress,
      'Instagram: @' + event.handle
    ].join('\n');
    return [
      'BEGIN:VEVENT',
      'UID:' + event.id + '-aarav-meera@wedding-invite',
      'DTSTAMP:' + stamp,
      'DTSTART:' + icsDate(start.toISOString()),
      'DTEND:' + icsDate(end.toISOString()),
      'SUMMARY:' + icsEscape(event.name + ' — ' + wedding.groom + ' & ' + wedding.bride),
      'LOCATION:' + icsEscape(event.venue + ', ' + wedding.city),
      'DESCRIPTION:' + icsEscape(description),
      'END:VEVENT'
    ].join('\r\n');
  });
  const content = ['BEGIN:VCALENDAR', 'VERSION:2.0', 'PRODID:-//Aarav and Meera//Wedding Invitation//EN', 'CALSCALE:GREGORIAN', 'METHOD:PUBLISH', ...entries, 'END:VCALENDAR'].join('\r\n');
  const blob = new Blob([content], { type: 'text/calendar;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = fileName;
  document.body.appendChild(link);
  link.click();
  link.remove();
  window.setTimeout(() => URL.revokeObjectURL(url), 1200);
}

function Intro({ onOpen }) {
  const [opening, setOpening] = useState(false);
  const [dateVisible, setDateVisible] = useState(false);
  const handleOpen = () => {
    if (opening) return;
    setOpening(true);
    window.setTimeout(() => setDateVisible(true), 420);
    window.setTimeout(onOpen, 1650);
  };
  return <div className={'intro-screen ' + (opening ? 'intro-opening' : '')}>
    <div className="intro-grain"/>
    <div className="intro-corner intro-corner-left">✿</div>
    <div className="intro-corner intro-corner-right">✿</div>
    <div className="intro-topline"><span>AN INVITATION TO CELEBRATE</span><span>{wedding.city}</span></div>
    <div className="envelope-wrap">
      <div className="envelope-shadow"/>
      <div className="envelope">
        <div className="envelope-back"/>
        <div className="envelope-letter">
          <span className="letter-kicker">TOGETHER WITH OUR FAMILIES</span>
          <span className="letter-names">{wedding.groom} <i>&amp;</i> {wedding.bride}</span>
          <span className={'letter-date ' + (dateVisible ? 'date-visible' : '')}>{wedding.dateLine}</span>
          <span className="letter-city">{wedding.city}</span>
        </div>
        <div className="envelope-front"/>
        <div className="envelope-flap"/>
        <button className="wax-seal" onClick={handleOpen} aria-label="Open the wedding invitation"><span>{wedding.monogram}</span></button>
      </div>
    </div>
    <div className="intro-bottom">
      <p>THE WEDDING OF</p>
      <button onClick={handleOpen} className="open-invite">OPEN INVITATION <ArrowDown size={15}/></button>
      <span className="intro-hint">TAP THE SEAL TO REVEAL THE DATE</span>
    </div>
  </div>;
}

function HeroPanel({ onNavigate, dateVisible, saveWeddingDate }) {
  return <section className="home-panel" id="home">
    <div className="home-bg" style={{ backgroundImage: 'url("' + wedding.heroImage + '")' }}/>
    <div className="home-shade"/>
    <header className="panel-nav">
      <a className="panel-brand" href="#home" aria-label="Home">✿</a>
      <nav>
        <a href="#home" onClick={onNavigate}>Home</a>
        <a href="#story" onClick={onNavigate}>Our Story</a>
        <a href="#celebrations" onClick={onNavigate}>Functions</a>
        <a href="#gallery" onClick={onNavigate}>Gallery</a>
      </nav>
    </header>
    <div className="hero-arch">
      <div className="hero-name-kicker">THE<br/>WEDDING OF</div>
      <h1><span>{wedding.groom}</span><i>&amp;</i><span>{wedding.bride}</span></h1>
      <SectionMark/>
    </div>
    <div className="home-date-block">
      <div className={'date-reveal ' + (dateVisible ? 'date-reveal-visible' : '')}>
        <span className="date-caption">SAVE THE DATE</span>
        <strong>{wedding.dateLine}</strong>
        <span className="date-city">{wedding.city}</span>
      </div>
      <button className="save-date-button" onClick={saveWeddingDate}><CalendarDays size={15}/> ADD WEDDING DATE</button>
      <a href="#story" className="home-scroll" onClick={onNavigate} aria-label="Scroll to our story"><ArrowDown size={21}/></a>
    </div>
  </section>;
}

function PhotoStack({ photos, className = '' }) {
  return <div className={'photo-stack ' + className}>
    {photos.slice(0, 3).map((photo, index) => <figure className={'stack-photo stack-photo-' + (index + 1)} key={photo.src}>
      <img src={photo.src} alt={photo.alt} loading="lazy"/>
    </figure>)}
  </div>;
}

function StoryPanel({ galleryTrack }) {
  return <section className="story-panel" id="story">
    <div className="story-top">
      <div className="story-heading reveal"><SectionMark/><h2>Our Story</h2><p>{wedding.story}</p></div>
      <div className="story-feature reveal"><img src={wedding.storyImage} alt="Aarav and Meera together" loading="lazy"/></div>
    </div>
    <div className="moments-bottom" id="gallery">
      <div className="moments-heading reveal"><SectionMark/><h2>A Few Moments</h2></div>
      <div className="moments-track-wrap">
        <button className="mini-arrow mini-arrow-left" onClick={() => scrollTrack(galleryTrack, -1)} aria-label="Previous moments"><ArrowLeft size={15}/></button>
        <div className="moments-track" ref={galleryTrack}>
          {wedding.gallery.map((photo, index) => <figure className={'moment-card moment-card-' + (index + 1)} key={photo.src}>
            <img src={photo.src} alt={photo.alt} loading="lazy"/>
            <figcaption>{photo.note}</figcaption>
          </figure>)}
        </div>
        <button className="mini-arrow mini-arrow-right" onClick={() => scrollTrack(galleryTrack, 1)} aria-label="Next moments"><ArrowRight size={15}/></button>
      </div>
      <div className="moment-dots" aria-hidden="true"><i/><i/><i/><i/><i/></div>
    </div>
  </section>;
}

function EventCard({ event, index, active, onCalendar }) {
  return <article className={'event-card ' + event.tone + (active ? ' is-active' : '')}>
    <div className="event-photo-wrap">
      <img src={event.image} alt={event.name + ' celebration'} className="event-photo" loading="lazy"/>
    </div>
    <div className="event-card-body">
      <span className="event-symbol">{event.symbol}</span>
      <h3>{event.name}</h3>
      <div className="event-meta"><CalendarDays size={13}/><span>{event.date}</span></div>
      <div className="event-meta"><Clock3 size={13}/><span>{event.time}</span></div>
      <div className="event-meta"><MapPin size={13}/><span>{event.venue}</span></div>
      <div className="event-dress"><span>DRESS CODE</span><strong>{event.dress}</strong></div>
      <a className="event-instagram" href={'https://www.instagram.com/' + event.handle + '/'} target="_blank" rel="noreferrer"><Instagram size={13}/> @{event.handle}</a>
      <button className="event-calendar" onClick={() => onCalendar(event)}><CalendarDays size={14}/> ADD TO CALENDAR</button>
    </div>
    <span className="event-number">0{index + 1}</span>
  </article>;
}

function CelebrationsPanel({ eventsTrack, activeEvent, onEventScroll, onCalendar, onAllCalendar }) {
  return <section className="celebrations-panel" id="celebrations">
    <div className="celebrations-background" style={{ backgroundImage: 'linear-gradient(rgba(12,22,14,.72), rgba(12,22,14,.76)), url("' + wedding.venueImage + '")' }}/>
    <div className="celebration-heading reveal">
      <SectionMark/>
      <h2>The Celebrations</h2>
      <p>Four days of love, laughter &amp; togetherness</p>
    </div>
    <div className="celebration-carousel">
      <div className="event-track" ref={eventsTrack} onScroll={onEventScroll}>
        {wedding.events.map((event, index) => <EventCard key={event.id} event={event} index={index} active={activeEvent === index} onCalendar={onCalendar}/>)}
      </div>
      <div className="event-carousel-controls">
        <button onClick={() => scrollTrack(eventsTrack, -1)} aria-label="Previous function"><ArrowLeft size={17}/></button>
        <div className="event-indicators">{wedding.events.map((event, index) => <span key={event.id} className={activeEvent === index ? 'selected' : ''}/>)}</div>
        <button onClick={() => scrollTrack(eventsTrack, 1)} aria-label="Next function"><ArrowRight size={17}/></button>
      </div>
    </div>
    <button className="all-calendar-button" onClick={onAllCalendar}><CalendarDays size={15}/> ADD ALL FUNCTIONS TO CALENDAR</button>
  </section>;
}

function SocialPanel() {
  return <section className="social-panel">
    <div className="social-top">
      <div className="instagram-large"><Instagram size={34}/></div>
      <h2>Follow Our Wedding Journey</h2>
      <a className="instagram-handle" href={'https://www.instagram.com/' + wedding.mainInstagram + '/'} target="_blank" rel="noreferrer">@{wedding.mainInstagram} <ExternalLink size={13}/></a>
      <PhotoStack photos={wedding.gallery.slice(0, 3)} className="social-stack"/>
    </div>
    <div className="destination-photo" style={{ backgroundImage: 'linear-gradient(0deg, rgba(24,28,22,.05), rgba(24,28,22,.03)), url("' + wedding.venueImage + '")' }}>
      <div className="destination-arch"><SectionMark/><span>UDAIPUR, RAJASTHAN</span><strong>{wedding.venue}</strong><a href="https://www.google.com/maps/search/?api=1&query=Lake+Palace+Udaipur+Rajasthan" target="_blank" rel="noreferrer"><MapPin size={13}/> VIEW LOCATION</a></div>
    </div>
  </section>;
}

function FilmSection({ videoRef, filmPlaying, onToggle, onEnded }) {
  return <section className="film-afterword" id="film">
    <div className="film-copy">
      <span className="film-eyebrow">A MOMENT IN MOTION</span>
      <h2>Before the<br/><i>big day.</i></h2>
      <p>A little film of two people, one story, and the places that hold our memories.</p>
      <span className="film-signature">{wedding.groom} &amp; {wedding.bride}</span>
    </div>
    <div className="film-frame">
      <video ref={videoRef} src={wedding.film} poster={wedding.filmPoster} playsInline preload="metadata" controls={filmPlaying} onEnded={onEnded}/>
      {!filmPlaying && <button className="film-play" onClick={onToggle} aria-label="Play the pre-wedding film"><Play size={24} fill="currentColor"/></button>}
      <span className="film-caption">OUR PRE-WEDDING FILM · SAMPLE VIDEO</span>
    </div>
  </section>;
}

export default function App() {
  const [opened, setOpened] = useState(false);
  const [dateVisible, setDateVisible] = useState(false);
  const [activeEvent, setActiveEvent] = useState(2);
  const [mobileMenu, setMobileMenu] = useState(false);
  const [filmPlaying, setFilmPlaying] = useState(false);
  const eventsTrack = useRef(null);
  const galleryTrack = useRef(null);
  const videoRef = useRef(null);
  useReveal(opened);

  const openSite = () => {
    setOpened(true);
    document.body.classList.add('site-open');
    window.scrollTo({ top: 0, behavior: 'auto' });
  };

  useEffect(() => {
    if (!opened) return;
    const timer = window.setTimeout(() => setDateVisible(true), 180);
    return () => window.clearTimeout(timer);
  }, [opened]);

  useEffect(() => {
    if (!opened || !eventsTrack.current) return;
    const track = eventsTrack.current;
    const selected = track.children[activeEvent];
    if (selected) {
      const left = selected.offsetLeft - (track.clientWidth - selected.clientWidth) / 2;
      track.scrollTo({ left, behavior: 'auto' });
    }
  }, [opened]);

  const onEventScroll = () => {
    const track = eventsTrack.current;
    if (!track) return;
    const center = track.scrollLeft + track.clientWidth / 2;
    let nearest = 0;
    let distance = Infinity;
    Array.from(track.children).forEach((child, index) => {
      const childCenter = child.offsetLeft + child.clientWidth / 2;
      const nextDistance = Math.abs(center - childCenter);
      if (nextDistance < distance) {
        distance = nextDistance;
        nearest = index;
      }
    });
    setActiveEvent((current) => current === nearest ? current : nearest);
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
  const weddingEvent = wedding.events.find((event) => event.id === 'wedding');
  const saveWeddingDate = () => downloadCalendarEvents([weddingEvent], 'aarav-meera-wedding-date.ics');
  const saveOneEvent = (event) => downloadCalendarEvents([event], 'aarav-meera-' + event.id + '.ics');
  const saveAllEvents = () => downloadCalendarEvents(wedding.events, 'aarav-meera-all-wedding-functions.ics');

  if (!opened) return <Intro onOpen={openSite}/>;

  return <div className="invitation-page">
    <main className="invitation-board">
    <HeroPanel onNavigate={closeMenu} dateVisible={dateVisible} saveWeddingDate={saveWeddingDate}/>
    <StoryPanel galleryTrack={galleryTrack}/>
    <CelebrationsPanel eventsTrack={eventsTrack} activeEvent={activeEvent} onEventScroll={onEventScroll} onCalendar={saveOneEvent} onAllCalendar={saveAllEvents}/>
    <SocialPanel/>
    </main>
    <FilmSection videoRef={videoRef} filmPlaying={filmPlaying} onToggle={playFilm} onEnded={() => setFilmPlaying(false)}/>
  </div>;
}
