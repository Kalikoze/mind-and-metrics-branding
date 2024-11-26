import { RiCheckLine } from 'react-icons/ri';
import { ServicePoint } from '@/data/serviceDetails';

interface KeyFeaturesProps {
  serviceId: string;
  keyPoints: ServicePoint[];
  isEvenSection: boolean;
}

const KeyFeatures = ({ serviceId, keyPoints, isEvenSection }: KeyFeaturesProps) => {
  return (
    <section className={`rounded-lg p-8 ${
      isEvenSection
        ? 'bg-white border border-neutral-200'
        : 'bg-neutral-50 border-2 border-neutral-200'
    }`}>
      <h3 className="font-serif text-xl mb-6 text-dark-800">
        Key Features
      </h3>
      <ul data-cy={`service-features-${serviceId}`}>
        {keyPoints.map((point, pointIndex) => (
          <li 
            key={pointIndex}
            className="mb-6 last:mb-0"
            style={{ minHeight: '150px' }}
          >
            <h4 className="flex items-center space-x-3 mb-2">
              <RiCheckLine className="w-5 h-5 text-secondary-400 shrink-0" />
              <span className="font-medium text-dark-800">{point.title}</span>
            </h4>
            <ul className="pl-8 space-y-2" role="list">
              {point.subPoints.map((subPoint, subIndex) => (
                <li key={subIndex} className="text-dark-600 text-sm">
                  • {subPoint}
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default KeyFeatures; 