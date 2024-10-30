import { useEffect, useState } from 'react';

const chars = 'ABCDEFIJSTUVYabcdefghijklnorstuvxyz';

interface ScrambleTextProps {
  text: string;
  isHovering: boolean;
}

const ScrambleText: React.FC<ScrambleTextProps> = ({ text, isHovering }) => {
  const [displayText, setDisplayText] = useState(text);
  
  useEffect(() => {
    if (!isHovering) {
      setDisplayText(text);
      return;
    }

    let iteration = 0;
    const maxIterations = 1;
    
    const interval = setInterval(() => {
      setDisplayText(current => 
        current
          .split('')
          .map((letter, index) => {
            if (index < iteration) {
              return text[index];
            }
            return chars[Math.floor(Math.random() * chars.length)];
          })
          .join('')
      );

      iteration += 1/3;

      if (iteration >= text.length * maxIterations) {
        clearInterval(interval);
        setDisplayText(text);
      }
    }, 30);

    return () => clearInterval(interval);
  }, [isHovering, text]);

  return <span>{displayText}</span>;
};

export default ScrambleText; 