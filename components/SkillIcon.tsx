import type { ComponentType } from 'react';
import {
  SiPython,
  SiTypescript,
  SiJavascript,
  SiSharp,
  SiCplusplus,
  SiHtml5,
  SiCss,
  SiLua,
  SiGit,
  SiGithub,
  SiGitlab,
  SiGithubactions,
  SiMysql,
  SiMongodb,
  SiCloudflare,
  SiReact,
  SiNextdotjs,
  SiTailwindcss,
  SiDocker,
  SiGooglecloud,
  SiTerraform,
  SiFirebase,
  SiFlask,
  SiUnity,
  SiNodedotjs,
  SiSonarqubeserver,
  SiCursor,
  SiClaudecode,
} from 'react-icons/si';
import {
  FaAws,
  FaCalculator,
  FaHeadset,
  FaJava,
  FaMicrosoft,
  FaPlug,
  FaRobot,
} from 'react-icons/fa';
import {
  ArchiveBoxIcon,
  ArrowsRightLeftIcon,
  BeakerIcon,
  BoltIcon,
  ChartBarIcon,
  ChatBubbleLeftRightIcon,
  CircleStackIcon,
  CloudIcon,
  LinkIcon,
  RocketLaunchIcon,
  SparklesIcon,
} from '@heroicons/react/24/outline';

type IconComponent = ComponentType<{ className?: string }>;

const ICONS: Record<string, IconComponent> = {
  python: SiPython,
  typescript: SiTypescript,
  javascript: SiJavascript,
  csharp: SiSharp,
  cplusplus: SiCplusplus,
  html5: SiHtml5,
  css: SiCss,
  lua: SiLua,
  git: SiGit,
  github: SiGithub,
  gitlab: SiGitlab,
  cicd: SiGithubactions,
  mysql: SiMysql,
  mongodb: SiMongodb,
  cloudflare: SiCloudflare,
  react: SiReact,
  nextjs: SiNextdotjs,
  tailwind: SiTailwindcss,
  docker: SiDocker,
  gcp: SiGooglecloud,
  vertex: SiGooglecloud,
  terraform: SiTerraform,
  firebase: SiFirebase,
  firestore: SiFirebase,
  flask: SiFlask,
  unity: SiUnity,
  nodejs: SiNodedotjs,
  sonarqube: SiSonarqubeserver,
  cursor: SiCursor,
  claudecode: SiClaudecode,
  java: FaJava,
  aws: FaAws,
  azure: FaMicrosoft,
  matlab: FaCalculator,
  connect: FaHeadset,
  rest: FaPlug,
  openai: FaRobot,
  lex: ChatBubbleLeftRightIcon,
  sierra: SparklesIcon,
  cyara: BeakerIcon,
  lambda: BoltIcon,
  dynamodb: CircleStackIcon,
  s3: ArchiveBoxIcon,
  cloudwatch: ChartBarIcon,
  apigateway: ArrowsRightLeftIcon,
  heroku: CloudIcon,
  flyio: RocketLaunchIcon,
  langchain: LinkIcon,
};

interface SkillIconProps {
  icon: string;
  className?: string;
}

function SkillIcon({ icon, className = 'h-5 w-5' }: SkillIconProps) {
  const Icon = ICONS[icon] ?? SparklesIcon;
  return <Icon className={className} aria-hidden="true" />;
}

export default SkillIcon;
