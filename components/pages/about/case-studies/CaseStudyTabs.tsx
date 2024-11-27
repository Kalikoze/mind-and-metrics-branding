import Image from 'next/image';
import { CaseStudy } from '@/data/caseStudies';

interface CaseStudyTabsProps {
  studies: CaseStudy[];
  activeStudyId: string;
  onStudySelect: (id: string) => void;
}

export const CaseStudyTabs = ({ studies, activeStudyId, onStudySelect }: CaseStudyTabsProps) => {
  return (
    <div
      className="flex justify-center mb-12 space-x-4"
      role="tablist"
      aria-label="Case study selection"
    >
      {studies.map((study) => (
        <button
          key={study.id}
          onClick={() => onStudySelect(study.id)}
          role="tab"
          aria-selected={activeStudyId === study.id}
          aria-controls={`panel-${study.id}`}
          id={`tab-${study.id}`}
          data-cy={`case-study-tab-${study.id}`}
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
          <span className="sr-only">
            View case study for {study.client}
          </span>
          <Image
            src={study.logo}
            alt={`${study.client} logo`}
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
  );
}; 