'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { HiOutlineHome } from 'react-icons/hi2';
import ScrambleText from '@/components/common/ScrambleText';
import GraphingBackground from '@/public/assets/backgrounds/graphing-background.svg';
import CircuitOverlay from '@/components/common/CircuitOverlay';

export default function NotFound() {
  const [isHovering, setIsHovering] = useState(false);

  return (
    <main className="relative min-h-screen bg-neutral-50 flex items-center justify-center overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 z-0">
        <Image
          src={GraphingBackground}
          alt="Background design"
          fill
          className="opacity-30 object-cover"
        />
      </div>
      <CircuitOverlay />

      <div className="relative z-10 max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h1 className="font-serif text-8xl text-secondary-400 mb-6">
          404
        </h1>
        
        <h2 className="font-serif text-3xl md:text-4xl text-secondary-400 mb-4">
          Page Not Found
        </h2>
        
        <p className="text-secondary-500 text-lg mb-12">
          The page you're looking for doesn't exist or has been moved.
          <br />
          But there&apos;s plenty more to explore—let&apos;s get you back home.
        </p>

        <Link
          href="/"
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
          className="font-sans inline-flex items-center px-8 py-3.5 
                     bg-secondary-400 text-white font-medium
                     rounded-lg space-x-2 border-2 border-secondary-400
                     transition-all duration-300
                     hover:bg-transparent hover:text-secondary-400 
                     hover:scale-105"
        >
          <HiOutlineHome className="w-5 h-5 shrink-0" />
          <span className="w-[120px] text-center">
            <ScrambleText 
              text="Return Home" 
              isHovering={isHovering} 
            />
          </span>
        </Link>
      </div>
    </main>
  );
} 