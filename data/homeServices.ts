import { serviceDetails } from './serviceDetails';

export const homeServices = serviceDetails.map(service => ({
  id: service.id,
  icon: service.icon,
  title: service.title,
  description: getHomeDescription(service.id)
}));

function getHomeDescription(id: string): string {
  switch (id) {
    case 'brand-identity-and-strategy':
      return "Transform your brand into a strategic asset that resonates with your target audience and drives business growth.";
    case 'website-development-seo':
      return "Build a site that drives success through modern development practices and search engine optimization strategies.";
    case 'digital-marketing-content-management':
      return "Tailored content and marketing strategies to drive engagement and establish your brand's digital presence.";
    case 'consulting-market-research':
      return "Tailored research and consulting services to inform your strategic decisions and accelerate growth.";
    default:
      return "";
  }
} 