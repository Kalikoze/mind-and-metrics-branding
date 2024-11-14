import { notFound } from 'next/navigation';
import { positions } from '@/data/positions';
import JobPostingTemplate from '@/components/pages/careers/JobPostingTemplate';

export async function generateStaticParams() {
  return positions.map((position) => ({
    positionId: position.id,
  }));
}

export default function JobPosting({ params }: { params: { positionId: string } }) {
  const position = positions.find((p) => p.id === params.positionId);

  if (!position) {
    notFound();
  }

  return <JobPostingTemplate position={position} />;
} 