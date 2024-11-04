import { motion } from 'framer-motion';
import { Question } from './quizData';
import { HiCheck } from 'react-icons/hi2';

interface QuizQuestionProps {
  question: Question;
  selectedAnswers: string[];
  onAnswer: (questionId: string, answer: string) => void;
}

export default function QuizQuestion({ question, selectedAnswers, onAnswer }: QuizQuestionProps) {
  const isSelected = (value: string) => selectedAnswers.includes(value);

  const handleOptionClick = (value: string) => {
    if (!question.multiSelect) {
      // For single select, replace the current selection
      onAnswer(question.id, value);
      return;
    }
    onAnswer(question.id, value);
  };

  return (
    <div className="bg-white rounded-lg p-8 shadow-sm w-full">
      <h2 className="font-serif text-2xl text-secondary-400 mb-6">
        {question.text}
      </h2>
      
      <div className="grid gap-4">
        {question.options.map((option, index) => (
          <motion.button
            key={index}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => handleOptionClick(option.value)}
            className={`p-4 text-left border-2 rounded-lg
                     transition-all duration-300 hover:border-secondary-400
                     hover:bg-neutral-50 group relative
                     ${isSelected(option.value) 
                       ? 'border-secondary-400 bg-neutral-50' 
                       : 'border-neutral-200'}`}
          >
            <div className="flex items-center">
              <div className="flex-1">
                <h3 className={`font-medium transition-colors duration-300
                             ${isSelected(option.value) 
                               ? 'text-secondary-400' 
                               : 'text-secondary-500 group-hover:text-secondary-400'}`}>
                  {option.label}
                </h3>
                {option.description && (
                  <p className="text-secondary-400 text-sm mt-1">
                    {option.description}
                  </p>
                )}
              </div>
              {isSelected(option.value) && (
                <div className="ml-4">
                  <HiCheck className="w-6 h-6 text-secondary-400" />
                </div>
              )}
            </div>
          </motion.button>
        ))}
      </div>

      {selectedAnswers.length > 0 && (
        <div className="mt-8 flex justify-end">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onAnswer(question.id, 'NEXT')}
            className="px-8 py-3.5 bg-secondary-400 text-white font-medium
                     rounded-lg flex items-center space-x-2 border-2 border-secondary-400
                     transition-all duration-300 hover:bg-transparent 
                     hover:text-secondary-400"
          >
            Continue
          </motion.button>
        </div>
      )}
    </div>
  );
} 