import type { Metadata } from "next";
import MainNav from "@/components/common/MainNav";
import './globals.css'
import { gfsDidot, jost } from './fonts'
import Footer from "@/components/common/Footer";
import CustomToastContainer from '@/components/common/Notifications/ToastContainer';

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
        <CustomToastContainer />
      </body>
    </html>
  )
}
