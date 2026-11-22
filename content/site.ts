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
  defaultTitle: 'Kevin Kwan | Conversational AI, Voice AI & IVR Engineer',
  defaultDescription:
    'Kevin Kwan is a Software Engineer II at GEICO in Atlanta, building conversational AI, voice agents, and Amazon Connect IVR systems on AWS. Georgia Tech CS with Highest Honors.',
  ogImage: '/og.png',
  /** Public contact address shown on /contact — data, not a build secret. */
  contactEmail: 'kevinkwan@gatech.edu',
  sourceRepoUrl: 'https://github.com/Kevin-Kwan/kevin-kwan.github.io',
} as const;

/**
 * Single source of truth for the résumé request link, used ONLY by the
 * /resume request-gate page. The résumé itself is not hosted on this
 * site — visitors email Kevin to request a copy. Every other
 * "Request résumé" entry point (home hero, navbar, command palette)
 * links to /resume instead: a raw mailto: opens the OS mail client and
 * fails silently on mobile browsers with no configured mail handler.
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
