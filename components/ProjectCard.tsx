import { ArrowTopRightOnSquareIcon } from '@heroicons/react/24/outline';
import { FaGithub } from 'react-icons/fa';
import type { Project } from '../content/projects';
import SpotlightCard from './SpotlightCard';
import TechTag from './TechTag';

interface ProjectCardProps {
  project: Project;
}

function ProjectCard({ project }: ProjectCardProps) {
  const demoIsExternal = project.demo?.url.startsWith('http');

  return (
    <SpotlightCard className="flex h-full flex-col rounded-2xl border border-white/10 bg-surface p-6 transition-colors duration-200 hover:border-white/20">
      <h3 className="text-lg font-semibold leading-snug tracking-tight text-zinc-50">
        {project.name}
      </h3>
      <p className="mt-3 flex-1 text-sm leading-relaxed text-zinc-400">
        {project.description}
      </p>

      {project.tech.length > 0 && (
        <div className="mt-4 flex flex-wrap gap-1.5">
          {project.tech.map((tech) => (
            <TechTag key={tech} label={tech} />
          ))}
        </div>
      )}

      {(project.githubUrl || project.demo) && (
        <div className="mt-6 flex flex-wrap gap-3 border-t border-white/5 pt-4">
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-lg border border-white/10 bg-white/[0.04] px-3.5 py-2 text-sm font-medium text-zinc-100 transition-colors hover:border-white/25 hover:bg-white/[0.08]"
            >
              <FaGithub className="h-4 w-4" aria-hidden="true" />
              GitHub
            </a>
          )}
          {project.demo && (
            <a
              href={project.demo.url}
              {...(demoIsExternal
                ? { target: '_blank', rel: 'noopener noreferrer' }
                : {})}
              className="inline-flex items-center gap-2 rounded-lg border border-cyan-400/20 bg-cyan-400/10 px-3.5 py-2 text-sm font-medium text-cyan-200 transition-colors hover:bg-cyan-400/20"
            >
              <ArrowTopRightOnSquareIcon
                className="h-4 w-4"
                aria-hidden="true"
              />
              {project.demo.label}
            </a>
          )}
        </div>
      )}
    </SpotlightCard>
  );
}

export default ProjectCard;
