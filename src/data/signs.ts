import signData from './data.json' assert { type: 'json' }

export type LocalizedText = {
  en: string
  km?: string
}

export type SignSprite = {
  page: number
  x: number
  y: number
  width: number
  height: number
}

export type SignItem = {
  id: string
  sprite: SignSprite
  question: string
  prompt: LocalizedText
  answer: LocalizedText
  alt: string
  image?: string
}

export const SPRITE_SHEET_DIMENSIONS = {
  width: 792,
  height: 1224,
}

export const SPRITE_PAGES: Record<number, string> = {
  1: '/assets/ca-road-signs/ca-road-signs-1.svg',
  2: '/assets/ca-road-signs/ca-road-signs-2.svg',
  3: '/assets/ca-road-signs/ca-road-signs-3.svg',
  4: '/assets/ca-road-signs/ca-road-signs-4.svg',
  5: '/assets/ca-road-signs/ca-road-signs-5.svg',
  6: '/assets/ca-road-signs/ca-road-signs-6.svg',
  7: '/assets/ca-road-signs/ca-road-signs-7.svg',
  8: '/assets/ca-road-signs/ca-road-signs-8.svg',
  9: '/assets/ca-road-signs/ca-road-signs-9.svg',
  10: '/assets/ca-road-signs/ca-road-signs-10.svg',
  11: '/assets/ca-road-signs/ca-road-signs-11.svg',
  12: '/assets/ca-road-signs/ca-road-signs-12.svg',
  13: '/assets/ca-road-signs/ca-road-signs-13.svg',
  14: '/assets/ca-road-signs/ca-road-signs-14.svg',
  15: '/assets/ca-road-signs/ca-road-signs-15.svg',
  16: '/assets/ca-road-signs/ca-road-signs-16.svg',
}

export const signItems: SignItem[] = signData
