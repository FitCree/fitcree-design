import React from 'react';

// --- 参考サイト等のURL入力 ---
export const ReferenceUrlInput = ({ 
  urls = [], 
  onChange, 
  maxUrls = 3 
}: { 
  urls?: string[]; 
  onChange: (urls: string[]) => void;
  maxUrls?: number;
}) => {
  const handleUrlChange = (idx: number, value: string) => {
    const next = [...urls];
    next[idx] = value;
    onChange(next);
  };

  const addUrlField = () => {
    if (urls.length < maxUrls) {
      onChange([...urls, '']);
    }
  };

  // 初期状態で1つのフィールドを表示
  const displayUrls = urls.length === 0 ? [''] : urls;
  const canAddMore = displayUrls.length < maxUrls;

  return (
    <div className="space-y-3">
      {displayUrls.map((url, idx) => (
        <div key={idx} className="flex gap-2">
          <input 
            type="url"
            value={url}
            onChange={(e) => handleUrlChange(idx, e.target.value)}
            placeholder="参考サイト等のURL (https://...)"
            className="flex-1 p-3 border border-neutral-300 rounded-lg text-neutral-800 focus:ring-1 focus:ring-blue-500 placeholder:text-neutral-400"
          />
          {idx === displayUrls.length - 1 && canAddMore && (
            <button 
              onClick={addUrlField} 
              type="button"
              className="px-3 py-2 bg-white border border-neutral-300 rounded-lg text-neutral-600 hover:bg-neutral-50 text-sm"
            >
              + 追加
            </button>
          )}
        </div>
      ))}
    </div>
  );
};
