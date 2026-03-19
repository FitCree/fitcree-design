"use client";

import React from 'react';
import { useParams } from 'next/navigation';
import { MOCK_WORK_DETAILS } from '@/data/mock-work-details';
import { MOCK_CREATORS, MOCK_WORKS } from '@/data/mock-data';
import WorkDetailView from '@/components/creator/WorkDetailView';

export default function WorkDetailPage() {
  const params = useParams();
  const workId = params.workId as string;

  const work = MOCK_WORK_DETAILS[workId];
  const creator = work
    ? MOCK_CREATORS.find((c) => c.id === work.creatorId) || MOCK_CREATORS[0]
    : MOCK_CREATORS[0];
  const otherWorks = MOCK_WORKS.filter((w) => w.creatorId === creator.id && w.id !== workId);

  if (!work) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-neutral-500">作品が見つかりません</p>
      </div>
    );
  }

  return (
    <WorkDetailView
      work={work}
      creator={creator}
      otherWorks={otherWorks}
    />
  );
}
