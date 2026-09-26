import { useId, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { experience, projects, type Project, type ProjectIcon } from '../../data/resume'
import { Icon, type IconName } from '../Icon'
import { Reveal } from '../Reveal'
import { SectionHeading } from '../SectionHeading'
import { TiltCard } from '../TiltCard'

const iconFor: Record<ProjectIcon, IconName> = {
  family: 'heart',
  home: 'home',
  cart: 'cart',
  chat: 'chat',
}

/** The resume has no screenshots, so each card gets an abstract glass-plane preview instead of a fake one. */
function ProjectArt({ icon, index }: { icon: ProjectIcon; index: number }) {
  const flip = index % 2 === 1
  return (
    <div
      aria-hidden="true"
      className="relative aspect-[16/9] overflow-hidden rounded-2xl border border-white/10"
      style={{
        background: flip
          ? 'radial-gradient(120% 120% at 100% 0%, rgb(60 196 184 / 0.35), transparent 55%), radial-gradient(90% 90% at 0% 100%, rgb(242 180 94 / 0.22), transparent 60%), #10141b'
          : 'radial-gradient(120% 120% at 0% 0%, rgb(242 180 94 / 0.32), transparent 55%), radial-gradient(90% 90% at 100% 100%, rgb(60 196 184 / 0.26), transparent 60%), #10141b',
      }}
    >
      <div
        className="absolute inset-0 opacity-40"
        style={{
          backgroundImage:
            'linear-gradient(rgb(255 255 255 / 0.08) 1px, transparent 1px), linear-gradient(90deg, rgb(255 255 255 / 0.08) 1px, transparent 1px)',
          backgroundSize: '32px 32px',
          maskImage: 'radial-gradient(70% 70% at 50% 50%, #000, transparent)',
          WebkitMaskImage: 'radial-gradient(70% 70% at 50% 50%, #000, transparent)',
        }}
      />
      {/* Parallax planes: they slide against the pointer, which the tilting card exposes as --mx / --my. */}
      <div
        className="absolute left-[10%] top-[16%] h-[56%] w-[46%] rounded-2xl border border-white/15 bg-white/[0.06]"
        style={{ transform: 'translate(calc((var(--mx, 50%) - 50%) * -0.16), calc((var(--my, 50%) - 50%) * -0.16))' }}
      />
      <div
        className="absolute bottom-[14%] right-[10%] h-[48%] w-[42%] rounded-2xl border border-white/15 bg-white/[0.08] backdrop-blur-sm"
        style={{ transform: 'translate(calc((var(--mx, 50%) - 50%) * 0.22), calc((var(--my, 50%) - 50%) * 0.22))' }}
      />
      <div
        className="absolute left-1/2 top-1/2 grid h-16 w-16 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-2xl border border-amber/40 bg-ink/70 text-amber shadow-[0_0_50px_-6px_rgb(242_180_94/0.6)]"
        style={{ transform: 'translate(-50%, -50%) translate(calc((var(--mx, 50%) - 50%) * 0.1), calc((var(--my, 50%) - 50%) * 0.1))' }}
      >
        <Icon name={iconFor[icon]} size={28} />
      </div>
    </div>
  )
}

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const [open, setOpen] = useState(false)
  const uid = useId()
  const titleId = `${uid}-title`
  const panelId = `${uid}-details`
  const chips = project.tools.length > 0 ? project.tools : project.features
  const isInternship = project.origin === 'internship'

  return (
    <Reveal delay={(index % 2) * 0.1}>
      <TiltCard className="glass rounded-[1.75rem] p-4 md:p-5" max={4}>
        <article aria-labelledby={titleId}>
          <ProjectArt icon={project.icon} index={index} />

          <div className="px-2 pb-2 pt-6 md:px-3">
            <div className="flex flex-wrap items-center gap-2">
              <span className="chip">{project.period}</span>
              {project.duration && <span className="chip">{project.duration}</span>}
            </div>

            <h3 id={titleId} className="display mt-4 text-[2rem] leading-[1.05] text-mist md:text-4xl">
              {project.name}
            </h3>
            {isInternship && (
              <p className="mt-2 flex items-center gap-2 text-sm text-amber">
                <Icon name="briefcase" size={15} />
                Built during my internship at {experience.company}
              </p>
            )}
            <p className="mt-3 text-muted">{project.summary}</p>

            <ul className="mt-5 flex flex-wrap gap-2" aria-label={project.tools.length > 0 ? 'Tools and technologies' : 'Features'}>
              {chips.map((chip) => (
                <li key={chip} className="chip">
                  {chip}
                </li>
              ))}
            </ul>

            <button
              type="button"
              aria-expanded={open}
              aria-controls={panelId}
              onClick={() => setOpen((v) => !v)}
              className="mt-6 inline-flex items-center gap-2 rounded-full py-1 text-sm font-semibold text-mist transition-colors hover:text-amber"
            >
              {open ? 'Hide details' : 'Show details'}
              <span className={`transition-transform duration-300 ${open ? 'rotate-180' : ''}`}>
                <Icon name="chevron" size={18} />
              </span>
            </button>

            <AnimatePresence initial={false}>
              {open && (
                <motion.div
                  id={panelId}
                  role="region"
                  aria-labelledby={titleId}
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                  className="overflow-hidden"
                >
                  <div className="mt-5 space-y-6 border-t border-white/10 pt-6">
                    <div>
                      <h4 className="text-sm font-semibold text-muted">Objective</h4>
                      <p className="mt-2 text-mist/90">{project.objective}</p>
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-muted">My contribution</h4>
                      <ul className="mt-2 space-y-2">
                        {project.contribution.map((line) => (
                          <li key={line} className="flex gap-3 text-mist/90">
                            <span className="mt-1 text-amber">
                              <Icon name="check" size={16} />
                            </span>
                            {line}
                          </li>
                        ))}
                      </ul>
                    </div>
                    {project.achievements.length > 0 && (
                      <div>
                        <h4 className="text-sm font-semibold text-muted">Achievements</h4>
                        <ul className="mt-2 space-y-2">
                          {project.achievements.map((line) => (
                            <li key={line} className="flex gap-3 text-mist/90">
                              <span className="mt-1 text-amber">
                                <Icon name="trend" size={16} />
                              </span>
                              {line}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </article>
      </TiltCard>
    </Reveal>
  )
}

export function Projects() {
  const standalone = projects.filter((p) => p.origin === 'standalone')
  const internship = projects.filter((p) => p.origin === 'internship')

  return (
    <section id="projects" aria-labelledby="projects-title" className="section-pad relative">
      <div className="wrap">
        <SectionHeading id="projects-title" title="Projects">
          Two standalone projects, from Java and MySQL to Android and Firebase, and the two applications I built during my
          internship.
        </SectionHeading>

        <ul className="mt-14 grid items-start gap-6 md:grid-cols-2">
          {standalone.map((project, i) => (
            <li key={project.id}>
              <ProjectCard project={project} index={i} />
            </li>
          ))}
        </ul>

        <h3 className="mt-16 text-lg font-semibold text-mist">From the {experience.company} internship</h3>
        <ul className="mt-6 grid items-start gap-6 md:grid-cols-2">
          {internship.map((project, i) => (
            <li key={project.id}>
              <ProjectCard project={project} index={i + standalone.length} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
