// Generates public/og.png (1200x630) from an inline SVG using sharp.
// Run with: npm run generate-og
import sharp from 'sharp';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const outPath = path.join(
  path.dirname(fileURLToPath(import.meta.url)),
  '..',
  'public',
  'og.png'
);

const bars = [
  26, 44, 66, 38, 84, 58, 96, 42, 72, 30, 78, 52, 90, 36, 62, 28, 70, 48, 88,
  34,
];
const barRects = bars
  .map((h, i) => {
    const x = 84 + i * 26;
    const y = 470 + (100 - h) / 2;
    const opacity = (0.45 + (i % 4) * 0.15).toFixed(2);
    return `<rect x="${x}" y="${y}" width="13" height="${h}" rx="6.5" fill="url(#accent)" opacity="${opacity}"/>`;
  })
  .join('\n    ');

const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <defs>
    <linearGradient id="accent" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stop-color="#8B5CF6"/>
      <stop offset="100%" stop-color="#06B6D4"/>
    </linearGradient>
    <radialGradient id="glowViolet" cx="0.15" cy="0" r="0.9">
      <stop offset="0%" stop-color="#8B5CF6" stop-opacity="0.28"/>
      <stop offset="100%" stop-color="#8B5CF6" stop-opacity="0"/>
    </radialGradient>
    <radialGradient id="glowCyan" cx="0.9" cy="0" r="0.9">
      <stop offset="0%" stop-color="#06B6D4" stop-opacity="0.22"/>
      <stop offset="100%" stop-color="#06B6D4" stop-opacity="0"/>
    </radialGradient>
  </defs>
  <rect width="1200" height="630" fill="#09090B"/>
  <rect width="1200" height="630" fill="url(#glowViolet)"/>
  <rect width="1200" height="630" fill="url(#glowCyan)"/>
  <rect x="1" y="1" width="1198" height="628" fill="none" stroke="#FFFFFF" stroke-opacity="0.09" stroke-width="2"/>

  <text x="80" y="120" font-family="Inter, Helvetica, Arial, sans-serif" font-size="26" letter-spacing="6" fill="#22D3EE">SOFTWARE ENGINEER II</text>
  <text x="80" y="248" font-family="Inter, Helvetica, Arial, sans-serif" font-size="118" font-weight="700" fill="#F4F4F5">Kevin</text>
  <text x="470" y="248" font-family="Inter, Helvetica, Arial, sans-serif" font-size="118" font-weight="700" fill="url(#accent)">Kwan</text>
  <text x="80" y="322" font-family="Inter, Helvetica, Arial, sans-serif" font-size="38" fill="#D4D4D8">Conversational AI &amp; IVR — Amazon Connect · AWS · Sierra AI</text>
  <text x="80" y="382" font-family="Inter, Helvetica, Arial, sans-serif" font-size="30" fill="#A1A1AA">GEICO · Georgia Tech B.S. Computer Science, summa cum laude</text>

  ${barRects}

  <text x="80" y="606" font-family="Menlo, Consolas, monospace" font-size="22" fill="#71717A">kevin-kwan.github.io</text>
</svg>`;

await sharp(Buffer.from(svg)).png().toFile(outPath);
console.log(`Wrote ${outPath}`);
