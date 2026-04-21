"use client";

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import {
  Calendar,
  ChevronRight,
  Briefcase,
  Users,
  MessageSquare,
  Activity,
  CircleDollarSign,
  Image as ImageIcon,
  Inbox,
  CheckCircle2,
  XCircle,
} from 'lucide-react';
import { MOCK_CLIENTS, Project, MOCK_CREATORS } from '@/data/mock-data';
import { BUDGET_RANGES, REQUEST_CATEGORIES, PROJECT_STATUS_CONFIG } from '@/data/master-data';
import { Consultation, getConsultationsForCreator } from '@/data/mock-consultations';
import ConsultationDetailModal from '@/components/consultations/ConsultationDetailModal';

const CURRENT_CREATOR_ID = MOCK_CREATORS[0].id;
const CURRENT_CREATOR_ID_CONSULTATIONS = 'creator-1';

type SectionId = 'consultations' | 'applications';

const SIDE_NAV_ITEMS: { id: SectionId; label: string; icon: React.ElementType }[] = [
  { id: 'consultations', label: 'お仕事の相談', icon: Briefcase },
  { id: 'applications', label: '応募状況', icon: Activity },
];

// ─── Consultations helpers ───────────────────────────────────────────────────

type ConsultationTabId = 'all' | 'pending' | 'responded';

const CONSULTATION_TAB_CONFIG: { id: ConsultationTabId; label: string }[] = [
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

// ─── Consultations section ────────────────────────────────────────────────────

function ConsultationsSection() {
  const [activeTab, setActiveTab] = useState<ConsultationTabId>('all');
  const [selectedConsultation, setSelectedConsultation] = useState<Consultation | null>(null);

  const allConsultations = useMemo(
    () => getConsultationsForCreator(CURRENT_CREATOR_ID_CONSULTATIONS),
    []
  );

  const filteredConsultations = useMemo(() => {
    if (activeTab === 'all') return allConsultations;
    if (activeTab === 'pending')
      return allConsultations.filter((c) => c.status === 'unread' || c.status === 'read');
    return allConsultations.filter((c) => c.status === 'accepted' || c.status === 'declined');
  }, [activeTab, allConsultations]);

  const getTabCount = (id: ConsultationTabId) => {
    if (id === 'all') return allConsultations.length;
    if (id === 'pending')
      return allConsultations.filter((c) => c.status === 'unread' || c.status === 'read').length;
    return allConsultations.filter((c) => c.status === 'accepted' || c.status === 'declined').length;
  };

  return (
    <>
      <div className="space-y-6">
        {/* Tabs */}
        <div className="flex items-center gap-2 border-b border-neutral-100 pb-px overflow-x-auto no-scrollbar">
          {CONSULTATION_TAB_CONFIG.map((tab) => {
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
                  className={`px-2 py-0.5 rounded-full text-xs ${
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

        <ul className="space-y-4">
          {filteredConsultations.length > 0 ? (
            filteredConsultations.map((consultation) => (
              <li
                key={consultation.id}
                onClick={() => setSelectedConsultation(consultation)}
                className={`bg-white rounded-xl border overflow-hidden hover:border-orange-300 transition-colors group cursor-pointer ${
                  consultation.status === 'unread'
                    ? 'border-red-200 ring-1 ring-red-100'
                    : 'border-neutral-200'
                }`}
              >
                <div className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      {getStatusBadge(consultation.status)}
                    </div>
                    <span className="flex items-center gap-1 text-xs text-neutral-500">
                      <Calendar size={12} />
                      {consultation.createdAt}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-neutral-900 group-hover:text-orange-600 transition-colors mb-3">
                    {consultation.title}
                  </h3>

                  <div className="flex items-center gap-2 mb-4">
                    <img
                      src={consultation.clientAvatarUrl}
                      alt=""
                      className="w-6 h-6 rounded-full border border-neutral-100"
                    />
                    <p className="text-sm text-neutral-600 font-medium">
                      <span className="text-neutral-900">{consultation.clientName}</span>
                      {consultation.clientCompany && (
                        <span className="text-neutral-500 ml-1">（{consultation.clientCompany}）</span>
                      )}
                    </p>
                  </div>

                  <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
                    <div className="flex items-center gap-2 text-sm text-neutral-500">
                      <ImageIcon size={14} className="text-orange-400" />
                      <span className="truncate max-w-[200px]">{consultation.portfolioTitle}</span>
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

                  <div className="flex justify-end mt-4">
                    <p className="text-sm text-neutral-500 group-hover:text-orange-600 transition-colors flex items-center gap-1">
                      詳細を見る <ChevronRight size={14} />
                    </p>
                  </div>
                </div>
              </li>
            ))
          ) : (
            <div className="py-20 text-center bg-white rounded-xl border border-neutral-200">
              <div className="bg-neutral-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Inbox className="text-neutral-300" size={32} />
              </div>
              <p className="text-neutral-500 font-medium">該当する相談はありません</p>
            </div>
          )}
        </ul>
      </div>

      {selectedConsultation && (
        <ConsultationDetailModal
          consultation={selectedConsultation}
          onClose={() => setSelectedConsultation(null)}
          onViewClient={() => {
            setSelectedConsultation(null);
            alert('クライアント情報ページへ遷移します（未実装）');
          }}
          onAccept={(consultationId) => {
            setSelectedConsultation(null);
            alert('相談を承諾しました。メッセージ画面へ遷移します（未実装）');
          }}
        />
      )}
    </>
  );
}

// ─── Applications section ─────────────────────────────────────────────────────

type AppTabId = 'all' | 'applied' | 'in_progress' | 'closed';

const APP_TAB_CONFIG: { label: string; id: AppTabId }[] = [
  { label: 'すべて', id: 'all' },
  { label: '応募中', id: 'applied' },
  { label: '進行中', id: 'in_progress' },
  { label: '完了', id: 'closed' },
];

function ApplicationsSection() {
  const [activeTab, setActiveTab] = useState<AppTabId>('all');

  const allApplications = useMemo(() => {
    const apps: { project: Project; clientName: string; clientCompany?: string; avatarUrl?: string }[] = [];
    MOCK_CLIENTS.forEach(client => {
      if (client.projects) {
        client.projects.forEach(project => {
          const isApplicant = project.applicantUsers?.some(u => u.id === CURRENT_CREATOR_ID);
          const isAssigned = project.assignedUsers?.some(u => u.id === CURRENT_CREATOR_ID);
          if (isApplicant || isAssigned) {
            apps.push({ project, clientName: client.name, clientCompany: client.company, avatarUrl: client.avatarUrl });
          }
        });
      }
    });
    return apps.sort((a, b) => b.project.id - a.project.id);
  }, []);

  const filteredApps = useMemo(() => {
    if (activeTab === 'all') return allApplications;
    if (activeTab === 'applied')
      return allApplications.filter(a => a.project.status === 'recruiting' || a.project.status === 'selection');
    if (activeTab === 'in_progress')
      return allApplications.filter(a => a.project.status === 'in_progress');
    if (activeTab === 'closed')
      return allApplications.filter(a => a.project.status === 'completed' || a.project.status === 'closed');
    return allApplications;
  }, [activeTab, allApplications]);

  const getCount = (id: AppTabId) => {
    if (id === 'all') return allApplications.length;
    if (id === 'applied') return allApplications.filter(a => a.project.status === 'recruiting' || a.project.status === 'selection').length;
    if (id === 'in_progress') return allApplications.filter(a => a.project.status === 'in_progress').length;
    return allApplications.filter(a => a.project.status === 'completed' || a.project.status === 'closed').length;
  };

  return (
    <div className="space-y-6">
      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-neutral-100 pb-px overflow-x-auto no-scrollbar">
        {APP_TAB_CONFIG.map((tab) => {
          const isActive = activeTab === tab.id;
          const count = getCount(tab.id);
          const activeColor =
            tab.id === 'applied' ? 'border-red-600 text-red-600 bg-red-50/50' :
            tab.id === 'in_progress' ? 'border-blue-600 text-blue-600 bg-blue-50/50' :
            tab.id === 'closed' ? 'border-green-600 text-green-600 bg-green-50/50' :
            'border-orange-500 text-orange-600 bg-orange-50/50';
          const activeBadge =
            tab.id === 'applied' ? 'bg-red-100 text-red-700' :
            tab.id === 'in_progress' ? 'bg-blue-100 text-blue-700' :
            tab.id === 'closed' ? 'bg-green-100 text-green-700' :
            'bg-orange-100 text-orange-700';
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-3 text-sm font-bold border-b-2 transition-all whitespace-nowrap ${
                isActive ? activeColor : 'border-transparent text-neutral-500 hover:text-neutral-700 hover:bg-neutral-50'
              }`}
            >
              {tab.label}
              <span className={`px-2 py-0.5 rounded-full text-xs ${isActive ? activeBadge : 'bg-neutral-100 text-neutral-500'}`}>
                {count}
              </span>
            </button>
          );
        })}
      </div>

      <ul className="space-y-4">
        {filteredApps.length > 0 ? (
          filteredApps.map(({ project, clientName, clientCompany, avatarUrl }) => (
            <li key={project.id} className="bg-white rounded-xl border border-neutral-200 overflow-hidden hover:border-orange-300 transition-colors group">
              <Link href={`/projects/${project.id}`} className="p-6 block">
                <div className="flex items-start justify-between gap-4 mb-4">
                  <div className="space-y-4">
                    <div className="flex flex-wrap items-center gap-4">
                      <div className='flex items-center gap-4'>
                        <div className="flex items-center gap-2">
                          <p className={`text-sm font-bold px-2 py-0.5 rounded uppercase tracking-wider ${
                            (project.status === 'recruiting' || project.status === 'selection') ? PROJECT_STATUS_CONFIG.recruiting.bg : project.status === 'in_progress' ? PROJECT_STATUS_CONFIG.in_progress.bg : PROJECT_STATUS_CONFIG.completed.bg
                          } ${
                            (project.status === 'recruiting' || project.status === 'selection') ? PROJECT_STATUS_CONFIG.recruiting.color : project.status === 'in_progress' ? PROJECT_STATUS_CONFIG.in_progress.color : PROJECT_STATUS_CONFIG.completed.color
                          }`}>
                            {(project.status === 'recruiting' || project.status === 'selection')
                              ? '応募中'
                              : (project.status === 'completed' || project.status === 'closed')
                                ? '完了'
                                : PROJECT_STATUS_CONFIG[project.status].label}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-1 text-sm text-neutral-500">
                        <Calendar size={14} />
                        応募日: {project.postedDate}
                      </div>
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-neutral-900 group-hover:text-orange-600 transition-colors">
                        {project.title}
                      </h3>
                      <p>
                        <span className="bg-orange-50 text-orange-500 px-3 py-0.5 rounded-full border border-orange-100 text-xs font-bold">
                          {REQUEST_CATEGORIES[project.categoryId]}
                        </span>
                      </p>
                    </div>
                  </div>

                  {project.status === 'in_progress' && (
                    <div className="flex items-center gap-2 flex-shrink-0">
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
                  <p className="text-sm text-neutral-500 group-hover:text-orange-600 transition-colors flex items-center gap-1">
                    詳細を確認 <ChevronRight size={14} />
                  </p>
                </div>
              </Link>
            </li>
          ))
        ) : (
          <div className="py-20 text-center bg-white rounded-xl border border-neutral-200">
            <div className="bg-neutral-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Briefcase className="text-neutral-300" size={32} />
            </div>
            <p className="text-neutral-500 font-medium">該当する案件はありません</p>
          </div>
        )}
      </ul>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function CreatorActivityPage() {
  const [activeSection, setActiveSection] = useState<SectionId>('consultations');

  const currentItem = SIDE_NAV_ITEMS.find(i => i.id === activeSection)!;

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="flex flex-col md:flex-row gap-8">

        {/* 左サイドナビゲーション */}
        <aside className="md:w-48 flex-shrink-0">
          <nav className="flex flex-col space-y-1">
            {SIDE_NAV_ITEMS.map((item) => {
              const isActive = item.id === activeSection;
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveSection(item.id)}
                  className={`flex items-center gap-2 w-full text-left px-4 py-3 text-sm transition-colors ${
                    isActive
                      ? 'font-bold bg-orange-50 text-orange-600 border-l-4 border-orange-500'
                      : 'font-medium text-neutral-600 hover:bg-neutral-100'
                  }`}
                >
                  <Icon size={16} className={isActive ? 'text-orange-500' : 'text-neutral-400'} />
                  {item.label}
                </button>
              );
            })}
          </nav>
        </aside>

        {/* メインコンテンツ */}
        <main className="flex-1 min-w-0 space-y-6">
          {/* セクションヘッダー */}
          <div className="flex items-center gap-3 border-b border-neutral-200 pb-5">
            <div className="bg-orange-100 p-2 rounded-xl">
              <currentItem.icon size={22} className="text-orange-600" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-neutral-900">{currentItem.label}</h1>
              <p className="text-sm text-neutral-500 mt-0.5">
                {activeSection === 'consultations'
                  ? 'あなたの作品を見たクライアントからの相談が届いています。'
                  : 'これまでに提案・応募した案件の現在のステータスを確認できます。'}
              </p>
            </div>
          </div>

          {activeSection === 'consultations' ? <ConsultationsSection /> : <ApplicationsSection />}
        </main>

      </div>
    </div>
  );
}
