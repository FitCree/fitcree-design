'use client';

import * as FormLayout from '../../../../components/forms/FormLayout';

export default function StyleguidePage() {
  const steps = [
    { id: 1, title: '基本情報' },
    { id: 2, title: '詳細' },
    { id: 3, title: '条件・制約' },
  ];

  return (
    <div className="min-h-screen bg-slate-100 py-12 px-4 sm:px-8 pb-32">
      <div className="max-w-3xl mx-auto">
        <header className="mb-12 border-b border-neutral-300 pb-6">
          <h1 className="text-3xl font-extrabold text-neutral-800">FitCree Form Components</h1>
          <p className="text-neutral-500 mt-2">FormLayout.tsx の全コンポーネント一覧です。</p>
        </header>

        {/* FormLayout Components */}
        <section>
          <div className="space-y-8">

            <div id="formheader">
              <h2 className="text-sm font-bold text-blue-500 mb-3">FormHeader</h2>
              <FormLayout.FormHeader title="案件を投稿する" onPreview={() => alert('プレビュー')} />
            </div>

            <div id="formstepper">
              <h2 className="text-sm font-bold text-indigo-600 mb-3">FormStepper</h2>
              <FormLayout.FormStepper currentStep={2} steps={steps} />
            </div>

            <div id="formfooter">
              <h2 className="text-sm font-bold text-indigo-600 mb-3">FormFooter</h2>
              <FormLayout.FormFooter 
                onBack={() => alert('戻る')} 
                onNext={() => alert('次へ')} 
                isFirst={false} 
                isLast={false} 
              />
            </div>

          </div>
        </section>

      </div>
    </div>
  );
}