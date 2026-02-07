"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Plus,
  ChevronRight,
  Search,
  MessageSquare,
  Clock
} from 'lucide-react';
import { User, Project } from '@/data/mock-data';

interface ClientDashboardProps {
  user: User;
}

export default function ClientDashboard({ user }: ClientDashboardProps) {
  const [activeTab, setActiveTab] = useState<'all' | Project['status']>('all');

  // Stats for the tabs
  const tabConfig = [
    { label: 'すべて', id: 'all' as const },
    { label: '募集中', id: 'recruiting' as const },
    { label: '選定中', id: 'selection' as const },
    { label: '進行中', id: 'in_progress' as const },
  ];

  // Separate Unread Messages Stat
  const unreadMessagesCount = user.stats?.find(s => s.label === '未読メッセージ')?.value || 0;

  // Filter projects based on activeTab
  const filteredProjects = activeTab === 'all'
    ? user.projects
    : user.projects?.filter(p => p.status === activeTab);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Welcome Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div className="flex items-center gap-4">
          <img src={user.avatarUrl} alt={`${user.name}のアバター画像`} className="w-16 h-16 rounded-full border border-gray-200" />
          <div>
            <h1 className="text-2xl font-bold text-neutral-900">{user.name}</h1>
            <p className="text-neutral-700 mt-1">{user.company}</p>
          </div>
        </div>
        <Link
          href="/client/post-job"
          className="inline-flex items-center justify-center px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-full transition-all shadow-md hover:shadow-lg active:scale-95 gap-2"
        >
          <Plus size={18} />
          新規案件を作成する
        </Link>
      </div>

      {/* Independent Unread Messages Banner (If any) */}
      {unreadMessagesCount > 0 && (
        <Link href="#" className="bg-white border border-red-200 rounded-xl p-4 flex items-center justify-between hover:border-red-500 transition-colors">
          <div className="flex items-center gap-3">
            <div className="bg-red-50 p-2 rounded-lg">
              <MessageSquare size={20} className="text-red-500" />
            </div>
            <p className="font-bold text-neutral-900">未読メッセージが {unreadMessagesCount} 件あります</p>
          </div>
          <p className="text-sm font-bold text-red-500 hover:underline flex items-center gap-1">
            メッセージを確認 <ChevronRight size={14} />
          </p>
        </Link>
      )}

      {/* Main Content Sections */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Project List */}
        <div className="md:col-span-2 space-y-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between px-2">
              <h2 className="text-lg font-bold text-neutral-900">案件状況</h2>
            </div>

            {/* Tabs */}
            <div className="flex items-center gap-2 border-b border-neutral-100 pb-px overflow-x-auto no-scrollbar">
              {tabConfig.map((tab) => {
                const isActive = activeTab === tab.id;
                const count = tab.id === 'all'
                  ? user.projects?.length
                  : user.projects?.filter(p => p.status === tab.id).length;

                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center gap-2 px-4 py-3 text-sm font-bold border-b-2 transition-all whitespace-nowrap ${isActive
                      ? 'border-blue-600 text-blue-600 bg-blue-50/50'
                      : 'border-transparent text-neutral-500 hover:text-neutral-700 hover:bg-neutral-50'
                      }`}
                  >
                    {tab.label}
                    <span className={`px-2 py-0.5 rounded-full text-[10px] ${isActive ? 'bg-blue-100 text-blue-700' : 'bg-neutral-100 text-neutral-500'}`}>
                      {count}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="space-y-4">
            {filteredProjects && filteredProjects.length > 0 ? (
              filteredProjects.map((project) => (
                <div key={project.id} className="bg-white rounded-2xl border border-neutral-200 overflow-hidden hover:border-blue-300 transition-colors group">
                  <Link href={`/client/${user.id}/project/${project.id}`} className="p-6 block">
                    <div className="flex flex-wrap items-start justify-between gap-4 mb-6">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className={`text-sm font-bold px-2 py-0.5 rounded uppercase tracking-wider ${project.status === 'recruiting' ? 'bg-blue-100 text-blue-700' :
                            project.status === 'selection' ? 'bg-sky-100 text-sky-700' :
                              'bg-green-100 text-green-700'
                            }`}>
                            {project.statusLabel}
                          </span>
                          <span className="text-sm text-neutral-700">{project.category}</span>
                        </div>
                        <h3 className="font-bold text-neutral-900 group-hover:text-blue-600 transition-colors line-clamp-1">
                          {project.title}
                        </h3>
                      </div>
                      {project.status === 'in_progress' ? (
                        <div className="flex items-center gap-2">
                          {project.hasUnreadMessage ? (
                            <div className="flex items-center gap-1 bg-red-50 text-red-600 px-2 py-1 rounded-lg text-xs font-bold animate-pulse">
                              <MessageSquare size={14} className="fill-red-600" />
                              クリエイターから連絡があります
                            </div>
                          ) : (
                            <div className="flex items-center gap-1 text-neutral-600 text-xs font-medium">
                              <MessageSquare size={14} />
                              新着メッセージなし
                            </div>
                          )}
                        </div>
                      ) : (
                        <div className="flex items-center gap-2">
                          <Clock size={14} className="text-neutral-700" />
                          <p className="text-sm text-neutral-700">期限日</p>
                          <p className="font-bold text-neutral-700 text-sm">{project.deadline}</p>
                        </div>
                      )}
                    </div>

                    <div className="flex flex-wrap items-center justify-between gap-4 border-t border-neutral-50">
                      <div className="flex items-center gap-6">
                        {project.status === 'in_progress' ? (
                          <div className="flex items-center gap-2">
                            <p className="text-sm text-neutral-700">担当クリエイター</p>
                            <span className="text-sm font-bold text-neutral-700">{project.partnerName}</span>
                          </div>
                        ) : (
                          <div className="flex items-center gap-4">
                            <div className="flex items-center gap-1">
                              <span className="text-base font-bold text-neutral-900">{project.applicants}</span>
                              <span className="text-sm text-neutral-700">名の応募</span>
                            </div>
                            {project.newApplicants && project.newApplicants > 0 ? (
                              <span className="bg-red-50 text-red-600 text-sm font-bold px-2 py-0.5 rounded-full">
                                +{project.newApplicants} new
                              </span>
                            ) : null}
                          </div>
                        )}
                      </div>

                      <p className="text-sm font-bold text-blue-600 hover:text-blue-800 transition-colors flex items-center gap-1">
                        詳細を確認 <ChevronRight size={14} />
                      </p>
                    </div>
                  </Link>
                </div>
              ))
            ) : (
              <div className="py-20 text-center bg-white rounded-2xl border border border-neutral-200">
                <p className="text-neutral-500">条件に一致する案件はありません</p>
              </div>
            )}
          </div>
        </div>

        {/* Sidebar Actions */}
        <div className="space-y-6">
          <div className="rounded-2xl">
            <h3 className="font-bold text-neutral-900 mb-4 flex items-center gap-2">
              <MessageSquare size={18} className="text-blue-600" />
              お知らせ
            </h3>
            <div className="space-y-4">
              <a href="#" className="block pb-4 border-b border-neutral-100 last:border-0 last:pb-0 group">
                <p className="text-neutral-500 text-sm mb-1">2026.02.25</p>
                <p className="text-neutral-900 text-sm group-hover:text-blue-600 transition-colors">システムメンテナンスのお知らせ（3月1日 00:00~04:00）</p>
              </a>
              <a href="#" className="block pb-4 border-b border-neutral-100 last:border-0 last:pb-0 group">
                <p className="text-neutral-500 text-sm mb-1">2026.02.20</p>
                <p className="text-neutral-900 text-sm group-hover:text-blue-600 transition-colors">新機能「ポートフォリオ一括ダウンロード」を追加しました</p>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div >
  );
}
