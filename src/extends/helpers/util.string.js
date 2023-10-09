// https://stackoverflow.com/questions/63116039/camelcase-to-kebab-case
export const toKebabCase = (text) =>
  text
    .replace(/\W+/g, '-')
    .replace(/((?<=[a-z\d])[A-Z]|(?<=[A-Z\d])[A-Z](?=[a-z]))/g, '-$1')
    .toLowerCase()

// from - https://www.geeksforgeeks.org/how-to-convert-a-string-into-kebab-case-using-javascript/
export const toKebabCaseSecond = (text) =>
  text
    .replace(/([a-z])([A-Z])/g, '$1-$2')
    .replace(/[\s_]+/g, '-')
    .toLowerCase()

// https://stackoverflow.com/questions/105034/how-do-i-create-a-guid-uuid
export const toUuid = () => {
  let randomText = Date.now().toString(16) + Math.random().toString(16) + '0'.repeat(16)
  let guid = [
    randomText.substring(0, 8),
    randomText.substring(8, 8 + 4),
    '4000-8' + randomText.substring(13, 13 + 3),
    randomText.substring(16, 16 + 12),
  ].join('-')
  return guid
}

export function toCurrency(number) {
  if (!number) return 0
  const value = number.toString().replace(/\./g, '')
  return Number(value) > 0 ? value.replace(/\B(?=(\d{3})+(?!\d))/g, '.') : 0
}

export function toNiceByte(number) {
  const formatter = Intl.NumberFormat('en', { notation: 'compact' })
  return formatter.format(Number(number) || 0)
}

export function toThousand(number, decimal = 0) {
  const tier = (Math.log10(Math.abs(number)) / 3) | 0 // what tier? (determines SI symbol)
  if (tier === 0) return number // if zero, we don't need a suffix
  // get suffix and determine scale
  const numberSymbols = ['', 'K', 'M', 'G', 'T', 'P', 'E']
  const suffix = numberSymbols[tier]
  const scale = Math.pow(10, tier * 3)
  const scaled = number / scale // scale the number
  return Number(scaled) === scaled && scaled % 1 === 0 ? scaled + suffix : scaled.toFixed(decimal) + suffix // format number and add suffix
}

export function toTextLimiter(text, limit = 50) {
  if (typeof text !== 'string') return text
  if (text.length > limit) return text.substring(0, limit - 3) + '...'
  return text
}

export function getAbbreviation(value) {
  let text = ''
  const splitNames = String(value).trim().split(' ')
  if (splitNames.length > 1) {
    text = splitNames[0].charAt(0) + splitNames[1].charAt(0)
  } else {
    text = splitNames[0].charAt(0)
  }
  return text.toUpperCase()
}

export function getTruncate(value, length, separator = null) {
  if (typeof value === 'string' && length > 0) {
    const result = value.slice(0, length)
    return value.length < length ? result : result.concat(separator || '...')
  }
  return value
}
