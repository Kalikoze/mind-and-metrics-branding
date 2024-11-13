'use client';

import ContactInfo from '@/components/Contact/ContactInfo';
import ContactForm from '@/components/Contact/ContactForm';
import CircuitOverlay from '@/components/common/CircuitOverlay';

export default function ContactSection() {
  return (
    <section className="relative bg-neutral-50 py-20 overflow-hidden" data-cy="contact-section">
      <CircuitOverlay />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12">
          <ContactInfo />
          <ContactForm />
        </div>
      </div>
    </section>
  );
} 