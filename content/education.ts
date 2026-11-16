import type { OrgLogoSpec } from '../components/OrgLogo';

export interface EducationLink {
  label: string;
  url: string;
}

export interface EducationEntry {
  id: string;
  school: string;
  unit: string;
  dateRange: string;
  credential: string;
  location: string;
  logo: OrgLogoSpec;
  gpa?: string;
  /** Optional qualifier rendered after the GPA, e.g. '(weighted)'. */
  gpaNote?: string;
  details: string[];
  links: EducationLink[];
}

/**
 * Academic highlights for the /education page — all from Kevin's résumé
 * (Zell Miller Scholarship, Dean's List, Faculty Honors) or already on
 * the site (EcoCAR 1st place, 2022). Nothing invented.
 */
export const academicHighlights: string[] = [
  'Zell Miller Scholarship',
  'Dean\u2019s List',
  'Faculty Honors',
  'EcoCAR VIP program — 1st place, 2022 U.S. DOE EcoCAR Mobility Challenge',
];

export interface CourseworkCourse {
  code: string;
  name: string;
}

/**
 * Selected upper-level coursework — the courses behind several projects
 * on this site (Video Game Design in Dark Ascent, Database Systems in
 * Drone Dispatch). Presented plainly, with no thread grouping: the two
 * courses sit in different Georgia Tech CS threads and a thread label
 * would imply a grouping the list does not have. Nothing invented.
 */
export const selectedCoursework: CourseworkCourse[] = [
  { code: 'CS 4455 / CS 6457', name: 'Video Game Design' },
  { code: 'CS 4400', name: 'Introduction to Database Systems' },
];

export const education: EducationEntry[] = [
  {
    id: 'georgia-tech',
    school: 'Georgia Institute of Technology',
    unit: 'College of Computing',
    dateRange: 'August 2021 – May 2024',
    credential:
      'Bachelor of Science in Computer Science with Highest Honors',
    location: 'Atlanta, GA',
    logo: {
      src: '/logos/georgia-tech.svg',
      alt: 'Georgia Tech logo',
      imgClassName: 'p-2',
    },
    gpa: '3.9',
    details: ['Threads: Intelligence and Media'],
    links: [
      { label: 'University Website', url: 'https://www.gatech.edu/' },
      { label: 'College Website', url: 'https://www.cc.gatech.edu/' },
    ],
  },
  {
    id: 'gwinnett-tech',
    school: 'Gwinnett Technical College',
    unit: 'Dual Enrollment Program',
    dateRange: 'May 2020 – June 2021',
    credential: 'PC Repair and Network Technician Certificate',
    location: 'Lawrenceville, GA',
    logo: {
      src: '/logos/gwinnett-tech.png',
      alt: 'Gwinnett Technical College logo',
      tileClassName: 'bg-[#002d74]',
      imgClassName: 'p-1.5',
    },
    gpa: '4.0',
    details: [],
    links: [{ label: 'College Website', url: 'https://gwinnetttech.edu' }],
  },
  {
    id: 'gsmst',
    school: 'Gwinnett School of Mathematics, Science, and Technology',
    unit: 'High School',
    dateRange: 'August 2017 – May 2021',
    credential: 'High School Diploma with Honors',
    location: 'Lawrenceville, GA',
    logo: {
      src: '/logos/gsmst-seal.png',
      alt: 'Gwinnett School of Mathematics, Science, and Technology seal',
      imgClassName: 'p-1.5',
    },
    details: [],
    links: [{ label: 'School Website', url: 'https://www.gcpsk12.org/GSMST' }],
  },
];
