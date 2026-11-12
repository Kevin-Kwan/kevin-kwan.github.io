# Kevin Kwan's Portfolio

## Description

This is the source code for Kevin Kwan's personal portfolio website — a testament to his front-end development skills, showcasing proficiency in **React**, **Next.js**, **TypeScript**, **JavaScript**, **Tailwind CSS** and other modern web technologies.

The portfolio includes the projects Kevin has worked on, demonstrating his ability to create **responsive designs**, **interactive user interfaces**, and **accessible web components**. Each project highlights different aspects of front and back-end development, providing a comprehensive view of his capabilities.

Kevin is a Software Engineer II at GEICO working on conversational AI / IVR (Amazon Connect, AWS, Sierra AI), and a Georgia Tech B.S. Computer Science graduate (summa cum laude, 2024).

## Live Demo

You can view the live site at [Kevin Kwan's Portfolio](https://kevin-kwan.github.io).

## Development

Prerequisites: Node.js 20 (see `.nvmrc`) and npm.

```bash
git clone https://github.com/Kevin-Kwan/Kevin-Kwan.github.io.git
cd Kevin-Kwan.github.io
npm install
npm run dev        # http://localhost:3000
```

Quality gates (also run in CI before every deploy):

```bash
npm run lint       # ESLint (flat config)
npm run typecheck  # tsc --noEmit
npm run build      # production build -> static export in out/
```

The build is a fully static export (`output: 'export'`). Fonts are self-hosted
via `@fontsource-variable/inter` and `@fontsource-variable/jetbrains-mono`, so
the build never fetches Google Fonts and works offline.

To regenerate the social preview image after changing the design, run
`npm run generate-og` (writes `public/og.png`).

### Environment variables

Copy `.env.local.example` to `.env.local` for local development. The contact
form needs `EMAILJS_SERVICE_ID`, `EMAILJS_TEMPLATE_ID`, and `EMAILJS_PUBLIC_KEY`;
`NEXT_PUBLIC_CONTACT_EMAIL` powers the direct-email links, and
`NEXT_PUBLIC_RESUME_LINK` optionally overrides the résumé PDF (otherwise the
file in `public/documents/` is served).

## Editing content

Most site copy lives as typed data under `content/` — pages and components
render from it, so you never need to edit JSX to update the site:

| File                 | Contents                                        |
| -------------------- | ----------------------------------------------- |
| `content/site.ts`    | Site name, URLs, navigation, social links       |
| `content/profile.ts` | Hero copy, impact metrics, expertise areas      |
| `content/experience.ts` | Jobs (summary + outcome bullets + links)     |
| `content/projects.ts`   | Projects, grouped, with tech tags and links  |
| `content/education.ts`  | Schools, credentials, GPAs, links            |
| `content/skills.ts`     | Skill categories (icon keys map in `components/SkillIcon.tsx`) |

The design system (colors, fonts, utilities) is defined CSS-first in
`styles/globals.css` via Tailwind v4's `@theme`. The redesign rationale and
decisions are documented in `docs/REVAMP_PLAN.md`.

## Deployment

Pushes to `master` are built and deployed to GitHub Pages by
`.github/workflows/nextjs.yml` (lint + typecheck run before the build).

## Contributing

Contributions, issues, and feature requests are welcome. Feel free to check the issues page if you want to contribute.
