import { useRef, useState } from 'react';
import { Play } from 'lucide-react';
import { wedding } from '../data';
import { Reveal } from './Ornaments';

export default function Film() {
  const ref = useRef(null);
  const [started, setStarted] = useState(false);
  const [error, setError] = useState(false);

  const play = () => {
    const v = ref.current;
    if (!v) return;
    setStarted(true);
    const p = v.play();
    if (p && p.catch) p.catch(() => setStarted(false));
  };

  return (
    <section className="film" id="film">
      <Reveal className="film-copy">
        <span>A MOMENT IN MOTION</span>
        <h2>Before the <i>big day</i></h2>
        <p>A little film of two people, one story, and the places that hold our memories.</p>
        <em>{wedding.groom} &amp; {wedding.bride}</em>
      </Reveal>
      <Reveal className="film-screen" delay={120}>
        <video ref={ref} src={wedding.film} poster={wedding.filmPoster} playsInline preload="metadata" controls={started}
          onPlay={() => setStarted(true)} onError={() => setError(true)} />
        {!started && <button className="film-play" onClick={play} aria-label="Play the pre-wedding film"><Play size={26} fill="currentColor" /></button>}
        {error && <p className="film-error">The film could not be loaded right now.</p>}
      </Reveal>
    </section>
  );
}
