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
    primary: `bg-primary-300 text-white border-2 border-primary-300 ${!disabled ? 'hover:bg-transparent hover:text-primary-100' : 'opacity-50'} shadow-lg shadow-primary-300/20`,
    secondary: `${disabled ? 'text-primary-100/50 border-primary-300/50' : 'border-primary-300 text-primary-100 hover:bg-primary-100 hover:text-white'} bg-white/90 backdrop-blur-sm border-2 shadow-lg shadow-primary-100/20`
  };

  const hoverStyles = !disabled ? "hover:scale-105" : "";

  return (
    <motion.button
      initial={initial}
      animate={animate}
      exit={exit}
      transition={transition}
      whileHover={!disabled ? { scale: 1.05 } : {}}
      whileTap={!disabled ? { scale: 0.95 } : {}}
      onClick={onClick}
      disabled={disabled}
      onMouseEnter={() => !disabled && setIsHovering(true)}
      onMouseLeave={() => !disabled && setIsHovering(false)}
      className={`${baseStyles} ${variantStyles[variant]} ${hoverStyles} ${disabled ? 'cursor-not-allowed' : ''}`}
      data-cy={dataCy}
    >
      <Icon className="w-5 h-5 shrink-0" aria-hidden="true" />
      <span style={{ width: spanWidth }} className="text-center">
        <ScrambleText text={text} isHovering={isHovering && !disabled} />
      </span>
    </motion.button>
  );
};

export default MotionScrambleButton; 