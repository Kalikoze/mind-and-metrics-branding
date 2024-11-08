"use client";

import Hero from '@/components/Hero';
import ServicesGrid from '@/components/ServicesGrid';
import PricingPreview from '@/components/PricingPreview';
import SocialProof from '@/components/SocialProof';

export default function Home() {
  return (
    <main>
      <Hero
        title="Data Driven Tailored Excellence"
        subtitle="Compelling branding and marketing strategies designed for YOUR business."
        primaryButton={{
          text: "Get A Quote",
          href: "/get-started"
        }}
        secondaryButton={{
          text: "Contact Us",
          href: "/contact"
        }}
      />
      <SocialProof />
      <ServicesGrid />
      <PricingPreview />
    </main>
  );
}
