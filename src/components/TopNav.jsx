import { useEffect, useState } from 'react';
import { Lotus } from './Ornaments';

export default function TopNav() {
  const [solid, setSolid] = useState(false);
  useEffect(() => {
    const f = () => setSolid(window.scrollY > window.innerHeight * 0.6);
    f();
    window.addEventListener('scroll', f, { passive: true });
    return () => window.removeEventListener('scroll', f);
  }, []);
  return (
    <header className={'topnav ' + (solid ? 'solid' : '')}>
      <a href="#home" className="nav-logo" aria-label="Home"><Lotus size={26} /></a>
      <nav aria-label="Primary">
        <a href="#home">Home</a>
        <a href="#story">Our Story</a>
        <a href="#celebrations">Functions</a>
        <a href="#gallery">Gallery</a>
      </nav>
    </header>
  );
}
