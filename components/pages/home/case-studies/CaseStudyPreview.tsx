import Image from 'next/image';
import { HiOutlineGlobeAlt } from 'react-icons/hi2';
import ScrambleButton from '@/components/common/ScrambleButton';
import { CaseStudy } from '@/data/caseStudies';
import { useEffect, useState } from 'react';

interface CaseStudyPreviewProps {
  study: CaseStudy;
  isHovering: boolean;
  onHoverChange: (isHovering: boolean) => void;
}

export const CaseStudyPreview = ({ study }: CaseStudyPreviewProps) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 640);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

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

      <div className="absolute md:top-4 md:right-4 -bottom-48 md:bottom-auto w-full sm:w-auto sm:left-1/2 sm:-translate-x-1/2 md:left-auto md:translate-x-0">
        <ScrambleButton
          text="Visit Site"
          href={study.websiteUrl}
          icon={HiOutlineGlobeAlt}
          variant={isMobile ? "primary" : "secondary"}
          dataCy="case-study-visit-site"
        />
      </div>
    </section>
  );
}; 