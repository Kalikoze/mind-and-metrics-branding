import React, { useState } from 'react';
import Link from 'next/link';
import { HiOutlineArrowRight } from 'react-icons/hi2';
import ScrambleText from '@/components/common/ScrambleText';
import CircuitOverlay from '@/components/common/CircuitOverlay';

const positions = [
  {
    id: 'junior-software-engineer',
    title: 'Junior Full Stack Engineer',
    type: 'Full-Time',
    location: 'In-Person',
    department: 'Engineering',
    description: "Join our development team as we build innovative digital solutions. We're seeking a developer with backend fundamentals (Node.js/Express) and React basics who's eager to grow across the full stack. Experience with GraphQL or Python is a plus.You'll work directly with our lead engineer on e-commerce platforms and client portals, while learning valuable skills in SEO and analytics. Ideal for a motivated junior developer looking to rapidly expand their skillset through hands-on mentorship.",
    link: '/careers/junior-software-engineer'
  },
  {
    id: 'social-media-manager',
    title: 'Social Media Manager',
    type: 'Full-Time',
    location: 'In-Person',
    department: 'Marketing',
    description: 'Lead social media strategy and content creation across multiple brand portfolios. You\'ll develop engaging campaigns, manage community interactions, and drive growth through both organic and paid social initiatives. The ideal candidate has 2-4 years of experience, strong creative skills, and expertise in social media analytics and management tools. You\'ll work closely with our marketing team to maintain brand consistency while optimizing performance across all platforms.',
    link: '/careers/social-media-manager'
  }
];

const OpenPositions = () => {
  const [hoveringStates, setHoveringStates] = useState<{ [key: string]: boolean }>({});

  return (
    <section className="relative overflow-hidden bg-neutral-50 py-24" data-cy="open-positions-section">
      <CircuitOverlay />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="font-serif text-4xl text-secondary-400 mb-4">
            Open Positions
          </h2>
          <p className="text-secondary-500 text-lg max-w-2xl mx-auto">
            Explore opportunities to make an impact and grow with us
          </p>
        </div>

        <div className="grid gap-6">
          {positions.map((position) => (
            <Link
              key={position.id}
              href={position.link}
              onMouseEnter={() => setHoveringStates(prev => ({ ...prev, [position.id]: true }))}
              onMouseLeave={() => setHoveringStates(prev => ({ ...prev, [position.id]: false }))}
              className="bg-white rounded-lg p-8 border-2 border-neutral-200
                         hover:border-secondary-400 transition-all duration-300
                         group relative"
              data-cy={`position-${position.id}`}
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div className="flex-1">
                  <div className="flex flex-wrap gap-3 mb-3">
                    <h3 className="font-serif text-xl text-secondary-400">
                      {position.title}
                    </h3>
                    <span className="text-sm bg-neutral-100 text-secondary-500 px-3 py-1 rounded-full">
                      {position.type}
                    </span>
                    <span className="text-sm bg-neutral-100 text-secondary-500 px-3 py-1 rounded-full">
                      {position.location}
                    </span>
                    <span className="text-sm bg-neutral-100 text-secondary-500 px-3 py-1 rounded-full">
                      {position.department}
                    </span>
                  </div>
                  <p className="text-secondary-500">
                    {position.description}
                  </p>
                </div>
                
                <div className="flex items-center gap-2 text-secondary-400">
                  <span className="w-[100px]">
                    <ScrambleText
                      text="Learn More"
                      isHovering={hoveringStates[position.id]}
                    />
                  </span>
                  <HiOutlineArrowRight className="w-5 h-5 transition-transform duration-300 
                                                group-hover:translate-x-1" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default OpenPositions; 