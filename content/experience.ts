import type { OrgLogoSpec } from '../components/OrgLogo';

export interface ExperienceLink {
  label: string;
  url: string;
}

export interface ExperienceSection {
  title: string;
  points: string[];
}

export interface ExperienceMetric {
  value: string;
  label: string;
}

export interface ExperienceEntry {
  id: string;
  company: string;
  companyTagline?: string;
  title: string;
  dateRange: string;
  location: string;
  /** Organization logo tile; omitted when no public brand mark is used. */
  logo?: OrgLogoSpec;
  summary: string;
  /**
   * Flat bullet list for the plain card view. Omit when `sections` is
   * present — the sectioned view renders those points instead, and a
   * second copy of the same bullets only drifts (GEICO's did, verbatim).
   */
  highlights?: string[];
  /** Highlights grouped into workstream sections (full /experience view). */
  sections?: ExperienceSection[];
  /** Headline metrics rendered as a strip under the summary. */
  metricStrip?: ExperienceMetric[];
  /** Role progression within this entry (full /experience view). */
  roles?: { title: string; period: string }[];
  /** Condensed highlights for the home-page featured block; /experience keeps the full list. */
  shortHighlights?: string[];
  links: ExperienceLink[];
}

export const experience: ExperienceEntry[] = [
  {
    id: 'geico',
    company: 'GEICO',
    companyTagline: 'Insurance technology',
    title: 'Software Engineer II — Conversational AI & IVR',
    dateRange: 'July 2024 – Present',
    location: 'Atlanta, GA (Remote)',
    summary:
      'Conversational AI / IVR engineer on GEICO’s customer-service automation platforms. Joined as a Software Engineer I and promoted to Software Engineer II. Drove core implementation architecture and primary feature development for the AI billing voice agent, alongside the Amazon Connect platform work.',
    sections: [
      {
        title: 'AI Billing Voice Agent',
        points: [
          'Co-develop and operate the billing voice agent (Sierra AI, in production): handling payments, rescheduling, AutoPay, and billing questions in English and Spanish, including handoff to a live agent when a conversation needs one.',
          'Delivered the agent’s end-to-end make-payment flow — saved payment methods, scheduled payments, declined- and expired-card recovery, and payments on policies pending cancellation. Shipped Pause AutoPay as a net-new capability, plus rescheduling and informational answers across billing topics.',
          'Re-architected the billing agent from regex- and classifier-based routing to fact-based journeys, and built the simulation-based regression quality gates that keep its releases safe.',
        ],
      },
      {
        title: 'Amazon Connect IVR',
        points: [
          'Migrated legacy Cisco UCCE + Nuance IVR to Amazon Connect on AWS, including Java traffic-redirection logic for gradual live cutover, a zero-amount-due flow, reworked billing error handling, and legacy endpoint and Lex migrations.',
          'Built the AWS self-service payment IVR and led the Proof of Coverage IVR; own the Proof of Coverage disaster-recovery rebuild pipeline.',
          'Async orchestration with AWS Lambda and DynamoDB; secure APIs with AES encryption for customer and payment data; Terraform infrastructure pipelines; Cyara testing; production support and on-call.',
        ],
      },
      {
        title: 'Impact & Mentorship',
        points: [
          'Fixed production billing bugs at the root cause; reviewed pull requests across the team and onboarded teammates onto the Sierra platform.',
        ],
      },
    ],
    metricStrip: [
      {
        value: 'Voice AI',
        label: 'Billing agent in production, English & Spanish',
      },
      {
        value: 'End-to-end',
        label: 'Payment journeys, incl. Pause AutoPay',
      },
      {
        value: 'Amazon Connect',
        label: 'IVR platforms, migrated from Cisco UCCE + Nuance',
      },
      { value: 'Cloud', label: 'Lambda, DynamoDB, Lex, Terraform' },
    ],
    shortHighlights: [
      'Co-develop and operate the billing voice agent (Sierra AI) in English and Spanish, handling payments, rescheduling, AutoPay, and billing questions, including handoff to a live agent when needed.',
      'Delivered the agent’s end-to-end make-payment flow, plus Pause AutoPay, rescheduling, and informational answers across billing topics.',
      'Re-architected the billing agent from regex- and classifier-based routing to fact-based journeys, and built the simulation-based regression quality gates that keep its releases safe.',
    ],
    links: [],
  },
  {
    id: 'publicis-sapient',
    company: 'Publicis Sapient',
    companyTagline: 'Digital Business Transformation & Consulting',
    title: 'Software Engineer Intern',
    dateRange: 'June 2023 – August 2023',
    location: 'Atlanta, GA',
    logo: {
      src: '/logos/publicis-sapient.svg',
      alt: 'Publicis Sapient logo',
      imgClassName: 'p-2.5',
    },
    summary:
      'Built an AI chatbot application for the Travel & Hospitality industry, designed for WhatsApp, on a cross-functional team.',
    highlights: [
      'Engineered a WhatsApp AI chatbot using Google Vertex AI\u2019s PaLM LLM, LangChain, MongoDB, and APIs, giving tourists engaging conversations, accurate and up-to-date answers, live data, and recommendations for Atlanta attractions (World of Coca-Cola, Zoo Atlanta, Georgia Aquarium), hotels (like Marriott\u00AE), and restaurants.',
      'Architected RESTful APIs with Flask and Python to bridge the frontend team and backend resources such as the MongoDB databases and the AI chatbot program, enabling the team to generate and retrieve responses effectively.',
      'Automated the CI/CD (DevOps) pipeline through GitLab and Docker; deployed frontend applications on Google Firebase Hosting and backend applications on Google App Engine.',
      'Improved the accuracy of the bot’s responses through rigorous testing and validation.',
      'Assembled an interactive map website to serve chatbot options and venue information to users.',
    ],
    links: [
      { label: 'Company Website', url: 'https://www.publicissapient.com/' },
    ],
  },
  {
    id: 'ecocar',
    company: 'Georgia Tech EcoCAR (Electric Vehicle) Mobility Challenge',
    companyTagline: 'VIP Program',
    title: 'Software Engineer (Connected and Automated Vehicles Team)',
    dateRange: 'January 2022 – May 2023',
    location: 'Atlanta, GA',
    logo: {
      src: '/logos/georgia-tech.svg',
      alt: 'Georgia Tech logo',
      imgClassName: 'p-2',
    },
    summary:
      'Connected and Automated Vehicles (CAV) software engineer for the Georgia Tech EcoCAR (Electric Vehicle) Mobility Challenge at the Georgia Institute of Technology, on the Vehicle-to-Everything (V2X) subteam.',
    highlights: [
      'Used multiple data streams from cameras and sensors to develop a state machine enabling the car to make intelligent decisions in various traffic light scenarios — for example, based on the distance to the traffic light, determining whether the car should stop or continue driving, improving fuel efficiency and user experience.',
      'The EcoCAR (Electric Vehicle) Mobility Challenge is a prestigious 4-year collegiate competition and a $1 million research program sponsored by Argonne National Labs, the U.S. Department of Energy, General Motors, MathWorks, Intel, and more.',
      'Contributed to the Georgia Tech team\u2019s victory in the 2022 EcoCAR (Electric Vehicle) Mobility Challenge, where we secured 1st place.',
    ],
    links: [
      {
        label: 'Georgia Tech News — 2022 Victory',
        url: 'https://coe.gatech.edu/news/2022/05/student-team-wins-department-energy-ecocar-mobility-challenge',
      },
      { label: 'Program Website', url: 'https://www.vip.gatech.edu/teams/vpu' },
      { label: 'Team Website', url: 'https://sites.gatech.edu/ecocar/' },
      {
        label: 'Competition Website',
        url: 'https://avtcseries.org/about-the-ecocar-ev-challenge/',
      },
    ],
  },
];
