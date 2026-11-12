import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import ExperienceCard from '../components/ExperienceCard';
import { experience } from '../content/experience';

const geico = experience.find((entry) => entry.id === 'geico');

describe('ExperienceCard', () => {
  it('keeps the heading hierarchy: company h3, job title h4, workstreams h5', () => {
    expect(geico).toBeDefined();
    render(<ExperienceCard entry={geico!} />);

    expect(
      screen.getByRole('heading', { level: 3, name: /GEICO/ })
    ).not.toBeNull();
    expect(
      screen.getByRole('heading', { level: 4, name: /Software Engineer II/ })
    ).not.toBeNull();
    for (const section of geico!.sections ?? []) {
      expect(
        screen.getByRole('heading', { level: 5, name: section.title })
      ).not.toBeNull();
    }
  });

  it('renders the metric strip values', () => {
    render(<ExperienceCard entry={geico!} />);
    for (const metric of geico!.metricStrip ?? []) {
      expect(screen.getByText(metric.value)).not.toBeNull();
    }
  });
});
