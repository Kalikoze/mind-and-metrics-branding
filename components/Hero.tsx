import React from 'react';
import Image from 'next/image';
import GraphingBackground from '@/public/assets/logos/graphing-background.svg';
import SpiralDesign from '@/public/assets/logos/spiral-design.svg';
import { motion } from 'framer-motion';
import { HiOutlineArrowRight } from 'react-icons/hi';

interface HeroProps {
  title: string;
  subtitle: string;
  ctaText: string;
  onCtaClick: () => void;
}

const Hero: React.FC<HeroProps> = ({ title, subtitle, ctaText, onCtaClick }) => {
  return (
    <div className="relative overflow-hidden bg-background min-h-screen flex items-center" data-cy="hero-section">
      {/* Background SVGs */}
      <div className="absolute inset-0 z-0">
        <Image
          src={GraphingBackground}
          alt="Background design"
          fill
          className="opacity-50 object-cover"
        />
        <Image
          src={SpiralDesign}
          alt="Background design"
          fill
          className="opacity-50 object-cover"
        />
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <h1 data-cy="hero-title" className="font-serif text-5xl sm:text-6xl font-bold mb-6 text-secondary-600
                         [text-wrap:balance] bg-clip-text text-transparent 
                         bg-gradient-to-r from-secondary-600 to-secondary-400">
            {title}
          </h1>
          <h2 data-cy="hero-subtitle" className="font-sans text-xl sm:text-2xl mb-12 text-secondary-500">
            {subtitle}
          </h2>
          <motion.button
            data-cy="hero-cta"
            onClick={onCtaClick}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="font-sans px-8 py-3.5 bg-primary-50 text-white font-semibold 
                     rounded-lg shadow-md hover:shadow-xl flex items-center space-x-2 
                     mx-auto group transition-all duration-300
                     hover:bg-gradient-to-r hover:from-primary-200 hover:to-primary-300"
          >
            <span>{ctaText}</span>
            <HiOutlineArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </motion.button>
        </div>
      </div>
    </div>
  );
};

export default Hero;
