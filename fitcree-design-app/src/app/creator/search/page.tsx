'use client';

import React, { useState, useMemo } from 'react';
import {
  Heart,
  MapPin,
  CheckCircle2,
  ChevronDown,
  ChevronRight,
  Building2,
  Lightbulb,
  Target,
  Handshake,
  Timer,
  Eye,
  HelpCircle,
  Users
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import { INDUSTRIES, REQUEST_CATEGORIES } from '../../../../docs/specs/master-data';
import { MOCK_CLIENTS } from '@/data/mock-data';

// --- Types & Adapters ---

// UI表示用の拡張型定義
interface JobCardData {
  id: number;
  client: {
    name: string;
    company: string;
    avatar: string;
    verified: boolean;
  };
  postedAt: string;
  matchRate: number;
  location: string | null;
  desiredDelivery: string;
  title: string;
  description: string; // background から生成
  categoryName: string;
  industries: string[];
  requestType: 'proposal' | 'specified' | 'partner' | undefined;
  isLiked: boolean; // ローカル状態
  views: number;    // ランダム生成
  considering: number; // ランダム生成
}

// データ変換関数
const createJobData = (): JobCardData[] => {
  const jobs: JobCardData[] = [];

  MOCK_CLIENTS.forEach(client => {
    if (!client.projects) return;

    client.projects.forEach(project => {
      // 募集中以外の案件ステータス（選定中、進行中、完了、終了）は表示しない
      if (project.status !== 'recruiting') return;

      // カテゴリIDから名前を解決 (REQUEST_CATEGORIESのインデックスとIDが一致している前提、またはmock-dataの実装依存)
      // mock-data.ts の REQUEST_CATEGORIES は配列なので categoryId がインデックスと仮定
      const categoryName = REQUEST_CATEGORIES[project.categoryId] || 'その他';

      // 納期表示
      let desiredDelivery = '未定';
      if (project.details?.deadlineDate?.type === 'date' && project.details.deadlineDate.value) {
        desiredDelivery = project.details.deadlineDate.value;
      } else if (project.details?.deadlineDate?.type === 'asap') {
        desiredDelivery = 'なるべく早く';
      } else if (project.details?.deadlineDate?.type === 'negotiable') {
        desiredDelivery = '相談して決定';
      }
      // deadline フィールドも参考にする（優先度要検討）
      if (desiredDelivery === '未定' && project.deadline) {
        desiredDelivery = project.deadline;
      }

      // マッチ度（ランダム）
      const matchRate = Math.floor(Math.random() * (100 - 70) + 70);

      // 閲覧数・検討中（ランダム）
      const views = Math.floor(Math.random() * 500 + 50);
      const considering = Math.floor(Math.random() * 20 + 0);

      jobs.push({
        id: project.id,
        client: {
          name: client.name,
          company: client.company || '',
          avatar: client.avatarUrl,
          verified: true, // モックでは全員認証済みとする
        },
        postedAt: project.postedDate, // 日付計算ロジックを入れるとベターだが一旦文字列
        matchRate,
        location: null, // locationデータがないためnull
        desiredDelivery,
        title: project.title,
        description: project.details?.background || '',
        categoryName,
        industries: project.details?.industry || [],
        requestType: project.details?.requestType,
        isLiked: false,
        views,
        considering
      });
    });
  });

  return jobs.sort((a, b) => b.matchRate - a.matchRate); // デフォルトはマッチ度順
};


export default function SearchPage() {
  const router = useRouter();
  // 初期データを生成（本来はuseEffectやServer Componentで取得）
  const [jobs, setJobs] = useState<JobCardData[]>(() => createJobData());

  const [sortOpen, setSortOpen] = useState(false);
  const [activeSort, setActiveSort] = useState("マッチ度順");

  // フィルタ状態
  const [selectedIndustries, setSelectedIndustries] = useState<string[]>([]);

  // フィルタリング処理
  const filteredJobs = useMemo(() => {
    if (selectedIndustries.length === 0) return jobs;
    return jobs.filter(job =>
      job.industries.some(ind => selectedIndustries.includes(ind))
    );
  }, [jobs, selectedIndustries]);

  // ソート処理
  const sortedJobs = useMemo(() => {
    const sorted = [...filteredJobs];
    if (activeSort === "マッチ度順") {
      return sorted.sort((a, b) => b.matchRate - a.matchRate);
    } else if (activeSort === "新着順") {
      // postedAt は文字列 'YYYY/MM/DD' なのでそのまま比較可能だが、降順にする
      return sorted.sort((a, b) => b.postedAt.localeCompare(a.postedAt));
    }
    return sorted;
  }, [filteredJobs, activeSort]);


  const toggleLike = (e: React.MouseEvent, id: number) => {
    e.stopPropagation();
    setJobs(prev => prev.map(job =>
      job.id === id ? { ...job, isLiked: !job.isLiked } : job
    ));
  };

  const handleCardClick = (id: number) => {
    router.push(`/projects/${id}`);
  };

  const toggleIndustryFilter = (industry: string) => {
    setSelectedIndustries(prev =>
      prev.includes(industry)
        ? prev.filter(i => i !== industry)
        : [...prev, industry]
    );
  };

  return (
    <div className="min-h-screen bg-neutral-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-8">

        {/* 左サイドバー */}
        <aside className="w-full md:w-64 flex-shrink-0 space-y-6">
          <h1 className="text-2xl font-bold text-neutral-900 mb-6">仕事を探す</h1>

          <div className="relative">
            <button
              onClick={() => setSortOpen(!sortOpen)}
              className="w-full flex items-center justify-between bg-white border border-neutral-200 rounded-lg px-4 py-2.5 text-sm text-neutral-700 hover:bg-neutral-50 transition-colors"
            >
              <span>{activeSort}</span>
              <ChevronDown className={`w-4 h-4 transition-transform ${sortOpen ? 'rotate-180' : ''}`} />
            </button>

            {sortOpen && (
              <div className="absolute z-10 mt-2 w-full bg-white border border-neutral-200 text-neutral-700 rounded-lg overflow-hidden">
                {["マッチ度順", "新着順"].map((option) => (
                  <button
                    key={option}
                    onClick={() => {
                      setActiveSort(option);
                      setSortOpen(false);
                    }}
                    className="w-full text-left px-4 py-2 text-sm hover:bg-orange-50 hover:text-orange-600 transition-colors"
                  >
                    {option}
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="hidden md:block">
            <h2 className="text-sm font-bold text-neutral-700 uppercase tracking-wider mb-3">業種フィルタ</h2>
            <div className="space-y-2 text-sm text-neutral-600 pr-2">
              {INDUSTRIES.map(industry => (
                <label key={industry} className="flex items-center gap-2 cursor-pointer hover:text-orange-600">
                  <input
                    type="checkbox"
                    className="rounded text-orange-500 focus:ring-orange-500"
                    checked={selectedIndustries.includes(industry)}
                    onChange={() => toggleIndustryFilter(industry)}
                  />
                  {industry}
                </label>
              ))}
            </div>
          </div>

          <div className="bg-orange-50 border border-orange-200 rounded-lg p-4 mb-8 hidden md:block">
            <div className="flex items-start gap-3">
              <div className="text-orange-500 mt-0.5"><HelpCircle size={18} /></div>
              <p className="font-bold text-neutral-600 text-sm mb-3">ポートフォリオを作り込むほどマッチ度が高くなります！</p>
            </div>
            <button className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-4 rounded-lg transition-all transform active:scale-95 text-sm">
              ポートフォリオを作り込む
            </button>
          </div>

        </aside>

        {/* メインフィード */}
        <section className="flex-1 space-y-4">
          {sortedJobs.length === 0 ? (
            <div className="text-center py-20 text-neutral-500">
              条件に一致する案件が見つかりませんでした。
            </div>
          ) : (
            sortedJobs.map((job) => (
              <div
                key={job.id}
                onClick={() => handleCardClick(job.id)}
                className="bg-white rounded-2xl border border-neutral-100 hover:border-orange-200 transition-all p-6 group cursor-pointer"
              >
                <div className="md:flex justify-between gap-4">
                  <div>

                    {/* クライアント情報 */}
                    <div className="flex items-center gap-3 mb-4">
                      <img
                        src={job.client.avatar}
                        alt={job.client.name}
                        className="w-12 h-12 rounded-full bg-neutral-100 border border-neutral-200"
                      />
                      <div>
                        <div className="flex items-center gap-1">
                          <span className="font-bold text-neutral-900">{job.client.name}</span>
                          {job.client.verified && (
                            <CheckCircle2 className="w-4 h-4 text-blue-500 fill-blue-500 text-white" />
                          )}
                        </div>
                        <p className="flex items-center gap-2 text-xs text-neutral-500">
                          <span>{job.client.company}</span>
                          <span>•</span>
                          <span>{job.postedAt}</span>
                        </p>
                      </div>
                    </div>

                    {/* コンテンツ */}
                    <h2 className="text-lg font-bold text-neutral-900 leading-snug mb-2 group-hover:text-orange-600 transition-colors">
                      {job.title}
                    </h2>
                    <p className="md:block hidden text-sm text-neutral-600 mb-5 line-clamp-2">
                      {job.description}
                    </p>

                    <div className="flex flex-wrap items-center gap-2 mb-4">
                      <p className="bg-orange-50 text-neutral-800 px-3 py-1 rounded-full border border-orange-200 text-xs md:text-sm text-orange-500 font-bold">
                        {job.categoryName}
                      </p>

                      {job.industries?.map((ind, i) => (
                        <p key={i} className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full border border-blue-100 text-xs md:text-sm font-bold flex items-center gap-1">
                          <Building2 size={12} />
                          {ind}
                        </p>
                      ))}

                      {job.requestType && (
                        <p className="bg-purple-50 text-purple-700 px-3 py-1 rounded-full border border-purple-100 text-xs md:text-sm font-bold flex items-center gap-1">
                          {job.requestType === 'proposal' ? <Lightbulb size={12} /> :
                            job.requestType === 'specified' ? <Target size={12} /> :
                              <Handshake size={12} />
                          }
                          {job.requestType === 'proposal' ? '提案型' :
                            job.requestType === 'specified' ? '指定型' :
                              '伴走型'}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* マッチ度と希望納期の表示 */}
                  <div className="flex flex-col gap-2 md:items-end">
                    <div className="flex md:flex-col items-center justify-center bg-orange-50 border border-orange-100 rounded-lg p-2 gap-2 md:gap-0 md:min-w-[100px]">
                      <span className="text-sm md:text-xs text-orange-600 font-bold">マッチ度</span>
                      <span className="text-lg md:text-lg font-bold text-orange-600">{job.matchRate}%</span>
                    </div>
                    {job.desiredDelivery === "なるべく早く" && (
                      <div className="flex items-center justify-center gap-1 px-2 py-1 bg-red-50 rounded-lg border border-red-100 text-xs font-bold text-red-600 md:w-full">
                        <Timer className="w-3 h-3" />急ぎ案件
                      </div>
                    )}

                    {job.location && (
                      <div className="flex items-center justify-center gap-1.5 px-3 py-1 bg-blue-50 rounded-lg border border-blue-100 text-[10px] font-bold text-blue-600 md:w-full">
                        <MapPin className="w-3 h-3" />
                        {job.location}
                      </div>
                    )}
                  </div>

                </div>


                {/* アクションバー (SNSメトリクスを追加) */}
                <div className="pt-4 border-t border-neutral-100 flex items-center justify-between">
                  <div className="flex items-center gap-6">
                    {/* お気に入り */}
                    <button
                      onClick={(e) => toggleLike(e, job.id)}
                      className="flex items-center gap-1.5 text-neutral-500 hover:text-pink-500 transition-colors group/btn"
                    >
                      <Heart className={`w-4 h-4 ${job.isLiked ? 'fill-pink-500 text-pink-500' : ''}`} />
                      <span className="text-xs font-bold hidden sm:inline">お気に入り</span>
                    </button>

                    {/* 閲覧数 */}
                    <div className="flex items-center gap-1.5 text-neutral-500">
                      <Eye className="w-4 h-4" />
                      <span className="text-xs font-medium">{job.views} <span className="hidden sm:inline">views</span></span>
                    </div>

                    {/* 検討中 */}
                    <div className="flex items-center gap-1.5 text-neutral-500">
                      <Users className="w-4 h-4" />
                      <span className="text-xs font-medium">{job.considering} <span className="hidden sm:inline">人が検討中</span></span>
                    </div>
                  </div>

                  <div className="flex items-center gap-1 text-xs font-bold text-neutral-500 group-hover:text-orange-500 transition-colors">
                    <span>詳細を見る</span>
                    <ChevronRight className="w-4 h-4" />
                  </div>
                </div>
              </div>
            ))
          )}

          <button className="w-full py-4 text-neutral-500 font-bold hover:bg-white hover rounded-xl transition-all border border-dashed border-neutral-300">
            さらに読み込む
          </button>
        </section>

      </div >
    </div >
  );
}
