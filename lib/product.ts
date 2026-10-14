export const product = {
  name: 'Lune One',
  tagline: 'Adaptive noise cancelling headphones',
  price: 349,
  image: '/images/lune-headphones.png',
  rating: 4.9,
  reviews: 2184,
  finishes: [
    { id: 'lunar', label: 'Lunar Silver', swatch: '#c9ced6' },
    { id: 'basalt', label: 'Basalt', swatch: '#3a3a3c' },
    { id: 'regolith', label: 'Regolith', swatch: '#a39888' },
  ],
  specs: [
    { label: 'Battery', value: '60 hrs' },
    { label: 'ANC depth', value: '-42 dB' },
    { label: 'Weight', value: '248 g' },
  ],
} as const

export type FinishId = (typeof product.finishes)[number]['id']

export const SHIPPING = 0
export const TAX_RATE = 0.08

export function formatPrice(value: number) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(value)
}
