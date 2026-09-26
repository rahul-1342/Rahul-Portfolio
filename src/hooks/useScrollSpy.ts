import { useEffect, useState } from 'react'

/**
 * Tracks which section sits under the middle of the viewport, using IntersectionObserver.
 * `alias` lets one section report as another id (certifications count as "education").
 */
export function useScrollSpy(ids: readonly string[], alias: Record<string, string> = {}): string {
  const [active, setActive] = useState(ids[0] ?? '')
  const key = ids.join('|')

  useEffect(() => {
    const elements = key
      .split('|')
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null)

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(alias[entry.target.id] ?? entry.target.id)
        }
      },
      { rootMargin: '-45% 0px -50% 0px', threshold: 0 },
    )

    elements.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
    // `alias` is a constant object at every call site.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key])

  return active
}
