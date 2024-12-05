import StackedCards from '@/components/pages/about/StackedCards';

export const AboutVariant: React.FC = () => (
  <figure className="relative w-[300px] h-[300px] sm:w-[400px] sm:h-[400px] flex items-center justify-center">
    <div
      className="absolute inset-0 bg-gradient-to-tr from-primary-200/20 to-primary-500/20 
                 rounded-full filter blur-3xl transform -rotate-12"
      aria-hidden="true"
    />
    <StackedCards />
  </figure>
); 