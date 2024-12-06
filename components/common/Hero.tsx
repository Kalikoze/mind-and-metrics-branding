'use client';

import React, { useState, useEffect } from 'react';
import { HiRocketLaunch, HiEnvelope } from 'react-icons/hi2';
import ScrambleButton from './ScrambleButton';
import { serviceDetails } from '@/data/serviceDetails';
import { Background } from './hero/Background';
import { ServicesVariant } from './hero/variants/ServicesVariant';
import { AboutVariant } from './hero/variants/AboutVariant';
import { CareersVariant } from './hero/variants/CareersVariant';
import { ContactVariant } from './hero/variants/ContactVariant';
import { DefaultVariant } from './hero/variants/DefaultVariant';
import { PrivacyPolicyVariant } from './hero/variants/PrivacyPolicyVariant';

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
  variant?: 'default' | 'home' | 'about' | 'services' | 'careers' | 'contact' | 'privacy';
  buttonDescription?: string;
}

const Hero: React.FC<HeroProps> = ({
  title,
  subtitle,
  primaryButton,
  secondaryButton,
  variant = 'default',
  buttonDescription,
}) => {
  const [activeService, setActiveService] = useState(0);

  useEffect(() => {
    if (variant !== 'services') return;

    const interval = setInterval(() => {
      setActiveService((prev) => (prev + 1) % serviceDetails.length);
    }, 2000);

    return () => clearInterval(interval);
  }, [variant]);

  const renderVariant = () => {
    switch (variant) {
      case 'services':
        return <ServicesVariant activeService={activeService} />;
      case 'about':
        return <AboutVariant />;
      case 'careers':
        return <CareersVariant />;
      case 'contact':
        return <ContactVariant />;
      case 'privacy':
        return <PrivacyPolicyVariant />;
      default:
        return <DefaultVariant />;
    }
  };

  return (
    <section className="relative overflow-hidden min-h-[80vh] py-20 flex items-center" data-cy="hero-section">
      <div className="absolute inset-0 bg-white" aria-hidden="true">
        <Background variant={variant} />
      </div>

      <div className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 flex 
        flex-col-reverse md:flex-row items-center`}>
        <header className="max-w-3xl mx-auto text-center md:text-left md:w-1/2">
          <h1
            data-cy="hero-title"
            className="font-serif text-4xl sm:text-6xl font-bold mb-6 py-2
                      [text-wrap:balance] bg-clip-text text-transparent 
                      bg-gradient-to-r from-primary-100 to-primary-500"
          >
            {title}
          </h1>
          <p
            data-cy="hero-subtitle"
            className="font-sans text-xl sm:text-2xl text-dark-600 mb-12"
          >
            {subtitle}
          </p>

          {(primaryButton || secondaryButton) && (
            <>
              <nav 
                className="flex flex-col sm:flex-row items-center justify-start gap-4 sm:space-y-0"
                aria-label="Hero actions"
              >
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
              {buttonDescription && (
                <p className="mt-4 text-sm text-dark-500" data-cy="hero-button-description">
                  {buttonDescription}
                </p>
              )}
            </>
          )}
        </header>

        <section className={`md:w-1/2 flex justify-center w-full mb-8 md:mb-0`}>
          {renderVariant()}
        </section>
      </div>
    </section>
  );
};

export default Hero;
