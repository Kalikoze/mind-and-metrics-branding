import { Cormorant_Garamond, Jost } from 'next/font/google'

export const cormorantGaramond = Cormorant_Garamond({
  weight: ['400', '500', '600', '700'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-cormorant',
})

export const jost = Jost({
  weight: ['400', '700'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-jost',
})
