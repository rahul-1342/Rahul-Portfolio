import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { introWillPlay, markIntroSeen } from '../lib/intro'

/** Page-load curtain: the monogram fades in, a fine line draws, then the curtain lifts off the hero. */
export function Intro() {
  const [visible, setVisible] = useState(introWillPlay)

  useEffect(() => {
    if (!introWillPlay) return
    markIntroSeen()
    const id = window.setTimeout(() => setVisible(false), 1150)
    return () => window.clearTimeout(id)
  }, [])

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          aria-hidden="true"
          className="fixed inset-0 z-[100] grid place-items-center bg-ink"
          initial={{ clipPath: 'inset(0% 0% 0% 0%)' }}
          exit={{ clipPath: 'inset(0% 0% 100% 0%)' }}
          transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
        >
          <div className="flex flex-col items-center gap-5">
            <motion.span
              className="display text-[clamp(3.5rem,12vw,6rem)] text-mist"
              initial={{ opacity: 0, y: 12, filter: 'blur(8px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            >
              RG
            </motion.span>
            <motion.span
              className="hairline block w-40 origin-center"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
