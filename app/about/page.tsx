"use client";

import Hero from '@/components/Hero';
import AboutIntro from '@/components/AboutIntro';
import TeamLeaders from '@/components/TeamLeaders';
import CaseStudies from '@/components/CaseStudies';

export default function About() {
  return (
    <main>
      <Hero
        title="Where Strategy Meets Reputation and Results"
        subtitle="Building lasting partnerships with B2B leaders through data-driven solutions and collaborative excellence."
        showBackground={false}
      />
      <AboutIntro />
      <TeamLeaders />
      <CaseStudies />
    </main>
  );
}
