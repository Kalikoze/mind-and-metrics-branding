import React from 'react';

interface Stat {
  value: string;
  label: string;
}

interface ValuePropositionProps {
  title: string;
  paragraphs: {
    text: string;
    highlights?: string[];
  }[];
  stats: Stat[];
}

const ValueProposition: React.FC<ValuePropositionProps> = ({
  title,
  paragraphs,
  stats,
}) => {
  const renderParagraphWithHighlights = (text: string, highlights: string[] = [], index: number) => {
    if (!highlights.length) return text;

    let result = text;
    highlights.forEach((word, highlightIndex) => {
      const regex = new RegExp(`(${word})`, 'gi');
      result = result.replace(
        regex,
        `<span class="text-dark-800 font-semibold" data-cy="value-proposition-highlight-${index}-${highlightIndex}">$1</span>`
      );
    });

    return <p dangerouslySetInnerHTML={{ __html: result }} />;
  };

  return (
    <section
      className="relative overflow-hidden bg-neutral-50 py-24"
      data-cy="value-proposition-section"
    >
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2
          className="font-serif text-4xl text-primary-400 mb-8 text-center"
          data-cy="value-proposition-title"
        >
          {title}
        </h2>

        <div
          className="space-y-8 text-lg text-dark-600 leading-relaxed"
          data-cy="value-proposition-content"
        >
          {paragraphs.map((paragraph, index) => (
            <div
              key={index}
              className="value-proposition-paragraph"
              data-cy={`value-proposition-paragraph-${index}`}
            >
              {renderParagraphWithHighlights(paragraph.text, paragraph.highlights, index)}
            </div>
          ))}
        </div>

        <div
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16"
          data-cy="value-proposition-stats"
        >
          {stats.map((stat, index) => (
            <div
              key={index}
              className="text-center p-6"
              data-cy={`value-proposition-stat-${index}`}
            >
              <div
                className="font-serif text-3xl text-primary-700 mb-2"
                data-cy={`value-proposition-stat-value-${index}`}
              >
                {stat.value}
              </div>
              <div
                className="text-dark-600"
                data-cy={`value-proposition-stat-label-${index}`}
              >
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ValueProposition; 