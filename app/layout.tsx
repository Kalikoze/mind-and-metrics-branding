import type { Metadata } from "next";
import MainNav from "@/components/common/MainNav";
import './globals.css'
import { gfsDidot, jost } from './fonts'
import Footer from "@/components/common/Footer";
import CustomToastContainer from '@/components/common/Notifications/ToastContainer';

export const metadata: Metadata = {
  metadataBase: new URL('https://mindandmetricsbranding.com'),
  title: {
    template: "%s | Mind & Metrics Branding",
    default: "Mind & Metrics Branding",
  },
  description: "Empowering B2B companies with tailored branding, website development, SEO, and marketing strategies. Trusted by industry leaders to deliver measurable growth and sustainable success.",
  robots: {
    index: true,
    follow: true,
    'max-image-preview': 'large',
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-video-preview': -1,
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: "website",
    description: "Empowering B2B companies with tailored branding, website development, SEO, and marketing strategies. Trusted by industry leaders to deliver measurable growth and sustainable success.",
    locale: "en_US",
    url: "https://mindandmetricsbranding.com",
    siteName: "Mind & Metrics Branding",
    images: [
      {
        url: "https://mindandmetricsbranding.com/og-image.png",
        width: 2400,
        height: 1260,
        type: "image/png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Mind & Metrics Branding",
    description: "Empowering B2B companies with tailored branding, website development, SEO, and marketing strategies. Trusted by industry leaders to deliver measurable growth and sustainable success.",
    images: ["https://mindandmetricsbranding.com/og-image.png"],
  },
  other: {
    'sitemap.xml': 'https://mindandmetricsbranding.com/sitemap.xml',
    'robots.txt': 'https://mindandmetricsbranding.com/robots.txt',
    'msapplication-TileImage': '/tile.png',
  },
  icons: {
    icon: 'favicon.ico'
  }
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
