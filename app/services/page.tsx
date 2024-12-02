import Hero from '@/components/common/Hero';
import ServiceDetails from '@/components/pages/services/ServiceDetails';
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: 'Services',
  description: 'Explore Mind & Metrics\' comprehensive B2B services, including brand identity, website development, SEO, digital marketing, and consulting. Transform your digital presence and drive measurable business results.',
  openGraph: {
    title: 'Services | Mind & Metrics Branding',
    description: 'Explore Mind & Metrics\' comprehensive B2B services, including brand identity, website development, SEO, digital marketing, and consulting. Transform your digital presence and drive measurable business results.',
    type: 'website',
    locale: 'en_US',
    url: 'https://mindandmetricsbranding.com/services',
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
    title: 'Services | Mind & Metrics Branding',
    description: 'Explore Mind & Metrics\' comprehensive B2B services, including brand identity, website development, SEO, digital marketing, and consulting. Transform your digital presence and drive measurable business results.',
    images: ['https://mindandmetricsbranding.com/og-image.png'],
  },
};

export default function Services() {
  return (
    <main>
      <Hero
        title="Strategic Solutions for Business Growth"
        subtitle="Comprehensive B2B services designed to transform your digital presence and drive measurable results."
      />
      <ServiceDetails />
    </main>
  );
} 