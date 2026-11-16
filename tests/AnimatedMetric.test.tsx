import { describe, expect, it } from 'vitest';
import { render } from '@testing-library/react';
import AnimatedMetric from '../components/AnimatedMetric';
import { metrics, type Metric } from '../content/profile';

describe('AnimatedMetric', () => {
  it('renders the capability word verbatim', () => {
    const metric = metrics.find((m) => m.label === 'Billing agent');
    expect(metric).toBeDefined();
    const { container } = render(<AnimatedMetric metric={metric!} />);
    expect(container.textContent).toBe('Voice AI');
  });

  it('renders every home-band metric value verbatim', () => {
    for (const metric of metrics) {
      const { container } = render(<AnimatedMetric metric={metric} />);
      expect(container.textContent).toBe(metric.value);
    }
  });

  it('renders a plain metric definition verbatim', () => {
    const metric: Metric = {
      value: 'IVR',
      label: 'Amazon Connect',
      detail: 'Billing and Proof of Coverage IVRs',
    };
    const { container } = render(<AnimatedMetric metric={metric} />);
    expect(container.textContent).toBe('IVR');
  });
});
