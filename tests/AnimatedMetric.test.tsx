import { describe, expect, it } from 'vitest';
import { render } from '@testing-library/react';
import AnimatedMetric from '../components/AnimatedMetric';
import { metrics, type Metric } from '../content/profile';

describe('AnimatedMetric', () => {
  it('renders the final formatted value, not a mid-animation number', () => {
    const metric = metrics.find((m) => m.label === 'Containment');
    expect(metric).toBeDefined();
    const { container } = render(<AnimatedMetric metric={metric!} />);
    expect(container.textContent).toBe('High');
  });

  it('renders the content value verbatim when there is no count-up target', () => {
    const metric: Metric = {
      value: 'Live',
      label: 'Billing voice agent',
      detail: 'Payments, rescheduling and AutoPay',
    };
    const { container } = render(<AnimatedMetric metric={metric} />);
    expect(container.textContent).toBe('Live');
  });

  it('applies prefix/suffix formatting from the metric definition', () => {
    const metric = metrics.find((m) => m.label === 'Billing voice agent');
    expect(metric).toBeDefined();
    const { container } = render(<AnimatedMetric metric={metric!} />);
    expect(container.textContent).toBe('Live');
  });
});
