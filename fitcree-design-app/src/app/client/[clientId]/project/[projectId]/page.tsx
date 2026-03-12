"use client";

import React, { useState, useRef, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { MOCK_CLIENTS, Project, User } from '@/data/mock-data';
import ProjectDetailView from '@/components/projects/ProjectDetailView';
import { ArrowLeft, Pencil, MoreVertical, Copy, XCircle, Archive, Flag } from 'lucide-react';
import HeaderClient from '@/components/common/header-client';

export default function ClientProjectDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // メニュー外クリックで閉じる
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    };
    if (menuOpen) document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [menuOpen]);
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

  return (
    <div className="min-h-screen bg-neutral-50">
      <HeaderClient />
      <main className="pt-10 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto mb-6 flex items-center justify-between">
          <button
            onClick={() => router.back()}
            className="text-neutral-500 hover:text-neutral-800 flex items-center gap-1 text-sm font-bold transition-colors"
          >
            <ArrowLeft size={16} /> ダッシュボードへ戻る
          </button>

          <div className="flex items-center gap-2">
            <button
              onClick={() => router.push(`/client/${params.clientId}/project/${projectId}/edit`)}
              className="bg-white border border-neutral-200 hover:border-neutral-300 text-neutral-800 text-sm font-bold px-4 py-2 rounded-lg transition-all flex items-center gap-2"
            >
              <Pencil size={14} />
              この仕事を編集する
            </button>

            {/* More menu */}
            <div className="relative" ref={menuRef}>
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="bg-white border border-neutral-200 hover:border-neutral-300 text-neutral-500 hover:text-neutral-800 p-2 rounded-lg transition-all"
                aria-label="その他のメニュー"
              >
                <MoreVertical size={16} />
              </button>
              {menuOpen && (
                <div className="absolute right-0 mt-1 w-48 bg-white border border-neutral-200 rounded-lg shadow-lg py-1 z-30">
                  <button
                    onClick={() => setMenuOpen(false)}
                    className="w-full text-left px-4 py-2.5 text-sm text-neutral-700 hover:bg-neutral-50 flex items-center gap-2"
                  >
                    <Copy size={14} className="text-neutral-400" />
                    依頼を複製
                  </button>
                  <button
                    onClick={() => setMenuOpen(false)}
                    className="w-full text-left px-4 py-2.5 text-sm text-neutral-700 hover:bg-neutral-50 flex items-center gap-2"
                  >
                    <Archive size={14} className="text-neutral-400" />
                    募集を締め切る
                  </button>
                  <div className="border-t border-neutral-100 my-1" />
                  <button
                    onClick={() => { setMenuOpen(false); router.push(`/client/${params.clientId}/project/${projectId}/cancel`); }}
                    className="w-full text-left px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 flex items-center gap-2"
                  >
                    <XCircle size={14} className="text-red-400" />
                    依頼を取り下げる
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
        <ProjectDetailView project={project} client={client} isClientView={true} />
      </main>
    </div>
  );
}
