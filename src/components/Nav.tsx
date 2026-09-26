import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { navItems, profile } from '../data/resume'
import { useScrollSpy } from '../hooks/useScrollSpy'

const SPY_IDS = [...navItems.map((item) => item.id), 'certifications']
const SPY_ALIAS = { certifications: 'education' }

export function Nav() {
  const active = useScrollSpy(SPY_IDS, SPY_ALIAS)
  const [open, setOpen] = useState(false)
  const headerRef = useRef<HTMLElement>(null)
  const buttonRef = useRef<HTMLButtonElement>(null)

  // Mobile menu: lock page scroll, move focus in, keep Tab inside, close on Escape.
  useEffect(() => {
    if (!open) return
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    headerRef.current?.querySelector<HTMLElement>('[data-menu-link]')?.focus()

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpen(false)
        buttonRef.current?.focus()
        return
      }
      if (e.key !== 'Tab' || !headerRef.current) return
      const focusable = Array.from(headerRef.current.querySelectorAll<HTMLElement>('a[href], button')).filter(
        (el) => el.offsetParent !== null,
      )
      const first = focusable[0]
      const last = focusable[focusable.length - 1]
      if (!first || !last) return
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault()
        last.focus()
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault()
        first.focus()
      }
    }

    document.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = previousOverflow
      document.removeEventListener('keydown', onKey)
    }
  }, [open])

  return (
    <header ref={headerRef} className="fixed inset-x-0 top-3 z-50 flex justify-center px-3 md:top-5">
      {/* Desktop: floating pill */}
      <nav aria-label="Primary" className="glass hidden rounded-full p-1.5 md:flex">
        <ul className="flex items-center gap-0.5">
          {navItems.map((item) => {
            const isActive = active === item.id
            return (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  aria-current={isActive ? 'location' : undefined}
                  className="relative block rounded-full px-4 py-2 text-sm font-medium text-muted transition-colors hover:text-mist aria-[current=location]:text-mist"
                >
                  {isActive && (
                    <motion.span
                      layoutId="nav-active"
                      className="absolute inset-0 rounded-full bg-white/10 ring-1 ring-inset ring-white/10"
                      transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                    />
                  )}
                  <span className="relative">{item.label}</span>
                </a>
              </li>
            )
          })}
        </ul>
      </nav>

      {/* Mobile: compact bar with hamburger */}
      <div className="glass flex w-full max-w-md items-center justify-between rounded-full py-1.5 pl-5 pr-1.5 md:hidden">
        <a href="#home" className="display text-2xl leading-none text-mist" onClick={() => setOpen(false)}>
          {profile.name}
        </a>
        <button
          ref={buttonRef}
          type="button"
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen((v) => !v)}
          className="grid h-11 w-11 place-items-center rounded-full bg-white/5"
        >
          <span className="relative block h-3 w-5" aria-hidden="true">
            <span
              className={`absolute left-0 h-px w-5 bg-mist transition-all duration-300 ${open ? 'top-1.5 rotate-45' : 'top-0'}`}
            />
            <span
              className={`absolute left-0 h-px w-5 bg-mist transition-all duration-300 ${open ? 'top-1.5 -rotate-45' : 'top-3'}`}
            />
          </span>
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            className="fixed inset-0 -z-10 bg-ink/90 backdrop-blur-xl md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            <nav aria-label="Mobile" className="flex h-full flex-col justify-center px-8 pt-16">
              <ul className="flex flex-col gap-1">
                {navItems.map((item, i) => (
                  <motion.li
                    key={item.id}
                    initial={{ opacity: 0, y: 14 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.05 + i * 0.04, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <a
                      href={`#${item.id}`}
                      data-menu-link
                      aria-current={active === item.id ? 'location' : undefined}
                      onClick={() => setOpen(false)}
                      className="display block py-1.5 text-[2.75rem] leading-tight text-mist/80 aria-[current=location]:text-amber"
                    >
                      {item.label}
                    </a>
                  </motion.li>
                ))}
              </ul>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
