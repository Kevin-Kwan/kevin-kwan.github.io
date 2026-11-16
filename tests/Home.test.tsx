import { describe, expect, it } from 'vitest';
import { render, screen, within } from '@testing-library/react';
import Home from '../pages/index';

describe('Home hero', () => {
  it('links the "Request résumé" CTA to the /resume gate, not a mailto:', () => {
    const { container } = render(<Home />);
    const cta = screen.getByRole('link', { name: /Request résumé/ });
    expect(cta.getAttribute('href')).toBe('/resume');
    // No raw mailto: anywhere on the home page — the mailto lives only
    // on the /resume request-gate page itself.
    expect(container.querySelector('a[href^="mailto:"]')).toBeNull();
  });

  it('does not repeat the role as a lead-in in the hero second paragraph', () => {
    const { container } = render(<Home />);
    // The eyebrow already states "Software Engineer II · … · GEICO".
    expect(container.textContent).not.toContain(
      'Software Engineer II owning'
    );
    expect(container.textContent).toContain(
      'Owning critical payment journeys'
    );
  });

  it('hides the GEICO summary on the home card — the hero already says it', () => {
    render(<Home />);
    expect(
      screen.queryByText(/customer-service automation platforms/)
    ).toBeNull();
    // The condensed bullets still render.
    expect(
      screen.getByText(/Co-develop and operate the billing voice agent/)
    ).not.toBeNull();
  });

  it('has no GitHub/LinkedIn icon links in the hero row', () => {
    const { container } = render(<Home />);
    // Scope to the hero section: featured ProjectCards below legitimately
    // link out to their own GitHub repos.
    const hero = container.querySelector('section');
    expect(hero).not.toBeNull();
    const heroQueries = within(hero as HTMLElement);
    // Both already appear in the header and footer; the hero keeps
    // focus on the two primary CTAs and cannot wrap on narrow screens.
    expect(heroQueries.queryByRole('link', { name: 'GitHub' })).toBeNull();
    expect(
      heroQueries.queryByRole('link', { name: 'LinkedIn' })
    ).toBeNull();
    // The contact section keeps its own LinkedIn link.
    expect(
      screen.getByRole('link', { name: 'Connect on LinkedIn' })
    ).not.toBeNull();
  });
});
