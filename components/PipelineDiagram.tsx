import type { ComponentType } from 'react';
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
}

const NODES: PipelineNode[] = [
  { label: 'Caller', sub: 'Customer call', Icon: PhoneIcon },
  {
    label: 'Amazon Connect',
    sub: 'Routing & telephony',
    Icon: ArrowsRightLeftIcon,
  },
  {
    label: 'AI Voice Agent',
    sub: 'Intent & dialogue',
    Icon: ChatBubbleLeftRightIcon,
  },
  {
    label: 'Lambda Tools',
    sub: 'Payments & account APIs',
    Icon: BoltIcon,
  },
  {
    label: 'Resolution',
    sub: 'Contained or handed off',
    Icon: CheckCircleIcon,
  },
];

/**
 * Light pulse traveling along a connector. Horizontal on sm+ (connectors
 * are flexible-width rows), vertical on mobile (connectors are short
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
 * tools, and the request ends in a resolution. Static content lives in the
 * exported HTML; the moving pulses are decoration only.
 */
function PipelineDiagram() {
  return (
    <figure className="rounded-2xl border border-white/10 bg-surface p-6 sm:p-8">
      <p className="font-mono text-xs uppercase tracking-[0.2em] text-zinc-400">
        System overview
      </p>
      <ol className="mt-6 flex flex-col items-center sm:flex-row sm:items-stretch">
        {NODES.map((node, i) => (
          <li
            key={node.label}
            className="flex flex-col items-center sm:flex-1 sm:flex-row"
          >
            <div className="flex w-full max-w-xs flex-col items-center rounded-xl border border-white/10 bg-white/[0.03] px-4 py-4 text-center sm:w-auto sm:min-w-[7.5rem] sm:flex-1">
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
            </div>
            {i < NODES.length - 1 && (
              <>
                {/* Vertical connector (mobile stack) */}
                <div
                  aria-hidden="true"
                  className="relative h-7 w-[2px] shrink-0 overflow-hidden rounded bg-white/10 sm:hidden"
                >
                  <ConnectorPulse index={i} vertical />
                </div>
                {/* Horizontal connector (sm+ row) */}
                <div
                  aria-hidden="true"
                  className="relative mx-1 hidden h-[2px] min-w-5 flex-1 self-center overflow-hidden rounded bg-white/10 sm:block"
                >
                  <ConnectorPulse index={i} />
                </div>
              </>
            )}
          </li>
        ))}
      </ol>
      <figcaption className="mt-6 text-center text-sm leading-relaxed text-zinc-400">
        Illustrative overview of the voice-agent pipeline behind the GEICO
        work above — a call is routed, understood, acted on by backend
        tools, and resolved without a live agent whenever possible.
      </figcaption>
    </figure>
  );
}

export default PipelineDiagram;
