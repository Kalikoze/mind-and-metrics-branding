import React from 'react';
import Image from 'next/image';
import GraphingBackground from '@/public/assets/logos/graphing-background.svg';
import SpiralDesign from '@/public/assets/logos/spiral-design.svg';

interface HeroProps {
  title: string;
  subtitle: string;
  ctaText: string;
  onCtaClick: () => void;
}

const Hero: React.FC<HeroProps> = ({ title, subtitle, ctaText, onCtaClick }) => {
  return (
    <div className="relative overflow-hidden bg-background min-h-screen flex items-center">
      {/* Background SVGs */}
      <div className="absolute inset-0 z-0">
        <Image
          src={GraphingBackground}
          alt="Background design"
          layout="fill"
          objectFit="cover"
          className="opacity-50"
        />
        <Image
          src={SpiralDesign}
          alt="Background design"
          layout="fill"
          objectFit="cover"
          className="opacity-50"
        />
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="font-serif text-5xl sm:text-6xl font-bold mb-6 text-primary-700">
            {title}
          </h1>
          <h2 className="font-sans text-xl sm:text-2xl mb-8 text-gray-700">
            {subtitle}
          </h2>
          <button
            onClick={onCtaClick}
            className="font-sans px-8 py-3 bg-secondary-600 text-white font-semibold rounded-full 
                       transition duration-300 ease-in-out transform hover:scale-105 
                       hover:bg-secondary-700 hover:shadow-lg focus:outline-none focus:ring-2 
                       focus:ring-secondary-500 focus:ring-opacity-50"
          >
            {ctaText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Hero;
