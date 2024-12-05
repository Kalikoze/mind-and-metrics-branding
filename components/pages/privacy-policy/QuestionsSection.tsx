'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { HiQuestionMarkCircle } from 'react-icons/hi2';
import { RiArrowRightUpLine } from 'react-icons/ri';

const QuestionsSection = () => {
  return (
    <section id="contact" className="scroll-mt-24" data-cy="questions-section">
      <h2 className="font-serif text-3xl text-dark-800 mb-8 flex items-center" 
          data-cy="questions-section-title">
        <HiQuestionMarkCircle className="w-8 h-8 mr-3 text-primary-500" />
        Questions or Concerns?
      </h2>
      <div className="bg-neutral-50 rounded-lg p-8 border-2 border-neutral-200" 
           data-cy="questions-section-content">
        <p className="text-dark-600 mb-4" data-cy="questions-section-text">
          If you have any questions about this Privacy Policy or our data practices, please don&apos;t hesitate to reach out to us.
        </p>
        <motion.div
          variants={{
            hover: {
              y: -2,
              transition: { type: "spring", stiffness: 400 }
            }
          }}
          whileHover="hover"
        >
          <Link
            href="/contact"
            className="text-dark-600 hover:text-dark-800 transition-colors
                     relative group text-sm inline-flex items-center"
            data-cy="questions-section-contact-link"
          >
            <span className="relative">
              Contact us with your questions
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-dark-800/10 
                             transition-all duration-300 group-hover:w-full" />
            </span>
            <RiArrowRightUpLine className="w-4 h-4 opacity-0 -ml-2 group-hover:opacity-100 
                                         group-hover:ml-1 transition-all duration-300" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default QuestionsSection; 