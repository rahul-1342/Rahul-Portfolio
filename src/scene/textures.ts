import * as THREE from 'three'

function radialTexture(stops: Array<[number, string]>): THREE.CanvasTexture {
  const size = 128
  const canvas = document.createElement('canvas')
  canvas.width = size
  canvas.height = size
  const ctx = canvas.getContext('2d')
  if (ctx) {
    const gradient = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2)
    stops.forEach(([at, color]) => gradient.addColorStop(at, color))
    ctx.fillStyle = gradient
    ctx.fillRect(0, 0, size, size)
  }
  const texture = new THREE.CanvasTexture(canvas)
  texture.colorSpace = THREE.SRGBColorSpace
  return texture
}

/** Wide, soft falloff for light orbs. */
export function makeGlowTexture(): THREE.CanvasTexture {
  return radialTexture([
    [0, 'rgba(255,255,255,1)'],
    [0.3, 'rgba(255,255,255,0.32)'],
    [0.65, 'rgba(255,255,255,0.07)'],
    [1, 'rgba(255,255,255,0)'],
  ])
}

/** Small bright core for dust particles. */
export function makeDotTexture(): THREE.CanvasTexture {
  return radialTexture([
    [0, 'rgba(255,255,255,1)'],
    [0.4, 'rgba(255,255,255,0.55)'],
    [1, 'rgba(255,255,255,0)'],
  ])
}

/** Small seeded generator so the particle layout is identical on every render. */
export function seededRandom(seed: number): () => number {
  let a = seed >>> 0
  return () => {
    a = (a + 0x6d2b79f5) >>> 0
    let t = a
    t = Math.imul(t ^ (t >>> 15), t | 1)
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61)
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}
