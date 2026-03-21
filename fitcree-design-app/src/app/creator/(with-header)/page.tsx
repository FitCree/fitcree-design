import { Suspense } from 'react';
import CreatorTopPage from '@/components/creator/CreatorTopPage';

export default function CreatorPage() {
  return (
    <Suspense fallback={<div className="min-h-screen" />}>
      <CreatorTopPage />
    </Suspense>
  );
}
