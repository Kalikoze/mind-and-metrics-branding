'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import QuizQuestion from '@/components/Quiz/QuizQuestion';
import { primaryQuestion, branchQuestions, commonQuestions } from '@/data/quizData';
import CircuitOverlay from '@/components/common/CircuitOverlay';
import ResultsSummary from '@/components/Quiz/ResultsSummary';
import ContactForm from '@/components/Quiz/ContactForm';
import { HiArrowRight } from 'react-icons/hi';
import ScrambleText from '@/components/common/ScrambleText';
import { ContactFormData } from '@/components/Quiz/ContactForm';

export default function QuizComponent() {
  const [selectedBranches, setSelectedBranches] = useState<string[]>([]);
  const [currentBranchIndex, setCurrentBranchIndex] = useState<number>(-1);
  const [branchQuestionIndex, setBranchQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string[]>>({});
  const [currentSelections, setCurrentSelections] = useState<string[]>([]);
  const [isComplete, setIsComplete] = useState(false);
  const [questionPath, setQuestionPath] = useState<number[]>([0]);
  const [commonQuestionIndex, setCommonQuestionIndex] = useState<number>(-1);
  const [showingSummary, setShowingSummary] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [originalPrimaryAnswers, setOriginalPrimaryAnswers] = useState<string[]>([]);
  const [hasCompletedNewPath, setHasCompletedNewPath] = useState(true);
  const [hasProceededWithChanges, setHasProceededWithChanges] = useState(false);
  const [showingContactForm, setShowingContactForm] = useState(false);
  const [preferredContact, setPreferredContact] = useState<'email' | 'phone' | null>(null);
  const [isHomeHovering, setIsHomeHovering] = useState(false);

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

  const handleAnswer = (questionId: string, answer: string | 'NEXT' | 'SKIP') => {
    if (answer === 'NEXT') {
      handleNextQuestion();
      return;
    }

    if (answer === 'SKIP') {
      setAnswers(prev => ({
        ...prev,
        [questionId]: []
      }));
      handleNextQuestion();
      return;
    }

    if (!currentQuestion.multiSelect) {
      const newSelections = currentSelections.includes(answer) && currentQuestion.skipable
        ? []
        : [answer];

      setCurrentSelections(newSelections);
      setAnswers(prev => ({
        ...prev,
        [questionId]: newSelections
      }));
    } else {
      setCurrentSelections(prev => {
        const newSelections = prev.includes(answer)
          ? prev.filter(a => a !== answer)
          : [...prev, answer];

        setAnswers(prevAnswers => ({
          ...prevAnswers,
          [questionId]: newSelections
        }));

        return newSelections;
      });
    }
  };

  const handleNextQuestion = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });

    const moveToNextQuestion = (
      newBranchIndex: number,
      newBranchQuestionIndex: number,
      newCommonQuestionIndex: number,
      nextQuestionId?: string
    ) => {
      setCurrentBranchIndex(newBranchIndex);
      setBranchQuestionIndex(newBranchQuestionIndex);
      setCommonQuestionIndex(newCommonQuestionIndex);
      setQuestionPath(prev => [...prev, prev.length + 1]);
      if (nextQuestionId) {
        setCurrentSelections(answers[nextQuestionId] || []);
      }
    };

    if (currentBranch === null && commonQuestionIndex === -1) {
      setOriginalPrimaryAnswers(currentSelections);
      setSelectedBranches(currentSelections);
      if (primaryAnswersChanged()) {
        setHasProceededWithChanges(true);
      }
      moveToNextQuestion(-1, 0, 0, commonQuestions[0].id);
      return;
    }

    if (currentBranch === null && commonQuestionIndex >= 0) {
      if (commonQuestionIndex < commonQuestions.length - 1) {
        const nextQuestionId = commonQuestions[commonQuestionIndex + 1].id;
        moveToNextQuestion(-1, 0, commonQuestionIndex + 1, nextQuestionId);
      } else {
        const firstBranch = selectedBranches[0];
        moveToNextQuestion(0, 0, -1, branchQuestions[firstBranch][0].id);
      }
      return;
    }

    if (currentBranch !== null) {
      if (branchQuestionIndex < branchQuestions[currentBranch].length - 1) {
        const nextQuestionId = branchQuestions[currentBranch][branchQuestionIndex + 1].id;
        moveToNextQuestion(currentBranchIndex, branchQuestionIndex + 1, -1, nextQuestionId);
      } else if (currentBranchIndex < selectedBranches.length - 1) {
        const nextBranch = selectedBranches[currentBranchIndex + 1];
        moveToNextQuestion(currentBranchIndex + 1, 0, -1, branchQuestions[nextBranch][0].id);
      } else {
        setShowingSummary(true);
        setQuestionPath(prev => [...prev, prev.length + 1]);
        if (!primaryAnswersChanged()) {
          setHasCompletedNewPath(true);
        }
      }
    }
  };

  const handleBack = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });

    const updateState = (
      newBranchIndex: number,
      newBranchQuestionIndex: number,
      newCommonQuestionIndex: number,
      questionId: string
    ) => {
      setCurrentBranchIndex(newBranchIndex);
      setBranchQuestionIndex(newBranchQuestionIndex);
      setCommonQuestionIndex(newCommonQuestionIndex);
      setCurrentSelections(answers[questionId] || []);
      setQuestionPath(prev => prev.slice(0, -1));
    };

    if (currentBranch === null) {
      if (commonQuestionIndex > 0) {
        const prevQuestionId = commonQuestions[commonQuestionIndex - 1].id;
        updateState(-1, 0, commonQuestionIndex - 1, prevQuestionId);
      } else if (commonQuestionIndex === 0) {
        updateState(-1, 0, -1, primaryQuestion.id);
        setQuestionPath([0]);
      }
      return;
    }

    if (branchQuestionIndex > 0) {
      const prevQuestionId = branchQuestions[currentBranch][branchQuestionIndex - 1].id;
      updateState(currentBranchIndex, branchQuestionIndex - 1, -1, prevQuestionId);
    } else if (branchQuestionIndex === 0) {
      const lastCommonQuestionId = commonQuestions[commonQuestions.length - 1].id;
      updateState(-1, 0, commonQuestions.length - 1, lastCommonQuestionId);
    } else if (currentBranchIndex > 0) {
      const prevBranch = selectedBranches[currentBranchIndex - 1];
      const lastQuestionIndex = branchQuestions[prevBranch].length - 1;
      const prevQuestionId = branchQuestions[prevBranch][lastQuestionIndex].id;
      updateState(currentBranchIndex - 1, lastQuestionIndex, -1, prevQuestionId);
    }
  };

  const handleEdit = (questionId: string) => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setIsEditing(true);
    setHasProceededWithChanges(false);

    if (questionId === primaryQuestion.id) {
      setCurrentBranchIndex(-1);
      setBranchQuestionIndex(0);
      setCommonQuestionIndex(-1);
      setCurrentSelections(answers[questionId] || []);
      setShowingSummary(false);
      setOriginalPrimaryAnswers(answers[questionId] || []);
      setHasCompletedNewPath(true);
    } else {
      const isCommonQuestion = commonQuestions.find(q => q.id === questionId);
      const commonIndex = commonQuestions.findIndex(q => q.id === questionId);

      if (isCommonQuestion) {
        setCurrentBranchIndex(-1);
        setBranchQuestionIndex(0);
        setCommonQuestionIndex(commonIndex);
        setCurrentSelections(answers[questionId] || []);
        setShowingSummary(false);
      } else {
        for (let branchIndex = 0; branchIndex < selectedBranches.length; branchIndex++) {
          const branch = selectedBranches[branchIndex];
          const questionIndex = branchQuestions[branch].findIndex(q => q.id === questionId);
          if (questionIndex !== -1) {
            setCurrentBranchIndex(branchIndex);
            setBranchQuestionIndex(questionIndex);
            setCommonQuestionIndex(-1);
            setCurrentSelections(answers[questionId] || []);
            setShowingSummary(false);
            break;
          }
        }
      }
    }
  };

  const handleConfirmAndProceed = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setShowingContactForm(true);
  };

  const handleReturnToSummary = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setIsEditing(false);
    setShowingSummary(true);
  };

  const primaryAnswersChanged = () => {
    const currentPrimaryAnswers = answers[primaryQuestion.id] || [];
    if (currentPrimaryAnswers.length !== originalPrimaryAnswers.length) return true;
    return !currentPrimaryAnswers.every(answer => originalPrimaryAnswers.includes(answer));
  };

  const shouldShowReturnToSummary = () => {
    if (!isEditing || hasProceededWithChanges) return false;
    if (currentQuestion.id === primaryQuestion.id) {
      if (primaryAnswersChanged()) return false;
      return true;
    }
    return hasCompletedNewPath;
  };

  const handleContactSubmit = async (formData: ContactFormData) => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setPreferredContact(formData.preferredContact);
    setIsComplete(true);
  };

  const handleBackToSummary = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setShowingContactForm(false);
  };

  return (
    <section className="relative overflow-hidden py-20 min-h-screen flex items-center justify-center" data-cy="quiz-section">
      <CircuitOverlay />
      <div className="relative w-full max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        {!showingSummary && !showingContactForm && !isComplete && (
          <div className="text-center mb-12">
            <h1 className="font-serif text-4xl text-secondary-400 mb-4" data-cy="quiz-title">
              Let&apos;s Build Your Growth Strategy
            </h1>
            <p className="text-secondary-500 text-lg" data-cy="quiz-subtitle">
              Answer a few questions to help us understand your needs
            </p>
          </div>
        )}

        <AnimatePresence mode="wait">
          <motion.div
            key={showingContactForm ? 'contact-form' : `${currentBranch}-${branchQuestionIndex}-${commonQuestionIndex}`}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="flex flex-col items-center justify-center w-full"
          >
            {!isComplete ? (
              showingContactForm ? (
                <ContactForm
                  answers={answers}
                  selectedBranches={selectedBranches}
                  onSubmit={handleContactSubmit}
                  onBack={handleBackToSummary}
                />
              ) : showingSummary ? (
                <ResultsSummary
                  answers={answers}
                  selectedBranches={selectedBranches}
                  onEdit={handleEdit}
                  onConfirm={handleConfirmAndProceed}
                />
              ) : (
                <QuizQuestion
                  question={currentQuestion}
                  selectedAnswers={currentSelections}
                  onAnswer={handleAnswer}
                  onBack={handleBack}
                  showBack={commonQuestionIndex > -1 || currentBranch !== null || branchQuestionIndex > 0}
                  isEditing={isEditing}
                  onReturnToSummary={shouldShowReturnToSummary() ? handleReturnToSummary : undefined}
                  editingPrimaryWithChanges={isEditing && currentQuestion.id === primaryQuestion.id && primaryAnswersChanged()}
                />
              )
            ) : (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="text-center p-8 bg-white rounded-lg shadow-sm max-w-2xl mx-auto"
                data-cy="completion-view"
              >                <div className="mb-8">
                  <h1 className="font-serif text-3xl text-secondary-400 mb-4" data-cy="completion-title">
                    Thank You for Choosing Us
                  </h1>
                  <h2 className="text-secondary-500 text-lg" data-cy="completion-subtitle">
                    We&apos;re excited to help grow your business
                  </h2>
                </div>

                <div className="mb-8">
                  <p className="text-secondary-500 mb-3" data-cy="completion-message">
                    We&apos;ll review your information and craft a customized growth strategy for your business.
                  </p>
                  <p className="text-secondary-500 text-sm" data-cy="completion-timeline">
                    Expect to hear from us within 24 hours{preferredContact === 'phone' ? ' at your specified time' : ''}.
                  </p>
                </div>

                <div className="text-sm text-secondary-500/80 italic mb-8" data-cy="completion-contact">
                  Need immediate assistance? Email us at{' '}
                  <a
                    href="mailto:info@mindandmetricsbranding.com"
                    className="text-secondary-400 hover:underline"
                    data-cy="completion-email"
                  >
                    info@mindandmetricsbranding.com
                  </a>
                </div>

                <motion.button
                  onClick={() => window.location.href = '/'}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onMouseEnter={() => setIsHomeHovering(true)}
                  onMouseLeave={() => setIsHomeHovering(false)}
                  className="px-8 py-3 bg-secondary-400 text-white font-medium
                           rounded-lg flex items-center justify-center space-x-2 mx-auto
                           border-2 border-secondary-400 transition-all duration-300
                           hover:bg-transparent hover:text-secondary-400"
                  data-cy="return-home-button"
                >
                  <span className="w-[120px] text-center">
                    <ScrambleText text="Return to Home" isHovering={isHomeHovering} />
                  </span>
                  <HiArrowRight className="w-5 h-5" />
                </motion.button>
              </motion.div>
            )}
          </motion.div>
        </AnimatePresence>

        <div className="mt-8 flex justify-center" data-cy="progress-indicators">
          {Array.from({ length: totalQuestions }).map((_, index) => (
            <div
              key={index}
              className={`h-1 w-8 mx-1 rounded-full transition-all duration-300 ${index < questionPath.length - 1
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