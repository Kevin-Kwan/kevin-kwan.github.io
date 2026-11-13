import { Fragment, type ReactNode } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { motion, useReducedMotion, type Variants } from 'motion/react';
import { ArrowRightIcon, ArrowDownTrayIcon } from '@heroicons/react/24/outline';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import Seo from '../components/Seo';
import SectionHeading from '../components/SectionHeading';
import Reveal from '../components/Reveal';
import Waveform from '../components/Waveform';
import ExperienceCard from '../components/ExperienceCard';
import EducationCard from '../components/EducationCard';
import ProjectCard from '../components/ProjectCard';
import TechTag from '../components/TechTag';
import AnimatedMetric from '../components/AnimatedMetric';
import Magnetic from '../components/Magnetic';
import PipelineDiagram from '../components/PipelineDiagram';
import TechMarquee from '../components/TechMarquee';
import { useMounted } from '../components/useMounted';
import { profile, metrics, expertiseAreas } from '../content/profile';
import { experience } from '../content/experience';
import { featuredProjects } from '../content/projects';
import { pipelineCaseStudy } from '../content/pipeline';
import { education } from '../content/education';
import { skillCategories } from '../content/skills';
import { resumeUrl, site, socials } from '../content/site';

const heroContainer: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.05 } },
};

/**
 * Hero entrance is transform-only — opacity is locked at 1, so the hero
 * is never dimmed, even mid-animation. (The previous opacity fade is what
 * made first-glance content look ghosted; a blur pass hurt first paint
 * too, so the reveal is y-only.)
 */
const heroItem: Variants = {
  hidden: { y: 8 },
  show: {
    y: 0,
    transition: { duration: 0.38, ease: 'easeOut' },
  },
};

/** A block whose words stagger in individually (H1, tagline). */
const heroWordGroup: Variants = {
  hidden: { y: 8 },
  show: {
    y: 0,
    transition: {
      duration: 0.38,
      ease: 'easeOut',
      staggerChildren: 0.03,
    },
  },
};

const heroWord: Variants = {
  hidden: { y: 8 },
  show: {
    y: 0,
    transition: { duration: 0.34, ease: 'easeOut' },
  },
};

/**
 * Splits a line of text into word spans for the staggered hero reveal.
 * Renders the plain string until the entrance is active, so the exported
 * HTML (and the pre-hydration paint) is the finished text.
 */
function SplitWords({ text, active }: { text: string; active: boolean }) {
  if (!active) return <>{text}</>;
  const words = text.split(' ');
  return (
    <span aria-hidden="true">
      {words.map((word, i) => (
        <Fragment key={`${word}-${i}`}>
          <motion.span variants={heroWord} className="inline-block">
            {word}
          </motion.span>
          {i < words.length - 1 ? ' ' : ''}
        </Fragment>
      ))}
    </span>
  );
}

interface SectionHeadingRowProps {
  eyebrow: string;
  title: string;
  description?: string;
  linkHref: string;
  linkLabel: string;
}

/** Section heading with an action link — stacked on mobile (link under the
    heading block), side-by-side from sm up. */
function SectionHeadingRow({
  eyebrow,
  title,
  description,
  linkHref,
  linkLabel,
}: SectionHeadingRowProps) {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:flex-wrap sm:items-end sm:justify-between">
      <SectionHeading
        eyebrow={eyebrow}
        title={title}
        description={description}
      />
      <Link
        href={linkHref}
        className="inline-flex shrink-0 items-center gap-1.5 self-start text-sm font-medium text-cyan-300 transition-colors hover:text-cyan-200 sm:self-auto"
      >
        {linkLabel}
        <ArrowRightIcon className="h-4 w-4" aria-hidden="true" />
      </Link>
    </div>
  );
}

const HERO_MOTION_TAGS = {
  h1: motion.h1,
  p: motion.p,
  div: motion.div,
} as const;

type HeroTag = keyof typeof HERO_MOTION_TAGS;

interface HeroBlockProps {
  as: HeroTag;
  className?: string;
  children: ReactNode;
  /** Render the motion variant (post-mount); plain element before that. */
  active: boolean;
  /** Variant set for this block; word-split blocks pass heroWordGroup. */
  variants?: Variants;
}

/**
 * One hero block in the staggered entrance. Renders a plain element until
 * the page has mounted so the exported HTML is never hidden pre-JS
 * (motion server-renders its hidden initial styles inline otherwise).
 * Word-split blocks hide their animated spans from assistive tech and
 * carry an sr-only plain-text copy instead of an aria-label — a <p>
 * cannot take an accessible name, so the label was never announced.
 */
function HeroBlock({
  as,
  className,
  children,
  active,
  variants = heroItem,
}: HeroBlockProps) {
  if (!active) {
    const PlainTag = as;
    return <PlainTag className={className}>{children}</PlainTag>;
  }
  const MotionTag = HERO_MOTION_TAGS[as] as typeof motion.div;
  return (
    <MotionTag variants={variants} className={className}>
      {children}
    </MotionTag>
  );
}

interface HeroContainerProps {
  active: boolean;
  children: ReactNode;
}

function HeroContainer({ active, children }: HeroContainerProps) {
  const classes = 'mx-auto max-w-6xl px-4 pb-16 pt-16 sm:px-6 sm:pt-24';
  if (!active) {
    return <div className={classes}>{children}</div>;
  }
  return (
    <motion.div
      className={classes}
      variants={heroContainer}
      initial="hidden"
      animate="show"
    >
      {children}
    </motion.div>
  );
}

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

  // Gates the hero entrance animation (see HeroBlock): content is fully
  // visible in the static export and animates once hydrated — and never
  // under prefers-reduced-motion, so the gate is explicit here.
  const reduceMotion = useReducedMotion();
  const heroActive = useMounted() && !reduceMotion;

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
        <HeroContainer active={heroActive}>
          {profile.openToOpportunities && (
            <HeroBlock
              as="p"
              active={heroActive}
              className="inline-flex items-center gap-2 rounded-full border border-emerald-400/25 bg-emerald-400/10 px-3.5 py-1.5 text-sm font-medium text-emerald-300"
            >
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
              </span>
              {profile.availabilityNote}
            </HeroBlock>
          )}

          <HeroBlock
            as="h1"
            active={heroActive}
            variants={heroWordGroup}
            className="mt-7 text-5xl font-bold leading-[1.05] tracking-tight text-zinc-50 sm:text-6xl lg:text-7xl"
          >
            {heroActive ? (
              <>
                <span className="sr-only">Kevin Kwan</span>
                <span aria-hidden="true">
                  <motion.span variants={heroWord} className="inline-block">
                    Kevin
                  </motion.span>{' '}
                  <motion.span
                    variants={heroWord}
                    className="text-gradient inline-block"
                  >
                    Kwan
                  </motion.span>
                </span>
              </>
            ) : (
              <>
                Kevin <span className="text-gradient">Kwan</span>
              </>
            )}
          </HeroBlock>
          <HeroBlock
            as="p"
            active={heroActive}
            className="mt-5 font-mono text-sm uppercase tracking-[0.2em] text-zinc-400 sm:text-base"
          >
            {profile.role} · {profile.specialty} · {profile.employer}
          </HeroBlock>
          <HeroBlock
            as="p"
            active={heroActive}
            variants={heroWordGroup}
            className="mt-6 max-w-3xl text-xl leading-relaxed text-zinc-200 sm:text-2xl"
          >
            {heroActive && (
              <span className="sr-only">{profile.tagline}</span>
            )}
            <SplitWords text={profile.tagline} active={heroActive} />
          </HeroBlock>
          <HeroBlock
            as="p"
            active={heroActive}
            className="mt-5 max-w-3xl leading-relaxed text-zinc-400"
          >
            {profile.heroIntro}
          </HeroBlock>

          <HeroBlock
            as="div"
            active={heroActive}
            className="mt-9 flex flex-wrap items-center gap-3"
          >
            <Magnetic>
              <Link
                href="/experience"
                className="inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-violet-600 to-cyan-600 px-5 py-3 text-sm font-medium text-white transition-opacity duration-200 hover:opacity-90"
              >
                View my experience
                <ArrowRightIcon className="h-4 w-4" aria-hidden="true" />
              </Link>
            </Magnetic>
            <Magnetic>
              <a
                href={resumeUrl}
                download={site.resumeFileName}
                className="inline-flex items-center gap-2 rounded-lg border border-white/15 bg-white/[0.04] px-5 py-3 text-sm font-medium text-zinc-100 transition-colors duration-200 hover:border-white/30 hover:bg-white/[0.08]"
              >
                <ArrowDownTrayIcon className="h-4 w-4" aria-hidden="true" />
                Download résumé
              </a>
            </Magnetic>
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
          </HeroBlock>

          <HeroBlock as="div" active={heroActive}>
            <Waveform animated className="mt-12 h-10 w-full max-w-xl" />
            <p className="mt-6 font-mono text-xs text-zinc-400">
              Interests: {profile.interests.join(' · ')}
            </p>
          </HeroBlock>
        </HeroContainer>
      </section>

      {/* Core-skills ticker */}
      <TechMarquee />

      {/* Impact metrics */}
      <section aria-label="Impact metrics" className="border-y border-white/5 bg-white/[0.015]">
        <div className="mx-auto grid max-w-6xl grid-cols-2 gap-px lg:grid-cols-4">
          {metrics.map((metric, i) => (
            <Reveal key={metric.label} delay={i * 70} className="px-4 py-8 sm:px-6">
              <p className="text-gradient font-mono text-4xl font-bold tracking-tight sm:text-5xl">
                <AnimatedMetric metric={metric} />
              </p>
              <p className="mt-3 text-sm font-medium text-zinc-100">
                {metric.label}
              </p>
              <p className="mt-1 text-sm text-zinc-400">{metric.detail}</p>
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
            <Reveal
              key={area.title}
              delay={i * 80}
              className={
                i === 0 ? 'md:col-span-2' : i === 2 ? 'md:col-span-3' : ''
              }
            >
              <div className="relative flex h-full flex-col overflow-hidden rounded-2xl border border-white/10 bg-surface p-6 transition-colors duration-200 hover:border-white/20">
                <div
                  aria-hidden="true"
                  className="dot-pattern absolute inset-0 [mask-image:radial-gradient(ellipse_at_top_right,black,transparent_72%)]"
                />
                <div
                  className={`relative flex flex-1 flex-col ${
                    i === 2
                      ? 'gap-5 md:flex-row md:items-center md:justify-between'
                      : ''
                  }`}
                >
                  <div>
                    <h3 className="text-lg font-semibold tracking-tight text-zinc-50">
                      {area.title}
                    </h3>
                    <p className="mt-2.5 text-sm leading-relaxed text-zinc-400">
                      {area.description}
                    </p>
                  </div>
                  <div
                    className={`flex flex-wrap gap-1.5 ${
                      i === 2 ? 'md:mt-0 md:justify-end' : 'mt-5'
                    }`}
                  >
                    {area.points.map((point) => (
                      <TechTag key={point} label={point} />
                    ))}
                  </div>
                </div>
                {area.stat && (
                  <p className="text-gradient relative mt-auto pt-5 font-mono text-sm font-semibold tracking-tight">
                    {area.stat}
                  </p>
                )}
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Featured experience — condensed highlights; /experience has the full set */}
      <section className="mx-auto max-w-6xl px-4 pb-20 sm:px-6">
        <SectionHeading eyebrow="Experience" title="Currently at GEICO" />
        <Reveal className="mt-8">
          <ExperienceCard
            entry={geico}
            highlights={geico.shortHighlights}
            spotlight
            beam
            cta={{ href: '/experience', label: 'Full experience' }}
          />
        </Reveal>
        <Reveal className="mt-6">
          <PipelineDiagram />
        </Reveal>
        <Reveal className="mt-6">
          <div className="grid gap-5 md:grid-cols-3">
            {pipelineCaseStudy.map((column) => (
              <div
                key={column.title}
                className="rounded-2xl border border-white/10 bg-surface p-6"
              >
                <h3 className="font-mono text-xs font-semibold uppercase tracking-[0.2em] text-cyan-300">
                  {column.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-zinc-400">
                  {column.body}
                </p>
              </div>
            ))}
          </div>
        </Reveal>
      </section>

      {/* Selected projects */}
      <section className="border-y border-white/5 bg-white/[0.015]">
        <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
          <SectionHeadingRow
            eyebrow="Selected work"
            title="Featured projects"
            description="A few favorites — the full archive includes games, hackathon builds, and open-source contributions."
            linkHref="/projects"
            linkLabel="All projects"
          />
          <div className="mt-10 grid items-stretch gap-5 sm:grid-cols-2">
            {featuredProjects.map((project, i) => (
              <Reveal key={project.id} delay={(i % 2) * 80} className="h-full">
                <ProjectCard project={project} spotlight beam />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Skills snapshot — grouped by category as a preview of /skills.
          (The flat core-skills list already runs in the TechMarquee under
          the hero; repeating the identical chips here added nothing.) */}
      <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
        <SectionHeadingRow
          eyebrow="Toolbox"
          title="Core skills"
          description="Grouped by area — see the skills page for the full inventory with production evidence for each."
          linkHref="/skills"
          linkLabel="All skills"
        />
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {skillCategories.map((category) => (
            <div
              key={category.id}
              className="rounded-2xl border border-white/10 bg-surface p-5"
            >
              <h3 className="text-sm font-semibold text-zinc-100">
                {category.title}
              </h3>
              <p className="mt-1 text-sm leading-relaxed text-zinc-400">
                {category.blurb}
              </p>
              <div className="mt-4 flex flex-wrap gap-1.5">
                {category.skills.map((skill) => (
                  <span
                    key={skill.name}
                    className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-xs text-zinc-300"
                  >
                    {skill.name}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Education highlight */}
      <section className="mx-auto max-w-6xl px-4 pb-20 sm:px-6">
        <SectionHeadingRow
          eyebrow="Education"
          title="Georgia Tech"
          linkHref="/education"
          linkLabel="Full education"
        />
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
            {`${profile.closingLine} If you're hiring for conversational AI, voice, or full-stack roles — or just want to talk shop — my inbox is open.`}
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Magnetic>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-violet-600 to-cyan-600 px-6 py-3 text-sm font-medium text-white transition-opacity duration-200 hover:opacity-90"
              >
                Get in touch
                <ArrowRightIcon className="h-4 w-4" aria-hidden="true" />
              </Link>
            </Magnetic>
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
