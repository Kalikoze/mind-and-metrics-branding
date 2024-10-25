import { GFS_Didot, Jost } from 'next/font/google'

export const gfsDidot = GFS_Didot({
  weight: '400',
  subsets: ['greek'],
  display: 'swap',
  variable: '--font-gfs-didot',
})

export const jost = Jost({
  weight: ['400', '700'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-jost',
})
