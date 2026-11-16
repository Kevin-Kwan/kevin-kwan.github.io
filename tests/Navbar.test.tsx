import { describe, expect, it, vi } from 'vitest';
import { fireEvent, render, screen, within } from '@testing-library/react';
import Navbar from '../components/Navbar';

vi.mock('next/router', () => ({
  useRouter: () => ({
    pathname: '/',
    query: {},
    isReady: true,
  }),
}));

describe('Navbar résumé entries', () => {
  it('mobile menu carries exactly one résumé entry, the "Résumé" nav link', () => {
    // Iteration 19: the mobile menu used to list both "Résumé" (nav)
    // and a separate "Request Résumé" button, both pointing at /resume.
    const { container } = render(<Navbar />);
    fireEvent.click(screen.getByRole('button', { name: 'Open menu' }));

    const mobileNav = screen.getByRole('navigation', { name: 'Mobile' });
    const resumeLinks = within(mobileNav).getAllByRole('link', {
      name: 'Résumé',
    });
    expect(resumeLinks).toHaveLength(1);
    expect(resumeLinks[0].getAttribute('href')).toBe('/resume');

    // No second résumé destination anywhere in the header.
    expect(
      container.querySelectorAll('a[href="/resume"]')
    ).toHaveLength(2); // desktop nav + the one mobile entry
    expect(screen.queryByText('Request Résumé')).toBeNull();
  });

  it('desktop nav has no equivalent duplication', () => {
    // Desktop: navLinks.slice(1, -1) renders each page once; the
    // Contact button is a different destination.
    render(<Navbar />);
    const primaryNav = screen.getByRole('navigation', { name: 'Primary' });
    const resumeLinks = within(primaryNav).getAllByRole('link', {
      name: 'Résumé',
    });
    expect(resumeLinks).toHaveLength(1);
    expect(resumeLinks[0].getAttribute('href')).toBe('/resume');
    expect(
      within(primaryNav).getByRole('link', { name: 'Contact' })
    ).not.toBeNull();
  });
});
