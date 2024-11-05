import { useState } from 'react';
import { primaryQuestion, branchQuestions, commonQuestions } from '@/data/quizData';

export function useQuizLogic() {
  const [selectedBranches, setSelectedBranches] = useState<string[]>([]);
  const [currentBranchIndex, setCurrentBranchIndex] = useState<number>(-1);
  const [branchQuestionIndex, setBranchQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string[]>>({});
  const [currentSelections, setCurrentSelections] = useState<string[]>([]);
  const [isComplete, setIsComplete] = useState(false);
  const [questionPath, setQuestionPath] = useState<number[]>([0]);
  const [commonQuestionIndex, setCommonQuestionIndex] = useState<number>(-1);

  const currentBranch = currentBranchIndex === -1 ? null : selectedBranches[currentBranchIndex];
  
  const currentQuestion = currentBranch === null 
    ? commonQuestionIndex === -1 
      ? primaryQuestion 
      : commonQuestions[commonQuestionIndex]
    : branchQuestions[currentBranch][branchQuestionIndex];

  const totalQuestions = selectedBranches.reduce((total, branch) => {
    const branchTotal = branchQuestions[branch].length;
    return total + branchTotal;
  }, 1 + commonQuestions.length);

  const handleAnswer = (questionId: string, answer: string) => {
    if (answer === 'NEXT') {
      setAnswers(prev => ({
        ...prev,
        [questionId]: currentSelections
      }));

      if (currentBranch === null) {
        if (commonQuestionIndex === -1) {
          setSelectedBranches(currentSelections);
          setCommonQuestionIndex(0);
          setQuestionPath(prev => [...prev, 1]);
        } else if (commonQuestionIndex < commonQuestions.length - 1) {
          setCommonQuestionIndex(prev => prev + 1);
          setQuestionPath(prev => [...prev, prev.length + 1]);
        } else {
          setCurrentBranchIndex(0);
          setBranchQuestionIndex(0);
          setCommonQuestionIndex(-1);
          setQuestionPath(prev => [...prev, prev.length + 1]);
        }
      } else {
        if (branchQuestionIndex < branchQuestions[currentBranch].length - 1) {
          setBranchQuestionIndex(prev => prev + 1);
          setQuestionPath(prev => [...prev, prev.length + 1]);
        } else {
          if (currentBranchIndex < selectedBranches.length - 1) {
            setCurrentBranchIndex(prev => prev + 1);
            setBranchQuestionIndex(0);
            setQuestionPath(prev => [...prev, prev.length + 1]);
          } else {
            setIsComplete(true);
            setQuestionPath(prev => [...prev, prev.length + 1]);
          }
        }
      }
    } else {
      setCurrentSelections(prev => {
        if (!currentQuestion.multiSelect) {
          return [answer];
        }
        if (prev.includes(answer)) {
          return prev.filter(a => a !== answer);
        }
        return [...prev, answer];
      });
    }
  };

  const handleBack = () => {
    if (currentBranch === null && commonQuestionIndex > 0) {
      const prevQuestionIndex = commonQuestionIndex - 1;
      setCommonQuestionIndex(prevQuestionIndex);
      setCurrentSelections(answers[commonQuestions[prevQuestionIndex].id] || []);
      setQuestionPath(prev => prev.slice(0, -1));
    } else if (currentBranch === null && commonQuestionIndex === 0) {
      setCommonQuestionIndex(-1);
      setCurrentSelections(answers[primaryQuestion.id] || []);
      setQuestionPath([0]);
    } else if (currentBranch !== null && branchQuestionIndex > 0) {
      const prevQuestionIndex = branchQuestionIndex - 1;
      setBranchQuestionIndex(prevQuestionIndex);
      setCurrentSelections(answers[branchQuestions[currentBranch][prevQuestionIndex].id] || []);
      setQuestionPath(prev => prev.slice(0, -1));
    } else if (currentBranchIndex > 0) {
      const prevBranchIndex = currentBranchIndex - 1;
      const prevBranch = selectedBranches[prevBranchIndex];
      const lastQuestionIndex = branchQuestions[prevBranch].length - 1;
      
      setCurrentBranchIndex(prevBranchIndex);
      setBranchQuestionIndex(lastQuestionIndex);
      setCurrentSelections(answers[branchQuestions[prevBranch][lastQuestionIndex].id] || []);
      setQuestionPath(prev => prev.slice(0, -1));
    } else if (currentBranchIndex === 0 && branchQuestionIndex === 0) {
      setCurrentBranchIndex(-1);
      setBranchQuestionIndex(0);
      setCommonQuestionIndex(commonQuestions.length - 1);
      setCurrentSelections(answers[commonQuestions[commonQuestions.length - 1].id] || []);
      setQuestionPath(prev => prev.slice(0, -1));
    }
  };

  return {
    currentQuestion,
    selectedAnswers: currentSelections,
    isComplete,
    questionPath,
    totalQuestions,
    showBack: currentBranch !== null || branchQuestionIndex > 0,
    handleAnswer,
    handleBack,
    answers
  };
} 