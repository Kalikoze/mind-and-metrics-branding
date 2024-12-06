'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import CircuitOverlay from '@/components/common/CircuitOverlay';

const processSteps = [
  {
    title: "Getting to Know You",
    items: [
      { subtitle: "Personalized Kickoff", description: "One-on-one conversations to understand your story, goals, and challenges." },
      { subtitle: "Focused Research", description: "Targeted analysis to uncover quick wins and long-term opportunities." },
      { subtitle: "Stakeholder Interviews", description: "Gather insights directly from your team for a comprehensive understanding." }
    ]
  },
  {
    title: "Building the Plan Together",
    items: [
      { subtitle: "Collaborative Strategy Sessions", description: "Work with you to co-create a plan that fits your unique needs." },
      { subtitle: "Scalable Solutions", description: "Prioritize actions that make the biggest impact now, with room to grow." }
    ]
  },
  {
    title: "Making It Happen",
    items: [
      { subtitle: "Hands-On Approach", description: "Our team works closely with you to bring ideas to life." },
      { subtitle: "Iterative Process", description: "Share drafts, prototypes, and progress frequently to keep you in the loop." }
    ]
  },
  {
    title: "Partnering Every Step",
    items: [
      { subtitle: "Accessible Team", description: "Direct access to the people working on your project—no layers, no delays." },
      { subtitle: "Flexible Milestones", description: "Adjust plans as needed to stay aligned with your evolving priorities." }
    ]
  },
  {
    title: "Delivering Value",
    items: [
      { subtitle: "Transparent Results", description: "Clear reporting that shows what's working and where we can optimize." },
      { subtitle: "Ongoing Support", description: "We're here to fine-tune and grow with you as your business scales." }
    ]
  },
  {
    title: "Growing Together",
    items: [
      { subtitle: "Feedback-Driven", description: "Your input helps shape our process, ensuring we deliver exactly what you need." },
      { subtitle: "Mutual Success", description: "We're invested in your success because it fuels our growth too." }
    ]
  }
];

const ProcessFlow = () => {
  const [activeStep, setActiveStep] = useState(0);

  return (
    <section className="relative bg-neutral-50 py-24 overflow-hidden">
      <CircuitOverlay />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <header className="text-center mb-20">
          <h2 className="text-3xl md:text-4xl font-serif text-dark-800 mb-4">
            Our Process
          </h2>
          <p className="text-dark-600 text-lg max-w-2xl mx-auto">
            A collaborative journey designed to deliver lasting results — click each step to explore our approach
          </p>
        </header>

        <div className="mb-16">
          <div className="max-w-4xl mx-auto grid grid-cols-6 relative">
            {processSteps.map((step, index) => (
              <div key={index} className="flex flex-col items-center relative">
                {index < processSteps.length - 1 && (
                  <div
                    className="absolute w-full"
                    style={{
                      left: '50%',
                      top: '1.5rem',
                      height: '2px',
                      zIndex: 0
                    }}
                  >
                    <div
                      className="absolute h-full bg-primary-400 transition-all duration-300"
                      style={{
                        width: activeStep > index ? '100%' : '0%',
                        left: '0%'
                      }}
                    />
                  </div>
                )}

                <button
                  onClick={() => setActiveStep(index)}
                  className={`
                    w-12 h-12 rounded-full 
                    flex items-center justify-center
                    transition-all duration-300
                    relative z-10
                    ${activeStep >= index
                      ? 'bg-primary-400 text-white shadow-lg'
                      : 'bg-white text-primary-400 border-2 border-primary-200 hover:border-primary-400'
                    }
                  `}
                >
                  <span className="font-serif text-xl font-bold">{index + 1}</span>
                </button>

                <span
                  className={`
                    mt-4 text-sm font-medium text-center hidden md:block
                    transition-colors duration-300
                    ${activeStep >= index ? 'text-primary-400' : 'text-dark-600'}
                  `}
                >
                  {step.title}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="max-w-4xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeStep}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="col-span-1 md:col-span-3"
            >
              <div className="bg-white rounded-lg border-2 border-neutral-200 p-8 min-h-[20rem]">
                <h3 className="text-2xl font-serif font-bold text-dark-800 mb-6">
                  {processSteps[activeStep].title}
                </h3>
                <div className="grid md:grid-cols-2 gap-8">
                  {processSteps[activeStep].items.map((item, index) => (
                    <div
                      key={index}
                      className="flex gap-4 items-start"
                    >
                      <div className="w-1 h-full bg-primary-200 rounded-full mt-2"></div>
                      <div>
                        <h4 className="font-medium text-dark-800 mb-2">
                          {item.subtitle}
                        </h4>
                        <p className="text-dark-600">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

export default ProcessFlow; 