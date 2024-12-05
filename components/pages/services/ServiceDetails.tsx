'use client';

import React from 'react';
import CircuitOverlay from '@/components/common/CircuitOverlay';
import { serviceDetails } from '@/data/serviceDetails';
import KeyFeatures from './KeyFeatures';
import ServiceDetailsSection from './ServiceDetailsSection';

const ServiceDetails = () => {
  return (
    <section className="services-container">
      {serviceDetails.map((service, index) => (
        <article
          key={service.id}
          id={service.id}
          data-cy={`service-section-${service.id}`}
          className={`relative ${index % 2 === 0 ? 'bg-neutral-50' : 'bg-white'} py-24`}
        >
          {index % 2 === 0 && <CircuitOverlay />}

          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <header className="text-center mb-16">
              <figure
                data-cy={`service-icon-${service.id}`}
                className={`${
                  index % 2 === 0 ? 'bg-white' : 'bg-primary-400'
                } p-8 rounded-full w-32 h-32 mb-8 mx-auto
                          flex items-center justify-center
                          shadow-lg`}
              >
                <service.icon className={`w-16 h-16 ${index % 2 === 0 ? 'text-primary-400' : 'text-white'}`} />
              </figure>
              <h2
                data-cy={`service-title-${service.id}`}
                className="font-serif text-3xl md:text-4xl text-dark-800 mb-4">
                {service.title}
              </h2>
              <p
                data-cy={`service-overview-${service.id}`}
                className="text-dark-600 text-lg leading-relaxed max-w-3xl mx-auto text-center">
                {service.overview}
              </p>
            </header>

            <div className="grid md:grid-cols-2 gap-8">
              <KeyFeatures 
                serviceId={service.id}
                keyPoints={service.keyPoints}
                isEvenSection={index % 2 === 0}
              />
              <ServiceDetailsSection 
                serviceId={service.id}
                offerings={service.offerings}
                isEvenSection={index % 2 === 0}
              />
            </div>
          </div>
        </article>
      ))}
    </section>
  );
};

export default ServiceDetails; 