import React, { useState } from 'react';
import Link from 'next/link';
import { HiOutlineArrowRight, HiOutlinePuzzlePiece, HiOutlineScale, HiOutlineChartBar, HiOutlineRocketLaunch, HiOutlineCurrencyDollar } from 'react-icons/hi2';
import ScrambleText from './ScrambleText';
import CircuitOverlay from './CircuitOverlay';

const valueProps = [
  {
    icon: HiOutlinePuzzlePiece,
    title: "Tailored Solutions",
    description: "Custom-built strategies that adapt to your specific business needs and goals"
  },
  {
    icon: HiOutlineScale,
    title: "Flexible Scaling",
    description: "Adjust services and resources as your business grows and evolves"
  },
  {
    icon: HiOutlineChartBar,
    title: "Transparent ROI",
    description: "Clear reporting and metrics to demonstrate value and impact"
  }
];

const PricingPreview = () => {
  const [primaryHover, setPrimaryHover] = useState(false);
  const [secondaryHover, setSecondaryHover] = useState(false);

  return (
    <section className="relative bg-neutral-50 py-20 overflow-hidden">
      <CircuitOverlay />
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-serif text-secondary-400 mb-4">
            Transparent Value-Based Pricing
          </h2>
          <p className="text-secondary-500 text-lg max-w-2xl mx-auto">
            Discover a pricing structure that aligns with your goals and scales with your success
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {valueProps.map((prop, index) => (
            <div 
              key={index}
              className="p-8 rounded-lg bg-white
                         border-2 border-neutral-200"
            >
              <div className="bg-neutral-50 p-4 rounded-full w-16 h-16 mb-6
                            flex items-center justify-center">
                <prop.icon className="w-8 h-8 text-secondary-400" />
              </div>
              <h3 className="text-xl font-serif text-secondary-500 mb-3">
                {prop.title}
              </h3>
              <p className="text-secondary-400 font-sans">
                {prop.description}
              </p>
            </div>
          ))}
        </div>

        <div className="bg-white rounded-2xl p-12 border-2 border-neutral-200
                      transition-all duration-300 hover:border-secondary-400
                      hover:shadow-lg text-center">
          <h3 className="text-2xl font-serif text-secondary-400 mb-6">
            Ready to Build Your Custom Solution?
          </h3>
          <p className="text-secondary-500 max-w-2xl mx-auto mb-8">
            Answer a few questions about your business needs and get a personalized 
            quote tailored to your goals. No commitment required.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/get-started"
              onMouseEnter={() => setPrimaryHover(true)}
              onMouseLeave={() => setPrimaryHover(false)}
              className="font-sans px-8 py-3.5 bg-secondary-400 text-white font-medium
                         rounded-lg flex items-center space-x-2 border-2 border-secondary-400
                         transition-all duration-300 w-[200px] justify-center
                         hover:bg-transparent hover:text-secondary-400 hover:scale-105"
            >
              <HiOutlineRocketLaunch className="w-5 h-5 shrink-0" />
              <span className="w-[120px] text-center">
                <ScrambleText text="Get Started" isHovering={primaryHover} />
              </span>
            </Link>
            
            <Link
              href="/pricing"
              onMouseEnter={() => setSecondaryHover(true)}
              onMouseLeave={() => setSecondaryHover(false)}
              className="font-sans px-8 py-3.5 border-2 border-secondary-400 text-secondary-400 
                         rounded-lg flex items-center space-x-2
                         transition-all duration-300 w-[200px] justify-center
                         hover:bg-secondary-400 hover:text-white hover:scale-105"
            >
              <HiOutlineCurrencyDollar className="w-5 h-5 shrink-0" />
              <span className="w-[120px] text-center">
                <ScrambleText text="View Pricing" isHovering={secondaryHover} />
              </span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PricingPreview; 