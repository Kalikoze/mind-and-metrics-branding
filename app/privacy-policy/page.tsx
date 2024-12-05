import Hero from '@/components/common/Hero';
import ValueProposition from '@/components/common/ValueProposition';
import PrivacyContent from '@/components/pages/privacy-policy/PrivacyContent';
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'A concise overview stating that Mind & Metrics is dedicated to transparency and data security, focusing on minimal data collection and robust protection practices. It invites readers to learn more about how information is collected, used, and protected.',
  openGraph: {
    title: 'Privacy Policy | Mind & Metrics Branding',
    description: 'A concise overview stating that Mind & Metrics is dedicated to transparency and data security, focusing on minimal data collection and robust protection practices. It invites readers to learn more about how information is collected, used, and protected.',
    type: 'website',
    locale: 'en_US',
    url: 'https://mindandmetricsbranding.com/privacy-policy',
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
    title: 'Privacy Policy | Mind & Metrics Branding',
    description: 'A concise overview stating that Mind & Metrics is dedicated to transparency and data security, focusing on minimal data collection and robust protection practices. It invites readers to learn more about how information is collected, used, and protected.',
    images: ['https://mindandmetricsbranding.com/og-image.png'],
  },
};

export default function Privacy() {
  const valuePropositionData = {
    title: "Your Privacy Matters",
    paragraphs: [
      {
        text: "At Mind & Metrics, we believe in transparency and simplicity when it comes to your data. We maintain minimal data collection practices, focusing only on the essential information needed to communicate with you and deliver our services effectively.",
        highlights: ["transparency", "simplicity"]
      },
      {
        text: "Our commitment to privacy means secure communication channels, industry-standard encryption, and clear data practices. We process information only for specific business purposes and maintain professional email communications through trusted providers.",
        highlights: ["secure communication", "clear data practices"]
      },
      {
        text: "Last Updated: " + new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
      }
    ],
    stats: [
      { value: 'HTTPS', label: 'Secure Transmission' },
      { value: 'Zero', label: 'Data Reselling' },
      { value: 'Direct', label: 'No Third-Party Sharing' }
    ]
  };

  return (
    <main>
      <Hero
        variant="privacy"
        title="Privacy Policy"
        subtitle="How we collect, use, and protect your information"
      />
      <ValueProposition {...valuePropositionData} />
      <PrivacyContent />
    </main>
  );
} 