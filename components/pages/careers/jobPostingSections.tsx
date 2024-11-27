import { Position } from "@/data/positions";

export interface SectionConfig {
  id: string;
  title: string;
  content: React.ReactNode;
}

interface SubHeadingProps {
  children: React.ReactNode;
}

const SubHeading = ({ children }: SubHeadingProps) => (
  <h3 className="font-serif text-xl text-dark-800 mb-3 inline-block relative">
    <span className="relative z-10">{children}</span>
  </h3>
);

export const getJobSections = (position: Position): SectionConfig[] => [
  {
    id: 'position-summary',
    title: 'Position Summary',
    content: (
      <p className="text-dark-600" data-cy="position-summary-text">
        {position.overview}
      </p>
    )
  },
  {
    id: 'responsibilities',
    title: 'Key Responsibilities',
    content: (
      <ul className="list-disc list-outside ml-6 space-y-4 text-dark-600">
        {position.responsibilities.map((section, index) => (
          <li key={index} data-cy={`responsibility-${index}`} className="leading-relaxed">
            <span className="tracking-wide text-dark-800" data-cy={`responsibility-title-${index}`}>
              {section.title}:
            </span>
            {' '}
            <span data-cy={`responsibility-items-${index}`}>
              {section.items.join(' ')}
            </span>
          </li>
        ))}
      </ul>
    )
  },
  {
    id: 'qualifications',
    title: 'Qualifications',
    content: (
      <div className="space-y-8">
        {position.qualifications.required.length > 0 && (
          <div data-cy="required-qualifications">
            <SubHeading>Required Skills & Experience</SubHeading>
            <ul className="list-disc list-outside ml-6 space-y-3 text-dark-600">
              {position.qualifications.required.map((skill, index) => (
                <li key={index} className="leading-relaxed" data-cy={`required-skill-${index}`}>
                  {skill}
                </li>
              ))}
            </ul>
          </div>
        )}
        
        {position.qualifications.preferred.length > 0 && (
          <div data-cy="preferred-qualifications">
            <SubHeading>Nice-to-Have Skills</SubHeading>
            <ul className="list-disc list-outside ml-6 space-y-3 text-dark-600">
              {position.qualifications.preferred.map((skill, index) => (
                <li key={index} className="leading-relaxed" data-cy={`preferred-skill-${index}`}>
                  {skill}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    )
  },
  {
    id: 'why-join-us',
    title: 'Why Join Us?',
    content: (
      <ul className="list-disc list-outside ml-6 space-y-4 text-dark-600">
        {position.whyJoinUs.map((reason, index) => (
          <li key={index} className="leading-relaxed" data-cy={`why-join-us-reason-${index}`}>
            {reason.split(':').map((part, partIndex) => 
              partIndex === 0 ? (
                <span key={partIndex} className="text-dark-800" data-cy={`why-join-us-reason-title-${index}`}>
                  {part}:
                </span>
              ) : (
                <span key={partIndex} data-cy={`why-join-us-reason-description-${index}`}>
                  {part}
                </span>
              )
            )}
          </li>
        ))}
      </ul>
    )
  },
  {
    id: 'benefits',
    title: 'Benefits',
    content: (
      <ul className="list-disc list-outside ml-6 space-y-3 text-dark-600">
        {position.benefits.map((benefit, index) => (
          <li key={index} className="leading-relaxed" data-cy={`benefit-${index}`}>
            {benefit}
          </li>
        ))}
      </ul>
    )
  }
];