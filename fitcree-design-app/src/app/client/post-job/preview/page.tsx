'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Check, ChevronLeft } from 'lucide-react';

export default function JobPostPreviewPage() {
  const router = useRouter();
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const saved = window.localStorage.getItem('jobPostPreviewData');
    if (saved) {
      try {
        setData(JSON.parse(saved));
      } catch (e) {
        console.error(e);
      }
    }
  }, []);

  const handleBack = () => router.back();

  return (
    <div className="min-h-screen bg-slate-100">
      <div className="max-w-3xl mx-auto py-10 px-4">
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={handleBack}
            className="flex items-center gap-2 text-sm font-bold text-neutral-600 hover:text-blue-600"
          >
            <ChevronLeft size={18} /> 戻る
          </button>
          <span className="text-xs font-bold text-neutral-400">プレビュー</span>
        </div>

        <h1 className="text-2xl font-bold text-neutral-800 mb-6">投稿内容の確認</h1>

        {!data && (
          <div className="bg-white border border-neutral-300 rounded-xl p-6 text-sm text-neutral-500">
            フォームの入力内容が見つかりません。入力画面に戻って再度お試しください。
          </div>
        )}

        {data && (
          <pre className="bg-white p-6 rounded-xl border border-neutral-300 shadow-inner overflow-auto text-xs mb-10">
            {JSON.stringify(data, null, 2)}
          </pre>
        )}

        <div className="flex gap-4">
          <button
            onClick={handleBack}
            className="flex-1 py-4 border border-neutral-300 rounded-xl font-bold text-neutral-600 hover:bg-neutral-50"
          >
            修正する
          </button>
          <button className="flex-1 py-4 bg-green-500 text-white rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-green-600">
            <Check size={20} /> この内容で投稿する
          </button>
        </div>
      </div>
    </div>
  );
}


