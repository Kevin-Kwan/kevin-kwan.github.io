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

  it('capitalizes every metric-strip sub-label', () => {
    // The first two pills were lowercase ("billing agent…",
    // "payment journeys…") while the other two were capitalized.
    for (const metric of insurer!.metricStrip ?? []) {
      expect(metric.label[0]).toBe(metric.label[0].toUpperCase());
    }
    render(<ExperienceCard entry={insurer!} />);
    expect(
      screen.getByText('Billing agent in production, English & Spanish')
    ).not.toBeNull();
    expect(
      screen.getByText('Payment journeys, incl. Pause AutoPay')
    ).not.toBeNull();
  });

  it('shows the summary by default and hides it when showSummary is false', () => {
    const { rerender } = render(<ExperienceCard entry={insurer!} />);
    expect(screen.getByText(insurer!.summary)).not.toBeNull();
    // The home card hides it — the hero already states the role,
    // employer, and ownership, so it only repeats them.
    rerender(<ExperienceCard entry={insurer!} showSummary={false} />);
    expect(screen.queryByText(insurer!.summary)).toBeNull();
  });

  it('omits the company tagline when an entry does not provide one', () => {
    expect(untaggedEntry.companyTagline).toBeUndefined();
    render(<ExperienceCard entry={untaggedEntry} />);

    expect(
      screen.getByRole('heading', { level: 2, name: 'Example Company' })
    ).not.toBeNull();
  });
});
