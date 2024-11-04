'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import QuizQuestion from './QuizQuestion';
import { questions } from './quizData';
import CircuitOverlay from '../CircuitOverlay';

export default function QuizComponent() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string[]>>({});
  const [currentSelections, setCurrentSelections] = useState<string[]>([]);
  
  const handleAnswer = (questionId: string, answer: string) => {
    if (answer === 'NEXT') {
      setAnswers(prev => ({
        ...prev,
        [questionId]: currentSelections
      }));
      setCurrentSelections([]);
      setCurrentQuestionIndex(prev => prev + 1);
      return;
    }

    const currentQuestion = questions[currentQuestionIndex];
    
    setCurrentSelections(prev => {
      if (!currentQuestion.multiSelect) {
        return [answer];
      }
      if (prev.includes(answer)) {
        return prev.filter(a => a !== answer);
      }
      return [...prev, answer];
    });
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
            key={currentQuestionIndex}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="flex flex-col items-center justify-center w-full"
          >
            {currentQuestionIndex < questions.length ? (
              <QuizQuestion
                question={questions[currentQuestionIndex]}
                selectedAnswers={currentSelections}
                onAnswer={handleAnswer}
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
          {questions.map((_, index) => (
            <div
              key={index}
              className={`h-1 w-8 mx-1 rounded-full transition-all duration-300 ${
                index === currentQuestionIndex
                  ? 'bg-secondary-400'
                  : index < currentQuestionIndex
                  ? 'bg-secondary-300'
                  : 'bg-neutral-200'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
} 