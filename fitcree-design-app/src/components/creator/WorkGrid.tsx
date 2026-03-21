import { PortfolioWork } from '@/types/data';
import WorkCard from './WorkCard';
import type { ViewMode } from './CreatorProfileHeader';

interface WorkGridProps {
  works: PortfolioWork[];
  hasMore: boolean;
  onLoadMore: () => void;
  /** true のとき全カード 16:9 に統一 */
  uniformRatio?: boolean;
  /** 表示モード */
  viewMode?: ViewMode;
}

export default function WorkGrid({ works, hasMore, onLoadMore, uniformRatio = false, viewMode = 'creator' }: WorkGridProps) {
  if (works.length === 0) {
    return (
      <div className="text-center py-16 text-neutral-400">
        <p className="text-base">該当する作品がありません</p>
      </div>
    );
  }

  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 items-start">
        {works.map((work) => (
          <WorkCard key={work.id} work={work} uniformRatio={uniformRatio} viewMode={viewMode} />
        ))}
      </div>

      {hasMore && (
        <div className="mt-8">
          <button
            onClick={onLoadMore}
            className="w-full py-4 border border-neutral-200 rounded-lg text-neutral-600 font-bold hover:bg-neutral-50 transition-colors focus-visible:ring-2 focus-visible:ring-neutral-400 focus-visible:ring-offset-2"
          >
            もっとみる
          </button>
        </div>
      )}
    </div>
  );
}
