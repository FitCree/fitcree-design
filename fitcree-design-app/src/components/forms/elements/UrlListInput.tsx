import React from 'react';
import { Plus } from 'lucide-react';

// --- 特殊：URLリスト入力 ---
export const UrlListInput = ({ urls = [], onChange }: any) => {
  const addField = () => onChange([...urls, '']);
  const updateUrl = (idx: number, val: string) => {
    const next = [...urls];
    next[idx] = val;
    onChange(next);
  };
  return (
    <div className="space-y-3">
      {urls.map((url: string, idx: number) => (
        <input 
          key={idx} type="url" value={url} onChange={(e) => updateUrl(idx, e.target.value)}
          placeholder="https://..." className="w-full p-2 border border-neutral-300 rounded text-base focus:ring-blue-500"
        />
      ))}
      <button onClick={addField} className="text-xs text-blue-600 font-bold flex items-center gap-1 hover:underline hover:text-blue-700">
        <Plus size={14} /> 参考URLを追加
      </button>
    </div>
  );
};

