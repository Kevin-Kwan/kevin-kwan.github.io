import { beforeEach, describe, expect, it, vi } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import CommandPalette from '../components/CommandPalette';
import { site } from '../content/site';

const routerState = vi.hoisted(() => ({
  push: vi.fn<(url: unknown) => Promise<boolean>>(),
}));

vi.mock('next/router', () => ({
  useRouter: () => ({
    pathname: '/',
    query: {},
    isReady: true,
    push: routerState.push,
  }),
}));

function openWithKeyboard() {
  fireEvent.keyDown(window, { key: 'k', metaKey: true });
}

beforeEach(() => {
  routerState.push.mockClear();
});

describe('CommandPalette', () => {
  it('renders nothing until opened, then shows a labelled dialog and focuses the input', () => {
    render(<CommandPalette />);
    expect(screen.queryByRole('dialog')).toBeNull();

    openWithKeyboard();
    expect(
      screen.getByRole('dialog', { name: 'Command palette' })
    ).not.toBeNull();
    expect(document.activeElement).toBe(
      screen.getByLabelText('Command palette search')
    );
  });

  it('opens with Ctrl+K as well as Cmd+K', () => {
    render(<CommandPalette />);
    fireEvent.keyDown(window, { key: 'k', ctrlKey: true });
    expect(screen.getByRole('dialog')).not.toBeNull();
  });

  it('closes on Escape and toggles closed on a second Cmd+K', () => {
    render(<CommandPalette />);
    openWithKeyboard();
    const input = screen.getByLabelText('Command palette search');
    fireEvent.keyDown(input, { key: 'Escape' });
    expect(screen.queryByRole('dialog')).toBeNull();

    openWithKeyboard();
    expect(screen.getByRole('dialog')).not.toBeNull();
    openWithKeyboard();
    expect(screen.queryByRole('dialog')).toBeNull();
  });

  it('filters commands by the search text', () => {
    render(<CommandPalette />);
    openWithKeyboard();
    const input = screen.getByLabelText('Command palette search');
    fireEvent.change(input, { target: { value: 'copy contact' } });
    const options = screen.getAllByRole('option');
    expect(options).toHaveLength(1);
    expect(options[0].textContent).toContain('Copy contact email');
  });

  it('moves the active option with arrow keys and runs it with Enter', () => {
    render(<CommandPalette />);
    openWithKeyboard();
    const input = screen.getByLabelText('Command palette search');

    // First option starts active (Home); one ArrowDown lands on Experience.
    expect(screen.getAllByRole('option')[0].getAttribute('aria-selected')).toBe(
      'true'
    );
    fireEvent.keyDown(input, { key: 'ArrowDown' });
    const options = screen.getAllByRole('option');
    expect(options[0].getAttribute('aria-selected')).toBe('false');
    expect(options[1].getAttribute('aria-selected')).toBe('true');

    fireEvent.keyDown(input, { key: 'Enter' });
    expect(routerState.push).toHaveBeenCalledWith('/experience');
    expect(screen.queryByRole('dialog')).toBeNull();
  });

  it('runs a page action by mouse click', () => {
    render(<CommandPalette />);
    openWithKeyboard();
    fireEvent.click(screen.getByRole('option', { name: /Contact/ }));
    expect(routerState.push).toHaveBeenCalledWith('/contact');
    expect(screen.queryByRole('dialog')).toBeNull();
  });

  it('opens /projects with the chosen category filter', () => {
    render(<CommandPalette />);
    openWithKeyboard();
    fireEvent.click(
      screen.getByRole('option', { name: /Games & Interactive/ })
    );
    expect(routerState.push).toHaveBeenCalledWith({
      pathname: '/projects',
      query: { category: 'games' },
    });
  });

  it('copies the contact email to the clipboard', async () => {
    const writeText = vi.fn(() => Promise.resolve());
    Object.defineProperty(navigator, 'clipboard', {
      configurable: true,
      value: { writeText },
    });

    render(<CommandPalette />);
    openWithKeyboard();
    fireEvent.click(screen.getByRole('option', { name: /Copy contact email/ }));
    expect(writeText).toHaveBeenCalledWith(site.contactEmail);
    expect(screen.queryByRole('dialog')).toBeNull();
  });
});
