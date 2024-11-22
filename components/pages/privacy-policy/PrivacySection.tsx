import { IconType } from 'react-icons';

export type SectionId = 'information-collection' | 'information-use' | 'data-protection' | 'user-rights';

interface PrivacySectionData {
  id: string;
  title: string;
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
    <section id={section.id} className="scroll-mt-24">
      <h2 className="font-serif text-3xl text-secondary-400 mb-8 flex items-center">
        <Icon className="w-8 h-8 mr-3 text-secondary-400" />
        {section.title}
      </h2>
      
      <div className="space-y-8">
        {section.content.map((subsection, index) => (
          <div key={index} className="bg-neutral-50 rounded-lg p-8 border-2 border-neutral-200">
            <h3 className="font-serif text-xl text-secondary-500 mb-4">
              {subsection.subtitle}
            </h3>
            <ul className="space-y-3">
              {subsection.points.map((point, pointIndex) => (
                <li key={pointIndex} className="text-secondary-400 flex items-start">
                  <span className="mr-3 text-secondary-400">•</span>
                  {point}
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