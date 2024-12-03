import { AboutCard, aboutCards } from '@/data/aboutCards';

const StackedCard = ({ card }: { card: AboutCard }) => {
  return (
    <div 
      className="absolute w-80 h-36 bg-white/60 backdrop-blur-sm 
                 rounded-xl border border-primary-100/20 p-6"
      style={{
        top: card.position.top,
        left: card.position.left,
        right: card.position.right,
        transform: `rotate(${card.rotation}deg)`
      }}
    >
      <div className="flex items-center gap-4">
        <card.icon className="w-10 h-10 text-primary-500" />
        <div>
          <h3 className="font-serif text-xl text-primary-600">{card.title}</h3>
          <p className="text-base text-primary-400">{card.subtitle}</p>
        </div>
      </div>
    </div>
  );
};

const StackedCards = () => {
  return (
    <div className="relative w-full max-w-md -mt-72">
      {aboutCards.map((card, index) => (
        <StackedCard key={card.title} card={card} />
      ))}
    </div>
  );
};

export default StackedCards; 