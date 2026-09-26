import { useRef } from 'react'
import { motion, useReducedMotion, useScroll, useSpring } from 'framer-motion'
import { experience } from '../../data/resume'
import { Icon } from '../Icon'
import { Reveal } from '../Reveal'
import { SectionHeading } from '../SectionHeading'

export function Experience() {
  const trackRef = useRef<HTMLLIElement>(null)
  const reduced = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: trackRef, offset: ['start 70%', 'end 60%'] })
  const fill = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.4 })

  return (
    <section id="experience" aria-labelledby="experience-title" className="section-pad relative">
      <div className="wrap">
        <SectionHeading id="experience-title" title="Experience">
          A remote web development internship, building two full-stack applications.
        </SectionHeading>

        <ol className="mt-14">
          <li ref={trackRef} className="relative pl-9 md:pl-16">
            {/* Timeline rail: the amber fill follows scroll progress. */}
            <span aria-hidden="true" className="absolute bottom-0 left-[7px] top-3 w-px bg-white/10 md:left-[15px]" />
            <motion.span
              aria-hidden="true"
              style={{ scaleY: reduced ? 1 : fill }}
              className="absolute bottom-0 left-[7px] top-3 w-px origin-top bg-gradient-to-b from-amber via-amber to-teal-glow md:left-[15px]"
            />
            <span
              aria-hidden="true"
              className="node-pulse absolute left-0 top-2 h-[15px] w-[15px] rounded-full bg-amber ring-4 ring-ink md:left-2"
            />

            <Reveal>
              <article className="glass rounded-3xl p-7 md:p-10">
                <header className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
                  <div>
                    <h3 className="display text-4xl text-mist md:text-5xl">{experience.role}</h3>
                    <p className="mt-2 text-lg font-medium text-amber">{experience.company}</p>
                  </div>
                  <ul className="flex flex-wrap gap-2">
                    <li className="chip gap-2">
                      <Icon name="briefcase" size={15} />
                      {experience.mode}
                    </li>
                    <li className="chip gap-2">
                      <Icon name="book" size={15} />
                      {experience.period}
                    </li>
                  </ul>
                </header>

                <h4 className="mt-10 text-sm font-semibold text-muted">What I worked on</h4>
                <div className="mt-4 grid gap-4 md:grid-cols-2">
                  {experience.deliverables.map((item) => (
                    <div key={item.id} className="rounded-2xl border border-white/10 bg-black/20 p-6">
                      <span className="text-amber">
                        <Icon name={item.id === 'ecommerce' ? 'cart' : 'chat'} size={22} />
                      </span>
                      <h5 className="mt-4 text-lg font-semibold text-mist">{item.title}</h5>
                      <p className="mt-1.5 text-muted">{item.description}</p>
                      <ul className="mt-4 flex flex-wrap gap-2">
                        {item.features.map((feature) => (
                          <li key={feature} className="chip">
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </article>
            </Reveal>
          </li>
        </ol>
      </div>
    </section>
  )
}
