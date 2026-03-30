"use client";

import { MOCK_CREATORS } from '@/data/mock-data';
import CreatorTopPage from '@/components/creator/CreatorTopPage';

export default function GuestCreatorPage() {
  const creator = MOCK_CREATORS[0];

  return (
    <CreatorTopPage viewMode="guest" targetUser={creator} />
  );
}
