import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import ExperienceCard from '../components/ExperienceCard';
import { experience, type ExperienceEntry } from '../content/experience';

const insurer = experience.find((entry) => entry.id === 'geico');

/** Minimal entry with no companyTagline, for the tagline-omission test. */
const untaggedEntry: ExperienceEntry = {
  id: 'untagged-example',
  company: 'Example Company',
  title: 'Software Engineer Intern',
  dateRange: 'July 2019 – August 2019',
  location: 'Atlanta, GA',
  summary: 'Example summary.',
  highlights: ['Example highlight.'],
  links: [],
};

describe('ExperienceCard', () => {
  it('keeps the heading hierarchy: company h2, job title h3, workstreams h4', () => {
    expect(insurer).toBeDefined();
    render(<ExperienceCard entry={insurer!} />);

    expect(
      screen.getByRole('heading', { level: 2, name: /GEICO/ })
    ).not.toBeNull();
    expect(
      screen.getByRole('heading', { level: 3, name: /Software Engineer II/ })
    ).not.toBeNull();
    for (const section of insurer!.sections ?? []) {
      expect(
        screen.getByRole('heading', { level: 4, name: section.title })
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
    expect(untaggedEntry.companyTagline).toBeUndefined();
    render(<ExperienceCard entry={untaggedEntry} />);

    expect(
      screen.getByRole('heading', { level: 2, name: 'Example Company' })
    ).not.toBeNull();
  });
});
