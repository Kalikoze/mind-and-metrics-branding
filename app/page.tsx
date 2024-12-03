import Hero from '@/components/common/Hero';
import ValueProposition from '@/components/common/ValueProposition';
import CaseStudies from '@/components/pages/home/CaseStudies';
import ServicesGrid from '@/components/pages/home/ServicesGrid';
import PricingPreview from '@/components/pages/home/PricingPreview';

export default function Home() {
  const valuePropositionData = {
    title: "Dedicated Partners in Sustainable Growth",
    paragraphs: [
      {
        text: "At Mind & Metrics, we specialize in working with B2B companies ready to scale efficiently without compromising their reputation. We understand that true growth requires a blend of strategic planning, precision, and data-driven insights.",
        highlights: ["scale efficiently", "data-driven insights"]
      },
      {
        text: "Our approach is built on collaboration and trust. From enhancing your brand and optimizing your digital presence to driving measurable marketing results, we partner with you every step of the way to achieve long-term success.",
        highlights: ["collaboration", "long-term success"]
      }
    ],
    stats: [
      { value: '100%', label: 'Client Retention Rate' },
      { value: '1yr+', label: 'Average Client Partnership' },
      { value: '5', label: 'Full-Scale Projects Launched' }
    ]
  };

  return (
    <main>
      <Hero
        variant="home"
        title="Data Driven Tailored Excellence"
        subtitle="Your Vision, Our Expertise — Uniting Strategy and Story"
        primaryButton={{
          text: "Get Started",
          href: "/get-started"
        }}
        secondaryButton={{
          text: "Contact Us",
          href: "/contact"
        }}
      />
      <ValueProposition {...valuePropositionData} />
      <CaseStudies />
      <ServicesGrid />
      <PricingPreview />
    </main>
  );
}
