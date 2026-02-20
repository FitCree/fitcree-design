"use client";

import React from 'react';
import { useParams, useRouter } from 'next/navigation';
import { MOCK_CLIENTS, Project, User } from '@/data/mock-data';
import ProjectDetailView from '@/components/projects/ProjectDetailView';
import { ArrowLeft } from 'lucide-react';
import HeaderCreator from '@/components/common/header-creator';
import Footer from '@/components/common/footer';

export default function CreatorProjectDetailPage() {
  const params = useParams();
  const router = useRouter();
  const projectIdStr = params.projectId as string;
  const projectId = parseInt(projectIdStr);

  // Find project and its client
  let project: Project | undefined;
  let client: User | undefined;

  for (const c of MOCK_CLIENTS) {
    const p = c.projects?.find(p => p.id === projectId);
    if (p) {
      project = p;
      client = c;
      break;
    }
  }

  if (!project) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen space-y-4">
        <h2 className="text-2xl font-bold text-neutral-900">案件が見つかりません</h2>
        <p className="text-neutral-600">指定されたIDの案件データは存在しません。</p>
        <button
          onClick={() => router.back()}
          className="text-blue-600 hover:underline flex items-center gap-1"
        >
          <ArrowLeft size={16} /> 戻る
        </button>
      </div>
    );
  }

  // 山田 イラストマン を現在のユーザーとする
  const CURRENT_CREATOR_ID = 'creator-1';

  // 応募状況または担当状況を確認
  const isApplied = project.applicantUsers?.some(u => u.id === CURRENT_CREATOR_ID) ||
    project.assignedUsers?.some(u => u.id === CURRENT_CREATOR_ID);

  return (
    <div className="min-h-screen bg-neutral-50 flex flex-col">
      <HeaderCreator />
      <main className="pt-24 pb-20 px-4 sm:px-6 lg:px-8 flex-grow">
        <div className="max-w-5xl mx-auto mb-6">
          <button
            onClick={() => router.back()}
            className="text-neutral-500 hover:text-neutral-800 flex items-center gap-1 text-sm font-bold transition-colors"
          >
            <ArrowLeft size={16} /> 案件一覧へ戻る
          </button>
        </div>
        <ProjectDetailView project={project} client={client} isApplied={isApplied} />
      </main>
      <Footer />
    </div>
  );
}
