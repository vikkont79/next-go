export const TRANSPORT_OPTIONS = ['plane', 'bus', 'bicycle', 'run',] as const

export const HOBBY_OPTIONS = [
  { key: 'sport', label: 'Спортзал' },
  { key: 'hookah', label: 'Кальян' },
  { key: 'couch', label: 'Диван' }
] as const

export const MUSIC_OPTIONS = [
  { key: 'heavy', label: 'Тяжёлый рок' },
  { key: 'rap', label: 'Русский рэп' },
  { key: 'eurodance', label: 'Евроденс' }
] as const

export const FOOD_OPTIONS = [
  { key: 'meat', label: 'Мясоед' },
  { key: 'pp', label: 'ПП' },
  { key: 'vegan', label: 'Веган-сыроед' }
] as const

export const FILTERS_TOGGLE_STYLE = { textTransform: 'none' } as const

export const CONTINENTS = ['Европа', 'Азия', 'Африка', 'Америка', 'Острова'] as const
