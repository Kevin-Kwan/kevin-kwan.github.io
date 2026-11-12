import Head from 'next/head';
import Link from 'next/link';
import { ArrowRightIcon, ArrowDownTrayIcon } from '@heroicons/react/24/outline';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import Seo from '../components/Seo';
import SectionHeading from '../components/SectionHeading';
import Reveal from '../components/Reveal';
import Waveform from '../components/Waveform';
import ExperienceCard from '../components/ExperienceCard';
import EducationCard from '../components/EducationCard';
import ProjectCard from '../components/ProjectCard';
import SpotlightCard from '../components/SpotlightCard';
import TechTag from '../components/TechTag';
import { profile, metrics, expertiseAreas } from '../content/profile';
import { experience } from '../content/experience';
import { featuredProjects } from '../content/projects';
import { education } from '../content/education';
import { coreSkills } from '../content/skills';
import { site, socials } from '../content/site';

const personJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Kevin Kwan',
  jobTitle: 'Software Engineer II',
  worksFor: { '@type': 'Organization', name: 'GEICO' },
  alumniOf: {
    '@type': 'CollegeOrUniversity',
    name: 'Georgia Institute of Technology',
  },
  url: site.siteUrl,
  sameAs: [socials.github, socials.linkedin],
};

function Home() {
  const geico = experience[0];
  const georgiaTech = education[0];

  return (
    <>
      <Seo
        title="Kevin Kwan | Software Engineer II — Conversational AI & IVR"
        description="Kevin Kwan is a Software Engineer II at GEICO building conversational AI and IVR systems on Amazon Connect and AWS. Georgia Tech B.S. Computer Science, summa cum laude."
        path="/"
      />
      <Head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
      </Head>

      {/* Hero */}
      <section className="ambient-glow relative overflow-hidden">
        <div className="mx-auto max-w-6xl px-4 pb-16 pt-16 sm:px-6 sm:pt-24">
          {profile.openToOpportunities && (
            <p className="inline-flex items-center gap-2 rounded-full border border-emerald-400/25 bg-emerald-400/10 px-3.5 py-1.5 text-sm font-medium text-emerald-300">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
              </span>
              {profile.availabilityNote}
            </p>
          )}

          <h1 className="mt-7 text-5xl font-bold leading-[1.05] tracking-tight text-zinc-50 sm:text-6xl lg:text-7xl">
            Kevin <span className="text-gradient">Kwan</span>
          </h1>
          <p className="mt-5 font-mono text-sm uppercase tracking-[0.2em] text-zinc-400 sm:text-base">
            {profile.role} · {profile.specialty} · {profile.employer}
          </p>
          <p className="mt-6 max-w-3xl text-xl leading-relaxed text-zinc-200 sm:text-2xl">
            {profile.tagline}
          </p>
          <p className="mt-5 max-w-3xl leading-relaxed text-zinc-400">
            {profile.heroIntro}
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-3">
            <Link
              href="/experience"
              className="inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-violet-600 to-cyan-600 px-5 py-3 text-sm font-medium text-white transition-opacity duration-200 hover:opacity-90"
            >
              View my experience
              <ArrowRightIcon className="h-4 w-4" aria-hidden="true" />
            </Link>
            <a
              href={site.resumePdfPath}
              download={site.resumeFileName}
              className="inline-flex items-center gap-2 rounded-lg border border-white/15 bg-white/[0.04] px-5 py-3 text-sm font-medium text-zinc-100 transition-colors duration-200 hover:border-white/30 hover:bg-white/[0.08]"
            >
              <ArrowDownTrayIcon className="h-4 w-4" aria-hidden="true" />
              Download résumé
            </a>
            <div className="flex items-center gap-1.5">
              <a
                href={socials.github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className="rounded-lg border border-white/10 bg-white/[0.04] p-3 text-zinc-300 transition-colors hover:border-white/25 hover:text-white"
              >
                <FaGithub className="h-5 w-5" aria-hidden="true" />
              </a>
              <a
                href={socials.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="rounded-lg border border-white/10 bg-white/[0.04] p-3 text-zinc-300 transition-colors hover:border-white/25 hover:text-white"
              >
                <FaLinkedin className="h-5 w-5" aria-hidden="true" />
              </a>
            </div>
          </div>

          <Waveform animated className="mt-12 h-10 w-full max-w-xl" />
          <p className="mt-6 font-mono text-xs text-zinc-500">
            Interests: {profile.interests.join(' · ')}
          </p>
        </div>
      </section>

      {/* Impact metrics */}
      <section aria-label="Impact metrics" className="border-y border-white/5 bg-white/[0.015]">
        <div className="mx-auto grid max-w-6xl grid-cols-2 gap-px lg:grid-cols-4">
          {metrics.map((metric, i) => (
            <Reveal key={metric.label} delay={i * 70} className="px-4 py-8 sm:px-6">
              <p className="text-gradient font-mono text-4xl font-bold tracking-tight sm:text-5xl">
                {metric.value}
              </p>
              <p className="mt-3 text-sm font-medium text-zinc-100">
                {metric.label}
              </p>
              <p className="mt-1 text-sm text-zinc-500">{metric.detail}</p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Expertise */}
      <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
        <SectionHeading
          eyebrow="Expertise"
          title="What I do"
          description="Production systems that talk to customers, run on AWS, and stay up — plus the full-stack range to build around them."
        />
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {expertiseAreas.map((area, i) => (
            <Reveal key={area.title} delay={i * 80}>
              <SpotlightCard className="h-full rounded-2xl border border-white/10 bg-surface p-6 transition-colors duration-200 hover:border-white/20">
                <h3 className="text-lg font-semibold tracking-tight text-zinc-50">
                  {area.title}
                </h3>
                <p className="mt-2.5 text-sm leading-relaxed text-zinc-400">
                  {area.description}
                </p>
                <div className="mt-5 flex flex-wrap gap-1.5">
                  {area.points.map((point) => (
                    <TechTag key={point} label={point} />
                  ))}
                </div>
              </SpotlightCard>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Featured experience */}
      <section className="mx-auto max-w-6xl px-4 pb-20 sm:px-6">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <SectionHeading
            eyebrow="Experience"
            title="Currently at GEICO"
          />
          <Link
            href="/experience"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-cyan-300 transition-colors hover:text-cyan-200"
          >
            Full experience
            <ArrowRightIcon className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
        <Reveal className="mt-8">
          <ExperienceCard entry={geico} />
        </Reveal>
      </section>

      {/* Selected projects */}
      <section className="border-y border-white/5 bg-white/[0.015]">
        <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <SectionHeading
              eyebrow="Selected work"
              title="Featured projects"
              description="A few favorites — the full archive includes games, hackathon builds, and open-source contributions."
            />
            <Link
              href="/projects"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-cyan-300 transition-colors hover:text-cyan-200"
            >
              All projects
              <ArrowRightIcon className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
          <div className="mt-10 grid gap-5 sm:grid-cols-2">
            {featuredProjects.map((project, i) => (
              <Reveal key={project.id} delay={(i % 2) * 80}>
                <ProjectCard project={project} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Skills snapshot */}
      <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <SectionHeading
            eyebrow="Toolbox"
            title="Core skills"
            description="The short list — see the skills page for the full, categorized inventory."
          />
          <Link
            href="/skills"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-cyan-300 transition-colors hover:text-cyan-200"
          >
            All skills
            <ArrowRightIcon className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
        <div className="mt-8 flex flex-wrap gap-2">
          {coreSkills.map((skill) => (
            <span
              key={skill}
              className="rounded-full border border-white/10 bg-surface px-4 py-2 text-sm text-zinc-200"
            >
              {skill}
            </span>
          ))}
        </div>
      </section>

      {/* Education highlight */}
      <section className="mx-auto max-w-6xl px-4 pb-20 sm:px-6">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <SectionHeading eyebrow="Education" title="Georgia Tech" />
          <Link
            href="/education"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-cyan-300 transition-colors hover:text-cyan-200"
          >
            Full education
            <ArrowRightIcon className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
        <Reveal className="mt-8">
          <EducationCard entry={georgiaTech} />
        </Reveal>
      </section>

      {/* Contact CTA */}
      <section className="border-t border-white/5">
        <div className="mx-auto max-w-6xl px-4 py-20 text-center sm:px-6">
          <Waveform className="mx-auto h-8 w-56" />
          <h2 className="mt-8 text-3xl font-semibold tracking-tight text-zinc-50 sm:text-4xl">
            Let&apos;s build something that answers.
          </h2>
          <p className="mx-auto mt-4 max-w-xl leading-relaxed text-zinc-400">
            {profile.closingLine} If you&apos;re hiring for conversational AI,
            voice, or full-stack roles — or just want to talk shop — my inbox
            is open.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-violet-600 to-cyan-600 px-6 py-3 text-sm font-medium text-white transition-opacity duration-200 hover:opacity-90"
            >
              Get in touch
              <ArrowRightIcon className="h-4 w-4" aria-hidden="true" />
            </Link>
            <a
              href={socials.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-lg border border-white/15 bg-white/[0.04] px-6 py-3 text-sm font-medium text-zinc-100 transition-colors duration-200 hover:border-white/30 hover:bg-white/[0.08]"
            >
              <FaLinkedin className="h-4 w-4" aria-hidden="true" />
              Connect on LinkedIn
            </a>
          </div>
        </div>
      </section>
    </>
  );
}

export default Home;
