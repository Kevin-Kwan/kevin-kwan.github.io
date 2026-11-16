import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import ExperienceCard from '../components/ExperienceCard';
import { experience } from '../content/experience';

const insurer = experience.find((entry) => entry.id === 'major-insurer');
const ncr = experience.find((entry) => entry.id === 'ncr-voyix');

describe('ExperienceCard', () => {
  it('keeps the heading hierarchy: company h3, job title h4, workstreams h5', () => {
    expect(insurer).toBeDefined();
    render(<ExperienceCard entry={insurer!} />);

    expect(
      screen.getByRole('heading', { level: 3, name: /Major U.S. Auto Insurer/ })
    ).not.toBeNull();
    expect(
      screen.getByRole('heading', { level: 4, name: /Software Engineer II/ })
    ).not.toBeNull();
    for (const section of insurer!.sections ?? []) {
      expect(
        screen.getByRole('heading', { level: 5, name: section.title })
      ).not.toBeNull();
    }
  });

  it('shows no dated role progression for the insurer entry', () => {
    expect(insurer!.roles).toBeUndefined();
    render(<ExperienceCard entry={insurer!} />);
    expect(screen.queryByText(/February 2026/)).toBeNull();
  });

  it('renders the metric strip values', () => {
    render(<ExperienceCard entry={insurer!} />);
    for (const metric of insurer!.metricStrip ?? []) {
      expect(screen.getByText(metric.value)).not.toBeNull();
    }
  });

  it('omits the company tagline when an entry does not provide one', () => {
    expect(ncr).toBeDefined();
    expect(ncr!.companyTagline).toBeUndefined();
    render(<ExperienceCard entry={ncr!} />);

    expect(
      screen.getByRole('heading', { level: 3, name: 'NCR Corporation' })
    ).not.toBeNull();
  });
});
