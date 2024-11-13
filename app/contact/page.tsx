'use client';

import Hero from '@/components/common/Hero';
import ContactSection from '@/components/Contact/ContactSection';

export default function Contact() {
  return (
    <main>
      <Hero
        title="Start Your Growth Journey"
        subtitle="Ready to transform your brand with data-driven strategies? Let's discuss how we can help your business reach its full potential."
        showBackground={false}
      />
      <ContactSection />
    </main>
  );
} 