/**
 * based on https://stackoverflow.com/questions/41948/how-do-i-get-the-difference-between-two-dates-in-javascript
 * @param date1, @param date2, @param type | @returns a number
 */
export const differenceOfTwoDate = (date1, date2, type = 'hour') => {
  const msMinutes = 60 * 1000
  const msHours = 60 * 60 * 1000
  const msDays = 60 * 60 * 24 * 1000

  const newDate1 = new Date(date1)
  const newDate2 = new Date(date2)
  const diff = newDate2.getTime() - newDate1.getTime()

  let result = 0
  switch (type) {
    case 'minute':
      result = diff / msMinutes
      break
    case 'hour':
      result = diff / msHours
      break
    case 'day':
      result = diff / msDays
      break
  }

  return Math.floor(result)
}

export const debounce = (routine, wait, immediate = false) => {
  let timeout = null
  return function () {
    const context = this
    const args = arguments
    clearTimeout(timeout)
    timeout = setTimeout(function () {
      timeout = null
      if (!immediate) routine.apply(context, args)
    }, wait)
    if (immediate && !timeout) routine.apply(context, args)
  }
}

let timers = {}
export function debounceDeep(id, functional, timeout = 300) {
  if (timers[id]) clearTimeout(timers[id])
  return (...args) => {
    timers[id] = setTimeout(() => {
      functional.apply(this, args)
    }, timeout)
  }
}

export const getByDateStringRange = (value, divider = '/') => {
  return value?.day?.toString().padStart(2, '0') + divider + value?.month?.toString().padStart(2, '0') + divider + value?.year?.toString()
}

export const getByDateStringSplit = (value, divider = '/') => {
  if (!value) return ''
  const splitters = value?.split(divider)
  if (splitters.length !== 3) return ''
  return splitters[2]?.toString().padStart(2, '0') + divider + splitters[1].toString().padStart(2, '0') + divider + splitters[0]?.toString()
}

export const sleep = async (ms = 15) => {
  return await new Promise((resolve) => setTimeout(resolve, ms))
}
