import { Component, lazy, Suspense, useEffect, useState, type ReactNode } from 'react'
import { useCompactViewport, usePrefersReducedMotion } from '../hooks/useMediaQuery'

// The 3D scene (and Three.js with it) is a separate chunk that loads after the page is interactive.
const Scene = lazy(() => import('../scene/Scene'))

function hasWebGL(): boolean {
  try {
    const canvas = document.createElement('canvas')
    const gl = canvas.getContext('webgl2') ?? canvas.getContext('webgl')
    gl?.getExtension('WEBGL_lose_context')?.loseContext()
    return gl !== null
  } catch {
    return false
  }
}

/** If WebGL fails at any point, the page keeps working on the CSS backdrop alone. */
class SceneBoundary extends Component<{ children: ReactNode }, { failed: boolean }> {
  state = { failed: false }
  static getDerivedStateFromError() {
    return { failed: true }
  }
  render() {
    return this.state.failed ? null : this.props.children
  }
}

export function SceneLayer() {
  const compact = useCompactViewport()
  const reduced = usePrefersReducedMotion()
  const [ready, setReady] = useState(false)
  const [supported] = useState(hasWebGL)

  useEffect(() => {
    type IdleWindow = Window & {
      requestIdleCallback?: (cb: () => void, options?: { timeout: number }) => number
      cancelIdleCallback?: (id: number) => void
    }
    const w = window as IdleWindow
    if (w.requestIdleCallback) {
      const id = w.requestIdleCallback(() => setReady(true), { timeout: 1500 })
      return () => w.cancelIdleCallback?.(id)
    }
    const id = window.setTimeout(() => setReady(true), 500)
    return () => window.clearTimeout(id)
  }, [])

  if (!supported || !ready) return null

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10">
      <SceneBoundary>
        <Suspense fallback={null}>
          <Scene compact={compact} frozen={reduced} />
        </Suspense>
      </SceneBoundary>
    </div>
  )
}
