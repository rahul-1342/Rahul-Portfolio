import type { CSSProperties } from 'react'

/** Inline style that also accepts CSS custom properties such as `--dur`. */
export type CSSVars = CSSProperties & Record<`--${string}`, string | number>
export const EASE = [0.16, 1, 0.3, 1] as const
