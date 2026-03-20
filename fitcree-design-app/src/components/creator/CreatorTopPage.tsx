"use client";

import { useState, useMemo } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { MOCK_CREATORS, MOCK_WORKS } from '@/data/mock-data';
import { WorkCategory } from '@/types/data';
import CreatorProfileHeader from './CreatorProfileHeader';
import CreatorTabs, { CreatorTabId } from './CreatorTabs';
import WorkCategoryFilter from './WorkCategoryFilter';
import WorkGrid from './WorkGrid';
import AddWorkModal from './AddWorkModal';
import CreatorProfileTab from './CreatorProfileTab';

const INITIAL_SHOW_COUNT = 6;
const LOAD_MORE_COUNT = 6;

const VALID_TABS: CreatorTabId[] = ['works', 'profile', 'skills', 'guide', 'reviews'];

export default function CreatorTopPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentUser = MOCK_CREATORS[0];

  const initialTab = searchParams.get('tab') as CreatorTabId | null;
  const [activeTab, setActiveTab] = useState<CreatorTabId>(
    initialTab && VALID_TABS.includes(initialTab) ? initialTab : 'works'
  );
  const [activeCategory, setActiveCategory] = useState<WorkCategory | 'all'>('all');
  const [showCount, setShowCount] = useState(INITIAL_SHOW_COUNT);
  const [showAddWorkModal, setShowAddWorkModal] = useState(false);

  // タブ切り替え時にカテゴリと表示件数をリセット
  const handleTabChange = (tab: CreatorTabId) => {
    setActiveTab(tab);
    setActiveCategory('all');
    setShowCount(INITIAL_SHOW_COUNT);
  };

  // カテゴリ切り替え時に表示件数をリセット
  const handleCategoryChange = (category: WorkCategory | 'all') => {
    setActiveCategory(category);
    setShowCount(INITIAL_SHOW_COUNT);
  };

  const filteredWorks = useMemo(() => {
    const creatorWorks = MOCK_WORKS.filter((w) => w.creatorId === currentUser.id);
    if (activeCategory === 'all') return creatorWorks;
    return creatorWorks.filter((w) => w.category === activeCategory);
  }, [activeCategory, currentUser.id]);

  const displayedWorks = filteredWorks.slice(0, showCount);
  const hasMore = displayedWorks.length < filteredWorks.length;

  return (
    <div className="max-w-5xl mx-auto px-4 pb-16">
      {/* プロフィールヘッダー */}
      <CreatorProfileHeader
        user={currentUser}
        onAddWork={() => setShowAddWorkModal(true)}
      />

      {/* タブナビゲーション */}
      <CreatorTabs activeTab={activeTab} onTabChange={handleTabChange} />

      {/* タブコンテンツ */}
      {activeTab === 'works' ? (
        <div className="space-y-6">
          <WorkCategoryFilter
            activeCategory={activeCategory}
            onCategoryChange={handleCategoryChange}
          />
          <WorkGrid
            works={displayedWorks}
            hasMore={hasMore}
            onLoadMore={() => setShowCount((prev) => prev + LOAD_MORE_COUNT)}
            uniformRatio={activeCategory === 'all'}
          />
        </div>
      ) : activeTab === 'profile' ? (
        <CreatorProfileTab user={currentUser} />
      ) : (
        <div className="text-center py-16 text-neutral-400">
          <p className="text-base">このタブは準備中です</p>
        </div>
      )}

      {/* 作品投稿モーダル */}
      {showAddWorkModal && (
        <AddWorkModal
          onClose={() => setShowAddWorkModal(false)}
          onComplete={(source, category) => {
            setShowAddWorkModal(false);
            router.push(`/creator/works/post?source=${source}&category=${category}`);
          }}
        />
      )}
    </div>
  );
}
