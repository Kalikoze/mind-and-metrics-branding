"use client";

import Hero from '@/components/Hero';
import ServiceDetails from '@/components/ServiceDetails';

export default function Services() {
  return (
    <main>
      <Hero
        title="Strategic Solutions for Business Growth"
        subtitle="Comprehensive B2B services designed to transform your digital presence and drive measurable results."
        showBackground={false}
      />
      <ServiceDetails />
    </main>
  );
} 