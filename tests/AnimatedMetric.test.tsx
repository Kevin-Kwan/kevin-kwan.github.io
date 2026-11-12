import { describe, expect, it } from 'vitest';
import { render } from '@testing-library/react';
import AnimatedMetric from '../components/AnimatedMetric';
import { metrics, type Metric } from '../content/profile';

describe('AnimatedMetric', () => {
  it('renders the final formatted value, not a mid-animation number', () => {
    const metric = metrics.find((m) => m.value === '436K+');
    expect(metric).toBeDefined();
    const { container } = render(<AnimatedMetric metric={metric!} />);
    expect(container.textContent).toBe('436K+');
  });

  it('renders the content value verbatim when there is no count-up target', () => {
    const metric: Metric = {
      value: '98%',
      label: 'Tool success',
      detail: 'Informational answers',
    };
    const { container } = render(<AnimatedMetric metric={metric} />);
    expect(container.textContent).toBe('98%');
  });

  it('applies prefix/suffix formatting from the metric definition', () => {
    const metric = metrics.find((m) => m.value === '~30K');
    expect(metric).toBeDefined();
    const { container } = render(<AnimatedMetric metric={metric!} />);
    expect(container.textContent).toBe('~30K');
  });
});
