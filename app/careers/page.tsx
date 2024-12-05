import Hero from '@/components/common/Hero';
import ValueProposition from '@/components/common/ValueProposition';
import WorkCulture from '@/components/pages/careers/WorkCulture';
import OpenPositions from '@/components/pages/careers/OpenPositions';
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: 'Careers',
  description: 'Discover career opportunities at Mind & Metrics, where creativity meets technical excellence. Join a collaborative team transforming brands with strategy, innovation, and results-driven solutions.',
  openGraph: {
    title: 'Careers | Mind & Metrics Branding',
    description: 'Discover career opportunities at Mind & Metrics, where creativity meets technical excellence. Join a collaborative team transforming brands with strategy, innovation, and results-driven solutions.',
    type: 'website',
    locale: 'en_US',
    url: 'https://mindandmetricsbranding.com/careers',
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
    title: 'Careers | Mind & Metrics Branding',
    description: 'Discover career opportunities at Mind & Metrics, where creativity meets technical excellence. Join a collaborative team transforming brands with strategy, innovation, and results-driven solutions.',
    images: ['https://mindandmetricsbranding.com/og-image.png'],
  },
};

export default function Careers() {
  const valuePropositionData = {
    title: "Join Our Team of Innovators",
    paragraphs: [
      {
        text: "At Mind & Metrics, we believe in fostering an environment where creativity meets technical excellence. Our team thrives on collaboration, continuous learning, and pushing the boundaries of what's possible in digital marketing and brand development.",
        highlights: ["creativity", "technical excellence"]
      },
      {
        text: "We're looking for passionate individuals who share our commitment to delivering exceptional results. Whether you're a seasoned professional or an emerging talent, if you're driven by innovation and excellence, we want to hear from you.",
        highlights: ["passionate individuals", "innovation"]
      }
    ],
    stats: [
      { value: '100%', label: 'In-Person Collaboration' },
      { value: '20+', label: 'Professional Development Hours' },
      { value: '5/5', label: 'Employee Satisfaction' }
    ]
  };

  return (
    <main>
      <Hero
        variant='careers'
        title="Shape the Future of Digital Excellence"
        subtitle="Join a team dedicated to transforming brands through strategy, creativity, and innovation"
      />
      <ValueProposition {...valuePropositionData} />
      <WorkCulture />
      <OpenPositions />
    </main>
  );
} 