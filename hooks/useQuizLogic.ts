'use client';

import { useState } from 'react';
import { primaryQuestion, branchQuestions, commonQuestions } from '@/data/quizData';
import type { ContactFormData } from '@/components/Quiz/ContactForm';

export const useQuizLogic = () => {
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

  // Helper functions
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  const updateQuizState = (
    newBranchIndex: number,
    newBranchQuestionIndex: number,
    newCommonQuestionIndex: number,
    questionId: string,
    isForward: boolean
  ) => {
    setCurrentBranchIndex(newBranchIndex);
    setBranchQuestionIndex(newBranchQuestionIndex);
    setCommonQuestionIndex(newCommonQuestionIndex);
    setCurrentSelections(answers[questionId] || []);
    
    if (isForward) {
      setQuestionPath(prev => [...prev, prev.length + 1]);
    } else {
      setQuestionPath(prev => prev.slice(0, -1));
    }
  };

  const handleAnswer = (questionId: string, answer: string | 'NEXT' | 'SKIP') => {
    if (answer === 'NEXT') {
      handleNextQuestion();
      return;
    }

    if (answer === 'SKIP') {
      setAnswers(prev => ({ ...prev, [questionId]: [] }));
      handleNextQuestion();
      return;
    }

    if (!currentQuestion.multiSelect) {
      const newSelections = currentSelections.includes(answer) && currentQuestion.skipable
        ? []
        : [answer];

      setCurrentSelections(newSelections);
      setAnswers(prev => ({ ...prev, [questionId]: newSelections }));
    } else {
      setCurrentSelections(prev => {
        const newSelections = prev.includes(answer)
          ? prev.filter(a => a !== answer)
          : [...prev, answer];

        setAnswers(prevAnswers => ({ ...prevAnswers, [questionId]: newSelections }));
        return newSelections;
      });
    }
  };

  const handleNextQuestion = () => {
    scrollToTop();
    if (currentBranch === null) {
      commonQuestionIndex === -1 ? handlePrimaryQuestion() : handleCommonQuestion();
      return;
    }
    handleBranchQuestion();
  };

  const handleBack = () => {
    scrollToTop();
    if (currentBranch === null) {
      handleBackForPrimaryOrCommon();
    } else {
      handleBackForBranch();
    }
  };

  const handlePrimaryQuestion = () => {
    setOriginalPrimaryAnswers(currentSelections);
    setSelectedBranches(currentSelections);
    if (primaryAnswersChanged()) {
      setHasProceededWithChanges(true);
    }
    updateQuizState(-1, 0, 0, commonQuestions[0].id, true);
  };

  const handleCommonQuestion = () => {
    if (commonQuestionIndex < commonQuestions.length - 1) {
      const nextQuestionId = commonQuestions[commonQuestionIndex + 1].id;
      updateQuizState(-1, 0, commonQuestionIndex + 1, nextQuestionId, true);
    } else {
      const firstBranch = selectedBranches[0];
      updateQuizState(0, 0, -1, branchQuestions[firstBranch][0].id, true);
    }
  };

  const handleBranchQuestion = () => {
    if (!currentBranch) return;

    if (branchQuestionIndex < branchQuestions[currentBranch].length - 1) {
      const nextQuestionId = branchQuestions[currentBranch][branchQuestionIndex + 1].id;
      updateQuizState(currentBranchIndex, branchQuestionIndex + 1, -1, nextQuestionId, true);
    } else if (currentBranchIndex < selectedBranches.length - 1) {
      const nextBranch = selectedBranches[currentBranchIndex + 1];
      updateQuizState(currentBranchIndex + 1, 0, -1, branchQuestions[nextBranch][0].id, true);
    } else {
      setShowingSummary(true);
      setQuestionPath(prev => [...prev, prev.length + 1]);
      if (!primaryAnswersChanged()) {
        setHasCompletedNewPath(true);
      }
    }
  };

  const handleBackForPrimaryOrCommon = () => {
    if (commonQuestionIndex > 0) {
      const prevQuestionId = commonQuestions[commonQuestionIndex - 1].id;
      updateQuizState(-1, 0, commonQuestionIndex - 1, prevQuestionId, false);
    } else if (commonQuestionIndex === 0) {
      updateQuizState(-1, 0, -1, primaryQuestion.id, false);
      setQuestionPath([0]);
    }
  };

  const handleBackForBranch = () => {
    if (!currentBranch) return;

    if (branchQuestionIndex > 0) {
      const prevQuestionId = branchQuestions[currentBranch][branchQuestionIndex - 1].id;
      updateQuizState(currentBranchIndex, branchQuestionIndex - 1, -1, prevQuestionId, false);
    } else if (branchQuestionIndex === 0) {
      const lastCommonQuestionId = commonQuestions[commonQuestions.length - 1].id;
      updateQuizState(-1, 0, commonQuestions.length - 1, lastCommonQuestionId, false);
    } else if (currentBranchIndex > 0) {
      const prevBranch = selectedBranches[currentBranchIndex - 1];
      const lastQuestionIndex = branchQuestions[prevBranch].length - 1;
      const prevQuestionId = branchQuestions[prevBranch][lastQuestionIndex].id;
      updateQuizState(currentBranchIndex - 1, lastQuestionIndex, -1, prevQuestionId, false);
    }
  };

  const handleEdit = (questionId: string) => {
    scrollToTop();
    setIsEditing(true);
    setHasProceededWithChanges(false);

    if (questionId === primaryQuestion.id) {
      handleEditPrimaryQuestion(questionId);
      return;
    }

    const commonIndex = commonQuestions.findIndex(q => q.id === questionId);
    if (commonIndex !== -1) {
      handleEditCommonQuestion(commonIndex, questionId);
      return;
    }

    handleEditBranchQuestion(questionId);
  };

  const handleEditPrimaryQuestion = (questionId: string) => {
    setCurrentBranchIndex(-1);
    setBranchQuestionIndex(0);
    setCommonQuestionIndex(-1);
    setCurrentSelections(answers[questionId] || []);
    setShowingSummary(false);
    setOriginalPrimaryAnswers(answers[questionId] || []);
    setHasCompletedNewPath(true);
  };

  const handleEditCommonQuestion = (commonIndex: number, questionId: string) => {
    setCurrentBranchIndex(-1);
    setBranchQuestionIndex(0);
    setCommonQuestionIndex(commonIndex);
    setCurrentSelections(answers[questionId] || []);
    setShowingSummary(false);
  };

  const handleEditBranchQuestion = (questionId: string) => {
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
  };

  const handleConfirmAndProceed = () => {
    scrollToTop();
    setShowingContactForm(true);
  };

  const handleReturnToSummary = () => {
    scrollToTop();
    setIsEditing(false);
    setShowingSummary(true);
  };

  const handleContactSubmit = async (formData: ContactFormData) => {
    scrollToTop();
    setPreferredContact(formData.preferredContact);
    setIsComplete(true);
  };

  const handleBackToSummary = () => {
    scrollToTop();
    setShowingContactForm(false);
  };

  const primaryAnswersChanged = () => {
    const currentPrimaryAnswers = answers[primaryQuestion.id] || [];
    if (currentPrimaryAnswers.length !== originalPrimaryAnswers.length) return true;
    return !currentPrimaryAnswers.every(answer => originalPrimaryAnswers.includes(answer));
  };

  return {
    currentQuestion,
    currentSelections,
    answers,
    selectedBranches,
    questionPath,
    totalQuestions,
    isComplete,
    showingSummary,
    showingContactForm,
    isEditing,
    preferredContact,

    showBack: commonQuestionIndex > -1 || currentBranch !== null || branchQuestionIndex > 0,
    shouldShowReturnToSummary: () => {
      if (!isEditing || hasProceededWithChanges) return false;
      if (currentQuestion.id === primaryQuestion.id) {
        if (primaryAnswersChanged()) return false;
        return true;
      }
      return hasCompletedNewPath;
    },
    editingPrimaryWithChanges: isEditing && 
      currentQuestion.id === primaryQuestion.id && 
      primaryAnswersChanged(),

    handleAnswer,
    handleBack,
    handleEdit,
    handleConfirmAndProceed,
    handleReturnToSummary,
    handleContactSubmit,
    handleBackToSummary
  };
};
