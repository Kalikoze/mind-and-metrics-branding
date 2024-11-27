import { ServiceOffering } from '@/data/serviceDetails';

interface ServiceDetailsSectionProps {
  serviceId: string;
  offerings: ServiceOffering[];
  isEvenSection: boolean;
}

const ServiceDetailsSection = ({ serviceId, offerings, isEvenSection }: ServiceDetailsSectionProps) => {
  return (
    <section className={`rounded-lg p-8 ${
      isEvenSection
        ? 'bg-white border border-neutral-200'
        : 'bg-neutral-50 border-2 border-neutral-200'
    }`}>
      <h3 className="font-serif text-xl mb-6 text-dark-800">
        Service Details
      </h3>
      <ul data-cy={`service-offerings-${serviceId}`}>
        {offerings.map((offering, offeringIndex) => (
          <li 
            key={offeringIndex}
            data-cy={`service-offering-${serviceId}-${offeringIndex}`}
            className="mb-6 last:mb-0"
            style={{ minHeight: '150px' }}
          >
            <h4 className="font-medium text-dark-800 mb-2">{offering.title}</h4>
            <p className="text-dark-600 text-sm">{offering.description}</p>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default ServiceDetailsSection; 