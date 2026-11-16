import { EnvelopeIcon } from '@heroicons/react/24/outline';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import Seo from '../components/Seo';
import SectionHeading from '../components/SectionHeading';
import TechTag from '../components/TechTag';
import { metrics, profile } from '../content/profile';
import { coreSkills } from '../content/skills';
import { resumeRequestUrl, site, socials } from '../content/site';

/**
 * Résumé page. The résumé itself is not hosted on this site — visitors
 * email Kevin to request a copy.
 */
function Resume() {
  return (
    <>
      <Seo
        title="Résumé | Kevin Kwan"
        description="Résumé of Kevin Kwan — Software Engineer II (conversational AI & IVR) at a major U.S. auto insurer, Georgia Tech B.S. Computer Science, summa cum laude. Available on request."
        path="/resume"
      />
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeading
            as="h1"
            eyebrow="Résumé"
            title={`${profile.name} — ${profile.role}`}
            description={`${profile.specialty} at ${profile.employer} · ${profile.location}. Top skills and experience, in one page.`}
          />
          <a
            href={resumeRequestUrl}
            className="hidden items-center gap-2 rounded-lg bg-gradient-to-r from-violet-600 to-cyan-600 px-5 py-3 text-sm font-medium text-white transition-opacity duration-200 hover:opacity-90 md:inline-flex"
          >
            <EnvelopeIcon className="h-4 w-4" aria-hidden="true" />
            Request résumé
          </a>
        </div>

        <div className="mt-8 hidden flex-wrap items-center gap-2 md:flex">
          {coreSkills.slice(0, 10).map((skill) => (
            <TechTag key={skill} label={skill} />
          ))}
          <span className="ml-2 flex items-center gap-3 text-sm">
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
          </span>
        </div>

        {/* Snapshot card with the request action. */}
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

          <dl className="mt-6 grid grid-cols-2 gap-x-4 gap-y-5 md:grid-cols-4">
            {metrics.map((metric) => (
              <div key={metric.label} className="flex flex-col">
                <dt className="order-2 mt-1 text-xs text-zinc-400">
                  {metric.label}
                </dt>
                <dd className="text-gradient order-1 font-mono text-2xl font-bold tracking-tight">
                  {metric.value}
                </dd>
              </div>
            ))}
          </dl>

          <div className="mt-6 flex flex-wrap gap-1.5">
            {coreSkills.slice(0, 8).map((skill) => (
              <TechTag key={skill} label={skill} />
            ))}
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
