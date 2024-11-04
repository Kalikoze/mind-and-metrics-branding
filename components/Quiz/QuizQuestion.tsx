import { Question, Option } from './quizData';
import QuestionOption from './QuestionOption';
import NavigationButtons from './NavigationButtons';

interface QuizQuestionProps {
  question: Question;
  selectedAnswers: string[];
  onAnswer: (questionId: string, answer: string) => void;
  onBack: () => void;
  showBack: boolean;
}

export default function QuizQuestion({ 
  question, 
  selectedAnswers, 
  onAnswer, 
  onBack, 
  showBack 
}: QuizQuestionProps) {
  const isSelected = (value: string) => selectedAnswers.includes(value);
  const canContinue = selectedAnswers.length > 0;
  
  return (
    <div className="bg-white rounded-lg p-8 shadow-sm w-full">
      <h2 className="font-serif text-2xl text-secondary-400 mb-6">
        {question.text}
        {question.multiSelect && (
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
        />
      </div>
    </div>
  );
} 