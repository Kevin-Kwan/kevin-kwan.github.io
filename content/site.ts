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
    'Portfolio of Kevin Kwan, a Software Engineer II building conversational AI and IVR systems on Amazon Connect and AWS for a major U.S. auto insurer. Georgia Tech B.S. Computer Science, summa cum laude.',
  ogImage: '/og.png',
  /** Public contact address shown on /contact — data, not a build secret. */
  contactEmail: 'kevinkwan@gatech.edu',
  sourceRepoUrl: 'https://github.com/Kevin-Kwan/Kevin-Kwan.github.io',
} as const;

/**
 * Single source of truth for the résumé request link, shared by the
 * résumé page, the navbar, and the home-page button. The résumé itself
 * is not hosted on this site — visitors email Kevin to request a copy.
 */
export const resumeRequestUrl =
  'mailto:kevinkwan@gatech.edu?subject=Resume%20request';

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
