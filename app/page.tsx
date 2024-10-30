"use client";

import Hero from '../components/Hero';
import IntroSection from '../components/IntroSection';
import ServicesGrid from '../components/ServicesGrid';
import PricingPreview from '../components/PricingPreview';
import SocialProof from '../components/SocialProof';

export default function Home() {
  return (
    <main>
      <Hero
        title="Data Driven Tailored Excellence"
        subtitle="We empower business to unlock sustainable growth through strategic branding, marketing, and web technologies."
        primaryButton={{
          text: "Get Started",
          href: "/get-started"
        }}
        secondaryButton={{
          text: "Contact Us",
          href: "/contact"
        }}
      />
      <IntroSection />
      <ServicesGrid />
      <PricingPreview />
      <SocialProof />
    </main>
  );
}
