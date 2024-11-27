'use client';

import { motion, AnimatePresence } from 'framer-motion';
import QuizQuestion from '@/components/Quiz/QuizQuestion';
import CircuitOverlay from '@/components/common/CircuitOverlay';
import ResultsSummary from '@/components/Quiz/ResultsSummary';
import ContactForm from '@/components/Quiz/ContactForm';
import CompletionMessage from '@/components/Quiz/CompletionMessage';
import { useQuizLogic } from '@/hooks/useQuizLogic';

export default function QuizComponent() {
  const quiz = useQuizLogic();

  return (
    <section 
      className="relative overflow-hidden py-20 min-h-screen flex items-center justify-center" 
      data-cy="quiz-section"
    >
      <CircuitOverlay />
      <div className="relative w-full max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        {!quiz.showingSummary && !quiz.showingContactForm && !quiz.isComplete && (
          <div className="text-center mb-12">
            <h1 className="font-serif text-4xl text-dark-800 mb-4" data-cy="quiz-title">
              Let&apos;s Build Your Growth Strategy
            </h1>
            <p className="text-dark-600 text-lg" data-cy="quiz-subtitle">
              Answer a few questions to help us understand your needs
            </p>
          </div>
        )}

        <AnimatePresence mode="wait">
          <motion.div
            key={quiz.showingContactForm ? 'contact-form' : quiz.currentQuestion.id}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="flex flex-col items-center justify-center w-full"
          >
            {!quiz.isComplete ? (
              quiz.showingContactForm ? (
                <ContactForm
                  answers={quiz.answers}
                  selectedBranches={quiz.selectedBranches}
                  onSubmit={quiz.handleContactSubmit}
                  onBack={quiz.handleBackToSummary}
                />
              ) : quiz.showingSummary ? (
                <ResultsSummary
                  answers={quiz.answers}
                  selectedBranches={quiz.selectedBranches}
                  onEdit={quiz.handleEdit}
                  onConfirm={quiz.handleConfirmAndProceed}
                />
              ) : (
                <QuizQuestion
                  question={quiz.currentQuestion}
                  selectedAnswers={quiz.currentSelections}
                  onAnswer={quiz.handleAnswer}
                  onBack={quiz.handleBack}
                  showBack={quiz.showBack}
                  isEditing={quiz.isEditing}
                  onReturnToSummary={quiz.shouldShowReturnToSummary() ? quiz.handleReturnToSummary : undefined}
                  editingPrimaryWithChanges={quiz.editingPrimaryWithChanges}
                />
              )
            ) : (
              <CompletionMessage preferredContact={quiz.preferredContact} />
            )}
          </motion.div>
        </AnimatePresence>

        <div className="mt-8 flex justify-center gap-2" data-cy="progress-indicators">
          {Array.from({ length: quiz.totalQuestions }).map((_, index) => (
            <div
              key={index}
              className={`h-1 w-8 rounded-full transition-all duration-300 ${
                index < quiz.questionPath.length - 1 ? 'bg-secondary-400' : 'bg-neutral-200'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
} 