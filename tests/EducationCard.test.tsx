import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import EducationCard from '../components/EducationCard';
import { education } from '../content/education';

const georgiaTech = education[0];

describe('EducationCard', () => {
  it('keeps the heading hierarchy: school h3, credential h4', () => {
    render(<EducationCard entry={georgiaTech} />);
    expect(
      screen.getByRole('heading', {
        level: 3,
        name: /Georgia Institute of Technology/,
      })
    ).not.toBeNull();
    expect(
      screen.getByRole('heading', { level: 4, name: georgiaTech.credential })
    ).not.toBeNull();
  });
});
