import { DIGITS_AFTER_COMMA } from '../constantes/consts'

const defaultLongTitleLength = 22

export const isLongTitle = (title, longTitleLength = defaultLongTitleLength) => title?.length > longTitleLength

export const shortenTitle = (title, longTitleLength = defaultLongTitleLength) =>
  `${title?.substring(0, longTitleLength)}${isLongTitle(title) ? '...' : ''}`

export const sortFunc = (a, b) => {
  if (!a || !b) return 0
  if (a.toLowerCase() < b.toLowerCase()) return -1
  if (a.toLowerCase() > b.toLowerCase()) return 1
  return 0
}

export const localeStringFormat = (...args) => {
  let localString = args[0]

  args
    .filter((d, index) => index > 0)
    .forEach((arg) => {
      localString = localString.replace('%s', arg)
    })

  return localString
}

export const fixNumberDisplay = (nb) =>
  +Number.parseFloat(nb)
    .toFixed(DIGITS_AFTER_COMMA)
    .replace(/(\.0+|0+)$/, '')

export const capitalizeFirstLetter = (str) =>
  str.charAt(0).toUpperCase() + str.slice(1)

export const pointToComma = (number = '') => {
  return number.toString().replace('.', ',')
}
export const CommaToPoint = (number = '') => {
  return number.toString().replace(',', '.')
}
