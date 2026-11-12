import { useReducedMotion } from 'motion/react';
import { coreSkills } from '../content/skills';
import { useMounted } from './useMounted';

function MarqueeItem({ label }: { label: string }) {
  return (
    <span className="flex items-center gap-6 pr-6 sm:gap-8 sm:pr-8">
      <span className="whitespace-nowrap">{label}</span>
      <span
        aria-hidden="true"
        className="h-1.5 w-1.5 rotate-45 bg-gradient-to-br from-violet-400 to-cyan-400"
      />
    </span>
  );
}

/**
 * Infinite ticker of core skills under the home hero. The track is the
 * skill list duplicated once (the second copy is aria-hidden) and slides
 * by half its width on a CSS keyframe loop; it pauses on hover. Before
 * hydration — which includes the no-JavaScript case — and under
 * prefers-reduced-motion, a static wrapped list renders instead, so the
 * exported HTML is the plain, fully readable list.
 */
function TechMarquee() {
  const mounted = useMounted();
  const reduceMotion = useReducedMotion();

  if (!mounted || reduceMotion) {
    return (
      <div className="mx-auto max-w-6xl px-4 py-6 sm:px-6" aria-label="Core skills">
        <ul className="flex flex-wrap justify-center gap-x-6 gap-y-2 font-mono text-sm text-zinc-400">
          {coreSkills.map((skill) => (
            <li key={skill}>{skill}</li>
          ))}
        </ul>
      </div>
    );
  }

  return (
    <div
      className="marquee overflow-hidden py-6 [mask-image:linear-gradient(to_right,transparent,black_12%,black_88%,transparent)]"
      aria-label="Core skills"
    >
      <div className="animate-marquee flex w-max font-mono text-sm text-zinc-400">
        <div className="flex">
          {coreSkills.map((skill) => (
            <MarqueeItem key={skill} label={skill} />
          ))}
        </div>
        <div className="flex" aria-hidden="true">
          {coreSkills.map((skill) => (
            <MarqueeItem key={`copy-${skill}`} label={skill} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default TechMarquee;
