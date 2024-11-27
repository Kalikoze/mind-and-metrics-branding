import Image from 'next/image';
import Link from 'next/link';
import { HiOutlineGlobeAlt } from 'react-icons/hi2';
import ScrambleText from '@/components/common/ScrambleText';
import { CaseStudy } from '@/data/caseStudies';

interface CaseStudyPreviewProps {
  study: CaseStudy;
  isHovering: boolean;
  onHoverChange: (isHovering: boolean) => void;
}

export const CaseStudyPreview = ({ study, isHovering, onHoverChange }: CaseStudyPreviewProps) => {
  return (
    <section className="relative h-auto pb-32 md:h-[600px]" aria-labelledby="preview-heading">
      <h4 className="sr-only" id="preview-heading">Website Preview</h4>
      
      <figure className="relative h-[300px] lg:h-[400px] min-w-[280px]">
        <div className="relative h-full">
          <Image
            src={study.desktopPreview}
            alt={`${study.client} desktop preview`}
            fill
            className="object-contain lg:object-cover rounded-lg shadow-lg"
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 45vw, 50vw"
          />
        </div>
        <figcaption className="absolute -bottom-2 left-4 text-sm text-dark-600 bg-white/90 
                       backdrop-blur-sm px-2 py-1 rounded-md shadow-sm">
          Desktop View
        </figcaption>
      </figure>

      <figure className="absolute -bottom-24 right-12 w-[160px] md:w-1/3 h-[350px]">
        <div className="relative h-full min-w-[160px] bg-dark-800 rounded-[2rem] p-1.5 shadow-xl">
          <span className="absolute top-0 left-1/2 -translate-x-1/2 w-1/3 h-[0.75rem] 
                        bg-dark-700 rounded-b-xl" />
          <div className="relative h-full overflow-hidden rounded-[1.75rem]">
            <Image
              src={study.mobilePreview}
              alt={`${study.client} mobile preview`}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 160px, 33vw"
            />
          </div>
        </div>
        <figcaption className="absolute -bottom-2 right-4 text-sm text-dark-600 bg-white/90 
                       backdrop-blur-sm px-2 py-1 rounded-md shadow-sm">
          Mobile View
        </figcaption>
      </figure>

      <Link
        href={study.websiteUrl}
        target="_blank"
        rel="noopener noreferrer"
        onMouseEnter={() => onHoverChange(true)}
        onMouseLeave={() => onHoverChange(false)}
        className="absolute md:top-4 md:right-4 -bottom-48 md:bottom-auto
                 font-sans px-8 py-3.5 bg-secondary-400 md:bg-white/90 md:backdrop-blur-sm
                 border-2 border-secondary-400 text-white md:text-secondary-400 
                 rounded-lg flex items-center space-x-2 w-full md:w-[200px] justify-center
                 transition-all duration-300
                 hover:bg-transparent hover:text-secondary-400 md:hover:bg-secondary-400 md:hover:text-white 
                 hover:scale-105 sm:w-auto sm:left-1/2 sm:-translate-x-1/2 md:left-auto md:translate-x-0"
      >
        <HiOutlineGlobeAlt className="w-5 h-5 shrink-0" />
        <span className="w-[120px] text-center">
          <ScrambleText
            text="Visit Site"
            isHovering={isHovering}
          />
        </span>
      </Link>
    </section>
  );
}; 