/* eslint-disable */
import { fileURLToPath } from 'node:url'
import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import UnoCSS from 'unocss/vite'
import { presetUno, presetAttributify } from 'unocss'
import { quasar, transformAssetUrls } from '@quasar/vite-plugin'
import eslintPlugin from 'vite-plugin-eslint'
import { VitePWA } from 'vite-plugin-pwa'

process.env = { ...process.env, ...loadEnv(process.env.NODE_ENV, process.cwd()) }

const rulesOfworkbox = [
  { id: 'unpkg.com', alias: 'unpkg', pattern: /^https:\/\/unpkg\.com\/.*/i, type: 'cache', entry: 25, day: 365 },
  { id: 'jsdelivr.net', alias: 'unpkg', pattern: /^https:\/\/cdn\.jsdelivr\.net\/.*/i, type: 'cache', entry: 25, day: 365 },
]

const setRuntimeOfWorkbox = (configs) => {
  const output = { urlPattern: configs?.pattern }
  const type = configs.type
  if (type === 'cache') {
    output.handler = 'CacheFirst'
    output.options = {
      cacheName: `cache-${configs.alias}`,
      expiration: { maxEntries: configs.entry, maxAgeSeconds: 60 * 60 * 24 * configs.day || 10 },
      cacheableResponse: { statuses: [0, 200] },
    }
  } else if (type === 'network') {
    output.handler = 'NetworkOnly'
    output.options = {
      backgroundSync: { name: `queue-${configs.alias}`, options: { maxRetentionTime: 24 * 60 } },
    }
  }
  return output
}

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    minify: true,
  },
  server: {
    host: true,
    port: Number(process.env?.VITE_DEVELOPMENT_PORT || 5173),
    hmr: process.env.NODE_ENV !== 'production',
  },
  preview: {
    port: Number(process.env?.VITE_PRODUCTION_PORT || 4173),
  },
  plugins: [
    vue({
      template: { transformAssetUrls },
    }),
    quasar({
      sassVariables: 'src/assets/css/quasar-variables.sass',
    }),
    UnoCSS({
      presets: [presetAttributify({}), presetUno({ prefix: 'uno-' })],
    }),
    eslintPlugin(),
    VitePWA({
      registerType: 'autoUpdate',
      injectRegister: 'auto',
      includeAssets: ['favicon.ico'],
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg}'],
        runtimeCaching: rulesOfworkbox.map((item) => setRuntimeOfWorkbox(item)),
      },
    }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
})
