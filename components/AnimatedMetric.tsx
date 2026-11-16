import type { Metric } from '../content/profile';

interface AnimatedMetricProps {
  metric: Metric;
}

/**
 * Renders a capability word verbatim. The old count-up animation is gone:
 * these values are descriptive words, not numbers, so there is nothing to
 * count toward — the component is a plain render kept so the home band's
 * markup stays uniform.
 */
function AnimatedMetric({ metric }: AnimatedMetricProps) {
  return <span>{metric.value}</span>;
}

export default AnimatedMetric;
