import { EnvelopeIcon } from '@heroicons/react/24/outline';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import Seo from '../components/Seo';
import SectionHeading from '../components/SectionHeading';
import TechTag from '../components/TechTag';
import { profile } from '../content/profile';
import { experience } from '../content/experience';
import { education } from '../content/education';
import { skillTiers } from '../content/skills';
import { resumeRequestUrl, site, socials } from '../content/site';

/**
 * Résumé page. The résumé itself is not hosted on this site — visitors
 * email Kevin to request a copy. The page carries the real inline
 * résumé content instead: work history, education, and skills.
 */
function Resume() {
  return (
    <>
      <Seo
        title="Résumé | Kevin Kwan"
        description="Résumé of Kevin Kwan — Software Engineer II (conversational AI & IVR) at GEICO, Georgia Tech B.S. Computer Science, summa cum laude. Available on request."
        path="/resume"
      />
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
        <SectionHeading
          as="h1"
          eyebrow="Résumé"
          title={`${profile.name} — ${profile.role}`}
          description={`${profile.specialty} at ${profile.employer} · ${profile.location}. Top skills and experience, in one page.`}
        />

        {/* Snapshot card with the single request action. */}
        <div className="mt-10 rounded-2xl border border-white/10 bg-surface p-6">
          <p className="text-xl font-semibold tracking-tight text-zinc-50">
            {profile.name}
          </p>
          <p className="mt-1 font-mono text-xs uppercase tracking-[0.18em] text-zinc-400">
            {profile.role} · {profile.specialty}
          </p>
          <p className="mt-2 text-sm text-zinc-400">
            {profile.employer} · {profile.location}
          </p>
          <p className="mt-3 max-w-2xl leading-relaxed text-zinc-300">
            {profile.tagline}
          </p>

          <div className="mt-5 flex items-center gap-3 text-sm">
            <a
              href={socials.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-cyan-300 transition-colors hover:text-cyan-200"
            >
              <FaGithub className="h-4 w-4" aria-hidden="true" />
              GitHub
            </a>
            <a
              href={socials.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-cyan-300 transition-colors hover:text-cyan-200"
            >
              <FaLinkedin className="h-4 w-4" aria-hidden="true" />
              LinkedIn
            </a>
          </div>

          <div className="mt-7 flex flex-col gap-3">
            <a
              href={resumeRequestUrl}
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-violet-600 to-cyan-600 px-5 py-3.5 text-sm font-medium text-white transition-opacity duration-200 hover:opacity-90"
            >
              <EnvelopeIcon className="h-5 w-5" aria-hidden="true" />
              Request résumé
            </a>
            <p className="text-center text-sm text-zinc-400">
              Email{' '}
              <a
                href={`mailto:${site.contactEmail}`}
                className="text-cyan-300 underline decoration-cyan-800 underline-offset-4 transition-colors hover:text-cyan-200"
              >
                {site.contactEmail}
              </a>{' '}
              and Kevin will send you a copy.
            </p>
          </div>
        </div>

        {/* Work history */}
        <section aria-labelledby="resume-experience" className="mt-14">
          <h2
            id="resume-experience"
            className="text-2xl font-semibold tracking-tight text-zinc-50"
          >
            Experience
          </h2>
          <div className="mt-6 space-y-6">
            {experience.map((entry) => (
              <article
                key={entry.id}
                className="rounded-2xl border border-white/10 bg-surface p-6"
              >
                <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                  <h3 className="text-lg font-semibold tracking-tight text-zinc-50">
                    {entry.title}
                  </h3>
                  <p className="font-mono text-xs text-zinc-400">
                    {entry.dateRange} · {entry.location}
                  </p>
                </div>
                <p className="mt-1 text-sm font-medium text-violet-300">
                  {entry.company}
                </p>
                <p className="mt-3 leading-relaxed text-zinc-400">
                  {entry.summary}
                </p>
                {entry.sections && (
                  <ul className="mt-4 space-y-2">
                    {entry.sections.map((section) => (
                      <li key={section.title} className="text-sm text-zinc-400">
                        <span className="font-medium text-zinc-200">
                          {section.title}:{' '}
                        </span>
                        {section.points[0]}
                      </li>
                    ))}
                  </ul>
                )}
                {entry.highlights && (
                  <ul className="mt-4 space-y-2">
                    {entry.highlights.slice(0, 3).map((point) => (
                      <li
                        key={point.slice(0, 48)}
                        className="flex gap-3 text-sm leading-relaxed text-zinc-400"
                      >
                        <span
                          aria-hidden="true"
                          className="mt-[0.5rem] h-1.5 w-1.5 shrink-0 rounded-full bg-gradient-to-r from-violet-400 to-cyan-400"
                        />
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </article>
            ))}
          </div>
        </section>

        {/* Education */}
        <section aria-labelledby="resume-education" className="mt-14">
          <h2
            id="resume-education"
            className="text-2xl font-semibold tracking-tight text-zinc-50"
          >
            Education
          </h2>
          <div className="mt-6 space-y-6">
            {education.map((entry) => (
              <article
                key={entry.id}
                className="rounded-2xl border border-white/10 bg-surface p-6"
              >
                <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                  <h3 className="text-lg font-semibold tracking-tight text-zinc-50">
                    {entry.school}
                    {entry.unit && (
                      <span className="font-normal text-zinc-400">
                        {' '}
                        · {entry.unit}
                      </span>
                    )}
                  </h3>
                  <p className="font-mono text-xs text-zinc-400">
                    {entry.dateRange} · {entry.location}
                  </p>
                </div>
                <p className="mt-1 text-sm font-medium text-violet-300">
                  {entry.credential}
                  {entry.gpa && (
                    <span className="text-zinc-400">
                      {' '}
                      · GPA {entry.gpa}
                      {entry.gpaNote ? ` ${entry.gpaNote}` : ''}
                    </span>
                  )}
                </p>
                {entry.details.map((detail) => (
                  <p
                    key={detail}
                    className="mt-2 text-sm leading-relaxed text-zinc-400"
                  >
                    {detail}
                  </p>
                ))}
              </article>
            ))}
          </div>
        </section>

        {/* Skills */}
        <section aria-labelledby="resume-skills" className="mt-14">
          <h2
            id="resume-skills"
            className="text-2xl font-semibold tracking-tight text-zinc-50"
          >
            Skills
          </h2>
          <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {skillTiers.map((tier) => (
              <div
                key={tier.id}
                className="rounded-2xl border border-white/10 bg-surface p-5"
              >
                <h3 className="text-sm font-semibold text-zinc-100">
                  {tier.title}
                </h3>
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {tier.skills.map((skill) => (
                    <TechTag key={skill.name} label={skill.name} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </>
  );
}

export default Resume;
