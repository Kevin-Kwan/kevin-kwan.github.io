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
            <span
              data-marquee-unit
              className="flex items-center gap-2 whitespace-nowrap"
            >
              {Icon && (
                <Icon className="h-4 w-4 text-zinc-400" aria-hidden="true" />
              )}
              {skill}
            </span>
            <span
              aria-hidden="true"
              data-marquee-unit
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
  const fadeRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
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

  const paused = userPaused || hovered || !inView;

  /**
   * Per-unit edge fade. The CSS mask alone cannot keep a chip from
   * looking half-cut: a 145px chip sliding through a 180px linear fade
   * stays legible for ~3s while straddling the container edge. So each
   * ticker unit (chip or diamond, marked data-marquee-unit) fades as a
   * whole instead: its opacity is a smoothstep of the fraction of its
   * width inside the fully-opaque zone, so it is never shown sliced —
   * it fades in and out as one unit, and a unit barely inside the zone
   * stays effectively invisible instead of showing a faint fragment at
   * the edge. The fade width matches `.marquee-fade` in globals.css
   * (min(180px, max(120px, 22%)) of the container — the 120px floor
   * keeps the zone wider than most chips even on narrow screens, so a
   * unit sliced by the container edge is always near-zero opacity);
   * the mask stays as the base layer and as the fallback if this loop
   * ever stalls. The loop runs only while the ticker is mounted,
   * moving, and on screen; when paused the opacities freeze with the
   * animation, which is the correct frame for the frozen positions.
   * NOTE: this effect must stay above the early return below — hooks
   * cannot be called conditionally, and the static branch returns
   * before it.
   */
  useEffect(() => {
    if (!mounted || reduceMotion || paused) return;
    const track = trackRef.current;
    const fadeEl = fadeRef.current;
    if (!track || !fadeEl || typeof requestAnimationFrame === 'undefined') {
      return;
    }
    let raf = 0;
    let stopped = false;
    const update = () => {
      if (stopped) return;
      const cRect = fadeEl.getBoundingClientRect();
      const fade = Math.min(180, Math.max(120, cRect.width * 0.22));
      const safeLeft = cRect.left + fade;
      const safeRight = cRect.right - fade;
      track.querySelectorAll('[data-marquee-unit]').forEach((unit) => {
        const el = unit as HTMLElement;
        const r = el.getBoundingClientRect();
        if (r.width <= 0) {
          el.style.opacity = '';
          return;
        }
        const inside = Math.max(
          0,
          Math.min(r.right, safeRight) - Math.max(r.left, safeLeft)
        );
        const frac = Math.min(1, inside / r.width);
        // Smoothstep the fraction: a unit barely inside the zone stays
        // effectively invisible (frac 0.12 -> opacity ~0.04) instead of
        // showing a faintly legible fragment at the container edge.
        el.style.opacity = String(frac * frac * (3 - 2 * frac));
      });
      raf = requestAnimationFrame(update);
    };
    raf = requestAnimationFrame(update);
    return () => {
      stopped = true;
      cancelAnimationFrame(raf);
    };
  }, [mounted, reduceMotion, paused]);

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

  return (
    <div
      ref={containerRef}
      className="relative"
      role="region"
      aria-label="Core skills"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div ref={fadeRef} className="marquee-fade overflow-hidden py-6">
        <div
          ref={trackRef}
          className="animate-marquee flex w-max font-mono text-sm text-zinc-400 will-change-transform"
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
