import { createFetch, useFetch } from '@vueuse/core'
import { useAuthStore } from '@/stores/auth'
import { useSettingStore } from '@/stores/setting'

const env = import.meta.env.VITE_ENV || 'development'
const apiUrl = (env === 'development' ? import.meta.env.VITE_API_URL_DEV : import.meta.env.VITE_API_URL) || 'http://localhost'
const apiTimeout = import.meta.env.VITE_API_TIMEOUT || 10

const useFetchClient = (configs = {}) => {
  const authStore = useAuthStore()
  const settingStore = useSettingStore()
  const headers = configs?.headers || {}
  const settings = configs?.settings || {}
  return createFetch({
    baseUrl: apiUrl,
    options: {
      beforeFetch: (value) => {
        const jwtToken = authStore.getToken || null
        const options = value?.options || {}
        options.timeout = (apiTimeout || 1) * 1000
        options.immediate = false
        if (jwtToken) {
          options.headers.Authorization = `Bearer ${jwtToken}`
        }
        options.headers = { ...options.headers, ...headers }
        options.headers = { ...options.headers, ...headers }
        if (Array.isArray(options.body) && options.method.toLowerCase() !== 'GET') {
          options.headers['Content-Type'] = 'application/json'
          options.body = JSON.stringify(options.body)
        }
        return { options }
      },
      afterFetch: (ctx) => {
        return ctx
      },
      onFetchError(ctx) {
        const data = ctx?.data || {}
        const response = ctx?.response || {}
        if (response) response.data = data
        if ((data.statusCode === 401 || response.status === 401) && /jwt expired/i.test(data.message || '')) {
          settingStore.setForbidden(true)
        }
        return ctx
      },
    },
    fetchOptions: { mode: 'cors', ...settings },
  })
}

export { useFetch, useFetchClient }
