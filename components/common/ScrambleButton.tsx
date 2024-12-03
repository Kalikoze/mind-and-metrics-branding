'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import ScrambleText from './ScrambleText';
import { IconType } from 'react-icons';

interface ScrambleButtonProps {
  text: string;
  href: string;
  icon: IconType;
  variant: 'primary' | 'secondary';
  dataCy?: string;
}

const ScrambleButton: React.FC<ScrambleButtonProps> = ({
  text,
  href,
  icon: Icon,
  variant,
  dataCy,
}) => {
  const [isHovering, setIsHovering] = useState(false);

  const baseStyles = "inline-flex w-full sm:w-auto px-8 py-3.5 rounded-lg items-center justify-center space-x-2 transition-all duration-300 hover:scale-105";

  const variantStyles = {
    primary: "bg-primary-300 text-white border-2 border-primary-300 hover:bg-transparent hover:text-primary-100 shadow-lg shadow-primary-300/20",
    secondary: "bg-white/90 backdrop-blur-sm border-2 border-primary-300 text-primary-100 hover:bg-primary-100 hover:text-white shadow-lg shadow-primary-100/20"
  };

  return (
    <Link
      href={href}
      data-cy={dataCy}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      className={`${baseStyles} ${variantStyles[variant]}`}
    >
      <Icon className="w-5 h-5 shrink-0" />
      <span className="w-[120px] text-center">
        <ScrambleText text={text} isHovering={isHovering} />
      </span>
    </Link>
  );
};

export default ScrambleButton; 