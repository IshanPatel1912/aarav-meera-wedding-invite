import { useEffect, useState } from 'react';
import { wedding } from '../data';

// Envelope with wax seal. Always renders ABOVE the live website, so the page can never be blank.
export default function Intro({ phase, onOpen, onDone }) {
  const [reduced] = useState(() => window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches);

  useEffect(() => {
    if (phase !== 'opening') return undefined;
    const t = setTimeout(onDone, reduced ? 350 : 2500);
    return () => clearTimeout(t);
  }, [phase, reduced, onDone]);

  useEffect(() => {
    if (phase === 'done') return undefined;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = prev; };
  }, [phase]);

  if (phase === 'done') return null;

  return (
    <div className={'intro ' + (phase === 'opening' ? 'is-opening' : '') + (reduced ? ' reduced' : '')} role="dialog" aria-label="Wedding invitation">
      <div className="intro-grain" />
      <p className="intro-kicker">TOGETHER WITH OUR FAMILIES</p>
      <h1 className="intro-names">{wedding.groom} <i>&amp;</i> {wedding.bride}</h1>
      <p className="intro-sub">request the pleasure of your company</p>

      <button className="envelope" onClick={onOpen} disabled={phase === 'opening'} aria-label="Open the invitation">
        <span className="env-back" />
        <span className="env-card">
          <small>THE WEDDING OF</small>
          <b>{wedding.groom} &amp; {wedding.bride}</b>
          <em>{wedding.dateLine}</em>
        </span>
        <span className="env-front" />
        <span className="env-flap" />
        <span className="wax-seal"><span>{wedding.monogram}</span></span>
      </button>

      <p className="intro-hint">Tap the seal to open</p>
    </div>
  );
}
