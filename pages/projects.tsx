import { useRouter } from 'next/router';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import Seo from '../components/Seo';
import SectionHeading from '../components/SectionHeading';
import ProjectCard from '../components/ProjectCard';
import Reveal from '../components/Reveal';
import {
  allProjects,
  featuredProjects,
  projectCategoryLabels,
  projectTierLabels,
  type ProjectCategory,
} from '../content/projects';

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
  const router = useRouter();
  const reduceMotion = useReducedMotion();

  // The active filter is derived from the URL (?category=<id>) so a
  // filtered view is bookmarkable/shareable; 'all' keeps the bare
  // /projects URL. Because the router owns the query, Back/Forward
  // navigation restores both the URL and the corresponding filtered view.
  const categoryParam = Array.isArray(router.query.category)
    ? router.query.category[0]
    : router.query.category;
  // The category must NOT be read from window.location during render: on a
  // direct load of a filtered URL the server HTML is the unfiltered ('all')
  // view, and peeking at the address bar before the router is ready makes
  // the first client render differ from that HTML — React hydration error
  // #418. Until the router is ready, render the same 'all' view the server
  // produced; once ready, the query takes over and the filtered view swaps
  // in. (No first-paint flash concern outweighs a hydration mismatch.)
  const rawCategory = router.isReady ? categoryParam : null;
  const filter: ProjectFilter =
    rawCategory && FILTER_IDS.includes(rawCategory as ProjectFilter)
      ? (rawCategory as ProjectFilter)
      : 'all';

  function applyFilter(next: ProjectFilter) {
    // Clicking the already-active filter is a no-op — it must not push a
    // duplicate entry onto the history stack.
    if (next === filter) return;
    const query = { ...router.query };
    if (next === 'all') {
      delete query.category;
    } else {
      query.category = next;
    }
    // push (not replace): each filter choice becomes a history entry, so
    // Back/Forward steps through the filters the visitor picked.
    void router.push({ pathname: router.pathname, query }, undefined, {
      shallow: true,
      scroll: false,
    });
  }
  const featuredIds = new Set(featuredProjects.map((project) => project.id));
  // Default view groups by curated tier, not by the data file's
  // ongoing/completed/challenge groups: the strong work leads, and the
  // archival tier keeps every early-learning project reachable below it.
  const productionProjects = allProjects.filter(
    (project) => project.tier === 'production' && !featuredIds.has(project.id)
  );
  const archivalProjects = allProjects.filter(
    (project) => project.tier === 'archival'
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
          description="Everything from a production Discord bot to Unity games, database systems, and hackathon builds — filter by category to explore them."
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
              </button>
            );
          })}
        </div>

        {/* Screen-reader announcement of the active filter result. */}
        <p className="sr-only" role="status" aria-live="polite">
          {filter === 'all'
            ? `Showing all ${allProjects.length} projects`
            : `Showing ${countFor(filter)} ${
                countFor(filter) === 1 ? 'project' : 'projects'
              } in ${activeFilterLabel}`}
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

            {/* Core Applications & Systems — the strong work beyond the
                featured cards, as compact cards */}
            {productionProjects.length > 0 && (
              <section aria-labelledby="group-production" className="mt-16">
                <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
                  <h2
                    id="group-production"
                    className="text-2xl font-semibold tracking-tight text-zinc-50"
                  >
                    {projectTierLabels.production}
                  </h2>
                  <p className="text-sm text-zinc-400">
                    Core applications, client projects, and advanced builds.
                  </p>
                </div>
                <div className="mt-7 grid items-stretch gap-5 sm:grid-cols-2 lg:grid-cols-3">
                  {productionProjects.map((project, i) => (
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

            {/* Archival & Academic Works — early learning work, coursework,
                and coding-challenge solutions, kept here for the record */}
            {archivalProjects.length > 0 && (
              <section aria-labelledby="group-archival" className="mt-16">
                <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
                  <h2
                    id="group-archival"
                    className="text-2xl font-semibold tracking-tight text-zinc-50"
                  >
                    {projectTierLabels.archival}
                  </h2>
                  <p className="text-sm text-zinc-400">
                    Early learning work, coursework, and coding-challenge
                    solutions — kept here for the record.
                  </p>
                </div>
                <div className="mt-7 grid items-stretch gap-5 sm:grid-cols-2 lg:grid-cols-3">
                  {archivalProjects.map((project, i) => (
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
          </>
        )}
      </div>
    </>
  );
}

export default Projects;
