import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import Contact from '../pages/contact';
import { site } from '../content/site';

describe('Contact page', () => {
  it('keeps the introduction to one line', () => {
    // Iteration 19: the old intro ran three sentences ("If you would
    // like to reach out … fill out the form below … I'll get back to
    // you as soon as possible!"). One line now.
    render(<Contact />);
    expect(
      screen.getByText(
        "Questions, feedback, or a bug to report — send a message below and I'll get back to you."
      )
    ).not.toBeNull();
    expect(screen.queryByText(/fill out the form below/)).toBeNull();
  });

  it('keeps the form and the direct links intact', () => {
    const { container } = render(<Contact />);
    expect(
      screen.getByLabelText('Your name')
    ).not.toBeNull();
    expect(screen.getByLabelText('Your email address')).not.toBeNull();
    expect(screen.getByLabelText('Your message')).not.toBeNull();
    expect(
      screen.getByRole('button', { name: 'Send message' })
    ).not.toBeNull();
    // Direct email card still shows the address.
    const emailLink = container.querySelector(
      `a[href="mailto:${site.contactEmail}"]`
    );
    expect(emailLink).not.toBeNull();
    expect(emailLink?.textContent).toContain(site.contactEmail);
    expect(
      screen.getByRole('link', { name: /LinkedIn/ })
    ).not.toBeNull();
    expect(screen.getByRole('link', { name: /GitHub/ })).not.toBeNull();
  });
});
