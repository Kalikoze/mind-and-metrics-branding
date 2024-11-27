import React from 'react';
import { HiOutlinePaperAirplane } from 'react-icons/hi2';
import ScrambleText from '@/components/common/ScrambleText';

interface JobPostingFooterProps {
  hoveringApply: boolean;
  setHoveringApply: (hovering: boolean) => void;
  onApplyClick: () => void;
}

const JobPostingFooter = ({ hoveringApply, setHoveringApply, onApplyClick }: JobPostingFooterProps) => (
  <footer className="text-center mt-16">
    <button
      data-cy="apply-button"
      onMouseEnter={() => setHoveringApply(true)}
      onMouseLeave={() => setHoveringApply(false)}
      className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4
               bg-secondary-400 text-white rounded-lg border-2 border-secondary-400
               hover:bg-transparent hover:text-secondary-400 
               transition-all duration-300 hover:scale-105
               font-medium"
      onClick={onApplyClick}
    >
      <HiOutlinePaperAirplane className="w-5 h-5 shrink-0" />
      <span className="w-[100px]">
        <ScrambleText
          text="Apply Now"
          isHovering={hoveringApply}
        />
      </span>
    </button>
  </footer>
);

export default JobPostingFooter; 