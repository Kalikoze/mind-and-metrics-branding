import { IconType } from 'react-icons';

interface ServiceCardProps {
  icon: IconType;
  title: string;
  description: string;
}

const ServiceCard = ({ icon: Icon, title, description }: ServiceCardProps) => {
  return (
    <li
      data-cy={`service-${title.toLowerCase().replace(/\s+/g, '-')}`}
      className="relative p-8 rounded-lg bg-white
                 border-2 border-neutral-200
                 transition-all duration-300"
    >
      <figure
        data-cy="service-icon"
        className="bg-neutral-50 p-4 rounded-full w-16 h-16 mb-6
                  flex items-center justify-center"
      >
        <Icon className="w-8 h-8 text-secondary-400" aria-hidden="true" />
      </figure>

      <h3
        data-cy="service-title"
        className="text-xl font-serif text-dark-800 mb-3"
      >
        {title}
      </h3>

      <p
        data-cy="service-description"
        className="text-dark-600 font-sans mb-6"
      >
        {description}
      </p>
    </li>
  );
};

export default ServiceCard; 