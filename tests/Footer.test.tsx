import { describe, expect, it } from 'vitest';
import { render } from '@testing-library/react';
import Footer from '../components/Footer';

describe('Footer', () => {
  it('renders the role line with real spaces (no concatenated text nodes)', () => {
    const { container } = render(<Footer />);
    expect(container.textContent).toContain(
      'Software Engineer II at GEICO'
    );
  });

  it('renders the copyright line with the year and name spaced', () => {
    const { container } = render(<Footer />);
    expect(container.textContent).toContain(
      `© ${new Date().getFullYear()} Kevin Kwan`
    );
  });

  it('states the degree without repeating the honours claim', () => {
    const { container } = render(<Footer />);
    expect(container.textContent).toContain(
      'Georgia Tech B.S. in Computer Science.'
    );
    // The honours claim stands alone on the Georgia Tech education
    // card; the footer must not duplicate it.
    expect(container.textContent).not.toContain('summa cum laude');
  });

  it('links "View source" at the lowercase repo name', () => {
    const { container } = render(<Footer />);
    const link = container.querySelector('a[href*="github.com/Kevin-Kwan/"]');
    expect(link).not.toBeNull();
    expect(link!.getAttribute('href')).toBe(
      'https://github.com/Kevin-Kwan/kevin-kwan.github.io'
    );
  });
});
