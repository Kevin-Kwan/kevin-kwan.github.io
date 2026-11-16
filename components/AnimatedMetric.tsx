import { useEffect, useRef, useState } from 'react';
import { animate, useInView, useReducedMotion } from 'motion/react';
import type { Metric } from '../content/profile';
import { useMounted } from './useMounted';

function formatMetricValue(metric: Metric, value: number): string {
  const number = metric.decimals
    ? value.toFixed(metric.decimals)
    : Math.round(value).toLocaleString('en-US');
  return `${metric.prefix ?? ''}${number}${metric.suffix ?? ''}`;
}

interface AnimatedMetricProps {
  metric: Metric;
}

/**
 * Metric value with a one-time count-up when it scrolls into view.
 * The rendered string starts (and, without JavaScript, stays) at the final
 * value from the content layer; after hydration the animation replays from
 * 90% of the target up to the final value. No counting under
 * prefers-reduced-motion.
 */
function AnimatedMetric({ metric }: AnimatedMetricProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: '-40px' });
  const mounted = useMounted();
  const reduceMotion = useReducedMotion();
  const [display, setDisplay] = useState(metric.value);

  useEffect(() => {
    if (!mounted || !inView || reduceMotion || metric.countTo == null) {
      return;
    }
    const target = metric.countTo;
    const controls = animate(target * 0.9, target, {
      duration: 0.9,
      ease: 'easeOut',
      onUpdate: (value) => setDisplay(formatMetricValue(metric, value)),
    });
    return () => controls.stop();
  }, [mounted, inView, reduceMotion, metric]);

  return <span ref={ref}>{display}</span>;
}

export default AnimatedMetric;
