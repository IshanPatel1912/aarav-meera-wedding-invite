import { useState } from 'react';
import { CalendarDays, ChevronLeft, ChevronRight, Clock3, Instagram, MapPin, Shirt, CalendarPlus } from 'lucide-react';
import { wedding } from '../data';
import { Divider, Reveal } from './Ornaments';
import { useSwipe, ringOffset } from '../lib/useSwipe';
import { formatDate, formatTime } from '../lib/calendar';

function Card({ event, off, onSelect, onCalendar }) {
  const active = off === 0;
  return (
    <article
      className={'f-card ' + (active ? 'is-active' : 'is-side')}
      data-off={Math.abs(off) > 1 ? 'hide' : off}
      aria-hidden={!active}
      onClick={() => !active && onSelect()}
    >
      <div className="f-image"><img src={event.image} alt={event.name + ' celebration'} loading="lazy" draggable="false" /></div>
      <div className="f-body">
        <span className="f-symbol" aria-hidden="true">{event.symbol}</span>
        <h3>{event.name}</h3>
        <p><CalendarDays size={12} /><span>{formatDate(event.date)}</span></p>
        <p><Clock3 size={12} /><span>{formatTime(event.start)} – {formatTime(event.end)}</span></p>
        <p><MapPin size={12} /><span>{event.venue}</span></p>
        <p className="f-dress"><Shirt size={12} /><span><small>Dress Code</small>{event.dress}</span></p>
        {event.handle && (
          <a className="f-insta" href={'https://www.instagram.com/' + event.handle + '/'} target="_blank" rel="noreferrer" tabIndex={active ? 0 : -1}>
            <Instagram size={12} /> @{event.handle}
          </a>
        )}
        <button className="f-cal" tabIndex={active ? 0 : -1} onClick={(e) => { e.stopPropagation(); onCalendar(event); }}>
          <CalendarPlus size={13} /> Add to Calendar
        </button>
      </div>
    </article>
  );
}

export default function Celebrations({ onAddOne, onAddAll }) {
  const events = wedding.events;
  const n = events.length;
  const [active, setActive] = useState(Math.min(2, n - 1));
  const go = (d) => setActive((a) => (a + d + n) % n);
  const swipe = useSwipe(() => go(-1), () => go(1));

  return (
    <section className="panel celebrations" id="celebrations">
      <div className="cel-bg" style={{ backgroundImage: `url("${wedding.celebrationsImage}")` }} />
      <div className="cel-shade" />
      <div className="panel-inner">
        <Reveal className="cel-head">
          <Divider className="light" />
          <h2>The Celebrations</h2>
        </Reveal>

        <div className="f-stage" {...swipe} role="group" aria-roledescription="carousel" aria-label="Wedding celebrations">
          {events.map((e, i) => (
            <Card key={e.id} event={e} off={ringOffset(i, active, n)} onSelect={() => setActive(i)} onCalendar={onAddOne} />
          ))}
        </div>

        <div className="f-controls">
          <button className="arrow" onClick={() => go(-1)} aria-label="Previous celebration"><ChevronLeft size={18} /></button>
          <div className="dots light" role="tablist" aria-label="Choose celebration">
            {events.map((e, i) => (
              <button key={e.id} role="tab" aria-selected={i === active} aria-label={e.name} className={i === active ? 'active' : ''} onClick={() => setActive(i)} />
            ))}
          </div>
          <button className="arrow" onClick={() => go(1)} aria-label="Next celebration"><ChevronRight size={18} /></button>
        </div>

        <button className="all-cal" onClick={onAddAll}><CalendarPlus size={13} /> Add all celebrations to calendar</button>
      </div>
    </section>
  );
}
