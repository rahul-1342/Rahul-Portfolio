import { useRef, type PointerEvent, type ReactNode } from 'react'
import { useReducedMotion } from 'framer-motion'
import { useFinePointer } from '../hooks/useMediaQuery'

interface TiltCardProps {
  children: ReactNode
  className?: string
  /** Maximum tilt in degrees. */
  max?: number
}

/**
 * Pointer-driven 3D tilt with a soft light sheen.
 * Writes CSS variables directly (no React re-renders while the pointer moves)
 * and turns itself off for touch devices and reduced-motion visitors.
 */
export function TiltCard({ children, className = '', max = 5 }: TiltCardProps) {
  const ref = useRef<HTMLDivElement>(null)
  const finePointer = useFinePointer()
  const reduced = useReducedMotion()

  if (!finePointer || reduced) return <div className={className}>{children}</div>

  const onMove = (e: PointerEvent<HTMLDivElement>) => {
    const el = ref.current
    if (!el) return
    const r = el.getBoundingClientRect()
    const px = (e.clientX - r.left) / r.width
    const py = (e.clientY - r.top) / r.height
    el.style.setProperty('--ry', `${(px - 0.5) * max * 2}deg`)
    el.style.setProperty('--rx', `${(0.5 - py) * max * 2}deg`)
    el.style.setProperty('--mx', `${px * 100}%`)
    el.style.setProperty('--my', `${py * 100}%`)
  }

  const onEnter = () => {
    const el = ref.current
    if (!el) return
    el.dataset.active = 'true'
    el.style.setProperty('--glare', '1')
  }

  const onLeave = () => {
    const el = ref.current
    if (!el) return
    delete el.dataset.active
    el.style.setProperty('--rx', '0deg')
    el.style.setProperty('--ry', '0deg')
    el.style.setProperty('--glare', '0')
  }

  return (
    <div
      ref={ref}
      className={`tilt ${className}`}
      onPointerMove={onMove}
      onPointerEnter={onEnter}
      onPointerLeave={onLeave}
    >
      {children}
    </div>
  )
}
