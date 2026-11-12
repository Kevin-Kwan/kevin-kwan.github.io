import { useId } from 'react';

const BARS = [10, 18, 26, 14, 32, 22, 36, 16, 28, 12, 30, 20, 34, 15, 24, 11, 27, 19, 33, 13];

interface WaveformProps {
  className?: string;
  animated?: boolean;
}

/** Decorative audio-waveform motif — a nod to Kevin's voice-AI work. */
function Waveform({ className = '', animated = false }: WaveformProps) {
  const rawId = useId().replace(/[^a-zA-Z0-9]/g, '');
  const gradientId = `wave-gradient-${rawId}`;

  return (
    <svg
      viewBox="0 0 200 40"
      className={className}
      aria-hidden="true"
      focusable="false"
      preserveAspectRatio="none"
    >
      <defs>
        <linearGradient id={gradientId} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#8B5CF6" />
          <stop offset="100%" stopColor="#06B6D4" />
        </linearGradient>
      </defs>
      {BARS.map((height, i) => (
        <rect
          key={i}
          x={i * 10 + 2}
          y={(40 - height) / 2}
          width="5"
          height={height}
          rx="2.5"
          fill={`url(#${gradientId})`}
          opacity={0.45 + (i % 4) * 0.15}
          className={animated ? 'wave-bar' : undefined}
          style={
            animated
              ? {
                  animationDelay: `${i * 0.09}s`,
                  animationDuration: `${1.3 + (i % 5) * 0.17}s`,
                }
              : undefined
          }
        />
      ))}
    </svg>
  );
}

export default Waveform;
