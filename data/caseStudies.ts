import { StaticImageData } from 'next/image';
import { FC, SVGProps } from 'react';
import PSCLogo from '@/public/assets/logos/psc-logo.svg';
import HydrovacLogo from '@/public/assets/logos/hydrovac-logo.svg';
import NatHydroLogo from '@/public/assets/logos/nat-hydro-logo.svg';
import PrecisionSurveyLogo from '@/public/assets/logos/precision-survey-logo.svg';
import PSCDesktop from '@/public/assets/about/psc-desktop.png';
import PSCMobile from '@/public/assets/about/psc-mobile.png';
import HydrovacDesktop from '@/public/assets/about/hydrovac-desktop.png';
import HydrovacMobile from '@/public/assets/about/hydrovac-mobile.png';
import NatHydroDesktop from '@/public/assets/about/nathydro-desktop.png';
import NatHydroMobile from '@/public/assets/about/nathydro-mobile.png';
import PrecisionDesktop from '@/public/assets/about/precision-desktop.png';
import PrecisionMobile from '@/public/assets/about/precision-mobile.png';

export interface CaseStudy {
  id: string;
  client: string;
  logo: FC<SVGProps<SVGSVGElement>>;
  industry: string;
  challenge: string;
  solution: string;
  results: Array<{
    metric: string;
    value: string;
  }>;
  websiteUrl: string;
  desktopPreview: StaticImageData;
  mobilePreview: StaticImageData;
  tags: string[];
}

export const caseStudies: CaseStudy[] = [
  {
    id: 'psc-construction',
    client: 'PSC Construction',
    logo: PSCLogo,
    industry: 'Site Preparation & Underground Utilities',
    challenge: 'PSC Construction needed a consistent brand profile across all platforms and greater online brand awareness. Their outdated website required a modern redesign with an improved user interface (UI) to better showcase their identity as a company. They also wanted to highlight their extensive experience in the heavy industrial construction industry.',
    solution: 'We developed a fully customized website featuring a modern, professional, and approachable tone. The design emphasized their industry expertise and strong commitment to safety. Additionally, we implemented location-based SEO strategies to improve visibility in key target areas.',
    results: [
      { metric: 'Website Traffic', value: '+45%' },
      { metric: 'Session Duration', value: '+20%' },
      { metric: 'Keyword Rankings', value: '+15%' }
    ],
    websiteUrl: 'https://www.psccompanies.com',
    desktopPreview: PSCDesktop,
    mobilePreview: PSCMobile,
    tags: ['Website Redesign', 'SEO', 'Brand Identity', 'UI/UX Design']
  },
  {
    id: 'precision-survey',
    client: 'Precision Surveying & Consulting',
    logo: PrecisionSurveyLogo,
    industry: 'Construction Surveying & As-Built Mapping',
    challenge: 'Precision Surveying & Consulting lacked a modernized digital presence and an efficient way to streamline communication with both potential clients and employees. They also needed a cohesive brand voice that better aligned with their industry expertise.',
    solution: 'Our team executed a comprehensive brand refresh, updating their visual identity and crafting messaging that highlights their professionalism and innovation. We overhauled their website to showcase their expertise in the heavy industrial construction and private sector, positioning them as a trusted leader in the surveying industry.',
    results: [
      { metric: 'Website Duration', value: '+40%' },
      { metric: 'Facebook Lead Gen', value: '+30%' },
      { metric: 'Website Performance', value: '100%' }
    ],
    websiteUrl: 'https://www.precisionsurveyingandconsulting.com',
    desktopPreview: PrecisionDesktop,
    mobilePreview: PrecisionMobile,
    tags: ['Brand Refresh', 'Web Development', 'Lead Generation', 'Content Strategy']
  },
  {
    id: 'hydrovac',
    client: 'HydroVac-Supply',
    logo: HydrovacLogo,
    industry: 'Hydro Excavation Parts & Equipment Supply',
    challenge: 'HydroVac Supply needed a fresh, compelling brand presence to stand out in the competitive hydro-excavation industry. Additionally, they needed a clear, consistent message that would resonate with professionals in the construction and excavation sectors showcasing their products and generate leads.',
    solution: 'We refreshed their brand identity and redesigned their website to highlight their durable equipment. Our SEO strategy improved visibility, while targeted social media content boosted brand awareness and engagement within the hydro-excavation industry.',
    results: [
      { metric: 'Website Traffic', value: '+35%' },
      { metric: 'Lead Generation', value: '+40%' },
      { metric: 'Online Sales', value: '+40%' }
    ],
    websiteUrl: 'https://www.hydrovac-supply.com',
    desktopPreview: HydrovacDesktop,
    mobilePreview: HydrovacMobile,
    tags: ['Brand Identity', 'SEO', 'Social Media Marketing', 'Web Design']
  },
  {
    id: 'national-hydro',
    client: 'National Hydro-Excavation Services',
    logo: NatHydroLogo,
    industry: 'Hydro Excavation & Vacuum Excavation',
    challenge: 'National Hydro-Excavation Services lacked a modern digital presence and needed a way to streamline communication with potential clients. They also required a cohesive brand identity that highlighted their expertise in environmentally friendly, non-destructive excavation methods and reinforced their safety standards in the industry.',
    solution: 'Our team developed a comprehensive brand refresh, focusing on creating a modern, professional online presence. We updated their visual identity, developed messaging that emphasized their commitment to safety and innovation, and redesigned their website to better showcase their core services, such as hydro-excavation, daylighting, and vacuum excavation. Our SEO strategy targeted local keywords to increase their visibility in key markets, and social media content was developed to enhance brand awareness and credibility.',
    results: [
      { metric: 'Website Traffic', value: '+30%' },
      { metric: 'Organic Search Traffic', value: '+25%' },
      { metric: 'Brand Awareness', value: '+40%' }
    ],
    websiteUrl: 'https://www.nathydro.com',
    desktopPreview: NatHydroDesktop,
    mobilePreview: NatHydroMobile,
    tags: ['Brand Development', 'Web Design', 'Local SEO', 'Content Marketing']
  },

]; 