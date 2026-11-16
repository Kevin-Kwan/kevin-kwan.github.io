export interface Metric {
  value: string;
  label: string;
  detail: string;
}

export interface ExpertiseArea {
  title: string;
  description: string;
  points: string[];
  /** Headline proof line pinned to the bottom of the expertise card. */
  stat?: string;
}

export const profile = {
  name: 'Kevin Kwan',
  role: 'Software Engineer II',
  specialty: 'Conversational AI & IVR',
  employer: 'GEICO',
  location: 'Atlanta, Georgia',
  tagline:
    'I build voice AI that answers the phone — conversational AI and IVR systems on Amazon Connect and AWS that resolve real customer calls at scale.',
  heroIntro:
    'Software Engineer II owning critical payment journeys, architecture improvements, and production reliability for the billing voice agent and Amazon Connect IVRs.',
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

/**
 * Plain capability descriptors for the home band. These are words, not
 * measurements — no employer figures are published here.
 */
export const metrics: Metric[] = [
  {
    value: 'Voice AI',
    label: 'Billing agent',
    detail: 'Payments, rescheduling and AutoPay, English & Spanish',
  },
  {
    value: 'IVR',
    label: 'Amazon Connect',
    detail: 'Billing and Proof of Coverage IVRs',
  },
  {
    value: 'End-to-end',
    label: 'Payment journeys',
    detail: 'Saved methods, scheduled payments, card recovery',
  },
  {
    value: 'Production',
    label: 'Cloud systems',
    detail: 'Lambda, DynamoDB, Lex, Terraform',
  },
];

export const expertiseAreas: ExpertiseArea[] = [
  {
    title: 'Conversational AI & Voice',
    description:
      'AI voice agents and IVR systems that hold real conversations and resolve calls without an agent.',
    points: ['Amazon Connect', 'Amazon Lex', 'Sierra AI', 'Cyara testing'],
    stat: 'Production billing voice agent in English & Spanish',
  },
  {
    title: 'Cloud & AWS',
    description:
      'Event-driven, asynchronous backends on AWS with infrastructure as code and production on-call ownership.',
    points: ['Lambda', 'DynamoDB', 'S3', 'Terraform'],
    stat: 'Amazon Connect IVR platforms in production',
  },
  {
    title: 'Full-Stack Engineering',
    description:
      'End-to-end product development across the stack, from REST APIs to modern front-ends.',
    points: ['Java', 'Python', 'TypeScript', 'Next.js / React'],
    stat: 'Code review and mentorship across the team',
  },
];
