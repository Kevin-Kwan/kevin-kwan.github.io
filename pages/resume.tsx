import { ArrowDownTrayIcon } from '@heroicons/react/24/outline';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import Seo from '../components/Seo';
import SectionHeading from '../components/SectionHeading';
import TechTag from '../components/TechTag';
import { profile } from '../content/profile';
import { coreSkills } from '../content/skills';
import { site, socials } from '../content/site';

const resumeUrl = process.env.NEXT_PUBLIC_RESUME_LINK ?? site.resumePdfPath;

function Resume() {
  return (
    <>
      <Seo
        title="Résumé | Kevin Kwan"
        description="Résumé of Kevin Kwan — Software Engineer II at GEICO (conversational AI & IVR), Georgia Tech B.S. Computer Science, summa cum laude. Download the PDF or read it inline."
        path="/resume"
      />
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeading
            eyebrow="Résumé"
            title={`${profile.name} — ${profile.role}`}
            description={`${profile.specialty} at ${profile.employer} · ${profile.location}. Top skills and experience, in one page.`}
          />
          <a
            href={resumeUrl}
            download={site.resumeFileName}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-violet-600 to-cyan-600 px-5 py-3 text-sm font-medium text-white transition-opacity duration-200 hover:opacity-90"
          >
            <ArrowDownTrayIcon className="h-4 w-4" aria-hidden="true" />
            Download PDF
          </a>
        </div>

        <div className="mt-8 flex flex-wrap items-center gap-2">
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

        <div className="mt-10 overflow-hidden rounded-2xl border border-white/10 bg-surface">
          <iframe
            src={resumeUrl}
            title="Kevin Kwan — Résumé (PDF)"
            loading="lazy"
            className="h-[85vh] w-full bg-white"
          />
        </div>
        <p className="mt-4 text-sm text-zinc-500">
          Having trouble viewing the embedded PDF?{' '}
          <a
            href={resumeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-cyan-300 underline decoration-cyan-800 underline-offset-4 transition-colors hover:text-cyan-200"
          >
            Open it in a new tab
          </a>{' '}
          or use the download button above.
        </p>
      </div>
    </>
  );
}

export default Resume;
