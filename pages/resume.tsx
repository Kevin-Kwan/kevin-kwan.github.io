import { EnvelopeIcon } from '@heroicons/react/24/outline';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import Seo from '../components/Seo';
import SectionHeading from '../components/SectionHeading';
import TechTag from '../components/TechTag';
import { profile } from '../content/profile';
import { experience } from '../content/experience';
import { education } from '../content/education';
import { coreSkills } from '../content/skills';
import { resumeRequestUrl, site, socials } from '../content/site';

/**
 * Résumé page. The résumé itself is not hosted on this site — visitors
 * email Kevin to request a copy. The page carries a compact summary
 * (roles, education, top skills) above the request gate, not a full
 * duplicate of the Experience, Education, and Skills pages.
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

        {/* At-a-glance summary — roles, education, top skills, and the
            single request action. The full detail lives on /experience,
            /education, and /skills. */}
        <div className="mt-10 rounded-2xl border border-white/10 bg-surface p-6">
          <h2 className="text-lg font-semibold tracking-tight text-zinc-50">
            At a glance
          </h2>

          <p className="mt-3 max-w-2xl leading-relaxed text-zinc-300">
            {profile.tagline}
          </p>

          <div className="mt-5 space-y-5">
            <div>
              <h3 className="font-mono text-xs font-semibold uppercase tracking-[0.2em] text-cyan-300">
                Experience
              </h3>
              <ul className="mt-3 space-y-2">
                {experience.map((entry) => (
                  <li key={entry.id} className="text-sm leading-relaxed">
                    <span className="font-medium text-zinc-100">
                      {entry.title}
                    </span>
                    <span className="text-zinc-400">
                      {' '}
                      · {entry.company} · {entry.dateRange}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="font-mono text-xs font-semibold uppercase tracking-[0.2em] text-cyan-300">
                Education
              </h3>
              <ul className="mt-3 space-y-2">
                {education.map((entry) => (
                  <li key={entry.id} className="text-sm leading-relaxed">
                    <span className="font-medium text-zinc-100">
                      {entry.school}
                    </span>
                    <span className="text-zinc-400">
                      {' '}
                      · {entry.credential}
                      {entry.gpa ? ` · GPA ${entry.gpa}` : ''} ·{' '}
                      {entry.dateRange}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="font-mono text-xs font-semibold uppercase tracking-[0.2em] text-cyan-300">
                Top skills
              </h3>
              <div className="mt-3 flex flex-wrap gap-1.5">
                {coreSkills.map((skill) => (
                  <TechTag key={skill} label={skill} />
                ))}
              </div>
            </div>
          </div>

          <div className="mt-6 flex items-center gap-3 text-sm">
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
      </div>
    </>
  );
}

export default Resume;
