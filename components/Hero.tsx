import React from 'react';
import Image from 'next/image';
import GraphingBackground from '@/public/assets/logos/graphing-background.svg';
import SpiralDesign from '@/public/assets/logos/spiral-design.svg';
import { HiOutlineEnvelope, HiOutlineRocketLaunch } from 'react-icons/hi2';
import Link from 'next/link';

interface HeroProps {
  title: string;
  subtitle: string;
  primaryButton: {
    text: string;
    href: string;
  };
  secondaryButton: {
    text: string;
    href: string;
  };
}

const Hero: React.FC<HeroProps> = ({ 
  title, 
  subtitle, 
  primaryButton, 
  secondaryButton 
}) => {
  return (
    <div className="relative overflow-hidden bg-background min-h-[70vh] py-20 flex items-center" data-cy="hero-section">
      {/* Background SVGs */}
      <div className="absolute inset-0 z-0">
        <Image
          src={GraphingBackground}
          alt="Background design"
          fill
          className="opacity-50 object-cover"
        />
        <Image
          src={SpiralDesign}
          alt="Background design"
          fill
          className="opacity-50 object-cover"
        />
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <h1 data-cy="hero-title" className="font-serif text-5xl sm:text-6xl font-bold mb-6 text-secondary-600
                         [text-wrap:balance] bg-clip-text text-transparent 
                         bg-gradient-to-r from-secondary-600 to-secondary-400">
            {title}
          </h1>
          <h2 data-cy="hero-subtitle" className="font-sans text-xl sm:text-2xl mb-12 text-secondary-500">
            {subtitle}
          </h2>
          
          <div className="flex items-center justify-center space-x-4">
            <Link
              href={primaryButton.href}
              data-cy="hero-primary-cta"
              className="font-sans px-8 py-3.5 bg-secondary-400 text-white font-medium
                         rounded-lg flex items-center space-x-2 border-2 border-secondary-400
                         transition-all duration-300
                         hover:bg-transparent hover:text-secondary-400 hover:scale-105"
            >
              <HiOutlineRocketLaunch className="w-5 h-5" />
              <span>{primaryButton.text}</span>
            </Link>

            <Link
              href={secondaryButton.href}
              data-cy="hero-secondary-cta"
              className="font-sans px-8 py-3.5 border-2 border-secondary-400 text-secondary-400 
                         rounded-lg flex items-center space-x-2
                         transition-all duration-300
                         hover:bg-secondary-400 hover:text-white hover:scale-105"
            >
              <HiOutlineEnvelope className="w-5 h-5" />
              <span>{secondaryButton.text}</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
