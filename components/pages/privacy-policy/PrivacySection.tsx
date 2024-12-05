import { IconType } from 'react-icons';

export type SectionId = 'information-collection' | 'information-use' | 'data-protection' | 'user-rights';

interface PrivacySectionData {
  id: string;
  title: string;
  introduction: string;
  content: Array<{
    subtitle: string;
    points: string[];
  }>;
}

interface PrivacySectionProps {
  section: PrivacySectionData;
  Icon: IconType;
}

const PrivacySection = ({ section, Icon }: PrivacySectionProps) => {
  return (
    <section id={section.id} className="scroll-mt-24" data-cy={`privacy-section-${section.id}`}>
      <h2 className="font-serif text-3xl text-dark-800 mb-8 flex items-center" 
          data-cy={`privacy-section-title-${section.id}`}>
        <Icon className="w-8 h-8 mr-3 text-primary-500" data-cy={`privacy-section-icon-${section.id}`} />
        {section.title}
      </h2>

      {section.introduction && (
        <p className="text-dark-600 mb-8 leading-relaxed" 
           data-cy={`privacy-section-intro-${section.id}`}>
          {section.introduction}
        </p>
      )}

      <div className="space-y-8">
        {section.content.map((subsection, index) => (
          <div key={index} 
               className="bg-neutral-50 rounded-lg p-8 border-2 border-neutral-200"
               data-cy={`privacy-subsection-${section.id}-${index}`}>
            <h3 className="font-serif text-xl text-dark-800 mb-4"
                data-cy={`privacy-subsection-title-${section.id}-${index}`}>
              {subsection.subtitle}
            </h3>
            <ul className="space-y-3">
              {subsection.points.map((point, pointIndex) => (
                <li key={pointIndex} 
                    className="text-dark-600 flex items-start"
                    data-cy={`privacy-point-${section.id}-${index}-${pointIndex}`}>
                  <span className="text-secondary-400 mr-3">•</span>
                  <span className="text-sm text-dark-600">{point}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
};

export default PrivacySection; 