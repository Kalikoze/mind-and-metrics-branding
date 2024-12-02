import QuizComponent from '@/components/Quiz/QuizComponent';
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: 'Get Started',
  description: 'Take our quick quiz to build a custom growth strategy for your business. Explore options for branding, web design, marketing, and consulting to meet your needs and budget.',
  openGraph: {
    title: 'Get Started | Mind & Metrics Branding',
    description: 'Take our quick quiz to build a custom growth strategy for your business. Explore options for branding, web design, marketing, and consulting to meet your needs and budget.',
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
    description: 'Take our quick quiz to build a custom growth strategy for your business. Explore options for branding, web design, marketing, and consulting to meet your needs and budget.',
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
