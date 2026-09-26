import { useEffect, useRef, useState } from 'react'
import { contact, profile } from '../../data/resume'
import { Icon, type IconName } from '../Icon'
import { Magnetic } from '../Magnetic'
import { Reveal } from '../Reveal'

interface Row {
  icon: IconName
  label: string
  value: string
  href: string
  external?: boolean
}

const rows: Row[] = [
  { icon: 'mail', label: 'Email', value: contact.email, href: `mailto:${contact.email}` },
  { icon: 'phone', label: 'Phone', value: contact.phone, href: contact.phoneHref },
  { icon: 'linkedin', label: 'LinkedIn', value: contact.linkedin.label, href: contact.linkedin.href, external: true },
  { icon: 'github', label: 'GitHub', value: contact.github.label, href: contact.github.href, external: true },
]

export function Contact() {
  const [copied, setCopied] = useState(false)
  const timer = useRef<number>(0)

  useEffect(() => () => window.clearTimeout(timer.current), [])

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(contact.email)
      setCopied(true)
      window.clearTimeout(timer.current)
      timer.current = window.setTimeout(() => setCopied(false), 2200)
    } catch {
      /* Clipboard can be unavailable (insecure context); the address is still shown and linked. */
    }
  }

  return (
    <section id="contact" aria-labelledby="contact-title" className="section-pad relative">
      <div className="wrap grid gap-14 md:grid-cols-[1fr_1fr] md:items-center">
        <Reveal>
          <h2 id="contact-title" className="display text-[clamp(3rem,8vw,6rem)] text-mist">
            Let&rsquo;s build something meaningful.
          </h2>
          <p className="mt-6 max-w-[42ch] text-lg text-muted">
            I am a junior developer eager to grow in software development. Send me a message, or take my resume with you.
          </p>
          <div className="mt-9 flex flex-wrap items-center gap-4">
            <Magnetic>
              <a href={`mailto:${contact.email}`} className="btn btn-primary">
                <Icon name="mail" size={18} />
                Email me
              </a>
            </Magnetic>
            <Magnetic>
              <a href={profile.resumeUrl} download={profile.resumeFileName} className="btn btn-ghost">
                <Icon name="download" size={18} />
                Download Resume
              </a>
            </Magnetic>
          </div>
        </Reveal>

        <Reveal delay={0.12}>
          <div className="glass rounded-3xl p-3 md:p-4">
            <ul>
              {rows.map((row) => (
                <li key={row.label}>
                  <a
                    href={row.href}
                    {...(row.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                    className="group flex items-center gap-4 rounded-2xl px-4 py-4 transition-colors hover:bg-white/[0.05] md:px-5"
                  >
                    <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-amber/10 text-amber ring-1 ring-inset ring-amber/25">
                      <Icon name={row.icon} />
                    </span>
                    <span className="min-w-0">
                      <span className="block text-sm text-muted">{row.label}</span>
                      <span className="block break-words font-medium text-mist group-hover:text-amber">{row.value}</span>
                      {row.external && <span className="sr-only"> (opens in a new tab)</span>}
                    </span>
                  </a>
                </li>
              ))}
              <li className="flex items-center gap-4 px-4 py-4 md:px-5">
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-white/5 text-muted ring-1 ring-inset ring-white/10">
                  <Icon name="pin" />
                </span>
                <span>
                  <span className="block text-sm text-muted">Location</span>
                  <span className="block font-medium text-mist">{contact.location}</span>
                </span>
              </li>
            </ul>
            <div className="mt-2 flex items-center justify-between gap-3 border-t border-white/10 px-4 pb-1 pt-4 md:px-5">
              <button
                type="button"
                onClick={copyEmail}
                className="text-sm font-semibold text-mist transition-colors hover:text-amber"
              >
                Copy email address
              </button>
              <span role="status" aria-live="polite" className="text-sm text-amber">
                {copied ? 'Copied' : ''}
              </span>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
