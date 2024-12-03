'use client';

import React, { useState, useRef } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { caseStudies } from '@/data/caseStudies';
import { CaseStudyTabs } from '@/components/pages/home/case-studies/CaseStudyTabs';
import { CaseStudyResults } from '@/components/pages/home/case-studies/CaseStudyResults';
import { CaseStudyPreview } from '@/components/pages/home/case-studies/CaseStudyPreview';
import { MobilePagination } from '@/components/pages/home/case-studies/MobilePagination';

const CaseStudies = () => {
  const [activeStudyId, setActiveStudyId] = useState(caseStudies[0].id);
  const [hoveringStates, setHoveringStates] = useState<{ [key: string]: boolean }>({});
  const componentRef = useRef(null);

  const activeStudy = caseStudies.find(study => study.id === activeStudyId);

  return (
    <section
      className="bg-white py-20"
      data-cy="case-studies-section"
      aria-label="Case Studies"
    >
      <article className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <header className="text-center mb-16">
          <h2
            className="text-3xl md:text-4xl font-serif text-primary-400 mb-4"
            data-cy="case-studies-title"
          >
            Client Success Stories
          </h2>
          <p className="text-dark-600 text-lg max-w-2xl mx-auto">
            Discover how we&apos;ve helped B2B leaders transform their digital presence and achieve measurable results.
          </p>
        </header>

        <CaseStudyTabs
          studies={caseStudies}
          activeStudyId={activeStudyId}
          onStudySelect={setActiveStudyId}
        />

        <section
          className="relative min-h-fit"
          data-cy="case-studies-container"
          ref={componentRef}
        >
          <AnimatePresence mode="wait">
            {activeStudy && (
              <motion.div
                key={activeStudy.id}
                role="tabpanel"
                id={`panel-${activeStudy.id}`}
                aria-labelledby={`tab-${activeStudy.id}`}
                data-cy={`case-study-content-${activeStudy.id}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <article className="bg-neutral-50 rounded-lg border-2 border-neutral-200 pb-56 md:pb-32">
                  <div className="grid md:grid-cols-2 gap-8 p-8">
                    <article className="space-y-8">
                      <figure className="h-[200px] flex items-center justify-start">
                        <div className="relative w-[200px] h-full">
                          <Image
                            src={activeStudy.logo}
                            alt={activeStudy.client}
                            fill
                            className="object-contain object-left"
                          />
                        </div>
                      </figure>

                      <header>
                        <h3 className="font-serif text-2xl text-primary-400 mb-2">
                          {activeStudy.client}
                        </h3>
                        <p className="text-dark-600 font-medium">
                          {activeStudy.industry}
                        </p>
                      </header>

                      <section className="space-y-4">
                        <article>
                          <h4 className="font-serif text-lg text-primary-700 mb-2">
                            Challenge
                          </h4>
                          <p className="text-dark-600">
                            {activeStudy.challenge}
                          </p>
                        </article>

                        <article>
                          <h4 className="font-serif text-lg text-primary-700 mb-2">
                            Solution
                          </h4>
                          <p className="text-dark-600">
                            {activeStudy.solution}
                          </p>
                        </article>
                      </section>

                      <CaseStudyResults results={activeStudy.results} />

                      <footer className="flex flex-wrap gap-2">
                        {activeStudy.tags.map((tag) => (
                          <span
                            key={tag}
                            className="px-3 py-1 text-sm bg-neutral-50 text-dark-600 rounded-full"
                          >
                            {tag}
                          </span>
                        ))}
                      </footer>
                    </article>

                    <CaseStudyPreview
                      study={activeStudy}
                      isHovering={hoveringStates[activeStudy.id]}
                      onHoverChange={(isHovering) =>
                        setHoveringStates({ ...hoveringStates, [activeStudy.id]: isHovering })
                      }
                    />
                  </div>
                </article>
              </motion.div>
            )}
          </AnimatePresence>
          <MobilePagination
            studies={caseStudies}
            activeStudyId={activeStudyId}
            onStudySelect={setActiveStudyId}
          />
        </section>

      </article>
    </section>
  );
};

export default CaseStudies;