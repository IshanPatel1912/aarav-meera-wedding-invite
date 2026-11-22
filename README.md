# Aarav & Meera — Wedding Invitation

A React + Vite wedding invitation rebuilt around the supplied four-panel visual reference.

## Design
- Full-height four-panel desktop composition: photo-led hero, ivory story and photo gallery, forest-green function carousel with a plum active card, and Instagram / palace-arch panel.
- Mobile layout stacks the same four sections vertically.
- Animated opening invitation and date reveal on the hero panel.
- Swipeable photo gallery and function carousel.
- Pre-wedding film section beneath the four-panel composition.

## Calendar
- The hero panel adds the wedding date to a calendar.
- Each function card can be added individually.
- A separate action downloads every function in one `.ics` calendar file.
- Event date/time, duration, venue, dress code and Instagram handle are editable in `src/data.js`.
- The current content is sample data only. The displayed times and calendar durations should be replaced with the real schedule before sharing the invitation.

## Setup
```bash
npm install
npm run dev
```

Production build:
```bash
npm run build
```

## Vercel
- Framework: Vite
- Build command: `npm run build`
- Output directory: `dist`

## Sample media
Sample photographs are loaded from Unsplash and the pre-wedding video from Pexels. Replace them with the couple's approved images and video before public launch.