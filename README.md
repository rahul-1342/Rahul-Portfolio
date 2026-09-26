# Rahul Gautam, 3D portfolio

A single-page portfolio built from the resume PDF. React, TypeScript, Vite, Tailwind CSS, React Three Fiber and Framer Motion.

## Run it

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # type-checks, then builds to dist/
npm run preview    # serves the production build
```

## Change the content

Every fact on the site lives in `src/data/resume.ts`, and every component reads from it. Edit that one file to update
the site. The downloadable resume is `public/Rahul_Gautam_Resume.pdf`; replace the file (keep the name) to update it.

## Deploy

`dist/` is a static site: Netlify, Vercel, GitHub Pages (user site) or Cloudflare Pages all work. Set
`VITE_SITE_URL=https://your-domain` at build time to add the canonical link and the social preview image tags,
which need an absolute URL.

## How it is put together

- `src/scene/` is the WebGL layer: one fixed canvas whose camera descends as you scroll, with dust particles, soft light
  orbs, a wireframe object centred behind the portrait (it finds `#hero-portrait` in the page), and drifting shapes. It is a
  separate, lazy-loaded chunk, so the page is readable before Three.js arrives.
- `src/components/` holds the sections, navigation, and the shared pieces (`TiltCard`, `Magnetic`, `Reveal`).
- Phones get fewer particles, a lower pixel ratio, no pointer parallax and no grid floor.
- With `prefers-reduced-motion`, the load animation, tilt, magnetic buttons and scroll reveals are off and the 3D scene
  renders a single still frame. If WebGL is unavailable, the CSS backdrop is used and nothing breaks.
