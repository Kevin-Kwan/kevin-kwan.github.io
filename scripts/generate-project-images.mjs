// Generates public/projects/<id>.webp (1200x675) card artwork for the
// featured projects from inline SVGs using sharp. Abstract-geometric
// motifs only — deterministic, no external assets.
// Run with: npm run generate-project-images
import sharp from 'sharp';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import { mkdir } from 'node:fs/promises';

const outDir = path.join(
  path.dirname(fileURLToPath(import.meta.url)),
  '..',
  'public',
  'projects'
);

const MONO = 'ui-monospace, SFMono-Regular, Menlo, Consolas, monospace';

function frame({ id, name, kicker, motif }) {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="675" viewBox="0 0 1200 675">
  <defs>
    <linearGradient id="accent" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#8B5CF6"/>
      <stop offset="100%" stop-color="#06B6D4"/>
    </linearGradient>
    <pattern id="dots" width="26" height="26" patternUnits="userSpaceOnUse">
      <circle cx="1.5" cy="1.5" r="1.5" fill="#FFFFFF" fill-opacity="0.05"/>
    </pattern>
  </defs>
  <rect width="1200" height="675" fill="#0C0C0F"/>
  <rect width="1200" height="675" fill="url(#dots)"/>
  <rect x="1" y="1" width="1198" height="673" fill="none" stroke="#FFFFFF" stroke-opacity="0.08" stroke-width="2"/>
  ${motif}
  <text x="64" y="556" font-family="${MONO}" font-size="21" letter-spacing="5" fill="#71717A">${kicker}</text>
  <text x="64" y="606" font-family="${MONO}" font-size="44" font-weight="700" fill="#F4F4F5">${name}</text>
</svg>`;
}

/** 3x3 tile grid; the center tile is a bot face (two eyes) in accent. */
function botGrid() {
  const size = 64;
  const gap = 20;
  const startX = 600 - (size * 3 + gap * 2) / 2;
  const startY = 300 - (size * 3 + gap * 2) / 2;
  const tiles = [];
  for (let row = 0; row < 3; row++) {
    for (let col = 0; col < 3; col++) {
      const x = startX + col * (size + gap);
      const y = startY + row * (size + gap);
      if (row === 1 && col === 1) {
        tiles.push(
          `<rect x="${x}" y="${y}" width="${size}" height="${size}" rx="14" fill="url(#accent)"/>` +
            `<circle cx="${x + 22}" cy="${y + 28}" r="5" fill="#0C0C0F"/>` +
            `<circle cx="${x + 42}" cy="${y + 28}" r="5" fill="#0C0C0F"/>` +
            `<rect x="${x + 20}" y="${y + 42}" width="24" height="5" rx="2.5" fill="#0C0C0F"/>`
        );
      } else {
        tiles.push(
          `<rect x="${x}" y="${y}" width="${size}" height="${size}" rx="14" fill="#FFFFFF" fill-opacity="0.03" stroke="#FFFFFF" stroke-opacity="0.14"/>`
        );
      }
    }
  }
  return tiles.join('\n  ');
}

/** Centered voice-waveform bars, echoing the site's OG image motif. */
function waveform() {
  const heights = [
    30, 52, 84, 46, 110, 68, 128, 54, 96, 38, 104, 64, 120, 44, 80, 34, 92, 58,
    116, 42, 74, 50, 100, 36, 62,
  ];
  const barWidth = 16;
  const gap = 14;
  const total = heights.length * barWidth + (heights.length - 1) * gap;
  const startX = 600 - total / 2;
  const midY = 300;
  return heights
    .map((h, i) => {
      const x = startX + i * (barWidth + gap);
      const y = midY - h / 2;
      const opacity = (0.5 + (i % 4) * 0.14).toFixed(2);
      return `<rect x="${x}" y="${y}" width="${barWidth}" height="${h}" rx="8" fill="url(#accent)" opacity="${opacity}"/>`;
    })
    .join('\n  ');
}

/** Dashed delivery route with node markers across a faint map grid. */
function route() {
  const points = [
    [290, 428],
    [472, 306],
    [648, 366],
    [806, 218],
    [928, 282],
  ];
  const polyline = points.map(([x, y]) => `${x},${y}`).join(' ');
  const nodes = points
    .map(([x, y], i) => {
      if (i === 0) {
        return `<circle cx="${x}" cy="${y}" r="13" fill="url(#accent)"/><circle cx="${x}" cy="${y}" r="5" fill="#0C0C0F"/>`;
      }
      if (i === points.length - 1) {
        return `<rect x="${x - 11}" y="${y - 11}" width="22" height="22" rx="4" transform="rotate(45 ${x} ${y})" fill="none" stroke="url(#accent)" stroke-width="3"/>`;
      }
      return `<circle cx="${x}" cy="${y}" r="10" fill="#0C0C0F" stroke="url(#accent)" stroke-width="3"/>`;
    })
    .join('\n  ');
  return `<polyline points="${polyline}" fill="none" stroke="url(#accent)" stroke-width="3" stroke-dasharray="10 9" stroke-linecap="round" opacity="0.85"/>
  ${nodes}`;
}

/** Graduation-cap diamond with tassel over an open-book curve. */
function capAndBook() {
  return `<polygon points="600,196 736,272 600,348 464,272" fill="#FFFFFF" fill-opacity="0.03" stroke="url(#accent)" stroke-width="3" stroke-linejoin="round"/>
  <line x1="736" y1="272" x2="736" y2="356" stroke="url(#accent)" stroke-width="3" stroke-linecap="round"/>
  <circle cx="736" cy="368" r="7" fill="url(#accent)"/>
  <path d="M492,392 C544,420 600,404 600,404 C600,404 656,420 708,392 L708,442 C656,470 600,454 600,454 C600,454 544,470 492,442 Z" fill="#FFFFFF" fill-opacity="0.04" stroke="#FFFFFF" stroke-opacity="0.16" stroke-linejoin="round"/>
  <line x1="600" y1="404" x2="600" y2="454" stroke="#FFFFFF" stroke-opacity="0.16"/>`;
}

const projects = [
  {
    id: 'cutiebot',
    name: 'CutieBot',
    kicker: 'DISCORD BOT · JAVASCRIPT',
    motif: botGrid(),
  },
  {
    id: 'portfolio-website',
    name: 'Portfolio Website',
    kicker: 'NEXT.JS · TYPESCRIPT',
    motif: waveform(),
  },
  {
    id: 'drone-dispatch',
    name: 'Drone Dispatch',
    kicker: 'FULL-STACK · NEXT.JS · MYSQL',
    motif: route(),
  },
  {
    id: 'companion',
    name: 'CompAnIon',
    kicker: 'LEARNING PLATFORM · NEXT.JS',
    motif: capAndBook(),
  },
];

await mkdir(outDir, { recursive: true });
for (const project of projects) {
  const svg = frame(project);
  const outPath = path.join(outDir, `${project.id}.webp`);
  const info = await sharp(Buffer.from(svg))
    .webp({ quality: 82 })
    .toFile(outPath);
  console.log(
    `Wrote ${outPath} (${(info.size / 1024).toFixed(1)} KB, ${info.width}x${info.height})`
  );
}
