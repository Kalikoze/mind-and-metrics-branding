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
  text: "What areas would you like to improve in your business?",
  multiSelect: true,
  options: [
    {
      label: 'Visual Brand Identity',
      value: 'branding',
      description: 'Stand out with a professional, cohesive look'
    },
    {
      label: 'Online Presence',
      value: 'website',
      description: 'Reach more customers with an effective website'
    },
    {
      label: 'Marketing & Visibility',
      value: 'marketing',
      description: 'Get found by your ideal customers'
    },
    {
      label: 'Business Growth',
      value: 'consulting',
      description: 'Expert guidance to reach your goals'
    }
  ]
};

export const commonQuestions: Question[] = [
  {
    id: 'business_context',
    text: "Tell us about your business",
    multiSelect: false,
    options: [
      {
        label: 'Just Getting Started',
        value: 'startup',
        description: 'Planning or recently launched your business'
      },
      {
        label: 'Growing Business',
        value: 'growing',
        description: 'Established and looking to expand'
      },
      {
        label: 'Established Organization',
        value: 'established',
        description: 'Multiple years in operation with complex needs'
      }
    ]
  },
  {
    id: 'investment_comfort',
    text: "What investment level are you comfortable with for this project?",
    multiSelect: false,
    options: [
      {
        label: 'Basic Investment',
        value: 'basic',
        description: 'Essential services within $2,000 - $5,000'
      },
      {
        label: 'Strategic Investment',
        value: 'strategic',
        description: 'Comprehensive solutions within $5,000 - $10,000'
      },
      {
        label: 'Growth Investment',
        value: 'growth',
        description: 'Full-scale implementation $10,000+'
      },
      {
        label: 'Not Sure Yet',
        value: 'unsure',
        description: 'Would like to discuss options based on needs'
      }
    ]
  }
];

export const branchQuestions: Record<string, Question[]> = {
  branding: [
    {
      id: 'brand_needs',
      text: "What type of branding services do you need?",
      multiSelect: true,
      options: [
        {
          label: 'Logo Design',
          value: 'logo',
          description: 'Professional logo design with multiple concepts and revisions'
        },
        {
          label: 'Complete Brand Identity',
          value: 'identity',
          description: 'Logo, color palette, typography, and brand guidelines'
        },
        {
          label: 'Brand Support Materials',
          value: 'materials',
          description: 'Business cards, email signatures, promotional items'
        }
      ]
    },
    {
      id: 'brand_stage',
      text: "Where are you in your branding journey?",
      multiSelect: false,
      options: [
        {
          label: 'Starting Fresh',
          value: 'new',
          description: 'Creating a new brand from scratch'
        },
        {
          label: 'Brand Refresh',
          value: 'refresh',
          description: 'Updating existing brand elements'
        },
        {
          label: 'Brand Extension',
          value: 'extension',
          description: 'Adding new materials to existing brand'
        }
      ]
    },
    {
      id: 'brand_support',
      text: "Would you like ongoing brand support?",
      multiSelect: false,
      options: [
        {
          label: 'Project-Based Support',
          value: 'project',
          description: 'One-time design projects as needed'
        },
        {
          label: 'Monthly Retainer',
          value: 'retainer',
          description: '5+ hours monthly for ongoing brand management'
        }
      ]
    }
  ],
  website: [
    {
      id: 'website_scope',
      text: "What best describes your website needs?",
      multiSelect: false,
      options: [
        {
          label: 'Basic Business Website',
          value: 'starter',
          description: '3-5 pages with essential features and SEO setup'
        },
        {
          label: 'Professional Business Website',
          value: 'standard',
          description: '6-10 pages with CMS and comprehensive SEO'
        },
        {
          label: 'Advanced Business Platform',
          value: 'advanced',
          description: '10+ pages with custom features and animations'
        }
      ]
    },
    {
      id: 'website_features',
      text: "Would you like to add any specific functionality?",
      multiSelect: true,
      options: [
        {
          label: 'E-commerce Store',
          value: 'ecommerce',
          description: 'Sell products or services online'
        },
        {
          label: 'Booking System',
          value: 'booking',
          description: 'Allow customers to schedule appointments'
        },
        {
          label: 'Google Business Integration',
          value: 'google',
          description: 'Enhance your local business presence'
        }
      ]
    }
  ],
  marketing: [
    {
      id: 'marketing_needs',
      text: "Which marketing services interest you?",
      multiSelect: true,
      options: [
        {
          label: 'Social Media Management',
          value: 'social',
          description: 'Content creation and platform management'
        },
        {
          label: 'Email Marketing',
          value: 'email',
          description: 'Newsletter and campaign management'
        },
        {
          label: 'Digital Advertising',
          value: 'ads',
          description: 'Google Ads and social media campaigns'
        },
        {
          label: 'Content Creation',
          value: 'content',
          description: 'Blog posts, videos, and social media content'
        }
      ]
    },
    {
      id: 'campaign_type',
      text: "What type of campaign management do you need?",
      multiSelect: false,
      options: [
        {
          label: 'Starter Campaign',
          value: 'starter',
          description: 'Multi-channel strategy with basic tracking'
        },
        {
          label: 'Advanced Campaign',
          value: 'advanced',
          description: 'Comprehensive strategy with detailed analytics'
        },
        {
          label: 'Custom Solution',
          value: 'custom',
          description: 'Tailored to your specific needs and goals'
        }
      ]
    },
    {
      id: 'marketing_timeline',
      text: "When would you like to begin your marketing efforts?",
      multiSelect: false,
      options: [
        {
          label: 'Immediate Start',
          value: 'immediate',
          description: 'Ready to begin within the next month'
        },
        {
          label: 'Planned Launch',
          value: 'planned',
          description: 'Specific future date in mind'
        },
        {
          label: 'After Other Services',
          value: 'after',
          description: 'Following website/branding completion'
        }
      ]
    }
  ],
  consulting: [
    {
      id: 'consulting_type',
      text: "What type of consulting support do you need?",
      multiSelect: true,
      options: [
        {
          label: 'Strategy Development',
          value: 'strategy',
          description: 'Comprehensive business growth planning'
        },
        {
          label: 'Market Research',
          value: 'research',
          description: 'Industry and competitor analysis'
        },
        {
          label: 'Campaign Planning',
          value: 'campaign',
          description: 'Marketing and advertising strategy'
        }
      ]
    },
    {
      id: 'consulting_frequency',
      text: "How would you like to structure the consulting relationship?",
      multiSelect: false,
      options: [
        {
          label: 'One-time Strategy Session',
          value: 'onetime',
          description: 'Intensive planning and recommendation session'
        },
        {
          label: 'Monthly Retainer',
          value: 'monthly',
          description: 'Ongoing support and strategy optimization'
        },
        {
          label: 'Project-Based',
          value: 'project',
          description: 'Support for specific initiatives or campaigns'
        }
      ]
    }
  ]
}; 