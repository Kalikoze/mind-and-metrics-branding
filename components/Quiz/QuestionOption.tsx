import { motion } from 'framer-motion';
import { HiCheck } from 'react-icons/hi2';
import { Option } from '@/components/Quiz/quizData';

interface QuestionOptionProps {
  option: Option;
  isSelected: boolean;
  onSelect: (value: string) => void;
}

export default function QuestionOption({ option, isSelected, onSelect }: QuestionOptionProps) {
  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={() => onSelect(option.value)}
      className={`p-4 text-left border-2 rounded-lg
                 transition-all duration-300 hover:border-secondary-400
                 hover:bg-neutral-50 group relative
                 ${isSelected ? 'border-secondary-400 bg-neutral-50' : 'border-neutral-200'}`}
    >
      <div className="flex items-center">
        <div className="flex-1">
          <h3 className={`font-medium transition-colors duration-300
                       ${isSelected ? 'text-secondary-400' : 'text-secondary-500 group-hover:text-secondary-400'}`}>
            {option.label}
          </h3>
          {option.description && (
            <p className="text-secondary-400 text-sm mt-1">
              {option.description}
            </p>
          )}
        </div>
        {isSelected && (
          <div className="ml-4">
            <HiCheck className="w-6 h-6 text-secondary-400" />
          </div>
        )}
      </div>
    </motion.button>
  );
} 