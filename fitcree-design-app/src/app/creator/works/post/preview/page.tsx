"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Flag } from 'lucide-react';
import { MOCK_WORK_DETAILS } from '@/data/mock-work-details';
import { MOCK_CREATORS, MOCK_WORKS } from '@/data/mock-data';
import WorkDetailView from '@/components/creator/WorkDetailView';

export default function PostPreviewPage() {
  const router = useRouter();
  const work = MOCK_WORK_DETAILS['work-1']!;
  const creator = MOCK_CREATORS[0];
  const otherWorks = MOCK_WORKS.filter((w) => w.creatorId === creator.id && w.id !== work.id);

  const [showConfirm, setShowConfirm] = useState(false);
  const [showComplete, setShowComplete] = useState(false);

  return (
    <div className="min-h-screen bg-white">
      {/* プレビューバー */}
      <div className="sticky top-0 z-40 bg-white border-b border-neutral-200">
        <div className="max-w-4xl mx-auto px-4 py-3 flex items-center justify-between">
          <button
            onClick={() => router.back()}
            className="flex items-center gap-2 text-sm text-neutral-600 hover:text-neutral-800 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            編集に戻る
          </button>
          <div className="flex items-center gap-2">
            <span className="text-sm text-white bg-slate-700 px-4 py-1 rounded-full font-bold">プレビュー</span>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => alert('下書きに保存しました')}
              className="text-sm text-neutral-600 hover:text-neutral-800 font-medium"
            >
              下書き保存
            </button>
            <button
              onClick={() => setShowConfirm(true)}
              className="bg-orange-500 hover:bg-orange-600 text-white text-sm font-bold py-2 px-4 rounded-lg transition-colors"
            >
              公開する
            </button>
          </div>
        </div>
      </div>

      <WorkDetailView
        work={work}
        creator={creator}
        isPreview
        otherWorks={otherWorks}
        onPublish={() => setShowConfirm(true)}
      />

      {/* 公開確認モーダル */}
      {showConfirm && (
        <div
          className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center"
          onClick={() => setShowConfirm(false)}
        >
          <div
            className="bg-white rounded-xl max-w-sm w-full mx-4 p-8 animate-in fade-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-xl font-bold text-neutral-800 text-center mb-6">
              作品を公開しますか？
            </h2>

            <div className="flex gap-3 mb-6">
              <button
                onClick={() => setShowConfirm(false)}
                className="flex-1 py-3 px-4 border border-neutral-300 rounded-lg text-neutral-700 font-bold hover:bg-neutral-50 transition-colors"
              >
                編集に戻る
              </button>
              <button
                onClick={() => {
                  setShowConfirm(false);
                  setShowComplete(true);
                }}
                className="flex-1 py-3 px-4 bg-orange-500 hover:bg-orange-600 text-white font-bold rounded-lg transition-colors"
              >
                公開する
              </button>
            </div>

            <p className="text-sm text-neutral-500 text-center">
              公開後、あとからいつでも編集可能です。
            </p>
          </div>
        </div>
      )}

      {/* 公開完了モーダル */}
      {showComplete && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center">
          <div className="bg-white rounded-xl max-w-sm w-full mx-4 p-8 animate-in fade-in zoom-in-95 duration-200 text-center">
            {/* アイコン */}
            <div className="flex justify-end mb-2">
              <Flag className="w-10 h-10 text-orange-500" fill="currentColor" />
            </div>

            <h2 className="text-xl font-bold text-neutral-800 mb-4">
              公開完了！
            </h2>

            <p className="text-sm text-neutral-600 leading-relaxed mb-8">
              お疲れ様でした。作品を公開しました！<br />
              この調子でどんどん作品を投稿し、<br />
              ポートフォリオを強化していきましょう！
            </p>

            <button
              onClick={() => router.push('/creator')}
              className="w-full max-w-xs mx-auto py-3 px-6 bg-orange-500 hover:bg-orange-600 text-white font-bold rounded-lg transition-colors"
            >
              自分のトップページへ
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
