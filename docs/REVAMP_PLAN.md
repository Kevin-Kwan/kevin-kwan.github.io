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
- `/resume` — native PDF embed of `public/documents/Kevin_Kwan_SWE_2026_Resume.pdf`
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

## Iteration 1 (Nov 12, 2026)

Fixes from three strict post-launch reviews (Gemini, ChatGPT, browser audit)
plus an owner-reported mobile defect. No content was deleted; hierarchy and
layout changed only.

- **Responsive cards.** EducationCard header restructured: the GPA badge no
  longer shares the header row on small screens (Georgia Tech's long
  "3.9, summa cum laude" badge string crushed the school name into a ~60px
  column) — the badge is inline under the date line on mobile and a side
  badge on sm+; Georgia Tech's `gpa` display value is now "3.9" with
  "Graduated summa cum laude." in its details. ExperienceCard taglines stack
  under the company name on mobile. Home SectionHeading action links stack
  under the heading on mobile instead of floating mid-line.
- **Home featured GEICO block** shows the summary plus three condensed
  `shortHighlights` (new optional field in `content/experience.ts`) and a
  "Full experience" CTA; `/experience` keeps all seven full highlights.
- **Skills page**: fixed `grid-cols-2` chip grid replaced with flex-wrap
  content-sized pill chips; chips are no longer external links.
- **Navbar**: hamburger tap target is 48px (p-3); GitHub/LinkedIn icon
  buttons hidden below sm and present in the mobile menu instead.
- **Résumé page**: below md the 85vh PDF iframe is hidden (a letter page at
  ~300px wide is illegible) in favor of a snapshot card — name, role, key
  metrics, top skills, and large Download / Open PDF buttons; md+ keeps the
  summary header + embed. Résumé URL is unified as `resumeUrl` in
  `content/site.ts` (env override ?? bundled PDF), used by the résumé page,
  navbar, and home download button.
- **Motion**: the hand-rolled IntersectionObserver `Reveal` was replaced
  with the `motion` package — one-time whileInView fade/translate, an `as`
  prop (`div`/`li`) that also fixes the /skills `ul > div` semantics, and
  `MotionConfig reducedMotion="user"` in `_app`. The `.reveal` CSS that hid
  content before JS ran is gone; exported HTML is fully visible without
  JavaScript. The hero got a one-time staggered entrance. Spotlight hover is
  kept only on the featured GEICO block and featured project cards.
- **Accessibility/semantics**: `SectionHeading` accepts `as="h1"`; every
  secondary page now has exactly one H1. Small text moved from zinc-500 to
  zinc-400 for WCAG AA contrast. Contact form errors are wired to inputs via
  `aria-describedby`, and the form is replaced by a direct-contact fallback
  card when EmailJS configuration is absent.
- **Projects page**: Featured section (the four selected projects, full
  cards) → remaining Completed projects as compact cards in a denser grid →
  Coding Challenge Solutions as a compact list under "Archive — coursework
  & coding challenges". All projects remain listed.
- **Copy**: tighter two-sentence hero intro; "A easy-to-customize" grammar
  fixed in the Windows XP project description. Footer now reads name/role/
  employer from `content/profile.ts`.

## Iteration 2 (Nov 12, 2026)

Round-2 audit fixes plus an owner-approved differentiation batch. Content
was edited for accuracy but nothing was deleted (the one removal — an
unverifiable self-praise sentence in the NCR entry — was audit-directed).

- **Ghosting fixed at the root.** `Reveal` no longer fades in content that
  is already in the viewport at mount: the plain pre-hydration element is
  measured in a layout effect, elements in view swap to motion with
  `initial={false}` (full opacity, no animation), and only below-fold
  elements take the one-time fade-up. The hero entrance is now
  transform/blur-only (words/blocks rise ~8px and un-blur) with opacity
  locked at 1, and it is gated off entirely under prefers-reduced-motion
  (MotionConfig disables transforms but not blur, so the gate is explicit).
  The old RootLayout CSS page transition, which faded every page in from
  opacity 0, is gone.
- **Page transitions** live in `_app`: a route-keyed motion wrapper that
  renders `initial={false}` for the server/first paint (using the
  `useMounted` sync-external-store gate) and, for client-side navigations
  only, a 200ms rise from 85% opacity — content is never invisible.
- **Content corrections.** Every project gained a one-line `blurb` (≤90
  chars, written from its existing description); compact cards and the
  archive list render blurbs instead of line-clamped descriptions (which
  cut words mid-character). Typos fixed: "HackerRank's", "one of my first
  React projects", "Rogue-like"; Rock Paper Scissors is now "an early
  React project" (removing the dueling "first project" claims); Triggering
  Insanity's IWBTG/IWBTB acronyms spelled out. Drone Dispatch (featured,
  no links) gained a `note` field — "Course project (CS 4400) — code
  available on request." — rendered where links would go. Education intro
  copy trimmed to what the page shows; GSMST's GPA is labeled
  "4.211 (weighted)" via a new `gpaNote` field. EcoCAR bullets unified to
  "EcoCAR EV Challenge". Home closing line: "building impactful,
  purposeful software." Skills → Tools & Platforms gained SonarQube,
  Cursor, and Claude Code (all on the 2026 résumé) with brand icons.
- **Tap targets.** Compact/archive project links are ≥40px tall
  (min-h-10 with compensating negative margins); skill chips went
  py-2.5 → py-3; navbar social icons moved from `sm:block` to `md:block`
  (the 640–767px band was crowded) with 40px hit areas.
- **Differentiation batch** (all degrade to static, fully visible output
  without JS and under reduced motion):
  - `PipelineDiagram` in the home GEICO section — Caller → Amazon Connect
    → AI Voice Agent → Lambda Tools → Resolution, with CSS light pulses
    on the connectors (static lines when motion is reduced/off).
  - `TechMarquee` under the hero — infinite CSS ticker of the core-skills
    list, duplicated for the loop, pause on hover, edge fade masks;
    a static wrapped list before hydration / under reduced motion.
  - Hero ambient glow deepened (two additional low-opacity radial layers
    under the waveform/grain).
  - Animated metric counters: final values are the SSR/no-JS output; the
    count-up replays from 90% on first scroll into view, never from 0,
    and never under reduced motion.
  - Split-text hero reveal: H1 and tagline animate word-by-word
    (blur + rise, opacity 1) with aria-labels preserving clean text for
    assistive tech.
  - Border beams on the featured GEICO card and the four featured project
    cards: a conic-gradient ring rotating via a registered `@property`,
    enabled only on hover-capable fine pointers, off under reduced
    motion, subtle and slow.
  - Bento expertise grid: Conversational AI & Voice spans two columns,
    Full-Stack spans the full row on md+, dot-pattern backdrops in cells.
  - Scroll progress bar: 2px violet→cyan, spring-smoothed `useScroll`
    scaleX, pinned to the navbar's bottom edge.
  - `Magnetic` wrapper on primary CTAs (home hero + contact section,
    contact form submit): ≤4px spring pull, mouse/fine-pointer only,
    off under reduced motion.
- **Security.** Dependabot High for `sharp` resolved: direct dependency
  bumped ^0.34.5 → ^0.35.5 and an `overrides` pin added, because Next
  16.1.7 carries sharp as an optional dependency (^0.34.4) and otherwise
  keeps a nested vulnerable 0.34.5. `npm ls sharp` now resolves a single
  deduped 0.35.5. (The sandbox blocks the npm audit endpoint with a 403
  policy error, so the audit summary itself could not be re-run here;
  verification is the resolved tree plus sharp loading cleanly.)
