export interface Cost {
  initial: number;
  monthly?: number;
}

export interface Option {
  label: string;
  value: any;
  description?: string;
  cost?: Cost;
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
        description: 'Essential services within $2,000 - $5,000 for small businesses or specific focused needs',
        cost: {
          initial: 2000,
          monthly: 0
        }
      },
      {
        label: 'Strategic Investment',
        value: 'strategic',
        description: 'Comprehensive solutions within $5,000 - $10,000 for growing businesses needing multiple services',
        cost: {
          initial: 5000,
          monthly: 0
        }
      },
      {
        label: 'Growth Investment',
        value: 'growth',
        description: 'Full-scale implementation $10,000+ for established businesses ready for significant expansion',
        cost: {
          initial: 10000,
          monthly: 0
        }
      },
      {
        label: 'Not Sure Yet',
        value: 'unsure',
        description: 'Would like to discuss options based on needs and receive a custom quote',
        cost: {
          initial: 0,
          monthly: 0
        }
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
          cost: {
            initial: 1200,
            monthly: 0
          }
        },
        {
          label: 'Standard Identity Package',
          value: 'standard_logo',
          description: '3 initial concepts, 3 revisions, full vector file',
          cost: {
            initial: 1500,
            monthly: 0
          }
        },
        {
          label: 'Premium Brand Package',
          value: 'premium_logo',
          description: 'Logo, brand color palette, typography, basic brand style guide',
          cost: {
            initial: 2500,
            monthly: 0
          }
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
          cost: {
            initial: 300,
            monthly: 0
          }
        },
        {
          label: 'Presentation Folders',
          value: 'folders',
          description: 'Custom folder design for documents',
          cost: {
            initial: 300,
            monthly: 0
          }
        },
        {
          label: 'Email Signature',
          value: 'email_signature',
          description: 'Professional email signature template',
          cost: {
            initial: 300,
            monthly: 0
          }
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
          cost: {
            initial: 350,
            monthly: 0
          }
        },
        {
          label: 'Brochure & Flyer Design',
          value: 'brochure',
          description: 'Design with revisions, print/digital ready',
          cost: {
            initial: 400,
            monthly: 0
          }
        },
        {
          label: 'Promotional Item Design',
          value: 'promo',
          description: 'Custom designs for branded items with vendor coordination',
          cost: {
            initial: 350,
            monthly: 0
          }
        },
        {
          label: 'Brand Support Retainer',
          value: 'retainer',
          description: '5+ hours monthly for ongoing brand support',
          cost: {
            initial: 0,
            monthly: 500
          }
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
          description: '3-5 pages with essential features and SEO setup',
          cost: {
            initial: 3300,
            monthly: 900
          }
        },
        {
          label: 'Professional Business Website',
          value: 'standard',
          description: '6-10 pages with CMS and comprehensive SEO',
          cost: {
            initial: 5250,
            monthly: 1200
          }
        },
        {
          label: 'Advanced Business Platform',
          value: 'advanced',
          description: '10+ pages with custom features and animations',
          cost: {
            initial: 7550,
            monthly: 1200
          }
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
          cost: {
            initial: 2000,
            monthly: 0
          }
        },
        {
          label: 'Booking System',
          value: 'booking',
          description: 'Allow customers to schedule appointments',
          cost: {
            initial: 2000,
            monthly: 0
          }
        },
        {
          label: 'Google Business Integration',
          value: 'google',
          description: 'Enhance your local business presence',
          cost: {
            initial: 200,
            monthly: 200
          }
        }
      ]
    }
  ],
  marketing: [
    {
      id: 'social_media',
      text: "What level of social media management do you need?",
      multiSelect: false,
      options: [
        {
          label: 'Basic Social Media Package',
          value: 'basic_social',
          description: 'Social media setup and basic content management',
          cost: {
            initial: 500,
            monthly: 800
          }
        },
        {
          label: 'Standard Social Media Package',
          value: 'standard_social',
          description: '5 posts per week per platform with monthly insight reports',
          cost: {
            initial: 500,
            monthly: 1000
          }
        },
        {
          label: 'Advanced Social Media Package',
          value: 'advanced_social',
          description: '5 posts per week all platforms with content strategy session',
          cost: {
            initial: 500,
            monthly: 1200
          }
        }
      ]
    },
    {
      id: 'youtube_management',
      text: "Would you like to add YouTube channel management to your marketing strategy?",
      multiSelect: false,
      skipable: true,
      options: [
        {
          label: 'YouTube Management',
          value: 'youtube',
          description: 'Professional video optimization, SEO-friendly titles and descriptions, thumbnail creation, and upload management ($50 per video upload). Includes performance analytics and engagement monitoring',
          cost: {
            initial: 500,
            monthly: 0
          }
        }
      ]
    },
    {
      id: 'marketing_needs',
      text: "Which marketing services interest you?",
      multiSelect: false,
      options: [
        {
          label: 'Starter Email Marketing',
          value: 'starter_email',
          description: '2 emails per month, performance tracking',
          cost: {
            initial: 0,
            monthly: 250
          }
        },
        {
          label: 'Advanced Email Marketing',
          value: 'advanced_email',
          description: '4 emails per month, A/B testing, segmentation',
          cost: {
            initial: 0,
            monthly: 400
          }
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
          cost: {
            initial: 2000,
            monthly: 1500
          }
        },
        {
          label: 'Advanced Campaign Management',
          value: 'advanced',
          description: 'Comprehensive strategy with detailed analytics',
          cost: {
            initial: 2500,
            monthly: 3000
          }
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
          cost: {
            initial: 0,
            monthly: 0
          }
        },
        {
          label: 'Planned Launch',
          value: 'planned',
          description: 'Specific future date in mind',
          cost: {
            initial: 0,
            monthly: 0
          }
        },
        {
          label: 'After Other Services',
          value: 'after',
          description: 'Following website/branding completion',
          cost: {
            initial: 0,
            monthly: 0
          }
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
          description: 'Flexible strategy sessions and marketing insights for specific challenges ($150/hour)',
          cost: {
            initial: 150,
            monthly: 0
          }
        },
        {
          label: 'Monthly Retainer',
          value: 'monthly',
          description: 'Dedicated support including weekly strategy calls, campaign optimization, and creative direction',
          cost: {
            initial: 0,
            monthly: 1500
          }
        },
        {
          label: 'Market Research Package',
          value: 'research',
          description: 'Market analysis, competitor research, and strategic recommendations with implementation plan',
          cost: {
            initial: 3000,
            monthly: 0
          }
        }
      ]
    }
  ]
}; 