import { geicoFacts } from './facts';

/** Case-study strip shown under the home-page pipeline diagram. */
export const pipelineCaseStudy = [
  {
    title: 'The problem',
    body: 'GEICO customers calling about billing waited on hold or hit dead ends in a legacy IVR; the goal was an AI voice agent that resolves real billing tasks end to end.',
  },
  {
    title: 'Engineering decisions',
    body: 'Fact-based journeys replaced a regex/classifier router; Lambda tools execute payments and rescheduling against live account data; simulation-based regression gates guard every release.',
  },
  {
    title: 'Measured outcomes',
    body: `${geicoFacts.containment} of ${geicoFacts.conversations} conversations contained (May–Oct 2026) · ${geicoFacts.payments} payments at ${geicoFacts.paymentsSuccess} authorization success · ${geicoFacts.toolSuccess} informational tool success.`,
  },
] as const;
