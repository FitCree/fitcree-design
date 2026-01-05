import React from 'react';
import { ChevronLeft, ChevronRight, Save } from 'lucide-react';

// --- ナビゲーションフッター ---
export const FormFooter = ({ onBack, onNext, isFirst, isLast }: any) => (
  <div className="fixed bottom-0 left-0 w-full bg-white border-t border-neutral-300 p-4 z-20">
    <div className={`max-w-2xl mx-auto flex gap-3 ${isFirst ? 'justify-end' : 'justify-between'}`}>
      {!isFirst && (
        <button onClick={onBack} className="flex items-center justify-center gap-2 py-2 px-6 rounded-xl border border-neutral-300 font-bold text-neutral-600 hover:bg-neutral-50 transition-all">
          <ChevronLeft size={18} /> 戻る
        </button>
      )}
      <button onClick={onNext} className="flex items-center justify-center gap-2 bg-blue-500 text-white font-bold py-2 px-6 rounded-xl hover:bg-blue-700 transition-all">
        {isLast ? "投稿内容を確認する" : "次へ"}
        <ChevronRight size={18} />
      </button>
    </div>
  </div>
);

