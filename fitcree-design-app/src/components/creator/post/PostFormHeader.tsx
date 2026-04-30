'use client';

import { Save } from 'lucide-react';

interface PostFormHeaderProps {
  onCancel: () => void;
  onPublish: () => void;
}

export function PostFormHeader({ onCancel, onPublish }: PostFormHeaderProps) {
  return (
    <header className="bg-white border-b border-neutral-200 sticky top-0 z-30 px-4 py-3">
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        <button
          onClick={onCancel}
          className="text-neutral-600 hover:text-neutral-800 text-sm font-medium transition-colors"
        >
          投稿キャンセル
        </button>
        <div className="flex items-center gap-6">
          <button className="text-neutral-500 text-sm font-bold hover:text-neutral-700 transition-colors flex items-center gap-1.5">
            <Save size={15} />
            下書き保存
          </button>
          <button
            onClick={onPublish}
            className="bg-orange-500 hover:bg-orange-600 text-white text-sm font-bold px-5 py-2 rounded-lg transition-all"
          >
            公開に進む
          </button>
        </div>
      </div>
    </header>
  );
}
