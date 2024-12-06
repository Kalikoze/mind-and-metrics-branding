import { calculateInvestmentRange, getQuestionById, getOptionLabel } from '@/utils/quiz/calculations';
import { motion } from 'framer-motion';
import { HiArrowRight, HiPencil, HiExclamationCircle, HiLightBulb, HiCheckCircle } from 'react-icons/hi2';
import ScrambleButton from '@/components/common/ScrambleButton';

interface ResultsSummaryProps {
  answers: Record<string, string[]>;
  selectedBranches: string[];
  onEdit: (questionId: string) => void;
  onConfirm: () => void;
}

export default function ResultsSummary({
  answers,
  selectedBranches,
  onEdit,
  onConfirm
}: ResultsSummaryProps) {
  const range = calculateInvestmentRange(answers, selectedBranches);

  const hasOverlap = (
    range1: { min: number; max: number }, 
    range2: { min: number; max: number }
  ) => {
    return !(range1.max < range2.min || range1.min > range2.max);
  };

  const getOverlapPercentage = (
    range1: { min: number; max: number }, 
    range2: { min: number; max: number }
  ) => {
    if (!hasOverlap(range1, range2)) return 0;
    const overlapStart = Math.max(range1.min, range2.min);
    const overlapEnd = Math.min(range1.max, range2.max);
    const overlapSize = overlapEnd - overlapStart;
    const range1Size = range1.max - range1.min;
    return (overlapSize / range1Size) * 100;
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.3 }}
      className="bg-white rounded-lg p-8 border-2 border-neutral-200
                 transition-all duration-300 hover:border-secondary-400
                 hover:shadow-lg w-full"
      data-cy="results-summary"
    >
      <header className="mb-8">
        <h1 className="font-serif text-3xl text-dark-800 mb-4" data-cy="summary-title">
          Your Growth Strategy Summary
        </h1>
        <h2 className="text-dark-600 text-lg" data-cy="summary-subtitle">
          Review your selections and estimated investment
        </h2>
      </header>

      <section className="space-y-6" data-cy="selections-container">
        {Object.entries(answers).map(([questionId, selectedValues]) => {
          const question = getQuestionById(questionId, selectedBranches);
          if (!question) return null;

          return (
            <article
              key={questionId}
              data-cy={`question-summary-${questionId}`}
              className="border-b border-neutral-200 pb-4"
            >
              <header className="flex justify-between items-start mb-2">
                <h3 className="font-medium text-dark-800 px-2" data-cy={`question-text-${questionId}`}>
                  {question.text}
                </h3>
                <ScrambleButton
                  text="Edit"
                  href="#"
                  onClick={() => onEdit(questionId)}
                  icon={HiPencil}
                  variant="secondary"
                  dataCy={`edit-button-${questionId}`}
                  spanWidth="40px"
                  className="!px-4 !py-2"
                  fixedWidth={true}
                />
              </header>
              <div 
                className="flex flex-wrap gap-2" 
                data-cy={`selected-values-${questionId}`}
              >
                {selectedValues.map(value => (
                  <span
                    key={value}
                    data-cy={`selected-value-${questionId}-${value}`}
                    className="inline-block px-3 py-1.5 bg-neutral-50 
                             text-dark-600 rounded-lg text-sm border
                             border-neutral-200"
                  >
                    {getOptionLabel(question, value)}
                  </span>
                ))}
              </div>
            </article>
          );
        })}

        <section
          data-cy="investment-summary"
          className="flex flex-col gap-4"
        >
          <header className="flex flex-col gap-4">
            <h3 className="font-serif text-2xl text-dark-800" data-cy="investment-title">
              Investment Summary:
            </h3>
          </header>

          <article className="bg-neutral-50 p-6 rounded-lg border-2 border-neutral-200" data-cy="service-investment">
            <p className="text-dark-800 mb-1 font-medium">Initial Investment Range:</p>
            <p className="text-2xl font-serif text-dark-800" data-cy="service-investment-amount">
              ${range.initial.min.toLocaleString()} - ${range.initial.max.toLocaleString()}
            </p>
            <p className="text-dark-600 mt-2">
              Estimated Service Hours: {range.initial.hours.min} - {range.initial.hours.max} hrs
            </p>
            <p className="text-sm text-dark-600 mt-4 italic">
              Note: Some services may be one-time projects while others may require ongoing support. 
              We&apos;ll discuss specific timelines and maintenance needs during our consultation.
            </p>
          </article>

          {range.comfort.max > 0 && (
            <article 
              className="p-6 rounded-lg bg-white border-2 border-neutral-200" 
              data-cy="investment-comparison"
            >
              <div className="flex items-start gap-3">
                {(() => {
                  const initial = { min: range.initial.min, max: range.initial.max };
                  const comfort = { min: range.comfort.min, max: range.comfort.max };
                  const overlapPercent = getOverlapPercentage(initial, comfort);

                  if (!hasOverlap(initial, comfort)) {
                    if (initial.min > comfort.max) {
                      return (
                        <div data-cy="investment-warning">
                          <HiExclamationCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                          <div>
                            <p className="font-medium text-dark-800 mb-1">Investment Consideration</p>
                            <p className="text-dark-600">
                              Your selected services exceed your indicated investment comfort level. Let&apos;s discuss options to align with your budget.
                            </p>
                          </div>
                        </div>
                      );
                    } else {
                      return (
                        <div data-cy="investment-opportunity">
                          <HiLightBulb className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                          <div>
                            <p className="font-medium text-dark-800 mb-1">Growth Opportunity</p>
                            <p className="text-dark-600">
                              Your selected services are below your indicated investment range. Consider additional services to maximize your growth potential.
                            </p>
                          </div>
                        </div>
                      );
                    }
                  }

                  return (
                    <div data-cy="investment-match">
                      <HiCheckCircle className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                      <div>
                        <p className="font-medium text-dark-800 mb-1">
                          {overlapPercent > 75 ? 'Strong Range Alignment' : 'Partial Range Alignment'}
                        </p>
                        <p className="text-dark-600">
                          {overlapPercent > 75 
                            ? 'Your selected services align well with your investment comfort level.'
                            : 'Your selected services partially overlap with your investment comfort range. We can discuss adjustments if needed.'}
                        </p>
                      </div>
                    </div>
                  );
                })()}
              </div>
            </article>
          )}

          <footer 
            className="mt-2 text-sm text-dark-600 italic" 
            data-cy="investment-disclaimer"
          >
            <p>* This is an estimated investment based on projected hours at our standard rate of $110/hour. 
               The final scope and hours may be adjusted after we discuss your specific needs and requirements in detail.</p>
          </footer>
        </section>

        <ScrambleButton
          text="Continue to Contact Info"
          href="#"
          onClick={onConfirm}
          icon={HiArrowRight}
          variant="primary"
          dataCy="confirm-selections"
          spanWidth="200px"
          className="!w-full"
        />
      </section>
    </motion.div>
  );
} 