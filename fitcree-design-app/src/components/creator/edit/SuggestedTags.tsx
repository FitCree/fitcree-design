'use client';

interface SuggestedTagsProps {
  tags: string[];
  currentValues: string[];
  onAdd: (tag: string) => void;
}

export default function SuggestedTags({ tags, currentValues, onAdd }: SuggestedTagsProps) {
  const available = tags.filter((t) => !currentValues.includes(`#${t}`));
  if (available.length === 0) return null;
  return (
    <div className="flex flex-wrap items-center gap-1.5 mt-2">
      <span className="text-xs text-neutral-400 font-bold">例</span>
      {available.map((tag) => (
        <button
          key={tag}
          type="button"
          onClick={() => onAdd(tag)}
          className="px-2.5 py-1 text-xs font-medium rounded-md bg-orange-50 text-orange-500 border border-orange-100 hover:bg-orange-100 transition-colors"
        >
          {tag}
        </button>
      ))}
    </div>
  );
}
