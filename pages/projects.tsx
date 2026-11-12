import { ArrowTopRightOnSquareIcon } from '@heroicons/react/24/outline';
import { FaGithub } from 'react-icons/fa';
import Seo from '../components/Seo';
import SectionHeading from '../components/SectionHeading';
import ProjectCard from '../components/ProjectCard';
import Reveal from '../components/Reveal';
import { featuredProjects, projectGroups } from '../content/projects';

const ARCHIVE_LINK_CLASSES =
  'inline-flex min-h-10 items-center gap-1.5 px-2 py-2 -mx-2 text-sm font-medium transition-colors';

function Projects() {
  const featuredIds = new Set(featuredProjects.map((project) => project.id));
  const completedGroup = projectGroups.find(
    (group) => group.id === 'completed'
  );
  const completedProjects = (completedGroup?.projects ?? []).filter(
    (project) => !featuredIds.has(project.id)
  );
  const archiveGroup = projectGroups.find(
    (group) => group.id === 'coding-challenges'
  );

  return (
    <>
      <Seo
        title="Projects | Kevin Kwan"
        description="Projects by Kevin Kwan: the CutieBot Discord bot, full-stack web apps, Unity games, machine-learning experiments, and open-source contributions."
        path="/projects"
      />
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
        <SectionHeading
          as="h1"
          eyebrow="Portfolio"
          title="Projects"
          description="Everything from a production Discord bot to Unity games, database systems, and hackathon builds — grouped by status."
        />

        {/* Featured */}
        <section aria-labelledby="group-featured" className="mt-16">
          <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
            <h2
              id="group-featured"
              className="text-2xl font-semibold tracking-tight text-zinc-50"
            >
              Featured Projects
            </h2>
            <p className="text-sm text-zinc-400">
              The ones I&apos;d point you to first.
            </p>
          </div>
          <div className="mt-7 grid items-start gap-5 sm:grid-cols-2">
            {featuredProjects.map((project, i) => (
              <Reveal key={project.id} delay={(i % 2) * 60}>
                <ProjectCard project={project} spotlight beam />
              </Reveal>
            ))}
          </div>
        </section>

        {/* Remaining completed projects — compact cards */}
        {completedGroup && completedProjects.length > 0 && (
          <section aria-labelledby="group-completed" className="mt-16">
            <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
              <h2
                id="group-completed"
                className="text-2xl font-semibold tracking-tight text-zinc-50"
              >
                {completedGroup.title}
              </h2>
              <p className="text-sm text-zinc-400">{completedGroup.blurb}</p>
            </div>
            <div className="mt-7 grid items-start gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {completedProjects.map((project, i) => (
                <Reveal key={project.id} delay={(i % 3) * 60}>
                  <ProjectCard project={project} variant="compact" />
                </Reveal>
              ))}
            </div>
          </section>
        )}

        {/* Archive — coding challenge solutions as a compact list */}
        {archiveGroup && (
          <section aria-labelledby="group-archive" className="mt-16">
            <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
              <h2
                id="group-archive"
                className="text-2xl font-semibold tracking-tight text-zinc-50"
              >
                Archive — coursework &amp; coding challenges
              </h2>
              <p className="text-sm text-zinc-400">{archiveGroup.blurb}</p>
            </div>
            <ul className="mt-7 divide-y divide-white/5 rounded-2xl border border-white/10 bg-surface">
              {archiveGroup.projects.map((project) => (
                <li
                  key={project.id}
                  className="flex flex-col gap-2 px-5 py-4 sm:flex-row sm:items-center sm:gap-5"
                >
                  <div className="min-w-0 flex-1">
                    <h3 className="font-medium text-zinc-50">
                      {project.name}
                    </h3>
                    <p className="mt-0.5 text-sm text-zinc-400">
                      {project.blurb}
                    </p>
                  </div>
                  <div className="flex shrink-0 flex-wrap gap-x-2 gap-y-1.5">
                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`${ARCHIVE_LINK_CLASSES} text-zinc-200 hover:text-white`}
                      >
                        <FaGithub className="h-4 w-4" aria-hidden="true" />
                        GitHub
                      </a>
                    )}
                    {project.demo && (
                      <a
                        href={project.demo.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`${ARCHIVE_LINK_CLASSES} text-cyan-300 hover:text-cyan-200`}
                      >
                        <ArrowTopRightOnSquareIcon
                          className="h-4 w-4"
                          aria-hidden="true"
                        />
                        {project.demo.label}
                      </a>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          </section>
        )}
      </div>
    </>
  );
}

export default Projects;
