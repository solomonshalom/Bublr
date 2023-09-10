export const truncate = (words: string, maxWords: number): string => {
  const split: string[] = words.split(' ');

  if (split.length <= maxWords) return words;

  return split.slice(0, maxWords).join(' ') + '...';
}