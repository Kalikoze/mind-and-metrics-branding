import {
  RiLightbulbFlashLine,
  RiCodeBoxLine,
  RiMegaphoneLine,
  RiBarChartBoxLine,
} from 'react-icons/ri';
import { IconType } from 'react-icons';

export interface ServicePoint {
  title: string;
  subPoints: string[];
}

export interface ServiceOffering {
  title: string;
  description: string;
}

export interface ServiceDetail {
  id: string;
  icon: IconType;
  title: string;
  overview: string;
  keyPoints: ServicePoint[];
  offerings: ServiceOffering[];
}

export const serviceDetails: ServiceDetail[] = [
  {
    id: 'brand-identity-and-strategy',
    icon: RiLightbulbFlashLine,
    title: "Brand Identity & Strategy",
    overview: "Transform your brand into a strategic asset with our comprehensive branding package. We combine creative excellence with strategic thinking to build lasting brand equity that resonates with your target audience and drives measurable business growth.",
    keyPoints: [
      {
        title: "Logo and Visual Identity",
        subPoints: [
          "Professional Logo Design",
          "Color Palette Development",
          "Typography Selection",
          "Brand Asset Guidelines"
        ]
      },
      {
        title: "Brand Strategy",
        subPoints: [
          "Brand Messaging",
          "Market Positioning",
          "Value Proposition",
          "Target Audience Definition"
        ]
      },
      {
        title: "Brand Collateral",
        subPoints: [
          "Business Cards & Letterheads",
          "Presentation Templates",
          "Marketing Materials",
          "Digital Assets"
        ]
      }
    ],
    offerings: [
      {
        title: "Logo and Visual Identity",
        description: "Professional logo design, color palette development, typography selection, and comprehensive brand assets including imagery style, photography guidelines, and custom graphics."
      },
      {
        title: "Brand Strategy",
        description: "Strategic brand messaging, positioning, mission, and values development. We create a long-term plan that defines your brand purpose, core values, target audience, market segmentation, and KPIs."
      },
      {
        title: "Brand Collateral",
        description: "Complete suite of branded materials including business cards, letterheads, presentation templates, promotional items, and email templates - all designed to reinforce your brand identity and message."
      }
    ]
  },
  {
    id: 'website-development-seo',
    icon: RiCodeBoxLine,
    title: "Website Development & SEO",
    overview: "Your website is the cornerstone of your digital presence. We create powerful, optimized websites that not only look professional but drive real business results through strategic design, technical excellence, and comprehensive SEO strategies.",
    keyPoints: [
      {
        title: "Website Design & Development",
        subPoints: [
          "Custom Website Design",
          "Responsive Development",
          "CMS Integration",
          "Performance Optimization"
        ]
      },
      {
        title: "E-Commerce & Integrations",
        subPoints: [
          "Online Store Setup",
          "Payment Processing",
          "Inventory Management",
          "Third-party Integrations"
        ]
      },
      {
        title: "SEO & Optimization",
        subPoints: [
          "Technical SEO",
          "Performance Tuning",
          "Security Implementation",
          "Analytics Setup"
        ]
      }
    ],
    offerings: [
      {
        title: "Website Design & Development",
        description: "Creating visually appealing, functional, and responsive websites that provide a seamless user experience and support business objectives. Includes custom website design, responsive builds, CMS integration, mobile-first design, functionality features, performance optimization, security and compliance, testing, and maintenance."
      },
      {
        title: "E-Commerce & Integrations",
        description: "Online store setup, booking systems, and third-party integrations. Includes e-commerce platform setup, product and inventory management, payment gateway integration, shipping and fulfillment, CRM, analytics and reporting, marketing integrations, third-party application integrations, and customer support systems."
      },
      {
        title: "SEO & Technical Optimization",
        description: "Comprehensive optimization including keyword research, on-page SEO, and technical audits. We address crawl errors, site structure, indexing issues, site performance, and security. Performance improvements focus on page load speed, server response time, core web vitals, browser caching, server-side improvements, and mobile optimization. All implementations follow technical SEO best practices."
      }
    ]
  },
  {
    id: 'digital-marketing-content-management',
    icon: RiMegaphoneLine,
    title: "Digital Marketing & Content Management",
    overview: "Your digital marketing strategy is the key to reaching and engaging with your target audience. We create content that not only resonates with your audience but also drives real business results through strategic planning, creative execution, and data-driven optimization.",
    keyPoints: [
      {
        title: "Social Media Management",
        subPoints: [
          "Content Creation",
          "Platform Strategy",
          "Community Engagement",
          "Analytics & Reporting"
        ]
      },
      {
        title: "Content Marketing",
        subPoints: [
          "Blog & Article Writing",
          "Case Studies",
          "Email Newsletters",
          "Content Distribution"
        ]
      },
      {
        title: "Ad Campaigns",
        subPoints: [
          "Google Ads Management",
          "Social Media Advertising",
          "Retargeting Campaigns",
          "Performance Analytics"
        ]
      }
    ],
    offerings: [
      {
        title: "Social Media Management",
        description: "Comprehensive social media strategy including profile setup, content creation, scheduling, and analytics. We focus on planning, creating, publishing, and monitoring content across platforms to build brand awareness and engage audiences. Our strategic approach maximizes your brand's social presence through creative content development and data analysis."
      },
      {
        title: "Content Marketing",
        description: "Strategic content creation including blog posts, case studies, newsletters, and email marketing. We focus on creating, distributing, and promoting valuable, relevant content to attract and engage your target audience. This includes content strategy development, SEO optimization, audience engagement, community building, lead generation, and content repurposing."
      },
      {
        title: "Ad Campaigns",
        description: "Comprehensive advertising solutions across Google Ads, social media platforms, and retargeting campaigns. We combine creativity with data to reach the right audience at the right time with the right message. Campaigns are structured and tailored based on specific goals, target demographics, and chosen platforms to maximize ROI."
      }
    ]
  },
  {
    id: 'consulting-market-research',
    icon: RiBarChartBoxLine,
    title: "Consulting & Marketing Research",
    overview: "Transform your business decisions with our comprehensive consulting and research services. We combine deep industry expertise with data-driven insights to help you identify opportunities, overcome challenges, and create actionable strategies for sustainable growth.",
    keyPoints: [
      {
        title: "Brand & Marketing Consultation",
        subPoints: [
          "Strategy Sessions",
          "Brand Audits",
          "Market Positioning",
          "Growth Planning"
        ]
      },
      {
        title: "Market Research",
        subPoints: [
          "Competitive Analysis",
          "Audience Insights",
          "Trend Forecasting",
          "Market Opportunity Analysis"
        ]
      },
      {
        title: "Data-Driven Recommendations",
        subPoints: [
          "Performance Reports",
          "Campaign Assessment",
          "Growth Strategy",
          "ROI Analysis"
        ]
      }
    ],
    offerings: [
      {
        title: "Brand & Marketing Consultation",
        description: "Strategy sessions, brand audits, and ongoing guidance focused on brand identity and market positioning. We ensure your business effectively communicates its value, differentiates itself from competitors, and meets evolving needs of target audience while assisting in informed decision making."
      },
      {
        title: "Market Research",
        description: "Comprehensive competitive analysis, audience insights, and trend forecasting. We gather, analyze, and interpret data about your market, target audience, and competitors to establish a clear roadmap for brand growth and sustainability. Our approach includes primary research, secondary research, exploratory and descriptive research, and experimental research to gain deep insights into customer needs, preferences, and behaviors."
      },
      {
        title: "Data-Driven Recommendations",
        description: "Actionable reports, campaign assessments, and growth planning based on thorough analysis of market research, consumer behavior metrics, sales data, and campaign performance. We help you prioritize strategies most likely to yield positive outcomes, improving everything from marketing effectiveness to product development and customer retention, while forming a strategic roadmap that aligns daily actions with long-term business goals."
      }
    ]
  }
];