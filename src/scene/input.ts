/**
 * Shared, mutable input for the 3D scene.
 * Plain module state (not React state) so scroll and pointer updates never trigger re-renders;
 * the render loop just reads these numbers every frame.
 */
export const input = {
  /** Page scroll progress, 0 (top) to 1 (bottom). */
  scroll: 0,
  /** Pointer position, -1 to 1 on each axis (y up). */
  px: 0,
  py: 0,
}

/** Starts listening for scroll (and optionally pointer) input. Returns a cleanup function. */
export function attachInput(withPointer: boolean): () => void {
  const readScroll = () => {
    const max = document.documentElement.scrollHeight - window.innerHeight
    input.scroll = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0
  }

  const onPointer = (e: PointerEvent) => {
    input.px = (e.clientX / window.innerWidth) * 2 - 1
    input.py = -((e.clientY / window.innerHeight) * 2 - 1)
  }

  readScroll()
  window.addEventListener('scroll', readScroll, { passive: true })
  window.addEventListener('resize', readScroll, { passive: true })
  if (withPointer) window.addEventListener('pointermove', onPointer, { passive: true })

  // Page height changes as fonts and images settle, so re-read progress when it does.
  const resizeObserver = new ResizeObserver(readScroll)
  resizeObserver.observe(document.body)

  return () => {
    window.removeEventListener('scroll', readScroll)
    window.removeEventListener('resize', readScroll)
    window.removeEventListener('pointermove', onPointer)
    resizeObserver.disconnect()
  }
}
