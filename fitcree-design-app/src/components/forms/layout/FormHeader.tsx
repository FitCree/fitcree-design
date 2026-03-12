import React from 'react';
import { Eye, X } from 'lucide-react';

// --- ページヘッダー ---
export const FormHeader = ({ title, onPreview, previewLabel }: any) => (
  <div className="bg-white max-w-full py-1 px-4 border-b border-neutral-200 sticky top-0 z-20">
    <div className="max-w-screen-xl mx-auto">
      <div className='flex justify-between items-center'>

        {/* Left: Close Button */}
        <button onClick={handleClose} className="flex items-center text-neutral-500 hover:text-red-600 transition-colors p-2 -ml-2 rounded-lg hover:bg-neutral-100">
          <X size={16} />
          <span className="ml-1 text-sm font-bold hidden sm:block">閉じる</span>
        </button>

        {/* Center: Title */}
        <h1 className="absolute left-1/2 transform -translate-x-1/2 text-center">
          <span className="font-bold text-neutral-800 text-sm sm:text-base">{title}</span>
        </h1>

        {/* Right: Save Draft (hidden when onPreview is not provided) */}
        {onPreview ? (
          <button onClick={onPreview} className={previewLabel ? "bg-blue-500 text-white text-sm font-bold px-3 py-2 rounded hover:bg-blue-700 transition-colors" : "border border-neutral-300 text-neutral-600 text-sm font-bold px-3 py-2 rounded hover:bg-neutral-100 transition-colors"}>
            {previewLabel || "下書き保存"}
          </button>
        ) : (
          <div className="w-20" />
        )}
      </div>
    </div>
  </div>
);

const handleClose = () => {
  if (window.confirm('入力内容は保存されていません。\n編集を終了してもよろしいですか？\n\n[キャンセル] 作業を続ける\n[OK] 終了する')) {
    window.history.back();
  }
};