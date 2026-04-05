"use client";

import React, { useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import {
  LayoutGrid,
  Eye,
  Pin,
  PinOff,
  GripVertical,
  ExternalLink,
  FileEdit,
  Trash2,
  MoreVertical,
  Plus,
  CheckSquare,
  Square,
  AlertCircle,
  BarChart2,
  BookOpen,
  Globe,
  EyeOff,
} from 'lucide-react';
import Link from 'next/link';
import ProfileSideNav from '@/components/creator/ProfileSideNav';
import ActionLinkButton from '@/components/common/ActionLinkButton';
import AddWorkModal from '@/components/creator/AddWorkModal';
import { MOCK_WORKS } from '@/data/mock-works';
import { PortfolioWork, WorkCategory } from '@/types/data';

// ──────────────────────────────────────────
// 型定義
// ──────────────────────────────────────────
type WorkStatus = 'published' | 'draft';

interface ManagedWork extends PortfolioWork {
  status: WorkStatus;
  isPinned: boolean;
  viewCount: number;
  order: number;
}

// ──────────────────────────────────────────
// モックデータ（管理フィールドを付加）
// ──────────────────────────────────────────
const VIEW_COUNTS = [120, 85, 203, 14, 67, 44, 31];

const INITIAL_WORKS: ManagedWork[] = MOCK_WORKS.map((w, i) => ({
  ...w,
  status: i === 3 ? 'draft' : 'published',
  isPinned: i === 0,
  viewCount: VIEW_COUNTS[i] ?? 0,
  order: i,
}));

// ──────────────────────────────────────────
// 定数
// ──────────────────────────────────────────
const CATEGORY_FILTERS: { id: WorkCategory | 'all'; label: string }[] = [
  { id: 'all', label: 'すべて' },
  { id: 'web', label: 'WEB' },
  { id: 'photo', label: '写真' },
  { id: 'video', label: '動画' },
  { id: 'graphic', label: 'グラフィック' },
];

// ──────────────────────────────────────────
// メインページ
// ──────────────────────────────────────────
export default function PortfolioManagePage() {
  const router = useRouter();
  const [showAddModal, setShowAddModal] = useState(false);
  const [works, setWorks] = useState<ManagedWork[]>(INITIAL_WORKS);
  const [categoryFilter, setCategoryFilter] = useState<WorkCategory | 'all'>('all');
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);
  const [dragOverId, setDragOverId] = useState<string | null>(null);
  const dragIdRef = useRef<string | null>(null);

  // ── 絞り込み & 並び順 ──
  const filteredWorks = works
    .filter((w) => categoryFilter === 'all' || w.category === categoryFilter)
    .sort((a, b) => {
      // 固定作品を先頭に
      if (a.isPinned !== b.isPinned) return a.isPinned ? -1 : 1;
      return a.order - b.order;
    });

  const pinnedWork = works.find((w) => w.isPinned);
  const publishedCount = works.filter((w) => w.status === 'published').length;
  const draftCount = works.filter((w) => w.status === 'draft').length;

  // ── 固定トグル（最大1件） ──
  const handlePin = (id: string) => {
    setWorks((prev) =>
      prev.map((w) => ({
        ...w,
        isPinned: w.id === id ? !w.isPinned : w.isPinned && w.id !== id ? false : w.isPinned,
      }))
    );
    setOpenMenuId(null);
  };

  // ── 公開 / 下書き切替 ──
  const handleToggleStatus = (id: string) => {
    setWorks((prev) =>
      prev.map((w) =>
        w.id === id ? { ...w, status: w.status === 'published' ? 'draft' : 'published' } : w
      )
    );
    setOpenMenuId(null);
  };

  // ── 削除 ──
  const handleDelete = (id: string) => {
    if (confirm('この作品を削除しますか？この操作は元に戻せません。')) {
      setWorks((prev) => prev.filter((w) => w.id !== id));
      setSelectedIds((prev) => {
        const s = new Set(prev);
        s.delete(id);
        return s;
      });
    }
    setOpenMenuId(null);
  };

  // ── 一括: 下書きに戻す ──
  const handleBulkDraft = () => {
    setWorks((prev) =>
      prev.map((w) => (selectedIds.has(w.id) ? { ...w, status: 'draft' } : w))
    );
    setSelectedIds(new Set());
  };

  // ── 一括: 公開する ──
  const handleBulkPublish = () => {
    setWorks((prev) =>
      prev.map((w) => (selectedIds.has(w.id) ? { ...w, status: 'published' } : w))
    );
    setSelectedIds(new Set());
  };

  // ── 一括: 削除 ──
  const handleBulkDelete = () => {
    if (confirm(`選択した ${selectedIds.size} 件の作品を削除しますか？この操作は元に戻せません。`)) {
      setWorks((prev) => prev.filter((w) => !selectedIds.has(w.id)));
      setSelectedIds(new Set());
    }
  };

  // ── 全選択トグル ──
  const handleSelectAll = () => {
    if (selectedIds.size === filteredWorks.length) {
      setSelectedIds(new Set());
    } else {
      setSelectedIds(new Set(filteredWorks.map((w) => w.id)));
    }
  };

  const toggleSelect = (id: string) => {
    setSelectedIds((prev) => {
      const s = new Set(prev);
      if (s.has(id)) s.delete(id);
      else s.add(id);
      return s;
    });
  };

  // ── ドラッグ & ドロップ ──
  const handleDragStart = (id: string) => {
    dragIdRef.current = id;
  };

  const handleDragOver = (e: React.DragEvent, id: string) => {
    e.preventDefault();
    setDragOverId(id);
  };

  const handleDrop = (targetId: string) => {
    const sourceId = dragIdRef.current;
    if (!sourceId || sourceId === targetId) {
      setDragOverId(null);
      return;
    }
    setWorks((prev) => {
      const sorted = [...prev].sort((a, b) => a.order - b.order);
      const sourceIdx = sorted.findIndex((w) => w.id === sourceId);
      const targetIdx = sorted.findIndex((w) => w.id === targetId);
      const reordered = [...sorted];
      const [removed] = reordered.splice(sourceIdx, 1);
      reordered.splice(targetIdx, 0, removed);
      return reordered.map((w, i) => ({ ...w, order: i }));
    });
    setDragOverId(null);
    dragIdRef.current = null;
  };

  // ──────────────────────────────────────────
  // レンダリング
  // ──────────────────────────────────────────
  return (
    <div className="max-w-5xl mx-auto px-4 py-8 pb-16 text-neutral-900">

      {/* ページヘッダー */}
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-2xl font-bold flex items-center gap-2 text-neutral-800 tracking-tight border-b-2 border-orange-500 pb-2 inline-flex">
          <LayoutGrid className="text-orange-500" strokeWidth={3} />
          ポートフォリオ管理
        </h1>
        <div className="flex items-center gap-2">
          <ActionLinkButton href="/creator?tab=works" label="作品ページへ" icon={Eye} />
          <button
            onClick={() => setShowAddModal(true)}
            className="inline-flex items-center gap-1.5 px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white text-sm font-bold rounded-lg transition-colors"
          >
            <Plus className="w-4 h-4" />
            作品を追加
          </button>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-8">

        {/* サイドナビ */}
        <ProfileSideNav />

        {/* メインコンテンツ */}
        <main className="w-[80%] space-y-5">

          {/* ── ステータスサマリー ── */}
          <div className="grid grid-cols-3 gap-3">
            {[
              { label: '作品数合計', value: works.length, icon: LayoutGrid, color: 'text-neutral-700', bg: 'bg-neutral-50' },
              { label: '公開中', value: publishedCount, icon: Globe, color: 'text-green-600', bg: 'bg-green-50' },
              { label: '下書き', value: draftCount, icon: BookOpen, color: 'text-amber-600', bg: 'bg-amber-50' },
            ].map(({ label, value, icon: Icon, color, bg }) => (
              <div
                key={label}
                className={`${bg} border border-neutral-200 rounded-xl p-4 flex items-center gap-3`}
              >
                <Icon className={`w-5 h-5 ${color} flex-shrink-0`} />
                <div>
                  <p className="text-xs text-neutral-500">{label}</p>
                  <p className={`text-2xl font-bold ${color}`}>{value}</p>
                </div>
              </div>
            ))}
          </div>

          {/* ── フィルター + 全選択 ── */}
          <div className="bg-white border border-neutral-200 rounded-xl p-4 space-y-3">
            <div className="flex items-center justify-between gap-4 flex-wrap">
              {/* カテゴリフィルター */}
              <div className="flex items-center gap-2 flex-wrap">
                {CATEGORY_FILTERS.map(({ id, label }) => {
                  const count =
                    id === 'all'
                      ? works.length
                      : works.filter((w) => w.category === id).length;
                  return (
                    <button
                      key={id}
                      onClick={() => setCategoryFilter(id)}
                      className={`px-3 py-1.5 rounded-full text-xs font-bold transition-colors ${
                        categoryFilter === id
                          ? 'bg-orange-500 text-white'
                          : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
                      }`}
                    >
                      {label}
                      <span className="ml-1 opacity-70">{count}</span>
                    </button>
                  );
                })}
              </div>

              {/* 全選択ボタン */}
              <button
                onClick={handleSelectAll}
                className="flex items-center gap-1.5 text-xs text-neutral-600 hover:text-neutral-800 transition-colors"
              >
                {selectedIds.size === filteredWorks.length && filteredWorks.length > 0 ? (
                  <CheckSquare className="w-4 h-4 text-orange-500" />
                ) : (
                  <Square className="w-4 h-4" />
                )}
                すべて選択
              </button>
            </div>

            {/* 一括操作バー */}
            {selectedIds.size > 0 && (
              <div className="pt-3 border-t border-neutral-200 flex items-center gap-2 flex-wrap">
                <span className="text-xs text-neutral-500 mr-1">
                  {selectedIds.size} 件選択中
                </span>
                <button
                  onClick={handleBulkPublish}
                  className="flex items-center gap-1 text-xs px-3 py-1.5 border border-green-300 text-green-700 rounded-lg hover:bg-green-50 transition-colors font-bold"
                >
                  <Globe className="w-3 h-3" />
                  公開する
                </button>
                <button
                  onClick={handleBulkDraft}
                  className="flex items-center gap-1 text-xs px-3 py-1.5 border border-amber-300 text-amber-700 rounded-lg hover:bg-amber-50 transition-colors font-bold"
                >
                  <BookOpen className="w-3 h-3" />
                  下書きに戻す
                </button>
                <button
                  onClick={handleBulkDelete}
                  className="flex items-center gap-1 text-xs px-3 py-1.5 border border-red-300 text-red-600 rounded-lg hover:bg-red-50 transition-colors font-bold"
                >
                  <Trash2 className="w-3 h-3" />
                  まとめて削除
                </button>
                <button
                  onClick={() => setSelectedIds(new Set())}
                  className="text-xs text-neutral-400 hover:text-neutral-600 ml-auto"
                >
                  選択解除
                </button>
              </div>
            )}
          </div>


          {/* ── ヒント ── */}
          <div className="bg-neutral-50 border border-neutral-200 rounded-xl p-4 flex gap-3">
            <AlertCircle className="w-4 h-4 text-neutral-500 flex-shrink-0 mt-0.5" />
            <div className="text-sm text-neutral-500 space-y-1">
              <p>ドラッグ＆ドロップで作品の表示順を自由に変更できます。</p>
              <p>先頭固定した作品はプロフィールページで常に最初に表示されます（1件のみ設定可）。</p>
              <p>下書き状態の作品はあなた以外には表示されません。</p>
            </div>
          </div>

          {/* ── 作品グリッド ── */}
          {filteredWorks.length === 0 ? (
            <div className="bg-white border border-neutral-200 rounded-xl p-12 text-center">
              <AlertCircle className="w-8 h-8 text-neutral-300 mx-auto mb-3" />
              <p className="text-neutral-400 text-sm">作品がありません</p>
              <button
                onClick={() => setShowAddModal(true)}
                className="inline-flex items-center gap-1.5 mt-4 px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white text-sm font-bold rounded-lg transition-colors"
              >
                <Plus className="w-4 h-4" />
                最初の作品を追加する
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {filteredWorks.map((work) => (
                <WorkManageCard
                  key={work.id}
                  work={work}
                  isSelected={selectedIds.has(work.id)}
                  isDragOver={dragOverId === work.id}
                  menuOpen={openMenuId === work.id}
                  onSelect={() => toggleSelect(work.id)}
                  onMenuToggle={() =>
                    setOpenMenuId(openMenuId === work.id ? null : work.id)
                  }
                  onMenuClose={() => setOpenMenuId(null)}
                  onPin={() => handlePin(work.id)}
                  onToggleStatus={() => handleToggleStatus(work.id)}
                  onDelete={() => handleDelete(work.id)}
                  onDragStart={() => handleDragStart(work.id)}
                  onDragOver={(e) => handleDragOver(e, work.id)}
                  onDrop={() => handleDrop(work.id)}
                />
              ))}
            </div>
          )}

        </main>
      </div>
      {showAddModal && (
        <AddWorkModal
          onClose={() => setShowAddModal(false)}
          onComplete={(source, category) => {
            setShowAddModal(false);
            router.push(`/creator/works/post?source=${source}&category=${category}`);
          }}
        />
      )}
    </div>
  );
}

// ──────────────────────────────────────────
// 作品管理カード（子コンポーネント）
// ──────────────────────────────────────────
interface WorkManageCardProps {
  work: ManagedWork;
  isSelected: boolean;
  isDragOver: boolean;
  menuOpen: boolean;
  onSelect: () => void;
  onMenuToggle: () => void;
  onMenuClose: () => void;
  onPin: () => void;
  onToggleStatus: () => void;
  onDelete: () => void;
  onDragStart: () => void;
  onDragOver: (e: React.DragEvent) => void;
  onDrop: () => void;
}

function WorkManageCard({
  work,
  isSelected,
  isDragOver,
  menuOpen,
  onSelect,
  onMenuToggle,
  onMenuClose,
  onPin,
  onToggleStatus,
  onDelete,
  onDragStart,
  onDragOver,
  onDrop,
}: WorkManageCardProps) {
  return (
    <article
      draggable
      onDragStart={onDragStart}
      onDragOver={onDragOver}
      onDrop={onDrop}
      onDragLeave={() => {}}
      className={`bg-white border rounded-xl transition-all cursor-grab active:cursor-grabbing select-none ${
        isDragOver
          ? 'border-orange-400 shadow-lg ring-2 ring-orange-300 scale-[1.02]'
          : 'border-neutral-200 hover:shadow-md'
      } ${isSelected ? 'ring-2 ring-orange-400 border-orange-300' : ''} ${
        work.status === 'draft' ? 'opacity-80' : ''
      }`}
    >
      {/* サムネイル */}
      <div className="relative aspect-[16/9] bg-neutral-100 rounded-t-xl overflow-hidden">
        <img src={work.thumbnailUrl} alt="" className="w-full h-full object-cover" />

        {/* 下書きオーバーレイ */}
        {work.status === 'draft' && (
          <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
            <div className="flex items-center gap-1 bg-black/60 text-white rounded px-2 py-1">
              <EyeOff className="w-3 h-3" />
              <span className="text-xs font-bold">非公開</span>
            </div>
          </div>
        )}

        {/* チェックボックス（左上） */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onSelect();
          }}
          className="absolute top-2 left-2 p-0.5 bg-white/90 rounded shadow transition-opacity z-10"
        >
          {isSelected ? (
            <CheckSquare className="w-4 h-4 text-orange-500" />
          ) : (
            <Square className="w-4 h-4 text-neutral-400" />
          )}
        </button>

        {/* 固定バッジ（右上） */}
        {work.isPinned && (
          <div className="absolute top-2 right-2 bg-orange-500 text-white rounded-full px-2 py-0.5 flex items-center gap-1 z-10">
            <Pin className="w-3 h-3" />
            <span className="text-xs font-bold">固定</span>
          </div>
        )}

        {/* ドラッグハンドル（左下） */}
        <div className="absolute bottom-2 left-2 text-white/70 hover:text-white z-10">
          <GripVertical className="w-4 h-4 drop-shadow" />
        </div>
      </div>

      {/* カード下部 */}
      <div className="p-3">
        {/* ステータス + カテゴリ */}
        <div className="flex items-center gap-1.5 mb-1.5 flex-wrap">
          <span
            className={`text-xs font-bold px-2 py-0.5 rounded-full ${
              work.status === 'published'
                ? 'bg-green-100 text-green-700'
                : 'bg-amber-100 text-amber-700'
            }`}
          >
            {work.status === 'published' ? '公開中' : '下書き'}
          </span>
          <span className="text-xs text-neutral-500 border border-neutral-200 rounded-full px-2 py-0.5">
            {work.categoryLabel}
          </span>
        </div>

        {/* タイトル */}
        <h3 className="text-sm font-medium text-neutral-800 line-clamp-2 leading-snug mb-2">
          {work.title}
        </h3>

        {/* アクセス数 + 操作メニュー */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1 text-xs text-neutral-400">
            <BarChart2 className="w-3 h-3" />
            <span>{work.viewCount.toLocaleString()} views</span>
          </div>

          {/* コンテキストメニュー */}
          <div className="relative">
            <button
              onClick={(e) => {
                e.stopPropagation();
                onMenuToggle();
              }}
              className="p-1 text-neutral-400 hover:text-neutral-700 transition-colors rounded"
            >
              <MoreVertical className="w-4 h-4" />
            </button>

            {menuOpen && (
              <>
                <div className="fixed inset-0 z-10" onClick={onMenuClose} />
                <div className="absolute right-0 bottom-8 z-20 w-48 bg-white border border-neutral-200 rounded-xl shadow-lg py-1 text-sm overflow-hidden">
                  {/* 詳細 */}
                  <Link
                    href={`/creator/works/${work.id}`}
                    className="flex items-center gap-2.5 px-4 py-2.5 text-neutral-700 hover:bg-neutral-50"
                    onClick={onMenuClose}
                  >
                    <ExternalLink className="w-3.5 h-3.5 text-neutral-400" />
                    詳細ページを見る
                  </Link>

                  {/* 編集 */}
                  <Link
                    href={`/creator/works/${work.id}/edit`}
                    className="flex items-center gap-2.5 px-4 py-2.5 text-neutral-700 hover:bg-neutral-50"
                    onClick={onMenuClose}
                  >
                    <FileEdit className="w-3.5 h-3.5 text-neutral-400" />
                    編集する
                  </Link>

                  {/* 公開 / 下書き切替 */}
                  <button
                    onClick={onToggleStatus}
                    className="w-full flex items-center gap-2.5 px-4 py-2.5 text-neutral-700 hover:bg-neutral-50"
                  >
                    {work.status === 'published' ? (
                      <>
                        <EyeOff className="w-3.5 h-3.5 text-neutral-400" />
                        下書きに戻す
                      </>
                    ) : (
                      <>
                        <Globe className="w-3.5 h-3.5 text-neutral-400" />
                        公開する
                      </>
                    )}
                  </button>

                  {/* 固定 / 固定解除 */}
                  <button
                    onClick={onPin}
                    className="w-full flex items-center gap-2.5 px-4 py-2.5 text-neutral-700 hover:bg-neutral-50"
                  >
                    {work.isPinned ? (
                      <>
                        <PinOff className="w-3.5 h-3.5 text-neutral-400" />
                        先頭固定を解除
                      </>
                    ) : (
                      <>
                        <Pin className="w-3.5 h-3.5 text-neutral-400" />
                        先頭に固定する
                      </>
                    )}
                  </button>

                  {/* 削除 */}
                  <div className="border-t border-neutral-100 mt-1 pt-1">
                    <button
                      onClick={onDelete}
                      className="w-full flex items-center gap-2.5 px-4 py-2.5 text-red-500 hover:bg-red-50"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      削除する
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </article>
  );
}
