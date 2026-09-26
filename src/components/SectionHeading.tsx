import type { ReactNode } from 'react'
import { Reveal } from './Reveal'

interface SectionHeadingProps {
  id: string
  title: string
  children?: ReactNode
}

export function SectionHeading({ id, title, children }: SectionHeadingProps) {
  return (
    <Reveal className="max-w-2xl">
      <h2 id={id} className="display text-[clamp(2.75rem,7vw,5rem)] text-mist">
        {title}
      </h2>
      {children ? <p className="mt-5 max-w-[52ch] text-lg text-muted">{children}</p> : null}
    </Reveal>
  )
}
