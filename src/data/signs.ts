import signData from './data.json' assert { type: 'json' }

export type LocalizedText = {
  en: string
  kh?: string
}

export type SignSprite = {
  page: number
  x: number
  y: number
  width: number
  height: number
}

export type SignItem = {
  id: number
  sprite: SignSprite
  question: LocalizedText
  answer: LocalizedText
  alt: string
  category: string
  image?: string
}

export type SpriteSheet = {
  src: string
  width: number
  height: number
}

const DEFAULT_SHEET_DIMENSIONS = {
  width: 792,
  height: 1224,
}


export const SPRITE_PAGES: Record<number, SpriteSheet> = {
  1: { src: '/assets/ca-road-signs/ca-road-signs-1.svg', ...DEFAULT_SHEET_DIMENSIONS },
  2: { src: '/assets/ca-road-signs/ca-road-signs-2.svg', ...DEFAULT_SHEET_DIMENSIONS },
  3: { src: '/assets/ca-road-signs/ca-road-signs-3.svg', ...DEFAULT_SHEET_DIMENSIONS },
  4: { src: '/assets/ca-road-signs/ca-road-signs-4.svg', ...DEFAULT_SHEET_DIMENSIONS },
  5: { src: '/assets/ca-road-signs/ca-road-signs-5.svg', ...DEFAULT_SHEET_DIMENSIONS },
  6: { src: '/assets/ca-road-signs/ca-road-signs-6.svg', ...DEFAULT_SHEET_DIMENSIONS },
  7: { src: '/assets/ca-road-signs/ca-road-signs-7.svg', ...DEFAULT_SHEET_DIMENSIONS },
  8: { src: '/assets/ca-road-signs/ca-road-signs-8.svg', ...DEFAULT_SHEET_DIMENSIONS },
  9: { src: '/assets/ca-road-signs/ca-road-signs-9.svg', ...DEFAULT_SHEET_DIMENSIONS },
  10: { src: '/assets/ca-road-signs/ca-road-signs-10.svg', ...DEFAULT_SHEET_DIMENSIONS },
  11: { src: '/assets/ca-road-signs/ca-road-signs-11.svg', ...DEFAULT_SHEET_DIMENSIONS },
  12: { src: '/assets/ca-road-signs/ca-road-signs-12.svg', ...DEFAULT_SHEET_DIMENSIONS },
  13: { src: '/assets/ca-road-signs/ca-road-signs-13.svg', ...DEFAULT_SHEET_DIMENSIONS },
  14: { src: '/assets/ca-road-signs/ca-road-signs-14.svg', ...DEFAULT_SHEET_DIMENSIONS },
  15: { src: '/assets/ca-road-signs/ca-road-signs-15.svg', ...DEFAULT_SHEET_DIMENSIONS },
  16: { src: '/assets/ca-road-signs/ca-road-signs-16.svg', ...DEFAULT_SHEET_DIMENSIONS },
  17: { src: '/assets/ca-road-signs/Page-1.svg', width: 816, height: 1344 },
  18: { src: '/assets/ca-road-signs/Page-2.svg', width: 816, height: 1344 },
}

export const signItems: SignItem[] = signData
