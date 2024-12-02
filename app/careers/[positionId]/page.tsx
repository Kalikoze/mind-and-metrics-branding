import type { Metadata } from "next";
import { notFound } from 'next/navigation';
import { positions } from '@/data/positions';
import JobPostingTemplate from '@/components/pages/careers/JobPostingTemplate';

export async function generateStaticParams() {
  return positions.map((position) => ({
    positionId: position.id,
  }));
}

export async function generateMetadata({ params }: { params: { positionId: string } }): Promise<Metadata> {
  const position = positions.find((p) => p.id === params.positionId);
  
  if (!position) {
    return {
      title: 'Position Not Found',
      description: 'The requested job position could not be found.'
    };
  }

  return {
    title: `${position.title} - Career Opportunity`,
    description: position.description,
    openGraph: {
      title: `${position.title} | Mind & Metrics Branding`,
      description: position.description,
      type: 'website',
      locale: 'en_US',
      url: `https://mindandmetricsbranding.com/careers/${position.id}`,
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
      title: `${position.title} | Mind & Metrics Branding`,
      description: position.description,
      images: ['https://mindandmetricsbranding.com/og-image.png'],
    },
  };
}

export default function JobPosting({ params }: { params: { positionId: string } }) {
  const position = positions.find((p) => p.id === params.positionId);

  if (!position) {
    notFound();
  }

  return (
    <main>
      <JobPostingTemplate position={position} />
    </main>
  );
} 