"use client";

import React from 'react';
import Link from 'next/link';
import {
  Plus,
  ChevronRight,
  ExternalLink,
  Search,
  MessageSquare
} from 'lucide-react';
import { MOCK_CLIENTS } from '@/data/mock-data';

export default function ClientPage() {
  const MOCK_USER = MOCK_CLIENTS[0];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Welcome Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">{MOCK_USER.name} 様</h1>
          <p className="text-gray-500 mt-1">{MOCK_USER.company}</p>
        </div>
        <Link
          href="/client/post-job"
          className="inline-flex items-center justify-center px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-full transition-all shadow-md hover:shadow-lg active:scale-95 gap-2"
        >
          <Plus size={18} />
          新規案件を依頼する
        </Link>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {MOCK_USER.stats?.map((stat, index) => (
          <div key={index} className="bg-white p-5 rounded-2xl border border-gray-100 hover:shadow-md transition-shadow">
            <div className="flex items-center gap-3 mb-3">
              <div className={`${stat.bg} p-2 rounded-lg`}>
                <stat.icon size={20} className={stat.color} />
              </div>
              <span className="text-sm font-medium text-gray-500">{stat.label}</span>
            </div>
            <div className="flex items-baseline gap-1">
              <span className="text-2xl font-bold text-gray-900">{stat.value}</span>
              <span className="text-xs text-gray-400">件</span>
            </div>
          </div>
        ))}
      </div>

      {/* Main Content Sections */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        {/* Project List */}
        <div className="xl:col-span-2 space-y-4">
          <div className="flex items-center justify-between px-2">
            <h2 className="text-lg font-bold text-gray-900">進行中の案件</h2>
            <Link href="#" className="text-sm text-blue-600 font-medium hover:underline flex items-center gap-1">
              すべて見る <ChevronRight size={14} />
            </Link>
          </div>

          <div className="space-y-4">
            {MOCK_USER.projects?.map((project) => (
              <div key={project.id} className="bg-white rounded-2xl border border-gray-100 overflow-hidden hover:border-blue-200 transition-colors group">
                <div className="p-6">
                  <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider ${project.status === 'recruiting' ? 'bg-blue-100 text-blue-700' :
                          project.status === 'selection' ? 'bg-sky-100 text-sky-700' :
                            'bg-green-100 text-green-700'
                          }`}>
                          {project.statusLabel}
                        </span>
                        <span className="text-xs text-gray-400">{project.category}</span>
                      </div>
                      <h3 className="font-bold text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-1">
                        {project.title}
                      </h3>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-gray-400 mb-1">予算目安</p>
                      <p className="font-bold text-gray-900 text-sm">{project.budget}</p>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-gray-50">
                    <div className="flex items-center gap-6">
                      {project.status === 'in_progress' ? (
                        <div className="flex items-center gap-2">
                          <p className="text-xs text-gray-500">パートナー:</p>
                          <span className="text-sm font-bold text-gray-700">{project.partnerName}</span>
                        </div>
                      ) : (
                        <div className="flex items-center gap-4">
                          <div className="flex items-center gap-1">
                            <span className="text-sm font-bold text-gray-900">{project.applicants}</span>
                            <span className="text-xs text-gray-500">名の応募</span>
                          </div>
                          {project.newApplicants && project.newApplicants > 0 ? (
                            <span className="bg-red-50 text-red-600 text-[10px] font-bold px-2 py-0.5 rounded-full">
                              +{project.newApplicants} new
                            </span>
                          ) : null}
                        </div>
                      )}
                    </div>

                    <button className="text-sm font-bold text-blue-600 hover:text-blue-800 transition-colors flex items-center gap-1">
                      詳細を確認 <ExternalLink size={14} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Sidebar Actions */}
        <div className="space-y-6">
          <div className="bg-gradient-to-br from-blue-600 to-blue-800 rounded-2xl p-6 text-white shadow-lg shadow-blue-200">
            <h3 className="font-bold text-lg mb-2 text-white">クリエイターを探す</h3>
            <p className="text-blue-100 text-sm mb-6 leading-relaxed">
              あなたの理想に応える最適なクリエイターをデータベースから検索できます。
            </p>
            <div className="relative mb-4">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-blue-300" size={16} />
              <input
                type="text"
                placeholder="スキルやカテゴリーで検索"
                className="w-full bg-white/10 border border-white/20 rounded-xl py-2 pl-10 pr-4 text-sm text-white placeholder:text-blue-200 focus:outline-none focus:ring-2 focus:ring-white/30 transition-all"
              />
            </div>
            <button className="w-full bg-white text-blue-600 font-bold py-2.5 rounded-xl text-sm hover:bg-blue-50 transition-colors shadow-sm">
              検索を開始する
            </button>
          </div>

          <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
            <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
              <MessageSquare size={18} className="text-blue-600" />
              お知らせ
            </h3>
            <div className="space-y-4 text-sm">
              <div className="pb-4 border-b border-gray-50 last:border-0 last:pb-0">
                <p className="text-gray-400 text-[10px] mb-1">2024.02.25</p>
                <p className="text-gray-700 leading-snug">システムメンテナンスのお知らせ（3月1日 00:00~04:00）</p>
              </div>
              <div className="pb-4 border-b border-gray-50 last:border-0 last:pb-0">
                <p className="text-gray-400 text-[10px] mb-1">2024.02.20</p>
                <p className="text-gray-700 leading-snug">新機能「ポートフォリオ一括ダウンロード」が追加されました</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}