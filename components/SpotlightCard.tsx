import { PointerEvent, ReactNode } from 'react';

interface SpotlightCardProps {
  children: ReactNode;
  className?: string;
}

/**
 * Card wrapper that paints a soft radial glow following the pointer
 * (CSS variables consumed by the `.spotlight` class in globals.css).
 */
function SpotlightCard({ children, className = '' }: SpotlightCardProps) {
  function handlePointerMove(event: PointerEvent<HTMLDivElement>) {
    const rect = event.currentTarget.getBoundingClientRect();
    event.currentTarget.style.setProperty(
      '--spot-x',
      `${event.clientX - rect.left}px`
    );
    event.currentTarget.style.setProperty(
      '--spot-y',
      `${event.clientY - rect.top}px`
    );
  }

  return (
    <div
      onPointerMove={handlePointerMove}
      className={`spotlight ${className}`}
    >
      {children}
    </div>
  );
}

export default SpotlightCard;
