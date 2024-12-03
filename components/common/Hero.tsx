'use client';

import React from 'react';
import Image from 'next/image';
import { HiRocketLaunch, HiEnvelope, HiLightBulb, HiCamera, HiCommandLine, HiChartBar } from 'react-icons/hi2';
import BrandM from '@/public/assets/graphics/m&m-logo.svg';
import ScrambleButton from './ScrambleButton';
import StackedCards from '@/components/pages/about/StackedCards';

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
  // Add variant-specific background patterns
  const renderBackground = () => {
    console.log(variant)
    switch (variant) {
      case 'about':
        return (
          <div className="absolute inset-0 opacity-10">
            {[...Array(8)].map((_, i) => (
              <div
                key={`accent-${i}`}
                className="absolute transform transition-all duration-700 ease-in-out"
                style={{
                  top: `${i * 12 + 5}%`,
                  left: `${((i + 2) % 4) * 25 + 10}%`,
                  width: '15%',
                  height: '15%',
                  background: `linear-gradient(165deg, ${i % 2 ? '#385B94' : '#223759'
                    } 0%, transparent 90%)`,
                  clipPath: 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)',
                  transform: `rotate(${i * 45}deg) scale(${1 + (i % 3) * 0.2})`,
                }}
              />
            ))}
          </div>
        );
      // ... other variant cases ...
      default:
        return (
          // Your existing background pattern
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
        );
    }
  };

  return (
    <section className="relative overflow-hidden min-h-[80vh] py-20 flex items-center" data-cy="hero-section">
      <div className="absolute inset-0 bg-white" aria-hidden="true">
        {renderBackground()}
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 flex flex-col md:flex-row items-center">
        <header className="max-w-3xl mx-auto text-center md:text-left md:w-1/2">
          <h1 data-cy="hero-title"
            className="font-serif text-4xl sm:text-6xl font-bold mb-6
                      [text-wrap:balance] bg-clip-text text-transparent 
                      bg-gradient-to-r from-primary-100 to-primary-500 p-2">
            {title}
          </h1>
          <p data-cy="hero-subtitle"
            className="font-sans text-xl sm:text-2xl text-dark-600 mb-12">
            {subtitle}
          </p>

          {(primaryButton || secondaryButton) && (
            <nav className="flex flex-col sm:flex-row items-center justify-start gap-4 sm:space-y-0">
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
            </nav>
          )}
        </header>

        <section className="md:w-1/2 flex justify-center mt-8 md:mt-0">
          {variant === 'about' ? (
            <figure className="relative w-[300px] h-[300px] sm:w-[400px] sm:h-[400px] flex items-center justify-center">
              <div
                className="absolute inset-0 bg-gradient-to-tr from-primary-200/20 to-primary-500/20 
                           rounded-full filter blur-3xl transform -rotate-12"
                aria-hidden="true"
              />
              <StackedCards />
            </figure>
          ) : (
            // Original Brand M image code
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
          )}
        </section>
      </div>
    </section>
  );
};

export default Hero;
