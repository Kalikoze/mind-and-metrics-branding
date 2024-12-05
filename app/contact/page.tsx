import Hero from '@/components/common/Hero';
import ContactSection from '@/components/Contact/ContactSection';
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Connect with Mind & Metrics to elevate your brand with data-driven strategies and expert digital solutions. Reach out today to unlock your business\'s full potential and drive lasting growth.',
  openGraph: {
    title: 'Contact | Mind & Metrics Branding',
    description: 'Connect with Mind & Metrics to elevate your brand with data-driven strategies and expert digital solutions. Reach out today to unlock your business\'s full potential and drive lasting growth.',
    type: 'website',
    locale: 'en_US',
    url: 'https://mindandmetricsbranding.com/contact',
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
    title: 'Contact | Mind & Metrics Branding',
    description: 'Connect with Mind & Metrics to elevate your brand with data-driven strategies and expert digital solutions. Reach out today to unlock your business\'s full potential and drive lasting growth.',
    images: ['https://mindandmetricsbranding.com/og-image.png'],
  },
};

export default function Contact() {
  return (
    <main>
      <Hero
        variant="contact"
        title="Begin Your Brand Transformation"
        subtitle="Ready to elevate your brand with data-driven strategies? Let's explore how we can help your business unlock its full potential and drive lasting growth."
      />
      <ContactSection />
    </main>
  );
} 