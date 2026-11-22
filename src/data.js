// Single source of truth for all wedding content. Edit here only.
// Times are local Asia/Kolkata (IST). Dates: YYYY-MM-DD, times: 24h HH:MM.
const photo = (id, width = 1200) =>
  'https://images.unsplash.com/' + id + '?auto=format&fit=crop&w=' + width + '&q=85';

export const wedding = {
  bride: 'Meera',
  groom: 'Aarav',
  monogram: 'A&M',
  dateLine: '12 — 15 FEB 2027',
  city: 'Udaipur, Rajasthan',
  timezone: 'Asia/Kolkata',
  mainInstagram: 'aaravmeera.wedding',
  story: 'A chance meeting, endless conversations, shared dreams, and now, a forever to look forward to.',
  heroImage: photo('photo-1519741497674-611481863552', 1800),
  storyImage: photo('photo-1537633552985-df8429e8048b', 1100),
  celebrationsImage: photo('photo-1564013799919-ab600027ffc6', 1400),
  venue: 'The Lake Palace',
  destinationText: 'Where our forever begins',
  venueImage: photo('photo-1566073771259-6a8506099945', 1200),
  mapUrl: 'https://www.google.com/maps/search/?api=1&query=Lake+Palace+Udaipur+Rajasthan',
  // The event used by the hero "Add to calendar" button
  mainEventId: 'wedding',
  events: [
    { id: 'haldi', name: 'Haldi', symbol: '❀', subtitle: 'A little sunshine, a lot of laughter',
      date: '2027-02-12', start: '10:00', end: '13:00', venue: 'Poolside Garden',
      dress: 'Yellow / Pastels', handle: 'aaravmeera.haldi',
      image: photo('photo-1606800052052-a08af7148866', 800) },
    { id: 'mehendi', name: 'Mehendi', symbol: '❋', subtitle: 'Stories written in henna',
      date: '2027-02-12', start: '16:00', end: '19:00', venue: 'The Garden Pavilion',
      dress: 'Shades of green', handle: 'aaravmeera.mehendi',
      image: photo('photo-1594465919760-441fe5908ab0', 800) },
    { id: 'sangeet', name: 'Sangeet', symbol: '♪', subtitle: 'One night, endless memories',
      date: '2027-02-13', start: '19:00', end: '23:00', venue: 'The Lake Lawn',
      dress: 'Glam & Shimmer', handle: 'aaravmeera.sangeet',
      image: photo('photo-1511795409834-ef04bbd61622', 900) },
    { id: 'wedding', name: 'Wedding', symbol: '∞', subtitle: 'And so our forever begins',
      date: '2027-02-14', start: '09:00', end: '13:00', venue: 'City Palace',
      dress: 'Traditional Indian', handle: 'aaravmeera.wedding',
      image: photo('photo-1519741497674-611481863552', 900) }
  ],
  gallery: [
    { src: photo('photo-1537633552985-df8429e8048b', 900), alt: 'A couple sharing a quiet moment' },
    { src: photo('photo-1511285560929-80b456fea0bc', 900), alt: 'A couple celebrating together' },
    { src: photo('photo-1529636798458-92182e662485', 900), alt: 'A romantic couple portrait' },
    { src: photo('photo-1523438885200-e635ba2c371e', 900), alt: 'Wedding details' },
    { src: photo('photo-1525258946800-98cfd641d0de', 900), alt: 'A couple at sunset' }
  ],
  socialPhotos: [
    { src: photo('photo-1511285560929-80b456fea0bc', 700), alt: 'A couple in the garden' },
    { src: photo('photo-1537633552985-df8429e8048b', 800), alt: 'A couple portrait' },
    { src: photo('photo-1529636798458-92182e662485', 700), alt: 'A couple sharing a moment' }
  ],
  film: 'https://videos.pexels.com/video-files/3195394/3195394-hd_1920_1080_25fps.mp4',
  filmPoster: photo('photo-1525258946800-98cfd641d0de', 1400)
};
