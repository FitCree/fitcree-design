import React, { useState, KeyboardEvent } from 'react';
import { getFormTheme } from './form-theme';
import { X } from 'lucide-react';

// --- 入力：タグ（ハッシュタグ） ---
export const TagInput = ({ value = [], onChange, placeholder, maxTags = 10, variant = 'client' }: any) => {
  const theme = getFormTheme(variant);
  const [inputValue, setInputValue] = useState('');

  const addTag = (tagText: string) => {
    const trimmed = tagText.trim();
    if (!trimmed) return;

    // 既に#が付いている場合は除去してから追加
    const cleanTag = trimmed.startsWith('#') ? trimmed.slice(1) : trimmed;

    // 既に同じタグが存在する場合は追加しない
    if (value.includes(`#${cleanTag}`)) return;

    // 最大数チェック
    if (value.length >= maxTags) return;

    onChange([...value, `#${cleanTag}`]);
    setInputValue('');
  };

  const removeTag = (tagToRemove: string) => {
    onChange(value.filter((tag: string) => tag !== tagToRemove));
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addTag(inputValue);
    } else if (e.key === 'Backspace' && !inputValue && value.length > 0) {
      // 入力が空でBackspaceを押した場合、最後のタグを削除
      removeTag(value[value.length - 1]);
    }
  };

  return (
    <div className="w-full">
      <div className={`flex flex-wrap gap-2 p-3 border border-neutral-300 rounded-lg focus-within:ring-2 ${theme.ring} bg-white min-h-[48px] items-center`}>
        {value.map((tag: string, idx: number) => (
          <button
            key={idx}
            type="button"
            onClick={() => removeTag(tag)}
            className={`inline-flex items-center gap-1 px-3 py-1.5 ${theme.tagBg} ${theme.tagText} rounded-md text-sm font-medium ${theme.tagHover} transition-colors focus:outline-none focus:ring-2 ${theme.ring}`}
          >
            {tag}
            <X size={16} className={`${theme.tagText}`} aria-label="削除" />
          </button>
        ))}
        {value.length < maxTags && (
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={placeholder || 'ハッシュタグを追加する'}
            className="flex-1 min-w-[120px] outline-none text-base text-neutral-800 bg-transparent"
          />
        )}
      </div>
      {maxTags && (
        <div className="text-right text-xs text-neutral-600 mt-1">
          {value.length} / {maxTags}個
        </div>
      )}
    </div>
  );
};
