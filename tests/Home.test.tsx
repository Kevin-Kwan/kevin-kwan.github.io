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

  it('does not retell the pipeline sequence in prose — the pipeline widget is the one place it lives', () => {
    // Iteration 19: the case-study strip under the pipeline (problem /
    // decisions / capabilities, echoing the pipeline stages and the
    // ExperienceCard highlights) is gone, and the pipeline caption no
    // longer restates the call flow. The substance stays: the hero, the
    // GEICO card, and the pipeline inspector still describe the work.
    const { container } = render(<Home />);
    expect(container.textContent).not.toContain(
      'Customers calling GEICO about billing waited on hold'
    );
    expect(container.textContent).not.toContain(
      'Fact-based journeys replaced a regex'
    );
    expect(container.textContent).not.toContain(
      'Billing conversations resolved without a live agent whenever possible'
    );
    expect(container.textContent).not.toContain(
      'a call is routed, understood, acted on by backend tools'
    );
    // The pipeline itself and the GEICO highlights remain.
    expect(screen.getAllByText('AI Voice Agent').length).toBeGreaterThan(0);
    expect(
      screen.getByText(/Co-develop and operate the billing voice agent/)
    ).not.toBeNull();
  });
});
