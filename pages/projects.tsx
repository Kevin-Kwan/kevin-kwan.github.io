import { useEffect, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { ArrowTopRightOnSquareIcon } from '@heroicons/react/24/outline';
import { FaGithub } from 'react-icons/fa';
import Seo from '../components/Seo';
import SectionHeading from '../components/SectionHeading';
import ProjectCard from '../components/ProjectCard';
import Reveal from '../components/Reveal';
import {
  allProjects,
  featuredProjects,
  projectCategoryLabels,
  projectGroups,
  type ProjectCategory,
} from '../content/projects';

const ARCHIVE_LINK_CLASSES =
  'inline-flex min-h-10 items-center gap-1.5 px-2 py-2 -mx-2 text-sm font-medium transition-colors';

type ProjectFilter = 'all' | 'featured' | ProjectCategory;

const FILTERS: { id: ProjectFilter; label: string }[] = [
  { id: 'all', label: 'All' },
  { id: 'featured', label: 'Featured' },
  ...(Object.keys(projectCategoryLabels) as ProjectCategory[]).map((id) => ({
    id: id as ProjectFilter,
    label: projectCategoryLabels[id],
  })),
];

/** Valid ?category= values, derived from FILTERS so the two never drift. */
const FILTER_IDS: ProjectFilter[] = FILTERS.map((f) => f.id);

function countFor(filter: ProjectFilter): number {
  if (filter === 'all') return allProjects.length;
  if (filter === 'featured') return featuredProjects.length;
  return allProjects.filter((project) => project.category === filter).length;
}

function Projects() {
  const [filter, setFilter] = useState<ProjectFilter>('all');
  const reduceMotion = useReducedMotion();

  // Filter state is URL-synced (?category=<id>) so a filtered view is
  // bookmarkable/shareable; 'all' keeps the bare /projects URL.
  useEffect(() => {
    const param = new URLSearchParams(window.location.search).get('category');
    if (param && FILTER_IDS.includes(param as ProjectFilter)) {
      // eslint-disable-next-line react-hooks/set-state-in-effect -- one-time sync from the URL after hydration; SSR always renders 'all'
      setFilter(param as ProjectFilter);
    }
  }, []);

  function applyFilter(next: ProjectFilter) {
    setFilter(next);
    const url = new URL(window.location.href);
    if (next === 'all') {
      url.searchParams.delete('category');
    } else {
      url.searchParams.set('category', next);
    }
    window.history.replaceState(null, '', url);
  }
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

  const filteredProjects =
    filter === 'all'
      ? null
      : filter === 'featured'
        ? featuredProjects
        : allProjects.filter((project) => project.category === filter);
  const activeFilterLabel = FILTERS.find((f) => f.id === filter)?.label ?? '';

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

        {/* Category filter — 'All' keeps the grouped layout below; any other
            choice swaps in a single animated grid of matching projects. */}
        <div
          className="mt-10 flex flex-wrap gap-2"
          role="group"
          aria-label="Filter projects"
        >
          {FILTERS.map((f) => {
            const active = filter === f.id;
            return (
              <button
                key={f.id}
                type="button"
                aria-pressed={active}
                onClick={() => applyFilter(f.id)}
                className={`rounded-full border px-3.5 py-2 text-sm font-medium transition-colors ${
                  active
                    ? 'border-violet-400/50 bg-violet-400/15 text-zinc-50'
                    : 'border-white/10 bg-white/[0.03] text-zinc-400 hover:border-white/25 hover:text-zinc-100'
                }`}
              >
                {f.label}
                <span className="ml-1.5 font-mono text-xs text-zinc-500">
                  {countFor(f.id)}
                </span>
              </button>
            );
          })}
        </div>

        {/* Screen-reader announcement of the active filter result. */}
        <p className="sr-only" role="status" aria-live="polite">
          {filteredProjects
            ? `Showing ${filteredProjects.length} projects in ${activeFilterLabel}`
            : ''}
        </p>

        {filteredProjects ? (
          <section aria-labelledby="group-filtered" className="mt-12">
            <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
              <h2
                id="group-filtered"
                className="text-2xl font-semibold tracking-tight text-zinc-50"
              >
                {activeFilterLabel}
              </h2>
              <p className="text-sm text-zinc-400">
                {filteredProjects.length}{' '}
                {filteredProjects.length === 1 ? 'project' : 'projects'}
              </p>
            </div>
            {reduceMotion ? (
              <div className="mt-7 grid items-stretch gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {filteredProjects.map((project) =>
                  project.featured ? (
                    <div key={project.id}>
                      <ProjectCard project={project} spotlight beam />
                    </div>
                  ) : (
                    <ProjectCard
                      key={project.id}
                      project={project}
                      variant="compact"
                    />
                  )
                )}
              </div>
            ) : (
              <motion.div
                layout
                className="mt-7 grid items-stretch gap-5 sm:grid-cols-2 lg:grid-cols-3"
              >
                <AnimatePresence mode="popLayout">
                  {filteredProjects.map((project) => (
                    <motion.div
                      key={project.id}
                      layout
                      initial={{ opacity: 0, scale: 0.96 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.96 }}
                      transition={{ duration: 0.22, ease: 'easeOut' }}
                    >
                      {project.featured ? (
                        <ProjectCard project={project} spotlight beam />
                      ) : (
                        <ProjectCard project={project} variant="compact" />
                      )}
                    </motion.div>
                  ))}
                </AnimatePresence>
              </motion.div>
            )}
          </section>
        ) : (
          <>
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
              <div className="mt-7 grid items-stretch gap-5 sm:grid-cols-2">
                {featuredProjects.map((project, i) => (
                  <Reveal
                    key={project.id}
                    delay={(i % 2) * 60}
                    className="h-full"
                  >
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
                  <p className="text-sm text-zinc-400">
                    {completedGroup.blurb}
                  </p>
                </div>
                <div className="mt-7 grid items-stretch gap-5 sm:grid-cols-2 lg:grid-cols-3">
                  {completedProjects.map((project, i) => (
                    <Reveal
                      key={project.id}
                      delay={(i % 3) * 60}
                      className="h-full"
                    >
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
                            <FaGithub
                              className="h-4 w-4"
                              aria-hidden="true"
                            />
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
          </>
        )}
      </div>
    </>
  );
}

export default Projects;
