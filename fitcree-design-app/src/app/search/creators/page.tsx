"use client";

import React, { useState, useMemo } from 'react';
import { Search, MapPin, Send, Check, X, ChevronDown, Images } from 'lucide-react';
import { MOCK_CREATORS } from '@/data/mock-data';
import { MOCK_WORKS } from '@/data/mock-works';
import { REQUEST_CATEGORIES, INDUSTRIES } from '@/data/master-data';
import CategoryBadge, { CATEGORY_ICONS } from '@/components/common/CategoryBadge';
import Link from 'next/link';

// クリエイターの役職をリクエストカテゴリにマッピング
const ROLE_TO_CATEGORY: Record<string, string> = {
  'イラストレーター': 'イラスト',
  'UI/UXデザイナー': 'Webサイト',
  'コンテンツライター': 'ライティング・編集',
  'フォトグラファー': '写真',
  '映像クリエイター': '動画',
  'フロントエンドエンジニア': 'エンジニアリング',
  'サウンドデザイナー': '音楽・サウンド',
  'グラフィックデザイナー': 'グラフィック',
  'ナレーター/声優': '声・パフォーマンス',
  '翻訳家/コーディネーター': 'その他',
};

// 用途（分野横断の代表的な用途）
const USAGE_OPTIONS = [
  'SNS・Web投稿',
  'LP・コーポレートサイト',
  '広告・プロモーション',
  '印刷物・チラシ',
  'ブランディング・CI/VI',
  'アプリ・UI',
  '採用・企業紹介',
  'EC・商品紹介',
  'イベント・展示会',
  'エンタメ・コンテンツ',
];

// テイスト（作風）
const STYLE_TAGS = [
  'シンプル・ミニマル',
  'ポップ・かわいい',
  'クール・スタイリッシュ',
  'ナチュラル・温かみ',
  'プロ・ビジネス向け',
  'クリエイティブ・個性的',
];

// 対応条件
const CONDITION_TAGS = [
  'インボイス対応',
  'NDA対応',
  '本人確認済み',
  'スピード対応（3日以内）',
  '丁寧なヒアリング',
  '修正対応◎',
  'ディレクション込み',
  'リモート完結',
];

// デモ用サムネイル（作品のないクリエイター向け補完）
const DEMO_THUMBS = [
  'https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&w=400&q=80',
  'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=400&q=80',
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
  'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=400&q=80',
  'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&w=400&q=80',
  'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=400&q=80',
  'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?auto=format&fit=crop&w=400&q=80',
  'https://images.unsplash.com/photo-1504711434969-e33886168f5c?auto=format&fit=crop&w=400&q=80',
  'https://images.unsplash.com/photo-1452802447250-470a88ac82bc?auto=format&fit=crop&w=400&q=80',
  'https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&w=400&q=80',
];

// クリエイターの最終作品投稿日（デモ: 新着順ソートに使用）
const CREATOR_LAST_WORK_DATE: Record<string, string> = {
  'creator-1': '2026/04/05',
  'creator-2': '2026/04/03',
  'creator-3': '2026/03/28',
  'creator-4': '2026/03/20',
  'creator-5': '2026/03/10',
  'creator-6': '2026/02/25',
  'creator-7': '2026/02/14',
  'creator-8': '2026/01/30',
  'creator-9': '2026/01/15',
  'creator-10': '2025/12/20',
};

// 直近14日以内かどうか（NEW判定）
const NEW_THRESHOLD_DAYS = 14;
const TODAY = new Date('2026-04-06');
function isNew(dateStr: string): boolean {
  if (!dateStr) return false;
  const d = new Date(dateStr.replace(/\//g, '-'));
  return (TODAY.getTime() - d.getTime()) / (1000 * 60 * 60 * 24) <= NEW_THRESHOLD_DAYS;
}

// 作品ごとの[用途, 業界]タグ（3枚分）。未定義のクリエイターはデフォルトタグを繰り返す
const CREATOR_PER_WORK_TAGS: Record<string, [string, string][]> = {
  'creator-1': [
    ['コーポレートサイト', '飲食'],
    ['SNS・Web投稿', '旅行・観光'],
    ['キャラクターイラスト', 'メディア・エンタメ'],
  ],
};

// 各クリエイターの代表的な用途・業界タグ（作品画像上に表示）
const CREATOR_USAGE_TAG: Record<string, string> = {
  'creator-1': 'キャラクター商品',
  'creator-2': 'LP・コーポレート',
  'creator-3': 'SNS・Web投稿',
  'creator-4': 'EC・商品紹介',
  'creator-5': '広告・プロモーション',
  'creator-6': 'アプリ・UI',
  'creator-7': 'エンタメ・コンテンツ',
  'creator-8': 'ブランディング',
  'creator-9': '採用・企業紹介',
  'creator-10': '海外展開支援',
};
const CREATOR_INDUSTRY_TAG: Record<string, string> = {
  'creator-1': 'エンタメ',
  'creator-2': 'IT・SaaS',
  'creator-3': 'メディア',
  'creator-4': '飲食',
  'creator-5': 'エンタメ',
  'creator-6': 'IT・SaaS',
  'creator-7': 'ゲーム',
  'creator-8': '小売・EC',
  'creator-9': 'メディア',
  'creator-10': '製造業',
};

// 作品タグ（ツールではなく、仕事の種類・スタイル）
const CREATOR_WORK_TAGS: Record<string, string[]> = {
  'creator-1': ['キャラクターデザイン', '背景作画', '女性向け'],
  'creator-2': ['Webデザイン', 'モバイルUI', 'ユーザー体験'],
  'creator-3': ['取材記事', 'SEOライティング', '編集'],
  'creator-4': ['商品撮影', '宣材写真', 'ポートレート'],
  'creator-5': ['動画編集', 'モーショングラフィックス', 'YouTube向け'],
  'creator-6': ['LP制作', 'Webアプリ開発', 'パフォーマンス最適化'],
  'creator-7': ['作曲', '効果音制作', 'ゲームBGM'],
  'creator-8': ['ロゴ作成', 'パンフレット', '和風デザイン'],
  'creator-9': ['キャラクターボイス', 'ナレーション', 'アニメ'],
  'creator-10': ['英訳', '海外進出支援', 'ビジネス翻訳'],
};

// キャッチフレーズ（デモ）
const CATCHPHRASES: Record<string, string> = {
  'creator-1': 'キャラクターに命を吹き込む、物語のあるイラストを。',
  'creator-2': 'ユーザーの迷いをなくす、本質を捉えたUI設計で、クライアントの課題を一挙に解決し、満足いく成果物を提供します。',
  'creator-3': '取材の現場から、言葉で伝える力を磨いてきました。',
  'creator-4': '自然光が生む透明感。料理・プロダクトの魅力を最大限に。',
  'creator-5': 'テンポと熱量で、視聴者の心を動かす映像を作ります。',
  'creator-6': 'デザインの意図をコードに正確に。性能と品質を両立します。',
  'creator-7': '世界観に没入させる、ゲーム・映像のサウンドデザイン。',
  'creator-8': '和のエッセンスを現代に。記憶に残るグラフィックを。',
  'creator-9': '幅広い声域で、あなたのコンテンツを彩ります。',
  'creator-10': '北米ビジネス経験を活かし、海外進出を全力でサポート。',
};

function FilterSection({
  label,
  expanded,
  onToggle,
  activeCount = 0,
  children,
}: {
  label: string;
  expanded: boolean;
  onToggle: () => void;
  activeCount?: number;
  children: React.ReactNode;
}) {
  return (
    <div className="bg-white rounded-2xl border border-neutral-200 overflow-hidden">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between px-4 py-3 border-b border-neutral-100"
      >
        <div className="flex items-center gap-2">
          <p className="text-xs font-bold text-neutral-500 uppercase tracking-wide">{label}</p>
          {activeCount > 0 && (
            <span className="text-[10px] font-bold bg-orange-500 text-white rounded-full w-4 h-4 flex items-center justify-center">
              {activeCount}
            </span>
          )}
        </div>
        <ChevronDown
          size={14}
          className={`text-neutral-400 transition-transform ${expanded ? 'rotate-180' : ''}`}
        />
      </button>
      {expanded && children}
    </div>
  );
}

function ActiveTag({ label, onRemove }: { label: string; onRemove: () => void }) {
  return (
    <span className="inline-flex items-center gap-1 text-xs font-bold bg-orange-50 text-orange-600 border border-orange-200 px-2.5 py-1 rounded-full">
      {label}
      <button onClick={onRemove} className="hover:text-orange-800">
        <X size={10} />
      </button>
    </span>
  );
}

export default function CreatorsSearchPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('すべて');
  const [activeUsages, setActiveUsages] = useState<string[]>([]);
  const [activeIndustries, setActiveIndustries] = useState<string[]>([]);
  const [activeStyleTags, setActiveStyleTags] = useState<string[]>([]);
  const [activeConditions, setActiveConditions] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState<'recommended' | 'newest'>('recommended');
  const [expandedSections, setExpandedSections] = useState({
    category: false,
    usage: false,
    industry: false,
    taste: false,
    conditions: false,
  });

  const toggleTag = (tag: string, list: string[], setter: (v: string[]) => void) => {
    setter(list.includes(tag) ? list.filter(t => t !== tag) : [...list, tag]);
  };

  const toggleSection = (key: keyof typeof expandedSections) => {
    setExpandedSections(s => ({ ...s, [key]: !s[key] }));
  };

  const hasActiveFilters =
    activeCategory !== 'すべて' ||
    activeUsages.length > 0 ||
    activeIndustries.length > 0 ||
    activeStyleTags.length > 0 ||
    activeConditions.length > 0 ||
    searchQuery.trim() !== '';

  const resetAllFilters = () => {
    setActiveCategory('すべて');
    setActiveUsages([]);
    setActiveIndustries([]);
    setActiveStyleTags([]);
    setActiveConditions([]);
    setSearchQuery('');
  };

  const filteredCreators = useMemo(() => {
    let result = [...MOCK_CREATORS];
    if (activeCategory !== 'すべて') {
      result = result.filter(c => {
        const cat = c.role ? ROLE_TO_CATEGORY[c.role] : '';
        return cat === activeCategory;
      });
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(c =>
        c.name.toLowerCase().includes(q) ||
        c.role?.toLowerCase().includes(q) ||
        c.description?.toLowerCase().includes(q) ||
        c.skills?.some(s => s.toLowerCase().includes(q))
      );
    }
    if (sortBy === 'newest') {
      result = [...result].sort((a, b) => {
        const da = new Date((CREATOR_LAST_WORK_DATE[a.id] ?? '2000/01/01').replace(/\//g, '-'));
        const db = new Date((CREATOR_LAST_WORK_DATE[b.id] ?? '2000/01/01').replace(/\//g, '-'));
        return db.getTime() - da.getTime();
      });
    }
    return result;
  }, [activeCategory, searchQuery, sortBy, activeStyleTags, activeUsages, activeIndustries, activeConditions]);

  const allCategories = ['すべて', ...REQUEST_CATEGORIES];

  return (
    <div className="bg-neutral-50">
      {/* ページタイトル帯 */}
      <div>
        <div className="max-w-7xl mx-auto px-4 sm:px-8 py-6">
          <h1 className="text-xl font-bold text-neutral-900 font-outfit">クリエイターを探す</h1>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-8 pb-8">
        <div className="flex gap-6 items-start">

          {/* ──────────────────────────────
              左カラム: 検索 + フィルター
          ────────────────────────────── */}
          <aside className="hidden lg:block w-60 xl:w-64 flex-shrink-0 sticky top-20 space-y-3">

            {/* 検索ボックス */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" size={15} />
              <input
                type="text"
                placeholder="キーワードで検索"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="w-full bg-white border border-neutral-200 rounded-xl py-2.5 pl-9 pr-8 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400/30 focus:border-orange-400 transition-all"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-600"
                >
                  <X size={13} />
                </button>
              )}
            </div>

            {/* 作るもの（分野） */}
            <FilterSection
              label="作るもの（分野）"
              expanded={expandedSections.category}
              onToggle={() => toggleSection('category')}
            >
              <div className="p-2">
                {allCategories.map(cat => {
                  const isActive = activeCategory === cat;
                  const Icon = cat !== 'すべて' ? CATEGORY_ICONS[cat] : null;
                  return (
                    <button
                      key={cat}
                      onClick={() => setActiveCategory(cat)}
                      className={`w-full flex items-center gap-2 px-3 py-2 rounded-xl text-sm transition-all text-left ${
                        isActive
                          ? 'bg-orange-50 text-orange-600 font-bold'
                          : 'text-neutral-600 hover:bg-neutral-50 font-medium'
                      }`}
                    >
                      {Icon && <Icon size={13} className={isActive ? 'text-orange-500' : 'text-neutral-400'} />}
                      {!Icon && <span className="w-[13px]" />}
                      {cat}
                      {isActive && <span className="ml-auto w-1.5 h-1.5 rounded-full bg-orange-500" />}
                    </button>
                  );
                })}
              </div>
            </FilterSection>

            {/* 用途 */}
            <FilterSection
              label="用途"
              expanded={expandedSections.usage}
              onToggle={() => toggleSection('usage')}
              activeCount={activeUsages.length}
            >
              <div className="p-3 flex flex-wrap gap-2">
                {USAGE_OPTIONS.map(tag => (
                  <button
                    key={tag}
                    onClick={() => toggleTag(tag, activeUsages, setActiveUsages)}
                    className={`text-xs px-2.5 py-1 rounded-full border font-medium transition-all ${
                      activeUsages.includes(tag)
                        ? 'bg-orange-500 text-white border-orange-500'
                        : 'bg-white border-neutral-200 text-neutral-500 hover:border-orange-300 hover:text-orange-500'
                    }`}
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </FilterSection>

            {/* 業界 */}
            <FilterSection
              label="業界"
              expanded={expandedSections.industry}
              onToggle={() => toggleSection('industry')}
              activeCount={activeIndustries.length}
            >
              <div className="p-3 flex flex-wrap gap-2">
                {INDUSTRIES.map(ind => (
                  <button
                    key={ind}
                    onClick={() => toggleTag(ind, activeIndustries, setActiveIndustries)}
                    className={`text-xs px-2.5 py-1 rounded-full border font-medium transition-all ${
                      activeIndustries.includes(ind)
                        ? 'bg-orange-500 text-white border-orange-500'
                        : 'bg-white border-neutral-200 text-neutral-500 hover:border-orange-300 hover:text-orange-500'
                    }`}
                  >
                    {ind}
                  </button>
                ))}
              </div>
            </FilterSection>

            {/* テイスト */}
            <FilterSection
              label="テイスト"
              expanded={expandedSections.taste}
              onToggle={() => toggleSection('taste')}
              activeCount={activeStyleTags.length}
            >
              <div className="p-3 flex flex-wrap gap-2">
                {STYLE_TAGS.map(tag => (
                  <button
                    key={tag}
                    onClick={() => toggleTag(tag, activeStyleTags, setActiveStyleTags)}
                    className={`text-xs px-2.5 py-1 rounded-full border font-medium transition-all ${
                      activeStyleTags.includes(tag)
                        ? 'bg-orange-500 text-white border-orange-500'
                        : 'bg-white border-neutral-200 text-neutral-500 hover:border-orange-300 hover:text-orange-500'
                    }`}
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </FilterSection>

            {/* 対応条件 */}
            <FilterSection
              label="対応条件"
              expanded={expandedSections.conditions}
              onToggle={() => toggleSection('conditions')}
              activeCount={activeConditions.length}
            >
              <div className="p-3 flex flex-wrap gap-2">
                {CONDITION_TAGS.map(tag => (
                  <button
                    key={tag}
                    onClick={() => toggleTag(tag, activeConditions, setActiveConditions)}
                    className={`text-xs px-2.5 py-1 rounded-full border font-medium transition-all ${
                      activeConditions.includes(tag)
                        ? 'bg-orange-500 text-white border-orange-500'
                        : 'bg-white border-neutral-200 text-neutral-500 hover:border-orange-300 hover:text-orange-500'
                    }`}
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </FilterSection>

            {/* フィルターリセット */}
            {hasActiveFilters && (
              <button
                onClick={resetAllFilters}
                className="w-full text-xs text-neutral-500 hover:text-orange-500 transition-colors py-1 flex items-center justify-center gap-1"
              >
                <X size={12} />
                フィルターをリセット
              </button>
            )}
          </aside>

          {/* ──────────────────────────────
              右カラム: 結果一覧
          ────────────────────────────── */}
          <div className="flex-1 min-w-0 space-y-4">

            {/* モバイル検索バー */}
            <div className="lg:hidden relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" size={16} />
              <input
                type="text"
                placeholder="名前・スキル・キーワードで検索"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="w-full bg-white border border-neutral-200 rounded-xl py-2.5 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400/30 focus:border-orange-400 transition-all"
              />
            </div>

            {/* モバイル用カテゴリータブ */}
            <div className="lg:hidden flex gap-2 overflow-x-auto pb-0.5 scrollbar-hide -mx-4 px-4">
              {allCategories.map(cat => {
                const isActive = activeCategory === cat;
                const Icon = cat !== 'すべて' ? CATEGORY_ICONS[cat] : null;
                return (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`flex-shrink-0 inline-flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-bold transition-all ${
                      isActive
                        ? 'bg-orange-500 text-white shadow-sm'
                        : 'bg-white border border-neutral-200 text-neutral-500'
                    }`}
                  >
                    {Icon && <Icon size={11} />}
                    {cat}
                  </button>
                );
              })}
            </div>

            {/* 件数 + ソート + アクティブフィルター表示 */}
            <div className="flex items-center justify-between gap-3 flex-wrap">
              <div className="flex items-center gap-2 flex-wrap">
                <p className="text-sm text-neutral-500">
                  <span className="text-neutral-900 font-bold text-base">{filteredCreators.length}</span>
                  <span className="ml-1">名のクリエイター</span>
                </p>
                {/* アクティブフィルタータグ表示 */}
                {activeCategory !== 'すべて' && (
                  <ActiveTag label={activeCategory} onRemove={() => setActiveCategory('すべて')} />
                )}
                {[...activeUsages, ...activeIndustries, ...activeStyleTags, ...activeConditions].map(tag => {
                  const remove = () => {
                    if (activeUsages.includes(tag)) toggleTag(tag, activeUsages, setActiveUsages);
                    else if (activeIndustries.includes(tag)) toggleTag(tag, activeIndustries, setActiveIndustries);
                    else if (activeStyleTags.includes(tag)) toggleTag(tag, activeStyleTags, setActiveStyleTags);
                    else toggleTag(tag, activeConditions, setActiveConditions);
                  };
                  return <ActiveTag key={tag} label={tag} onRemove={remove} />;
                })}
              </div>

              <select
                value={sortBy}
                onChange={e => setSortBy(e.target.value as typeof sortBy)}
                className="bg-white border border-neutral-200 text-sm font-bold text-neutral-600 rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400/30 cursor-pointer"
              >
                <option value="recommended">おすすめ順</option>
                <option value="newest">新作品順</option>
              </select>
            </div>

            {/* クリエイターカード */}
            {filteredCreators.length > 0 ? (
              <div className="space-y-4">
                {filteredCreators.map((creator, idx) => {
                  const creatorWorks = MOCK_WORKS.filter(w => w.creatorId === creator.id);
                  const worksToShow = (creatorWorks.length > 0
                    ? creatorWorks.slice(0, 3)
                    : DEMO_THUMBS.slice((idx * 3) % DEMO_THUMBS.length, ((idx * 3) % DEMO_THUMBS.length) + 3).map((url, i) => ({
                        id: `demo-${creator.id}-${i}`,
                        creatorId: creator.id,
                        title: '',
                        thumbnailUrl: url,
                        category: 'graphic' as const,
                        categoryLabel: creator.role ? (ROLE_TO_CATEGORY[creator.role] ?? '') : '',
                        isLiked: false,
                        createdDate: i === 0 ? (CREATOR_LAST_WORK_DATE[creator.id] ?? '') : '',
                      }))).slice(0, 3);
                  // 各画像に表示する[用途, 業界]タグ（画像ごとに異なる）
                  const perWorkTags: [string, string][] = CREATOR_PER_WORK_TAGS[creator.id]
                    ?? Array(3).fill([CREATOR_USAGE_TAG[creator.id] ?? '', CREATOR_INDUSTRY_TAG[creator.id] ?? '']);
                  const workCount = worksToShow.length;
                  const creatorCategory = creator.role ? ROLE_TO_CATEGORY[creator.role] : null;
                  const catchphrase = CATCHPHRASES[creator.id] || creator.description || '';

                  return (
                    <article
                      key={creator.id}
                      className="bg-white rounded-2xl border border-neutral-200 hover:border-orange-200 hover:shadow-sm transition-all group relative"
                    >
                      {/* カード全体のリンク（z-10でコンテンツの上に重ねる） */}
                      <Link
                        href={`/client/creators/${creator.id}`}
                        className="absolute inset-0 z-10 rounded-2xl"
                        aria-label={`${creator.name}のプロフィールを見る`}
                      />

                      <div className="relative z-20 px-5 pt-4 pb-5 pointer-events-none">
                        {/* ── 上段: アバター + プロフィール + CTA ── */}
                        <div className="flex gap-4">
                          <div className="flex-shrink-0">
                            <img
                              src={creator.avatarUrl}
                              alt={creator.name}
                              className="w-14 h-14 rounded-xl object-cover bg-neutral-100 border border-neutral-100"
                            />
                          </div>

                          <div className="flex-1 min-w-0">
                            <div className="flex items-start justify-between gap-2">
                              <div className="min-w-0">
                                <div className="flex items-center gap-4 flex-wrap">
                                  <h2 className="font-bold text-neutral-900 group-hover:text-orange-600 transition-colors">
                                    {creator.name}
                                  </h2>
                                  {creator.role && (
                                    <span className="text-xs text-neutral-500 font-medium flex-shrink-0">
                                      {creator.role}
                                    </span>
                                  )}
                                </div>
                                {/* キャッチフレーズ */}
                                <p className="text-sm text-neutral-600 mt-2 line-clamp-1 font-medium">
                                  "{catchphrase}"
                                </p>
                              </div>

                              {/* CTA（デスクトップ） */}
                              <Link
                                href={`/client/creators/${creator.id}/consult`}
                                className="hidden sm:inline-flex flex-shrink-0 items-center gap-1.5 px-4 py-2 text-xs font-bold text-white bg-blue-600 rounded-xl hover:bg-blue-700 transition-colors relative z-30 pointer-events-auto"
                              >
                                <Send size={11} />
                                相談する
                              </Link>
                            </div>

                            {/* ── 下段: スキルタグ + 信頼バッジ ── */}
                        <div className="mt-2 flex items-center gap-2 flex-wrap">
                          <div className="flex flex-wrap items-center gap-1.5">
                            <span className="flex items-center gap-1 text-xs text-neutral-500">
                              作品12件
                            </span>
                            {/* <span className="text-neutral-200 text-xs">|</span>
                            {(CREATOR_WORK_TAGS[creator.id] ?? []).map(tag => (
                              <span
                                key={tag}
                                className="text-xs text-neutral-500 bg-neutral-100 px-2.5 py-0.5 rounded-full font-medium"
                              >
                                {tag}
                              </span>
                            ))} */}
                          </div>
                          <div className="hidden md:flex items-center gap-2 text-xs text-neutral-500 flex-shrink-0">
                          <span className="text-neutral-200">|</span>
                            {creator.location && (
                              <span className="flex items-center gap-0.5">
                                <MapPin size={10} />
                                {creator.location}
                              </span>
                            )}
                            <span className="flex items-center gap-0.5">
                              <Check size={10} className="text-green-500" />
                              本人確認
                            </span>
                            <span className="flex items-center gap-0.5">
                              <Check size={10} className="text-green-500" />
                              NDA
                            </span>
                            <span className="flex items-center gap-0.5">
                              <Check size={10} className="text-green-500" />
                              インボイス
                            </span>
                          </div>
                        </div>

                          </div>
                        </div>

                        {/* ── 中段: ポートフォリオサムネイル ── */}
                        {workCount > 0 && (
                          <div className="mt-4">
                            {/* モバイル: 横スクロール / md以上: 3列グリッド */}
                            <div className="flex gap-2 overflow-x-auto pb-1 md:grid md:grid-cols-3 md:overflow-visible md:pb-0 scrollbar-hide">
                              {worksToShow.map((work, i) => (
                                <div
                                  key={work.id}
                                  className="flex-shrink-0 w-52 md:w-auto aspect-[4/3] rounded-xl overflow-hidden bg-neutral-100 relative"
                                >
                                  <img
                                    src={work.thumbnailUrl}
                                    alt={work.title}
                                    className="w-full h-full object-cover"
                                  />
                                  <div className="absolute bottom-1.5 left-1.5 flex flex-wrap gap-0.5">
                                    {(perWorkTags[i] ?? []).filter(Boolean).map(tag => (
                                      <span key={tag} className="text-xs font-medium bg-black/40 text-white px-1 py-0.5 rounded-md">
                                        {tag}
                                      </span>
                                    ))}
                                  </div>
                                  {isNew(work.createdDate) && (
                                    <span className="absolute top-1.5 left-1.5 text-xs font-medium bg-orange-500 text-white px-1.5 py-0.5 rounded-full leading-none">
                                      NEW
                                    </span>
                                  )}
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                      

                        {/* CTA（モバイル） */}
                        <div className="sm:hidden mt-3 flex gap-2 relative z-30 pointer-events-auto">
                          <Link
                            href={`/client/creators/${creator.id}`}
                            className="flex-1 py-2.5 text-sm font-bold text-neutral-600 bg-white border border-neutral-200 rounded-xl text-center"
                          >
                            プロフィールを見る
                          </Link>
                          <Link
                            href={`/client/creators/${creator.id}/consult`}
                            className="flex-1 py-2.5 text-sm font-bold text-white bg-blue-600 rounded-xl flex items-center justify-center gap-1.5"
                          >
                            <Send size={13} />
                            相談する
                          </Link>
                        </div>
                      </div>
                    </article>
                  );
                })}
              </div>
            ) : (
              <div className="py-24 text-center">
                <div className="w-16 h-16 bg-neutral-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Search size={24} className="text-neutral-400" />
                </div>
                <p className="font-bold text-neutral-700">クリエイターが見つかりませんでした</p>
                <p className="text-sm text-neutral-400 mt-2">キーワードやカテゴリを変えてみてください</p>
                <button
                  onClick={resetAllFilters}
                  className="mt-4 text-sm font-bold text-orange-500 hover:text-orange-600 transition-colors"
                >
                  検索条件をリセット
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
