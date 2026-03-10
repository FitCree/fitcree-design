import { WorkCategory } from '@/types/data';
import { WORK_CATEGORIES } from '@/data/mock-works';

interface WorkCategoryFilterProps {
  activeCategory: WorkCategory | 'all';
  onCategoryChange: (category: WorkCategory | 'all') => void;
}

export default function WorkCategoryFilter({
  activeCategory,
  onCategoryChange,
}: WorkCategoryFilterProps) {
  return (
    <div className="flex items-center gap-2 overflow-x-auto pb-1">
      {WORK_CATEGORIES.map((cat) => {
        const isActive = cat.id === activeCategory;
        return (
          <button
            key={cat.id}
            onClick={() => onCategoryChange(cat.id)}
            className={`whitespace-nowrap px-4 py-1.5 rounded-full text-sm font-bold transition-colors ${
              isActive
                ? 'bg-slate-700 text-white'
                : 'bg-white text-neutral-500 border border-neutral-200 hover:border-neutral-300'
            }`}
          >
            {cat.label}
          </button>
        );
      })}
    </div>
  );
}
