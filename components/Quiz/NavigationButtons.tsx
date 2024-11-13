import { motion, AnimatePresence } from 'framer-motion';
import { HiArrowRight, HiArrowLeft, HiListBullet } from 'react-icons/hi2';
import ScrambleText from '../common/ScrambleText';
import { useState } from 'react';

interface NavigationButtonsProps {
  showBack: boolean;
  canContinue: boolean;
  onBack: () => void;
  onContinue: () => void;
  isEditing?: boolean;
  onReturnToSummary?: () => void;
}

export default function NavigationButtons({
  showBack,
  canContinue,
  onBack,
  onContinue,
  isEditing,
  onReturnToSummary,
}: NavigationButtonsProps) {
  const [isHovering, setIsHovering] = useState(false);
  const [isBackHovering, setIsBackHovering] = useState(false);
  const [isSummaryHovering, setIsSummaryHovering] = useState(false);

  return (
    <div className="flex justify-between items-center">
      <div className="flex-1">
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
              data-cy="back-button"
            >
              <HiArrowLeft className="w-5 h-5 shrink-0" />
              <span className="w-[80px] text-center">
                <ScrambleText text="Back" isHovering={isBackHovering} />
              </span>
            </motion.button>
          )}
        </AnimatePresence>
      </div>

      <div className="flex gap-4">
        {isEditing && (
          <motion.button
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ duration: 0.2 }}
            whileHover={onReturnToSummary ? { scale: 1.05 } : undefined}
            whileTap={onReturnToSummary ? { scale: 0.95 } : undefined}
            onClick={onReturnToSummary}
            onMouseEnter={() => setIsSummaryHovering(true)}
            onMouseLeave={() => setIsSummaryHovering(false)}
            disabled={!onReturnToSummary}
            className={`px-8 py-3.5 font-medium rounded-lg flex items-center space-x-2 border-2
                     transition-all duration-300 ${onReturnToSummary
                ? 'bg-transparent text-secondary-400 border-secondary-400 hover:bg-secondary-400 hover:text-white'
                : 'bg-transparent text-neutral-300 border-neutral-300 cursor-not-allowed'
              }`}
            data-cy="return-to-summary"
          >
            <HiListBullet className="w-5 h-5 shrink-0" />
            <span className="w-[140px] text-center">
              <ScrambleText text="Return to Summary" isHovering={isSummaryHovering && !!onReturnToSummary} />
            </span>
          </motion.button>
        )}

        {canContinue && (
          <motion.button
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ duration: 0.2 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onContinue}
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
            className="px-8 py-3.5 bg-secondary-400 text-white font-medium
                     rounded-lg flex items-center space-x-2 border-2 border-secondary-400
                     transition-all duration-300 hover:bg-transparent 
                     hover:text-secondary-400"
            data-cy="continue-button"
          >
            <span className="w-[80px] text-center">
              <ScrambleText text="Continue" isHovering={isHovering} />
            </span>
            <HiArrowRight className="w-5 h-5 shrink-0" />
          </motion.button>
        )}
      </div>
    </div>
  );
} 