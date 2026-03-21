import { ViewMode } from './CreatorProfileHeader';

const TABS = [
  { id: 'works', label: '作品' },
  { id: 'profile', label: 'プロフィール' },
  { id: 'skills', label: 'スキル・ツール' },
  { id: 'guide', label: '依頼ガイド' },
  { id: 'reviews', label: '評価' },
] as const;

export type CreatorTabId = (typeof TABS)[number]['id'];

interface CreatorTabsProps {
  activeTab: CreatorTabId;
  onTabChange: (tab: CreatorTabId) => void;
  viewMode?: ViewMode;
}

export default function CreatorTabs({ activeTab, onTabChange, viewMode = 'creator' }: CreatorTabsProps) {
  const activeColor = viewMode === 'client'
    ? 'border-blue-500 text-blue-600'
    : 'border-orange-500 text-orange-600';

  return (
    <nav
      className="border-b border-neutral-200 overflow-x-auto mb-4"
      aria-label="プロフィールタブ"
    >
      <div className="flex">
        {TABS.map((tab) => {
          const isActive = tab.id === activeTab;
          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`whitespace-nowrap px-6 py-2 text-sm font-bold transition-colors border-b-2 ${
                isActive
                  ? activeColor
                  : 'border-transparent text-neutral-500 hover:text-neutral-700'
              }`}
              aria-selected={isActive}
              role="tab"
            >
              {tab.label}
            </button>
          );
        })}
      </div>
    </nav>
  );
}
