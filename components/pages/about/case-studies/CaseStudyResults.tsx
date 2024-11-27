interface Result {
  metric: string;
  value: string;
}

interface CaseStudyResultsProps {
  results: Result[];
}

export const CaseStudyResults = ({ results }: CaseStudyResultsProps) => {
  return (
    <section className="grid grid-cols-3 gap-4">
      {results.map((result, index) => (
        <article key={index} className="text-center p-4 bg-neutral-50 rounded-lg">
          <p className="font-serif text-2xl text-dark-800 mb-1 block">
            {result.value}
          </p>
          <p className="text-sm text-dark-600">
            {result.metric}
          </p>
        </article>
      ))}
    </section>
  );
}; 