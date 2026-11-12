import { motion } from 'motion/react';
import type { ReactNode } from 'react';
import { useMounted } from './useMounted';

type RevealElement = 'div' | 'li';

interface RevealProps {
  children: ReactNode;
  className?: string;
  /** Stagger delay in milliseconds. */
  delay?: number;
  /** Element to render; use 'li' inside lists so list semantics stay valid. */
  as?: RevealElement;
}

const MOTION_TAGS = {
  div: motion.div,
  li: motion.li,
} as const;

/**
 * Fades content up the first time it scrolls into view (motion whileInView,
 * one-shot). Progressive enhancement: until the component mounts on the
 * client it renders a plain, fully visible element — motion server-renders
 * its initial (hidden) styles inline, which would leave the statically
 * exported HTML invisible when JavaScript is unavailable. Animation honors
 * prefers-reduced-motion via MotionConfig in pages/_app.tsx.
 */
function Reveal({
  children,
  className = '',
  delay = 0,
  as = 'div',
}: RevealProps) {
  const mounted = useMounted();

  if (!mounted) {
    const PlainTag = as;
    return <PlainTag className={className}>{children}</PlainTag>;
  }

  const MotionTag = MOTION_TAGS[as] as typeof motion.div;
  return (
    <MotionTag
      className={className}
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.45, delay: delay / 1000, ease: 'easeOut' }}
    >
      {children}
    </MotionTag>
  );
}

export default Reveal;
