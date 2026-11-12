export interface ExperienceLink {
  label: string;
  url: string;
}

export interface ExperienceEntry {
  id: string;
  company: string;
  companyTagline: string;
  title: string;
  dateRange: string;
  location: string;
  monogram: string;
  summary: string;
  highlights: string[];
  /** Condensed highlights for the home-page featured block; /experience keeps the full list. */
  shortHighlights?: string[];
  links: ExperienceLink[];
}

export const experience: ExperienceEntry[] = [
  {
    id: 'geico',
    company: 'GEICO',
    companyTagline: 'Tech',
    title: 'Software Engineer II — Conversational AI & IVR',
    dateRange: 'July 2024 – Present',
    location: 'Atlanta, GA (Remote)',
    monogram: 'G',
    summary:
      'Conversational AI / IVR engineer on GEICO\u2019s customer-service automation platforms. Joined through the Technology Development Program as a Software Engineer I and promoted to Software Engineer II. Largest single contributor to the Sierra AI billing agent, alongside the Amazon Connect platform work.',
    highlights: [
      'Co-develop and operate the Sierra AI billing voice agent (live May 2026): ~30,000 calls a week across payments, rescheduling, AutoPay, and billing questions in English and Spanish \u2014 about 51% of 436,000+ conversations contained without a live-agent transfer (May\u2013Oct 2026), trending from 48% to 52% as volume grew roughly tenfold.',
      'Delivered the agent\u2019s end-to-end make-payment flow \u2014 saved payment methods, scheduled payments, declined- and expired-card recovery, and payments on policies pending cancellation: 22,600+ payments completed at a 92\u201395% authorization success rate. Shipped Pause AutoPay as a net-new capability, plus 82,800 reschedules and 192,000 informational answers at a 98% tool success rate.',
      'Re-architected the billing agent from regex- and classifier-based routing to fact-based journeys (178 files, ~20,000 net lines removed), and built the simulation-based regression quality gates that keep its releases safe.',
      'Fixed 86 of 91 production billing bugs at the root cause; authored 468 pull requests, reviewed 653 PRs for 12+ engineers, and onboarded two engineers onto the Sierra platform.',
      'Migrated legacy Cisco UCCE + Nuance IVR to Amazon Connect on AWS, including Java traffic-redirection logic for gradual live cutover, a zero-amount-due flow, reworked billing error handling, and legacy endpoint and Lex migrations.',
      'Built the AWS self-service payment IVR (~60% containment) and led the Proof of Coverage IVR (~80% containment); own the Proof of Coverage disaster-recovery rebuild pipeline.',
      'Async orchestration with AWS Lambda and DynamoDB; secure APIs with AES encryption for customer and payment data; Terraform infrastructure pipelines; Cyara testing; production support and on-call.',
    ],
    shortHighlights: [
      'Co-develop and operate the Sierra AI billing voice agent — ~30,000 calls a week in English and Spanish, with about 51% of 436,000+ conversations contained without a live-agent transfer (May–Oct 2026).',
      'Delivered the agent’s end-to-end make-payment flow: 22,600+ payments completed at a 92–95% authorization success rate, plus Pause AutoPay, 82,800 reschedules, and 192,000 informational answers at 98%.',
      'Re-architected the agent from regex- and classifier-based routing to fact-based journeys (178 files, ~20,000 net lines removed), and built the simulation-based regression quality gates that keep its releases safe.',
    ],
    links: [{ label: 'Company Website', url: 'https://www.geico.com/tech/' }],
  },
  {
    id: 'publicis-sapient',
    company: 'Publicis Sapient',
    companyTagline: 'Digital Business Transformation & Consulting',
    title: 'Software Engineer Intern',
    dateRange: 'June 2023 – August 2023',
    location: 'Atlanta, GA',
    monogram: 'PS',
    summary:
      'Built an AI chatbot application for the Travel & Hospitality industry, designed for WhatsApp, on a cross-functional team.',
    highlights: [
      'Engineered a WhatsApp AI chatbot using Google Vertex AI\u2019s PaLM LLM, LangChain, MongoDB, and APIs, giving tourists engaging conversations, accurate and up-to-date answers, live data, and recommendations for Atlanta attractions (World of Coca-Cola, Zoo Atlanta, Georgia Aquarium), hotels (like Marriott\u00AE), and restaurants.',
      'Architected RESTful APIs with Flask and Python to bridge the frontend team and backend resources such as the MongoDB databases and the AI chatbot program, enabling the team to generate and retrieve responses effectively.',
      'Automated the CI/CD (DevOps) pipeline through GitLab and Docker; deployed frontend applications on Google Firebase Hosting and backend applications on Google App Engine.',
      'Improved the accuracy of the bot\u2019s responses up to 91% through rigorous testing and validation.',
      'Assembled an interactive map website to serve chatbot options and venue information to users.',
      'Our efforts were met with great satisfaction from our client and coaches — we outperformed the team in Boston, as well as all the other teams in the Atlanta office.',
    ],
    links: [
      { label: 'Company Website', url: 'https://www.publicissapient.com/' },
    ],
  },
  {
    id: 'ecocar',
    company: 'Georgia Tech EcoCAR EV Challenge',
    companyTagline: 'VIP Program',
    title: 'Software Engineer (Connected and Automated Vehicles Team)',
    dateRange: 'January 2022 – May 2023',
    location: 'Atlanta, GA',
    monogram: 'GT',
    summary:
      'Connected and Automated Vehicles (CAV) software engineer for the Georgia Tech EcoCAR EV Challenge at the Georgia Institute of Technology, on the Vehicle-to-Everything (V2X) subteam.',
    highlights: [
      'Used multiple data streams from cameras and sensors to develop a state machine enabling the car to make intelligent decisions in various traffic light scenarios — for example, based on the distance to the traffic light, determining whether the car should stop or continue driving, improving fuel efficiency and user experience.',
      'The EcoCAR EV Challenge is a prestigious 4-year collegiate competition and a $1 million research program sponsored by Argonne National Labs, the U.S. Department of Energy, General Motors, MathWorks, Intel, and more.',
      'Contributed to the Georgia Tech team\u2019s victory in the 2022 EcoCAR EV Challenge, where we secured 1st place.',
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
  {
    id: 'ncr-voyix',
    company: 'NCR Voyix',
    companyTagline: 'Formerly \u201CNCR Corporation\u201D',
    title: 'Software Engineer Intern',
    dateRange: 'July 2019 – August 2019',
    location: 'Atlanta, GA',
    monogram: 'N',
    summary:
      'Developed a machine learning program using MATLAB — a language and environment that was completely new to me — as a high school intern.',
    highlights: [
      'Trained and fine-tuned a neural network using an architecture like AlexNet on a dataset of images where each image was associated with a person\u2019s name, using live footage from a computer webcam to correctly identify people\u2019s faces — a classification problem involving elements of facial recognition.',
      'Learned the basics of MATLAB in just a week, relying heavily on documentation to aid development of the program.',
    ],
    links: [{ label: 'Company Website', url: 'https://www.ncr.com/' }],
  },
];
