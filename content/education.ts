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
    details: ['Threads: Intelligence and Media', 'Graduated summa cum laude.'],
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
    gpa: '4.211',
    gpaNote: '(weighted)',
    details: [],
    links: [{ label: 'School Website', url: 'https://www.gcpsk12.org/GSMST' }],
  },
];
