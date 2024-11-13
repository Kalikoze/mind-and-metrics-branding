import { calculateInvestmentRange, getQuestionById, getOptionLabel } from '@/utils/quiz/calculations';
import { motion } from 'framer-motion';
import { HiArrowRight, HiPencil, HiExclamationCircle, HiLightBulb, HiCheckCircle } from 'react-icons/hi2';
import ScrambleText from '@/components/common/ScrambleText';
import { useState } from 'react';

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
  const [isHovering, setIsHovering] = useState(false);
  const [hoveringEdit, setHoveringEdit] = useState<string | null>(null);
  const range = calculateInvestmentRange(answers, selectedBranches);

  return (
    <div className="bg-white rounded-lg p-8 shadow-sm w-full" data-cy="results-summary">
      <div className="mb-8">
        <h1 className="font-serif text-3xl text-secondary-400 mb-4" data-cy="summary-title">
          Your Growth Strategy Summary
        </h1>
        <h2 className="text-secondary-500/80 text-sm italic" data-cy="summary-subtitle">
          Review your selections and estimated investment
        </h2>
      </div>

      <div className="space-y-6" data-cy="selections-container">
        {Object.entries(answers).map(([questionId, selectedValues]) => {
          const question = getQuestionById(questionId, selectedBranches);
          if (!question) return null;

          return (
            <motion.div
              key={questionId}
              data-cy={`question-summary-${questionId}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="border-b border-neutral-200 pb-4"
            >
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-medium text-secondary-400 px-2" data-cy={`question-text-${questionId}`}>
                  {question.text}
                </h3>
                <motion.button
                  data-cy={`edit-button-${questionId}`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => onEdit(questionId)}
                  onMouseEnter={() => setHoveringEdit(questionId)}
                  onMouseLeave={() => setHoveringEdit(null)}
                  className="px-4 py-2 bg-transparent text-secondary-400 
                           rounded-lg flex items-center space-x-2 border-2 
                           border-secondary-400 text-sm font-medium
                           transition-all duration-300 hover:bg-secondary-400 
                           hover:text-white"
                >
                  <HiPencil className="w-4 h-4 shrink-0" />
                  <span className="w-[40px] text-center">
                    <ScrambleText text="Edit" isHovering={hoveringEdit === questionId} />
                  </span>
                </motion.button>
              </div>
              <div className="flex flex-wrap gap-2" data-cy={`selected-values-${questionId}`}>
                {selectedValues.map(value => (
                  <span
                    key={value}
                    data-cy={`selected-value-${questionId}-${value}`}
                    className="inline-block px-3 py-1.5 bg-neutral-100 
                             text-secondary-400 rounded-lg text-sm"
                  >
                    {getOptionLabel(question, value)}
                  </span>
                ))}
              </div>
            </motion.div>
          );
        })}

        <motion.div
          data-cy="investment-summary"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.2 }}
          className="mt-8 border-neutral-200"
        >
          <div className="flex flex-col gap-4">
            <h3 className="font-medium text-secondary-400" data-cy="investment-title">
              Investment Summary:
            </h3>

            <div className="bg-neutral-50 p-4 rounded-lg" data-cy="initial-investment">
              <p className="text-secondary-400 mb-1">Initial Investment:</p>
              <p className="text-xl font-serif text-secondary-400" data-cy="initial-investment-amount">
                ${range.initial.min.toLocaleString()}
              </p>
            </div>

            {range.monthly.max > 0 && (
              <div className="bg-neutral-50 p-4 rounded-lg" data-cy="monthly-investment">
                <p className="text-secondary-400 mb-1">Monthly Investment:</p>
                <p className="text-xl font-serif text-secondary-400" data-cy="monthly-investment-amount">
                  ${range.monthly.min.toLocaleString()}
                </p>
              </div>
            )}

            {range.comfort.max > 0 && (
              <div className="mt-4 p-4 rounded-lg bg-white border border-neutral-200" data-cy="investment-comparison">
                <div className="flex items-start gap-3">
                  {range.initial.min > range.comfort.max ? (
                    <div data-cy="investment-warning">
                      <HiExclamationCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                      <div>
                        <p className="font-medium text-secondary-500 mb-1">Investment Consideration</p>
                        <p className="text-secondary-600">
                          Your selected services exceed your indicated investment comfort level. Let&apos;s discuss options to align with your budget.
                        </p>
                      </div>
                    </div>
                  ) : range.initial.min < range.comfort.min ? (
                    <div data-cy="investment-opportunity">
                      <HiLightBulb className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                      <div>
                        <p className="font-medium text-secondary-500 mb-1">Growth Opportunity</p>
                        <p className="text-secondary-600">
                          Your selected services are below your indicated investment range. Consider additional services to maximize your growth potential.
                        </p>
                      </div>
                    </div>
                  ) : (
                    <div data-cy="investment-match">
                      <HiCheckCircle className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                      <div>
                        <p className="font-medium text-secondary-500 mb-1">Perfect Match</p>
                        <p className="text-secondary-600">
                          Your selected services align well with your investment comfort level.
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            <div className="mt-2 text-sm text-secondary-600 italic" data-cy="investment-disclaimer">
              <p>* This is an estimated investment based on your selections. The final amount may be adjusted after we discuss your specific needs and requirements in detail.</p>
            </div>
          </div>

          <motion.button
            data-cy="confirm-selections"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onConfirm}
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
            className="w-full mt-6 px-8 py-3.5 bg-secondary-400 text-white font-medium
                     rounded-lg flex items-center justify-center space-x-2 
                     border-2 border-secondary-400 transition-all duration-300 
                     hover:bg-transparent hover:text-secondary-400"
          >
            <span className="w-[200px] text-center">
              <ScrambleText text="Continue to Contact Info" isHovering={isHovering} />
            </span>
            <HiArrowRight className="w-5 h-5 shrink-0" />
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
} 