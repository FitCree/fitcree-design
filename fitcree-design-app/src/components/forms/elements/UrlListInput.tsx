import React from 'react';
import { Plus } from 'lucide-react';
import { getFormTheme } from './form-theme';
import { AddButton } from './AddButton';

// --- 特殊：URLリスト入力 ---
export const UrlListInput = ({ urls = [], onChange, variant = 'client' }: any) => {
  const theme = getFormTheme(variant);
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
          placeholder="https://..." className={`w-full p-2 border border-neutral-300 rounded text-base ${theme.ring}`}
        />
      ))}
      <AddButton
        variant={variant}
        label="参考URLを追加"
        onClick={addField}
        className="text-xs"
        iconSize={14}
      />
    </div>
  );
};
