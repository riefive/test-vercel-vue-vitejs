import { useFetchClient } from '@/extends/helpers/util.http'
import { requestMaps } from '@/extends/constants/maps.request'

export const createNotify = ($q, message, type, params = {}) => {
  if (!$q) return false
  let options = { progress: true, position: 'top', timeout: 2500 }
  if (type === 'error') {
    options = { ...options, icon: 'report_problem', color: 'negative', textColor: 'white', message }
  } else if (type === 'success') {
    options = { ...options, icon: 'done', color: 'positive', textColor: 'white', message }
  }
  if (params?.color) options.color = params.color
  if (params?.progress) options.progress = params.progress
  if (params?.position) options.position = params.position
  $q.notify(options)
}

export const createRequest = async (key, type = 'get', payloads = null, options = null) => {
  const currentPath = requestMaps[key]
  if (!currentPath) return { data: null }
  let pathUrl = currentPath?.path || ''
  let result = null
  if (options && options.sub_path) {
    pathUrl += '/' + options.sub_path // addition subpath by id
    delete options.sub_path
  }
  const settings = options || {}
  const fetchClient = useFetchClient(settings)
  if (type === 'get') {
    if (payloads) pathUrl = pathUrl + '?' + (typeof payloads === 'object' ? new URLSearchParams(payloads).toString() : payloads.toString())
    result = await fetchClient(pathUrl, { refetch: true }).json()
  } else if (type === 'post') {
    result = await fetchClient(pathUrl).post(payloads).json()
  } else if (type === 'patch') {
    result = await fetchClient(pathUrl).patch(payloads).json()
  } else if (type === 'put') {
    result = await fetchClient(pathUrl).put(payloads).json()
  } else if (type === 'delete') {
    result = await fetchClient(pathUrl).delete(payloads).json()
  }
  return result
}
