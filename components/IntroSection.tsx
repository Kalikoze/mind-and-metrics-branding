import React from 'react';

const IntroSection = () => {
  return (
    <section data-cy="intro-section" className="bg-neutral-50 py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div>
            <h2 data-cy="intro-title" className="font-serif text-3xl md:text-4xl text-secondary-400 mb-8
                         [text-wrap:balance]">
              Strategic Partners for Reputable B2B Leaders
            </h2>
            
            <p data-cy="intro-description" className="font-sans text-lg md:text-xl text-secondary-500 leading-relaxed
                        [text-wrap:balance] mx-auto max-w-3xl">
              At Mind & Metrics, we specialize in working with established B2B businesses 
              ready to scale. Our subscription-based services remove operational roadblocks, 
              giving you time to focus on what matters most—driving revenue, maintaining your 
              reputation, and staying ahead of digital trends.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default IntroSection;
