import { describe, expect, it } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import TechMarquee from '../components/TechMarquee';

describe('TechMarquee', () => {
  it('renders the pause button once hydrated', () => {
    render(<TechMarquee />);
    expect(
      screen.getByRole('button', { name: 'Pause scrolling skills' })
    ).not.toBeNull();
  });

  it('toggles between pause and resume, pausing the track', () => {
    const { container } = render(<TechMarquee />);
    const track = container.querySelector('.animate-marquee');
    expect(track).not.toBeNull();
    expect((track as HTMLElement).style.animationPlayState).toBe('running');

    fireEvent.click(
      screen.getByRole('button', { name: 'Pause scrolling skills' })
    );
    expect(
      screen.getByRole('button', { name: 'Resume scrolling skills' })
    ).not.toBeNull();
    expect((track as HTMLElement).style.animationPlayState).toBe('paused');

    fireEvent.click(
      screen.getByRole('button', { name: 'Resume scrolling skills' })
    );
    expect(
      screen.getByRole('button', { name: 'Pause scrolling skills' })
    ).not.toBeNull();
    expect((track as HTMLElement).style.animationPlayState).toBe('running');
  });

  it('renders every core skill in the ticker', () => {
    render(<TechMarquee />);
    // Skills render twice (the seamless loop duplicates the track).
    expect(screen.getAllByText('Amazon Connect').length).toBeGreaterThan(0);
    expect(screen.getAllByText('Terraform').length).toBeGreaterThan(0);
  });
});
