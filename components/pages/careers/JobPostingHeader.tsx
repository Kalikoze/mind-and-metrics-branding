import React from 'react';
import { HiOutlineBriefcase, HiOutlineMapPin, HiOutlineBuildingOffice } from 'react-icons/hi2';
import type { Position } from '@/data/positions';

interface JobPostingHeaderProps {
  position: Position;
}

const JobPostingHeader = ({ position }: JobPostingHeaderProps) => (
  <header className="mb-12" data-cy="job-header">
    <h1 className="font-serif text-4xl sm:text-5xl text-dark-800 mb-4" data-cy="job-title">
      {position.title}
    </h1>
    <ul className="flex flex-wrap gap-4 mb-6" data-cy="job-meta">
      <li data-cy="job-type" className="flex items-center gap-2 text-dark-600 bg-neutral-50 px-4 py-2 rounded-full">
        <HiOutlineBriefcase className="w-5 h-5" aria-hidden="true" />
        {position.type}
      </li>
      <li data-cy="job-location-type" className="flex items-center gap-2 text-dark-600 bg-neutral-50 px-4 py-2 rounded-full">
        <HiOutlineMapPin className="w-5 h-5" aria-hidden="true" />
        {position.locationType}
      </li>
      <li data-cy="job-location" className="flex items-center gap-2 text-dark-600 bg-neutral-50 px-4 py-2 rounded-full">
        <HiOutlineBuildingOffice className="w-5 h-5" aria-hidden="true" />
        {position.location}
      </li>
    </ul>
    <p className="text-dark-600" data-cy="job-exemption">
      {position.isExempt ? 'FSLA Exempt' : 'FSLA Non-Exempt'}
    </p>
  </header>
);

export default JobPostingHeader; 