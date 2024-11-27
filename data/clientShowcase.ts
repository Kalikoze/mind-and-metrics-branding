import PSCLogo from '@/public/assets/logos/psc-logo.svg';
import HydrovacLogo from '@/public/assets/logos/hydrovac-logo.svg';
import NatHydroLogo from '@/public/assets/logos/nat-hydro-logo.svg';
import PrecisionSurveyLogo from '@/public/assets/logos/precision-survey-logo.svg';

export const stats = [
  { value: "90%", label: "24hr Support Resolution Rate" },
  { value: '80%', label: "Early Project Deliveries" },
  { value: '10%', label: "Overhead Cost Savings" },
  { value: '98%', label: "Client Digital Confidence" }
] as const;

export const clientLogos = [
  {
    src: PSCLogo,
    alt: "PSC Construction",
    description: "Brand Evolution & Digital Marketing",
    websiteUrl: "https://www.psccompanies.com",
    caseStudyUrl: "/case-studies/psc-construction"
  },
  {
    src: PrecisionSurveyLogo,
    alt: "Precision Surveying & Consulting",
    description: "Complete Digital Transformation",
    websiteUrl: "https://www.precisionsurveyingandconsulting.com",
    caseStudyUrl: "/case-studies/precision-survey"
  },
  {
    src: HydrovacLogo,
    alt: "Hydrovac Supply",
    description: "Brand Identity & Web Development",
    websiteUrl: "https://www.hydrovac-supply.com",
    caseStudyUrl: "/case-studies/hydrovac-supply"
  },
  {
    src: NatHydroLogo,
    alt: "National Hydro Excavation Services",
    description: "Website Design & SEO Strategy",
    websiteUrl: "https://www.nathydro.com",
    caseStudyUrl: "/case-studies/national-hydro"
  }
] as const; 