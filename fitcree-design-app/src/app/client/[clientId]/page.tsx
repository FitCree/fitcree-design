"use client";

import React from 'react';
import { useParams } from 'next/navigation';
import { MOCK_CLIENTS } from '@/data/mock-data';
import ClientDashboard from '@/components/client/ClientDashboard';

export default function ClientDynamicPage() {
  const params = useParams();
  const clientId = params.clientId as string;

  const user = MOCK_CLIENTS.find((c) => c.id === clientId);

  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-4">
        <h2 className="text-2xl font-bold text-neutral-900">クライアントが見つかりません</h2>
        <p className="text-neutral-600">指定されたIDのクライアントデータは存在しません。</p>
        <a href="/" className="text-blue-600 hover:underline">トップページへ戻る</a>
      </div>
    );
  }

  return <ClientDashboard user={user} />;
}
