import { wedding } from '../data';

const pad = (n) => String(n).padStart(2, '0');
const compact = (date, time) => date.replace(/-/g, '') + 'T' + time.replace(':', '') + '00';

export function icsEscape(v = '') {
  return String(v).replace(/\\/g, '\\\\').replace(/\r?\n/g, '\\n').replace(/,/g, '\\,').replace(/;/g, '\\;');
}

// RFC 5545 line folding at 75 octets
export function fold(line) {
  const enc = new TextEncoder();
  const dec = new TextDecoder();
  const bytes = enc.encode(line);
  if (bytes.length <= 75) return line;
  const parts = [];
  let i = 0;
  let limit = 75;
  while (i < bytes.length) {
    let end = Math.min(i + limit, bytes.length);
    while (end < bytes.length && (bytes[end] & 0xc0) === 0x80) end--; // don't split UTF-8
    parts.push(dec.decode(bytes.slice(i, end)));
    i = end;
    limit = 74;
  }
  return parts.join('\r\n ');
}

const utcStamp = () => {
  const d = new Date();
  return d.getUTCFullYear() + pad(d.getUTCMonth() + 1) + pad(d.getUTCDate()) + 'T' +
    pad(d.getUTCHours()) + pad(d.getUTCMinutes()) + pad(d.getUTCSeconds()) + 'Z';
};

const TIMEZONE = [
  'BEGIN:VTIMEZONE', 'TZID:' + wedding.timezone,
  'BEGIN:STANDARD', 'DTSTART:19700101T000000', 'TZOFFSETFROM:+0530', 'TZOFFSETTO:+0530', 'TZNAME:IST', 'END:STANDARD',
  'END:VTIMEZONE'
];

export function buildIcs(events) {
  const stamp = utcStamp();
  const tz = wedding.timezone;
  const body = events.flatMap((e) => [
    'BEGIN:VEVENT',
    'UID:' + e.id + '-' + e.date + '@aarav-meera-wedding',
    'DTSTAMP:' + stamp,
    'DTSTART;TZID=' + tz + ':' + compact(e.date, e.start),
    'DTEND;TZID=' + tz + ':' + compact(e.date, e.end),
    'SUMMARY:' + icsEscape(e.name + ' — ' + wedding.groom + ' & ' + wedding.bride),
    'LOCATION:' + icsEscape(e.venue + ', ' + wedding.city),
    'DESCRIPTION:' + icsEscape([e.subtitle, 'Dress code: ' + e.dress, 'Instagram: @' + e.handle].join('\n')),
    'END:VEVENT'
  ]);
  const lines = ['BEGIN:VCALENDAR', 'VERSION:2.0', 'PRODID:-//Aarav and Meera//Wedding Invitation//EN',
    'CALSCALE:GREGORIAN', 'METHOD:PUBLISH', 'X-WR-TIMEZONE:' + tz, ...TIMEZONE, ...body, 'END:VCALENDAR'];
  return lines.map(fold).join('\r\n') + '\r\n';
}

export function downloadCalendar(events, fileName) {
  if (!events || !events.length) return;
  const blob = new Blob([buildIcs(events)], { type: 'text/calendar;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = fileName;
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 2000);
}

// ---- display helpers (timezone-safe: pure string/UTC maths) ----
const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

export function formatDate(date) {
  const [y, m, d] = date.split('-').map(Number);
  return DAYS[new Date(Date.UTC(y, m - 1, d)).getUTCDay()] + ', ' + d + ' ' + MONTHS[m - 1] + ' ' + y;
}

export function formatTime(t) {
  const [h, m] = t.split(':').map(Number);
  return ((h + 11) % 12 + 1) + ':' + pad(m) + ' ' + (h < 12 ? 'AM' : 'PM');
}
