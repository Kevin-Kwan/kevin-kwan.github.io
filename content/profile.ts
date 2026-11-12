export interface Metric {
  value: string;
  label: string;
  detail: string;
  /** Numeric target for the count-up animation; display string stays `value`. */
  countTo?: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
}

export interface ExpertiseArea {
  title: string;
  description: string;
  points: string[];
}

export const profile = {
  name: 'Kevin Kwan',
  role: 'Software Engineer II',
  specialty: 'Conversational AI & IVR',
  employer: 'GEICO',
  location: 'Atlanta, Georgia',
  openToOpportunities: true,
  availabilityNote: 'Open to new opportunities',
  tagline:
    'I build voice AI that answers the phone — conversational AI and IVR systems on Amazon Connect and AWS that resolve real customer calls at scale.',
  heroIntro:
    'Software Engineer II building production voice AI and cloud systems. At GEICO, I co-build conversational agents that handle about 30,000 calls a week — owning critical payment journeys, architecture improvements, and production reliability.',
  interests: [
    'AI/ML',
    'Conversational AI',
    'Game Development',
    'Cybersecurity',
    'Reverse Engineering',
    'Web & Application Development',
  ],
  closingLine:
    'Always in pursuit of building impactful, purposeful software.',
} as const;

export const metrics: Metric[] = [
  {
    value: '~30K',
    label: 'Calls per week',
    detail: 'Sierra AI billing agent at GEICO, English & Spanish',
    countTo: 30,
    prefix: '~',
    suffix: 'K',
  },
  {
    value: '436K+',
    label: 'Conversations handled',
    detail: 'May–Oct 2026, ~51% contained without a live agent',
    countTo: 436,
    suffix: 'K+',
  },
  {
    value: '22,600+',
    label: 'Payments completed',
    detail: 'Through the voice agent, 92–95% authorization success',
    countTo: 22600,
    suffix: '+',
  },
  {
    value: '3.9',
    label: 'GPA · summa cum laude',
    detail: 'B.S. Computer Science, Georgia Tech (2024)',
    countTo: 3.9,
    decimals: 1,
  },
];

export const expertiseAreas: ExpertiseArea[] = [
  {
    title: 'Conversational AI & Voice',
    description:
      'AI voice agents and IVR systems that hold real conversations and resolve calls without an agent.',
    points: ['Amazon Connect', 'Amazon Lex', 'Sierra AI', 'Cyara testing'],
  },
  {
    title: 'Cloud & AWS',
    description:
      'Event-driven, asynchronous backends on AWS with infrastructure as code and production on-call ownership.',
    points: ['Lambda', 'DynamoDB', 'S3', 'Terraform'],
  },
  {
    title: 'Full-Stack Engineering',
    description:
      'End-to-end product development across the stack, from REST APIs to modern front-ends.',
    points: ['Java', 'Python', 'TypeScript', 'Next.js / React'],
  },
];
