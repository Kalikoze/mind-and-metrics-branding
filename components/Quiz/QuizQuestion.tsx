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
    <div className="bg-white rounded-lg p-8 shadow-sm w-full">
      <h2 className="font-serif text-2xl text-secondary-400 mb-6">
        {question.text}
        {editingPrimaryWithChanges && (
          <span className="block text-sm text-amber-600 mt-2">
            Note: Changing your selections here will require answering new questions for your selected services.
          </span>
        )}
        {question.skipable && (
          <span className="block text-lg italic text-secondary-300 mt-1">
            {question.multiSelect
              ? "(Optional - Select all that apply)"
              : "(Optional - Click continue to skip)"
            }
          </span>
        )}
        {!question.skipable && question.multiSelect && (
          <span className="block text-lg italic text-secondary-300 mt-1">
            (Select all that apply)
          </span>
        )}
      </h2>

      <div className="grid gap-4">
        {question.options.map((option: Option, index: number) => (
          <QuestionOption
            key={index}
            option={option}
            isSelected={isSelected(option.value)}
            onSelect={(value) => onAnswer(question.id, value)}
          />
        ))}
      </div>

      <div className="h-[76px] mt-8">
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