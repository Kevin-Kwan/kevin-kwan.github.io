import {
  Fragment,
  useEffect,
  useRef,
  useState,
  type ComponentType,
} from 'react';
import { useReducedMotion } from 'motion/react';
import { PauseIcon, PlayIcon } from '@heroicons/react/24/outline';
import {
  SiGit,
  SiGithubactions,
  SiNextdotjs,
  SiOpenjdk,
  SiPython,
  SiReact,
  SiTerraform,
  SiTypescript,
} from 'react-icons/si';
import { FaHeadset, FaPlug } from 'react-icons/fa';
import {
  BeakerIcon,
  ChatBubbleLeftRightIcon,
  CircleStackIcon,
  SparklesIcon,
} from '@heroicons/react/24/outline';
import { coreSkills } from '../content/skills';
import { useMounted } from './useMounted';

/**
 * Custom Lambda glyph — the one marquee skill whose service mark is a
 * single iconic letterform with no Simple Icons entry.
 */
function LambdaIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <polygon points="13.5,3 20.5,21 16.9,21 13.5,12.6 10.1,21 6.5,21" />
    </svg>
  );
}

/**
 * An icon for every marquee skill: real brand icons (Simple Icons via
 * react-icons) where they exist; for the platform skills with no brand
 * glyph, the same glyphs the /skills page uses for them (SkillIcon), plus
 * the custom lambda above — so the marquee and /skills never disagree.
 */
const SKILL_ICONS: Record<string, ComponentType<{ className?: string }>> = {
  Java: SiOpenjdk,
  Python: SiPython,
  TypeScript: SiTypescript,
  'Amazon Connect': FaHeadset,
  'Amazon Lex': ChatBubbleLeftRightIcon,
  'Sierra AI': SparklesIcon,
  'AWS Lambda': LambdaIcon,
  DynamoDB: CircleStackIcon,
  Terraform: SiTerraform,
  React: SiReact,
  'Next.js': SiNextdotjs,
  'REST APIs': FaPlug,
  Cyara: BeakerIcon,
  Git: SiGit,
  'CI/CD': SiGithubactions,
};

/**
 * One half of the ticker track. The two halves are identical and each
 * carries a trailing padding equal to the item gap, so the -50% keyframe
 * loop is seamless — the parent track itself has no gap.
 */
function MarqueeHalf({ ariaHidden = false }: { ariaHidden?: boolean }) {
  return (
    <div
      className="flex shrink-0 items-center gap-6 pr-6 sm:gap-8 sm:pr-8"
      aria-hidden={ariaHidden || undefined}
    >
      {coreSkills.map((skill) => {
        const Icon = SKILL_ICONS[skill];
        return (
          <Fragment key={skill}>
            <span className="flex items-center gap-2 whitespace-nowrap">
              {Icon && (
                <Icon className="h-4 w-4 text-zinc-400" aria-hidden="true" />
              )}
              {skill}
            </span>
            <span
              aria-hidden="true"
              className="h-1.5 w-1.5 shrink-0 rotate-45 bg-gradient-to-br from-violet-400 to-cyan-400"
            />
          </Fragment>
        );
      })}
    </div>
  );
}

/**
 * Infinite ticker of core skills under the home hero. The track is the
 * skill list duplicated once (the second copy is aria-hidden) and slides
 * by half its width on a CSS keyframe loop. It pauses on hover, via an
 * explicit pause/play button, and whenever it is scrolled out of view.
 * The "Core skills" label sits on a role="region" landmark — a bare
 * <div> cannot carry an accessible name, so without the role the label
 * was silently dropped.
 * Before hydration — which includes the no-JavaScript case — and under
 * prefers-reduced-motion, a static wrapped list renders instead, so the
 * exported HTML is the plain, fully readable list.
 */
function TechMarquee() {
  const mounted = useMounted();
  const reduceMotion = useReducedMotion();
  const containerRef = useRef<HTMLDivElement>(null);
  const [userPaused, setUserPaused] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [inView, setInView] = useState(true);

  // Pause the loop while the ticker is off-screen.
  useEffect(() => {
    const el = containerRef.current;
    if (!el || typeof IntersectionObserver === 'undefined') return;
    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold: 0 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [mounted, reduceMotion]);

  if (!mounted || reduceMotion) {
    return (
      <div
        className="mx-auto max-w-6xl px-4 py-6 sm:px-6"
        role="region"
        aria-label="Core skills"
      >
        <ul className="flex flex-wrap justify-center gap-x-6 gap-y-2 font-mono text-sm text-zinc-400">
          {coreSkills.map((skill) => (
            <li key={skill}>{skill}</li>
          ))}
        </ul>
      </div>
    );
  }

  const paused = userPaused || hovered || !inView;

  return (
    <div
      ref={containerRef}
      className="relative"
      role="region"
      aria-label="Core skills"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="overflow-hidden py-6 [mask-image:linear-gradient(to_right,transparent,black_12%,black_88%,transparent)]">
        <div
          className="animate-marquee flex w-max font-mono text-sm text-zinc-400"
          style={{ animationPlayState: paused ? 'paused' : 'running' }}
        >
          <MarqueeHalf />
          <MarqueeHalf ariaHidden />
        </div>
      </div>
      <button
        type="button"
        onClick={() => setUserPaused((value) => !value)}
        aria-label={
          userPaused ? 'Resume scrolling skills' : 'Pause scrolling skills'
        }
        className="absolute right-3 top-1/2 z-10 -translate-y-1/2 rounded-full border border-white/10 bg-surface/90 p-2 text-zinc-400 backdrop-blur transition-colors hover:text-zinc-100"
      >
        {userPaused ? (
          <PlayIcon className="h-3.5 w-3.5" aria-hidden="true" />
        ) : (
          <PauseIcon className="h-3.5 w-3.5" aria-hidden="true" />
        )}
      </button>
    </div>
  );
}

export default TechMarquee;
