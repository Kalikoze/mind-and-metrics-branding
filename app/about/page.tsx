"use client";

import Hero from '@/components/common/Hero';
import ValueProposition from '@/components/common/ValueProposition';
import TeamLeaders from '@/components/pages/about/TeamLeaders';
import CaseStudies from '@/components/pages/about/CaseStudies';

export default function About() {
  const valuePropositionData = {
    title: "A Better Way to Serve Your Brand",
    paragraphs: [
      {
        text: "For years, we partnered with marketing agencies that failed to build a meaningful relationship with us or truly understand the unique needs of our business. As we worked to scale, we realized that the support we were receiving wasn't aligned with where we were headed. Every suggestion we made for a new approaches or shared feedback on how we wanted to market our business, the response was always, \"That's just not how it's done.\" The strategies we were presented with were not driven by data that was relevant to our business goals, leaving us with numbers that didn't provide actionable insights.",
        highlights: ["meaningful relationship", "unique needs"]
      },
      {
        text: "The website they built for us wasn't a custom solution—it was a generic template that didn't reflect our brand or the vision we had for our future. They didn't take the time to understand what made our business unique or why certain approaches mattered. Instead of empowering us to grow, their process created more obstacles. Why wasn't the team listening to us—the people who know the business inside and out? What was meant to save time and drive growth only added to our frustrations. That's when Mind and Metrics was created. We know businesses like yours needed more than just a vendor—they needed a true partner. Mind and Metrics was built be that advocate: a team focused on understanding your business, supporting your growth, and delivering strategies based on data and insights that matter. With personalized care and a tailored approach, we handle all things marketing and branding, so you can get back to running your business and achieving your goals.",
        highlights: ["true partner", "personalized care"]
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
        title="Where Strategy Meets Reputation and Results"
        subtitle="Building lasting partnerships with B2B leaders through data-driven solutions and collaborative excellence."
        showBackground={false}
      />
      <ValueProposition {...valuePropositionData} />
      <TeamLeaders />
      <CaseStudies />
    </main>
  );
}