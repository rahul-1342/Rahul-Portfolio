import { education, experience, profile, strengths } from '../../data/resume'
import { Icon, type IconName } from '../Icon'
import { Reveal } from '../Reveal'
import { SectionHeading } from '../SectionHeading'
import { TiltCard } from '../TiltCard'

const [master, bachelor] = education

interface Highlight {
  id: string
  icon: IconName
  title: string
  span: string
  body: string
}

const highlights: Highlight[] = [
  {
    id: 'background',
    icon: 'cap',
    title: 'Background',
    span: 'md:col-span-4',
    body: `${master.degree} from ${master.institution}, ${master.place} (${master.period}), after a ${bachelor.degree} from ${bachelor.institution}, ${bachelor.place} (${bachelor.period}).`,
  },
  {
    id: 'direction',
    icon: 'compass',
    title: 'Career direction',
    span: 'md:col-span-2',
    body: 'Eager to build user-friendly solutions and grow in software development.',
  },
  {
    id: 'focus',
    icon: 'code',
    title: 'Professional focus',
    span: 'md:col-span-3',
    body: `Full-stack web applications: an e-commerce app and a social media platform at ${experience.company}, plus the Online House Renting System built with Java and MySQL.`,
  },
]

export function About() {
  return (
    <section id="about" aria-labelledby="about-title" className="section-pad relative">
      <div className="wrap">
        <SectionHeading id="about-title" title="About me">
          {profile.objective}
        </SectionHeading>

        <div className="mt-14 grid gap-5 md:grid-cols-6">
          {highlights.map((item, i) => (
            <Reveal key={item.id} className={item.span} delay={i * 0.08}>
              <TiltCard className="glass h-full rounded-3xl p-7 md:p-8" max={3}>
                <span className="grid h-11 w-11 place-items-center rounded-2xl bg-amber/10 text-amber ring-1 ring-inset ring-amber/25">
                  <Icon name={item.icon} />
                </span>
                <h3 className="mt-6 text-lg font-semibold text-mist">{item.title}</h3>
                <p className="mt-2 max-w-[44ch] text-muted">{item.body}</p>
              </TiltCard>
            </Reveal>
          ))}

          <Reveal className="md:col-span-3" delay={0.24}>
            <TiltCard className="glass h-full rounded-3xl p-7 md:p-8" max={3}>
              <span className="grid h-11 w-11 place-items-center rounded-2xl bg-amber/10 text-amber ring-1 ring-inset ring-amber/25">
                <Icon name="users" />
              </span>
              <h3 className="mt-6 text-lg font-semibold text-mist">Key strengths</h3>
              <ul className="mt-4 flex flex-wrap gap-2">
                {strengths.map((strength) => (
                  <li key={strength} className="chip">
                    {strength}
                  </li>
                ))}
              </ul>
            </TiltCard>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
