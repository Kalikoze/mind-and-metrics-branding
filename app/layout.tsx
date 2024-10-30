import type { Metadata } from "next";
import MainNav from "@/components/MainNav";
import './globals.css'
import { gfsDidot, jost } from './fonts'
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Mind & Metrics Branding",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${gfsDidot.variable} ${jost.variable}`}>
      <body>
        <MainNav />
        {children}
        <Footer />
      </body>
    </html>
  )
}
