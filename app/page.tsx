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
        text: "At Mind & Metrics, we are a growth marketing agency specializing in working with B2B companies ready to scale efficiently without compromising reputation. We understand that true growth requires a blend of strategic planning, precision, and data-driven insights.",
        highlights: ["growth marketing agency", "data-driven"]
      },
      {
        text: "Our approach is focused on collaboration and trust because we believe the best results come from a true partnership. We will work side-by-side with you, to understand your goals, challenges, and vision for your company at every step.",
        highlights: ["true partnership", "side-by-side"]
      },
      {
        text: "Whether it's strengthening your brand, refining your digital presence, or driving measurable marketing results, we ensure our strategies are tailored to your unique needs allowing us to deliver solutions that not only meet immediate objectives but also support sustainable, long-term success.",
        highlights: ["measurable marketing results", "long-term success"]
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
          text: "Build Your Plan",
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
