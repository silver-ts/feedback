const WPM = 265 // Reading speed for the average reader in Word per minute (WPM)

/**
 * Calculate estimated reading time
 * @param {string} content
 * @returns {object} readTime in minutes and wordCount
 */
const readTime = (content) => {
  if (!content) {
    return { readTime: 0, wordCount: 0 }
  }

  const words = content.trim().split(/\s+/).length
  const time = Math.ceil(words / WPM)

  return { readTime: time, wordCount: words }
}

export default readTime
