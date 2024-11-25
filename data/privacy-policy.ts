import {
  HiShieldCheck,
  HiDocumentText,
  HiCog6Tooth,
  HiLockClosed,
  HiUserGroup,
} from 'react-icons/hi2';
import { IconType } from 'react-icons';

export type SectionId = 'information-collection' | 'information-use' | 'data-protection' | 'user-rights';

export interface PrivacySection {
  id: SectionId;
  title: string;
  introduction: string;
  content: {
    subtitle: string;
    points: string[];
  }[];
}

export const privacySections: PrivacySection[] = [
  {
    id: 'information-collection',
    title: 'Information We Collect',
    introduction: "To provide you with our services and maintain transparent communication, we collect specific information through various channels. We ensure that all data collection is purposeful and necessary for delivering our services effectively.",
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
    introduction: "We are committed to using your information responsibly and solely for purposes that benefit your experience with our services. Here's a detailed breakdown of how we utilize the information you provide:",
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
    introduction: "Your trust is paramount to us. We implement robust security measures and follow industry best practices to protect your information from unauthorized access, disclosure, alteration, and destruction.",
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
    introduction: "We believe in empowering our users with control over their personal information. You have several rights regarding your data, and we're committed to honoring these rights promptly and transparently.",
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

export const sectionIcons: Record<SectionId, IconType> = {
  'information-collection': HiDocumentText,
  'information-use': HiCog6Tooth,
  'data-protection': HiLockClosed,
  'user-rights': HiUserGroup
};