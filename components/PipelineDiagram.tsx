import {
  useRef,
  useState,
  useSyncExternalStore,
  type ComponentType,
  type KeyboardEvent,
} from 'react';
import {
  ArrowsRightLeftIcon,
  BoltIcon,
  ChatBubbleLeftRightIcon,
  CheckCircleIcon,
  PhoneIcon,
} from '@heroicons/react/24/outline';

interface PipelineNode {
  label: string;
  sub: string;
  Icon: ComponentType<{ className?: string }>;
  /** Production figures for the inspector panel — all already published
   *  elsewhere on the site (experience highlights / metric strips). */
  metrics: string[];
}

/** Tailwind's lg breakpoint: below it the stages stack vertically. */
const BELOW_LG_MEDIA_QUERY = '(max-width: 1023.98px)';

function subscribeToBelowLg(onStoreChange: () => void) {
  const query = window.matchMedia(BELOW_LG_MEDIA_QUERY);
  query.addEventListener('change', onStoreChange);
  return () => query.removeEventListener('change', onStoreChange);
}

function getBelowLgSnapshot() {
  return window.matchMedia(BELOW_LG_MEDIA_QUERY).matches;
}

function getServerBelowLgSnapshot() {
  return false;
}

/** True when the tab list is using its below-lg vertical layout. */
function useVerticalTabList(): boolean {
  return useSyncExternalStore(
    subscribeToBelowLg,
    getBelowLgSnapshot,
    getServerBelowLgSnapshot
  );
}

const NODES: PipelineNode[] = [
  {
    label: 'Caller',
    sub: 'Customer call',
    Icon: PhoneIcon,
    metrics: [
      '~30,000 calls a week by October 2026',
      'English and Spanish',
      'Billing questions, payments, and rescheduling',
    ],
  },
  {
    label: 'Amazon Connect',
    sub: 'Routing & telephony',
    Icon: ArrowsRightLeftIcon,
    metrics: [
      'Migrated from Cisco UCCE + Nuance IVR',
      'Payment IVR at ~60% containment',
      'Proof of Coverage IVR at ~80% containment',
    ],
  },
  {
    label: 'AI Voice Agent',
    sub: 'Intent & dialogue',
    Icon: ChatBubbleLeftRightIcon,
    metrics: [
      '436,112 conversations (May–Oct 2026)',
      '~51% contained — trending 48% → 52%',
      '192,000 informational answers at 98% tool success',
    ],
  },
  {
    label: 'Lambda Tools',
    sub: 'Payments & account APIs',
    Icon: BoltIcon,
    metrics: [
      '22,600+ payments at 92–95% authorization success',
      '82,800 reschedules completed',
      'AES encryption for customer and payment data',
    ],
  },
  {
    label: 'Resolution',
    sub: 'Contained or handed off',
    Icon: CheckCircleIcon,
    metrics: [
      'Contained without a live agent whenever possible',
      'Simulation-based regression gates on every release',
      '86 of 91 production and UT1 bugs fixed at the root cause',
    ],
  },
];

/**
 * Light pulse traveling along a connector. Horizontal on lg+ (connectors
 * are flexible-width rows), vertical below lg (connectors are short
 * columns). Pure CSS animation; the connector line itself is a plain div,
 * so without JavaScript — or under prefers-reduced-motion, where the
 * pulses are switched off in globals.css — the diagram reads as a static
 * labeled flow.
 */
function ConnectorPulse({ index, vertical }: { index: number; vertical?: boolean }) {
  if (vertical) {
    return (
      <span
        aria-hidden="true"
        className="animate-pipeline-y absolute inset-x-0 top-0 h-1/3 w-full bg-gradient-to-b from-transparent via-cyan-300/70 to-transparent"
        style={{ animationDelay: `${index * 0.55}s` }}
      />
    );
  }
  return (
    <span
      aria-hidden="true"
      className="animate-pipeline-x absolute inset-y-0 left-0 h-full w-1/3 bg-gradient-to-r from-transparent via-cyan-300/70 to-transparent"
      style={{ animationDelay: `${index * 0.55}s` }}
    />
  );
}

/**
 * Illustrative overview of the voice-agent systems Kevin builds: a caller
 * reaches an AI voice agent through Amazon Connect, the agent calls Lambda
 * tools, and the request ends in a resolution. The stages form a WAI-ARIA
 * tab list: selecting a stage (click, or arrow keys with automatic
 * activation, Home/End to jump) shows its production figures in the
 * tab panel below — all published elsewhere on the site. The default
 * stage (AI Voice Agent) is server-rendered, so the exported HTML
 * carries its panel too; the moving pulses are decoration only.
 */
function PipelineDiagram() {
  const [selected, setSelected] = useState(2);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const vertical = useVerticalTabList();
  const active = NODES[selected];

  function activate(index: number) {
    const next = (index + NODES.length) % NODES.length;
    setSelected(next);
    tabRefs.current[next]?.focus();
  }

  function onTabKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    const nextKey = vertical ? 'ArrowDown' : 'ArrowRight';
    const previousKey = vertical ? 'ArrowUp' : 'ArrowLeft';

    switch (event.key) {
      case nextKey:
        event.preventDefault();
        activate(selected + 1);
        break;
      case previousKey:
        event.preventDefault();
        activate(selected - 1);
        break;
      case 'Home':
        event.preventDefault();
        activate(0);
        break;
      case 'End':
        event.preventDefault();
        activate(NODES.length - 1);
        break;
      default:
        break;
    }
  }

  return (
    <figure className="rounded-2xl border border-white/10 bg-surface p-6 sm:p-8">
      <p className="font-mono text-xs uppercase tracking-[0.2em] text-zinc-400">
        System overview
      </p>
      <div
        role="tablist"
        aria-label="Voice pipeline stages"
        aria-orientation={vertical ? 'vertical' : 'horizontal'}
        onKeyDown={onTabKeyDown}
        className="mt-6 flex flex-col items-center lg:flex-row lg:items-stretch"
      >
        {NODES.map((node, i) => (
          <div
            key={node.label}
            role="presentation"
            className="flex flex-col items-center lg:flex-1 lg:flex-row"
          >
            <button
              type="button"
              role="tab"
              id={`pipeline-tab-${i}`}
              aria-selected={selected === i}
              aria-controls="pipeline-inspector"
              tabIndex={selected === i ? 0 : -1}
              ref={(el) => {
                tabRefs.current[i] = el;
              }}
              onClick={() => setSelected(i)}
              className={`flex w-full max-w-xs flex-col items-center rounded-xl border px-4 py-4 text-center transition-colors lg:w-auto lg:min-w-[7.5rem] lg:flex-1 ${
                selected === i
                  ? 'border-cyan-300/50 bg-cyan-300/[0.08]'
                  : 'border-white/10 bg-white/[0.03] hover:border-white/25'
              }`}
            >
              <node.Icon
                className="h-6 w-6 text-cyan-300"
                aria-hidden="true"
              />
              <p className="mt-2.5 text-sm font-semibold text-zinc-50">
                {node.label}
              </p>
              <p className="mt-1 text-xs leading-snug text-zinc-400">
                {node.sub}
              </p>
            </button>
            {i < NODES.length - 1 && (
              <>
                {/* Vertical connector (stacked layout, below lg) */}
                <div
                  aria-hidden="true"
                  className="relative h-7 w-[2px] shrink-0 overflow-hidden rounded bg-white/10 lg:hidden"
                >
                  <ConnectorPulse index={i} vertical />
                </div>
                {/* Horizontal connector (lg+ row) */}
                <div
                  aria-hidden="true"
                  className="relative mx-1 hidden h-[2px] min-w-5 flex-1 self-center overflow-hidden rounded bg-white/10 lg:block"
                >
                  <ConnectorPulse index={i} />
                </div>
              </>
            )}
          </div>
        ))}
      </div>

      {/* Stage inspector — production figures for the selected stage. */}
      <div
        role="tabpanel"
        id="pipeline-inspector"
        aria-labelledby={`pipeline-tab-${selected}`}
        tabIndex={0}
        className="mt-6 rounded-xl border border-white/5 bg-white/[0.02] px-5 py-4"
      >
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-cyan-300">
          {active.label}
        </p>
        <ul className="mt-3 grid gap-2 sm:grid-cols-3">
          {active.metrics.map((metric) => (
            <li
              key={metric}
              className="flex gap-2.5 text-sm leading-snug text-zinc-300"
            >
              <span
                aria-hidden="true"
                className="mt-[0.45rem] h-1.5 w-1.5 shrink-0 rounded-full bg-gradient-to-r from-violet-400 to-cyan-400"
              />
              <span>{metric}</span>
            </li>
          ))}
        </ul>
      </div>

      <figcaption className="mt-6 text-center text-sm leading-relaxed text-zinc-400">
        Illustrative overview of the voice-agent pipeline behind the GEICO
        work above — a call is routed, understood, acted on by backend
        tools, and resolved without a live agent whenever possible. Select
        any stage to inspect its production figures.
      </figcaption>
    </figure>
  );
}

export default PipelineDiagram;
