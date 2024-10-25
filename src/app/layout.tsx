import './globals.css'
import { gfsDidot, poppins } from './fonts'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${gfsDidot.variable} ${poppins.variable}`}>
      <body>{children}</body>
    </html>
  )
}
