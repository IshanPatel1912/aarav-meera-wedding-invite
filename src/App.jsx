import { useCallback, useState } from 'react';
import { wedding } from './data';
import { downloadCalendar } from './lib/calendar';
import ErrorBoundary from './components/ErrorBoundary';
import Intro from './components/Intro';
import Hero from './components/Hero';
import Story from './components/Story';
import Celebrations from './components/Celebrations';
import Social from './components/Social';
import Film from './components/Film';

export default function App() {
  // 'closed' -> 'opening' (animation) -> 'done'. The website is mounted the whole time.
  const [phase, setPhase] = useState('closed');
  const open = useCallback(() => setPhase((p) => (p === 'closed' ? 'opening' : p)), []);
  const done = useCallback(() => setPhase('done'), []);

  const main = wedding.events.find((e) => e.id === wedding.mainEventId) || wedding.events[0];
  const addMain = () => downloadCalendar([main], 'aarav-meera-wedding.ics');
  const addOne = (e) => downloadCalendar([e], 'aarav-meera-' + e.id + '.ics');
  const addAll = () => downloadCalendar(wedding.events, 'aarav-meera-all-celebrations.ics');

  return (
    <ErrorBoundary>
      <main className="site">
        <div className="board">
          <Hero ready={phase !== 'closed'} onAddMain={addMain} />
          <Story />
          <Celebrations onAddOne={addOne} onAddAll={addAll} />
          <Social />
        </div>
        <Film />
      </main>
      <Intro phase={phase} onOpen={open} onDone={done} />
    </ErrorBoundary>
  );
}
