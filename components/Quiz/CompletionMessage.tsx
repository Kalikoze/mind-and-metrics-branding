'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { HiArrowRight } from 'react-icons/hi';
import ScrambleText from '@/components/common/ScrambleText';

interface CompletionMessageProps {
  preferredContact: 'email' | 'phone' | null;
}

export default function CompletionMessage({ preferredContact }: CompletionMessageProps) {
  const [isHomeHovering, setIsHomeHovering] = useState(false);

  return (
    <motion.section
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.3 }}
      className="text-center bg-white rounded-lg p-8 border-2 border-neutral-200
                 transition-all duration-300 hover:border-secondary-400
                 hover:shadow-lg w-full"
      data-cy="completion-view"
    >
      <header className="mb-8">
        <h1 
          className="font-serif text-3xl text-dark-800 mb-4" 
          data-cy="completion-title"
        >
          Thank You for Choosing Us
        </h1>
        <p 
          className="text-dark-600 text-lg" 
          data-cy="completion-subtitle"
        >
          We&apos;re excited to help grow your business
        </p>
      </header>

      <article className="mb-8 text-dark-600">
        <p 
          className="mb-3" 
          data-cy="completion-message"
        >
          We&apos;ll review your information and craft a customized growth strategy for your business.
        </p>
        <p 
          className="text-sm" 
          data-cy="completion-timeline"
        >
          Expect to hear from us within 24 hours{preferredContact === 'phone' ? ' at your specified time' : ''}.
        </p>
      </article>

      <footer>
        <p 
          className="text-sm text-dark-600/80 italic mb-8" 
          data-cy="completion-contact"
        >
          Need immediate assistance? Email us at{' '}
          <motion.span
            className="inline-block"
            variants={{
              hover: {
                y: -2,
                transition: { type: "spring", stiffness: 400 }
              }
            }}
            whileHover="hover"
          >
            <a
              href="mailto:info@mindandmetricsbranding.com"
              className="text-secondary-400 underline hover:text-secondary-500"
              data-cy="completion-email"
            >
              info@mindandmetricsbranding.com
            </a>
          </motion.span>
        </p>

        <motion.button
          onClick={() => window.location.href = '/'}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onMouseEnter={() => setIsHomeHovering(true)}
          onMouseLeave={() => setIsHomeHovering(false)}
          className="px-8 py-3.5 bg-secondary-400 text-white font-medium
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
      </footer>
    </motion.section>
  );
} 