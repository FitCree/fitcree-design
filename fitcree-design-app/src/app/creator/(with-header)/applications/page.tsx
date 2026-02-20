"use client";

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import {
  Calendar,
  Clock,
  ChevronRight,
  Briefcase,
  Users,
  MessageSquare,
  AlertCircle,
  CheckCircle2,
  Activity
} from 'lucide-react';
import { MOCK_CLIENTS, PROJECT_STATUS_CONFIG, Project, MOCK_CREATORS } from '@/data/mock-data';
import { BUDGET_RANGES, REQUEST_CATEGORIES } from '@/data/master-data';

// 山田 イラストマン を現在のユーザーとする
const CURRENT_CREATOR_ID = MOCK_CREATORS[0].id;

export default function CreatorApplicationsPage() {
  const [activeTab, setActiveTab] = useState<'all' | 'applied' | 'in_progress' | 'closed'>('all');

  // 自分が応募した案件を抽出
  const allApplications = useMemo(() => {
    const apps: { project: Project; clientName: string; clientCompany?: string; avatarUrl?: string }[] = [];

    MOCK_CLIENTS.forEach(client => {
      if (client.projects) {
        client.projects.forEach(project => {
          const isApplicant = project.applicantUsers?.some(u => u.id === CURRENT_CREATOR_ID);
          const isAssigned = project.assignedUsers?.some(u => u.id === CURRENT_CREATOR_ID);

          if (isApplicant || isAssigned) {
            apps.push({
              project,
              clientName: client.name,
              clientCompany: client.company,
              avatarUrl: client.avatarUrl
            });
          }
        });
      }
    });

    return apps.sort((a, b) => b.project.id - a.project.id);
  }, []);

  // Filter based on tab
  const filteredApps = useMemo(() => {
    if (activeTab === 'all') return allApplications;
    if (activeTab === 'applied') {
      return allApplications.filter(a => a.project.status === 'recruiting' || a.project.status === 'selection');
    }
    if (activeTab === 'in_progress') {
      return allApplications.filter(a => a.project.status === 'in_progress');
    }
    if (activeTab === 'closed') {
      return allApplications.filter(a => a.project.status === 'completed' || a.project.status === 'closed');
    }
    return allApplications;
  }, [activeTab, allApplications]);

  const tabConfig = [
    { label: 'すべて', id: 'all' as const },
    { label: '応募中', id: 'applied' as const },
    { label: '進行中', id: 'in_progress' as const },
    { label: '完了', id: 'closed' as const },
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Page Header */}
      <div className="flex items-center gap-3 border-b border-neutral-100 pb-6">
        <div className="bg-orange-100 p-2 rounded-xl">
          <Activity size={24} className="text-orange-600" />
        </div>
        <div>
          <h1 className="text-2xl font-black text-neutral-900">応募状況</h1>
          <p className="text-sm text-neutral-700 mt-1">これまでに提案・応募した案件の現在のステータスを確認できます。</p>
        </div>
      </div>

      <div className="space-y-6">
        {/* Tabs */}
        <div className="flex items-center gap-2 border-b border-neutral-100 pb-px overflow-x-auto no-scrollbar">
          {tabConfig.map((tab) => {
            const isActive = activeTab === tab.id;
            let count = 0;
            if (tab.id === 'all') count = allApplications.length;
            else if (tab.id === 'applied') count = allApplications.filter(a => a.project.status === 'recruiting' || a.project.status === 'selection').length;
            else if (tab.id === 'in_progress') count = allApplications.filter(a => a.project.status === 'in_progress').length;
            else if (tab.id === 'closed') count = allApplications.filter(a => a.project.status === 'completed' || a.project.status === 'closed').length;

            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-3 text-sm font-bold border-b-2 transition-all whitespace-nowrap ${isActive
                  ? tab.id === 'applied' ? 'border-red-600 text-red-600 bg-red-50/50' : tab.id === 'in_progress' ? 'border-blue-600 text-blue-600 bg-blue-50/50' : tab.id === 'closed' ? 'border-green-600 text-green-600 bg-green-50/50' : 'border-orange-500 text-orange-600 bg-orange-50/50'
                  : 'border-transparent text-neutral-500 hover:text-neutral-700 hover:bg-neutral-50'
                  }`}
              >
                {tab.label}
                <span className={`px-2 py-0.5 rounded-full text-[10px] ${isActive ? (tab.id === 'applied' ? 'bg-red-100 text-red-700' : tab.id === 'in_progress' ? 'bg-blue-100 text-blue-700' : tab.id === 'closed' ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-orange-700') : 'bg-neutral-100 text-neutral-500'}`}>
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        <ul className="space-y-4">
          {filteredApps.length > 0 ? (
            filteredApps.map(({ project, clientName, clientCompany, avatarUrl }) => (
              <li key={project.id} className="bg-white rounded-2xl border border-neutral-200 overflow-hidden hover:border-orange-300 transition-colors group">
                <Link href={`/projects/${project.id}`} className="p-6 block">
                  <div className="flex items-start justify-between gap-4 mb-4">
                    <div className="space-y-4">
                      <div className="flex flex-wrap items-center gap-4">
                        <div className='flex items-center gap-4'>
                          {/* ステータス */}
                          <div className="flex items-center gap-2">
                            <p className={`text-sm font-bold px-2 py-0.5 rounded uppercase tracking-wider ${(project.status === 'recruiting' || project.status === 'selection') ? PROJECT_STATUS_CONFIG.recruiting.bg : project.status === 'in_progress' ? PROJECT_STATUS_CONFIG.in_progress.bg : PROJECT_STATUS_CONFIG.completed.bg} ${(project.status === 'recruiting' || project.status === 'selection') ? PROJECT_STATUS_CONFIG.recruiting.color : project.status === 'in_progress' ? PROJECT_STATUS_CONFIG.in_progress.color : PROJECT_STATUS_CONFIG.completed.color}`}>
                              {(project.status === 'recruiting' || project.status === 'selection')
                                ? '応募中'
                                : (project.status === 'completed' || project.status === 'closed')
                                  ? '完了'
                                  : PROJECT_STATUS_CONFIG[project.status].label}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-6">
                          <div className="flex items-center gap-4 text-sm text-neutral-500">
                            <span className="flex items-center gap-1">
                              <Calendar size={14} />
                              応募日: {project.postedDate}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div>
                        {/* 案件タイトル */}
                        <h3 className="text-lg font-bold text-neutral-900 group-hover:text-orange-600 transition-colors">
                          {project.title}
                        </h3>
                        {/* カテゴリ */}
                        <p>
                          <span className="bg-orange-50 text-neutral-700 px-3 py-0.5 rounded-full border border-orange-100 text-xs text-orange-500 font-bold">
                            {REQUEST_CATEGORIES[project.categoryId]}
                          </span>
                        </p>
                      </div>
                    </div>

                    {/* メッセージ通知 (進行中の場合) */}
                    {project.status === 'in_progress' && (
                      <div className="flex items-center gap-2">
                        {project.hasUnreadMessage ? (
                          <div className="flex items-center gap-1 bg-red-50 text-red-600 px-2 py-1 rounded-lg text-xs font-bold animate-pulse">
                            <MessageSquare size={14} className="fill-red-600" />
                            メッセージあり
                          </div>
                        ) : (
                          <div className="flex items-center gap-1 text-neutral-500 text-xs font-medium">
                            <MessageSquare size={14} />
                            連絡なし
                          </div>
                        )}
                      </div>
                    )}
                  </div>

                  <div className="flex flex-wrap items-center justify-between gap-4">
                    {/* クライアント名 */}
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-full overflow-hidden bg-neutral-100 flex-shrink-0">
                        {avatarUrl ? (
                          <img src={avatarUrl} alt={clientName} className="w-full h-full object-cover" />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center bg-neutral-200">
                            <Users size={12} className="text-neutral-500" />
                          </div>
                        )}
                      </div>
                      <p className="text-sm text-neutral-600 font-medium">
                        <span className="text-neutral-900">{clientName}</span>
                        {clientCompany && `（${clientCompany}）`}
                      </p>
                    </div>
                    <p className="text-sm text-neutral-500 hover:text-orange-800 group-hover:text-orange-600 transition-colors flex items-center gap-1">
                      詳細を確認 <ChevronRight size={14} />
                    </p>
                  </div>
                </Link>
              </li>
            ))
          ) : (
            <div className="py-20 text-center bg-white rounded-2xl border border-neutral-100 shadow-sm">
              <div className="bg-neutral-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Briefcase className="text-neutral-300" size={32} />
              </div>
              <p className="text-neutral-500 font-medium">該当する案件はありません</p>
            </div>
          )}
        </ul>
      </div>
    </div>
  );
}
