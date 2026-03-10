"use client";

import { useState } from 'react';
import { Heart, MoreHorizontal } from 'lucide-react';
import { PortfolioWork, WorkCategory } from '@/types/data';

/** カテゴリ別アスペクト比 */
const ASPECT_RATIO: Record<WorkCategory, string> = {
  web: 'aspect-[16/9]',
  photo: 'aspect-[3/2]',
  video: 'aspect-[16/9]',
  graphic: 'aspect-[3/2]',
};

interface WorkCardProps {
  work: PortfolioWork;
  /** true のとき全カード 16:9 に統一（「すべて」表示用） */
  uniformRatio?: boolean;
}

export default function WorkCard({ work, uniformRatio = false }: WorkCardProps) {
  const [liked, setLiked] = useState(work.isLiked);
  const [menuOpen, setMenuOpen] = useState(false);

  const aspect = uniformRatio ? 'aspect-[16/9]' : ASPECT_RATIO[work.category];

  return (
    <article className="group">
      {/* サムネイル */}
      <div className={`relative ${aspect} rounded-lg overflow-hidden bg-neutral-100`}>
        <img
          src={work.thumbnailUrl}
          alt=""
          className="w-full h-full object-cover"
        />
      </div>

      {/* カテゴリバッジ */}
      <div className="mt-2">
        <span className="inline-block text-xs text-neutral-600 border border-neutral-300 rounded-full px-2 py-0.5">
          {work.categoryLabel}
        </span>
      </div>

      {/* タイトル */}
      <h3 className="text-sm font-medium text-neutral-800 mt-2 line-clamp-2 leading-snug">
        {work.title}
      </h3>

      {/* ハート + メニュー */}
      <div className="flex items-center gap-1 mt-2">
        {/* <button
          onClick={() => setLiked(!liked)}
          className={`p-1 transition-colors ${
            liked ? 'text-red-500' : 'text-neutral-400 hover:text-red-400'
          }`}
          aria-label={liked ? 'いいねを取り消す' : 'いいねする'}
        >
          <Heart className="w-4 h-4" fill={liked ? 'currentColor' : 'none'} />
        </button> */}

        <div className="relative ml-auto">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="p-1 text-neutral-500 hover:text-orange-700 transition-colors"
            aria-label="メニューを開く"
          >
            <MoreHorizontal className="w-5 h-5" />
          </button>

          {menuOpen && (
            <>
              <div
                className="fixed inset-0 z-10"
                onClick={() => setMenuOpen(false)}
              />
              <div className="absolute right-0 top-8 z-20 w-40 bg-white border border-neutral-200 rounded-lg py-1">
                {['編集', '下書きに戻す', '先頭固定表示', 'アクセス状況'].map((item) => (
                  <button
                    key={item}
                    onClick={() => { setMenuOpen(false); alert('この機能は準備中です'); }}
                    className="w-full text-left px-4 py-2 text-sm text-neutral-700 hover:bg-neutral-50"
                  >
                    {item}
                  </button>
                ))}
                <button
                  onClick={() => { setMenuOpen(false); alert('この機能は準備中です'); }}
                  className="w-full text-left px-4 py-2 text-sm text-red-500 hover:bg-red-50"
                >
                  削除
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </article>
  );
}
