import { useEffect, useState } from 'react'

/** Subscribes to a CSS media query. */
export function useMediaQuery(query: string, initial = false): boolean {
  const [matches, setMatches] = useState(() =>
    typeof window === 'undefined' ? initial : window.matchMedia(query).matches,
  )

  useEffect(() => {
    const mql = window.matchMedia(query)
    const onChange = () => setMatches(mql.matches)
    onChange()
    mql.addEventListener('change', onChange)
    return () => mql.removeEventListener('change', onChange)
  }, [query])

  return matches
}

/** True when the visitor has a mouse or trackpad (hover-capable, precise pointer). */
export function useFinePointer(): boolean {
  return useMediaQuery('(hover: hover) and (pointer: fine)')
}

/** True on phones and small tablets, where the 3D scene is simplified. */
export function useCompactViewport(): boolean {
  return useMediaQuery('(max-width: 767px), (pointer: coarse)')
}

/** True when the visitor asked their system for reduced motion. */
export function usePrefersReducedMotion(): boolean {
  return useMediaQuery('(prefers-reduced-motion: reduce)')
}
