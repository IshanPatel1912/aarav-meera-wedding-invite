import { useRef } from 'react';

// Pointer-based horizontal swipe. Pair with CSS `touch-action: pan-y`.
export function useSwipe(onPrev, onNext, threshold = 40) {
  const start = useRef(null);
  const swiped = useRef(false);
  return {
    onPointerDown: (e) => { swiped.current = false; start.current = { x: e.clientX, y: e.clientY }; },
    // a swipe must not also count as a click on the card/photo underneath
    onClickCapture: (e) => { if (swiped.current) { swiped.current = false; e.stopPropagation(); e.preventDefault(); } },
    onPointerUp: (e) => {
      if (!start.current) return;
      const dx = e.clientX - start.current.x;
      const dy = e.clientY - start.current.y;
      start.current = null;
      if (Math.abs(dx) > threshold && Math.abs(dx) > Math.abs(dy)) {
        swiped.current = true;
        (dx < 0 ? onNext : onPrev)();
      }
    },
    onPointerCancel: () => { start.current = null; }
  };
}

// shortest signed offset in a ring of n items
export function ringOffset(index, active, n) {
  let d = (index - active) % n;
  if (d > n / 2) d -= n;
  if (d < -n / 2) d += n;
  return d;
}
