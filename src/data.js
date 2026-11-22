const photo = (id, width = 1200) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${width}&q=85`;

export const wedding = {
  bride: 'Meera',
  groom: 'Aarav',
  monogram: 'A&M',
  dateLine: '12 — 15 February 2027',
  city: 'Udaipur, Rajasthan',
  mainInstagram: 'aaravmeera.wedding',
  heroImage: photo('photo-1519741497674-611481863552', 2200),
  story: 'Somewhere between a shared laugh and a thousand little conversations, we found our favourite person. Now, with our families beside us, we are beginning the loveliest chapter yet.',
  events: [
    { id: 'haldi', name: 'Haldi', subtitle: 'A little sunshine, a lot of laughter', date: 'Friday, 12 February 2027', time: '10:00 AM onwards', venue: 'The Courtyard, Udaipur', dress: 'Sunshine yellow & ivory', handle: 'aaravmeera.haldi', image: photo('photo-1606800052052-a08af7148866', 900), tone: 'saffron', symbol: '✳' },
    { id: 'mehendi', name: 'Mehendi', subtitle: 'Stories written in henna', date: 'Friday, 12 February 2027', time: '4:00 PM onwards', venue: 'The Garden Pavilion', dress: 'Shades of green', handle: 'aaravmeera.mehendi', image: photo('photo-1594465919760-441fe5908ab0', 900), tone: 'sage', symbol: '❋' },
    { id: 'sangeet', name: 'Sangeet', subtitle: 'One night, endless memories', date: 'Saturday, 13 February 2027', time: '7:00 PM onwards', venue: 'The Grand Ballroom', dress: 'Jewel tones & a little sparkle', handle: 'aaravmeera.sangeet', image: photo('photo-1511795409834-ef04bbd61622', 900), tone: 'berry', symbol: '✧' },
    { id: 'wedding', name: 'The Wedding', subtitle: 'And so our forever begins', date: 'Sunday, 14 February 2027', time: '9:00 AM onwards', venue: 'The Lake Palace Lawns', dress: 'Traditional Indian · festive', handle: 'aaravmeera.wedding', image: photo('photo-1519741497674-611481863552', 900), tone: 'rose', symbol: '∞' }
  ],
  gallery: [
    { src: photo('photo-1537633552985-df8429e8048b', 1000), alt: 'Aarav and Meera together in a romantic setting', note: 'A favourite afternoon' },
    { src: photo('photo-1511285560929-80b456fea0bc', 1000), alt: 'A couple celebrating together', note: 'A walk to remember' },
    { src: photo('photo-1529636798458-92182e662485', 1000), alt: 'Romantic couple portrait', note: 'The little details' },
    { src: photo('photo-1523438885200-e635ba2c371e', 1000), alt: 'Wedding rings and details', note: 'Golden hour, always' },
    { src: photo('photo-1525258946800-98cfd641d0de', 1000), alt: 'Couple at sunset', note: 'Our kind of joy' }
  ],
  film: 'https://videos.pexels.com/video-files/3195394/3195394-hd_1920_1080_25fps.mp4',
  venue: 'The Lake Palace Lawns',
  address: 'Pichola Lake, Udaipur, Rajasthan, India',
  venueImage: photo('photo-1566073771259-6a8506099945', 1200),
  storyImage: photo('photo-1537633552985-df8429e8048b', 1100),
  detailImage: photo('photo-1523438885200-e635ba2c371e', 800),
  filmPoster: photo('photo-1525258946800-98cfd641d0de', 1200)
};