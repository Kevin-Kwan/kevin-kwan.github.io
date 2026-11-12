export interface NavLink {
  href: string;
  label: string;
}

export interface SocialLink {
  label: string;
  href: string;
}

export const site = {
  name: 'Kevin Kwan',
  siteUrl: 'https://kevin-kwan.github.io',
  defaultTitle: 'Kevin Kwan | Software Engineer II — Conversational AI & IVR',
  defaultDescription:
    'Portfolio of Kevin Kwan, a Software Engineer II at GEICO building conversational AI and IVR systems on Amazon Connect and AWS. Georgia Tech B.S. Computer Science, summa cum laude.',
  ogImage: '/og.png',
  resumePdfPath: '/documents/Kevin_Kwan_SWE_2026_Resume.pdf',
  resumeFileName: 'Kevin_Kwan_SWE_2026_Resume.pdf',
  sourceRepoUrl: 'https://github.com/Kevin-Kwan/Kevin-Kwan.github.io',
} as const;

/**
 * Single source of truth for the résumé URL, shared by the résumé page,
 * the navbar, and the home-page download button. An externally hosted
 * résumé (NEXT_PUBLIC_RESUME_LINK) wins over the bundled PDF when set.
 */
export const resumeUrl =
  process.env.NEXT_PUBLIC_RESUME_LINK ?? site.resumePdfPath;

export const navLinks: NavLink[] = [
  { href: '/', label: 'Home' },
  { href: '/experience', label: 'Experience' },
  { href: '/projects', label: 'Projects' },
  { href: '/education', label: 'Education' },
  { href: '/skills', label: 'Skills' },
  { href: '/resume', label: 'Résumé' },
  { href: '/contact', label: 'Contact' },
];

export const socials = {
  github: 'https://github.com/Kevin-Kwan',
  linkedin: 'https://linkedin.com/in/kevinkwan3',
} as const;

export const socialLinks: SocialLink[] = [
  { label: 'GitHub', href: socials.github },
  { label: 'LinkedIn', href: socials.linkedin },
];
