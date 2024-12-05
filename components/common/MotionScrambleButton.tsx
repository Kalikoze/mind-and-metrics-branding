'use client';

import { motion, HTMLMotionProps } from 'framer-motion';
import { IconType } from 'react-icons';
import ScrambleText from '@/components/common/ScrambleText';
import { useState } from 'react';

type MotionButtonProps = HTMLMotionProps<"button"> & {
  text: string;
  icon: IconType;
  variant: 'primary' | 'secondary';
  onClick: () => void;
  initial?: object;
  animate?: object;
  exit?: object;
  transition?: object;
  disabled?: boolean;
  dataCy?: string;
  spanWidth?: string;
};

const MotionScrambleButton = ({
  text,
  icon: Icon,
  variant,
  onClick,
  initial,
  animate,
  exit,
  transition,
  disabled,
  dataCy,
  spanWidth = '80px',
}: MotionButtonProps) => {
  const [isHovering, setIsHovering] = useState(false);

  const baseStyles = "inline-flex w-full sm:w-auto px-8 py-3.5 rounded-lg items-center justify-center space-x-2 transition-all duration-300 hover:scale-105";

  const variantStyles = {
    primary: "bg-primary-300 text-white border-2 border-primary-300 hover:bg-transparent hover:text-primary-100 shadow-lg shadow-primary-300/20",
    secondary: "bg-white/90 backdrop-blur-sm border-2 border-primary-300 text-primary-100 hover:bg-primary-100 hover:text-white shadow-lg shadow-primary-100/20"
  };

  return (
    <motion.button
      initial={initial}
      animate={animate}
      exit={exit}
      transition={transition}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      disabled={disabled}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      className={`${baseStyles} ${variantStyles[variant]} ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
      data-cy={dataCy}
    >
      <Icon className="w-5 h-5 shrink-0" aria-hidden="true" />
      <span className={`text-center w-[${spanWidth}]`}>
        <ScrambleText text={text} isHovering={isHovering && !disabled} />
      </span>
    </motion.button>
  );
};

export default MotionScrambleButton; 