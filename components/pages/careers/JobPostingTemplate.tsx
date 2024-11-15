'use client'

import React, { useState } from 'react';
import Link from 'next/link';
import type { Position } from '@/data/positions';
import CircuitOverlay from '@/components/common/CircuitOverlay';
import { HiOutlineBriefcase, HiOutlineMapPin, HiOutlineBuildingOffice, HiOutlineArrowLeft } from 'react-icons/hi2';
import ScrambleText from '@/components/common/ScrambleText';
import { HiOutlinePaperAirplane } from 'react-icons/hi2';

interface JobPostingTemplateProps {
  position: Position;
}

const SectionHeading = ({ children }: { children: React.ReactNode }) => (
  <h2 className="font-serif text-2xl text-secondary-400 mb-6 
                 border-b-2 border-neutral-200 pb-4">
    {children}
  </h2>
);

const SubHeading = ({ children }: { children: React.ReactNode }) => (
  <h3 className="font-serif text-xl text-secondary-400 mb-3 
                 inline-block relative">
    <span className="relative z-10">{children}</span>
  </h3>
);

const JobPostingTemplate = ({ position }: JobPostingTemplateProps) => {
  const [hoveringBack, setHoveringBack] = useState(false);
  const [hoveringApply, setHoveringApply] = useState(false);

  const handleApply = () => {
    // TODO: Implement application flow
  };

  return (
    <div className="relative bg-neutral-50 min-h-screen" data-cy="job-posting">
      <CircuitOverlay />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <Link
          href="/careers"
          data-cy="back-link"
          onMouseEnter={() => setHoveringBack(true)}
          onMouseLeave={() => setHoveringBack(false)}
          className="inline-flex items-center gap-2 text-secondary-400 hover:text-secondary-500 
                     transition-colors duration-300 mb-6 group"
        >
          <HiOutlineArrowLeft className="w-5 h-5 transition-transform duration-300 
                                       group-hover:-translate-x-1" />
          <span className="w-[160px]">
            <ScrambleText
              text="Back to Careers"
              isHovering={hoveringBack}
            />
          </span>
        </Link>

        <div className="bg-white rounded-lg shadow-lg border-2 border-neutral-200 p-8 sm:p-12">
          <div className="mb-12" data-cy="job-header">
            <h1 className="font-serif text-4xl sm:text-5xl text-secondary-400 mb-4" data-cy="job-title">
              {position.title}
            </h1>
            <div className="flex flex-wrap gap-4 mb-6" data-cy="job-meta">
              <div data-cy="job-type" className="flex items-center gap-2 text-secondary-500 bg-neutral-50 px-4 py-2 rounded-full">
                <HiOutlineBriefcase className="w-5 h-5" />
                <span>{position.type}</span>
              </div>
              <div data-cy="job-location-type" className="flex items-center gap-2 text-secondary-500 bg-neutral-50 px-4 py-2 rounded-full">
                <HiOutlineMapPin className="w-5 h-5" />
                <span>{position.locationType}</span>
              </div>
              <div data-cy="job-location" className="flex items-center gap-2 text-secondary-500 bg-neutral-50 px-4 py-2 rounded-full">
                <HiOutlineBuildingOffice className="w-5 h-5" />
                <span>{position.location}</span>
              </div>
            </div>
            <p className="text-secondary-500" data-cy="job-exemption">
              {position.isExempt ? 'FSLA Exempt' : 'FSLA Non-Exempt'}
            </p>
          </div>

          <div className="space-y-16">
            <div data-cy="position-summary">
              <SectionHeading>Position Summary</SectionHeading>
              <p className="text-secondary-500" data-cy="position-summary-text">
                {position.overview}
              </p>
            </div>

            <div data-cy="responsibilities">
              <SectionHeading>Key Responsibilities</SectionHeading>
              <ul className="list-disc list-outside ml-6 space-y-4 text-secondary-500">
                {position.responsibilities.map((section, index) => (
                  <li key={index} data-cy={`responsibility-${index}`} className="leading-relaxed">
                    <span className="tracking-wide text-secondary-400" data-cy={`responsibility-title-${index}`}>
                      {section.title}:
                    </span>
                    {' '}
                    <span data-cy={`responsibility-items-${index}`}>
                      {section.items.join(' ')}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            <div data-cy="qualifications">
              <SectionHeading>Qualifications</SectionHeading>
              <div className="space-y-8">
                {position.qualifications.required.length > 0 && (
                  <div data-cy="required-qualifications">
                    <SubHeading>Required Skills & Experience</SubHeading>
                    <ul className="list-disc list-outside ml-6 space-y-3 text-secondary-500">
                      {position.qualifications.required.map((skill, index) => (
                        <li key={index} className="leading-relaxed" data-cy={`required-skill-${index}`}>
                          {skill}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                
                {position.qualifications.preferred.length > 0 && (
                  <div data-cy="preferred-qualifications">
                    <SubHeading>Nice-to-Have Skills</SubHeading>
                    <ul className="list-disc list-outside ml-6 space-y-3 text-secondary-500">
                      {position.qualifications.preferred.map((skill, index) => (
                        <li key={index} className="leading-relaxed" data-cy={`preferred-skill-${index}`}>
                          {skill}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>

            <div data-cy="why-join-us">
              <SectionHeading>Why Join Us?</SectionHeading>
              <ul className="list-disc list-outside ml-6 space-y-4 text-secondary-500">
                {position.whyJoinUs.map((reason, index) => (
                  <li key={index} className="leading-relaxed" data-cy={`why-join-us-reason-${index}`}>
                    {reason.split(':').map((part, partIndex) => 
                      partIndex === 0 ? (
                        <span key={partIndex} className="text-secondary-400" data-cy={`why-join-us-reason-title-${index}`}>
                          {part}:
                        </span>
                      ) : (
                        <span key={partIndex} data-cy={`why-join-us-reason-description-${index}`}>
                          {part}
                        </span>
                      )
                    )}
                  </li>
                ))}
              </ul>
            </div>

            <div data-cy="benefits">
              <SectionHeading>Benefits</SectionHeading>
              <ul className="list-disc list-outside ml-6 space-y-3 text-secondary-500">
                {position.benefits.map((benefit, index) => (
                  <li key={index} className="leading-relaxed" data-cy={`benefit-${index}`}>
                    {benefit}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="text-center mt-16">
            <button
              data-cy="apply-button"
              onMouseEnter={() => setHoveringApply(true)}
              onMouseLeave={() => setHoveringApply(false)}
              className="inline-flex items-center justify-center gap-2 px-8 py-4
                         bg-secondary-400 text-white rounded-lg border-2 border-secondary-400
                         hover:bg-transparent hover:text-secondary-400 
                         transition-all duration-300 hover:scale-105
                         font-medium text-lg w-[200px]"
              onClick={handleApply}
            >
              <HiOutlinePaperAirplane className="w-5 h-5 shrink-0" />
              <span className="w-[100px]">
                <ScrambleText
                  text="Apply Now"
                  isHovering={hoveringApply}
                />
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobPostingTemplate; 