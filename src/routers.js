import { createRouter, createWebHistory } from 'vue-router'
import { routerMaps } from '@/extends/constants/maps.router'

const baseUrl = '/'
const pages = import.meta.glob('./pages/*.vue')

const routes = Object.keys(pages).flatMap((path) => {
  const routeString = path.match(/\.\/pages(.*)\.vue$/) || ''
  const routePath = routeString[1].toLowerCase()
  const routeName = routePath.replace(/\//g, '').trim()
  const routerObjectCurrent = routerMaps[routeName] || null

  if (!routerObjectCurrent) return []

  return {
    name: routerObjectCurrent?.id,
    path: routerObjectCurrent?.path,
    component: pages[path],
    meta: {
      auth: routerObjectCurrent?.auth ?? true,
      layout: routerObjectCurrent?.layout || 'default',
      full: routerObjectCurrent?.full || false,
      allowAgent: routerObjectCurrent?.allowAgent ?? false,
    },
  }
})

routes.push({
  name: 'not-found',
  path: '/:pathMatch(.*)*',
  component: () => import('./components/commons/ViewPage404.vue'),
  meta: { auth: false, layout: 'default' },
})

const router = createRouter({
  history: createWebHistory(baseUrl),
  routes: routes,
})

export default router
