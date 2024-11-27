interface MobilePaginationProps {
  studies: Array<{ id: string }>;
  activeStudyId: string;
  onStudySelect: (id: string) => void;
}

export const MobilePagination = ({ studies, activeStudyId, onStudySelect }: MobilePaginationProps) => {
  return (
    <nav 
      className="md:hidden absolute bottom-4 left-0 right-0 flex justify-center"
      role="tablist"
      aria-label="Case study pagination"
    >
      {studies.map((study, index) => (
        <button
          key={study.id}
          onClick={() => onStudySelect(study.id)}
          role="tab"
          aria-selected={study.id === activeStudyId}
          aria-controls={`panel-${study.id}`}
          aria-label={`Case study ${index + 1} of ${studies.length}`}
          data-cy={`case-study-indicator-${index}`}
          className={`h-1 rounded-full transition-all duration-300 mx-1
            ${study.id === activeStudyId
              ? 'w-8 bg-secondary-400'
              : 'w-2 bg-secondary-400/40'}`}
        />
      ))}
    </nav>
  );
}; 