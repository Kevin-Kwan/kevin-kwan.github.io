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
  monogram: string;
  gpa?: string;
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
    monogram: 'GT',
    gpa: '3.9, summa cum laude',
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
    monogram: 'GTC',
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
    monogram: 'GSMST',
    gpa: '4.211',
    details: [],
    links: [{ label: 'School Website', url: 'https://www.gcpsk12.org/GSMST' }],
  },
];
