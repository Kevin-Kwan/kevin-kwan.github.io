import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import EducationCard from '../components/EducationCard';
import { education } from '../content/education';

const georgiaTech = education[0];

describe('EducationCard', () => {
  it('keeps the heading hierarchy: school h2, credential h3', () => {
    render(<EducationCard entry={georgiaTech} />);
    expect(
      screen.getByRole('heading', {
        level: 2,
        name: /Georgia Institute of Technology/,
      })
    ).not.toBeNull();
    expect(
      screen.getByRole('heading', { level: 3, name: georgiaTech.credential })
    ).not.toBeNull();
  });

  it('renders the GPA exactly once — a single responsive badge', () => {
    render(<EducationCard entry={georgiaTech} />);
    // One DOM node at every width: screen readers announce "GPA 3.9"
    // once, and no sm:hidden / hidden sm:block pair can disagree at
    // intermediate widths.
    expect(screen.getAllByText('GPA')).toHaveLength(1);
    expect(screen.getAllByText('3.9')).toHaveLength(1);
  });
});
