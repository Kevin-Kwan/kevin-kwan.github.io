export interface Skill {
  name: string;
  /** Key resolved to a react-icons component by components/SkillIcon.tsx. */
  icon: string;
  href?: string;
}

/**
 * One tier of the skills inventory. Tiers are ordered by how central the
 * tools are to the day-to-day work — the production languages and the
 * conversational AI stack first, tools picked up along the way last.
 * A tier groups by area; it is not a proficiency score, and no levels or
 * percentages are claimed anywhere.
 */
export interface SkillTier {
  id: string;
  title: string;
  blurb: string;
  skills: Skill[];
}

export const skillTiers: SkillTier[] = [
  {
    id: 'core-languages',
    title: 'Core Production Languages',
    blurb:
      'The languages behind my production work — voice agents, IVRs, and full-stack systems.',
    skills: [
      {
        name: 'Java',
        icon: 'java',
        href: 'https://www.java.com',
      },
      {
        name: 'Python',
        icon: 'python',
        href: 'https://python.org',
      },
      {
        name: 'TypeScript',
        icon: 'typescript',
        href: 'https://www.typescriptlang.org/',
      },
      {
        name: 'JavaScript',
        icon: 'javascript',
        href: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript',
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
    ],
  },
  {
    id: 'ai-agentic',
    title: 'AI & Agentic Workflows',
    blurb: 'My specialty — the stack behind GEICO’s voice automation.',
    skills: [
      {
        name: 'Amazon Connect',
        icon: 'connect',
        href: 'https://aws.amazon.com/connect/',
      },
      {
        name: 'Amazon Lex',
        icon: 'lex',
        href: 'https://aws.amazon.com/lex/',
      },
      {
        name: 'Sierra AI',
        icon: 'sierra',
        href: 'https://www.sierra.ai/',
      },
      {
        name: 'Cyara',
        icon: 'cyara',
        href: 'https://www.cyara.com/',
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
    id: 'cloud-services',
    title: 'Cloud Services & IaC',
    blurb:
      'AWS-first services and infrastructure automation behind the production systems.',
    skills: [
      { name: 'AWS', icon: 'aws', href: 'https://aws.amazon.com/' },
      {
        name: 'Lambda',
        icon: 'lambda',
        href: 'https://aws.amazon.com/lambda/',
      },
      {
        name: 'DynamoDB',
        icon: 'dynamodb',
        href: 'https://aws.amazon.com/dynamodb/',
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
      },
      { name: 'Docker', icon: 'docker', href: 'https://www.docker.com/' },
      {
        name: 'CI/CD',
        icon: 'cicd',
        href: 'https://github.com/features/actions',
      },
    ],
  },
  {
    id: 'deployment-platforms',
    title: 'Deployment Platforms',
    blurb: 'Other clouds and hosting platforms used across projects.',
    skills: [
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
      },
      {
        name: 'Next.js',
        icon: 'nextjs',
        href: 'https://nextjs.org/',
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
      },
      {
        name: 'REST APIs',
        icon: 'rest',
        href: 'https://restfulapi.net/',
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
      },
      {
        name: 'MongoDB',
        icon: 'mongodb',
        href: 'https://www.mongodb.com/',
      },
      {
        name: 'Cloud Firestore',
        icon: 'firestore',
        href: 'https://firebase.google.com/docs/firestore',
      },
    ],
  },
  {
    id: 'developer-tooling',
    title: 'Developer Tooling',
    blurb:
      'Version control, code quality, AI-assisted development, and game tooling.',
    skills: [
      {
        name: 'Git',
        icon: 'git',
        href: 'https://git-scm.com/',
      },
      {
        name: 'GitHub',
        icon: 'github',
        href: 'https://www.github.com/',
      },
      {
        name: 'GitLab',
        icon: 'gitlab',
        href: 'https://www.gitlab.com/',
      },
      {
        name: 'Unity',
        icon: 'unity',
        href: 'https://unity.com/',
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
  {
    id: 'additional-languages',
    title: 'Additional Languages',
    blurb:
      'Picked up along the way — used on side projects and earlier work rather than in production systems.',
    skills: [
      { name: 'Lua', icon: 'lua', href: 'https://www.lua.org/' },
      { name: 'MATLAB', icon: 'matlab', href: 'https://matlab.mathworks.com/' },
    ],
  },
];

/** Flat list used by the home-page marquee (components/TechMarquee.tsx). */
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
