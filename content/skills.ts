export interface Skill {
  name: string;
  /** Key resolved to a react-icons component by components/SkillIcon.tsx. */
  icon: string;
  href?: string;
  /** One-line production proof, shown on /skills under the group's chips. */
  evidence?: string;
}

export interface SkillCategory {
  id: string;
  title: string;
  blurb: string;
  skills: Skill[];
}

export const skillCategories: SkillCategory[] = [
  {
    id: 'languages',
    title: 'Languages',
    blurb: 'The languages I reach for first, at work and on side projects.',
    skills: [
      {
        name: 'Java',
        icon: 'java',
        href: 'https://www.java.com',
        evidence:
          'Traffic-redirection logic for the Amazon Connect cutover at GEICO',
      },
      {
        name: 'Python',
        icon: 'python',
        href: 'https://python.org',
        evidence: 'Chatbot APIs at Publicis Sapient · Flask + LangChain',
      },
      {
        name: 'TypeScript',
        icon: 'typescript',
        href: 'https://www.typescriptlang.org/',
        evidence: 'This site — Next.js app, content managed as typed data',
      },
      {
        name: 'JavaScript',
        icon: 'javascript',
        href: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript',
        evidence: 'CutieBot — open-source Discord bot with slash commands',
      },
      {
        name: 'C#',
        icon: 'csharp',
        href: 'https://dotnet.microsoft.com/en-us/languages/csharp',
      },
      { name: 'C++', icon: 'cplusplus', href: 'https://isocpp.org/' },
      {
        name: 'HTML',
        icon: 'html5',
        href: 'https://developer.mozilla.org/en-US/docs/Web/HTML',
      },
      {
        name: 'CSS',
        icon: 'css',
        href: 'https://developer.mozilla.org/en-US/docs/Web/CSS',
      },
      { name: 'Lua', icon: 'lua', href: 'https://www.lua.org/' },
      { name: 'MATLAB', icon: 'matlab', href: 'https://matlab.mathworks.com/' },
    ],
  },
  {
    id: 'conversational-ai',
    title: 'Conversational AI & Voice',
    blurb: 'My specialty — the stack behind GEICO\u2019s voice automation.',
    skills: [
      {
        name: 'Amazon Connect',
        icon: 'connect',
        href: 'https://aws.amazon.com/connect/',
        evidence: 'Billing + Proof of Coverage IVRs at GEICO · ~80% PoC containment',
      },
      {
        name: 'Amazon Lex',
        icon: 'lex',
        href: 'https://aws.amazon.com/lex/',
        evidence: 'Pattern cutover from the legacy IVR endpoints',
      },
      {
        name: 'Sierra AI',
        icon: 'sierra',
        href: 'https://www.sierra.ai/',
        evidence: 'Billing voice agent · 436K+ conversations, ~51% contained',
      },
      {
        name: 'Cyara',
        icon: 'cyara',
        href: 'https://www.cyara.com/',
        evidence: 'IVR regression testing',
      },
      { name: 'OpenAI', icon: 'openai', href: 'https://openai.com/' },
      {
        name: 'LangChain',
        icon: 'langchain',
        href: 'https://www.langchain.com/',
      },
      {
        name: 'Google Vertex AI',
        icon: 'vertex',
        href: 'https://cloud.google.com/vertex-ai',
      },
    ],
  },
  {
    id: 'cloud-devops',
    title: 'Cloud & DevOps',
    blurb: 'AWS-first infrastructure, automation, and delivery pipelines.',
    skills: [
      { name: 'AWS', icon: 'aws', href: 'https://aws.amazon.com/' },
      {
        name: 'Lambda',
        icon: 'lambda',
        href: 'https://aws.amazon.com/lambda/',
        evidence: 'Tool execution layer for the voice agents',
      },
      {
        name: 'DynamoDB',
        icon: 'dynamodb',
        href: 'https://aws.amazon.com/dynamodb/',
        evidence: 'Async orchestration for IVR/agent workflows',
      },
      { name: 'S3', icon: 's3', href: 'https://aws.amazon.com/s3/' },
      {
        name: 'CloudWatch',
        icon: 'cloudwatch',
        href: 'https://aws.amazon.com/cloudwatch/',
      },
      {
        name: 'API Gateway',
        icon: 'apigateway',
        href: 'https://aws.amazon.com/api-gateway/',
      },
      {
        name: 'Terraform',
        icon: 'terraform',
        href: 'https://www.terraform.io/',
        evidence: 'Infrastructure as code for Connect/Lambda stack',
      },
      { name: 'Docker', icon: 'docker', href: 'https://www.docker.com/' },
      {
        name: 'CI/CD',
        icon: 'cicd',
        href: 'https://github.com/features/actions',
      },
      {
        name: 'Google Cloud Platform',
        icon: 'gcp',
        href: 'https://www.google.com/cloud/',
      },
      {
        name: 'Microsoft Azure',
        icon: 'azure',
        href: 'https://azure.microsoft.com/en-us/',
      },
      {
        name: 'Cloudflare',
        icon: 'cloudflare',
        href: 'https://www.cloudflare.com/',
      },
      { name: 'Heroku', icon: 'heroku', href: 'https://heroku.com/' },
      { name: 'Fly.io', icon: 'flyio', href: 'https://www.fly.io/' },
    ],
  },
  {
    id: 'web-frameworks',
    title: 'Web & Frameworks',
    blurb: 'Front-ends, APIs, and application frameworks.',
    skills: [
      {
        name: 'React',
        icon: 'react',
        href: 'https://react.dev/',
        evidence: 'This site + the Drone Dispatch delivery-system UI',
      },
      {
        name: 'Next.js',
        icon: 'nextjs',
        href: 'https://nextjs.org/',
        evidence: 'Portfolio site, Drone Dispatch, CompAnIon learning platform',
      },
      { name: 'Node.js', icon: 'nodejs', href: 'https://nodejs.org/' },
      {
        name: 'Tailwind CSS',
        icon: 'tailwind',
        href: 'https://tailwindcss.com/',
      },
      {
        name: 'Flask',
        icon: 'flask',
        href: 'https://flask.palletsprojects.com/',
        evidence: 'API layer for the Publicis Sapient travel chatbot',
      },
      {
        name: 'REST APIs',
        icon: 'rest',
        href: 'https://restfulapi.net/',
        evidence: 'Drone Dispatch API routes · AES-encrypted payment APIs at GEICO',
      },
      { name: 'Firebase', icon: 'firebase', href: 'https://firebase.google.com/' },
    ],
  },
  {
    id: 'data',
    title: 'Data',
    blurb: 'Relational, document, and managed data stores.',
    skills: [
      {
        name: 'MySQL',
        icon: 'mysql',
        href: 'https://www.mysql.com/',
        evidence: 'Drone Dispatch delivery-system database (CS 4400)',
      },
      {
        name: 'MongoDB',
        icon: 'mongodb',
        href: 'https://www.mongodb.com/',
        evidence: 'CutieBot + Publicis Sapient chatbot data layer',
      },
      {
        name: 'Cloud Firestore',
        icon: 'firestore',
        href: 'https://firebase.google.com/docs/firestore',
        evidence: 'Client careers portal — listings, benefits, applications',
      },
    ],
  },
  {
    id: 'tools-platforms',
    title: 'Tools & Platforms',
    blurb: 'Version control, collaboration, and game development tooling.',
    skills: [
      {
        name: 'Git',
        icon: 'git',
        href: 'https://git-scm.com/',
        evidence: '468 PRs authored · 653 reviewed at GEICO',
      },
      {
        name: 'GitHub',
        icon: 'github',
        href: 'https://www.github.com/',
        evidence: "This site's repo + open-source contributions (PreMiD)",
      },
      {
        name: 'GitLab',
        icon: 'gitlab',
        href: 'https://www.gitlab.com/',
        evidence: 'CI/CD pipeline for the Publicis Sapient chatbot',
      },
      {
        name: 'Unity',
        icon: 'unity',
        href: 'https://unity.com/',
        evidence: 'Dark Ascent, Project Blu + movement/physics prototypes',
      },
      {
        name: 'SonarQube',
        icon: 'sonarqube',
        href: 'https://www.sonarsource.com/products/sonarqube/',
      },
      { name: 'Cursor', icon: 'cursor', href: 'https://cursor.com/' },
      {
        name: 'Claude Code',
        icon: 'claudecode',
        href: 'https://claude.com/product/claude-code',
      },
    ],
  },
];

/** Flat list used for the home-page skills snapshot. */
export const coreSkills: string[] = [
  'Java',
  'Python',
  'TypeScript',
  'Amazon Connect',
  'Amazon Lex',
  'Sierra AI',
  'AWS Lambda',
  'DynamoDB',
  'Terraform',
  'React',
  'Next.js',
  'REST APIs',
  'Cyara',
  'Git',
  'CI/CD',
];
