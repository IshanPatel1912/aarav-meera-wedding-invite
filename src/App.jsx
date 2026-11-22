import { useEffect, useRef, useState } from 'react';
import {
  ArrowDown, ArrowLeft, ArrowRight, CalendarDays, Clock3, ExternalLink,
  Instagram, MapPin, Play
} from 'lucide-react';
import { wedding } from './data';

function scrollByPage(ref, direction) {
  const track = ref.current;
  if (!track) return;
  track.scrollBy({ left: track.clientWidth * 0.72 * direction, behavior: 'smooth' });
}

function Ornament({ className = '' }) {
  return <span className={'ornament ' + className} aria-hidden="true">❀</span>;
}

function DividerOrnament({ className = '' }) {
  return <div className={'divider-ornament ' + className}><span/><Ornament/><span/></div>;
}

function icsEscape(value = '') {
  return String(value).replace(/\\/g, '\\\\').replace(/\r?\n/g, '\\n').replace(/,/g, '\\,').replace(/;/g, '\\;');
}

function icsDate(value) {
  return new Date(value).toISOString().replace(/[-:]/g, '').replace(/\.\d{3}Z$/, 'Z');
}

function downloadCalendar(events, fileName) {
  if (!events?.length) return;
  const stamp = icsDate(new Date().toISOString());
  const entries = events.map((event) => {
    const start = new Date(event.startAt);
    const finish = new Date(start.getTime() + (event.durationMinutes || 180) * 60000);
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
      'DTEND:' + icsDate(finish.toISOString()),
      'SUMMARY:' + icsEscape(event.name + ' — ' + wedding.groom + ' & ' + wedding.bride),
      'LOCATION:' + icsEscape(event.venue + ', ' + wedding.city),
      'DESCRIPTION:' + icsEscape(description),
      'END:VEVENT'
    ].join('\r\n');
  });
  const content = [
    'BEGIN:VCALENDAR', 'VERSION:2.0',
    'PRODID:-//Aarav and Meera//Wedding Invitation//EN',
    'CALSCALE:GREGORIAN', 'METHOD:PUBLISH', ...entries, 'END:VCALENDAR'
  ].join('\r\n');
  const blob = new Blob([content], { type: 'text/calendar;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement('a');
  anchor.href = url;
  anchor.download = fileName;
  document.body.appendChild(anchor);
  anchor.click();
  anchor.remove();
  window.setTimeout(() => URL.revokeObjectURL(url), 1500);
}

function Intro({ onOpen }) {
  const [opening, setOpening] = useState(false);
  const open = () => {
    if (opening) return;
    setOpening(true);
    window.setTimeout(onOpen, 950);
  };
  return <section className={'invitation-intro ' + (opening ? 'is-opening' : '')}>
    <div className="intro-paper-grain"/>
    <span className="intro-botanical intro-botanical-left">❧</span>
    <span className="intro-botanical intro-botanical-right">❧</span>
    <div className="intro-topline"><span>AN INVITATION TO CELEBRATE</span><span>{wedding.city}</span></div>
    <div className="intro-card">
      <span className="intro-card-kicker">TOGETHER WITH OUR FAMILIES</span>
      <DividerOrnament/>
      <h1>{wedding.groom} <i>&amp;</i> {wedding.bride}</h1>
      <p>{wedding.dateLine}</p>
      <span className="intro-city">{wedding.city}</span>
      <button className="intro-open-button" onClick={open}><span className="wax-monogram">{wedding.monogram}</span><span>OPEN INVITATION <ArrowDown size={14}/></span></button>
    </div>
    <div className="intro-footer">A CELEBRATION OF LOVE · FAMILY · TOGETHERNESS</div>
  </section>;
}

function HeroPanel({ dateVisible, onAddWedding }) {
  return <section className="panel hero-panel" id="home">
    <div className="hero-background" style={{ backgroundImage: 'url("' + wedding.heroImage + '")' }}/>
    <div className="hero-overlay"/>
    <header className="hero-navigation">
      <a className="nav-flower" href="#home" aria-label="Home">❀</a>
      <nav>
        <a href="#home">Home</a>
        <a href="#story">Our Story</a>
        <a href="#celebrations">Functions</a>
        <a href="#gallery">Gallery</a>
      </nav>
    </header>
    <div className="name-arch">
      <span className="hero-kicker">THE<br/>WEDDING OF</span>
      <h1><span>{wedding.groom}</span><i>&amp;</i><span>{wedding.bride}</span></h1>
      <DividerOrnament/>
    </div>
    <div className={'hero-date-reveal ' + (dateVisible ? 'revealed' : '')}>
      <span className="hero-save-label">SAVE THE DATE</span>
      <strong>{wedding.dateLine}</strong>
      <span>{wedding.city.toUpperCase()}</span>
    </div>
    <button className="hero-add-calendar" onClick={onAddWedding}><CalendarDays size={13}/> ADD WEDDING DATE</button>
    <a className="hero-scroll" href="#story" aria-label="Discover the invitation"><ArrowDown size={20}/></a>
  </section>;
}

function GalleryPanel({ galleryRef, activePhoto, onPhotoScroll }) {
  return <section className="panel story-panel" id="story">
    <div className="story-upper">
      <div className="story-leaves story-leaves-top">❧</div>
      <div className="story-heading">
        <DividerOrnament/>
        <h2>Our Story</h2>
        <p>{wedding.story}</p>
      </div>
      <div className="story-main-photo"><img src={wedding.storyImage} alt="Aarav and Meera together" /></div>
    </div>
    <div className="moments-section" id="gallery">
      <div className="moments-heading">
        <DividerOrnament/>
        <h2>A Few Moments</h2>
      </div>
      <div className="moments-carousel">
        <button className="gallery-arrow gallery-arrow-left" onClick={() => scrollByPage(galleryRef, -1)} aria-label="Previous photographs"><ArrowLeft size={15}/></button>
        <div className="moments-track" ref={galleryRef} onScroll={onPhotoScroll}>
          {wedding.gallery.map((photo, index) => <figure className={'moments-photo moments-photo-' + (index + 1) + (activePhoto === index ? ' active-photo' : '')} key={photo.src}>
            <img src={photo.src} alt={photo.alt} loading="lazy"/>
          </figure>)}
        </div>
        <button className="gallery-arrow gallery-arrow-right" onClick={() => scrollByPage(galleryRef, 1)} aria-label="Next photographs"><ArrowRight size={15}/></button>
      </div>
      <div className="gallery-pagination">{wedding.gallery.map((photo, index) => <span key={photo.src} className={activePhoto === index ? 'active' : ''}/>)}</div>
    </div>
  </section>;
}

function FunctionCard({ event, index, isActive, onCalendar }) {
  return <article className={'function-card ' + (isActive ? 'function-active' : 'function-side')}>
    <div className="function-image"><img src={event.image} alt={event.name + ' function'} loading="lazy"/><span>0{index + 1}</span></div>
    <div className="function-content">
      <span className="function-symbol">{event.symbol}</span>
      <h3>{event.name}</h3>
      <div className="function-detail"><CalendarDays size={12}/><span>{event.dateShort}</span></div>
      <div className="function-detail"><Clock3 size={12}/><span>{event.time}</span></div>
      <div className="function-detail"><MapPin size={12}/><span>{event.venue}</span></div>
      <div className="function-dress"><span>DRESS CODE</span><strong>{event.dress}</strong></div>
      <a className="function-instagram" href={'https://www.instagram.com/' + event.handle + '/'} target="_blank" rel="noreferrer"><Instagram size={12}/> @{event.handle}</a>
      <button className="function-calendar" onClick={() => onCalendar(event)}><CalendarDays size={13}/> ADD TO CALENDAR</button>
    </div>
  </article>;
}

function CelebrationsPanel({ eventTrack, activeEvent, onEventScroll, onCalendar, onAllCalendar }) {
  return <section className="panel celebrations-panel" id="celebrations">
    <div className="celebrations-background" style={{ backgroundImage: 'url("' + wedding.celebrationsImage + '")' }}/>
    <div className="celebrations-shade"/>
    <header className="celebrations-heading">
      <DividerOrnament/>
      <h2>The Celebrations</h2>
    </header>
    <div className="functions-carousel">
      <div className="functions-track" ref={eventTrack} onScroll={onEventScroll}>
        {wedding.events.map((event, index) => <FunctionCard key={event.id} event={event} index={index} isActive={activeEvent === index} onCalendar={onCalendar}/>)}
      </div>
      <div className="functions-controls">
        <button onClick={() => scrollByPage(eventTrack, -1)} aria-label="Previous function"><ArrowLeft size={17}/></button>
        <div className="functions-dots">{wedding.events.map((event, index) => <span key={event.id} className={activeEvent === index ? 'active' : ''}/>)}</div>
        <button onClick={() => scrollByPage(eventTrack, 1)} aria-label="Next function"><ArrowRight size={17}/></button>
      </div>
    </div>
    <button className="all-functions-calendar" onClick={onAllCalendar}><CalendarDays size={13}/> ADD ALL FUNCTIONS TO CALENDAR</button>
  </section>;
}

function SocialPanel() {
  return <section className="panel social-panel">
    <div className="social-upper">
      <Instagram className="instagram-mark" size={34} strokeWidth={1.7}/>
      <h2>Follow Our Wedding Journey</h2>
      <a className="social-handle" href={'https://www.instagram.com/' + wedding.mainInstagram + '/'} target="_blank" rel="noreferrer">@{wedding.mainInstagram} <ExternalLink size={12}/></a>
      <div className="social-photo-stack">
        {wedding.socialPhotos.map((photo, index) => <figure className={'social-photo social-photo-' + (index + 1)} key={photo.src}><img src={photo.src} alt={photo.alt} loading="lazy"/></figure>)}
      </div>
    </div>
    <div className="destination-panel" style={{ backgroundImage: 'url("' + wedding.venueImage + '")' }}>
      <div className="destination-arch">
        <DividerOrnament/>
        <span>UDAIPUR, RAJASTHAN</span>
        <h3>{wedding.venue}</h3>
        <a href={wedding.mapUrl} target="_blank" rel="noreferrer"><MapPin size={12}/> VIEW LOCATION</a>
      </div>
    </div>
  </section>;
}

function FilmAfterword({ videoRef, playing, onPlay, onEnded }) {
  return <section className="film-afterword" id="film">
    <div className="film-description">
      <span>A MOMENT IN MOTION</span>
      <h2>Before the<br/><i>big day.</i></h2>
      <p>A little film of two people, one story, and the places that hold our memories.</p>
      <em>{wedding.groom} &amp; {wedding.bride}</em>
    </div>
    <div className="film-screen">
      <video ref={videoRef} src={wedding.film} poster={wedding.filmPoster} playsInline preload="metadata" controls={playing} onEnded={onEnded}/>
      {!playing && <button onClick={onPlay} aria-label="Play the pre-wedding film"><Play size={24} fill="currentColor"/></button>}
      <span>OUR PRE-WEDDING FILM</span>
    </div>
  </section>;
}

export default function App() {
  const [opened, setOpened] = useState(false);
  const [dateVisible, setDateVisible] = useState(false);
  const [activeEvent, setActiveEvent] = useState(1);
  const [activePhoto, setActivePhoto] = useState(0);
  const [filmPlaying, setFilmPlaying] = useState(false);
  const eventTrack = useRef(null);
  const galleryRef = useRef(null);
  const videoRef = useRef(null);

  useEffect(() => {
    if (!opened) return;
    const timer = window.setTimeout(() => setDateVisible(true), 240);
    return () => window.clearTimeout(timer);
  }, [opened]);

  useEffect(() => {
    if (!opened || !eventTrack.current) return;
    const track = eventTrack.current;
    const selected = track.children[activeEvent];
    if (!selected) return;
    const left = selected.offsetLeft - (track.clientWidth - selected.clientWidth) / 2;
    track.scrollTo({ left: Math.max(0, left), behavior: 'instant' });
  }, [opened]);

  const handleEventScroll = () => {
    const track = eventTrack.current;
    if (!track) return;
    const center = track.scrollLeft + track.clientWidth / 2;
    let best = 0;
    let distance = Infinity;
    Array.from(track.children).forEach((card, index) => {
      const cardCenter = card.offsetLeft + card.clientWidth / 2;
      const delta = Math.abs(center - cardCenter);
      if (delta < distance) {
        best = index;
        distance = delta;
      }
    });
    setActiveEvent((current) => current === best ? current : best);
  };

  const handlePhotoScroll = () => {
    const track = galleryRef.current;
    if (!track) return;
    const center = track.scrollLeft + track.clientWidth / 2;
    let best = 0;
    let distance = Infinity;
    Array.from(track.children).forEach((card, index) => {
      const cardCenter = card.offsetLeft + card.clientWidth / 2;
      const delta = Math.abs(center - cardCenter);
      if (delta < distance) {
        best = index;
        distance = delta;
      }
    });
    setActivePhoto((current) => current === best ? current : best);
  };

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
  const addWeddingDate = () => downloadCalendar([weddingEvent], 'aarav-meera-wedding-date.ics');
  const addFunction = (event) => downloadCalendar([event], 'aarav-meera-' + event.id + '.ics');
  const addAllFunctions = () => downloadCalendar(wedding.events, 'aarav-meera-all-functions.ics');

  if (!opened) return <Intro onOpen={() => setOpened(true)}/>;

  return <div className="website-wrap">
    <main className="four-panel-board">
      <HeroPanel dateVisible={dateVisible} onAddWedding={addWeddingDate}/>
      <GalleryPanel galleryRef={galleryRef} activePhoto={activePhoto} onPhotoScroll={handlePhotoScroll}/>
      <CelebrationsPanel eventTrack={eventTrack} activeEvent={activeEvent} onEventScroll={handleEventScroll} onCalendar={addFunction} onAllCalendar={addAllFunctions}/>
      <SocialPanel/>
    </main>
    <FilmAfterword videoRef={videoRef} playing={filmPlaying} onPlay={playFilm} onEnded={() => setFilmPlaying(false)}/>
  </div>;
}
