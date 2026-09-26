import type { ReactNode } from 'react'
import { motion, useReducedMotion } from 'framer-motion'

interface RevealProps {
  children: ReactNode
  className?: string
  /** Seconds to wait once the element scrolls into view. */
  delay?: number
  /** Distance the element travels while fading in, in px. */
  distance?: number
}

/**
 * Scroll reveal. Framer Motion's `whileInView` runs on IntersectionObserver,
 * fires once, and renders a plain element when reduced motion is requested.
 */
export function Reveal({ children, className, delay = 0, distance = 18 }: RevealProps) {
  const reduced = useReducedMotion()
  if (reduced) return <div className={className}>{children}</div>

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: distance }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '0px 0px -10% 0px' }}
      transition={{ duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  )
}
