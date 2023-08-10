export const truncate = (words, maxWords) => {
  const split = words.split(' ')

  if (split.length <= maxWords) return words

  return split.slice(0, maxWords).join(' ') + '...'
}
