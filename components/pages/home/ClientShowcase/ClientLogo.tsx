import Image from 'next/image';
import Link from 'next/link';
import ScrambleText from '@/components/common/ScrambleText';

interface ClientLogoProps {
  logo: {
    src: string;
    alt: string;
    description: string;
    websiteUrl: string;
  };
  index: number;
  isHovering: boolean;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
}

const ClientLogo = ({ logo, index, isHovering, onMouseEnter, onMouseLeave }: ClientLogoProps) => (
  <Link
    href={logo.websiteUrl}
    target="_blank"
    rel="noopener noreferrer"
    data-cy="client-logo-card"
    className="group flex flex-col md:flex-row items-center gap-6 bg-neutral-50 p-8 rounded-lg
             border-2 border-neutral-200 hover:border-secondary-300
             transition-all duration-300
             hover:shadow-lg hover:-translate-y-1"
    onMouseEnter={onMouseEnter}
    onMouseLeave={onMouseLeave}
  >
    <figure className="w-[200px] h-[70px] relative grayscale opacity-60 
                     group-hover:grayscale-0 group-hover:opacity-100
                     transition-all duration-300">
      <Image
        data-cy="client-logo-image"
        src={logo.src}
        alt={logo.alt}
        fill
        className="object-contain"
        sizes="200px"
        priority={index < 2}
      />
    </figure>

    <article className="flex-1 text-center md:text-left">
      <h4 className="font-serif text-lg text-dark-800 mb-2" data-cy="client-name">
        {logo.alt}
      </h4>
      <p className="text-dark-600 text-sm mb-3" data-cy="client-description">
        {logo.description}
      </p>
      <p className="text-sm font-medium text-secondary-400 inline-flex items-center">
        <ScrambleText text="Visit Website" isHovering={isHovering} />
        <svg
          className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform duration-300"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          aria-hidden="true"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
        </svg>
      </p>
    </article>
  </Link>
);

export default ClientLogo; 