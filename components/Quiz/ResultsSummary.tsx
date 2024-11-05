import { calculateInvestmentRange, getQuestionById, getOptionLabel } from '@/utils/quiz/calculations';
import { motion } from 'framer-motion';
import { HiArrowRight, HiPencil, HiExclamationCircle, HiLightBulb, HiCheckCircle } from 'react-icons/hi2';
import ScrambleText from '@/components/ScrambleText';
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
    <div className="bg-white rounded-lg p-8 shadow-sm w-full">
      <h2 className="font-serif text-2xl text-secondary-400 mb-6">
        Your Growth Strategy Summary
      </h2>
      
      <div className="space-y-6">
        {Object.entries(answers).map(([questionId, selectedValues]) => {
          const question = getQuestionById(questionId, selectedBranches);
          if (!question) return null;

          return (
            <motion.div 
              key={questionId} 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="border-b border-neutral-200 pb-4"
            >
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-medium text-secondary-400">{question.text}</h3>
                <motion.button
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
                    <ScrambleText 
                      text="Edit" 
                      isHovering={hoveringEdit === questionId} 
                    />
                  </span>
                </motion.button>
              </div>
              <div className="flex flex-wrap gap-2">
                {selectedValues.map(value => (
                  <span 
                    key={value} 
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
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.2 }}
          className="mt-8 border-t border-neutral-200 pt-6"
        >
          <div className="flex flex-col gap-4">
            <h3 className="font-medium text-secondary-400">
              Investment Summary:
            </h3>
            
            {/* Initial Investment */}
            <div className="bg-neutral-50 p-4 rounded-lg">
              <p className="text-secondary-400 mb-1">Initial Investment:</p>
              <p className="text-xl font-serif text-secondary-400">
                ${range.initial.min.toLocaleString()}
              </p>
            </div>

            {/* Monthly Investment - Only show if there are monthly costs */}
            {range.monthly.max > 0 && (
              <div className="bg-neutral-50 p-4 rounded-lg">
                <p className="text-secondary-400 mb-1">Monthly Investment:</p>
                <p className="text-xl font-serif text-secondary-400">
                  ${range.monthly.min.toLocaleString()}
                </p>
              </div>
            )}

            {/* Investment Comfort Comparison - Only show if comfort range was selected */}
            {range.comfort.max > 0 && (
              <div className="mt-4 p-4 rounded-lg bg-white border border-neutral-200">
                <div className="flex items-start gap-3">
                  {range.initial.min > range.comfort.max ? (
                    <>
                      <HiExclamationCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                      <div>
                        <p className="font-medium text-secondary-500 mb-1">Investment Consideration</p>
                        <p className="text-secondary-600">
                          Your selected services exceed your indicated investment comfort level. Let's discuss options to align with your budget.
                        </p>
                      </div>
                    </>
                  ) : range.initial.min < range.comfort.min ? (
                    <>
                      <HiLightBulb className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                      <div>
                        <p className="font-medium text-secondary-500 mb-1">Growth Opportunity</p>
                        <p className="text-secondary-600">
                          Your selected services are below your indicated investment range. Consider additional services to maximize your growth potential.
                        </p>
                      </div>
                    </>
                  ) : (
                    <>
                      <HiCheckCircle className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                      <div>
                        <p className="font-medium text-secondary-500 mb-1">Perfect Match</p>
                        <p className="text-secondary-600">
                          Your selected services align well with your investment comfort level.
                        </p>
                      </div>
                    </>
                  )}
                </div>
              </div>
            )}

            {/* Estimate Disclaimer */}
            <div className="mt-2 text-sm text-secondary-600 italic">
              <p>* This is an estimated investment based on your selections. The final amount may be adjusted after we discuss your specific needs and requirements in detail.</p>
            </div>
          </div>

          <motion.button
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
            <span className="w-[140px] text-center">
              <ScrambleText text="Confirm & Submit" isHovering={isHovering} />
            </span>
            <HiArrowRight className="w-5 h-5 shrink-0" />
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
} 