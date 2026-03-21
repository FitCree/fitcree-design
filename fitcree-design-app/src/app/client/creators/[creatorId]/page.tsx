'use client';

import { Suspense } from 'react';
import { useParams } from 'next/navigation';
import { MOCK_CREATORS } from '@/data/mock-data';
import CreatorTopPage from '@/components/creator/CreatorTopPage';

function CreatorDetailContent() {
  const params = useParams();
  const creatorId = params.creatorId as string;
  const creator = MOCK_CREATORS.find((c) => c.id === creatorId) || MOCK_CREATORS[0];

  return <CreatorTopPage viewMode="client" targetUser={creator} />;
}

export default function ClientCreatorDetailPage() {
  return (
    <Suspense fallback={<div className="min-h-screen" />}>
      <CreatorDetailContent />
    </Suspense>
  );
}
