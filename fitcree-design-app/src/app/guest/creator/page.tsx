import { Suspense } from 'react';
import GuestCreatorPage from './GuestCreatorPage';

export default function Page() {
  return (
    <Suspense fallback={<div className="min-h-screen" />}>
      <GuestCreatorPage />
    </Suspense>
  );
}
