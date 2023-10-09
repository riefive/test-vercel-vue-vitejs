import { useAuthStore } from '@/stores/auth'
import { useProfileStore } from '@/stores/profile'
import { useSettingStore } from '@/stores/setting'
import { useTaskStore } from '@/stores/task'
import { createRequest } from '@/extends/methods/method.unit'
import { connectionInstance, destroyedStore } from '@/extends/methods/method.store'
import { differenceOfTwoDate, sleep } from '@/extends/helpers/util.timer'

let counter = 0

/**
 * Decode Jwt Token with Window atob
 * @param jwtToken | @returns a object
 */
export const getDecodeToken = (jwtToken) => {
  if (!jwtToken || (typeof jwtToken === 'string' && jwtToken?.trim()?.length === 0) || typeof window === 'undefined') return null
  const jwtArrays = jwtToken.split('.')
  const jwtPayloads = jwtArrays.length > 1 ? jwtArrays[1] : null
  try {
    const parsedToken = JSON.parse(window.atob(jwtPayloads))
    return parsedToken
  } catch (_error) {
    return null
  }
}

/**
 * Calculate Jwt Token Expired time
 * @param jwtToken | @returns a object
 */
export const getExpiredToken = (parsedToken) => {
  if (!parsedToken) return null
  const iatTime = (parsedToken?.iat || 0) * 1000
  const expTime = (parsedToken?.exp || 0) * 1000
  const resultDuration = differenceOfTwoDate(iatTime, expTime, 'minute')
  const resultCurrent = differenceOfTwoDate(new Date().getTime(), expTime, 'minute')
  if (resultCurrent > 0 && resultCurrent < resultDuration) {
    return { expired: false, ...parsedToken }
  } else {
    return { expired: true }
  }
}

// Set profile
export const setUserProfile = (tokenText) => {
  const profileStore = useProfileStore()
  const dataDecoded = getDecodeToken(tokenText)
  profileStore.setUser({
    id: dataDecoded?.user_id || '',
    name: dataDecoded?.user_name || '',
    email: dataDecoded.user_email || '',
    columns: dataDecoded?.user_columns || [],
    roles: dataDecoded?.user_roles || [],
  })
}

// Doing logout

export const doLogout = async () => {
  await sleep(50)
  const authStore = useAuthStore()
  const profileStore = useProfileStore()
  const settingStore = useSettingStore()
  const taskStore = useTaskStore()

  if (!taskStore.isConnected && counter < 5) {
    await sleep(500)
    counter++
    await doLogout()
    return
  }

  await destroyedStore(connectionInstance)
  authStore.clear()
  profileStore.clear()
  settingStore.clear()
  taskStore.clear()
}

// Doing Refresh
export const doRefresh = async () => {
  await sleep(50)
  const authStore = useAuthStore()
  const resultRequest = await createRequest('auth-refresh', 'get')
  if (resultRequest.statusCode.value === 200 && resultRequest.data?.value) {
    const dataCurrent = resultRequest.data?.value?.data || null
    const tokenText = dataCurrent.access_token || ''
    authStore.setToken(tokenText)
    setUserProfile(tokenText)
    return true
  } else {
    await doLogout()
    return false
  }
}
