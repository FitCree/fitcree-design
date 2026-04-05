'use client';

import React, { useState, useMemo, Suspense } from 'react';
import { useParams, useRouter, useSearchParams } from 'next/navigation';
import {
  ChevronLeft,
  ChevronRight,
  Briefcase,
  CircleDollarSign,
  Calendar,
  MessageSquare,
  Image as ImageIcon,
} from 'lucide-react';
import { MOCK_CREATORS, MOCK_WORKS } from '@/data/mock-data';
import ConsultationConfirmModal, { ConsultFormData } from '@/components/consultations/ConsultationFormModal';
import { RadioList } from '@/components/forms/elements/RadioList';

const CATEGORY_OPTIONS = [
  'Webデザイン',
  'グラフィックデザイン',
  'フォトグラフィー',
  '動画制作',
  'イラスト',
  'ブランディング',
  'その他',
];

const BUDGET_OPTIONS = [
  '30,000円未満',
  '30,000円 〜 100,000円',
  '100,000円 〜 300,000円',
  '300,000円 〜 500,000円',
  '500,000円以上',
  '相談して決めたい',
];

const INITIAL_FORM: ConsultFormData = {
  workId: '',
  title: '',
  category: '',
  budgetRange: '',
  deadline: '',
  message: '',
};

function ConsultPageContent() {
  const params = useParams();
  const router = useRouter();
  const searchParams = useSearchParams();
  const creatorId = params.creatorId as string;
  const initialWorkId = searchParams.get('workId') ?? '';

  const creator = MOCK_CREATORS.find((c) => c.id === creatorId) || MOCK_CREATORS[0];
  const works = useMemo(
    () => MOCK_WORKS.filter((w) => w.creatorId === creator.id),
    [creator.id]
  );

  const [form, setForm] = useState<ConsultFormData>({ ...INITIAL_FORM, workId: initialWorkId });
  const [errors, setErrors] = useState<Partial<ConsultFormData>>({});
  const [modalStep, setModalStep] = useState<'confirm' | 'done' | null>(null);

  const selectedWork = works.find((w) => w.id === form.workId);

  function validate(): boolean {
    const newErrors: Partial<ConsultFormData> = {};
    if (!form.title.trim()) newErrors.title = '相談タイトルを入力してください';
    if (!form.category) newErrors.category = '分野を選択してください';
    if (!form.budgetRange) newErrors.budgetRange = '予算感を選択してください';
    if (!form.message.trim()) newErrors.message = '相談メッセージを入力してください';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  function handleConfirmOpen() {
    if (validate()) setModalStep('confirm');
  }

  function handleSend() {
    setModalStep('done');
  }

  function handleClose() {
    router.push(`/client/creators/${creator.id}`);
  }

  const backHref = initialWorkId
    ? `/client/works/${initialWorkId}`
    : `/client/creators/${creator.id}`;
  const backLabel = initialWorkId
    ? '作品ページに戻る'
    : `${creator.name}さんのページに戻る`;

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      {/* ページヘッダー */}
      <div className="mb-6">
        <button
          onClick={() => router.push(backHref)}
          className="flex items-center gap-1 text-sm text-neutral-500 hover:text-neutral-700 mb-4 transition-colors"
        >
          <ChevronLeft size={16} />
          {backLabel}
        </button>

        <div className="flex items-center gap-3">
          <img
            src={creator.avatarUrl}
            alt={creator.name}
            className="w-10 h-10 rounded-full border border-neutral-200"
          />
          <div>
            <p className="text-xs text-neutral-500">相談する相手</p>
            <p className="text-base font-bold text-neutral-800">{creator.name}</p>
          </div>
        </div>
      </div>

      <h1 className="text-xl font-black text-neutral-900 mb-6">お仕事の相談内容を入力</h1>

      {/* 作品から遷移した場合のコンテキストバナー */}
      {selectedWork && initialWorkId && (
        <div className="flex items-center gap-3 mb-6 p-3 bg-blue-50 border border-blue-200 rounded-lg">
          <img
            src={selectedWork.thumbnailUrl}
            alt=""
            className="w-14 h-10 object-cover rounded-md shrink-0"
          />
          <div className="min-w-0">
            <p className="text-xs text-blue-600 font-bold mb-0.5">この作品からの相談です</p>
            <p className="text-sm text-neutral-700 font-bold truncate">{selectedWork.title}</p>
          </div>
        </div>
      )}

      <div className="space-y-8">
        {/* 気になった作品 */}
        <div>
          <label className="flex items-center gap-1.5 text-sm font-bold text-neutral-700 mb-2">
            <ImageIcon size={14} className="text-orange-500" />
            気になった作品
            <span className="text-xs font-normal text-neutral-400 ml-1">任意</span>
          </label>
          <select
            value={form.workId}
            onChange={(e) => setForm((f) => ({ ...f, workId: e.target.value }))}
            className="w-full border border-neutral-200 rounded-lg px-3 py-3 text-sm text-neutral-700 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
          >
            <option value="">選択してください（任意）</option>
            {works.map((w) => (
              <option key={w.id} value={w.id}>
                {w.categoryLabel} / {w.title}
              </option>
            ))}
          </select>
          {selectedWork && (
            <div className="flex gap-3 mt-2 p-3 border border-neutral-200 rounded-lg bg-neutral-50">
              <img
                src={selectedWork.thumbnailUrl}
                alt=""
                className="w-16 h-12 object-cover rounded-md shrink-0"
              />
              <span className="text-sm text-neutral-700 self-center line-clamp-2">
                {selectedWork.title}
              </span>
            </div>
          )}
        </div>

        {/* 相談タイトル */}
        <div>
          <label className="flex items-center gap-1.5 text-sm font-bold text-neutral-700 mb-2">
            <Briefcase size={14} className="text-orange-500" />
            相談タイトル
            <span className="border border-red-700 text-red-700 bg-red-50 text-xs font-bold px-2 py-0.5 rounded-full">必須</span>
          </label>
          <input
            type="text"
            value={form.title}
            maxLength={100}
            onChange={(e) => {
              setForm((f) => ({ ...f, title: e.target.value }));
              if (errors.title) setErrors((e) => ({ ...e, title: undefined }));
            }}
            placeholder="例：カフェのブランディングをお願いしたい"
            className={`w-full border rounded-lg px-3 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white ${
              errors.title ? 'border-red-400' : 'border-neutral-200'
            }`}
          />
          <div className="flex justify-between items-center mt-1">
            {errors.title
              ? <p className="text-xs text-red-500">{errors.title}</p>
              : <span />
            }
            <p className={`text-xs ml-auto ${form.title.length >= 100 ? 'text-red-500 font-bold' : 'text-neutral-400'}`}>
              {form.title.length} / 100
            </p>
          </div>
        </div>

        {/* 分野 */}
        <div>
          <label className="flex items-center gap-1.5 text-sm font-bold text-neutral-700 mb-2">
            <Briefcase size={14} className="text-orange-500" />
            依頼したい分野
            <span className="border border-red-700 text-red-700 bg-red-50 text-xs font-bold px-2 py-0.5 rounded-full">必須</span>
          </label>
          <select
            value={form.category}
            onChange={(e) => {
              setForm((f) => ({ ...f, category: e.target.value }));
              if (errors.category) setErrors((e) => ({ ...e, category: undefined }));
            }}
            className={`w-full border rounded-lg px-3 py-3 text-sm text-neutral-700 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white ${
              errors.category ? 'border-red-400' : 'border-neutral-200'
            }`}
          >
            <option value="">選択してください</option>
            {CATEGORY_OPTIONS.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
          {errors.category && <p className="text-xs text-red-500 mt-1">{errors.category}</p>}
        </div>

        {/* 予算感 */}
        <div>
          <label className="flex items-center gap-1.5 text-sm font-bold text-neutral-700 mb-2">
            <CircleDollarSign size={14} className="text-orange-500" />
            予算感
            <span className="border border-red-700 text-red-700 bg-red-50 text-xs font-bold px-2 py-0.5 rounded-full">必須</span>
          </label>
          <RadioList
            options={BUDGET_OPTIONS}
            name="budgetRange"
            selectedValue={form.budgetRange}
            onChange={(v: string) => {
              setForm((f) => ({ ...f, budgetRange: v }));
              if (errors.budgetRange) setErrors((e) => ({ ...e, budgetRange: undefined }));
            }}
            cols={2}
            variant="client"
          />
          {errors.budgetRange && <p className="text-xs text-red-500 mt-1">{errors.budgetRange}</p>}
        </div>

        {/* 希望納期 */}
        <div>
          <label className="flex items-center gap-1.5 text-sm font-bold text-neutral-700 mb-2">
            <Calendar size={14} className="text-orange-500" />
            希望納期
            <span className="text-xs font-normal text-neutral-400 ml-1">任意</span>
          </label>
          <input
            type="date"
            value={form.deadline}
            onChange={(e) => setForm((f) => ({ ...f, deadline: e.target.value }))}
            className="w-full border border-neutral-200 rounded-lg px-3 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
          />
        </div>

        {/* 相談メッセージ */}
        <div>
          <label className="flex items-center gap-1.5 text-sm font-bold text-neutral-700 mb-2">
            <MessageSquare size={14} className="text-orange-500" />
            相談メッセージ
            <span className="border border-red-700 text-red-700 bg-red-50 text-xs font-bold px-2 py-0.5 rounded-full">必須</span>
          </label>
          <textarea
            value={form.message}
            onChange={(e) => {
              setForm((f) => ({ ...f, message: e.target.value }));
              if (errors.message) setErrors((e) => ({ ...e, message: undefined }));
            }}
            placeholder={`${creator.name}さんの作品を拝見し、ぜひご相談したいと思いご連絡しました。\n\n依頼内容の概要や背景など、詳しくお書きください。`}
            rows={8}
            className={`w-full border rounded-lg px-3 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none bg-white ${
              errors.message ? 'border-red-400' : 'border-neutral-200'
            }`}
          />
          {errors.message && <p className="text-xs text-red-500 mt-1">{errors.message}</p>}
        </div>
      </div>

      {/* 送信ボタン */}
      <div className="mt-10 flex gap-3">
        <button
          onClick={() => router.push(`/client/creators/${creator.id}`)}
          className="flex-1 py-3 rounded-lg border border-neutral-300 text-sm font-bold text-neutral-700 hover:bg-neutral-50 transition-colors"
        >
          キャンセル
        </button>
        <button
          onClick={handleConfirmOpen}
          className="flex-1 flex items-center justify-center gap-2 py-3 rounded-lg bg-blue-600 text-white text-sm font-bold hover:bg-blue-700 transition-colors"
        >
          内容を確認する
          <ChevronRight size={16} />
        </button>
      </div>

      {/* 確認・完了モーダル */}
      {modalStep && (
        <ConsultationConfirmModal
          step={modalStep}
          form={form}
          creator={creator}
          selectedWork={selectedWork}
          onBack={() => setModalStep(null)}
          onConfirm={handleSend}
          onClose={handleClose}
        />
      )}
    </div>
  );
}

export default function ConsultPage() {
  return (
    <Suspense fallback={<div className="min-h-screen" />}>
      <ConsultPageContent />
    </Suspense>
  );
}
