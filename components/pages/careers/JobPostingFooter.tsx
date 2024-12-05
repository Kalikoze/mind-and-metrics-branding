import React from 'react';
import { HiOutlinePaperAirplane } from 'react-icons/hi2';
import ScrambleButton from '@/components/common/ScrambleButton';

interface JobPostingFooterProps {
  onApplyClick: () => void;
}

const JobPostingFooter = ({ onApplyClick }: JobPostingFooterProps) => (
  <footer className="text-center mt-16">
    <div onClick={onApplyClick}>
      <ScrambleButton
        text="Apply Now"
        href="#"
        icon={HiOutlinePaperAirplane}
        variant="primary"
        dataCy="apply-button"
      />
    </div>
  </footer>
);

export default JobPostingFooter; 