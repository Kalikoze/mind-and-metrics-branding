import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import PSCLogo from '@/public/assets/logos/psc-logo.svg';
import HydrovacLogo from '@/public/assets/logos/hydrovac-logo.svg';
import NatHydroLogo from '@/public/assets/logos/nat-hydro-logo.svg';
import PrecisionSurveyLogo from '@/public/assets/logos/precision-survey-logo.svg';

const stats = [
  { value: "100%", label: "Client Retention Rate" },
  { value: "5+", label: "Projects in First 6 Months" },
  { value: "40%", label: "Average Cost Reduction" },
  { value: "24/7", label: "Support Coverage" },
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
  return (
    <section data-cy="social-proof-section" className="bg-neutral-50 py-20">
      <div className="container mx-auto px-4">
        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-20 max-w-6xl mx-auto">
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

        {/* Client Logos */}
        <div className="mb-20 max-w-6xl mx-auto">
          <div className="flex flex-wrap justify-center items-center gap-12">
            {clientLogos.map((logo, index) => (
              <Link 
                key={index}
                href={logo.websiteUrl}
                target="_blank"
                rel="noopener noreferrer"
                data-cy={`client-logo-${logo.alt.toLowerCase().replace(/\s+/g, '-')}`}
                className="group relative"
              >
                <div className="w-[240px] h-[80px] relative grayscale hover:grayscale-0 
                             transition-all duration-300 opacity-60 group-hover:opacity-100">
                  <Image
                    src={logo.src}
                    alt={logo.alt}
                    fill
                    className="object-contain"
                    sizes="240px"
                    priority={index < 2}
                  />
                </div>
                
                {/* Hover tooltip */}
                <div className="absolute -bottom-12 left-1/2 -translate-x-1/2 w-max
                              opacity-0 group-hover:opacity-100 
                              transition-all duration-300 pointer-events-none">
                  <div className="bg-white px-4 py-2 rounded-lg shadow-lg
                                border border-neutral-200 text-sm text-secondary-500">
                    {logo.description} • <span className="text-secondary-400">Visit Site →</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Testimonials */}
        <div className="max-w-6xl mx-auto">
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