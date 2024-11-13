"use client";

import Hero from '@/components/common/Hero';
import ServicesGrid from '@/components/pages/home/ServicesGrid';
import PricingPreview from '@/components/pages/home/PricingPreview';
import ClientShowcase from '@/components/pages/home/ClientShowcase';

export default function Home() {
  return (
    <main>
      <Hero
        title="Data Driven Tailored Excellence"
        subtitle="Your Vision, Our Expertise — Uniting Strategy and Story"
        primaryButton={{
          text: "Get Started",
          href: "/get-started"
        }}
        secondaryButton={{
          text: "Contact Us",
          href: "/contact"
        }}
      />
      <ClientShowcase />
      <ServicesGrid />
      <PricingPreview />
    </main>
  );
}
