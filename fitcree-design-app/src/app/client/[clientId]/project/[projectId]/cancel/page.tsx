'use client';

import React, { useState, useMemo } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { ALL_PROJECTS } from '@/data/mock-projects';
import { PROJECT_STATUS_CONFIG } from '@/data/master-data';
import { FormHeader } from '@/components/forms/FormLayout';
import { CheckboxGrid } from '@/components/forms/FormElements';
import { ArrowLeft, ExternalLink, Info, AlertTriangle } from 'lucide-react';

const CANCEL_REASONS = [
  '依頼内容を見直したい',
  '予算・スケジュールが合わなくなった',
  '社内事情により中止になった',
  '他のサービス・方法で対応することにした',
  '希望に合うクリエイターが見つからなかった',
  'その他',
];

export default function CancelProjectPage() {
  const router = useRouter();
  const params = useParams();
  const clientId = params.clientId as string;
  const projectId = parseInt(params.projectId as string);

  const project = useMemo(
    () => ALL_PROJECTS.find((p) => p.id === projectId),
    [projectId]
  );

  const [cancelReasons, setCancelReasons] = useState<string[]>([]);
  const [agreed, setAgreed] = useState(false);

  const canSubmit = cancelReasons.length > 0 && agreed;

  const handleSubmit = () => {
    if (!canSubmit) return;
    if (window.confirm('この依頼を取り下げます。よろしいですか？')) {
      alert('依頼の取り下げが完了しました。');
      router.push(`/client/${clientId}`);
    }
  };

  if (!project) {
    return (
      <div className="min-h-screen bg-neutral-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-neutral-500 text-lg">案件が見つかりませんでした</p>
          <button
            onClick={() => router.back()}
            className="mt-4 text-blue-600 hover:underline"
          >
            戻る
          </button>
        </div>
      </div>
    );
  }

  const statusConfig = PROJECT_STATUS_CONFIG[project.status];
  const detailUrl = `/client/${clientId}/project/${projectId}`;

  return (
    <div className="min-h-screen bg-neutral-50 pb-16">
      {/* Header */}
      <FormHeader title="依頼の取り下げ" />

      <main className="max-w-2xl mx-auto pt-10 px-4">

        {/* 対象案件カード */}
        <section className="bg-white rounded-lg border border-neutral-200 p-5 mb-6">
          <p className="text-sm font-bold text-neutral-400 mb-2">取り下げ対象の案件</p>
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1 min-w-0">
              <h2 className="text-base font-bold text-neutral-800 leading-snug">{project.title}</h2>
              <div className="flex items-center gap-3 mt-2">
                <span className={`text-xs font-bold px-2 py-0.5 rounded ${statusConfig.bg} ${statusConfig.color}`}>
                  {project.statusLabel}
                </span>
                <span className="text-sm text-neutral-500">掲載日: {project.postedDate}</span>
              </div>
            </div>
            <a
              href={detailUrl}
              className="shrink-0 text-blue-600 hover:text-blue-800 text-sm font-bold flex items-center gap-1 mt-1"
            >
              詳細 <ExternalLink size={13} />
            </a>
          </div>
        </section>

        {/* 注意事項 */}
        <section className="bg-blue-50 border border-blue-100 rounded-lg p-5 mb-6">
          <div className="flex gap-3">
            <Info size={18} className="text-blue-500 shrink-0 mt-0.5" />
            <div className="space-y-2 text-sm text-neutral-700">
              <p>取り下げにあたり、<span className="font-bold">キャンセル料は発生しません</span>のでご安心ください。</p>
              <p>もしクリエイターと既に連絡を取っていた場合には、<span className="font-bold">別途クリエイターへのご連絡をおすすめ</span>します。</p>
              <p>取り下げ後、案件は非公開となり新規応募の受付が停止されます。</p>
            </div>
          </div>
        </section>

        {/* キャンセル理由 */}
        <section className="bg-white rounded-lg border border-neutral-200 p-5 mb-6">
          <h3 className="text-base font-bold text-neutral-800 mb-1">取り下げの理由を教えてください</h3>
          <p className="text-sm text-neutral-500 mb-4">複数選択可・今後のサービス改善に活用させていただきます</p>
          <CheckboxGrid
            options={CANCEL_REASONS}
            selectedValues={cancelReasons}
            onChange={setCancelReasons}
            cols={2}
          />
        </section>

        {/* 同意チェック */}
        <section className="bg-white rounded-lg border border-neutral-200 p-5 mb-8">
          <label className="flex items-start gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={agreed}
              onChange={(e) => setAgreed(e.target.checked)}
              className="mt-0.5 w-5 h-5 rounded accent-blue-500 focus:ring-blue-500"
            />
            <span className="text-sm text-neutral-700">
              <a href="#" className="text-blue-600 underline hover:text-blue-800">利用規約</a>
              および
              <a href="#" className="text-blue-600 underline hover:text-blue-800">キャンセルに関する事項</a>
              に同意する
            </span>
          </label>
        </section>

        {/* ボタン群 */}
        <div className="flex items-center justify-between gap-4">
          <button
            onClick={() => router.back()}
            className="flex items-center gap-2 py-2.5 px-5 rounded-lg border border-neutral-300 font-bold text-neutral-600 hover:bg-neutral-100 transition-all text-sm"
          >
            <ArrowLeft size={15} />
            戻る
          </button>
          <button
            onClick={handleSubmit}
            disabled={!canSubmit}
            className={`flex items-center gap-2 py-2.5 px-6 rounded-lg font-bold text-sm transition-all ${
              canSubmit
                ? 'bg-red-600 text-white hover:bg-red-700'
                : 'bg-neutral-200 text-neutral-400 cursor-not-allowed'
            }`}
          >
            <AlertTriangle size={15} />
            この依頼を取り下げる
          </button>
        </div>

      </main>
    </div>
  );
}
