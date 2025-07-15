import filter from 'leo-profanity'

export const cleanProfanity = (str) => {
  const cleanedEnglishProfanity = filter.clean(str)
  filter.loadDictionary('ru')
  const cleanedRussianProfanity = filter.clean(cleanedEnglishProfanity)
  filter.reset()
  return cleanedRussianProfanity
}
