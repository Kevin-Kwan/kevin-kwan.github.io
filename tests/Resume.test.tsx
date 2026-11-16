import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import Resume from '../pages/resume';
import { resumeRequestUrl } from '../content/site';

describe('Resume request gate', () => {
  it('gives the inline email link the same subject as the gate button', () => {
    const { container } = render(<Resume />);
    const mailtos = Array.from(
      container.querySelectorAll('a[href^="mailto:"]')
    );
    expect(mailtos.length).toBe(2);
    for (const link of mailtos) {
      expect(link.getAttribute('href')).toBe(resumeRequestUrl);
    }
    expect(resumeRequestUrl).toBe(
      'mailto:kevinkwan@gatech.edu?subject=Resume%20request'
    );
  });

  it('keeps "with Highest Honors" in the At-a-glance education bullet', () => {
    // Recorded decision (Iteration 18): the Iteration 17 honours rule
    // governed only the global footer. The /resume bullet states the
    // actual credential verbatim and stays as-is.
    const { container } = render(<Resume />);
    expect(container.textContent).toContain(
      'Bachelor of Science in Computer Science with Highest Honors'
    );
  });

  it('puts the request action before the At-a-glance summary in the DOM', () => {
    // Iteration 19: the CTA sits at the top of the page, above the
    // summary, so a visitor can act on it without scrolling past the
    // whole summary — and there is still exactly one of it.
    const { container } = render(<Resume />);
    expect(
      screen.getAllByRole('link', { name: 'Request résumé' })
    ).toHaveLength(1);
    const cta = screen.getByRole('link', { name: 'Request résumé' });
    const glance = screen.getByRole('heading', { name: 'At a glance' });
    expect(
      cta.compareDocumentPosition(glance) &
        Node.DOCUMENT_POSITION_FOLLOWING
    ).toBe(Node.DOCUMENT_POSITION_FOLLOWING);
    expect(container.textContent).toContain('At a glance');
  });
});
