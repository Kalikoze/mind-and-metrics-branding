import React from 'react';
import Link from 'next/link';
import { HiOutlineArrowLeft } from 'react-icons/hi2';
import ScrambleText from '@/components/common/ScrambleText';

interface JobPostingNavProps {
  hoveringBack: boolean;
  setHoveringBack: (hovering: boolean) => void;
}

const JobPostingNav = ({ hoveringBack, setHoveringBack }: JobPostingNavProps) => (
  <nav aria-label="Back to careers navigation">
    <Link
      href="/careers"
      data-cy="back-link"
      onMouseEnter={() => setHoveringBack(true)}
      onMouseLeave={() => setHoveringBack(false)}
      className="inline-flex items-center gap-2 text-secondary-400 hover:text-secondary-500 
                 transition-colors duration-300 mb-6 group"
    >
      <HiOutlineArrowLeft 
        className="w-5 h-5 transition-transform duration-300 group-hover:-translate-x-1" 
        aria-hidden="true"
      />
      <span className="w-[160px]">
        <ScrambleText
          text="Back to Careers"
          isHovering={hoveringBack}
        />
      </span>
    </Link>
  </nav>
);

export default JobPostingNav; 