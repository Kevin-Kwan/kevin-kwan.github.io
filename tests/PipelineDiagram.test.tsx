import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
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
      expect(screen.getByText(label)).not.toBeNull();
    }
  });

  it('renders the node sub-labels and the overview caption', () => {
    render(<PipelineDiagram />);
    expect(screen.getByText('System overview')).not.toBeNull();
    expect(screen.getByText('Routing & telephony')).not.toBeNull();
    expect(screen.getByText('Payments & account APIs')).not.toBeNull();
    expect(screen.getByText('Contained or handed off')).not.toBeNull();
  });
});
