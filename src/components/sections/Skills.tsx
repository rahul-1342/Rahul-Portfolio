import { useMemo, useState } from 'react'
import { skillGroups, type SkillGroup } from '../../data/resume'
import { type CSSVars } from '../../lib/css'
import { Reveal } from '../Reveal'
import { SectionHeading } from '../SectionHeading'
import { TiltCard } from '../TiltCard'

const spans: Record<SkillGroup['id'], string> = {
  technical: 'md:col-span-7',
  tools: 'md:col-span-5',
  soft: 'md:col-span-12',
}

export function Skills() {
  const [selected, setSelected] = useState<string | null>(null)

  const all = useMemo(() => skillGroups.flatMap((g) => g.skills.map((s) => ({ ...s, group: g.title }))), [])
  const current = all.find((s) => s.name === selected) ?? null

  // Skills the resume ties to the same project or certificate as the selected one.
  const related = useMemo(() => {
    if (!current || current.appearsIn.length === 0) return new Set<string>()
    return new Set(
      all.filter((s) => s.name !== current.name && s.appearsIn.some((a) => current.appearsIn.includes(a))).map((s) => s.name),
    )
  }, [all, current])

  let message = 'Select a skill to see where it shows up in my resume.'
  if (current) {
    message =
      current.appearsIn.length > 0
        ? `${current.name} appears in ${current.appearsIn.join(' and ')}.${related.size > 0 ? ` Used alongside ${[...related].join(' and ')}.` : ''}`
        : `${current.name} is listed under ${current.group.toLowerCase()} in my resume.`
  }

  let counter = 0

  return (
    <section id="skills" aria-labelledby="skills-title" className="section-pad relative">
      <div className="wrap">
        <SectionHeading id="skills-title" title="Skills">
          Exactly what my resume lists, plus the tools named in my project entries. No ratings or percentages.
        </SectionHeading>

        <div className="mt-14 grid gap-5 md:grid-cols-12">
          {skillGroups.map((group, gi) => (
            <Reveal key={group.id} className={spans[group.id]} delay={gi * 0.08}>
              <TiltCard className="glass h-full rounded-3xl p-7 md:p-8" max={3}>
                <h3 className="text-lg font-semibold text-mist">{group.title}</h3>
                <p className="mt-1 text-sm text-muted">{group.note}</p>
                <ul className="mt-7 flex flex-wrap gap-3">
                  {group.skills.map((skill) => {
                    const i = counter++
                    const isSelected = selected === skill.name
                    const isRelated = related.has(skill.name)
                    return (
                      <li key={skill.name} className="float" style={{ '--dur': `${5.4 + (i % 4) * 0.9}s`, '--delay': `${-i * 0.8}s` } as CSSVars}>
                        <button
                          type="button"
                          aria-pressed={isSelected}
                          onClick={() => setSelected(isSelected ? null : skill.name)}
                          className="skill"
                          data-related={isRelated || undefined}
                        >
                          {skill.name}
                        </button>
                      </li>
                    )
                  })}
                </ul>
              </TiltCard>
            </Reveal>
          ))}
        </div>

        <p role="status" aria-live="polite" className="mt-8 min-h-[3.25rem] max-w-[60ch] text-muted">
          {message}
        </p>
      </div>
    </section>
  )
}
