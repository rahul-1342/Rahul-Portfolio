import { MotionConfig } from 'framer-motion'
import { Intro } from './components/Intro'
import { Nav } from './components/Nav'
import { SceneLayer } from './components/SceneLayer'
import { Hero } from './components/Hero'
import { About } from './components/sections/About'
import { Experience } from './components/sections/Experience'
import { Projects } from './components/sections/Projects'
import { Skills } from './components/sections/Skills'
import { Education } from './components/sections/Education'
import { Certifications } from './components/sections/Certifications'
import { Contact } from './components/sections/Contact'
import { profile } from './data/resume'

export default function App() {
  return (
    <MotionConfig reducedMotion="user">
      <a
        href="#main"
        className="sr-only-focusable fixed left-4 top-4 z-[120] rounded-full bg-amber px-5 py-3 text-sm font-semibold text-[#17120a]"
      >
        Skip to content
      </a>
      <Intro />
      <div className="backdrop" aria-hidden="true" />
      <SceneLayer />
      <Nav />

      <main id="main">
        <Hero />
        <About />
        <Experience />
        <Projects />
        <Skills />
        <Education />
        <Certifications />
        <Contact />
      </main>

      <footer className="wrap flex flex-col gap-3 border-t border-white/10 py-10 text-sm text-muted sm:flex-row sm:items-center sm:justify-between">
        <p>
          &copy; {new Date().getFullYear()} {profile.name}. Built with React, Three.js and Framer Motion.
        </p>
        <a href="#home" className="font-semibold text-mist transition-colors hover:text-amber">
          Back to top
        </a>
      </footer>
    </MotionConfig>
  )
}
