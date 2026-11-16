import Seo from '../components/Seo';
import SectionHeading from '../components/SectionHeading';
import SkillIcon from '../components/SkillIcon';
import Reveal from '../components/Reveal';
import { skillTiers } from '../content/skills';

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
          as="h1"
          eyebrow="Toolbox"
          title="Skills"
          description="A comprehensive and ever-growing list of the technologies I've worked with in my projects and professional work — organized into tiers, from the production languages and conversational AI stack I use every day to tools I've picked up along the way."
        />

        <div className="mt-12 space-y-12">
          {skillTiers.map((tier) => (
            <section key={tier.id} aria-labelledby={`skills-${tier.id}`}>
              <h2
                id={`skills-${tier.id}`}
                className="text-xl font-semibold tracking-tight text-zinc-50"
              >
                {tier.title}
              </h2>
              <p className="mt-1.5 text-sm text-zinc-300">{tier.blurb}</p>
              <ul className="mt-5 flex flex-wrap gap-2.5">
                {tier.skills.map((skill, i) => (
                  <Reveal
                    as="li"
                    key={skill.name}
                    delay={(i % 8) * 30}
                    className="flex items-center gap-2.5 whitespace-nowrap rounded-full border border-white/10 bg-surface px-4 py-3 text-sm font-medium text-zinc-200"
                  >
                    <SkillIcon icon={skill.icon} />
                    {skill.name}
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
