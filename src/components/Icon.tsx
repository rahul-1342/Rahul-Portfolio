import type { SVGProps } from 'react'

/** Small stroke icon set. Paths are drawn on a 24x24 grid. */
const paths = {
  download: 'M12 3v12m0 0-4-4m4 4 4-4M4 20h16',
  mail: 'M5 5h14a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2z M3 7l9 6 9-6',
  phone:
    'M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2z',
  linkedin: 'M4 4h4v16H4z M6 2v.01 M10 9h4v1.5c1-1.5 2.5-1.8 4-1.5 2 .4 2 2.5 2 4.5V20h-4v-6c0-1.5-.6-2-1.7-2S14 12.6 14 14v6h-4z',
  github:
    'M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22',
  pin: 'M12 21s-7-6.2-7-11a7 7 0 0 1 14 0c0 4.8-7 11-7 11z M12 10m-2.5 0a2.5 2.5 0 1 0 5 0a2.5 2.5 0 1 0-5 0',
  cap: 'M22 10 12 5 2 10l10 5 10-5z M6 12v5c3 2.5 9 2.5 12 0v-5',
  award: 'M12 9m-6 0a6 6 0 1 0 12 0a6 6 0 1 0-12 0 M8.5 14 7 22l5-3 5 3-1.5-8',
  code: 'm8 7-5 5 5 5m8-10 5 5-5 5',
  trend: 'M3 17l6-6 4 4 8-8 M15 7h6v6',
  users:
    'M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2 M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8z M22 21v-2a4 4 0 0 0-3-3.87 M16 3.13a4 4 0 0 1 0 7.75',
  book: 'M4 5a2 2 0 0 1 2-2h13v16H6a2 2 0 0 0-2 2V5z M4 19a2 2 0 0 1 2-2h13',
  heart: 'M12 21s-8-5.2-8-11a4.5 4.5 0 0 1 8-2.8A4.5 4.5 0 0 1 20 10c0 5.8-8 11-8 11z',
  home: 'M3 11l9-8 9 8 M5 10v10h5v-6h4v6h5V10',
  cart: 'M3 4h2l2.4 11h10.2L20 7H6.2 M9 20.5a.5.5 0 1 0 0-.01 M17 20.5a.5.5 0 1 0 0-.01',
  chat: 'M21 12a8 8 0 0 1-11.7 7.1L3 20l1.1-4.9A8 8 0 1 1 21 12z',
  external: 'M14 4h6v6 M20 4 10 14 M18 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h5',
  chevron: 'm6 9 6 6 6-6',
  check: 'm5 12 5 5L20 7',
  database:
    'M4 6c0-1.7 3.6-3 8-3s8 1.3 8 3-3.6 3-8 3-8-1.3-8-3z M4 6v6c0 1.7 3.6 3 8 3s8-1.3 8-3V6 M4 12v6c0 1.7 3.6 3 8 3s8-1.3 8-3v-6',
  terminal: 'm4 17 6-6-6-6 M12 19h8',
  briefcase: 'M3 8h18v12H3z M8 8V5a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1v3 M3 13h18',
  compass: 'M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0-18 0 M15.5 8.5 13.5 13.5 8.5 15.5 10.5 10.5z',
} as const

export type IconName = keyof typeof paths

interface IconProps extends Omit<SVGProps<SVGSVGElement>, 'name'> {
  name: IconName
  size?: number
}

export function Icon({ name, size = 20, ...rest }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.6}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      {...rest}
    >
      <path d={paths[name]} />
    </svg>
  )
}
