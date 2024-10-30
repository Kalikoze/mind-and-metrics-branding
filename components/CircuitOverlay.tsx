import React from 'react';

interface CircuitPath {
  d: string;
  className: string;
  width: number;
}

interface CircuitOverlayProps {
  className?: string;
}

const paths: CircuitPath[] = [
  // Main elegant lines (thicker)
  {
    d: "M-100,600 H300 V300 H700 V100 H1300",
    className: "animate-draw stroke-primary-200/10",
    width: 2
  },
  {
    d: "M0,200 H400 V400 H800 V0 H1200",
    className: "animate-draw-delay-1 stroke-secondary-200/10",
    width: 2
  },
  {
    d: "M1300,500 H900 V200 H500 V400 H100 V100",
    className: "animate-draw-delay-2 stroke-primary-300/20",
    width: 2
  },
  // Subtle accent lines (thinner)
  {
    d: "M-50,150 H200 V350 H600 V150 H1300",
    className: "animate-draw-delay-2 stroke-primary-200/10",
    width: 1
  },
  {
    d: "M1200,250 H800 V50 H400 V250 H-100",
    className: "animate-draw stroke-secondary-200/10",
    width: 1
  }
];

const CircuitOverlay: React.FC<CircuitOverlayProps> = ({ className = "" }) => {
  return (
    <div className={`absolute inset-0 pointer-events-none ${className}`}>
      <svg 
        className="absolute w-full h-full" 
        xmlns="http://www.w3.org/2000/svg" 
        viewBox="0 0 1200 800" 
        preserveAspectRatio="xMidYMid slice"
      >
        {paths.map((path, index) => (
          <path
            key={index}
            d={path.d}
            className={path.className}
            fill="none"
            strokeWidth={path.width}
            pathLength="1"
          />
        ))}
      </svg>
    </div>
  );
};

export default CircuitOverlay; 