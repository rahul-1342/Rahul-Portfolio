import { education } from '../../data/resume'
import { Icon } from '../Icon'
import { Reveal } from '../Reveal'
import { SectionHeading } from '../SectionHeading'

export function Education() {
  return (
    <section id="education" aria-labelledby="education-title" className="section-pad relative">
      <div className="wrap">
        <SectionHeading id="education-title" title="Education">
          A BCA followed by an MCA, with the CGPA for each.
        </SectionHeading>

        <ol className="mt-14 space-y-5">
          {education.map((entry, i) => (
            <li key={entry.degree} className="relative pl-9 md:pl-16">
              <span
                aria-hidden="true"
                className={`absolute left-[7px] top-3 w-px bg-white/10 md:left-[15px] ${i === education.length - 1 ? 'h-4' : '-bottom-5'}`}
              />
              <span
                aria-hidden="true"
                className="absolute left-0 top-2 h-[15px] w-[15px] rounded-full bg-ink ring-2 ring-amber md:left-2"
              />
              <Reveal delay={i * 0.1}>
                <article className="glass flex flex-col gap-6 rounded-3xl p-7 md:flex-row md:items-center md:justify-between md:p-9">
                  <div className="flex items-start gap-5">
                    <span className="mt-1 hidden h-12 w-12 shrink-0 place-items-center rounded-2xl bg-amber/10 text-amber ring-1 ring-inset ring-amber/25 sm:grid">
                      <Icon name="cap" size={22} />
                    </span>
                    <div>
                      <h3 className="display text-5xl text-mist">{entry.degree}</h3>
                      <p className="mt-2 text-lg text-mist">{entry.institution}</p>
                      <p className="text-muted">{entry.place}</p>
                    </div>
                  </div>
                  <dl className="flex gap-3 md:flex-col md:items-end">
                    <div className="chip gap-2">
                      <dt className="text-muted">Years</dt>
                      <dd className="font-semibold">{entry.period}</dd>
                    </div>
                    <div className="chip gap-2 border-amber/40 bg-amber/10">
                      <dt className="text-muted">CGPA</dt>
                      <dd className="font-semibold text-amber">{entry.cgpa}</dd>
                    </div>
                  </dl>
                </article>
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
