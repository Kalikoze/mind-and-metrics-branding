import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import ScrambleText from '@/components/common/ScrambleText';
import PSCLogo from '@/public/assets/logos/psc-logo.svg';
import HydrovacLogo from '@/public/assets/logos/hydrovac-logo.svg';
import NatHydroLogo from '@/public/assets/logos/nat-hydro-logo.svg';
import PrecisionSurveyLogo from '@/public/assets/logos/precision-survey-logo.svg';

const stats = [
  { value: "90%", label: "24hr Support Resolution Rate" },
  { value: '80%', label: "Early Project Deliveries" },
  { value: '10%', label: "Overhead Cost Savings" },
  { value: '98%', label: "Client Digital Confidence" }
];

const clientLogos = [
  {
    src: PSCLogo,
    alt: "PSC Construction",
    description: "Brand Evolution & Digital Marketing",
    websiteUrl: "https://www.psccompanies.com",
    caseStudyUrl: "/case-studies/psc-construction"
  },
  {
    src: PrecisionSurveyLogo,
    alt: "Precision Surveying & Consulting",
    description: "Complete Digital Transformation",
    websiteUrl: "https://www.precisionsurveyingandconsulting.com",
    caseStudyUrl: "/case-studies/precision-survey"
  },
  {
    src: HydrovacLogo,
    alt: "Hydrovac Supply",
    description: "Brand Identity & Web Development",
    websiteUrl: "https://www.hydrovac-supply.com",
    caseStudyUrl: "/case-studies/hydrovac-supply"
  },
  {
    src: NatHydroLogo,
    alt: "National Hydro Excavation Services",
    description: "Website Design & SEO Strategy",
    websiteUrl: "https://www.nathydro.com",
    caseStudyUrl: "/case-studies/national-hydro"
  }
];

const ClientShowcase = () => {
  const [hoveringIndices, setHoveringIndices] = useState<{ [key: number]: boolean }>({});

  return (
    <section data-cy="social-proof-section" className="bg-white py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 data-cy="social-proof-title" className="text-3xl md:text-4xl font-serif text-dark-800 mb-4">
            Trusted By Industry Leaders
          </h2>
          <h3 data-cy="social-proof-subtitle" className="text-dark-600 text-lg max-w-2xl mx-auto">
            Join the growing list of B2B leaders who trust us with their digital success.
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {clientLogos.map((logo, index) => (
            <Link
              key={index}
              href={logo.websiteUrl}
              target="_blank"
              rel="noopener noreferrer"
              data-cy="client-logo-card"
              className="group relative bg-neutral-50 p-8 rounded-lg
                         border-2 border-neutral-200 hover:border-secondary-300
                         transition-all duration-300
                         hover:shadow-lg hover:-translate-y-1"
              onMouseEnter={() => setHoveringIndices(prev => ({ ...prev, [index]: true }))}
              onMouseLeave={() => setHoveringIndices(prev => ({ ...prev, [index]: false }))}
            >
              <div className="flex flex-col md:flex-row items-center gap-6">
                {/* Logo */}
                <div className="w-[200px] h-[70px] relative grayscale opacity-60 
                               group-hover:grayscale-0 group-hover:opacity-100
                               transition-all duration-300">
                  <Image
                    data-cy="client-logo-image"
                    src={logo.src}
                    alt={logo.alt}
                    fill
                    className="object-contain"
                    sizes="200px"
                    priority={index < 2}
                  />
                </div>

                <div className="flex-1 text-center md:text-left">
                  <h4 className="font-serif text-lg text-dark-800 mb-2" data-cy="client-name">
                    {logo.alt}
                  </h4>
                  <p className="text-dark-600 text-sm mb-3" data-cy="client-description">
                    {logo.description}
                  </p>
                  <span data-cy="client-website-link" className="text-sm font-medium text-secondary-400 inline-flex items-center">
                    <span data-cy="client-website-text" className="w-[100px]">
                      <ScrambleText
                        text="Visit Website"
                        isHovering={hoveringIndices[index]}
                      />
                    </span>
                    <svg
                      className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform duration-300"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="relative">
          <div className="text-center mb-16 pt-16">
            <h2 className="text-3xl md:text-4xl font-serif text-dark-800 mb-4">
              Success By The Numbers
            </h2>
            <p className="text-dark-600 text-lg max-w-2xl mx-auto">
              Measurable results that drive business growth through data-driven strategies
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div
                key={index}
                data-cy={`stat-${stat.label.toLowerCase().replace(/\s+/g, '-')}`}
                className="text-center p-8 bg-neutral-50
                          border-2 border-neutral-200
                          rounded-lg"
              >
                <div className="font-serif text-5xl text-dark-800 mb-3"
                  data-cy="stat-value">
                  {stat.value}
                </div>
                <div className="text-dark-600 text-sm font-sans" data-cy="stat-label">
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

export default ClientShowcase; 