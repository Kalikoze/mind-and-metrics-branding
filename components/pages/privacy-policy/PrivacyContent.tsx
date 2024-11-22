import { 
  HiShieldCheck, 
  HiDocumentText, 
  HiCog6Tooth, 
  HiLockClosed, 
  HiUserGroup,
} from 'react-icons/hi2';
import { IconType } from 'react-icons';
import PrivacySection from '@/components/pages/privacy-policy/PrivacySection';
import QuestionsSection from '@/components/pages/privacy-policy/QuestionsSection';

type SectionId = 'information-collection' | 'information-use' | 'data-protection' | 'user-rights';

const sections = [
  {
    id: 'information-collection',
    title: 'Information We Collect',
    content: [
      {
        subtitle: 'Service Assessment Quiz',
        points: [
          'Business context and maturity level',
          'Investment preferences and budget range',
          'Service preferences and requirements',
          'Project timeline preferences',
          'Personal information (first and last name)',
          'Contact details (email address, phone number)',
          'Company information',
          'Communication preferences (preferred contact method, best time to contact)',
          'Additional comments and requirements',
          'Referral source information',
        ]
      },
      {
        subtitle: 'Contact Forms & Service Inquiries',
        points: [
          'Personal information (first and last name)',
          'Contact details (email address, phone number)',
          'Company information',
          'Message subject and content',
          'Project requirements and inquiries'
        ]
      },
      {
        subtitle: 'Job Applications',
        points: [
          'Personal identification (first and last name)',
          'Contact information (email and phone)',
          'Professional profiles (LinkedIn URL and portfolio URL)',
          'Employment information (current/recent employer)',
          'Professional experience (years of experience)',
          'Availability (earliest start date)',
          'Application documents (resume and cover letter)',
          'Referral information (source and referrer details)',
          'Employment preferences and history'
        ]
      }
    ]
  },
  {
    id: 'information-use',
    title: 'How We Use Your Information',
    content: [
      {
        subtitle: 'Business Operations',
        points: [
          'Service improvement and development',
          'Analytics and performance measurement',
          'Legal compliance and documentation',
          'Quality assurance and training'
        ]
      },
      {
        subtitle: 'Service Delivery',
        points: [
          'Providing requested services and support',
          'Processing and responding to inquiries',
          'Creating and managing client accounts',
          'Delivering project updates and communications'
        ]
      },
      {
        subtitle: 'Recruitment',
        points: [
          'Evaluating job applications',
          'Conducting recruitment processes',
          'Maintaining talent pools',
          'Communication regarding employment opportunities'
        ]
      }
    ]
  },
  {
    id: 'data-protection',
    title: 'Data Protection & Security',
    content: [
      {
        subtitle: 'Security Measures',
        points: [
          'Industry-standard encryption for all data transmissions',
          'Secure form validation and data processing',
          'Professional email service provider for secure communications',
          'Regular security testing and monitoring',
          'Continuous system updates and maintenance'
        ]
      },
      {
        subtitle: 'Email Communications Retention',
        points: [
          'Email communications retained only as needed for business purposes',
          'Regular review and cleanup of communication records',
          'Secure handling of all correspondence',
          'Compliance with legal requirements for business communications'
        ]
      }
    ]
  },
  {
    id: 'user-rights',
    title: 'Your Rights & Choices',
    content: [
      {
        subtitle: 'Access & Control',
        points: [
          'Right to access your personal data',
          'Right to correct or update information',
          'Right to request data deletion',
          'Right to withdraw consent'
        ]
      },
      {
        subtitle: 'Communication Preferences',
        points: [
          'Opt-out options for marketing communications',
          'Choice of contact methods',
          'Frequency of communications',
          'Project update preferences'
        ]
      }
    ]
  }
];

const sectionIcons: Record<SectionId, IconType> = {
  'information-collection': HiDocumentText,
  'information-use': HiCog6Tooth,
  'data-protection': HiLockClosed,
  'user-rights': HiUserGroup
};

const PrivacyContent = () => {
  return (
    <div className="bg-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="space-y-16">
          {sections.map((section) => {
            const Icon = sectionIcons[section.id as SectionId] || HiShieldCheck;
            return <PrivacySection key={section.id} section={section} Icon={Icon} />;
          })}
          <QuestionsSection />
        </div>
      </div>
    </div>
  );
};

export default PrivacyContent; 