import React, { useState, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { HiOutlineGlobeAlt, HiChevronLeft, HiChevronRight } from 'react-icons/hi2';
import ScrambleText from './ScrambleText';
import CircuitOverlay from './CircuitOverlay';
import { motion, AnimatePresence, useInView } from 'framer-motion';

// Import logos from SocialProof
import PSCLogo from '@/public/assets/logos/psc-logo.svg';
import HydrovacLogo from '@/public/assets/logos/hydrovac-logo.svg';
import NatHydroLogo from '@/public/assets/logos/nat-hydro-logo.svg';
import PrecisionSurveyLogo from '@/public/assets/logos/precision-survey-logo.svg';
import PSCDesktop from '@/public/assets/about/psc-desktop.png';
import PSCMobile from '@/public/assets/about/psc-mobile.png';
import HydrovacDesktop from '@/public/assets/about/hydrovac-desktop.png';
import HydrovacMobile from '@/public/assets/about/hydrovac-mobile.png';
import NatHydroDesktop from '@/public/assets/about/nathydro-desktop.png';
import NatHydroMobile from '@/public/assets/about/nathydro-mobile.png';
import PrecisionDesktop from '@/public/assets/about/precision-desktop.png';
import PrecisionMobile from '@/public/assets/about/precision-mobile.png';

const caseStudies = [
  {
    id: 'psc-construction',
    client: 'PSC Construction',
    logo: PSCLogo,
    industry: 'Site Preparation & Underground Utilities',
    challenge: 'Needed to modernize their digital presence and rebrand away from dated orange-based color schemes while maintaining their established reputation in the industry.',
    solution: 'Executed a digital transformation strategy with refined brand identity, modern color palette, and built a custom website with project showcases.',
    results: [
      { metric: 'Lead Quality', value: '+156%' },
      { metric: 'Cost Savings', value: '+40%' },
      { metric: 'Timeline Accuracy', value: '94%' }
    ],
    websiteUrl: 'https://www.psccompanies.com',
    desktopPreview: PSCDesktop,
    mobilePreview: PSCMobile,
    tags: ['Web Development', 'Brand Evolution', 'Digital Strategy']
  },
  {
    id: 'precision-survey',
    client: 'Precision Surveying & Consulting',
    logo: PrecisionSurveyLogo,
    industry: 'Construction Surveying & As-Built Mapping',
    challenge: 'Required a complete digital transformation to modernize their brand, streamline client communications, and showcase their technical expertise.',
    solution: 'Executed a full brand refresh with a modern website featuring project galleries, automated client portals, and integrated survey request systems.',
    results: [
      { metric: 'Digital Efficiency', value: '+175%' },
      { metric: 'Client Response Time', value: '-65%' },
      { metric: 'New Project Inquiries', value: '+225%' }
    ],
    websiteUrl: 'https://www.precisionsurveyingandconsulting.com',
    desktopPreview: PrecisionDesktop,
    mobilePreview: PrecisionMobile,
    tags: ['Digital Transformation', 'Brand Evolution', 'Web Development']
  },
  {
    id: 'hydrovac-supply',
    client: 'Hydrovac Supply',
    logo: HydrovacLogo,
    industry: 'Hydro Excavation Parts & Equipment Supply',
    challenge: 'Required a complete brand identity and e-commerce solution to establish market presence and streamline their sales process.',
    solution: 'Created a distinctive brand identity and built a custom e-commerce platform with inventory management and automated ordering systems.',
    results: [
      { metric: 'Parts Accuracy', value: '99.2%' },
      { metric: 'Order Processing Time', value: '-75%' },
      { metric: 'Online Sales Growth', value: '245%' },
    ],
    websiteUrl: 'https://www.hydrovac-supply.com',
    desktopPreview: HydrovacDesktop,
    mobilePreview: HydrovacMobile,
    tags: ['E-commerce', 'Brand Identity', 'Web Development']
  },
  {
    id: 'national-hydro',
    client: 'National Hydro Excavation Services',
    logo: NatHydroLogo,
    industry: 'Hydro Excavation & Industrial Cleaning Services',
    challenge: 'Needed to establish a strong online presence and improve lead generation while showcasing their specialized excavation services and safety standards.',
    solution: 'Developed a comprehensive website featuring emergency service integration, detailed industry-specific documentation, and multi-location support. Enhanced credibility through safety certifications and streamlined contact systems.',
    results: [
      { metric: 'Response Time', value: '-42%' },
      { metric: 'Quote Request Rate', value: '+165%' },
      { metric: 'Safety Compliance', value: '100%' }
    ],
    websiteUrl: 'https://www.nathydro.com',
    desktopPreview: NatHydroDesktop,
    mobilePreview: NatHydroMobile,
    tags: ['Web Development', 'SEO Strategy', 'Lead Generation']
  }
];

const CaseStudies = () => {
  const [activeStudyId, setActiveStudyId] = useState(caseStudies[0].id);
  const [hoveringStates, setHoveringStates] = useState<{ [key: string]: boolean }>({});
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  const componentRef = useRef(null);
  const isInView = useInView(componentRef, {
    once: false,
    amount: .5
  });

  const activeStudy = caseStudies.find(study => study.id === activeStudyId);

  const handleSwipe = () => {
    const minSwipeDistance = 50;
    const swipeDistance = touchStart - touchEnd;
    
    if (Math.abs(swipeDistance) < minSwipeDistance) return;
    
    const currentIndex = caseStudies.findIndex(study => study.id === activeStudyId);
    if (swipeDistance > 0) {
      // Swipe left - next study
      const nextIndex = (currentIndex + 1) % caseStudies.length;
      setActiveStudyId(caseStudies[nextIndex].id);
    } else {
      // Swipe right - previous study
      const prevIndex = currentIndex === 0 ? caseStudies.length - 1 : currentIndex - 1;
      setActiveStudyId(caseStudies[prevIndex].id);
    }
  };

  const navigateStudy = (direction: 'prev' | 'next') => {
    const currentIndex = caseStudies.findIndex(study => study.id === activeStudyId);
    if (direction === 'next') {
      const nextIndex = (currentIndex + 1) % caseStudies.length;
      setActiveStudyId(caseStudies[nextIndex].id);
    } else {
      const prevIndex = currentIndex === 0 ? caseStudies.length - 1 : currentIndex - 1;
      setActiveStudyId(caseStudies[prevIndex].id);
    }
  };

  return (
    <section className="relative bg-neutral-50 py-24 overflow-hidden">
      <CircuitOverlay />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-serif text-secondary-400 mb-4">
            Client Success Stories
          </h2>
          <p className="text-secondary-500 text-lg max-w-2xl mx-auto">
            Discover how we've helped B2B leaders transform their digital presence and achieve measurable results.
          </p>
        </div>

        {/* Case Study Selector */}
        <div className="flex justify-center mb-12 space-x-4">
          {caseStudies.map((study) => (
            <button
              key={study.id}
              onClick={() => setActiveStudyId(study.id)}
              className={`relative p-4 transition-all duration-300 
                ${activeStudyId === study.id
                  ? 'bg-white shadow-lg scale-105'
                  : 'bg-neutral-100 hover:bg-white hover:scale-105'
                } rounded-lg border-2 
                ${activeStudyId === study.id
                  ? 'border-secondary-400'
                  : 'border-neutral-200'
                }`}
            >
              <Image
                src={study.logo}
                alt={study.client}
                width={120}
                height={40}
                className={`transition-all duration-300 
                  ${activeStudyId === study.id
                    ? 'opacity-100'
                    : 'opacity-60 grayscale'
                  }`}
              />
            </button>
          ))}
        </div>

        {/* Case Study Content */}
        <div className="relative min-h-fit"
             ref={componentRef}
             onTouchStart={e => setTouchStart(e.touches[0].clientX)}
             onTouchMove={e => setTouchEnd(e.touches[0].clientX)}
             onTouchEnd={handleSwipe}>
          <AnimatePresence mode="wait">
            {activeStudy && (
              <motion.div
                key={activeStudy.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="bg-white rounded-lg border-2 border-neutral-200 pb-32"
              >
                <div className="grid md:grid-cols-2 gap-8 p-8">
                  {/* Content Side */}
                  <div className="space-y-8">
                    <div className="h-[200px] flex items-center justify-start">
                      <div className="relative w-[200px] h-full">
                        <Image
                          src={activeStudy.logo}
                          alt={activeStudy.client}
                          fill
                          className="object-contain object-left"
                        />
                      </div>
                    </div>

                    <div>
                      <h3 className="font-serif text-2xl text-secondary-400 mb-2">
                        {activeStudy.client}
                      </h3>
                      <p className="text-secondary-500 font-medium">
                        {activeStudy.industry}
                      </p>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <h4 className="font-serif text-lg text-secondary-400 mb-2">
                          Challenge
                        </h4>
                        <p className="text-secondary-500">
                          {activeStudy.challenge}
                        </p>
                      </div>

                      <div>
                        <h4 className="font-serif text-lg text-secondary-400 mb-2">
                          Solution
                        </h4>
                        <p className="text-secondary-500">
                          {activeStudy.solution}
                        </p>
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-4">
                      {activeStudy.results.map((result, index) => (
                        <div key={index} className="text-center p-4 bg-neutral-50 rounded-lg">
                          <div className="font-serif text-2xl text-secondary-400 mb-1">
                            {result.value}
                          </div>
                          <div className="text-sm text-secondary-500">
                            {result.metric}
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {activeStudy.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-3 py-1 text-sm bg-neutral-50 text-secondary-400 rounded-full"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Preview Side */}
                  <div className="relative h-auto pb-32 md:h-[600px]">
                    {/* Desktop Preview */}
                    <div className="relative h-[300px] lg:h-[400px] min-w-[280px]">
                      <div className="relative h-full">
                        <Image
                          src={activeStudy.desktopPreview}
                          alt={`${activeStudy.client} desktop preview`}
                          fill
                          className="object-contain lg:object-cover rounded-lg shadow-lg"
                          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 45vw, 50vw"
                        />
                      </div>
                      <span className="absolute -bottom-2 left-4 text-sm text-secondary-400 bg-white/90 
                                       backdrop-blur-sm px-2 py-1 rounded-md shadow-sm">
                        Desktop View
                      </span>
                    </div>

                    {/* Mobile Preview with Phone Frame */}
                    <div className="absolute -bottom-24 right-12 w-[160px] md:w-1/3 h-[350px]">
                      <div className="relative h-full min-w-[160px] bg-dark-800 rounded-[2rem] p-1.5 shadow-xl">
                        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/3 h-[0.75rem] 
                                        bg-dark-700 rounded-b-xl" />
                        <div className="relative h-full overflow-hidden rounded-[1.75rem]">
                          <Image
                            src={activeStudy.mobilePreview}
                            alt={`${activeStudy.client} mobile preview`}
                            fill
                            className="object-cover"
                            sizes="(max-width: 768px) 160px, 33vw"
                          />
                        </div>
                      </div>
                      <span className="absolute -bottom-2 right-4 text-sm text-secondary-400 bg-white/90 
                                       backdrop-blur-sm px-2 py-1 rounded-md shadow-sm">
                        Mobile View
                      </span>
                    </div>

                    <Link
                      href={activeStudy.websiteUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      onMouseEnter={() => setHoveringStates({ ...hoveringStates, [activeStudy.id]: true })}
                      onMouseLeave={() => setHoveringStates({ ...hoveringStates, [activeStudy.id]: false })}
                      className="absolute top-4 right-4 font-sans px-8 py-3.5 bg-white/90 backdrop-blur-sm
                               border-2 border-secondary-400 text-secondary-400 
                               rounded-lg flex items-center space-x-2 w-[200px] justify-center
                               transition-all duration-300
                               hover:bg-secondary-400 hover:text-white hover:scale-105"
                    >
                      <HiOutlineGlobeAlt className="w-5 h-5 shrink-0" />
                      <span className="w-[120px] text-center">
                        <ScrambleText
                          text="Visit Site"
                          isHovering={hoveringStates[activeStudy.id]}
                        />
                      </span>
                    </Link>
                  </div>
                </div>

                {/* Progress Indicator */}
                <div className="md:hidden absolute bottom-4 left-0 right-0">
                  <div className="flex justify-center gap-2">
                    {caseStudies.map((study, index) => (
                      <div
                        key={study.id}
                        className={`h-1 rounded-full transition-all duration-300 
                          ${study.id === activeStudyId 
                            ? 'w-8 bg-secondary-400' 
                            : 'w-2 bg-secondary-400/40'}`}
                        aria-label={`Case study ${index + 1} of ${caseStudies.length}`}
                      />
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

export default CaseStudies;