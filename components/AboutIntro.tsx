import React from 'react';
import CircuitOverlay from './CircuitOverlay';

const AboutIntro = () => {
  const stats = [
    { value: '100%', label: 'Client Retention Rate' },
    { value: '10+', label: 'Years Combined Experience' },
    { value: '$42K', label: 'Average Annual Savings' }
  ];

  return (
    <section className="relative overflow-hidden bg-neutral-50 py-24">
      <CircuitOverlay />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <h2 className="font-serif text-4xl text-secondary-400 mb-8 text-center">
            Dedicated Partners in Your Growth
          </h2>
          
          <div className="space-y-8 text-lg text-secondary-500 leading-relaxed">
            <p>
              We work exclusively with B2B companies serious about scaling efficiently while maintaining 
              their reputation. Our team knows that <span className="text-secondary-400 font-semibold">sustainable growth</span> takes 
              a mix of strategy, precision, and data-backed insights.
            </p>
            
            <p>
              At Mind & Metrics, we build <span className="text-secondary-400 font-semibold">collaborative relationships</span>—becoming 
              trusted partners on your journey toward sustainable success. Whether it's enhancing your brand, 
              optimizing your web presence, or driving marketing performance, we're with you at every step.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="font-serif text-3xl text-secondary-400 mb-2">
                  {stat.value}
                </div>
                <div className="text-secondary-500">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutIntro; 