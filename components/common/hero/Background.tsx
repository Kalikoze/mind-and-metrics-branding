import { AccentShape } from './AccentShape';

interface BackgroundProps {
  variant: string;
}

export const Background: React.FC<BackgroundProps> = ({ variant }) => {
  const renderShapes = (count: number, getStyles: (i: number) => any) => (
    <div className="absolute inset-0 opacity-10">
      {[...Array(count)].map((_, i) => (
        <AccentShape key={`accent-${i}`} {...getStyles(i)} />
      ))}
    </div>
  );

  switch (variant) {
    case 'services':
      return renderShapes(12, (i) => ({
        top: `${(i % 4) * 25 + 5}%`,
        left: `${Math.floor(i / 4) * 33 + 10}%`,
        width: '12%',
        height: '12%',
        background: `linear-gradient(195deg, ${i % 2 ? '#385B94' : '#1F3251'} 0%, transparent 85%)`,
        transform: `rotate(${i * 25}deg) scale(${0.8 + (i % 4) * 0.15})`,
      }));

    case 'about':
      return renderShapes(8, (i) => ({
        top: `${i * 12 + 5}%`,
        left: `${((i + 2) % 4) * 25 + 10}%`,
        width: '15%',
        height: '15%',
        background: `linear-gradient(165deg, ${i % 2 ? '#385B94' : '#223759'} 0%, transparent 90%)`,
        transform: `rotate(${i * 45}deg) scale(${1 + (i % 3) * 0.2})`,
      }));

    case 'careers':
      return renderShapes(10, (i) => ({
        top: `${i * 10 + 5}%`,
        left: `${((i + 1) % 5) * 20 + 10}%`,
        width: '18%',
        height: '18%',
        background: `linear-gradient(135deg, ${i % 2 ? '#5C83C1' : '#3E64A3'} 0%, transparent 85%)`,
        transform: `rotate(${i * 36}deg) scale(${0.9 + (i % 3) * 0.1})`,
      }));

    case 'contact':
      return renderShapes(12, (i) => ({
        top: `${Math.sin(i * 0.5) * 40 + 50}%`,
        left: `${Math.cos(i * 0.5) * 15 + 50}%`,
        width: `${10 + (i % 3) * 5}%`,
        height: `${10 + (i % 3) * 5}%`,
        background: `linear-gradient(${i * 30}deg, ${
          i % 3 === 0 ? '#385B94' :
          i % 3 === 1 ? '#436EB1' :
          '#223759'
        } 0%, transparent 90%)`,
        transform: `rotate(${i * 30}deg)`,
      }));

    case 'privacy':
      return renderShapes(15, (i) => ({
        top: `${Math.sin(i * 0.7) * 35 + 50}%`,
        left: `${Math.cos(i * 0.7) * 40 + 50}%`,
        width: `${8 + (i % 4) * 4}%`,
        height: `${8 + (i % 4) * 4}%`,
        background: `linear-gradient(${i * 24}deg, ${
          i % 3 === 0 ? '#223759' :
          i % 3 === 1 ? '#2D4976' :
          '#385B94'
        } 0%, transparent 85%)`,
        transform: `rotate(${i * 24}deg) scale(${0.8 + (i % 3) * 0.2})`,
      }));

    default:
      return renderShapes(6, (i) => ({
        top: `${i * 15 + 10}%`,
        left: `${((i + 1) % 3) * 30 + 20}%`,
        width: '20%',
        height: '20%',
        background: `linear-gradient(145deg, ${i % 2 ? '#436EB1' : '#2D4976'} 0%, transparent 80%)`,
        transform: `rotate(${i * 30}deg)`,
      }));
  }
}; 