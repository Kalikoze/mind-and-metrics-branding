"use client";

import Hero from '@/components/common/Hero';
import ValueProposition from '@/components/common/ValueProposition';
import ServicesGrid from '@/components/pages/home/ServicesGrid';
import PricingPreview from '@/components/pages/home/PricingPreview';
import ClientShowcase from '@/components/pages/home/ClientShowcase';

export default function Home() {
  const valuePropositionData = {
    title: "Dedicated Partners in Your Growth",
    paragraphs: [
      {
        text: "We work exclusively with B2B companies serious about scaling efficiently while maintaining their reputation. Our team knows that sustainable growth takes a mix of strategy, precision, and data-backed insights.",
        highlights: ["sustainable growth"]
      },
      {
        text: "At Mind & Metrics, we build collaborative relationships—becoming trusted partners on your journey toward sustainable success. Whether it's enhancing your brand, optimizing your web presence, or driving marketing performance, we're with you at every step.",
        highlights: ["collaborative relationships"]
      }
    ],
    stats: [
      { value: '100%', label: 'Client Retention Rate' },
      { value: '1yr+', label: 'Average Client Partnership' },
      { value: '5', label: 'Full-Scale Projects Launched' }
    ]
  };

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
      <ValueProposition {...valuePropositionData} />
      <ClientShowcase />
      <ServicesGrid />
      <PricingPreview />
    </main>
  );
}
