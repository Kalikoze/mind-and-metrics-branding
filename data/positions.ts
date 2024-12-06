export interface Position {
  id: string;
  title: string;
  type: string;
  locationType: string;
  location: string;
  department: string;
  description: string;
  isExempt: boolean;
  overview: string;
  salary: number | null;
  responsibilities: {
    title: string;
    items: string[];
  }[];
  qualifications: {
    required: string[];
    preferred: string[];
  };
  benefits: string[];
  whyJoinUs: string[];
}

const sharedWhyJoinUs = [
  "Hands-on Learning: Exposure to a wide range of technologies and digital marketing strategies, ideal for early-career developers looking to build a full-stack foundation",
  "Career Growth: As the company grows, this role has the potential to evolve into a leadership position, offering opportunities to shape the technological direction",
  "Collaborative Team: Join an agile, creative team that encourages innovation, collaboration, and continuous learning"
];

const sharedBenefits = [
  "401(k) matching",
  "Dental insurance",
  "Disability insurance",
  "Health insurance",
  "Life insurance",
  "Paid holidays",
  "Referral program"
];

export const positions: Position[] = [
  {
    id: 'junior-software-engineer',
    title: 'Junior Software Engineer (Full-Stack)',
    type: 'Full-Time',
    locationType: 'In-Person',
    location: 'Blair, NE',
    department: 'Engineering',
    description: "Join our development team as we build innovative digital solutions. We're seeking a developer with backend fundamentals (Node.js/Express) and React basics who's eager to grow across the full stack. Experience with GraphQL or Python is a plus. You'll work directly with our lead engineer on e-commerce platforms and client portals, while learning valuable skills in SEO and analytics. Ideal for a motivated junior developer looking to rapidly expand their skillset through hands-on mentorship.",
    isExempt: true,
    overview: "We are seeking a Junior Software Engineer to join our development team and contribute to a range of projects, including frontend interface development, backend logic, and SEO optimization. This role requires versatility across both frontend and backend tasks, with a focus on backend expertise. You will work alongside the lead developer to build and maintain a variety of digital products, including an e-commerce platform, a client portal with data visualizations, and SEO-optimized websites. You will also assist the marketing team with keyword analysis and site performance optimization.",
    salary: null,
    responsibilities: [
      {
        title: "Full-Stack Development",
        items: [
          "Develop responsive, user-friendly frontends using React, Next.js, and Tailwind CSS, while also managing backend functionality and integrations using technologies such as Prisma and REST APIs."
        ]
      },
      {
        title: "Backend Focus",
        items: [
          "Contribute to backend development, data handling, and security practices. Opportunities to work with Python or GraphQL for specific projects, including AI initiatives."
        ]
      },
      {
        title: "SEO Support",
        items: [
          "Collaborate with the marketing team to analyze keywords, optimize on-page SEO (meta tags, alt text, etc.), and monitor site health using SEMRush, Google Analytics, and other SEO tools. Assist with site audits, competitor analysis, and performance reporting."
        ]
      },
      {
        title: "Technical Website Support",
        items: [
          "Conduct technical audits to resolve crawlability, indexing, and load speed issues. Support the web developer in fixing broken links, improving site structure, and implementing schema markup."
        ]
      },
      {
        title: "Campaign and Content Management",
        items: [
          "Support the marketing team in managing and analyzing ad campaigns. Assist in tracking Google Business profiles and SEO-optimized content, including blog posts and landing pages."
        ]
      },
      {
        title: "Innovation & Experimentation",
        items: [
          "Explore opportunities to integrate new technologies, including AI solutions, to improve site performance, automation, and digital marketing efforts."
        ]
      }
    ],
    qualifications: {
      required: [
        "Proficiency in JavaScript/TypeScript, with experience in React and ideally Next.js (or willingness to learn)",
        "Experience with CSS frameworks (e.g., Tailwind CSS, SCSS) and responsive design",
        "Understanding of backend development, data management, and security principles",
        "Familiarity with SEO tools (SEMRush, Google Analytics, Google Ads) and basic SEO practices",
        "Strong problem-solving skills and an ability to interpret data for actionable insights"
      ],
      preferred: [
        "Knowledge of Python, GraphQL, or other backend technologies",
        "Experience with backend security practices and cloud services",
        "Interest in AI technologies for data processing or content generation"
      ]
    },
    benefits: sharedBenefits,
    whyJoinUs: sharedWhyJoinUs
  },
  {
    id: 'social-media-manager',
    title: 'Social Media Manager',
    type: 'Full-Time',
    locationType: 'In-Person',
    location: 'Blair, NE',
    department: 'Marketing',
    description: "Lead social media strategy and content creation across multiple brand portfolios. You'll develop engaging campaigns, manage community interactions, and drive growth through both organic and paid social initiatives. The ideal candidate has 2-4 years of experience, strong creative skills, and expertise in social media analytics and management tools. You'll work closely with our marketing team to maintain brand consistency while optimizing performance across all platforms.",
    isExempt: true,
    overview: "The Social Media Manager will be responsible for developing and executing social media strategies across all major platforms for six distinct companies. This individual will create and manage content, engage with our online communities, monitor performance metrics, and collaborate with cross-functional teams to ensure that our social media presence aligns with business goals.",
    salary: 60000,
    responsibilities: [
      {
        title: "Social Media Strategy Development",
        items: [
          "Develop and implement comprehensive social media strategies tailored to each company's goals and target audience",
          "Create and maintain content calendars, ensuring consistent and strategic posting across all platforms",
          "Plan and execute social media campaigns focused on brand awareness, lead generation, and customer engagement"
        ]
      },
      {
        title: "Content Creation and Curation",
        items: [
          "Produce and curate high-quality content (graphics, videos, posts) that aligns with each brand's identity and resonates with the target audience",
          "Ensure consistent visual branding and messaging across all social media channels",
          "Collaborate with designers, writers, and other creatives to generate engaging content"
        ]
      },
      {
        title: "Community Management",
        items: [
          "Engage with followers, respond to comments and messages, and actively participate in online conversations",
          "Monitor brand mentions and handle customer service inquiries or potential crises promptly and professionally",
          "Develop strategies to foster and grow online communities, encouraging user interaction and brand loyalty"
        ]
      },
      {
        title: "Analytics and Reporting",
        items: [
          "Track and analyze social media performance metrics, including engagement rates, follower growth, reach, and conversions",
          "Generate detailed reports on social media activities, providing insights and recommendations for improvement",
          "Conduct A/B testing to optimize content and campaigns for better performance"
        ]
      },
      {
        title: "Paid Social Media Advertising",
        items: [
          "Plan, create, and manage paid social media campaigns, ensuring effective targeting and budget management",
          "Monitor and optimize ad performance to maximize return on investment (ROI)"
        ]
      },
      {
        title: "Collaboration and Coordination",
        items: [
          "Work closely with marketing, sales, and content teams to ensure social media efforts align with broader business objectives",
          "Communicate regularly with stakeholders, providing updates on social media activities and progress via Zoom or face to face"
        ]
      },
      {
        title: "Research and Trend Analysis",
        items: [
          "Stay updated on social media trends, tools, and best practices to keep our social media presence innovative and competitive",
          "Conduct competitor analysis to identify opportunities and adjust strategies as needed"
        ]
      },
      {
        title: "Platform and Tool Management",
        items: [
          "Utilize social media management tools for scheduling, monitoring, and analyzing activities across all platforms",
          "Ensure all social media accounts are up-to-date, secure, and effectively managed"
        ]
      },
      {
        title: "Brand Voice and Messaging",
        items: [
          "Maintain a consistent and authentic brand voice across all social media platforms",
          "Develop and implement crisis communication strategies to handle any potential social media issues"
        ]
      },
      {
        title: "Training and Development",
        items: [
          "Provide training and guidance to junior team members or other departments on social media best practices",
          "Continuously update skills and knowledge in social media trends, tools, and technologies"
        ]
      }
    ],
    qualifications: {
      required: [
        "1-3 years of experience in social media management, preferably but not critical, handling multiple brands",
        "Proficiency in content creation, including writing, graphic design, and video production",
        "Experience with social media management tools (e.g., Hootsuite, Buffer, Sprout Social)",
        "Knowledge of paid social media advertising and budget management",
        "Strong analytical skills, with experience in performance tracking and reporting",
        "Excellent written and verbal communication skills"
      ],
      preferred: [
        "Understanding of SEO Best Practices to enhance the search visibility of social media content",
        "Understanding of Paid Search and SEM (e.g., Google Ads) to complement social advertising strategies with search engine marketing efforts",
        "Community Management Skills for fostering engagement and moderating online discussions"
      ]
    },
    benefits: sharedBenefits,
    whyJoinUs: sharedWhyJoinUs
  }
]; 