"use client";

import Hero from '@/components/common/Hero';
import AboutIntro from '@/components/pages/about/AboutIntro';
import TeamLeaders from '@/components/pages/about/TeamLeaders';
import CaseStudies from '@/components/pages/about/CaseStudies';

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