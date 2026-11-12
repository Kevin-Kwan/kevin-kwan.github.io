import Seo from '../components/Seo';
import SectionHeading from '../components/SectionHeading';
import SkillIcon from '../components/SkillIcon';
import Reveal from '../components/Reveal';
import { skillCategories } from '../content/skills';

function Skills() {
  return (
    <>
      <Seo
        title="Skills | Kevin Kwan"
        description="Kevin Kwan's technical skills: Java, Python, TypeScript, Amazon Connect, Amazon Lex, Sierra AI, AWS, Terraform, React, Next.js, and more — organized by category."
        path="/skills"
      />
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
        <SectionHeading
          eyebrow="Toolbox"
          title="Skills"
          description="A comprehensive and ever-growing list of the technologies I've worked with in my projects and professional work — spanning front-end and back-end development, databases, deployment, and conversational AI."
        />

        <div className="mt-12 space-y-12">
          {skillCategories.map((category) => (
            <section key={category.id} aria-labelledby={`skills-${category.id}`}>
              <h2
                id={`skills-${category.id}`}
                className="text-xl font-semibold tracking-tight text-zinc-50"
              >
                {category.title}
              </h2>
              <p className="mt-1.5 text-sm text-zinc-500">{category.blurb}</p>
              <ul className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
                {category.skills.map((skill, i) => (
                  <Reveal key={skill.name} delay={(i % 4) * 40}>
                    <li>
                      {skill.href ? (
                        <a
                          href={skill.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-3 rounded-xl border border-white/10 bg-surface px-4 py-3.5 text-sm font-medium text-zinc-200 transition-colors duration-200 hover:border-white/25 hover:text-white"
                        >
                          <SkillIcon icon={skill.icon} />
                          {skill.name}
                        </a>
                      ) : (
                        <span className="flex items-center gap-3 rounded-xl border border-white/10 bg-surface px-4 py-3.5 text-sm font-medium text-zinc-200">
                          <SkillIcon icon={skill.icon} />
                          {skill.name}
                        </span>
                      )}
                    </li>
                  </Reveal>
                ))}
              </ul>
            </section>
          ))}
        </div>
      </div>
    </>
  );
}

export default Skills;
