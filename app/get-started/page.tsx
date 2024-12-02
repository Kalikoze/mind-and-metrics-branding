import QuizComponent from '@/components/Quiz/QuizComponent';
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: 'Get Started',
  description: 'Begin your journey with Mind & Metrics by assessing your business needs through our comprehensive quiz. Discover tailored solutions to elevate your brand and achieve your goals.',
  openGraph: {
    title: 'Get Started | Mind & Metrics Branding',
    description: 'Begin your journey with Mind & Metrics by assessing your business needs through our comprehensive quiz. Discover tailored solutions to elevate your brand and achieve your goals.',
    type: 'website',
    locale: 'en_US',
    url: 'https://mindandmetricsbranding.com/get-started',
    siteName: 'Mind & Metrics Branding',
    images: [
      {
        url: 'https://mindandmetricsbranding.com/og-image.png',
        width: 2400,
        height: 1260,
        type: 'image/png',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Get Started | Mind & Metrics Branding',
    description: 'Begin your journey with Mind & Metrics by assessing your business needs through our comprehensive quiz. Discover tailored solutions to elevate your brand and achieve your goals.',
    images: ['https://mindandmetricsbranding.com/og-image.png'],
  },
};

export default function GetStarted() {
  return (
    <main className="min-h-screen bg-neutral-50">
      <QuizComponent />
    </main>
  );
}
