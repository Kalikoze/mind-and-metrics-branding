'use client';

import React from 'react';
import { 
  HiPuzzlePiece, 
  HiScale, 
  HiChartBar, 
  HiRocketLaunch 
} from 'react-icons/hi2';
import ValuePropCard from './ValuePropCard';
import ScrambleButton from '@/components/common/ScrambleButton';

const valueProps = [
  {
    icon: HiPuzzlePiece,
    title: "Tailored Solutions",
    description: "Strategies custom-crafted to meet your unique business needs and objectives"
  },
  {
    icon: HiScale,
    title: "Flexible Scaling",
    description: "Easily adapt services and resources as your business evolves"
  },
  {
    icon: HiChartBar,
    title: "Transparent ROI",
    description: "Detailed reporting and metrics to clearly demonstrate value and impact"
  }
];

const PricingPreview = () => {

  return (
    <section data-cy="pricing-preview-section" className="bg-white py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <header className="text-center mb-16">
          <h2 data-cy="pricing-preview-title" className="text-3xl md:text-4xl font-serif text-dark-800 mb-4">
            Transparent Value-Based Pricing
          </h2>
          <p data-cy="pricing-preview-subtitle" className="text-dark-600 text-lg max-w-2xl mx-auto">
            A pricing model designed to align with your goals and grow with your success.
          </p>
        </header>

        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {valueProps.map((prop) => (
            <ValuePropCard key={prop.title} {...prop} />
          ))}
        </div>

        <section data-cy="pricing-cta-card" 
              className="bg-neutral-50 rounded-2xl p-12 border-2 border-neutral-200
                        transition-all duration-300 hover:border-secondary-400
                        hover:shadow-lg text-center">
          <h3 data-cy="pricing-cta-title" className="text-2xl font-serif text-dark-800 mb-6">
            Ready to Build Your Custom Solution?
          </h3>
          <p data-cy="pricing-cta-description" className="text-dark-600 max-w-2xl mx-auto mb-8">
            Complete a quick quiz for an instant estimate. We&apos;ll review your submission and reach out to schedule a consultation for your tailored solution. No commitment required.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center">
          <ScrambleButton
              text="Get Started"
              href="/get-started"
              icon={HiRocketLaunch}
              variant="primary"
              dataCy="pricing-get-started-button"
            />
          </div>
        </section>
      </div>
    </section>
  );
};

export default PricingPreview; 