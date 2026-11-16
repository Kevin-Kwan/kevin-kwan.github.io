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
  /** Headline proof line pinned to the bottom of the expertise card. */
  stat?: string;
}

export const profile = {
  name: 'Kevin Kwan',
  role: 'Software Engineer II',
  specialty: 'Conversational AI & IVR',
  employer: 'a major U.S. auto insurer',
  location: 'Atlanta, Georgia',
  tagline:
    'I build voice AI that answers the phone — conversational AI and IVR systems on Amazon Connect and AWS that resolve real customer calls at scale.',
  heroIntro:
    'Software Engineer II building production voice AI and cloud systems. At a major U.S. auto insurer, I co-build conversational agents that handle billing calls at scale — owning critical payment journeys, architecture improvements, and production reliability.',
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
 * Qualitative proof points for the home metrics band. No employer
 * figures are published here — values are descriptive only, so none of
 * them carries a count-up target.
 */
export const metrics: Metric[] = [
  {
    value: 'High',
    label: 'Containment',
    detail: 'Billing conversations resolved without a live agent',
  },
  {
    value: 'Live',
    label: 'Billing voice agent',
    detail: 'Payments, rescheduling and AutoPay, English & Spanish',
  },
  {
    value: 'End-to-end',
    label: 'Payment journeys',
    detail: 'Saved methods, scheduled payments, card recovery',
  },
  {
    value: 'Production',
    label: 'IVR platforms',
    detail: 'Amazon Connect billing and Proof of Coverage IVRs',
  },
];

export const expertiseAreas: ExpertiseArea[] = [
  {
    title: 'Conversational AI & Voice',
    description:
      'AI voice agents and IVR systems that hold real conversations and resolve calls without an agent.',
    points: ['Amazon Connect', 'Amazon Lex', 'Sierra AI', 'Cyara testing'],
    stat: 'Production billing voice agent · high containment',
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
