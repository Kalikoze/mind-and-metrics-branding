"use client";

import Hero from '../components/Hero';

export default function Home() {
  const handleCtaClick = () => {
    // Handle CTA button click
    console.log('CTA clicked');
  };

  return (
    <main>
      <Hero
        title="Data Driven Tailored Excellence"
        subtitle="Empowering B2B businesses with reliable, data-driven marketing and branding services that support sustainable growth and long-term success."
        ctaText="YOUR CUSTOM SOLUTION AWAITS"
        onCtaClick={handleCtaClick}
      />
    </main>
  );
}
