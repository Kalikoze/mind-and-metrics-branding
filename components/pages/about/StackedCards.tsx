import { aboutCards } from '@/data/aboutCards';
import StackedCard from './StackedCard';

const StackedCards = () => {
  return (
    <div className="relative w-full max-w-md -mt-72 sm:-mt-72">
      {aboutCards.map((card) => (
        <StackedCard key={card.title} card={card} />
      ))}
    </div>
  );
};

export default StackedCards; 