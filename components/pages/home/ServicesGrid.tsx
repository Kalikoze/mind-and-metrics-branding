'use client';

import React from 'react';
import Link from 'next/link';
import { HiOutlineArrowRight } from 'react-icons/hi2';
import { useState } from 'react';
import ScrambleText from '@/components/common/ScrambleText';
import CircuitOverlay from '@/components/common/CircuitOverlay';
import ServiceCard from './ServiceCard';
import { homeServices } from '@/data/homeServices';
import ScrambleButton from '@/components/common/ScrambleButton';

const ServicesGrid = () => {
  const [viewAllHovering, setViewAllHovering] = useState(false);

  return (
    <section data-cy="services-section" className="relative bg-neutral-50 py-20 overflow-hidden">
      <CircuitOverlay />
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <header className="text-center mb-16">
          <h2 data-cy="services-title" 
              className="text-3xl md:text-4xl font-serif text-dark-800 mb-4">
            Total B2B Business Suite
          </h2>
          <p data-cy="services-subtitle" 
             className="text-dark-600 text-lg max-w-2xl mx-auto">
            Ready to scale your business with experts who truly understand your vision and goals?
          </p>
        </header>

        <ul className="grid grid-cols-1 md:grid-cols-2 gap-8 list-none p-0">
          {homeServices.map((service, index) => (
            <ServiceCard
              key={index}
              icon={service.icon}
              title={service.title}
              description={service.description}
              id={service.id}
            />
          ))}
        </ul>

        <footer className="text-center mt-16">
          <ScrambleButton
            text="Learn More"
            href="/services"
            icon={HiOutlineArrowRight}
            variant="secondary"
            dataCy="explore-services"
          />
        </footer>
      </div>
    </section>
  );
};

export default ServicesGrid; 