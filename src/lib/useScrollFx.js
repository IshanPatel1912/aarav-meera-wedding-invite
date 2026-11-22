import { useEffect } from 'react';

// Scroll effects: sets --sy / --progress on <html>, and applies parallax to
// elements marked data-parallax (translateY factor) or data-parallax-bg (bg-position factor).
export function useScrollFx() {
  useEffect(() => {
    const root = document.documentElement;
    const reduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let raf = 0;
    const update = () => {
      raf = 0;
      const y = window.scrollY || 0;
      const max = Math.max(1, root.scrollHeight - window.innerHeight);
      root.style.setProperty('--sy', String(Math.round(y)));
      root.style.setProperty('--progress', String(Math.min(1, y / max)));
      if (reduced) return;
      const vh = window.innerHeight;
      document.querySelectorAll('[data-parallax],[data-parallax-bg]').forEach((el) => {
        const host = el.closest('.panel') || el;
        const r = host.getBoundingClientRect();
        if (r.bottom < -100 || r.top > vh + 100) return;
        const off = r.top + r.height / 2 - vh / 2;
        if (el.dataset.parallax) el.style.transform = 'translate3d(0,' + (-off * parseFloat(el.dataset.parallax)).toFixed(1) + 'px,0)';
        if (el.dataset.parallaxBg) el.style.backgroundPositionY = 'calc(50% + ' + (-off * parseFloat(el.dataset.parallaxBg)).toFixed(1) + 'px)';
      });
    };
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(update); };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);
}
