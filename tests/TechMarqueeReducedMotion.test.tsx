import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import TechMarquee from '../components/TechMarquee';

// Separate file from TechMarquee.test.tsx on purpose: motion's
// useReducedMotion captures the preference once, in a module-level
// singleton, on the first render in the module registry — and vitest
// isolates registries per file. This file installs a reduced-motion
// matchMedia before any render so the singleton initialises to "reduce".
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: (query: string): MediaQueryList => ({
    matches: query.includes('prefers-reduced-motion'),
    media: query,
    onchange: null,
    addListener: () => {},
    removeListener: () => {},
    addEventListener: () => {},
    removeEventListener: () => {},
    dispatchEvent: () => false,
  }),
});

describe('TechMarquee under prefers-reduced-motion', () => {
  it('renders the static skill list, never the animated ticker', () => {
    // Iteration 19: under reduced motion the marquee must not run —
    // the component renders the plain wrapped list, with no animated
    // track and no pause button (nothing to pause).
    const { container } = render(<TechMarquee />);
    expect(container.querySelector('.animate-marquee')).toBeNull();
    expect(
      screen.queryByRole('button', { name: /scrolling skills/ })
    ).toBeNull();
    // Every core skill is still present, exactly once (the ticker
    // duplicates the list for the seamless loop; the static list does
    // not).
    expect(screen.getAllByText('Amazon Connect')).toHaveLength(1);
    expect(screen.getAllByText('Terraform')).toHaveLength(1);
    expect(screen.getAllByText('AWS Lambda')).toHaveLength(1);
  });
});
