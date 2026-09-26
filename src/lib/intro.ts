const KEY = 'rg-intro-seen'

function decide(): boolean {
  if (typeof window === 'undefined') return false
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return false
  try {
    return sessionStorage.getItem(KEY) === null
  } catch {
    return true
  }
}

/** The load animation plays once per browser session, and never for reduced-motion visitors. */
export const introWillPlay = decide()

export function markIntroSeen(): void {
  try {
    sessionStorage.setItem(KEY, '1')
  } catch {
    /* Storage can be blocked; the intro then simply plays again next time. */
  }
}

/** Seconds the hero waits before its entrance, so it lands as the load curtain lifts. */
export const heroDelay = introWillPlay ? 1.05 : 0.05
