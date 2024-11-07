import { Question, Option } from '@/data/quizData';
import QuestionOption from '@/components/Quiz/QuestionOption';
import NavigationButtons from '@/components/Quiz/NavigationButtons';

interface QuizQuestionProps {
  question: Question;
  selectedAnswers: string[];
  onAnswer: (questionId: string, answer: string | 'NEXT' | 'SKIP') => void;
  onBack: () => void;
  showBack: boolean;
  isEditing?: boolean;
  onReturnToSummary?: () => void;
  editingPrimaryWithChanges?: boolean;
}

export default function QuizQuestion({
  question,
  selectedAnswers,
  onAnswer,
  onBack,
  showBack,
  isEditing,
  onReturnToSummary,
  editingPrimaryWithChanges
}: QuizQuestionProps) {
  const isSelected = (value: string) => selectedAnswers.includes(value);
  const canContinue = question.skipable || selectedAnswers.length > 0;

  return (
    <div className="bg-white rounded-lg p-8 shadow-sm w-full" data-cy="question-container">
      <div className="mb-6">
        <h2 className="font-serif text-2xl text-secondary-400" data-cy="question-title">
          {question.text}
        </h2>
        
        {editingPrimaryWithChanges && (
          <div 
            className="text-sm text-amber-600 mt-2"
            data-cy="editing-warning"
          >
            Note: Changing your selections here will require answering new questions for your selected services.
          </div>
        )}
        
        {question.skipable && (
          <div 
            className="text-lg italic text-secondary-300 mt-1"
            data-cy="skipable-note"
          >
            {question.multiSelect
              ? "(Optional - Select all that apply)"
              : "(Optional - Click continue to skip)"
            }
          </div>
        )}
        
        {!question.skipable && question.multiSelect && (
          <div 
            className="text-lg italic text-secondary-300 mt-1"
            data-cy="multiselect-note"
          >
            (Select all that apply)
          </div>
        )}
      </div>

      <div 
        className="grid gap-4" 
        data-cy="options-container"
        role="radiogroup"
        aria-label={question.text}
      >
        {question.options.map((option: Option, index: number) => (
          <QuestionOption
            key={index}
            option={option}
            isSelected={isSelected(option.value)}
            onSelect={(value) => onAnswer(question.id, value)}
            index={index}
          />
        ))}
      </div>

      <div className="h-[76px] mt-8" data-cy="navigation-container">
        <NavigationButtons
          showBack={showBack}
          canContinue={canContinue}
          onBack={onBack}
          onContinue={() => onAnswer(question.id, 'NEXT')}
          isEditing={isEditing}
          onReturnToSummary={onReturnToSummary}
        />
      </div>
    </div>
  );
} 