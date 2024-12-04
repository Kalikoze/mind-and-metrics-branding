'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { HiRocketLaunch, HiEnvelope } from 'react-icons/hi2';
import MainLogo from '@/public/assets/graphics/m&m-logo.svg';
import ScrambleButton from './ScrambleButton';
import StackedCards from '@/components/pages/about/StackedCards';
import { serviceDetails } from '@/data/serviceDetails'; // Import service details
import { motion, AnimatePresence } from 'framer-motion';

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
  variant?: 'default' | 'home' | 'about' | 'services' | 'careers';
  overlayElements?: React.ReactNode;
}

const Hero: React.FC<HeroProps> = ({
  title,
  subtitle,
  primaryButton,
  secondaryButton,
  variant = 'default',
}) => {
  const [activeService, setActiveService] = useState(0);

  // Update active service based on animation timing
  useEffect(() => {
    if (variant !== 'services') return;

    const interval = setInterval(() => {
      setActiveService((prev) => (prev + 1) % serviceDetails.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [variant]);

  const renderBackground = () => {
    switch (variant) {
      case 'services':
        return (
          <div className="absolute inset-0 opacity-10">
            {[...Array(12)].map((_, i) => (
              <div
                key={`accent-${i}`}
                className="absolute transform transition-all duration-700 ease-in-out"
                style={{
                  top: `${(i % 4) * 25 + 5}%`,
                  left: `${Math.floor(i / 4) * 33 + 10}%`,
                  width: '12%',
                  height: '12%',
                  background: `linear-gradient(195deg, ${i % 2 ? '#385B94' : '#1F3251'} 0%, transparent 85%)`,
                  clipPath: 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)',
                  transform: `rotate(${i * 25}deg) scale(${0.8 + (i % 4) * 0.15})`,
                }}
              />
            ))}
          </div>
        );
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
      case 'careers':
        return (
          <div className="absolute inset-0 opacity-10">
            {[...Array(10)].map((_, i) => (
              <div
                key={`accent-${i}`}
                className="absolute transform transition-all duration-700 ease-in-out"
                style={{
                  top: `${i * 10 + 5}%`,
                  left: `${((i + 1) % 5) * 20 + 10}%`,
                  width: '18%',
                  height: '18%',
                  background: `linear-gradient(135deg, ${i % 2 ? '#5C83C1' : '#3E64A3'} 0%, transparent 85%)`,
                  clipPath: 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)',
                  transform: `rotate(${i * 36}deg) scale(${0.9 + (i % 3) * 0.1})`,
                }}
              />
            ))}
          </div>
        );
      default:
        return (
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

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 flex flex-col-reverse md:flex-row items-center">
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

        <section className="md:w-1/2 flex justify-center w-full mb-8 md:mb-0">
          {variant === 'services' ? (
            <div className="relative h-64 flex flex-col justify-around">
              <div className="flex flex-wrap justify-center items-center">
                {serviceDetails.map((service, index) => (
                  <div
                    key={service.id}
                    className="flex justify-center items-center m-2 p-4 bg-primary-400 rounded-full shadow-lg"
                    style={{
                      opacity: activeService === index ? 1 : 0.5,
                    }}
                  >
                    <service.icon className="w-8 h-8 text-white" />
                  </div>
                ))}
              </div>

              {/* Card */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={serviceDetails[activeService].title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                  className="w-72 bg-white rounded-xl shadow-lg p-4 transform hover:scale-105 mx-auto"
                >
                  <h3 className="text-lg font-serif text-dark-800 text-center">
                    {serviceDetails[activeService].title}
                  </h3>
                  <div className="h-1 w-12 bg-gradient-to-r from-primary-300 to-primary-500 mx-auto mt-2 rounded-full"></div>
                </motion.div>
              </AnimatePresence>
            </div>
          ) : variant === 'about' ? (
            <figure className="relative w-[300px] h-[300px] sm:w-[400px] sm:h-[400px] flex items-center justify-center">
              <div
                className="absolute inset-0 bg-gradient-to-tr from-primary-200/20 to-primary-500/20 
                           rounded-full filter blur-3xl transform -rotate-12"
                aria-hidden="true"
              />
              <StackedCards />
            </figure>
          ) : variant === 'careers' ? (
            <div className="flex justify-center items-center w-full">
              <div className="relative w-[300px] h-[300px] sm:w-[400px] sm:h-[400px] bg-gradient-to-br from-primary-100 to-primary-400 rounded-full shadow-lg flex items-center justify-center animate-pulse">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <h3 className="text-lg sm:text-2xl font-serif text-white font-bold">Where Growth Meets Purpose</h3>
                    <div className="h-1 w-full bg-gradient-to-r from-primary-300 to-primary-500 mx-auto mt-2 rounded-full"></div>
                    <p className="text-sm text-white mt-2">
                      Building Tomorrow&apos;s Leaders Today
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="relative w-[300px] h-[300px] sm:w-[400px] sm:h-[400px]">
              <div className="absolute inset-0 bg-gradient-to-tr from-primary-100/20 to-primary-400/20 
                            rounded-full filter blur-3xl transform -rotate-12" />
              <Image
                src={MainLogo}
                alt="Mind & Metrics logo"
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
