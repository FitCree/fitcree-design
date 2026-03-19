"use client";

import { useState } from 'react';
import Link from 'next/link';
import { MoreHorizontal } from 'lucide-react';
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
  /** リンクを無効にする（プレビュー内の表示など） */
  disableLink?: boolean;
}

export default function WorkCard({ work, uniformRatio = false, disableLink = false }: WorkCardProps) {
  const [menuOpen, setMenuOpen] = useState(false);

  const aspect = uniformRatio ? 'aspect-[16/9]' : ASPECT_RATIO[work.category];

  const linkContent = (
    <>
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
    </>
  );

  return (
    <article className="group">
      {disableLink ? (
        <div>{linkContent}</div>
      ) : (
        <Link href={`/creator/works/${work.id}`} className="block">
          {linkContent}
        </Link>
      )}

      {/* ハート + メニュー */}
      <div className="flex items-center gap-1 mt-2">
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
