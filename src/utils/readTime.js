const WPM = 265 // Reading speed for the average reader in Word per minute (WPM)

/**
 * Calculate estimated reading time
 * @param {string} content
 * @returns {object} ReadTime in minutes and wordCount
 */
export const readTime = (content) => {
  if (!content) {
    return { readTime: 0, wordCount: 0 }
  }

  const wordCount = content.trim().split(/\s+/).length
  const readTime = Math.ceil(wordCount / WPM)

  return { readTime, wordCount }
}

/**
 * Render string with readtime and wordCount
 * @param {{wordCount, readTime}} readTime ReadTime in minutes and wordCount
 * @returns {string}
 */
export const formatReadTime = ({ wordCount, readTime }) => {
  return `${wordCount === 1 ? `${wordCount} word` : `${wordCount} words`}. ${readTime} min read`
}
