import { AnimatePresence } from 'framer-motion';
import { HiArrowRight, HiArrowLeft, HiListBullet } from 'react-icons/hi2';
import MotionScrambleButton from '../common/MotionScrambleButton';

interface NavigationButtonsProps {
  showBack: boolean;
  canContinue: boolean;
  onBack: () => void;
  onContinue: () => void;
  isEditing?: boolean;
  onReturnToSummary: () => void;
  returnToSummaryDisabled?: boolean;
}

export default function NavigationButtons({
  showBack,
  canContinue,
  onBack,
  onContinue,
  isEditing,
  onReturnToSummary,
  returnToSummaryDisabled,
}: NavigationButtonsProps) {
  return (
    <nav className="flex flex-col-reverse sm:flex-row justify-between items-center gap-4" aria-label="Question navigation">
      <div className="w-full sm:flex-1">
        <AnimatePresence mode="wait">
          {showBack && (
            <MotionScrambleButton
              text="Back"
              icon={HiArrowLeft}
              variant="secondary"
              onClick={onBack}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.2 }}
              dataCy="back-button"
            />
          )}
        </AnimatePresence>
      </div>

      <div className="flex flex-col-reverse sm:flex-row gap-4 w-full sm:w-auto" role="group" aria-label="Navigation controls">
        {isEditing && (
          <MotionScrambleButton
            text="Return to Summary"
            icon={HiListBullet}
            variant="secondary"
            onClick={onReturnToSummary}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ duration: 0.2 }}
            disabled={returnToSummaryDisabled}
            dataCy="return-to-summary"
            spanWidth="140px"
          />
        )}

        {canContinue && (
          <MotionScrambleButton
            text="Continue"
            icon={HiArrowRight}
            variant="primary"
            onClick={onContinue}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ duration: 0.2 }}
            dataCy="continue-button"
          />
        )}
      </div>
    </nav>
  );
}