import { useRef, type PointerEvent, type ReactNode } from 'react'
import { motion, useMotionValue, useReducedMotion, useSpring } from 'framer-motion'
import { useFinePointer } from '../hooks/useMediaQuery'

interface MagneticProps {
  children: ReactNode
  /** How far the wrapper follows the pointer, as a fraction of the offset. */
  strength?: number
  className?: string
}

/** Wraps a button or link so it drifts gently toward the cursor. Inert on touch and reduced motion. */
export function Magnetic({ children, strength = 0.28, className = '' }: MagneticProps) {
  const ref = useRef<HTMLDivElement>(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const sx = useSpring(x, { stiffness: 220, damping: 16, mass: 0.4 })
  const sy = useSpring(y, { stiffness: 220, damping: 16, mass: 0.4 })
  const finePointer = useFinePointer()
  const reduced = useReducedMotion()

  if (!finePointer || reduced) return <div className={`inline-block ${className}`}>{children}</div>

  const onMove = (e: PointerEvent<HTMLDivElement>) => {
    const r = ref.current?.getBoundingClientRect()
    if (!r) return
    x.set((e.clientX - (r.left + r.width / 2)) * strength)
    y.set((e.clientY - (r.top + r.height / 2)) * strength)
  }
  const onLeave = () => {
    x.set(0)
    y.set(0)
  }

  return (
    <motion.div
      ref={ref}
      style={{ x: sx, y: sy }}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      className={`inline-block ${className}`}
    >
      {children}
    </motion.div>
  )
}
