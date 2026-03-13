'use client';

import React, { useState, useMemo } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { MOCK_CLIENTS, Project, User } from '@/data/mock-data';
import { PROJECT_STATUS_CONFIG } from '@/data/master-data';
import { MOCK_CREATORS } from '@/data/mock-creators';
import ApplicationDetailModal from '@/components/projects/ApplicationDetailModal';
import { getApplicationByCreatorId } from '@/data/mock-applications';
import {
  ArrowLeft,
  BarChart3,
  Users,
  Eye,
  TrendingUp,
  Star,
  MapPin,
  ExternalLink,
  Calendar,
  Clock,
  MessageSquare,
} from 'lucide-react';

// --- デモ用の閲覧統計データ ---
const DEMO_DAILY_VIEWS = [
  { date: '3/7', views: 18, unique: 14 },
  { date: '3/8', views: 32, unique: 25 },
  { date: '3/9', views: 45, unique: 38 },
  { date: '3/10', views: 28, unique: 22 },
  { date: '3/11', views: 51, unique: 41 },
  { date: '3/12', views: 39, unique: 30 },
  { date: '3/13', views: 42, unique: 35 },
];

const DEMO_STATS = {
  totalViews: 255,
  uniqueViews: 205,
  avgTimeOnPage: '2分30秒',
  bookmarks: 18,
  conversionRate: '4.7%',
};

const DEMO_REFERRERS = [
  { source: '検索結果（トップページ）', count: 120, pct: 47 },
  { source: 'カテゴリ一覧', count: 65, pct: 25 },
  { source: 'おすすめ案件', count: 42, pct: 16 },
  { source: '外部リンク', count: 18, pct: 7 },
  { source: 'その他', count: 10, pct: 5 },
];

// --- タブ定義 ---
const TABS = [
  { id: 'applicants', label: '応募クリエイター', icon: Users },
  { id: 'views', label: '閲覧数・統計', icon: Eye },
] as const;

type TabId = typeof TABS[number]['id'];

export default function ProjectAnalyticsPage() {
  const params = useParams();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<TabId>('applicants');
  const [selectedCreator, setSelectedCreator] = useState<User | null>(null);

  const projectId = parseInt(params.projectId as string);
  const clientId = params.clientId as string;

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

  // applicantUsers がない場合はデモ用にMOCK_CREATORSから割り当て
  const applicants = useMemo(() => {
    if (project?.applicantUsers && project.applicantUsers.length > 0) {
      return project.applicantUsers;
    }
    // デモ用: ランダムにクリエイターを割り当て
    const count = project?.applicants || 3;
    return MOCK_CREATORS.slice(0, Math.min(count, MOCK_CREATORS.length));
  }, [project]);

  if (!project) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen space-y-4">
        <h2 className="text-2xl font-bold text-neutral-900">案件が見つかりません</h2>
        <button onClick={() => router.back()} className="text-blue-600 hover:underline flex items-center gap-1">
          <ArrowLeft size={16} /> 戻る
        </button>
      </div>
    );
  }

  const statusConfig = PROJECT_STATUS_CONFIG[project.status];
  const detailUrl = `/client/${clientId}/project/${projectId}`;

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 pb-16 text-neutral-900">
      {/* ページヘッダー */}
      <div className="mb-8">
        <button
          onClick={() => router.push(detailUrl)}
          className="text-neutral-500 hover:text-neutral-800 flex items-center gap-1 text-sm font-bold transition-colors mb-4"
        >
          <ArrowLeft size={16} /> 案件詳細へ戻る
        </button>
        <h1 className="text-2xl font-bold flex items-center gap-2 text-neutral-800 tracking-tight border-b-2 border-blue-500 pb-2 inline-flex">
          <BarChart3 className="text-blue-500" strokeWidth={3} />
          分析・応募状況
        </h1>
      </div>

      {/* 案件情報カード */}
      <div className="bg-white rounded-xl border border-neutral-200 p-5 mb-8 flex items-start justify-between gap-4">
        <div className="flex-1 min-w-0">
          <h2 className="text-base font-bold text-neutral-800 leading-snug">{project.title}</h2>
          <div className="flex items-center gap-3 mt-2 flex-wrap">
            <span className={`text-xs font-bold px-2 py-0.5 rounded ${statusConfig.bg} ${statusConfig.color}`}>
              {project.statusLabel}
            </span>
            <span className="text-sm text-neutral-500">掲載日: {project.postedDate}</span>
            <span className="text-sm text-neutral-500">締切: {project.deadline}</span>
          </div>
        </div>
        <a
          href={detailUrl}
          className="shrink-0 text-blue-600 hover:text-blue-800 text-sm font-bold flex items-center gap-1"
        >
          詳細 <ExternalLink size={13} />
        </a>
      </div>

      {/* サマリーカード */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
        <div className="bg-white rounded-xl border border-neutral-200 p-4 text-center">
          <div className="flex items-center justify-center gap-1.5 mb-1">
            <Users size={14} className="text-blue-500" />
            <span className="text-xs font-bold text-neutral-500">応募者数</span>
          </div>
          <p className="text-2xl font-bold text-neutral-800">{applicants.length}</p>
        </div>
        <div className="bg-white rounded-xl border border-neutral-200 p-4 text-center">
          <div className="flex items-center justify-center gap-1.5 mb-1">
            <Eye size={14} className="text-green-500" />
            <span className="text-xs font-bold text-neutral-500">総閲覧数</span>
          </div>
          <p className="text-2xl font-bold text-neutral-800">{DEMO_STATS.totalViews}</p>
        </div>
        <div className="bg-white rounded-xl border border-neutral-200 p-4 text-center">
          <div className="flex items-center justify-center gap-1.5 mb-1">
            <TrendingUp size={14} className="text-orange-500" />
            <span className="text-xs font-bold text-neutral-500">応募率</span>
          </div>
          <p className="text-2xl font-bold text-neutral-800">{DEMO_STATS.conversionRate}</p>
        </div>
        <div className="bg-white rounded-xl border border-neutral-200 p-4 text-center">
          <div className="flex items-center justify-center gap-1.5 mb-1">
            <Clock size={14} className="text-purple-500" />
            <span className="text-xs font-bold text-neutral-500">平均滞在時間</span>
          </div>
          <p className="text-2xl font-bold text-neutral-800">{DEMO_STATS.avgTimeOnPage}</p>
        </div>
      </div>

      {/* タブ切替 */}
      <div className="flex items-center gap-2 mb-6 border-b border-neutral-200">
        {TABS.map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-5 py-3 text-sm font-bold transition-colors border-b-2 -mb-px ${
                activeTab === tab.id
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-neutral-500 hover:text-neutral-700'
              }`}
            >
              <Icon size={16} />
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* タブコンテンツ */}
      <div className="bg-white rounded-xl border border-neutral-200 p-6 md:p-8">
        {activeTab === 'applicants' && (
          <ApplicantsTab applicants={applicants} project={project} clientId={clientId} onCreatorClick={(creator) => setSelectedCreator(creator)} />
        )}
        {activeTab === 'views' && (
          <ViewsTab />
        )}
      </div>

      {/* ===== 応募内容モーダル ===== */}
      {selectedCreator && (() => {
        const app = getApplicationByCreatorId(selectedCreator.id);
        if (!app) return null;
        return (
          <ApplicationDetailModal
            creator={selectedCreator}
            application={app}
            onClose={() => setSelectedCreator(null)}
            onViewProfile={(id) => {
              setSelectedCreator(null);
              router.push(`/creator`);
            }}
            onHire={(id) => {
              setSelectedCreator(null);
              alert(`${selectedCreator.name}さんへの発注手続きに進みます（未実装）`);
            }}
          />
        );
      })()}
    </div>
  );
}

// ===== 応募クリエイター一覧タブ =====
function ApplicantsTab({
  applicants,
  project,
  clientId,
  onCreatorClick,
}: {
  applicants: User[];
  project: Project;
  clientId: string;
  onCreatorClick?: (creator: User) => void;
}) {
  if (applicants.length === 0) {
    return (
      <div className="text-center py-16">
        <Users size={40} className="mx-auto text-neutral-300 mb-4" />
        <p className="text-neutral-500 font-bold text-lg mb-1">まだ応募がありません</p>
        <p className="text-neutral-400 text-sm">クリエイターからの応募があるとここに表示されます。</p>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-bold text-neutral-800">
          応募クリエイター <span className="text-blue-500">{applicants.length}</span>名
        </h3>
      </div>
      <div className="space-y-4">
        {applicants.map((creator, idx) => (
          <div
            key={creator.id}
            onClick={() => onCreatorClick?.(creator)}
            className="flex items-start gap-4 p-4 rounded-lg border border-neutral-200 hover:border-blue-200 hover:bg-blue-50/30 transition-all cursor-pointer"
          >
            {/* アバター */}
            <div className="shrink-0">
              <div className="w-12 h-12 rounded-full bg-neutral-200 overflow-hidden">
                <img
                  src={creator.avatarUrl}
                  alt={creator.name}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* クリエイター情報 */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1 flex-wrap">
                <span className="font-bold text-neutral-800">{creator.name}</span>
                {creator.role && (
                  <span className="text-xs bg-slate-100 text-slate-600 px-2 py-0.5 rounded font-bold">
                    {creator.role}
                  </span>
                )}
              </div>

              {/* 評価・レビュー */}
              <div className="flex items-center gap-3 text-sm text-neutral-500 mb-2 flex-wrap">
                {creator.rating && (
                  <span className="flex items-center gap-1">
                    <Star size={13} className="text-amber-400 fill-amber-400" />
                    <span className="font-bold text-neutral-700">{creator.rating}</span>
                    {creator.reviewCount && (
                      <span className="text-neutral-400">({creator.reviewCount}件)</span>
                    )}
                  </span>
                )}
                {creator.location && (
                  <span className="flex items-center gap-1">
                    <MapPin size={13} />
                    {creator.location}
                  </span>
                )}
              </div>

              {/* スキルタグ */}
              {creator.skills && creator.skills.length > 0 && (
                <div className="flex flex-wrap gap-1.5">
                  {creator.skills.slice(0, 5).map((skill) => (
                    <span key={skill} className="text-xs bg-neutral-100 text-neutral-600 px-2 py-0.5 rounded">
                      {skill}
                    </span>
                  ))}
                  {creator.skills.length > 5 && (
                    <span className="text-xs text-neutral-400">+{creator.skills.length - 5}</span>
                  )}
                </div>
              )}
            </div>

            {/* 応募日（デモ） */}
            <div className="shrink-0 text-right">
              <div className="flex items-center gap-1 text-xs text-neutral-400 mb-1">
                <Calendar size={12} />
                応募日
              </div>
              <p className="text-sm font-bold text-neutral-600">
                3/{(7 + idx).toString().padStart(2, '0')}
              </p>
              <div className="mt-2">
                <span className="inline-flex items-center gap-1 text-xs text-blue-600 bg-blue-50 px-2 py-0.5 rounded font-bold">
                  <MessageSquare size={11} />
                  メッセージ
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ===== 閲覧数・統計タブ =====
function ViewsTab() {
  const maxViews = Math.max(...DEMO_DAILY_VIEWS.map(d => d.views));

  return (
    <div>
      <h3 className="text-lg font-bold text-neutral-800 mb-6">閲覧数の推移</h3>

      {/* 簡易棒グラフ */}
      <div className="mb-8">
        <div className="flex items-end gap-3 h-40 px-2">
          {DEMO_DAILY_VIEWS.map((day) => (
            <div key={day.date} className="flex-1 flex flex-col items-center gap-1">
              <span className="text-xs font-bold text-neutral-700">{day.views}</span>
              <div className="w-full flex flex-col gap-0.5">
                <div
                  className="w-full bg-blue-400 rounded-t transition-all"
                  style={{ height: `${(day.views / maxViews) * 100}px` }}
                  title={`総閲覧: ${day.views}`}
                />
                <div
                  className="w-full bg-blue-200 rounded-b transition-all"
                  style={{ height: `${(day.unique / maxViews) * 30}px` }}
                  title={`ユニーク: ${day.unique}`}
                />
              </div>
              <span className="text-xs text-neutral-500 mt-1">{day.date}</span>
            </div>
          ))}
        </div>
        <div className="flex items-center gap-6 mt-4 justify-center">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-blue-400 rounded" />
            <span className="text-xs text-neutral-500 font-bold">総閲覧数</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-blue-200 rounded" />
            <span className="text-xs text-neutral-500 font-bold">ユニーク閲覧数</span>
          </div>
        </div>
      </div>

      {/* 流入元 */}
      <h3 className="text-lg font-bold text-neutral-800 mb-4">流入元</h3>
      <div className="space-y-3 mb-8">
        {DEMO_REFERRERS.map((ref) => (
          <div key={ref.source} className="flex items-center gap-4">
            <span className="text-sm text-neutral-700 w-48 shrink-0 truncate">{ref.source}</span>
            <div className="flex-1 h-5 bg-neutral-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-blue-400 rounded-full transition-all"
                style={{ width: `${ref.pct}%` }}
              />
            </div>
            <span className="text-sm font-bold text-neutral-600 w-16 text-right">{ref.count}件</span>
            <span className="text-xs text-neutral-400 w-10 text-right">{ref.pct}%</span>
          </div>
        ))}
      </div>

      {/* 詳細数値 */}
      <h3 className="text-lg font-bold text-neutral-800 mb-4">詳細統計</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="bg-neutral-50 rounded-lg p-4 border border-neutral-100">
          <p className="text-xs font-bold text-neutral-500 mb-1">総閲覧数</p>
          <p className="text-xl font-bold text-neutral-800">{DEMO_STATS.totalViews} <span className="text-sm font-normal text-neutral-400">views</span></p>
        </div>
        <div className="bg-neutral-50 rounded-lg p-4 border border-neutral-100">
          <p className="text-xs font-bold text-neutral-500 mb-1">ユニーク閲覧数</p>
          <p className="text-xl font-bold text-neutral-800">{DEMO_STATS.uniqueViews} <span className="text-sm font-normal text-neutral-400">unique</span></p>
        </div>
        <div className="bg-neutral-50 rounded-lg p-4 border border-neutral-100">
          <p className="text-xs font-bold text-neutral-500 mb-1">お気に入り登録数</p>
          <p className="text-xl font-bold text-neutral-800">{DEMO_STATS.bookmarks} <span className="text-sm font-normal text-neutral-400">件</span></p>
        </div>
        <div className="bg-neutral-50 rounded-lg p-4 border border-neutral-100">
          <p className="text-xs font-bold text-neutral-500 mb-1">平均滞在時間</p>
          <p className="text-xl font-bold text-neutral-800">{DEMO_STATS.avgTimeOnPage}</p>
        </div>
      </div>
    </div>
  );
}
