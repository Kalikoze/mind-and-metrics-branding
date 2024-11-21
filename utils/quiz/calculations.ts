import { Question, Option, primaryQuestion, branchQuestions, commonQuestions } from '@/data/quizData';

interface InvestmentRange {
  initial: {
    min: number;
    max: number;
    hours: { min: number; max: number };
  };
  monthly: {
    min: number;
    max: number;
    hours: { min: number; max: number };
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
  const hourlyRate = 110;
  const range = {
    initial: { 
      min: 0, 
      max: 0,
      hours: { min: 0, max: 0 }
    },
    monthly: { 
      min: 0, 
      max: 0,
      hours: { min: 0, max: 0 }
    },
    comfort: { min: 0, max: 0 }
  };

  Object.entries(answers).forEach(([questionId, selectedValues]) => {
    const question = getQuestionById(questionId, selectedBranches);
    if (!question) return;

    if (questionId === 'investment_comfort') {
      const option = question.options.find((opt: Option) => opt.value === selectedValues[0]);
      if (option?.value === 'basic') {
        range.comfort = { min: 5000, max: 10000 };
      } else if (option?.value === 'strategic') {
        range.comfort = { min: 10000, max: 20000 };
      } else if (option?.value === 'growth') {
        range.comfort = { min: 20000, max: 50000 };
      }
      return;
    }

    selectedValues.forEach(value => {
      const option = question.options.find((opt: Option) => opt.value === value);
      if (!option) return;

      // Add hours to initial investment by default
      if (option.hoursMin !== undefined && option.hoursMax !== undefined) {
        range.initial.hours.min += option.hoursMin;
        range.initial.hours.max += option.hoursMax;
      }
    });
  });

  // Calculate costs based on hours
  range.initial.min = range.initial.hours.min * hourlyRate;
  range.initial.max = range.initial.hours.max * hourlyRate;
  range.monthly.min = range.monthly.hours.min * hourlyRate;
  range.monthly.max = range.monthly.hours.max * hourlyRate;

  return range;
};

export const getOptionLabel = (question: Question, value: string): string => {
  return question.options.find((opt: Option) => opt.value === value)?.label || value;
}; 