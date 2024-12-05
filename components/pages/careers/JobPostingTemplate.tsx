'use client'

import React, { useState, useEffect } from 'react';
import type { Position } from '@/data/positions';
import CircuitOverlay from '@/components/common/CircuitOverlay';
import JobApplicationForm from './JobApplicationForm';
import { motion, AnimatePresence } from 'framer-motion';
import { getJobSections } from './jobPostingSections';
import JobPostingNav from './JobPostingNav';
import JobPostingHeader from './JobPostingHeader';
import JobPostingFooter from './JobPostingFooter';

interface JobPostingTemplateProps {
  position: Position;
}

const SectionHeading = ({ children }: { children: React.ReactNode }) => (
  <h2 className="font-serif text-2xl text-dark-800 mb-6 border-b-2 border-neutral-200 pb-4">
    {children}
  </h2>
);

const JobPostingTemplate = ({ position }: JobPostingTemplateProps) => {
  const [showApplicationForm, setShowApplicationForm] = useState(false);
  const [hoveringBack, setHoveringBack] = useState(false);
  const sections = getJobSections(position);

  useEffect(() => {
    if (showApplicationForm) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [showApplicationForm]);

  return (
    <div className="relative bg-neutral-50 min-h-screen" data-cy="job-posting">
      <CircuitOverlay />

      <AnimatePresence mode="wait">
        {!showApplicationForm ? (
          <motion.article
            key="job-details"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24"
          >
            <JobPostingNav hoveringBack={hoveringBack} setHoveringBack={setHoveringBack} />

            <section className="bg-white rounded-lg shadow-lg border-2 border-neutral-200 p-8 sm:p-12">
              <JobPostingHeader position={position} />

              <div className="space-y-16">
                {sections.map(({ id, title, content }) => (
                  <section key={id} data-cy={id}>
                    <SectionHeading>{title}</SectionHeading>
                    {content}
                  </section>
                ))}
              </div>

              <JobPostingFooter
                onApplyClick={() => setShowApplicationForm(true)}
              />
            </section>
          </motion.article>
        ) : (
          <motion.article
            key="application-form"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24"
          >
            <div className="w-full">
              <JobApplicationForm 
                position={position}
                onCancel={() => setShowApplicationForm(false)}
              />
            </div>
          </motion.article>
        )}
      </AnimatePresence>
    </div>
  );
};

export default JobPostingTemplate; 