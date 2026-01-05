'use client';

import Link from 'next/link';

export default function StyleguidePage() {
  return (
    <div className="min-h-screen bg-slate-100 py-12 px-4 sm:px-8 pb-32">
      <div className="max-w-3xl mx-auto">
        <header className="mb-12 border-b border-neutral-300 pb-6">
          <h1 className="text-3xl font-extrabold text-neutral-800">FitCree Components StylesGuide</h1>
          <p className="text-neutral-500 mt-2">コンポーネントスタイルリンク集です。</p>
        </header>

        <div className="space-y-8">
          <section className="bg-white rounded-lg shadow-sm border border-neutral-300 p-6">
            <h2 className="text-xl font-bold text-neutral-800 mb-3">Form Elements</h2>
            <p className="text-neutral-600 mb-4">
              FormElements.tsx の全コンポーネント一覧です。以下のフォーム要素を確認できます：
            </p>
            <Link 
              href="/styleguide/form/elements" 
              className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium"
            >
              すべて見る →
            </Link>
          </section>

          <section className="bg-white rounded-lg shadow-sm border border-neutral-300 p-6">
            <h2 className="text-xl font-bold text-neutral-800 mb-3">Form Layout</h2>
            <p className="text-neutral-600 mb-4">
              FormLayout.tsx の全コンポーネント一覧です。以下のレイアウトコンポーネントを確認できます：
            </p>
            <Link 
              href="/styleguide/form/layout" 
              className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium"
            >
              すべて見る →
            </Link>
          </section>
        </div>
      </div>
    </div>
  );
}