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
  onReturnToSummary: () => void;
  editingPrimaryWithChanges?: boolean;
  returnToSummaryDisabled?: boolean;
}

export default function QuizQuestion({
  question,
  selectedAnswers,
  onAnswer,
  onBack,
  showBack,
  isEditing,
  onReturnToSummary,
  editingPrimaryWithChanges,
  returnToSummaryDisabled
}: QuizQuestionProps) {
  const isSelected = (value: string) => selectedAnswers.includes(value);
  const canContinue = question.skipable || selectedAnswers.length > 0;

  return (
    <article
      className="bg-white rounded-lg p-8 border-2 border-neutral-200
                 transition-all duration-300 hover:border-secondary-400
                 hover:shadow-lg w-full min-h-[500px] sm:min-h-0"
      data-cy="question-container"
    >
      <header className="mb-6">
        <h2
          className="font-serif text-2xl text-dark-800 mb-2"
          data-cy="question-title"
        >
          {question.text}
        </h2>

        {editingPrimaryWithChanges && (
          <p
            className="text-sm text-amber-600 mt-2"
            data-cy="editing-warning"
            role="alert"
          >
            Note: Changing your selections here will require answering new questions for your selected services.
          </p>
        )}

        {(question.skipable || question.multiSelect) && (
          <p
            className="text-lg italic text-dark-600 mt-1"
            data-cy={question.skipable ? "skipable-note" : "multiselect-note"}
          >
            {question.skipable
              ? question.multiSelect
                ? "(Optional - Select all that apply)"
                : "(Optional - Click continue to skip)"
              : "(Select all that apply)"
            }
          </p>
        )}
      </header>

      <fieldset
        className="grid gap-4"
        data-cy="options-container"
        role="radiogroup"
        aria-label={question.text}
      >
        <legend className="sr-only">{question.text}</legend>
        {question.options.map((option: Option, index: number) => (
          <QuestionOption
            key={index}
            option={option}
            isSelected={isSelected(option.value)}
            onSelect={(value) => onAnswer(question.id, value)}
            index={index}
          />
        ))}
      </fieldset>

      <footer
        className="mt-8 sm:h-[76px]"
        data-cy="navigation-container"
      >
        <NavigationButtons
          showBack={showBack}
          canContinue={canContinue}
          onBack={onBack}
          onContinue={() => onAnswer(question.id, 'NEXT')}
          isEditing={isEditing}
          onReturnToSummary={onReturnToSummary}
          returnToSummaryDisabled={returnToSummaryDisabled}
        />
      </footer>
    </article>
  );
} 