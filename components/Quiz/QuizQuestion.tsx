import { motion, AnimatePresence } from 'framer-motion';
import { Question, Option } from './quizData';
import { HiCheck, HiArrowRight, HiArrowLeft } from 'react-icons/hi2';
import { useState } from 'react';
import ScrambleText from '../ScrambleText';

interface QuizQuestionProps {
  question: Question;
  selectedAnswers: string[];
  onAnswer: (questionId: string, answer: string) => void;
  onBack: () => void;
  showBack: boolean;
}

export default function QuizQuestion({ question, selectedAnswers, onAnswer, onBack, showBack }: QuizQuestionProps) {
  const isSelected = (value: string) => selectedAnswers.includes(value);
  const [isHovering, setIsHovering] = useState(false);
  const [isBackHovering, setIsBackHovering] = useState(false);

  return (
    <div className="bg-white rounded-lg p-8 shadow-sm w-full">
      <h2 className="font-serif text-2xl text-secondary-400 mb-6">
        {question.text}
      </h2>
      
      <div className="grid gap-4">
        {question.options.map((option: Option, index: number) => (
          <motion.button
            key={index}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onAnswer(question.id, option.value)}
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

      <div className="h-[76px] mt-8">
        <div className={`flex ${showBack ? 'justify-between' : 'justify-end'} items-center`}>
          <AnimatePresence mode="wait">
            {showBack && (
              <motion.button
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.2 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={onBack}
                onMouseEnter={() => setIsBackHovering(true)}
                onMouseLeave={() => setIsBackHovering(false)}
                className="px-8 py-3.5 bg-transparent text-secondary-400 font-medium
                         rounded-lg flex items-center space-x-2 border-2 border-secondary-400
                         transition-all duration-300 hover:bg-secondary-400 
                         hover:text-white"
              >
                <HiArrowLeft className="w-5 h-5 shrink-0" />
                <span className="w-[80px] text-center">
                  <ScrambleText text="Back" isHovering={isBackHovering} />
                </span>
              </motion.button>
            )}
          </AnimatePresence>
          
          <AnimatePresence mode="wait">
            {selectedAnswers.length > 0 && (
              <motion.button
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.2 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => onAnswer(question.id, 'NEXT')}
                onMouseEnter={() => setIsHovering(true)}
                onMouseLeave={() => setIsHovering(false)}
                className="px-8 py-3.5 bg-secondary-400 text-white font-medium
                         rounded-lg flex items-center space-x-2 border-2 border-secondary-400
                         transition-all duration-300 hover:bg-transparent 
                         hover:text-secondary-400"
              >
                <span className="w-[80px] text-center">
                  <ScrambleText text="Continue" isHovering={isHovering} />
                </span>
                <HiArrowRight className="w-5 h-5 shrink-0" />
              </motion.button>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
} 