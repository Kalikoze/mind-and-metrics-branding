'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import ScrambleText from './ScrambleText';
import { IconType } from 'react-icons';

interface ScrambleButtonProps {
  text: string;
  href?: string;
  icon: IconType;
  variant: 'primary' | 'secondary';
  dataCy?: string;
  spanWidth?: string;
  onClick?: (e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => void;
  className?: string;
  type?: 'button' | 'submit';
  disabled?: boolean;
  isLoading?: boolean;
  fixedWidth?: boolean;
}

const ScrambleButton: React.FC<ScrambleButtonProps> = ({
  text,
  href,
  icon: Icon,
  variant,
  dataCy,
  spanWidth = '120px',
  onClick,
  className = '',
  type,
  disabled = false,
  isLoading = false,
  fixedWidth = false,
}) => {
  const [isHovering, setIsHovering] = useState(false);

  const baseStyles = `inline-flex ${
    fixedWidth ? 'w-auto' : 'w-full sm:w-auto'
  } px-8 py-3.5 rounded-lg items-center justify-center space-x-2 transition-all duration-300`;

  const variantStyles = {
    primary: `bg-primary-300 text-white border-2 border-primary-300 ${!disabled ? 'hover:bg-transparent hover:text-primary-100' : 'opacity-50 cursor-not-allowed'} shadow-lg shadow-primary-300/20`,
    secondary: `${disabled ? 'text-primary-100/50 border-primary-300/50' : 'border-primary-300 text-primary-100 hover:bg-primary-100 hover:text-white'} bg-white/90 backdrop-blur-sm border-2 shadow-lg shadow-primary-100/20`
  };

  const isExternal = href?.startsWith('http') || href?.startsWith('https');

  const hoverStyles = !disabled ? "hover:scale-105" : "";

  if (type) {
    return (
      <button
        type={type}
        disabled={disabled}
        data-cy={dataCy}
        onClick={(e) => {
          if (disabled) {
            e.preventDefault();
            return;
          }
          onClick?.(e);
        }}
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
        className={`${baseStyles} ${variantStyles[variant]} ${className} ${hoverStyles} ${disabled ? 'cursor-not-allowed' : ''}`}
      >
        {isLoading ? (
          <div className="w-5 h-5 border-2 border-current border-t-transparent rounded-full animate-spin shrink-0" />
        ) : (
          <Icon className="w-5 h-5 shrink-0" />
        )}
        <span style={{ width: spanWidth }} className="text-center">
          <ScrambleText text={text} isHovering={isHovering && !disabled} />
        </span>
      </button>
    );
  }

  return (
    <Link
      href={href || ''}
      data-cy={dataCy}
      onClick={(e) => {
        if (disabled) {
          e.preventDefault();
          return;
        }
        if (onClick) {
          e.preventDefault();
          onClick(e);
        }
      }}
      {...isExternal && {
        target: "_blank",
        rel: "noopener noreferrer"
      }}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      className={`${baseStyles} ${variantStyles[variant]} ${className} ${hoverStyles} ${disabled ? 'cursor-not-allowed' : ''}`}
    >
      <Icon className="w-5 h-5 shrink-0" />
      <span style={{ width: spanWidth }} className="text-center">
        <ScrambleText text={text} isHovering={isHovering && !disabled} />
      </span>
    </Link>
  );
};

export default ScrambleButton; 