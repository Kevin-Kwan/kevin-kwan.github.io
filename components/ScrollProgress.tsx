import { motion, useScroll, useSpring } from 'motion/react';

/**
 * Two-pixel gradient progress bar pinned to the bottom edge of the sticky
 * navbar; scaleX tracks page scroll (spring-smoothed). Purely decorative —
 * the information it conveys is also available from the scrollbar itself.
 * Under prefers-reduced-motion MotionConfig disables transform animations,
 * and the spring simply settles at the live scroll fraction.
 */
function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 28,
    mass: 0.4,
  });

  return (
    <motion.div
      aria-hidden="true"
      style={{ scaleX }}
      className="pointer-events-none absolute inset-x-0 bottom-0 h-[2px] origin-left bg-gradient-to-r from-violet-500 to-cyan-500"
    />
  );
}

export default ScrollProgress;
