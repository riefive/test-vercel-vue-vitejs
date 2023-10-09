import { toKebabCase } from '@/extends/helpers/util.string'

const requestRaws = [
  { path: 'test', method: 'get,post', description: 'Api for test' }
]

const requestMaps = {}

for (const item of requestRaws) {
  const key = toKebabCase(item.path)
  requestMaps[item.alias || key] = { id: key, path: item.path, method: item.method, description: item.description }
}

export { requestMaps }
