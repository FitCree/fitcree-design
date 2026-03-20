'use client';

import React, { useState } from 'react';
import { X, Briefcase, Palette, ChevronLeft, ExternalLink } from 'lucide-react';

// ベータ版で選択可能な分野
const WORK_CATEGORIES = [
  { id: 'web', label: 'Webサイト', enabled: true },
  { id: 'illustration', label: 'イラスト・アート', enabled: true },
  { id: 'graphic', label: 'グラフィック', enabled: true },
  { id: 'photo', label: '写真', enabled: true },
  { id: 'video', label: '動画・映像', enabled: true },
] as const;

export type WorkSourceType = 'fitcree' | 'external';
export type WorkCategoryId = (typeof WORK_CATEGORIES)[number]['id'];

interface AddWorkModalProps {
  onClose: () => void;
  onComplete: (source: WorkSourceType, category: WorkCategoryId) => void;
}

type Step = 'source' | 'category';

export default function AddWorkModal({ onClose, onComplete }: AddWorkModalProps) {
  const [step, setStep] = useState<Step>('source');
  const [selectedSource, setSelectedSource] = useState<WorkSourceType | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<WorkCategoryId | null>(null);

  const handleSourceSelect = (source: WorkSourceType) => {
    setSelectedSource(source);
    setStep('category');
  };

  const handleBack = () => {
    setStep('source');
    setSelectedCategory(null);
  };

  const handleNext = () => {
    if (selectedSource && selectedCategory) {
      onComplete(selectedSource, selectedCategory);
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-xl max-w-md w-full animate-in fade-in zoom-in-95 duration-200 flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* ヘッダー */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-neutral-200">
          <h2 className="text-base font-bold text-neutral-800">作品投稿</h2>
          <button
            onClick={onClose}
            className="text-neutral-400 hover:text-neutral-600 p-1 rounded-lg hover:bg-neutral-100 transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        {/* コンテンツ */}
        <div className="px-6 py-8">
          {step === 'source' ? (
            /* ===== ステップ1: 種類選択 ===== */
            <div>
              <h3 className="text-xl font-bold text-neutral-800 text-center mb-6">
                どの作品を追加しますか？
              </h3>
              <div className="grid grid-cols-2 gap-4">
                {/* FitCree納品案件（準備中・グレーアウト） */}
                <div
                  className="relative flex flex-col items-center justify-center gap-3 p-6 rounded-xl border-2 border-neutral-200 bg-neutral-100 aspect-[4/3] opacity-50 pointer-events-none select-none"
                >
                  <Briefcase size={28} className="text-neutral-400" />
                  <div className="text-center">
                    <p className="text-xs text-neutral-400 font-bold">FitCree</p>
                    <p className="text-sm font-bold mt-0.5 text-neutral-500">準備中</p>
                    <p className="text-sm font-bold text-neutral-400">納品案件</p>
                  </div>
                </div>

                {/* 自主制作 or 外部制作 */}
                <button
                  onClick={() => handleSourceSelect('external')}
                  className="group relative flex flex-col items-center justify-center gap-3 p-6 rounded-xl border-2 border-neutral-200 bg-orange-50 hover:border-orange-400 hover:ring-2 hover:ring-orange-200 transition-all aspect-[4/3]"
                >
                  <Palette size={28} className="text-neutral-400 group-hover:text-orange-500 transition-colors" />
                  <div className="text-center">
                    <p className="text-sm font-bold text-orange-500">自主制作</p>
                    <p className="text-sm font-bold text-orange-500">or</p>
                    <p className="text-sm font-bold text-orange-500">外部制作</p>
                  </div>
                </button>
              </div>
            </div>
          ) : (
            /* ===== ステップ2: 分野選択 ===== */
            <div>
              <h3 className="text-xl font-bold text-neutral-800 text-center mb-6">
                どの分野の作品を追加しますか？
              </h3>
              <div className="space-y-2 mb-6">
                {WORK_CATEGORIES.map((cat) => (
                  <label
                    key={cat.id}
                    className={`flex items-center gap-3 px-4 py-3 rounded-lg cursor-pointer transition-all ${
                      selectedCategory === cat.id
                        ? 'bg-blue-50 ring-1 ring-blue-300'
                        : 'hover:bg-neutral-50'
                    }`}
                  >
                    <input
                      type="radio"
                      name="workCategory"
                      checked={selectedCategory === cat.id}
                      onChange={() => setSelectedCategory(cat.id)}
                      className="w-4 h-4 accent-blue-600"
                    />
                    <span className="text-sm font-medium text-neutral-800">{cat.label}</span>
                  </label>
                ))}
              </div>

              {/* ベータ版注意書き */}
              <div className="bg-blue-50 border border-blue-100 rounded-lg px-4 py-3 text-center">
                <p className="text-xs text-blue-700 leading-relaxed">
                  現在のベータ版では、追加できる分野を制限しています。
                  <br />
                  本公開まで楽しみにお待ちください。
                </p>
                <p className="text-xs text-blue-700 mt-1">
                  今後追加予定の分野は
                  <a
                    href="https://fitcree.com/guide"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 font-bold underline hover:text-blue-800"
                  >
                    こちらの記事にて紹介
                  </a>
                  しています。
                </p>
              </div>
            </div>
          )}
        </div>

        {/* フッター */}
        <div className="px-6 py-4 border-t border-neutral-100 flex items-center justify-between">
          {step === 'source' ? (
            <>
              <button
                onClick={onClose}
                className="px-4 py-2 rounded-lg border border-neutral-200 text-sm font-bold text-neutral-500 hover:bg-neutral-50 transition-colors"
              >
                キャンセル
              </button>
              <div />
            </>
          ) : (
            <>
              <button
                onClick={handleBack}
                className="px-4 py-2 rounded-lg border border-neutral-200 text-sm font-bold text-neutral-500 hover:bg-neutral-50 transition-colors"
              >
                一つ前へ戻る
              </button>
              <button
                onClick={handleNext}
                disabled={!selectedCategory}
                className={`px-6 py-2 rounded-lg text-sm font-bold transition-all ${
                  selectedCategory
                    ? 'bg-orange-500 text-white hover:bg-orange-600'
                    : 'bg-neutral-200 text-neutral-400 cursor-not-allowed'
                }`}
              >
                次へ
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
