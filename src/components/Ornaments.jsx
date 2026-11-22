import { useEffect, useRef, useState } from 'react';

export function Lotus({ size = 22 }) {
  return (
    <svg className="lotus" width={size} height={size} viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="1.1" aria-hidden="true">
      <path d="M20 6c4 4 5 10 0 17-5-7-4-13 0-17Z" />
      <path d="M20 23C14 21 9 16 9 11c5 0 9 3 11 12Zm0 0c6-2 11-7 11-12-5 0-9 3-11 12Z" />
      <path d="M20 24c-6 1-12-1-16-6 3-1 8-1 16 6Zm0 0c6 1 12-1 16-6-3-1-8-1-16 6Z" />
      <path d="M12 31c5 3 11 3 16 0" />
    </svg>
  );
}

export function Divider({ className = '' }) {
  return (
    <div className={'divider ' + className} aria-hidden="true">
      <span /><Lotus /><span />
    </div>
  );
}

// Decorative blossoming branch (bougainvillea-style) for panel corners
export function Branch({ className = '', flip = false }) {
  return (
    <svg className={'branch ' + className + (flip ? ' flip' : '')} viewBox="0 0 220 200" aria-hidden="true">
      <path d="M-5 20 C50 40 90 70 120 130 S170 190 190 200" fill="none" stroke="#5d6b45" strokeWidth="1.6" />
      <path d="M30 30 C60 50 80 60 110 60" fill="none" stroke="#5d6b45" strokeWidth="1.2" />
      {[[40, 34, -30], [70, 58, 20], [98, 92, -40], [118, 128, 30], [140, 160, -20], [64, 40, 60], [96, 62, -10]].map(([x, y, r], i) => (
        <ellipse key={i} cx={x} cy={y} rx="16" ry="7" fill={i % 2 ? '#6f7e52' : '#58663f'} transform={`rotate(${r} ${x} ${y})`} opacity=".92" />
      ))}
      {[[30, 52], [58, 74], [86, 78], [112, 104], [130, 140], [20, 36], [150, 176]].map(([x, y], i) => (
        <g key={i} transform={`translate(${x} ${y})`}>
          {[0, 72, 144, 216, 288].map((a) => <ellipse key={a} cx="0" cy="-6" rx="4.6" ry="7" fill={i % 3 ? '#c23a6b' : '#d9558a'} transform={`rotate(${a})`} opacity=".95" />)}
          <circle r="2" fill="#f1d68a" />
        </g>
      ))}
    </svg>
  );
}

export function useReveal() {
  const ref = useRef(null);
  const [shown, setShown] = useState(() => typeof IntersectionObserver === 'undefined');
  useEffect(() => {
    const el = ref.current;
    if (!el || shown) return undefined;
    const io = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { setShown(true); io.disconnect(); }
    }, { threshold: 0.12 });
    io.observe(el);
    return () => io.disconnect();
  }, [shown]);
  return [ref, shown];
}

export function Reveal({ as: Tag = 'div', className = '', delay = 0, children, ...rest }) {
  const [ref, shown] = useReveal();
  return (
    <Tag ref={ref} className={'reveal ' + (shown ? 'in ' : '') + className} style={{ transitionDelay: delay + 'ms' }} {...rest}>
      {children}
    </Tag>
  );
}
