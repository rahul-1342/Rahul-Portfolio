import { certifications } from '../../data/resume'
import { Icon, type IconName } from '../Icon'
import { Reveal } from '../Reveal'
import { SectionHeading } from '../SectionHeading'
import { TiltCard } from '../TiltCard'

const iconFor: Record<string, IconName> = {
  'js-iitb': 'code',
  'dbms-infosys': 'database',
  'c-cst': 'terminal',
}

export function Certifications() {
  return (
    <section id="certifications" aria-labelledby="certifications-title" className="section-pad relative">
      <div className="wrap">
        <SectionHeading id="certifications-title" title="Certifications and training">
          Two certifications from my resume, and the industrial training on C I completed.
        </SectionHeading>

        <ul className="mt-14 grid gap-5 md:grid-cols-3">
          {certifications.map((cert, i) => (
            <li key={cert.id}>
              <Reveal delay={i * 0.09} className="h-full">
                <TiltCard className="glass h-full rounded-3xl p-7 md:p-8" max={4}>
                  {/* Seal: a thin ring around the icon, like a stamp on a certificate. */}
                  <span className="relative grid h-16 w-16 place-items-center rounded-full text-amber">
                    <span className="absolute inset-0 rounded-full border border-amber/50" aria-hidden="true" />
                    <span className="absolute inset-[5px] rounded-full border border-dashed border-amber/30" aria-hidden="true" />
                    <Icon name={iconFor[cert.id] ?? 'award'} size={24} />
                  </span>
                  <h3 className="mt-7 text-xl font-semibold leading-snug text-mist">{cert.title}</h3>
                  <p className="mt-1 text-muted">{cert.issuer}</p>
                  <p className="chip mt-5">{cert.kind}</p>
                </TiltCard>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
