import { motion } from 'motion/react';
import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  type ReactNode,
  type Ref,
} from 'react';
import { useMounted } from './useMounted';

type RevealElement = 'div' | 'li';

interface RevealProps {
  children: ReactNode;
  className?: string;
  /** Stagger delay in milliseconds (below-fold entrances only). */
  delay?: number;
  /** Element to render; use 'li' inside lists so list semantics stay valid. */
  as?: RevealElement;
}

const MOTION_TAGS = {
  div: motion.div,
  li: motion.li,
} as const;

// Layout effects must not run (or warn) during server rendering.
const useIsomorphicLayoutEffect =
  typeof window !== 'undefined' ? useLayoutEffect : useEffect;

type Placement = 'pending' | 'inview' | 'below';

/**
 * Fades content up the first time it scrolls into view — but only for
 * content that starts below the fold. Elements already inside the viewport
 * when the component mounts render at full opacity immediately, so a fresh
 * page load never shows a dim/ghosted first glance.
 *
 * Progressive enhancement happens in three steps, all before first paint:
 * (1) until hydration, a plain fully visible element is rendered (this is
 * also the no-JavaScript output — motion would server-render its hidden
 * initial styles inline); (2) once mounted, the plain element is measured
 * in a layout effect; (3) it swaps to the motion element — with
 * `initial={false}` when it was already in view (no animation at all), or
 * the hidden initial state + whileInView when it was below the fold.
 * Animation honors prefers-reduced-motion via MotionConfig in _app.
 */
function Reveal({
  children,
  className = '',
  delay = 0,
  as = 'div',
}: RevealProps) {
  const mounted = useMounted();
  const elementRef = useRef<HTMLElement | null>(null);
  const [placement, setPlacement] = useState<Placement>('pending');

  const setElementRef = useCallback((node: HTMLElement | null) => {
    elementRef.current = node;
  }, []);

  useIsomorphicLayoutEffect(() => {
    if (!mounted || placement !== 'pending') return;
    const el = elementRef.current;
    if (!el) {
      setPlacement('inview');
      return;
    }
    const rect = el.getBoundingClientRect();
    const inView = rect.bottom > 0 && rect.top < window.innerHeight;
    setPlacement(inView ? 'inview' : 'below');
  }, [mounted, placement]);

  if (!mounted || placement === 'pending') {
    const PlainTag = as;
    return (
      <PlainTag
        ref={setElementRef as Ref<never>}
        className={className}
      >
        {children}
      </PlainTag>
    );
  }

  const MotionTag = MOTION_TAGS[as] as typeof motion.div;
  return (
    <MotionTag
      className={className}
      initial={
        placement === 'below' ? { opacity: 0, y: 10 } : false
      }
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.45, delay: delay / 1000, ease: 'easeOut' }}
    >
      {children}
    </MotionTag>
  );
}

export default Reveal;
