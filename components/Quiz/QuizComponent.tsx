'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import QuizQuestion from './QuizQuestion';
import { primaryQuestion, branchQuestions } from './quizData';
import CircuitOverlay from '../CircuitOverlay';

export default function QuizComponent() {
  const [currentBranch, setCurrentBranch] = useState<string | null>(null);
  const [branchQuestionIndex, setBranchQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string[]>>({});
  const [currentSelections, setCurrentSelections] = useState<string[]>([]);
  const [isComplete, setIsComplete] = useState(false);
  const [questionPath, setQuestionPath] = useState<number[]>([0]);

  const currentQuestion = currentBranch === null 
    ? primaryQuestion 
    : branchQuestions[currentBranch][branchQuestionIndex];

  const totalQuestions = currentBranch 
    ? branchQuestions[currentBranch].length + 1 // +1 for primary question
    : 1;

  const handleAnswer = (questionId: string, answer: string) => {
    if (answer === 'NEXT') {
      setAnswers(prev => ({
        ...prev,
        [questionId]: currentSelections
      }));

      if (currentBranch === null) {
        // Moving from primary question to branch
        setCurrentBranch(currentSelections[0]);
        setBranchQuestionIndex(0);
        setQuestionPath(prev => [...prev, 1]);
      } else {
        // Moving to next question in branch
        if (branchQuestionIndex < branchQuestions[currentBranch].length - 1) {
          setBranchQuestionIndex(prev => prev + 1);
          setQuestionPath(prev => [...prev, prev.length + 1]);
        } else {
          setIsComplete(true);
          setQuestionPath(prev => [...prev, prev.length + 1]);
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
    if (branchQuestionIndex > 0) {
      setBranchQuestionIndex(prev => prev - 1);
      setCurrentSelections(answers[branchQuestions[currentBranch][branchQuestionIndex - 1].id] || []);
      setQuestionPath(prev => prev.slice(0, -1));
    } else {
      setCurrentBranch(null);
      setCurrentSelections(answers[primaryQuestion.id] || []);
      setQuestionPath([0]);
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
            key={`${currentBranch}-${branchQuestionIndex}`}
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
                showBack={currentBranch !== null || branchQuestionIndex > 0}
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