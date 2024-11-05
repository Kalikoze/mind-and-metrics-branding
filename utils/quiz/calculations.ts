import { Question, Option, primaryQuestion, branchQuestions, commonQuestions } from '@/components/Quiz/quizData';

interface InvestmentRange {
  initial: {
    min: number;
    max: number;
  };
  monthly: {
    min: number;
    max: number;
  };
  comfort: {
    min: number;
    max: number;
  };
}

export const getQuestionById = (
  id: string, 
  selectedBranches: string[]
): Question | undefined => {
  if (id === primaryQuestion.id) return primaryQuestion;
  const commonQuestion = commonQuestions.find(q => q.id === id);
  if (commonQuestion) return commonQuestion;
  
  for (const branch of selectedBranches) {
    const branchQuestion = branchQuestions[branch].find(q => q.id === id);
    if (branchQuestion) return branchQuestion;
  }
};

export const calculateInvestmentRange = (
  answers: Record<string, string[]>,
  selectedBranches: string[]
): InvestmentRange => {
  const range = {
    initial: { min: 0, max: 0 },
    monthly: { min: 0, max: 0 },
    comfort: { min: 0, max: 0 }
  };

  Object.entries(answers).forEach(([questionId, selectedValues]) => {
    const question = getQuestionById(questionId, selectedBranches);
    if (!question) return;

    if (questionId === 'investment_comfort') {
      const option = question.options.find((opt: Option) => opt.value === selectedValues[0]);
      if (option?.value === 'basic') {
        range.comfort = { min: 2000, max: 5000 };
      } else if (option?.value === 'strategic') {
        range.comfort = { min: 5000, max: 10000 };
      } else if (option?.value === 'growth') {
        range.comfort = { min: 10000, max: 20000 };
      }
      return;
    }

    selectedValues.forEach(value => {
      const option = question.options.find((opt: Option) => opt.value === value);
      if (!option?.cost) return;

      if (option.cost.initial) {
        range.initial.min += option.cost.initial;
        range.initial.max += option.cost.initial;
      }

      if (option.cost.monthly) {
        range.monthly.min += option.cost.monthly;
        range.monthly.max += option.cost.monthly;
      }
    });
  });

  return range;
};

export const getOptionLabel = (question: Question, value: string): string => {
  return question.options.find((opt: Option) => opt.value === value)?.label || value;
}; 