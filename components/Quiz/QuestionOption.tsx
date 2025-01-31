import { motion } from 'framer-motion';
import { HiCheck } from 'react-icons/hi2';
import { Option } from '@/data/quizData';

interface QuestionOptionProps {
  option: Option;
  isSelected: boolean;
  onSelect: (value: string) => void;
  index: number;
}

export default function QuestionOption({ option, isSelected, onSelect, index }: QuestionOptionProps) {
  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={() => onSelect(option.value)}
      data-cy={`option-${index}`}
      className={`p-4 text-left border-2 rounded-lg
                 transition-all duration-300 hover:border-secondary-400
                 hover:bg-neutral-50 group relative
                 ${isSelected ? 'border-secondary-400 bg-neutral-50' : 'border-neutral-200'}`}
      role="radio"
      aria-checked={isSelected}
    >
      <article className="flex items-center">
        <section className="flex-1">
          <h3 
            className={`font-medium transition-colors duration-300
                     ${isSelected ? 'text-dark-800' : 'text-dark-800 group-hover:text-dark-800'}`}
            data-cy="option-label"
          >
            {option.label}
          </h3>
          {option.description && (
            <p 
              className="text-dark-600 text-sm mt-1"
              data-cy="option-description"
            >
              {option.description}
            </p>
          )}
        </section>
        {isSelected && (
          <HiCheck 
            className="ml-4 w-5 h-5 text-secondary-400"
            data-cy="option-selected-icon" 
          />
        )}
      </article>
    </motion.button>
  );
} 