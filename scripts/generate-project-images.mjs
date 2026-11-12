// Generates public/projects/<id>.webp (1200x675) card artwork for the
// featured projects from inline SVGs using sharp. Abstract-geometric
// motifs only — deterministic, no external assets, and deliberately NO
// text: the card heading already names the project, so the artwork is
// pure composition (large motif, layered glow, dense detail).
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

const CX = 600;
const CY = 330;

function frame({ motif }) {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="675" viewBox="0 0 1200 675">
  <defs>
    <linearGradient id="accent" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#8B5CF6"/>
      <stop offset="100%" stop-color="#06B6D4"/>
    </linearGradient>
    <radialGradient id="glow" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#8B5CF6" stop-opacity="0.22"/>
      <stop offset="55%" stop-color="#06B6D4" stop-opacity="0.08"/>
      <stop offset="100%" stop-color="#06B6D4" stop-opacity="0"/>
    </radialGradient>
    <pattern id="dots" width="24" height="24" patternUnits="userSpaceOnUse">
      <circle cx="1.4" cy="1.4" r="1.4" fill="#FFFFFF" fill-opacity="0.055"/>
    </pattern>
  </defs>
  <rect width="1200" height="675" fill="#0C0C0F"/>
  <rect width="1200" height="675" fill="url(#dots)"/>
  <ellipse cx="${CX}" cy="${CY}" rx="540" ry="305" fill="url(#glow)"/>
  <rect x="1" y="1" width="1198" height="673" fill="none" stroke="#FFFFFF" stroke-opacity="0.08" stroke-width="2"/>
  ${motif}
</svg>`;
}

/** Four-point sparkle star polygon centred on (cx, cy). */
function sparkle(cx, cy, s, fill, opacity) {
  const k = Math.round(s * 0.22 * 10) / 10;
  const pts = [
    [cx, cy - s],
    [cx + k, cy - k],
    [cx + s, cy],
    [cx + k, cy + k],
    [cx, cy + s],
    [cx - k, cy + k],
    [cx - s, cy],
    [cx - k, cy - k],
  ]
    .map(([x, y]) => `${x},${y}`)
    .join(' ');
  return `<polygon points="${pts}" fill="${fill}" opacity="${opacity}"/>`;
}

/**
 * 3x3 app-tile grid, much larger than before. The centre tile is the bot
 * (accent fill, antenna, face); the surrounding tiles carry small feature
 * glyphs — chat dots, a music note, a play triangle, an equaliser, a coin,
 * a terminal prompt, a gamepad-ish cross and a sparkle — echoing the bot's
 * feature set without any words.
 */
function botGrid() {
  const size = 96;
  const gap = 24;
  const startX = CX - (size * 3 + gap * 2) / 2;
  const startY = CY - (size * 3 + gap * 2) / 2;
  const glyphs = {
    '0,0': (x, y) =>
      [0, 1, 2]
        .map(
          (i) =>
            `<circle cx="${x + 28 + i * 20}" cy="${y + 48}" r="6.5" fill="#67E8F9" opacity="${0.55 + i * 0.2}"/>`
        )
        .join(''),
    '0,1': (x, y) =>
      `<circle cx="${x + 38}" cy="${y + 64}" r="11" fill="url(#accent)" opacity="0.9"/>` +
      `<rect x="${x + 47}" y="${y + 26}" width="5.5" height="38" rx="2.75" fill="url(#accent)" opacity="0.9"/>` +
      `<path d="M${x + 47},${y + 26} q16,3 15,18 q-6,-9 -15,-10 Z" fill="url(#accent)" opacity="0.9"/>`,
    '0,2': (x, y) =>
      `<polygon points="${x + 38},${y + 28} ${x + 38},${y + 68} ${x + 70},${y + 48}" fill="#67E8F9" opacity="0.85"/>`,
    '1,0': (x, y) =>
      [22, 40, 30]
        .map(
          (h, i) =>
            `<rect x="${x + 26 + i * 18}" y="${y + 66 - h}" width="10" height="${h}" rx="5" fill="url(#accent)" opacity="${0.55 + i * 0.18}"/>`
        )
        .join(''),
    '1,2': (x, y) =>
      `<circle cx="${x + 48}" cy="${y + 48}" r="19" fill="none" stroke="url(#accent)" stroke-width="4.5"/>` +
      `<circle cx="${x + 48}" cy="${y + 48}" r="7.5" fill="url(#accent)"/>`,
    '2,0': (x, y) =>
      `<polyline points="${x + 26},${y + 34} ${x + 44},${y + 48} ${x + 26},${y + 62}" fill="none" stroke="#67E8F9" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/>` +
      `<line x1="${x + 52}" y1="${y + 64}" x2="${x + 72}" y2="${y + 64}" stroke="#67E8F9" stroke-width="5" stroke-linecap="round"/>`,
    '2,1': (x, y) =>
      `<rect x="${x + 40}" y="${y + 26}" width="16" height="44" rx="5" fill="url(#accent)" opacity="0.8"/>` +
      `<rect x="${x + 26}" y="${y + 40}" width="44" height="16" rx="5" fill="url(#accent)" opacity="0.8"/>`,
    '2,2': (x, y) => sparkle(x + 48, y + 48, 21, '#67E8F9', 0.9),
  };
  const parts = [
    `<circle cx="${CX}" cy="${CY}" r="248" fill="none" stroke="#FFFFFF" stroke-opacity="0.05" stroke-width="1.5"/>`,
    `<circle cx="${CX}" cy="${CY}" r="212" fill="none" stroke="url(#accent)" stroke-opacity="0.14" stroke-width="1.5" stroke-dasharray="3 9"/>`,
  ];
  for (let row = 0; row < 3; row++) {
    for (let col = 0; col < 3; col++) {
      const x = startX + col * (size + gap);
      const y = startY + row * (size + gap);
      if (row === 1 && col === 1) {
        parts.push(
          `<line x1="${x + size / 2}" y1="${y - 4}" x2="${x + size / 2}" y2="${y - 28}" stroke="url(#accent)" stroke-width="5" stroke-linecap="round"/>` +
            `<circle cx="${x + size / 2}" cy="${y - 36}" r="8" fill="url(#accent)"/>` +
            `<rect x="${x}" y="${y}" width="${size}" height="${size}" rx="18" fill="url(#accent)"/>` +
            `<circle cx="${x + 33}" cy="${y + 42}" r="8.5" fill="#0C0C0F"/>` +
            `<circle cx="${x + 63}" cy="${y + 42}" r="8.5" fill="#0C0C0F"/>` +
            `<rect x="${x + 29}" y="${y + 63}" width="38" height="7.5" rx="3.75" fill="#0C0C0F"/>`
        );
      } else {
        const glyph = glyphs[`${row},${col}`];
        parts.push(
          `<rect x="${x}" y="${y}" width="${size}" height="${size}" rx="18" fill="#FFFFFF" fill-opacity="0.045" stroke="#FFFFFF" stroke-opacity="0.15"/>` +
            (glyph ? glyph(x, y) : '')
        );
      }
    }
  }
  return parts.join('\n  ');
}

/**
 * Dense voice waveform: 41 bars up to ~300px tall with a mirrored
 * reflection under the centre line, echoing the site's waveform motif.
 */
function waveform() {
  const count = 41;
  const barWidth = 13;
  const gap = 9;
  const total = count * barWidth + (count - 1) * gap;
  const startX = CX - total / 2;
  const parts = [
    `<line x1="70" y1="${CY}" x2="1130" y2="${CY}" stroke="#FFFFFF" stroke-opacity="0.09" stroke-width="2"/>`,
  ];
  for (let i = 0; i < count; i++) {
    const envelope =
      Math.abs(Math.sin(i * 0.55)) * (0.55 + 0.45 * Math.sin(i * 0.23 + 1.7));
    const h = Math.max(18, Math.round(26 + 268 * envelope));
    const x = startX + i * (barWidth + gap);
    const opacity = (0.45 + 0.55 * (h / 294)).toFixed(2);
    parts.push(
      `<rect x="${x}" y="${CY - h / 2}" width="${barWidth}" height="${h}" rx="6.5" fill="url(#accent)" opacity="${opacity}"/>`
    );
    const refl = Math.round(h * 0.32);
    parts.push(
      `<rect x="${x}" y="${CY + h / 2 + 14}" width="${barWidth}" height="${refl}" rx="6.5" fill="url(#accent)" opacity="${(opacity * 0.22).toFixed(2)}"/>`
    );
  }
  parts.push(sparkle(158, 118, 13, '#67E8F9', 0.75));
  parts.push(sparkle(1052, 540, 11, '#A78BFA', 0.7));
  return parts.join('\n  ');
}

/**
 * Dashed delivery route across a faint city-block map, with a quadcopter
 * drone marker riding the middle node and a diamond destination.
 */
function route() {
  const parts = [];
  // City blocks: irregular faint rectangles on a loose grid.
  for (let row = 0; row < 6; row++) {
    for (let col = 0; col < 9; col++) {
      if ((row * 7 + col * 3) % 4 === 0) continue;
      const x = 78 + col * 118 + ((row % 2) * 17);
      const y = 66 + row * 96;
      const w = 74 + ((col * 13 + row * 7) % 26);
      const h = 52 + ((col * 5 + row * 11) % 18);
      parts.push(
        `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="6" fill="#FFFFFF" fill-opacity="${row % 2 ? 0.022 : 0.034}"/>`
      );
    }
  }
  const points = [
    [208, 472],
    [402, 330],
    [566, 414],
    [762, 248],
    [984, 322],
  ];
  const polyline = points.map(([x, y]) => `${x},${y}`).join(' ');
  parts.push(
    `<polyline points="${polyline}" fill="none" stroke="url(#accent)" stroke-width="15" stroke-linecap="round" opacity="0.15"/>`,
    `<polyline points="${polyline}" fill="none" stroke="url(#accent)" stroke-width="4.5" stroke-dasharray="12 10" stroke-linecap="round" opacity="0.95"/>`
  );
  points.forEach(([x, y], i) => {
    if (i === 0) {
      parts.push(
        `<circle cx="${x}" cy="${y}" r="17" fill="url(#accent)"/><circle cx="${x}" cy="${y}" r="6.5" fill="#0C0C0F"/>`
      );
    } else if (i === points.length - 1) {
      parts.push(
        `<rect x="${x - 16}" y="${y - 16}" width="32" height="32" rx="5" transform="rotate(45 ${x} ${y})" fill="#0C0C0F" stroke="url(#accent)" stroke-width="4"/>` +
          `<circle cx="${x}" cy="${y}" r="5.5" fill="url(#accent)"/>`
      );
    } else {
      parts.push(
        `<circle cx="${x}" cy="${y}" r="13" fill="#0C0C0F" stroke="url(#accent)" stroke-width="4"/>`
      );
    }
  });
  // Quadcopter hovering above the middle node.
  const [dx, dy] = [points[2][0], points[2][1] - 86];
  const rotors = [
    [-30, -20],
    [30, -20],
    [-30, 20],
    [30, 20],
  ]
    .map(
      ([ox, oy]) =>
        `<line x1="${dx}" y1="${dy}" x2="${dx + ox}" y2="${dy + oy}" stroke="url(#accent)" stroke-width="3.5" stroke-linecap="round"/>` +
        `<circle cx="${dx + ox}" cy="${dy + oy}" r="9.5" fill="none" stroke="url(#accent)" stroke-width="3"/>`
    )
    .join('');
  parts.push(
    `<circle cx="${dx}" cy="${dy}" r="52" fill="none" stroke="#FFFFFF" stroke-opacity="0.13" stroke-width="1.5" stroke-dasharray="4 7"/>` +
      rotors +
      `<rect x="${dx - 15}" y="${dy - 10}" width="30" height="20" rx="7" fill="url(#accent)"/>` +
      `<line x1="${dx}" y1="${dy + 10}" x2="${dx}" y2="${points[2][1] - 24}" stroke="#FFFFFF" stroke-opacity="0.3" stroke-width="2" stroke-dasharray="3 6"/>`
  );
  return parts.join('\n  ');
}

/**
 * Large graduation cap over an open book, with sparkles — the learning
 * platform motif, scaled up to fill the frame.
 */
function capAndBook() {
  return [
    `<circle cx="${CX}" cy="${CY - 10}" r="252" fill="none" stroke="#FFFFFF" stroke-opacity="0.05" stroke-width="1.5"/>`,
    `<polygon points="600,148 824,258 600,368 376,258" fill="#FFFFFF" fill-opacity="0.045" stroke="url(#accent)" stroke-width="4" stroke-linejoin="round"/>`,
    `<polygon points="600,203 747,258 600,313 453,258" fill="url(#accent)" fill-opacity="0.14"/>`,
    `<path d="M508,302 C552,330 648,330 692,302 L692,352 C648,380 552,380 508,352 Z" fill="#FFFFFF" fill-opacity="0.05" stroke="#FFFFFF" stroke-opacity="0.18" stroke-linejoin="round"/>`,
    `<line x1="824" y1="258" x2="824" y2="362" stroke="url(#accent)" stroke-width="4" stroke-linecap="round"/>`,
    `<circle cx="824" cy="378" r="10" fill="url(#accent)"/>`,
    `<path d="M412,438 C486,472 556,456 600,444 C644,456 714,472 788,438 L788,516 C714,550 644,534 600,522 C556,534 486,550 412,516 Z" fill="#FFFFFF" fill-opacity="0.055" stroke="#FFFFFF" stroke-opacity="0.2" stroke-linejoin="round"/>`,
    `<line x1="600" y1="444" x2="600" y2="522" stroke="#FFFFFF" stroke-opacity="0.2"/>`,
    `<path d="M452,466 C496,484 540,476 572,466" fill="none" stroke="#FFFFFF" stroke-opacity="0.13" stroke-width="3" stroke-linecap="round"/>`,
    `<path d="M452,494 C496,512 540,504 572,494" fill="none" stroke="#FFFFFF" stroke-opacity="0.13" stroke-width="3" stroke-linecap="round"/>`,
    `<path d="M628,466 C660,476 704,484 748,466" fill="none" stroke="#FFFFFF" stroke-opacity="0.13" stroke-width="3" stroke-linecap="round"/>`,
    `<path d="M628,494 C660,504 704,512 748,494" fill="none" stroke="#FFFFFF" stroke-opacity="0.13" stroke-width="3" stroke-linecap="round"/>`,
    sparkle(322, 168, 17, '#67E8F9', 0.85),
    sparkle(892, 140, 13, '#A78BFA', 0.8),
    sparkle(916, 470, 12, '#67E8F9', 0.7),
  ].join('\n  ');
}

const projects = [
  { id: 'cutiebot', motif: botGrid() },
  { id: 'portfolio-website', motif: waveform() },
  { id: 'drone-dispatch', motif: route() },
  { id: 'companion', motif: capAndBook() },
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
