const get = (object, path, defaultValue = undefined) => {
  const travel = (regexp) =>
    String.prototype.split
      .call(path, regexp)
      .filter(Boolean)
      .reduce((res, key) => (res !== null && res !== undefined ? res[key] : res), object)
  const result = travel(/[,[\]]+?/) || travel(/[,[\].]+?/)
  return result === undefined || result === object ? defaultValue : result
}

const omit = (object, keys, type = 'simple') => {
  let objectCopy = null
  if (type === 'simple') {
    objectCopy = Object.assign({}, object)
    for (const n of keys) delete objectCopy[n]
  } else {
    const exclude = new Set(keys)
    objectCopy = Object.fromEntries(Object.entries(object).filter((e) => !exclude.has(e[0])))
  }
  return objectCopy
}

const pick = (object, keys) => {
  return keys.reduce((obj, key) => {
    obj[key] = object[key]
    return obj
  }, {})
}

export { get, omit, pick }
