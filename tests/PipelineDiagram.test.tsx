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
    // Default panel: the voice agent's production figures.
    expect(
      screen.getByText('436,112 conversations (May–Oct 2026)')
    ).not.toBeNull();

    fireEvent.click(
      screen.getByRole('button', { name: 'Inspect stage: Lambda Tools' })
    );
    expect(
      screen.getByText('22,600+ payments at 92–95% authorization success')
    ).not.toBeNull();
    expect(
      screen.queryByText('436,112 conversations (May–Oct 2026)')
    ).toBeNull();
  });
});
