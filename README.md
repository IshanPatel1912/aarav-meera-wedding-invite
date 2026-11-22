# Ivory Wedding Invitation — React + Vite

A responsive, scroll-led Indian wedding invitation prototype inspired by the editorial Ivory aesthetic.

## Features
- Interactive envelope and wax-seal opening reveal
- Four-panel editorial layout inspired by the supplied reference image
- Animated envelope opening and wedding-date reveal
- Swipeable Haldi, Mehendi, Sangeet and Wedding cards
- Date, local start time, venue, dress code and individual Instagram handle on every function card
- Individual and all-functions calendar downloads using standard `.ics` files
- Smooth swipeable pre-wedding photo gallery
- Pre-wedding film section below the four-panel invitation
- Venue details and Google Maps link
- Responsive mobile layouts

Calendar dates and times, including the demo durations used in downloaded calendar entries, are editable in `src/data.js`.

## Demo content
All names, dates, venues, Instagram handles, photos and video are placeholders. Update the wedding object in `src/data.js` when the real wedding details are ready.

## Run locally
```bash
npm install
npm run dev
```

## Build
```bash
npm run build
```

## Vercel
Import this repository into Vercel. Framework: Vite. Build command: `npm run build`. Output directory: `dist`. No environment variables are required.

## Media
Demo photographs are loaded from Unsplash and the sample video from Pexels. Replace the URLs in `src/data.js` with the couple's approved media before publishing.
