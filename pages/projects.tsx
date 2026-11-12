import Seo from '../components/Seo';
import SectionHeading from '../components/SectionHeading';
import ProjectCard from '../components/ProjectCard';
import Reveal from '../components/Reveal';
import { projectGroups } from '../content/projects';

function Projects() {
  return (
    <>
      <Seo
        title="Projects | Kevin Kwan"
        description="Projects by Kevin Kwan: the CutieBot Discord bot, full-stack web apps, Unity games, machine-learning experiments, and open-source contributions."
        path="/projects"
      />
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
        <SectionHeading
          eyebrow="Portfolio"
          title="Projects"
          description="Everything from a production Discord bot to Unity games, database systems, and hackathon builds — grouped by status."
        />

        {projectGroups.map((group) => (
          <section key={group.id} aria-labelledby={`group-${group.id}`} className="mt-16">
            <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
              <h2
                id={`group-${group.id}`}
                className="text-2xl font-semibold tracking-tight text-zinc-50"
              >
                {group.title}
              </h2>
              <p className="text-sm text-zinc-500">{group.blurb}</p>
            </div>
            <div className="mt-7 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {group.projects.map((project, i) => (
                <Reveal key={project.id} delay={(i % 3) * 60}>
                  <ProjectCard project={project} />
                </Reveal>
              ))}
            </div>
          </section>
        ))}
      </div>
    </>
  );
}

export default Projects;
