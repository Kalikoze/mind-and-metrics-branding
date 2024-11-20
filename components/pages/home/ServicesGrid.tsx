import React from 'react';
import Link from 'next/link';
import {
  RiLightbulbFlashLine,
  RiCodeBoxLine,
  RiMegaphoneLine,
  RiBarChartBoxLine
} from 'react-icons/ri';
import { HiOutlineArrowRight } from 'react-icons/hi2';
import { useState } from 'react';
import ScrambleText from '@/components/common/ScrambleText';
import CircuitOverlay from '@/components/common/CircuitOverlay';
import ServiceCard from './ServiceCard';

const services = [
  {
    icon: RiLightbulbFlashLine,
    title: "Brand Identity and Strategy",
    description: "Transform your brand into a strategic asset that resonates with your target audience and drives business growth."
  },
  {
    icon: RiCodeBoxLine,
    title: "Website Development & SEO",
    description: "Build a site that drives success through modern development practices and search engine optimization strategies."
  },
  {
    icon: RiMegaphoneLine,
    title: "Digital Marketing & Content Management",
    description: "Tailored content and marketing strategies to drive engagement and establish your brand's digital presence."
  },
  {
    icon: RiBarChartBoxLine,
    title: "Consulting & Market Research",
    description: "Tailored research and consulting services to inform your strategic decisions and accelerate growth."
  }
];

const ServicesGrid = () => {
  const [viewAllHovering, setViewAllHovering] = useState(false);

  return (
    <section data-cy="services-section" className="relative bg-neutral-50 py-20 overflow-hidden">
      <CircuitOverlay />
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <header className="text-center mb-16">
          <h2 data-cy="services-title" className="text-3xl md:text-4xl font-serif text-secondary-400 mb-4">
            Total B2B Business Suite
          </h2>
          <p data-cy="services-subtitle" className="text-secondary-500 text-lg max-w-2xl mx-auto">
            Ready to scale your business with experts who truly understand your vision and goals?
          </p>
        </header>

        <ul className="grid grid-cols-1 md:grid-cols-2 gap-8 list-none p-0">
          {services.map((service, index) => (
            <ServiceCard
              key={index}
              icon={service.icon}
              title={service.title}
              description={service.description}
            />
          ))}
        </ul>

        <footer className="text-center mt-16">
          <Link
            data-cy="explore-services"
            href="/services"
            onMouseEnter={() => setViewAllHovering(true)}
            onMouseLeave={() => setViewAllHovering(false)}
            className="font-sans px-8 py-3.5 border-2 border-secondary-400 text-secondary-400 
                     rounded-lg flex items-center space-x-2 inline-flex
                     transition-all duration-200 w-[200px] justify-center
                     hover:bg-secondary-400 hover:text-white hover:scale-105"
          >
            <HiOutlineArrowRight className="w-5 h-5 shrink-0" aria-hidden="true" />
            <span className="w-[120px] text-center">
              <ScrambleText text="Learn More" isHovering={viewAllHovering} />
            </span>
          </Link>
        </footer>
      </div>
    </section>
  );
};

export default ServicesGrid; 