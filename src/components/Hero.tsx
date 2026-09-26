import { motion } from 'framer-motion'
import { education, experience, profile } from '../data/resume'
import { heroDelay } from '../lib/intro'
import { EASE, type CSSVars } from '../lib/css'
import { Icon, type IconName } from './Icon'
import { Magnetic } from './Magnetic'
import { TiltCard } from './TiltCard'

const facts: Array<{ icon: IconName; label: string; value: string }> = [
  { icon: 'pin', label: 'Based in', value: profile.location },
  { icon: 'cap', label: 'Education', value: `${education[0].degree}, ${education[0].institution}` },
  { icon: 'briefcase', label: 'Latest role', value: `${experience.role}, ${experience.company}` },
]

export function Hero() {
  const d = heroDelay

  return (
    <section id="home" aria-labelledby="hero-title" className="relative flex min-h-[100svh] items-center pb-16 pt-28 md:pt-24">
      <div className="wrap grid items-center gap-12 md:grid-cols-[1.08fr_0.92fr] md:gap-8">
        {/* Portrait first on small screens, second on wide ones. */}
        <div className="order-1 md:order-2">
          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.1, delay: d + 0.1, ease: EASE }}
          >
            {/* Static wrapper: the 3D scene measures this element to centre itself behind the portrait. */}
            <div id="hero-portrait" className="relative mx-auto aspect-square w-[min(64vw,20rem)] md:w-[min(38vw,30rem)]">
              <div className="halo-ring absolute -inset-3 rounded-full" aria-hidden="true" />
              <div className="float absolute inset-0" style={{ '--dur': '8s' } as CSSVars}>
                <TiltCard className="relative h-full w-full rounded-full" max={7}>
                  <div className="glass h-full w-full overflow-hidden rounded-full p-[7px] shadow-[0_0_90px_-20px_rgb(60_196_184/0.5)]">
                    <div className="h-full w-full overflow-hidden rounded-full bg-graphite">
                      <picture>
                        <source
                          type="image/webp"
                          srcSet={`${profile.photo.webp480} 480w, ${profile.photo.webp864} 864w`}
                          sizes="(min-width: 768px) 30rem, 20rem"
                        />
                        <img
                          src={profile.photo.jpg}
                          alt={profile.photo.alt}
                          width={864}
                          height={864}
                          fetchPriority="high"
                          decoding="async"
                          className="h-full w-full scale-[1.03] object-cover"
                        />
                      </picture>
                    </div>
                  </div>
                </TiltCard>
              </div>
            </div>
          </motion.div>
        </div>

        <div className="order-2 md:order-1">
          <h1 id="hero-title" className="display text-[clamp(4rem,11vw,7.5rem)] text-mist">
            <span className="block overflow-hidden pb-[0.06em]">
              <motion.span
                className="block"
                initial={{ y: '105%' }}
                animate={{ y: 0 }}
                transition={{ duration: 1.1, delay: d, ease: EASE }}
              >
                {profile.firstName}
              </motion.span>
            </span>{' '}
            <span className="block overflow-hidden pb-[0.06em]">
              <motion.span
                className="block"
                initial={{ y: '105%' }}
                animate={{ y: 0 }}
                transition={{ duration: 1.1, delay: d + 0.1, ease: EASE }}
              >
                {profile.lastName}
              </motion.span>
            </span>
          </h1>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: d + 0.35, ease: EASE }}
          >
            <p className="mt-6 flex items-center gap-4 text-xl font-medium text-amber md:text-2xl">
              <span className="hairline w-10 shrink-0" aria-hidden="true" />
              {profile.title}
            </p>
            <p className="mt-6 max-w-[46ch] text-lg text-muted">{profile.intro}</p>

            <ul className="mt-6 flex flex-wrap gap-2" aria-label="Main technologies">
              {profile.headlineStack.map((tech) => (
                <li key={tech} className="chip">
                  {tech}
                </li>
              ))}
            </ul>

            <div className="mt-9 flex flex-wrap items-center gap-4">
              <Magnetic>
                <a href="#projects" className="btn btn-primary">
                  View My Work
                </a>
              </Magnetic>
              <Magnetic>
                <a href={profile.resumeUrl} download={profile.resumeFileName} className="btn btn-ghost">
                  <Icon name="download" size={18} />
                  Download Resume
                </a>
              </Magnetic>
            </div>

            <dl className="mt-12 grid gap-5 text-sm sm:grid-cols-3">
              {facts.map((fact) => (
                <div key={fact.label} className="flex items-start gap-3">
                  <span className="mt-0.5 text-amber">
                    <Icon name={fact.icon} size={18} />
                  </span>
                  <div>
                    <dt className="text-muted">{fact.label}</dt>
                    <dd className="mt-0.5 font-medium text-mist">{fact.value}</dd>
                  </div>
                </div>
              ))}
            </dl>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
