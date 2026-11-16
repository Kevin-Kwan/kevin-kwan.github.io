/** Case-study strip shown under the home-page pipeline diagram. */
export const pipelineCaseStudy = [
  {
    title: 'The problem',
    body: 'Customers calling GEICO about billing waited on hold or hit dead ends in a legacy IVR; the goal was an AI voice agent that resolves real billing tasks end to end.',
  },
  {
    title: 'Engineering decisions',
    body: 'Fact-based journeys replaced a regex/classifier router; Lambda tools execute payments and rescheduling against live account data; simulation-based regression gates guard every release.',
  },
  {
    title: 'Production capabilities',
    body: 'Billing conversations resolved without a live agent whenever possible · end-to-end payments with card recovery · informational answers across billing topics.',
  },
] as const;
