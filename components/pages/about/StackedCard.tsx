import { AboutCard } from '@/data/aboutCards';

const StackedCard = ({ card }: { card: AboutCard }) => {
  return (
    <div 
      className="absolute w-56 h-24 sm:w-80 sm:h-36 bg-white/60 backdrop-blur-sm 
                 rounded-xl border border-primary-100/20 shadow-lg p-3 sm:p-6"
      style={{
        top: card.position.top,
        left: card.position.left,
        right: card.position.right,
        transform: `rotate(${card.rotation}deg)`
      }}
    >
      <div className="flex items-center gap-2 sm:gap-4">
        <card.icon className="w-6 h-6 sm:w-10 sm:h-10 text-primary-500" />
        <div>
          <p className="font-serif text-base sm:text-xl text-dark-800">{card.title}</p>
          <p className="text-xs sm:text-base text-dark-500">{card.subtitle}</p>
        </div>
      </div>
    </div>
  );
};

export default StackedCard; 