import React from 'react';
import Link from 'next/link';
import { 
  RiPaintBrushLine,
  RiPaletteLine,
  RiCodeLine,
  RiArticleLine,
  RiRocketLine,
  RiBarChartLine
} from 'react-icons/ri';
import { HiOutlineArrowRight } from 'react-icons/hi2';
import { useState } from 'react';
import ScrambleText from './ScrambleText';

const services = [
  {
    icon: RiPaintBrushLine,
    title: "Strategic Brand Evolution",
    description: "We'll transform your business identity into a compelling brand story that captivates your target market."
  },
  {
    icon: RiPaletteLine,
    title: "Visual Identity Design",
    description: "Trust us to craft your distinctive visual language, ensuring your brand stands out while maintaining perfect consistency."
  },
  {
    icon: RiCodeLine,
    title: "Digital Experience Design",
    description: "Leave your digital presence to us - we build powerful, user-centric websites that convert visitors into loyal customers."
  },
  {
    icon: RiArticleLine,
    title: "Content & Social Strategy",
    description: "Let us handle your content creation and social media presence, establishing your brand as an industry authority."
  },
  {
    icon: RiRocketLine,
    title: "Digital Marketing & Growth",
    description: "Our team drives your growth through expertly managed digital marketing campaigns and SEO strategies."
  },
  {
    icon: RiBarChartLine,
    title: "Market Intelligence",
    description: "Rely on our comprehensive market research and analysis to empower your strategic decisions."
  }
];

const ServicesGrid = () => {
  const [viewAllHovering, setViewAllHovering] = useState(false);
  const [hoveringIndices, setHoveringIndices] = useState<{ [key: number]: boolean }>({});

  return (
    <section data-cy="services-section" className="bg-white py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 data-cy="services-title" className="text-3xl md:text-4xl font-serif text-secondary-400 mb-4">
            Comprehensive B2B Solutions
          </h2>
          <p className="text-secondary-500 text-lg max-w-2xl mx-auto">
            Scale your business with experts who understand your vision and goals.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <Link 
              href={`/services#${service.title.toLowerCase().replace(/\s+/g, '-')}`}
              key={index}
              data-cy={`service-${service.title.toLowerCase().replace(/\s+/g, '-')}`}
              onMouseEnter={() => setHoveringIndices(prev => ({ ...prev, [index]: true }))}
              onMouseLeave={() => setHoveringIndices(prev => ({ ...prev, [index]: false }))}
              className="group relative p-8 rounded-lg bg-neutral-50 hover:bg-white
                       border-2 border-neutral-200 hover:border-secondary-400
                       transition-all duration-300
                       hover:shadow-lg hover:-translate-y-1"
            >
              <div 
                data-cy="service-icon"
                className="bg-white p-4 rounded-full w-16 h-16 mb-6
                          flex items-center justify-center
                          group-hover:bg-secondary-400 transition-colors duration-300"
              >
                <service.icon className="w-8 h-8 text-secondary-400 
                                      group-hover:text-white transition-colors duration-300" />
              </div>
              
              <h3 
                data-cy="service-title"
                className="text-xl font-serif text-secondary-500 mb-3 group-hover:text-secondary-400
                         transition-colors duration-300"
              >
                {service.title}
              </h3>
              
              <p 
                data-cy="service-description"
                className="text-secondary-400 font-sans mb-6"
              >
                {service.description}
              </p>

              <div 
                className="text-secondary-400 font-medium text-sm flex items-center
                         opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              >
                <span className="w-[80px]">
                  <ScrambleText text="Learn More" isHovering={hoveringIndices[index]} />
                </span>
                <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-300 shrink-0" 
                     fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </Link>
          ))}
        </div>

        <div className="text-center mt-16">
          <Link
            data-cy="view-all-services"
            href="/services"
            onMouseEnter={() => setViewAllHovering(true)}
            onMouseLeave={() => setViewAllHovering(false)}
            className="font-sans px-8 py-3.5 border-2 border-secondary-400 text-secondary-400 
                     rounded-lg flex items-center space-x-2 inline-flex
                     transition-all duration-200 w-[260px] justify-center
                     hover:bg-secondary-400 hover:text-white hover:scale-105"
          >
            <HiOutlineArrowRight className="w-5 h-5 shrink-0" />
            <span className="w-[160px] text-center">
              <ScrambleText text="View All Services" isHovering={viewAllHovering} />
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ServicesGrid; 