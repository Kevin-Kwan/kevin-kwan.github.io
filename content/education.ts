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

export interface CourseworkGroup {
  /** Georgia Tech CS thread the courses belong to. */
  thread: string;
  courses: { code: string; name: string }[];
}

/**
 * Selected upper-level coursework, grouped by Georgia Tech CS thread.
 * Every course is named in a project description on this site (Video
 * Game Design in Dark Ascent, Database Systems in Drone Dispatch) and
 * the thread mapping is the Georgia Tech catalog's: CS 4455 is a Media
 * thread technology, CS 4400 a Systems & Architecture elective. The
 * Intelligence thread has no course named anywhere on the site or the
 * résumé, so it is left out rather than filled in.
 */
export const selectedCoursework: CourseworkGroup[] = [
  {
    thread: 'Media',
    courses: [
      { code: 'CS 4455 / CS 6457', name: 'Video Game Design' },
    ],
  },
  {
    thread: 'Systems',
    courses: [
      { code: 'CS 4400', name: 'Introduction to Database Systems' },
    ],
  },
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
    details: ['Threads: Intelligence and Media', 'Graduated summa cum laude (Georgia Tech\u2019s Highest Honor).'],
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
];
