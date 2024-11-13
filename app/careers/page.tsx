"use client";

import Hero from '@/components/common/Hero';
import ValueProposition from '@/components/common/ValueProposition';
import WorkCulture from '@/components/pages/careers/WorkCulture';

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
        title="Shape the Future of Digital Excellence"
        subtitle="Join a team dedicated to transforming brands through strategy, creativity, and innovation"
      />
      <ValueProposition {...valuePropositionData} />
      <WorkCulture />
    </main>
  );
} 