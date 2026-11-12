# Portfolio Revamp Plan (Nov 2026)

Design direction merged from two consultations (Gemini 3.1 Pro — visual identity;
ChatGPT GPT-6 — architecture/UX) and finalized by the maintainer. This document is
the spec the implementation follows; keep it updated if the design changes.

## Positioning

Kevin Kwan — Software Engineer II at GEICO (conversational AI / IVR), Georgia Tech
B.S. Computer Science, summa cum laude (2024). The site should read as a premium,
editorial, engineer-grade portfolio: content and metrics first, decoration last.

## Decisions

- **Stay on the Pages Router.** It is fully supported in Next 16, keeps every URL
  identical, and the extensibility win comes from the content layer, not the router.
- **Content as data.** All copy lives in typed files under `content/` (`profile.ts`,
  `experience.ts`, `projects.ts`, `education.ts`, `skills.ts`, `site.ts`). Pages and
  components render from data; adding a job or project never requires JSX surgery.
- **Tailwind CSS v4, CSS-first.** Design tokens live in `styles/globals.css` via
  `@theme`. No `tailwind.config.ts`, no v3/v4 mix.
- **React 19** to match Next 16; type packages aligned.
- **Fonts are self-hosted** via `@fontsource-variable/inter` and
  `@fontsource-variable/jetbrains-mono` (npm). No build-time Google Fonts fetch —
  the build must succeed offline.
- **No particle/canvas backgrounds, no hotlinked images.** Company/school logos are
  local monogram tiles. The only external requests are the ones the visitor triggers
  (links) and the EmailJS contact call.
- **Static export** (`output: 'export'`, `images.unoptimized`, `trailingSlash`)
  deployed by the existing GitHub Pages workflow.

## Design system

- Background `#09090B` (zinc-950); raised surface `#101014` / zinc-900; 1px borders
  at white/10; text zinc-100 primary, zinc-400 secondary.
- Accent: violet `#8B5CF6` → cyan `#06B6D4` gradient, used sparingly (name, primary
  CTA, hover states, waveform motif).
- Type: Inter Variable (headings semibold/bold, tracking-tight; body 16px relaxed),
  JetBrains Mono Variable for metrics, dates, and tech annotations.
- Container `max-w-6xl`; generous section spacing; 12–16px card radii; minimal shadow.
- Signature touches: subtle SVG audio-waveform motif (nod to voice AI), faint grain
  overlay (~3%), spotlight hover on cards, 150–250ms transitions,
  `prefers-reduced-motion` fully respected.
- Accessibility: one H1 per page, semantic landmarks, skip-to-content link, visible
  `:focus-visible` outlines, WCAG AA contrast, labelled form fields with `aria-live`
  status.

## Pages

- `/` — Hero (name, role, value prop, "open to opportunities" pill, CTAs) → impact
  metrics band (60% payment IVR containment · 80% proof-of-coverage containment ·
  3.9 GPA summa cum laude · 1st place EcoCAR 2022) → expertise (Conversational AI &
  Voice · Cloud & AWS · Full-Stack) → featured experience (GEICO) → selected projects
  → skills snapshot → education highlight → contact CTA.
- `/experience` — all roles, outcome-bullet format. GEICO entry is current:
  SWE II, Amazon Connect migration from Cisco UCCE/Nuance, Sierra AI voice agents
  (incl. billing), payment IVR ~60% containment, proof-of-coverage IVR ~80%,
  Lambda/DynamoDB async orchestration, AES encryption work, Cyara, on-call.
- `/projects` — every existing project, grouped Ongoing / Completed / Coding
  Challenges, descriptions baked in from GitHub (no runtime/build fetch, no error
  strings), tech tags, repo/demo links.
- `/education` — Georgia Tech, Gwinnett Tech, GSMST, all facts and links preserved.
- `/skills` — categorized chips (Languages · Conversational AI & Voice · Cloud &
  DevOps · Web & Frameworks · Data · Tools), icons from `react-icons` only.
- `/resume` — native PDF embed of `public/documents/Kevin_Kwan_SWE_2025_Resume.pdf`
  (or `NEXT_PUBLIC_RESUME_LINK` when set) + prominent download. No Adobe SDK.
- `/contact` — EmailJS form (existing env wiring preserved) + direct email /
  GitHub / LinkedIn cards.
- `/404` — on-brand not-found page.

## SEO

Per-page titles/descriptions; canonical `https://kevin-kwan.github.io/`; Open Graph
+ Twitter cards with `public/og.png` (1200×630); `Person` JSON-LD on the home page;
static `public/sitemap.xml` and `public/robots.txt`. No keyword stuffing.

## Quality gates

`npm run build`, `npm run typecheck`, `npm run lint` (ESLint flat config) all pass;
CI runs lint + typecheck before the Pages build.
