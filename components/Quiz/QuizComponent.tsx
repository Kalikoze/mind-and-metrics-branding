'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import QuizQuestion from './QuizQuestion';
import { primaryQuestion, branchQuestions, commonQuestions } from './quizData';
import CircuitOverlay from '../CircuitOverlay';

export default function QuizComponent() {
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
          setCurrentSelections(answers[commonQuestions[0].id] || []);
        } else if (commonQuestionIndex < commonQuestions.length - 1) {
          setCommonQuestionIndex(prev => prev + 1);
          setQuestionPath(prev => [...prev, prev.length + 1]);
          setCurrentSelections(answers[commonQuestions[commonQuestionIndex + 1].id] || []);
        } else {
          setCurrentBranchIndex(0);
          setBranchQuestionIndex(0);
          setCommonQuestionIndex(-1);
          setQuestionPath(prev => [...prev, prev.length + 1]);
          const firstBranch = selectedBranches[0];
          setCurrentSelections(answers[branchQuestions[firstBranch][0].id] || []);
        }
      } else {
        if (branchQuestionIndex < branchQuestions[currentBranch].length - 1) {
          setBranchQuestionIndex(prev => prev + 1);
          setQuestionPath(prev => [...prev, prev.length + 1]);
          setCurrentSelections(answers[branchQuestions[currentBranch][branchQuestionIndex + 1].id] || []);
        } else {
          if (currentBranchIndex < selectedBranches.length - 1) {
            const nextBranch = selectedBranches[currentBranchIndex + 1];
            setCurrentBranchIndex(prev => prev + 1);
            setBranchQuestionIndex(0);
            setQuestionPath(prev => [...prev, prev.length + 1]);
            setCurrentSelections(answers[branchQuestions[nextBranch][0].id] || []);
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
      setCommonQuestionIndex(prev => prev - 1);
      setCurrentSelections(answers[commonQuestions[commonQuestionIndex - 1].id] || []);
      setQuestionPath(prev => prev.slice(0, -1));
    } else if (currentBranch === null && commonQuestionIndex === 0) {
      setCommonQuestionIndex(-1);
      setCurrentSelections(answers[primaryQuestion.id] || []);
      setQuestionPath([0]);
    } else if (branchQuestionIndex > 0 && currentBranch) {
      setBranchQuestionIndex(prev => prev - 1);
      setCurrentSelections(answers[branchQuestions[currentBranch][branchQuestionIndex - 1].id] || []);
      setQuestionPath(prev => prev.slice(0, -1));
    } else if (branchQuestionIndex === 0 && currentBranch) {
      setCurrentBranchIndex(-1);
      setBranchQuestionIndex(0);
      setCommonQuestionIndex(commonQuestions.length - 1);
      setCurrentSelections(answers[commonQuestions[commonQuestions.length - 1].id] || []);
      setQuestionPath(prev => prev.slice(0, -1));
    } else if (currentBranchIndex > 0) {
      setCurrentBranchIndex(prev => prev - 1);
      const prevBranch = selectedBranches[currentBranchIndex - 1];
      const lastQuestionIndex = branchQuestions[prevBranch].length - 1;
      setBranchQuestionIndex(lastQuestionIndex);
      setCurrentSelections(answers[branchQuestions[prevBranch][lastQuestionIndex].id] || []);
      setQuestionPath(prev => prev.slice(0, -1));
    }
  };

  return (
    <section className="relative overflow-hidden py-20 min-h-screen flex items-center justify-center">
      <CircuitOverlay />
      <div className="relative w-full max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="font-serif text-4xl text-secondary-400 mb-4">
            Let's Build Your Growth Strategy
          </h1>
          <p className="text-secondary-500 text-lg">
            Answer a few questions to help us understand your needs
          </p>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={`${currentBranch}-${branchQuestionIndex}-${commonQuestionIndex}`}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="flex flex-col items-center justify-center w-full"
          >
            {!isComplete ? (
              <QuizQuestion
                question={currentQuestion}
                selectedAnswers={currentSelections}
                onAnswer={handleAnswer}
                onBack={handleBack}
                showBack={commonQuestionIndex > -1 || currentBranch !== null || branchQuestionIndex > 0}
              />
            ) : (
              <div className="text-center p-8 bg-white rounded-lg shadow-sm">
                <h2 className="font-serif text-2xl text-secondary-400 mb-4">
                  Thank you for completing the quiz!
                </h2>
                <p className="text-secondary-500">
                  We'll be in touch with your customized solution shortly.
                </p>
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        <div className="mt-8 flex justify-center">
          {Array.from({ length: totalQuestions }).map((_, index) => (
            <div
              key={index}
              className={`h-1 w-8 mx-1 rounded-full transition-all duration-300 ${
                index < questionPath.length - 1
                  ? 'bg-secondary-400'
                  : 'bg-neutral-200'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
} 