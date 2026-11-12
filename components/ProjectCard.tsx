import type { ReactNode } from 'react';
import { ArrowTopRightOnSquareIcon } from '@heroicons/react/24/outline';
import { FaGithub } from 'react-icons/fa';
import type { Project } from '../content/projects';
import SpotlightCard from './SpotlightCard';
import TechTag from './TechTag';

interface ProjectCardProps {
  project: Project;
  /** 'full' for featured cards; 'compact' for the denser project grid. */
  variant?: 'full' | 'compact';
  /** Pointer-spotlight treatment — reserved for featured cards. */
  spotlight?: boolean;
  /** Traveling border-beam treatment — reserved for featured cards. */
  beam?: boolean;
}

const LINK_CLASSES =
  'inline-flex min-h-10 items-center gap-1.5 px-2 py-2 -mx-2 text-sm font-medium transition-colors';

function ProjectCard({
  project,
  variant = 'full',
  spotlight = false,
  beam = false,
}: ProjectCardProps) {
  const demoIsExternal = project.demo?.url.startsWith('http');
  const hasLinks = Boolean(project.githubUrl || project.demo);

  if (variant === 'compact') {
    return (
      <div className="flex h-full flex-col rounded-2xl border border-white/10 bg-surface p-5 transition-colors duration-200 hover:border-white/20">
        <h3 className="text-base font-semibold leading-snug tracking-tight text-zinc-50">
          {project.name}
        </h3>
        <p className="mt-2 flex-1 text-sm leading-relaxed text-zinc-400">
          {project.blurb}
        </p>
        {project.tech.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-1.5">
            {project.tech.map((tech) => (
              <TechTag key={tech} label={tech} />
            ))}
          </div>
        )}
        {hasLinks && (
          <div className="mt-3 flex flex-wrap gap-x-2 gap-y-1.5">
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={`${LINK_CLASSES} text-zinc-200 hover:text-white`}
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
                className={`${LINK_CLASSES} text-cyan-300 hover:text-cyan-200`}
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
        {!hasLinks && project.note && (
          <p className="mt-4 text-sm italic text-zinc-400">{project.note}</p>
        )}
      </div>
    );
  }

  const body: ReactNode = (
    <>
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

      {hasLinks && (
        <div className="mt-6 flex flex-wrap gap-3 border-t border-white/5 pt-4">
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-10 items-center gap-2 rounded-lg border border-white/10 bg-white/[0.04] px-3.5 py-2 text-sm font-medium text-zinc-100 transition-colors hover:border-white/25 hover:bg-white/[0.08]"
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
              className="inline-flex min-h-10 items-center gap-2 rounded-lg border border-cyan-400/20 bg-cyan-400/10 px-3.5 py-2 text-sm font-medium text-cyan-200 transition-colors hover:bg-cyan-400/20"
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

      {!hasLinks && project.note && (
        <div className="mt-6 border-t border-white/5 pt-4">
          <p className="text-sm italic text-zinc-400">{project.note}</p>
        </div>
      )}
    </>
  );

  const cardClasses = `flex h-full flex-col rounded-2xl border border-white/10 bg-surface p-6 transition-colors duration-200 hover:border-white/20${
    beam ? ' border-beam' : ''
  }`;

  if (spotlight) {
    return <SpotlightCard className={cardClasses}>{body}</SpotlightCard>;
  }
  return <div className={cardClasses}>{body}</div>;
}

export default ProjectCard;
