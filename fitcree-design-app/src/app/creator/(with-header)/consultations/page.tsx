'use client';

import React, { useState, useMemo } from 'react';
import {
  Briefcase,
  Calendar,
  ChevronRight,
  CircleDollarSign,
  Building2,
  CheckCircle2,
  XCircle,
  Image as ImageIcon,
  Inbox,
} from 'lucide-react';
import { Consultation, getConsultationsForCreator } from '@/data/mock-consultations';
import ConsultationDetailModal from '@/components/consultations/ConsultationDetailModal';

const CURRENT_CREATOR_ID = 'creator-1';

type TabId = 'all' | 'pending' | 'responded';

const TAB_CONFIG: { id: TabId; label: string }[] = [
  { id: 'all', label: 'すべて' },
  { id: 'pending', label: '未対応' },
  { id: 'responded', label: '対応済み' },
];

function getStatusBadge(status: Consultation['status']) {
  switch (status) {
    case 'unread':
      return (
        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-bold bg-red-100 text-red-600">
          NEW
        </span>
      );
    case 'read':
      return (
        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-bold bg-orange-100 text-orange-600">
          未対応
        </span>
      );
    case 'accepted':
      return (
        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-bold bg-green-100 text-green-700">
          <CheckCircle2 size={11} />
          承諾済み
        </span>
      );
    case 'declined':
      return (
        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-bold bg-neutral-100 text-neutral-500">
          <XCircle size={11} />
          見送り
        </span>
      );
  }
}

export default function ConsultationsPage() {
  const [activeTab, setActiveTab] = useState<TabId>('all');
  const [selectedConsultation, setSelectedConsultation] = useState<Consultation | null>(null);

  const allConsultations = useMemo(
    () => getConsultationsForCreator(CURRENT_CREATOR_ID),
    []
  );

  const filteredConsultations = useMemo(() => {
    if (activeTab === 'all') return allConsultations;
    if (activeTab === 'pending')
      return allConsultations.filter((c) => c.status === 'unread' || c.status === 'read');
    if (activeTab === 'responded')
      return allConsultations.filter((c) => c.status === 'accepted' || c.status === 'declined');
    return allConsultations;
  }, [activeTab, allConsultations]);

  const pendingCount = allConsultations.filter(
    (c) => c.status === 'unread' || c.status === 'read'
  ).length;
  const respondedCount = allConsultations.filter(
    (c) => c.status === 'accepted' || c.status === 'declined'
  ).length;

  const getTabCount = (id: TabId) => {
    if (id === 'all') return allConsultations.length;
    if (id === 'pending') return pendingCount;
    return respondedCount;
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Page Header */}
      <div className="flex items-center gap-3 border-b border-neutral-100 pb-6">
        <div className="bg-orange-100 p-2 rounded-xl">
          <Briefcase size={24} className="text-orange-600" />
        </div>
        <div>
          <h1 className="text-2xl font-black text-neutral-900">お仕事の相談</h1>
          <p className="text-sm text-neutral-700 mt-1">
            あなたの作品を見たクライアントからの相談が届いています。
          </p>
        </div>
      </div>

      <div className="space-y-6">
        {/* Tabs */}
        <div className="flex items-center gap-2 border-b border-neutral-100 pb-px overflow-x-auto no-scrollbar">
          {TAB_CONFIG.map((tab) => {
            const isActive = activeTab === tab.id;
            const count = getTabCount(tab.id);
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-3 text-sm font-bold border-b-2 transition-all whitespace-nowrap ${
                  isActive
                    ? tab.id === 'pending'
                      ? 'border-red-600 text-red-600 bg-red-50/50'
                      : tab.id === 'responded'
                        ? 'border-green-600 text-green-600 bg-green-50/50'
                        : 'border-orange-500 text-orange-600 bg-orange-50/50'
                    : 'border-transparent text-neutral-500 hover:text-neutral-700 hover:bg-neutral-50'
                }`}
              >
                {tab.label}
                <span
                  className={`px-2 py-0.5 rounded-full text-[10px] ${
                    isActive
                      ? tab.id === 'pending'
                        ? 'bg-red-100 text-red-700'
                        : tab.id === 'responded'
                          ? 'bg-green-100 text-green-700'
                          : 'bg-orange-100 text-orange-700'
                      : 'bg-neutral-100 text-neutral-500'
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* 相談リスト */}
        <ul className="space-y-4">
          {filteredConsultations.length > 0 ? (
            filteredConsultations.map((consultation) => (
              <li
                key={consultation.id}
                onClick={() => setSelectedConsultation(consultation)}
                className={`bg-white rounded-2xl border overflow-hidden hover:border-orange-300 transition-colors group cursor-pointer ${
                  consultation.status === 'unread'
                    ? 'border-red-200 ring-1 ring-red-100'
                    : 'border-neutral-200'
                }`}
              >
                <div className="p-6">
                  {/* ステータス + 日付 */}
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      {getStatusBadge(consultation.status)}
                    </div>
                    <span className="flex items-center gap-1 text-xs text-neutral-400">
                      <Calendar size={12} />
                      {consultation.createdAt}
                    </span>
                  </div>

                  {/* 相談タイトル */}
                  <h3 className="text-lg font-bold text-neutral-900 group-hover:text-orange-600 transition-colors mb-3">
                    {consultation.title}
                  </h3>

                  {/* クライアント情報 */}
                  <div className="flex items-center gap-2 mb-4">
                    <img
                      src={consultation.clientAvatarUrl}
                      alt=""
                      className="w-6 h-6 rounded-full border border-neutral-100"
                    />
                    <p className="text-sm text-neutral-600 font-medium">
                      <span className="text-neutral-900">{consultation.clientName}</span>
                      {consultation.clientCompany && (
                        <span className="text-neutral-400 ml-1">
                          （{consultation.clientCompany}）
                        </span>
                      )}
                    </p>
                  </div>

                  {/* 気になった作品 + 条件 */}
                  <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
                    <div className="flex items-center gap-2 text-sm text-neutral-500">
                      <ImageIcon size={14} className="text-orange-400" />
                      <span className="truncate max-w-[200px]">
                        {consultation.portfolioTitle}
                      </span>
                    </div>
                    <div className="flex items-center gap-1 text-sm text-neutral-500">
                      <CircleDollarSign size={14} className="text-neutral-400" />
                      {consultation.budgetRange}
                    </div>
                    {consultation.deadline && (
                      <div className="flex items-center gap-1 text-sm text-neutral-500">
                        <Calendar size={14} className="text-neutral-400" />
                        納期: {consultation.deadline}
                      </div>
                    )}
                  </div>

                  {/* フッター */}
                  <div className="flex justify-end mt-4">
                    <p className="text-sm text-neutral-400 group-hover:text-orange-600 transition-colors flex items-center gap-1">
                      詳細を見る <ChevronRight size={14} />
                    </p>
                  </div>
                </div>
              </li>
            ))
          ) : (
            <div className="py-20 text-center bg-white rounded-2xl border border-neutral-100 shadow-sm">
              <div className="bg-neutral-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Inbox className="text-neutral-300" size={32} />
              </div>
              <p className="text-neutral-500 font-medium">該当する相談はありません</p>
            </div>
          )}
        </ul>
      </div>

      {/* 相談詳細モーダル */}
      {selectedConsultation && (
        <ConsultationDetailModal
          consultation={selectedConsultation}
          onClose={() => setSelectedConsultation(null)}
          onViewClient={(clientId) => {
            setSelectedConsultation(null);
            alert('クライアント情報ページへ遷移します（未実装）');
          }}
          onAccept={(consultationId) => {
            setSelectedConsultation(null);
            alert('相談を承諾しました。メッセージ画面へ遷移します（未実装）');
          }}
        />
      )}
    </div>
  );
}
