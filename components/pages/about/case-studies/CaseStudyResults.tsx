interface Result {
  metric: string;
  value: string;
}

interface CaseStudyResultsProps {
  results: Result[];
}

export const CaseStudyResults = ({ results }: CaseStudyResultsProps) => {
  return (
    <div className="grid grid-cols-3 gap-4">
      {results.map((result, index) => (
        <div key={index} className="text-center p-4 bg-neutral-50 rounded-lg">
          <div className="font-serif text-2xl text-dark-800 mb-1">
            {result.value}
          </div>
          <div className="text-sm text-dark-600">
            {result.metric}
          </div>
        </div>
      ))}
    </div>
  );
}; 