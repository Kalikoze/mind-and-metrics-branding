'use client';

import React from 'react';
import Image from 'next/image';
import { HiRocketLaunch, HiEnvelope } from 'react-icons/hi2';
import BrandM from '@/public/assets/graphics/m&m-logo.svg';
import ScrambleButton from './ScrambleButton';

interface HeroProps {
  title: string;
  subtitle: string;
  primaryButton?: {
    text: string;
    href: string;
  };
  secondaryButton?: {
    text: string;
    href: string;
  };
  variant?: 'default' | 'home' | 'about';
  overlayElements?: React.ReactNode;
}

const Hero: React.FC<HeroProps> = ({
  title,
  subtitle,
  primaryButton,
  secondaryButton,
  variant = 'default',
}) => {

  return (
    <div className="relative overflow-hidden min-h-[80vh] py-20 flex items-center" data-cy="hero-section">
      <div className="absolute inset-0 bg-white">
        <div className="absolute inset-0 opacity-10">
          {[...Array(6)].map((_, i) => (
            <div
              key={`accent-${i}`}
              className="absolute transform"
              style={{
                top: `${i * 15 + 10}%`,
                left: `${((i + 1) % 3) * 30 + 20}%`,
                width: '20%',
                height: '20%',
                background: `linear-gradient(145deg, ${i % 2 ? '#436EB1' : '#2D4976'} 0%, transparent 80%)`,
                clipPath: 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)',
                transform: `rotate(${i * 30}deg)`,
              }}
            />
          ))}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 flex flex-col md:flex-row items-center">
        <div className="max-w-3xl mx-auto text-center md:text-left md:w-1/2">
          <h1 data-cy="hero-title" 
              className="font-serif text-4xl sm:text-6xl font-bold mb-6
                        [text-wrap:balance] bg-clip-text text-transparent 
                        bg-gradient-to-r from-primary-100 to-primary-500">
            {title}
          </h1>
          <h2 data-cy="hero-subtitle" 
              className="font-sans text-xl sm:text-2xl text-dark-600 mb-12">
            {subtitle}
          </h2>

          {(primaryButton || secondaryButton) && (
            <div className="flex flex-col sm:flex-row items-center justify-start gap-4 sm:space-y-0">
              {primaryButton && (
                <ScrambleButton
                  text={primaryButton.text}
                  href={primaryButton.href}
                  icon={HiRocketLaunch}
                  variant="primary"
                  dataCy="hero-primary-cta"
                />
              )}

              {secondaryButton && (
                <ScrambleButton
                  text={secondaryButton.text}
                  href={secondaryButton.href}
                  icon={HiEnvelope}
                  variant="secondary"
                  dataCy="hero-secondary-cta"
                />
              )}
            </div>
          )}
        </div>
        <div className="md:w-1/2 flex justify-center mt-8 md:mt-0">
          <div className="relative w-[300px] h-[300px] sm:w-[400px] sm:h-[400px]">
            <div className="absolute inset-0 bg-gradient-to-tr from-primary-100/20 to-primary-400/20 
                          rounded-full filter blur-3xl transform -rotate-12" />
            <Image 
              src={BrandM} 
              alt="Brand M" 
              fill
              className="object-contain"
              priority
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
