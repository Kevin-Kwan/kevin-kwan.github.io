import { describe, expect, it } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import PipelineDiagram from '../components/PipelineDiagram';

const NODE_LABELS = [
  'Caller',
  'Amazon Connect',
  'AI Voice Agent',
  'Lambda Tools',
  'Resolution',
];

describe('PipelineDiagram', () => {
  it('renders every pipeline node label', () => {
    render(<PipelineDiagram />);
    for (const label of NODE_LABELS) {
      // The selected node's label also appears in the inspector panel
      // header, so labels can legitimately occur more than once.
      expect(screen.getAllByText(label).length).toBeGreaterThan(0);
    }
  });

  it('renders the node sub-labels and the overview caption', () => {
    render(<PipelineDiagram />);
    expect(screen.getByText('System overview')).not.toBeNull();
    expect(screen.getByText('Routing & telephony')).not.toBeNull();
    expect(screen.getByText('Payments & account APIs')).not.toBeNull();
    expect(screen.getByText('Contained or handed off')).not.toBeNull();
  });

  it('inspects the default stage (AI Voice Agent) and swaps on selection', () => {
    render(<PipelineDiagram />);
    // Default panel: the voice agent's highlights.
    expect(
      screen.getByText('Billing conversations at scale')
    ).not.toBeNull();

    fireEvent.click(screen.getByRole('tab', { name: /Lambda Tools/ }));
    expect(
      screen.getByText('End-to-end payments')
    ).not.toBeNull();
    expect(
      screen.queryByText('Billing conversations at scale')
    ).toBeNull();
  });

  it('exposes a tab list with roving tabindex and aria-selected', () => {
    render(<PipelineDiagram />);
    const tabs = screen.getAllByRole('tab');
    expect(tabs).toHaveLength(NODE_LABELS.length);
    // Default selection is AI Voice Agent (index 2).
    expect(tabs[2].getAttribute('aria-selected')).toBe('true');
    expect(tabs[2].getAttribute('tabindex')).toBe('0');
    tabs.forEach((tab, i) => {
      if (i === 2) return;
      expect(tab.getAttribute('aria-selected')).toBe('false');
      expect(tab.getAttribute('tabindex')).toBe('-1');
    });
    const panel = screen.getByRole('tabpanel');
    expect(panel.getAttribute('aria-labelledby')).toBe('pipeline-tab-2');
  });

  it('moves selection with arrow keys and Home/End (automatic activation)', () => {
    render(<PipelineDiagram />);
    const tablist = screen.getByRole('tablist');
    expect(tablist.getAttribute('aria-orientation')).toBe('horizontal');

    fireEvent.keyDown(tablist, { key: 'ArrowDown' });
    expect(
      screen.getByText('Billing conversations at scale')
    ).not.toBeNull();

    fireEvent.keyDown(tablist, { key: 'ArrowRight' });
    expect(
      screen.getByText('End-to-end payments')
    ).not.toBeNull();
    expect(document.activeElement).toBe(
      screen.getByRole('tab', { name: /Lambda Tools/ })
    );

    fireEvent.keyDown(tablist, { key: 'ArrowLeft' });
    expect(
      screen.getByText('Billing conversations at scale')
    ).not.toBeNull();

    fireEvent.keyDown(tablist, { key: 'End' });
    expect(
      screen.getByText('Production billing bugs fixed at the root cause')
    ).not.toBeNull();

    fireEvent.keyDown(tablist, { key: 'Home' });
    expect(
      screen.getByText('Billing calls at scale')
    ).not.toBeNull();
  });

  it('uses vertical orientation and up/down keys in the stacked layout', () => {
    const originalMatchMedia = window.matchMedia;
    const verticalMatchMedia = (query: string): MediaQueryList => ({
      matches:
        query === '(max-width: 1023.98px)' || query.includes('no-preference'),
      media: query,
      onchange: null,
      addListener: () => {},
      removeListener: () => {},
      addEventListener: () => {},
      removeEventListener: () => {},
      dispatchEvent: () => false,
    });
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: verticalMatchMedia,
    });

    try {
      render(<PipelineDiagram />);
      const tablist = screen.getByRole('tablist');
      expect(tablist.getAttribute('aria-orientation')).toBe('vertical');

      fireEvent.keyDown(tablist, { key: 'ArrowRight' });
      expect(
        screen.getByText('Billing conversations at scale')
      ).not.toBeNull();

      fireEvent.keyDown(tablist, { key: 'ArrowDown' });
      expect(
        screen.getByText('End-to-end payments')
      ).not.toBeNull();

      fireEvent.keyDown(tablist, { key: 'ArrowUp' });
      expect(
        screen.getByText('Billing conversations at scale')
      ).not.toBeNull();
    } finally {
      Object.defineProperty(window, 'matchMedia', {
        writable: true,
        value: originalMatchMedia,
      });
    }
  });
});
