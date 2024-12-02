'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { HiOutlineArrowRight } from 'react-icons/hi2';
import ScrambleText from '@/components/common/ScrambleText';
import CircuitOverlay from '@/components/common/CircuitOverlay';
import { positions } from '@/data/positions';

const OpenPositions = () => {
  const [hoveringStates, setHoveringStates] = useState<{ [key: string]: boolean }>({});

  return (
    <section className="relative overflow-hidden bg-neutral-50 py-24" data-cy="open-positions-section">
      <CircuitOverlay />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <header className="text-center mb-16">
          <h2 className="font-serif text-4xl text-dark-800 mb-4">
            Open Positions
          </h2>
          <p className="text-dark-600 text-lg max-w-2xl mx-auto">
            Explore opportunities to make an impact and grow with us
          </p>
        </header>

        <div className="grid gap-6">
          {positions.map((position) => (
            <Link
              key={position.id}
              href={`/careers/${position.id}`}
              onMouseEnter={() => setHoveringStates(prev => ({ ...prev, [position.id]: true }))}
              onMouseLeave={() => setHoveringStates(prev => ({ ...prev, [position.id]: false }))}
              className="bg-white rounded-lg p-8 border-2 border-neutral-200
                         hover:border-secondary-400 transition-all duration-300
                         group relative flex flex-col md:flex-row md:items-center justify-between gap-6"
              data-cy={`position-${position.id}`}
            >
              <article className="flex-1">
                <h3 className="font-serif text-xl text-dark-800 mb-3">{position.title}</h3>
                <ul className="flex flex-wrap items-center gap-3 mb-3">
                  <li className="text-sm bg-neutral-100 text-dark-600 px-3 py-1 rounded-full">
                    {position.type}
                  </li>
                  <li className="text-sm bg-neutral-100 text-dark-600 px-3 py-1 rounded-full">
                    {position.locationType}
                  </li>
                  <li className="text-sm bg-neutral-100 text-dark-600 px-3 py-1 rounded-full">
                    {position.department}
                  </li>
                </ul>
                <p className="text-dark-600 text-sm mb-3">{position.location}</p>
                <p className="text-dark-600">{position.description}</p>
              </article>

              <span className="flex items-center gap-2 text-secondary-400">
                <ScrambleText
                  text="Learn More"
                  isHovering={hoveringStates[position.id]}
                  className="w-[100px]"
                />
                <HiOutlineArrowRight className="w-5 h-5 transition-transform duration-300 
                                              group-hover:translate-x-1" />
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default OpenPositions; 