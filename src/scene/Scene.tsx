import { useEffect, useMemo, useRef, useState } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'
import { attachInput, input } from './input'
import { makeDotTexture, makeGlowTexture, seededRandom } from './textures'

/** How far the camera travels down the world as the page scrolls from top to bottom. */
const PATH_Y = 15
const TEAL = '#3cc4b8'
const AMBER = '#f2b45e'
const INK = '#0b0d11'
const FOV = 45
/** Camera distance from the world origin plane when the page is at the top. */
const CAMERA_Z = 8

/** Portrait position measured from the page, in pixels from the canvas centre. */
interface Anchor {
  cx: number
  cy: number
  radius: number
}

/**
 * Finds the hero portrait in the DOM (#hero-portrait) so the 3D objects behind it stay centred on it
 * at every screen size, instead of guessing a fixed offset.
 */
function useHeroAnchor(): Anchor | null {
  const { size } = useThree()
  const [anchor, setAnchor] = useState<Anchor | null>(null)

  useEffect(() => {
    const el = document.getElementById('hero-portrait')
    if (!el) return
    const measure = () => {
      const r = el.getBoundingClientRect()
      const next = {
        cx: r.left + r.width / 2 - size.width / 2,
        cy: r.top + window.scrollY + r.height / 2 - size.height / 2,
        radius: r.width / 2,
      }
      setAnchor((prev) =>
        prev && Math.abs(prev.cx - next.cx) < 0.5 && Math.abs(prev.cy - next.cy) < 0.5 && Math.abs(prev.radius - next.radius) < 0.5
          ? prev
          : next,
      )
    }
    measure()
    const observer = new ResizeObserver(measure)
    observer.observe(el)
    observer.observe(document.body)
    return () => observer.disconnect()
  }, [size.width, size.height])

  return anchor
}

/** Converts the pixel anchor to world units on the plane at depth `z` (camera at scroll top). */
function toWorld(anchor: Anchor, z: number, heightPx: number) {
  const perPx = (2 * Math.tan(THREE.MathUtils.degToRad(FOV / 2)) * (CAMERA_Z - z)) / heightPx
  return { x: anchor.cx * perPx, y: -anchor.cy * perPx, radius: anchor.radius * perPx }
}

interface SceneProps {
  /** Phones and small tablets: fewer particles, no pointer parallax, lower pixel ratio. */
  compact: boolean
  /** Reduced motion: render one still frame and never animate. */
  frozen: boolean
}

/**
 * One fixed WebGL canvas behind the whole page. The camera descends through the world as
 * the visitor scrolls, so shapes at different depths slide past at different speeds.
 */
export default function Scene({ compact, frozen }: SceneProps) {
  useEffect(() => attachInput(!compact && !frozen), [compact, frozen])

  return (
    <Canvas
      dpr={compact ? [1, 1.25] : [1, 1.75]}
      camera={{ fov: FOV, near: 0.1, far: 80, position: [0, 0, CAMERA_Z] }}
      gl={{ alpha: true, antialias: !compact, powerPreference: 'high-performance' }}
      frameloop={frozen ? 'demand' : 'always'}
    >
      <fog attach="fog" args={[INK, 9, 34]} />
      <CameraRig frozen={frozen} />
      <Particles count={compact ? 520 : 1500} frozen={frozen} />
      <Orbs compact={compact} />
      <HeroObject compact={compact} frozen={frozen} />
      <Drifters compact={compact} frozen={frozen} />
      {!compact && <Floor frozen={frozen} />}
    </Canvas>
  )
}

/** Scroll drives the camera down the world; the pointer nudges it for parallax. */
function CameraRig({ frozen }: { frozen: boolean }) {
  const smooth = useRef({ s: 0, x: 0, y: 0 })

  useFrame((state, delta) => {
    if (frozen) return
    const v = smooth.current
    v.s = THREE.MathUtils.damp(v.s, input.scroll, 3.2, delta)
    v.x = THREE.MathUtils.damp(v.x, input.px, 2.4, delta)
    v.y = THREE.MathUtils.damp(v.y, input.py, 2.4, delta)

    const cam = state.camera
    cam.position.x = v.x * 0.7
    cam.position.y = -v.s * PATH_Y + v.y * 0.4
    // Drift a little closer through the middle of the page, then ease back.
    cam.position.z = CAMERA_Z - Math.sin(v.s * Math.PI) * 1.4
    cam.rotation.y = -v.x * 0.05
    cam.rotation.x = v.y * 0.03
  })

  return null
}

/** Fine dust spread through the whole scroll path, tinted cool white with a few teal and amber motes. */
function Particles({ count, frozen }: { count: number; frozen: boolean }) {
  const ref = useRef<THREE.Points>(null)
  const map = useMemo(() => makeDotTexture(), [])

  const { positions, colors } = useMemo(() => {
    const rand = seededRandom(1342)
    const positions = new Float32Array(count * 3)
    const colors = new Float32Array(count * 3)
    const cool = new THREE.Color('#c4dde8')
    const teal = new THREE.Color(TEAL)
    const warm = new THREE.Color(AMBER)
    const tint = new THREE.Color()

    for (let i = 0; i < count; i++) {
      positions[i * 3] = (rand() - 0.5) * 32
      positions[i * 3 + 1] = 5 - rand() * (PATH_Y + 11)
      positions[i * 3 + 2] = -18 + rand() * 22

      const pick = rand()
      tint.copy(pick < 0.07 ? warm : pick < 0.28 ? teal : cool).multiplyScalar(0.45 + rand() * 0.55)
      colors[i * 3] = tint.r
      colors[i * 3 + 1] = tint.g
      colors[i * 3 + 2] = tint.b
    }
    return { positions, colors }
  }, [count])

  useFrame((state) => {
    if (frozen || !ref.current) return
    ref.current.rotation.y = state.clock.elapsedTime * 0.012
  })

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-color" args={[colors, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.036}
        map={map}
        vertexColors
        transparent
        opacity={0.9}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        sizeAttenuation
      />
    </points>
  )
}

interface OrbProps {
  position: [number, number, number]
  size: number
  color: string
  opacity: number
  map: THREE.Texture
}

function Orb({ position, size, color, opacity, map }: OrbProps) {
  return (
    <sprite position={position} scale={[size, size, 1]}>
      <spriteMaterial
        map={map}
        color={color}
        opacity={opacity}
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        fog={false}
      />
    </sprite>
  )
}

/** Soft light orbs: the ambient lighting of the scene. One sits behind the hero portrait. */
function Orbs({ compact }: { compact: boolean }) {
  const map = useMemo(() => makeGlowTexture(), [])
  const { viewport, size } = useThree()
  const anchor = useHeroAnchor()
  const far = anchor ? toWorld(anchor, -5, size.height) : null
  const near = anchor ? toWorld(anchor, -3, size.height) : null
  const heroX = far ? far.x : compact ? 0 : viewport.width * 0.23
  const heroY = far ? far.y : compact ? viewport.height * 0.2 : 0.1
  const glowX = near ? near.x : heroX - 0.6
  const glowY = near ? near.y : heroY - 0.8
  const spread = THREE.MathUtils.clamp(viewport.width / 10.6, 0.35, 1)

  return (
    <>
      <Orb map={map} position={[heroX, heroY, -5]} size={compact ? 9 : 12} color={TEAL} opacity={0.28} />
      <Orb map={map} position={[glowX - 0.4, glowY - 0.7, -3]} size={compact ? 3.5 : 5} color={AMBER} opacity={0.2} />
      <Orb map={map} position={[-5 * spread, -6.5, -6]} size={10} color={TEAL} opacity={0.16} />
      <Orb map={map} position={[5 * spread, -10.5, -6]} size={9} color={AMBER} opacity={0.12} />
      <Orb map={map} position={[-4 * spread, -14.5, -5]} size={11} color={TEAL} opacity={0.16} />
    </>
  )
}

/** The centrepiece: nested wireframe solids and a thin ring that turn slowly behind the portrait. */
function HeroObject({ compact, frozen }: { compact: boolean; frozen: boolean }) {
  const group = useRef<THREE.Group>(null)
  const outer = useRef<THREE.LineSegments>(null)
  const inner = useRef<THREE.LineSegments>(null)
  const ring = useRef<THREE.Mesh>(null)
  const { viewport, size } = useThree()
  const anchor = useHeroAnchor()

  const outerGeometry = useMemo(() => new THREE.EdgesGeometry(new THREE.IcosahedronGeometry(1, 1)), [])
  const innerGeometry = useMemo(() => new THREE.EdgesGeometry(new THREE.OctahedronGeometry(1, 0)), [])
  const ringGeometry = useMemo(() => new THREE.TorusGeometry(1, 0.006, 8, 160), [])

  const world = anchor ? toWorld(anchor, -0.5, size.height) : null
  const baseX = world ? world.x : compact ? 0 : viewport.width * 0.23
  const baseY = world ? world.y : compact ? viewport.height * 0.2 : 0.1
  const scale = world ? world.radius * 1.12 : compact ? Math.min(viewport.width * 0.5, 1.6) : 2.5

  useFrame((_, delta) => {
    if (frozen || !group.current) return
    const g = group.current

    // The centrepiece belongs to the hero: it fades out over the first stretch of scrolling
    // so it never sits behind the text of later sections.
    const fade = 1 - THREE.MathUtils.smoothstep(input.scroll, 0.012, 0.075)
    g.visible = fade > 0.01
    if (!g.visible) return
    const setOpacity = (mesh: THREE.Object3D | null, base: number) => {
      if (!mesh) return
      const material = (mesh as THREE.Mesh).material as THREE.Material
      material.opacity = base * fade
    }
    setOpacity(outer.current, 0.34)
    setOpacity(inner.current, 0.5)
    setOpacity(ring.current, 0.45)
    g.rotation.y = THREE.MathUtils.damp(g.rotation.y, input.px * 0.35, 2.5, delta)
    g.rotation.x = THREE.MathUtils.damp(g.rotation.x, -input.py * 0.25, 2.5, delta)
    g.position.x = THREE.MathUtils.damp(g.position.x, baseX + input.px * 0.25, 2.5, delta)
    if (outer.current) outer.current.rotation.y += delta * 0.1
    if (inner.current) {
      inner.current.rotation.y -= delta * 0.16
      inner.current.rotation.x += delta * 0.06
    }
    if (ring.current) ring.current.rotation.z += delta * 0.05
  })

  // With reduced motion the scene is a single still frame that would stay fixed behind every section.
  if (frozen) return null

  return (
    <group ref={group} position={[baseX, baseY, -0.5]} scale={scale}>
      <lineSegments ref={outer} geometry={outerGeometry}>
        <lineBasicMaterial color={TEAL} transparent opacity={0.34} />
      </lineSegments>
      <lineSegments ref={inner} geometry={innerGeometry} scale={0.58}>
        <lineBasicMaterial color={AMBER} transparent opacity={0.5} />
      </lineSegments>
      <mesh ref={ring} geometry={ringGeometry} rotation={[1.25, 0.3, 0]} scale={1.2}>
        <meshBasicMaterial color={AMBER} transparent opacity={0.45} />
      </mesh>
    </group>
  )
}

const DRIFTERS: Array<{ p: [number, number, number]; s: number; color: string; speed: number }> = [
  { p: [-4.8, -3.4, -2], s: 0.5, color: TEAL, speed: 0.22 },
  { p: [5.0, -6.4, -3], s: 0.75, color: AMBER, speed: 0.16 },
  { p: [-5.4, -9.4, -2], s: 0.6, color: TEAL, speed: 0.2 },
  { p: [4.6, -12.0, -3], s: 0.85, color: TEAL, speed: 0.14 },
  { p: [-3.8, -14.2, -2], s: 0.5, color: AMBER, speed: 0.24 },
]

/** Small wireframe shapes placed down the page, so scrolling reads as travelling through depth. */
function Drifters({ compact, frozen }: { compact: boolean; frozen: boolean }) {
  const refs = useRef<Array<THREE.LineSegments | null>>([])
  const { viewport } = useThree()
  const geometry = useMemo(() => new THREE.EdgesGeometry(new THREE.OctahedronGeometry(1, 0)), [])
  const spread = THREE.MathUtils.clamp(viewport.width / 10.6, 0.35, 1)
  const items = compact ? DRIFTERS.slice(0, 3) : DRIFTERS

  useFrame((state, delta) => {
    if (frozen) return
    const t = state.clock.elapsedTime
    items.forEach((item, i) => {
      const mesh = refs.current[i]
      if (!mesh) return
      mesh.rotation.y += delta * item.speed
      mesh.rotation.x += delta * item.speed * 0.5
      mesh.position.y = item.p[1] + Math.sin(t * 0.5 + i * 1.7) * 0.18
    })
  })

  return (
    <>
      {items.map((item, i) => (
        <lineSegments
          key={i}
          ref={(el) => {
            refs.current[i] = el
          }}
          geometry={geometry}
          position={[item.p[0] * spread, item.p[1], item.p[2]]}
          scale={item.s}
        >
          <lineBasicMaterial color={item.color} transparent opacity={0.4} />
        </lineSegments>
      ))}
    </>
  )
}

/** A faint grid floor that follows the camera down the page and fades into fog. */
function Floor({ frozen }: { frozen: boolean }) {
  const ref = useRef<THREE.GridHelper>(null)

  useEffect(() => {
    const material = ref.current?.material as THREE.LineBasicMaterial | undefined
    if (material) {
      material.transparent = true
      material.opacity = 0.07
      material.depthWrite = false
    }
  }, [])

  useFrame((state) => {
    if (frozen || !ref.current) return
    ref.current.position.y = state.camera.position.y - 5.8
  })

  return <gridHelper ref={ref} args={[90, 30, TEAL, TEAL]} position={[0, -5.8, -14]} />
}
