import { ArrowUpRightIcon } from '@heroicons/react/24/outline';
import type { ExperienceEntry } from '../content/experience';
import Monogram from './Monogram';
import SpotlightCard from './SpotlightCard';

interface ExperienceCardProps {
  entry: ExperienceEntry;
}

function ExperienceCard({ entry }: ExperienceCardProps) {
  return (
    <SpotlightCard className="rounded-2xl border border-white/10 bg-surface p-6 shadow-sm transition-colors duration-200 hover:border-white/20 sm:p-8">
      <div className="flex flex-wrap items-start gap-4">
        <Monogram text={entry.monogram} className="h-14 w-14 text-base" />
        <div className="min-w-0 flex-1">
          <h3 className="text-xl font-semibold tracking-tight text-zinc-50">
            {entry.company}
            {entry.companyTagline && (
              <span className="font-normal text-zinc-500">
                {' '}
                · {entry.companyTagline}
              </span>
            )}
          </h3>
          <p className="mt-1 font-mono text-xs text-zinc-400">
            {entry.dateRange} · {entry.location}
          </p>
        </div>
      </div>

      <h4 className="mt-5 text-base font-semibold text-violet-300">
        {entry.title}
      </h4>
      <p className="mt-2 leading-relaxed text-zinc-300">{entry.summary}</p>

      <ul className="mt-4 space-y-2.5">
        {entry.highlights.map((highlight) => (
          <li
            key={highlight.slice(0, 48)}
            className="flex gap-3 leading-relaxed text-zinc-400"
          >
            <span
              aria-hidden="true"
              className="mt-[0.65rem] h-1.5 w-1.5 shrink-0 rounded-full bg-gradient-to-r from-violet-400 to-cyan-400"
            />
            <span>{highlight}</span>
          </li>
        ))}
      </ul>

      {entry.links.length > 0 && (
        <div className="mt-6 flex flex-wrap gap-x-5 gap-y-2 border-t border-white/5 pt-4">
          {entry.links.map((link) => (
            <a
              key={link.url}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-sm font-medium text-cyan-300 transition-colors hover:text-cyan-200"
            >
              {link.label}
              <ArrowUpRightIcon className="h-3.5 w-3.5" aria-hidden="true" />
            </a>
          ))}
        </div>
      )}
    </SpotlightCard>
  );
}

export default ExperienceCard;
