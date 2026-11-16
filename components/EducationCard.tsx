import { ArrowUpRightIcon } from '@heroicons/react/24/outline';
import type { EducationEntry } from '../content/education';
import OrgLogo from './OrgLogo';

interface EducationCardProps {
  entry: EducationEntry;
}

function EducationCard({ entry }: EducationCardProps) {
  return (
    <div className="flex h-full flex-col rounded-2xl border border-white/10 bg-surface p-6 transition-colors duration-200 hover:border-white/20 sm:p-8">
      <div className="flex items-start gap-4">
        <OrgLogo logo={entry.logo} />
        <div className="min-w-0 flex-1">
          <h3 className="text-xl font-semibold tracking-tight text-zinc-50">
            {entry.school}
            {entry.unit && (
              <span className="font-normal text-zinc-400"> · {entry.unit}</span>
            )}
          </h3>
          <p className="mt-1 font-mono text-xs text-zinc-400">
            {entry.dateRange} · {entry.location}
          </p>
          {/* On small screens the GPA sits inline under the date line so the
              school name keeps the full text column; the side badge is sm+. */}
          {entry.gpa && (
            <p className="mt-2 font-mono text-xs text-zinc-400 sm:hidden">
              <span className="uppercase tracking-widest">GPA</span>{' '}
              <span className="text-sm font-semibold text-zinc-100">
                {`${entry.gpa}${entry.gpaNote ? ` ${entry.gpaNote}` : ''}`}
              </span>
            </p>
          )}
        </div>
        {entry.gpa && (
          <div className="hidden shrink-0 rounded-lg border border-white/10 bg-white/[0.04] px-3 py-2 text-right sm:block">
            <p className="font-mono text-[10px] uppercase tracking-widest text-zinc-400">
              GPA
            </p>
            <p className="font-mono text-sm font-semibold text-zinc-100">
              {`${entry.gpa}${entry.gpaNote ? ` ${entry.gpaNote}` : ''}`}
            </p>
          </div>
        )}
      </div>

      <h4 className="mt-5 text-base font-semibold text-violet-300">
        {entry.credential}
      </h4>
      {entry.details.map((detail) => (
        <p key={detail} className="mt-2 leading-relaxed text-zinc-400">
          {detail}
        </p>
      ))}

      {/* Spacer so the links row pins to the card bottom in equal-height rows. */}
      <div className="flex-1" aria-hidden="true" />
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
    </div>
  );
}

export default EducationCard;
