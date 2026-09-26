import { defineConfig, loadEnv, type Plugin } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

/**
 * Optional: set VITE_SITE_URL (e.g. https://rahulgautam.dev) at build time and the
 * canonical link, og:url and og:image are added with absolute URLs, which social
 * crawlers need. Without it those tags are simply left out.
 */
function siteUrlMeta(siteUrl: string | undefined): Plugin {
  return {
    name: 'site-url-meta',
    transformIndexHtml(html) {
      if (!siteUrl) return html
      const base = siteUrl.replace(/\/$/, '')
      const tags = [
        `<link rel="canonical" href="${base}/" />`,
        `<meta property="og:url" content="${base}/" />`,
        `<meta property="og:image" content="${base}/rahul-864.jpg" />`,
        `<meta name="twitter:image" content="${base}/rahul-864.jpg" />`,
      ].join('\n    ')
      return html.replace('</head>', `    ${tags}\n  </head>`)
    },
  }
}

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), 'VITE_')
  return {
    plugins: [react(), tailwindcss(), siteUrlMeta(env.VITE_SITE_URL)],
    build: { target: 'es2022', chunkSizeWarningLimit: 900 },
  }
})
