export interface Option {
  label: string;
  value: any;
  description?: string;
  hoursMin?: number;
  hoursMax?: number;
}

export interface Question {
  id: string;
  text: string;
  options: Option[];
  multiSelect?: boolean;
  skipable?: boolean;
}

export const primaryQuestion: Question = {
  id: 'primary_need',
  text: "What areas would you like to improve in your business?",
  multiSelect: true,
  options: [
    {
      label: 'Visual Brand Identity',
      value: 'branding',
      description: 'Stand out with a professional look including logos, color schemes, and brand guidelines',
    },
    {
      label: 'Website',
      value: 'website',
      description: 'Reach more customers with an effective website optimized for search engines and user experience',
    },
    {
      label: 'Marketing',
      value: 'marketing',
      description: 'Get found by ideal customers through targeted social media, email, and digital marketing campaigns',
    },
    {
      label: 'Growth Strategy',
      value: 'consulting',
      description: 'Expert guidance to your goals through strategic planning, market research, and ongoing support',
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
        description: 'Planning or recently launched your business',
      },
      {
        label: 'Growing Business',
        value: 'growing',
        description: 'Established and looking to expand',
      },
      {
        label: 'Established Organization',
        value: 'established',
        description: 'Multiple years in operation with complex needs',
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
        description: 'Essential services within $5,000 - $10,000 for small businesses or specific focused needs',
        hoursMin: 40,
        hoursMax: 90
      },
      {
        label: 'Strategic Investment',
        value: 'strategic',
        description: 'Comprehensive solutions within $10,000 - $20,000 for growing businesses needing multiple services',
        hoursMin: 90,
        hoursMax: 180
      },
      {
        label: 'Growth Investment',
        value: 'growth',
        description: 'Full-scale implementation $20,000+ for established businesses ready for significant expansion',
        hoursMin: 180,
        hoursMax: 400
      },
      {
        label: 'Not Sure Yet',
        value: 'unsure',
        description: 'Would like to discuss options based on needs and receive a custom quote',
        hoursMin: 0,
        hoursMax: 0
      }
    ]
  }
];

export const branchQuestions: Record<string, Question[]> = {
  branding: [
    {
      id: 'visual_identity',
      text: "What level of visual identity design do you need?",
      multiSelect: false,
      options: [
        {
          label: 'Basic Logo Package',
          value: 'basic_logo',
          description: '2 initial concepts, 2 revisions, high-quality PNG file',
          hoursMin: 15,
          hoursMax: 20
        },
        {
          label: 'Standard Identity Package',
          value: 'standard_logo',
          description: '3 initial concepts, 3 revisions, full vector file',
          hoursMin: 20,
          hoursMax: 25
        },
        {
          label: 'Premium Brand Package',
          value: 'premium_logo',
          description: 'Logo, brand color palette, typography, basic brand style guide',
          hoursMin: 35,
          hoursMax: 45
        }
      ]
    },
    {
      id: 'brand_materials',
      text: "Which brand materials would you like to include?",
      multiSelect: true,
      skipable: true,
      options: [
        {
          label: 'Business Cards',
          value: 'cards',
          description: 'Professional business card design',
          hoursMin: 1.5,
          hoursMax: 2
        },
        {
          label: 'Presentation Folders',
          value: 'folders',
          description: 'Custom folder design for documents',
          hoursMin: 2,
          hoursMax: 2.5
        },
        {
          label: 'Email Signature',
          value: 'email_signature',
          description: 'Professional email signature template',
          hoursMin: 1,
          hoursMax: 1.5
        }
      ]
    },
    {
      id: 'brand_addons',
      text: "Would you like any additional promotional materials?",
      multiSelect: true,
      skipable: true,
      options: [
        {
          label: 'T-shirt Design & Vendor Coordination',
          value: 'tshirt',
          description: 'Custom t-shirt design with vendor interfacing',
          hoursMin: 3,
          hoursMax: 3
        },
        {
          label: 'Brochure & Flyer Design',
          value: 'brochure',
          description: 'Design with revisions, print/digital ready',
          hoursMin: 4,
          hoursMax: 4
        },
        {
          label: 'Promotional Item Design',
          value: 'promo',
          description: 'Custom designs for branded items with vendor coordination',
          hoursMin: 3,
          hoursMax: 3
        },
        {
          label: 'Brand Support Retainer',
          value: 'retainer',
          description: '5+ hours monthly for ongoing brand support',
          hoursMin: 5,
          hoursMax: 5
        }
      ]
    }
  ],
  website: [
    {
      id: 'website_type',
      text: "What type of website do you need?",
      multiSelect: false,
      options: [
        {
          label: 'Basic Business Website',
          value: 'starter',
          description: '3-5 pages with essential features and SEO setup (2-3 months)',
          hoursMin: 40,
          hoursMax: 60
        },
        {
          label: 'Professional Business Website',
          value: 'standard',
          description: '6-10 pages with CMS and comprehensive SEO (3-4 months)',
          hoursMin: 80,
          hoursMax: 120
        },
        {
          label: 'Advanced Business Website',
          value: 'advanced',
          description: '10+ pages with advanced CMS, custom functionality, and comprehensive SEO (4-6 months)',
          hoursMin: 160,
          hoursMax: 300
        }
      ]
    },
    {
      id: 'website_features',
      text: "Would you like to add any specific functionality?",
      multiSelect: true,
      skipable: true,
      options: [
        {
          label: 'E-commerce Store',
          value: 'ecommerce',
          description: 'Sell products or services online',
          hoursMin: 60,
          hoursMax: 100
        },
        {
          label: 'Booking System',
          value: 'booking',
          description: 'Allow customers to schedule appointments',
          hoursMin: 15,
          hoursMax: 25
        },
        {
          label: 'Google Business Integration',
          value: 'google',
          description: 'Enhance your local business presence',
          hoursMin: 5,
          hoursMax: 10
        }
      ]
    }
  ],
  marketing: [
    {
      id: 'social_media',
      text: "What level of social media management do you need? (Monthly)",
      multiSelect: false,
      options: [
        {
          label: 'Basic Social Media Package',
          value: 'basic_social',
          description: 'Social media setup with 3-5 posts per week and basic content management (1-2 platforms)',
          hoursMin: 6,
          hoursMax: 10
        },
        {
          label: 'Standard Social Media Package',
          value: 'standard_social',
          description: '5-7 posts per week per platform with monthly insight reports (2-3 platforms)',
          hoursMin: 15,
          hoursMax: 20
        },
        {
          label: 'Advanced Social Media Package',
          value: 'advanced_social',
          description: '7-14+ posts per week all platforms with content strategy session (3-5 platforms)',
          hoursMin: 30,
          hoursMax: 40
        }
      ]
    },
    {
      id: 'marketing_needs',
      text: "Which email marketing services interest you? (Monthly)",
      multiSelect: false,
      options: [
        {
          label: 'Starter Email Marketing',
          value: 'starter_email',
          description: '2 emails per month, performance tracking',
          hoursMin: 5,
          hoursMax: 8
        },
        {
          label: 'Advanced Email Marketing',
          value: 'advanced_email',
          description: '4 emails per month, A/B testing, segmentation',
          hoursMin: 8,
          hoursMax: 12
        }
      ]
    },
    {
      id: 'campaign_type',
      text: "What type of campaign management do you need?",
      multiSelect: false,
      options: [
        {
          label: 'Starter Campaign Management',
          value: 'starter',
          description: 'Multi-channel strategy with basic tracking',
          hoursMin: 30,
          hoursMax: 35
        },
        {
          label: 'Advanced Campaign Management',
          value: 'advanced',
          description: 'Comprehensive strategy with detailed analytics',
          hoursMin: 40,
          hoursMax: 45
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
          description: 'Ready to begin within the next month',
        },
        {
          label: 'Planned Launch',
          value: 'planned',
          description: 'Specific future date in mind',
        },
        {
          label: 'After Other Services',
          value: 'after',
          description: 'Following website/branding completion',
        }
      ]
    }
  ],
  consulting: [
    {
      id: 'consulting_type',
      text: "What type of consulting support would best help your business grow?",
      multiSelect: true,
      options: [
        {
          label: 'Hourly Consulting',
          value: 'hourly',
          description: 'Flexible strategy sessions and marketing insights for specific challenges',
          hoursMin: 10,
          hoursMax: 20
        },
        {
          label: 'Monthly Retainer',
          value: 'monthly',
          description: 'Dedicated support including weekly strategy calls, campaign optimization, and creative direction',
          hoursMin: 20,
          hoursMax: 40
        },
        {
          label: 'Market Research Package',
          value: 'research',
          description: 'Market analysis, competitor research, and strategic recommendations with implementation plan',
          hoursMin: 25,
          hoursMax: 40
        }
      ]
    }
  ]
}; 