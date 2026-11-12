export interface Metric {
  value: string;
  label: string;
  detail: string;
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
    'Software Engineer II at GEICO working on conversational AI / IVR. Georgia Tech Computer Science, summa cum laude. I helped migrate a legacy Cisco UCCE + Nuance IVR platform to Amazon Connect, and I co-built the Sierra AI billing agent that now handles about 30,000 calls a week — alongside a self-service payment IVR at roughly 60% containment and a Proof of Coverage IVR at roughly 80%.',
  interests: [
    'AI/ML',
    'Conversational AI',
    'Game Development',
    'Cybersecurity',
    'Reverse Engineering',
    'Web & Application Development',
  ],
  closingLine:
    'Always in pursuit of creating impactful and purposeful works.',
} as const;

export const metrics: Metric[] = [
  {
    value: '~30K',
    label: 'Calls per week',
    detail: 'Sierra AI billing agent at GEICO, English & Spanish',
  },
  {
    value: '436K+',
    label: 'Conversations handled',
    detail: 'May–Oct 2026, ~51% contained without a live agent',
  },
  {
    value: '22,600+',
    label: 'Payments completed',
    detail: 'Through the voice agent, 92–95% authorization success',
  },
  {
    value: '3.9',
    label: 'GPA · summa cum laude',
    detail: 'B.S. Computer Science, Georgia Tech (2024)',
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
