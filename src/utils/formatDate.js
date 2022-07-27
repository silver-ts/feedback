import { format, formatDistanceToNow } from 'date-fns'

const MILLISECONDS_IN_SEC = 1000

/**
 * Format given date to the string, ex. 'Jul 27, 2022'
 * @param {number} seconds Date
 * @returns {string} Formated Date
 */
export const displayDate = (seconds) => {
  return format(new Date(seconds * MILLISECONDS_IN_SEC), 'PP')
}

/**
 * Distance to the current Date, ex. '6 days ago'
 * @param {number} seconds Date
 * @returns {string} Formated distance
 */
export const displayDistanceToNow = (seconds) => {
  return formatDistanceToNow(new Date(seconds * MILLISECONDS_IN_SEC), { addSuffix: true })
}
