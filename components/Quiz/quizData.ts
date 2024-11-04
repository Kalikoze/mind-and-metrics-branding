export interface Option {
  label: string;
  value: any;
  description?: string;
}

export interface Question {
  id: string;
  text: string;
  options: Option[];
  multiSelect?: boolean;
}

export const primaryQuestion: Question = {
  id: 'primary_need',
  text: "What would you like help with? (Select all that apply)",
  multiSelect: true,
  options: [
    {
      label: 'Brand & Website Modernization',
      value: 'website',
      description: 'Update how your business looks online and offline'
    },
    {
      label: 'Digital Marketing & Social Media',
      value: 'marketing',
      description: 'Get more visibility and engagement online'
    },
    {
      label: 'Strategic Consulting',
      value: 'consulting',
      description: 'Get expert guidance on growing your business'
    }
  ]
};

export const branchQuestions: Record<string, Question[]> = {
  website: [
    {
      id: 'website_needs',
      text: "What would you like to improve about your website? (Select all that apply)",
      multiSelect: true,
      options: [
        {
          label: 'Modern Design & User Experience',
          value: 'modern_design',
          description: 'Update the look and feel to be more contemporary and user-friendly'
        },
        {
          label: 'Search Engine Optimization (SEO)',
          value: 'seo',
          description: 'Improve your visibility in search results and attract more qualified leads'
        },
        {
          label: 'Website Performance',
          value: 'performance',
          description: 'Make your website faster and more responsive across all devices'
        }
      ]
    },
    {
      id: 'website_features',
      text: "Would you like to add any specific functionality? (Select all that apply)",
      multiSelect: true,
      options: [
        {
          label: 'E-commerce Integration',
          value: 'ecommerce',
          description: 'Sell products or services directly through your website'
        },
        {
          label: 'Booking System',
          value: 'booking',
          description: 'Allow customers to schedule appointments or consultations'
        },
        {
          label: 'Content Management System (CMS)',
          value: 'cms',
          description: 'Easily update your website content without technical knowledge'
        },
        {
          label: 'Custom Integration',
          value: 'custom',
          description: 'Connect with other business tools or create custom features'
        }
      ]
    },
    {
      id: 'website_accessibility',
      text: "How important is website accessibility to your business?",
      multiSelect: false,
      options: [
        {
          label: 'Essential - Full Compliance',
          value: 'full_accessibility',
          description: 'Implement complete ADA compliance and WCAG guidelines'
        },
        {
          label: 'Standard Features',
          value: 'standard_accessibility',
          description: 'Include basic accessibility features and best practices'
        },
        {
          label: 'Not Sure',
          value: 'unsure_accessibility',
          description: 'Would like to learn more about accessibility options'
        }
      ]
    }
  ],
  marketing: [
    {
      id: 'marketing_focus',
      text: "Which marketing activities interest you?",
      options: [
        {
          label: 'Email Marketing',
          value: 'email',
          description: 'Regular emails to engage your audience'
        },
        {
          label: 'Social Media Management',
          value: 'social',
          description: 'Professional social media presence'
        },
        {
          label: 'Digital Advertising',
          value: 'ads',
          description: 'Google Ads and targeted campaigns'
        }
      ]
    },
    {
      id: 'email_volume',
      text: "How many marketing emails would you like to send per month?",
      options: [
        {
          label: 'Basic (2 emails/month)',
          value: 'starter_email',
          description: 'Perfect for newsletters and updates'
        },
        {
          label: 'Advanced (4 emails/month)',
          value: 'advanced_email',
          description: 'Includes A/B testing and audience segmentation'
        }
      ]
    }
  ],
  consulting: [
    {
      id: 'consulting_needs',
      text: "What type of guidance would be most helpful?",
      options: [
        {
          label: 'Growth Strategy',
          value: 'strategy',
          description: 'Data-driven recommendations for sustainable growth'
        },
        {
          label: 'Marketing Research',
          value: 'research',
          description: 'Understanding your market and competition'
        },
        {
          label: 'Ongoing Support',
          value: 'retainer',
          description: 'Regular strategy sessions and support'
        }
      ]
    },
    {
      id: 'timeline',
      text: "When would you like to get started?",
      options: [
        {
          label: 'As Soon as Possible',
          value: 'immediate',
          description: 'Ready to begin within the next month'
        },
        {
          label: 'In the Next Few Months',
          value: 'soon',
          description: 'Planning ahead for future implementation'
        },
        {
          label: 'Just Exploring Options',
          value: 'exploring',
          description: 'Gathering information for future consideration'
        }
      ]
    }
  ]
}; 