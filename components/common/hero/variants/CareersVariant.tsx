import { HiSparkles } from 'react-icons/hi2';

export const CareersVariant: React.FC = () => (
  <article 
    className="relative w-[300px] h-[300px] sm:w-[400px] sm:h-[400px] 
               bg-gradient-to-br from-primary-100 to-primary-400 
               rounded-full shadow-lg animate-pulse overflow-hidden"
  >
    <div className="absolute inset-0 flex flex-col items-center justify-center px-8">
      <HiSparkles className="w-12 h-12 text-white mb-2" aria-hidden="true" />
      <p className="text-lg sm:text-2xl font-serif text-white font-bold text-center">
        Where Growth Meets Purpose
      </p>
      <div 
        className="h-1 w-full bg-gradient-to-r from-primary-300 to-primary-500 
                   mx-auto mt-2 rounded-full"
        role="presentation"
      />
      <p className="text-sm text-white mt-2 text-center">
        Building Tomorrow&apos;s Leaders Today
      </p>
    </div>
  </article>
); 