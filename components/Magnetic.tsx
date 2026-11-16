import { useRef, type PointerEvent, type ReactNode } from 'react';
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from 'motion/react';

interface MagneticProps {
  children: ReactNode;
  className?: string;
}

/** Maximum magnetic pull, in pixels. */
const MAX_PULL = 4;
/** Fraction of the pointer's offset from center that becomes pull. */
const PULL_STRENGTH = 0.22;

/**
 * Subtle magnetic hover for primary CTAs: the wrapped element drifts a few
 * pixels toward the pointer and springs back on leave. Only responds to
 * fine pointers (mouse/trackpad) on hover-capable devices, and never under
 * prefers-reduced-motion. Renders a plain motion element with the values
 * parked at zero otherwise — no hidden initial state, so the static export
 * is fully visible with or without JavaScript.
 */
function Magnetic({ children, className = '' }: MagneticProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 180, damping: 14, mass: 0.25 });
  const springY = useSpring(y, { stiffness: 180, damping: 14, mass: 0.25 });

  function handlePointerMove(event: PointerEvent<HTMLDivElement>) {
    if (reduceMotion || event.pointerType !== 'mouse') return;
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
      return;
    }
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const offsetX = event.clientX - (rect.left + rect.width / 2);
    const offsetY = event.clientY - (rect.top + rect.height / 2);
    x.set(Math.max(-MAX_PULL, Math.min(MAX_PULL, offsetX * PULL_STRENGTH)));
    y.set(Math.max(-MAX_PULL, Math.min(MAX_PULL, offsetY * PULL_STRENGTH)));
  }

  function handlePointerLeave() {
    x.set(0);
    y.set(0);
  }

  return (
    <motion.div
      ref={ref}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      style={{ x: springX, y: springY }}
      className={`inline-block ${className}`}
    >
      {children}
    </motion.div>
  );
}

export default Magnetic;
