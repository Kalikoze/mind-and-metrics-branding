import type { Metadata } from "next";
import Hero from '@/components/common/Hero';
import ValueProposition from '@/components/common/ValueProposition';
import TeamLeaders from '@/components/pages/about/TeamLeaders';

export const metadata: Metadata = {
  title: 'About',
  description: 'Discover how Mind & Metrics helps B2B leaders achieve growth with data-driven branding and marketing strategies. Learn more about our vision, team, and client success stories.',
  openGraph: {
    title: 'About | Mind & Metrics Branding',
    description: 'Discover how Mind & Metrics helps B2B leaders achieve growth with data-driven branding and marketing strategies. Learn more about our vision, team, and client success stories.',
    type: 'website',
    locale: 'en_US',
    url: 'https://mindandmetricsbranding.com/about',
    siteName: 'Mind & Metrics Branding',
    images: [
      {
        url: 'https://mindandmetricsbranding.com/og-image.png',
        width: 2400,
        height: 1260,
        type: 'image/png',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'About | Mind & Metrics Branding',
    description: 'Discover how Mind & Metrics helps B2B leaders achieve growth with data-driven branding and marketing strategies. Learn more about our vision, team, and client success stories.',
    images: ['https://mindandmetricsbranding.com/og-image.png'],
  },
};

export default function About() {
  const valuePropositionData = {
    title: "A Better Way to Serve Your Brand",
    paragraphs: [
      {
        text: "For years, we worked with marketing agencies that failed to build meaningful relationships or truly understand the unique needs of our business. As we scaled, it became clear that the support we were receiving didn't align with our goals. Every time we suggested new approaches or shared feedback on how we wanted to market our business, the response was always, \"That's just not how it's done.\"",
        highlights: ["meaningful relationships", "unique needs"]
      },
      {
        text: "The strategies presented weren't backed by data relevant to our business, leaving us with numbers that lacked actionable insights. The website they built wasn't custom—it was a generic template that didn't reflect our brand or vision. They didn't take the time to understand what made us unique or why certain approaches mattered. Instead of empowering our growth, their process added obstacles.",
        highlights: ["actionable insights", "generic template"]
      },
      {
        text: "Why wasn't the team listening to us—the people who know our business inside and out? What was meant to save time and drive growth only added to our frustration. That's when Mind & Metrics was born.",
        highlights: ["know our business", "drive growth"]
      },
      {
        text: "We realized businesses like yours need more than just a vendor—they need a true partner. At Mind & Metrics, we're focused on understanding your business, supporting your growth, and delivering data-driven strategies that matter. With a personalized approach, we handle all things marketing and branding so you can get back to doing what you do best running your business and achieving your goals.",
        highlights: ["true partner", "personalized approach"]
      }
    ],
    stats: [
      { value: '100%', label: 'Accessibility Compliance' },
      { value: '24/7', label: 'Guaranteed Uptime' },
      { value: '13+', label: 'Years Combined Experience' }
    ]
  };

  return (
    <main>
      <Hero
        title="Where Strategy, Reputation, and Results Align"
        subtitle="We create lasting partnerships with B2B leaders, delivering data-driven solutions through collaboration and precision."
      />
      <ValueProposition {...valuePropositionData} />
      <TeamLeaders />
    </main>
  );
}