'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import CircuitOverlay from '@/components/common/CircuitOverlay';
import { processSteps } from '@/data/process-steps';
import ProcessStepButton from './ProcessStepButton';
import ProcessStepContent from './ProcessStepContent';

const ProcessFlow = () => {
  const [activeStep, setActiveStep] = useState(0);

  return (
    <section className="relative bg-neutral-50 py-24 overflow-hidden" data-cy="process-flow-section">
      <CircuitOverlay />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <header className="text-center mb-20">
          <h2 className="text-3xl md:text-4xl font-serif text-dark-800 mb-4" data-cy="process-flow-title">
            Our Process
          </h2>
          <p className="text-dark-600 text-lg max-w-2xl mx-auto" data-cy="process-flow-subtitle">
            A collaborative journey designed to deliver lasting results — click each step to explore our approach
          </p>
        </header>

        <nav className="mb-16" aria-label="Process steps">
          <ol className="max-w-4xl mx-auto grid grid-cols-6 relative">
            {processSteps.map((step, index) => (
              <ProcessStepButton
                key={index}
                index={index}
                title={step.title}
                isActive={activeStep >= index}
                isProgressLine={activeStep > index}
                onClick={() => setActiveStep(index)}
                showConnector={index < processSteps.length - 1}
              />
            ))}
          </ol>
        </nav>

        <article className="max-w-4xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeStep}
              data-cy="process-step-content"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="col-span-1 md:col-span-3"
            >
              <ProcessStepContent
                title={processSteps[activeStep].title}
                items={processSteps[activeStep].items}
              />
            </motion.div>
          </AnimatePresence>
        </article>
      </div>
    </section>
  );
};

export default ProcessFlow; 