import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import ScrambleText from './ScrambleText';
import PSCLogo from '@/public/assets/logos/psc-logo.svg';
import HydrovacLogo from '@/public/assets/logos/hydrovac-logo.svg';
import NatHydroLogo from '@/public/assets/logos/nat-hydro-logo.svg';
import PrecisionSurveyLogo from '@/public/assets/logos/precision-survey-logo.svg';

const stats = [
  { value: "100%", label: "Client Retention Rate" },
  { value: "5+", label: "Projects in First 6 Months" },
  { value: "24hr", label: "Average Response Time" },
  { value: "$42K", label: "Average Annual Savings" }
];

const clientLogos = [
  { 
    src: PSCLogo, 
    alt: "PSC Construction",
    description: "Brand Evolution & Digital Marketing",
    websiteUrl: "https://pscconstruction.com",
    caseStudyUrl: "/case-studies/psc-construction"
  },
  { 
    src: HydrovacLogo, 
    alt: "Hydrovac Supply",
    description: "Website Design & SEO Strategy",
    websiteUrl: "https://hydrovacsupply.com",
    caseStudyUrl: "/case-studies/hydrovac-supply"
  },
  { 
    src: NatHydroLogo, 
    alt: "National Hydro Excavation Services",
    description: "Complete Digital Transformation",
    websiteUrl: "https://nationalhydro.com",
    caseStudyUrl: "/case-studies/national-hydro"
  },
  { 
    src: PrecisionSurveyLogo, 
    alt: "Precision Surveying & Consulting",
    description: "Brand Identity & Web Development",
    websiteUrl: "https://precisionsurveying.com",
    caseStudyUrl: "/case-studies/precision-survey"
  },
];

const testimonials = [
  {
    quote: "Mind & Metrics transformed our digital presence. Their strategic approach and attention to detail exceeded our expectations.",
    author: "Steven Koch",
    position: "Project Manager",
    company: "PSC Construction",
    image: "/assets/testimonials/steven-koch.jpg"
  },
  {
    quote: "Working with their team has been revolutionary for our brand. They truly understand the B2B space and deliver results.",
    author: "Cameron Dodds",
    position: "Vice President",
    company: "Precision Surveying & Consulting",
    image: "/assets/testimonials/cameron-dodds.jpg"
  },
];

const SocialProof = () => {
  const [hoveringIndices, setHoveringIndices] = useState<{ [key: number]: boolean }>({});

  return (
    <section data-cy="social-proof-section" className="bg-neutral-50 py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 data-cy="social-proof-title" className="text-3xl md:text-4xl font-serif text-secondary-400 mb-4">
            Proven Track Record
          </h2>
          <p className="text-secondary-500 text-lg max-w-2xl mx-auto">
            Join the growing list of B2B leaders who trust us with their digital success.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-20">
          {stats.map((stat, index) => (
            <div 
              key={index}
              data-cy={`stat-${stat.label.toLowerCase().replace(/\s+/g, '-')}`}
              className="text-center p-6 bg-white rounded-lg
                         border-2 border-neutral-200
                         transition-all duration-300 hover:border-secondary-400
                         hover:shadow-lg"
            >
              <div className="font-serif text-4xl text-secondary-400 mb-2">
                {stat.value}
              </div>
              <div className="text-secondary-500 text-sm font-sans">
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        {/* Client Logos Section */}
        <div className="mb-20">
          <h3 className="text-center font-serif text-2xl text-secondary-400 mb-12">
            Trusted By Industry Leaders
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
            {clientLogos.map((logo, index) => (
              <Link 
                key={index}
                href={logo.websiteUrl}
                target="_blank"
                rel="noopener noreferrer"
                data-cy={`client-logo-${logo.alt.toLowerCase().replace(/\s+/g, '-')}`}
                className="group relative bg-white p-8 rounded-lg
                         border-2 border-neutral-200 hover:border-secondary-400
                         transition-all duration-300 hover:shadow-lg"
                onMouseEnter={() => setHoveringIndices(prev => ({ ...prev, [index]: true }))}
                onMouseLeave={() => setHoveringIndices(prev => ({ ...prev, [index]: false }))}
              >
                <div className="flex flex-col md:flex-row items-center gap-6">
                  {/* Logo */}
                  <div className="w-[200px] h-[70px] relative grayscale opacity-60 
                               group-hover:grayscale-0 group-hover:opacity-100
                               transition-all duration-300">
                    <Image
                      src={logo.src}
                      alt={logo.alt}
                      fill
                      className="object-contain"
                      sizes="200px"
                      priority={index < 2}
                    />
                  </div>
                  
                  {/* Description */}
                  <div className="flex-1 text-center md:text-left">
                    <h4 className="font-serif text-lg text-secondary-400 mb-2">
                      {logo.alt}
                    </h4>
                    <p className="text-secondary-500 text-sm mb-3">
                      {logo.description}
                    </p>
                    <span className="text-sm font-medium text-secondary-400 inline-flex items-center">
                      <span className="w-[100px]">
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
        </div>

        {/* Testimonials */}
        <div>
          <h3 className="text-center font-serif text-2xl text-secondary-400 mb-12">
            What Our Clients Say
          </h3>
          <div className="grid md:grid-cols-2 gap-8">
            {testimonials.map((testimonial, index) => (
              <div 
                key={index}
                data-cy={`testimonial-${index + 1}`}
                className="bg-white p-8 rounded-lg
                           border-2 border-neutral-200
                           transition-all duration-300 hover:border-secondary-400
                           hover:shadow-lg"
              >
                <div className="flex items-start mb-6">
                  <div className="relative w-12 h-12 rounded-full overflow-hidden mr-4">
                    {/* <Image
                      src={testimonial.image}
                      alt={`${testimonial.author}'s testimonial`}
                      fill
                      className="object-cover"
                    /> */}
                  </div>
                  <div>
                    <div className="font-serif text-lg text-secondary-400">
                      {testimonial.author}
                    </div>
                    <div className="text-sm text-secondary-500">
                      {testimonial.position} at {testimonial.company}
                    </div>
                  </div>
                </div>
                <blockquote className="text-secondary-500 italic">
                  "{testimonial.quote}"
                </blockquote>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default SocialProof; 