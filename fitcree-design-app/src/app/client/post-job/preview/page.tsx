'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Check, ChevronLeft, MapPin, Calendar, Clock, DollarSign, Tag, FileText, Link, Paperclip, Target, User, Edit2, PartyPopper, Home } from 'lucide-react';
import { JOB_POST_STEPS } from '@/../docs/specs/job-post-spec';

export default function JobPostPreviewPage() {
  const router = useRouter();
  const [data, setData] = useState<any>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);

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

  const getLabelForValue = (field: any, value: any) => {
    if (!value) return '-';
    if (Array.isArray(value)) {
      if (value.length === 0) return '-';
      return value.join(', ');
    }
    if (field.options) {
      const option = field.options.find((opt: any) => (typeof opt === 'string' ? opt === value : opt.id === value));
      if (option) {
        return typeof option === 'string' ? option : option.label;
      }
    }
    return value.toString();
  };

  const renderValue = (field: any) => {
    const value = data[field.id];
    
    if (field.type === 'conditional-date') {
      const type = data[`${field.id}Type`];
      if (type === 'date') return value || '-';
      const option = field.options?.find((opt: any) => opt.id === type);
      return option ? option.label : '-';
    }

    if (field.type === 'conditional-checkbox-grid') {
      const type = data[`${field.id}Type`];
      if (type === 'consult') return '相談して決める';
      return Array.isArray(value) && value.length > 0 ? value.join(', ') : '-';
    }

    if (field.type === 'card-radio') {
      const option = field.options?.find((opt: any) => opt.id === value);
      return option ? option.label : '-';
    }

    if (field.type === 'checkbox-grid') {
      if (!Array.isArray(value) || value.length === 0) return '-';
      return value.map((v: any) => {
        if (typeof v === 'string') return v;
        return v.title || v.label || v;
      }).join(', ');
    }

    if (field.type === 'tag-input') {
      if (!Array.isArray(value) || value.length === 0) return '-';
      return (
        <div className="flex flex-wrap gap-2 mt-1">
          {value.map((tag: string, i: number) => (
            <span key={i} className="px-2 py-1 bg-blue-50 text-blue-600 text-sm rounded-md font-medium">#{tag}</span>
          ))}
        </div>
      );
    }

    if (field.type === 'reference-url-input' || field.type === 'url-list') {
      if (!Array.isArray(value) || value.length === 0) return '-';
      return (
        <div className="space-y-1 mt-1">
          {value.map((url: string, i: number) => (
            <div key={i} className="flex items-center gap-2 text-blue-600 text-sm break-all underline">
              <Link size={14} />
              <a href={url} target="_blank" rel="noopener noreferrer">{url}</a>
            </div>
          ))}
        </div>
      );
    }

    if (field.type === 'reference-file-uploader') {
      if (!Array.isArray(value) || value.length === 0) return '-';
      return (
        <div className="space-y-1 mt-1">
          {value.map((file: any, i: number) => (
            <div key={i} className="flex items-center gap-2 text-neutral-600 text-sm">
              <Paperclip size={14} />
              <span>{file.name || `ファイル ${i + 1}`}</span>
            </div>
          ))}
        </div>
      );
    }

    if (field.type === 'toggle' || field.type === 'toggle-group') {
      // 簡易表示
      return value ? 'ON' : 'OFF';
    }

    if (field.type === 'textarea') {
      return <div className="whitespace-pre-wrap leading-relaxed">{value || '-'}</div>;
    }

    return getLabelForValue(field, value);
  };

  return (
    <div className="min-h-screen bg-slate-100 pb-20">
      {/* Sticky Header */}
      <div className="sticky top-0 z-10 bg-white/80 backdrop-blur-md border-b border-neutral-200">
        <div className="max-w-3xl mx-auto px-4 h-16 flex items-center justify-between">
          <button
            onClick={handleBack}
            className="flex items-center gap-2 text-sm font-bold text-neutral-600 hover:text-blue-600 transition-colors"
          >
            <ChevronLeft size={20} />
            戻る
          </button>
          <div className="text-center">
            <h1 className="text-base font-bold text-neutral-800">投稿内容の確認</h1>
            <p className="text-xs text-neutral-400 font-bold">Preview</p>
          </div>
          <div className="w-16"></div> {/* Spacer */}
        </div>
      </div>

      <div className="max-w-3xl mx-auto pt-8 px-4">
        {!data ? (
          <div className="bg-white border border-neutral-300 rounded-xl p-10 text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-neutral-100 text-neutral-400 rounded-full mb-4">
              <FileText size={32} />
            </div>
            <p className="text-neutral-500 mb-6">フォームの入力内容が見つかりません。</p>
            <button
              onClick={handleBack}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg font-bold hover:bg-blue-700 transition-colors"
            >
              入力画面に戻る
            </button>
          </div>
        ) : (
          <div className="space-y-6">
            {/* Header Card */}
            <div className="bg-white rounded-2xl border border-neutral-200 p-6 sm:p-8">
              <div className="flex justify-between flex-wrap gap-2 mb-4">
                {/* 依頼分野 */}
                <span className="px-3 py-1 bg-slate-700 text-white text-sm font-bold rounded-full">
                  {getLabelForValue(JOB_POST_STEPS[0].fields.find((f: any) => f.id === 'category'), data.category)}
                </span>
                {/* 募集期間 */}
                <span className="text-sm font-bold text-neutral-400 flex items-center gap-1">
                  <Clock size={12} />
                  募集期間：7日間 (デフォルト)
                </span>
              </div>
              <h2 className="text-2xl font-black text-neutral-800 mb-4">
                {data.title || '案件タイトル未入力'}
              </h2>
              <div className="flex flex-wrap gap-4 text-sm text-neutral-600 font-medium">
                <div className="flex items-center gap-1.5">
                  <DollarSign size={16} className="text-neutral-400" />
                  <span>{data.budgetRange || '予算未定'}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Calendar size={16} className="text-neutral-400" />
                  <span>納期：{renderValue(JOB_POST_STEPS[3].fields.find((f: any) => f.id === 'deadlineDate'))}</span>
                </div>
              </div>
            </div>

            {/* Content Sections */}
            {JOB_POST_STEPS.map((step: any) => (
              <div key={step.id} className="bg-white rounded-xl border border-neutral-200 overflow-hidden shadow-sm">
                {/* ステップタイトル */}
                <div className="bg-slate-500 py-3 px-5 flex items-center justify-between">
                  <h3 className="text-base text-white font-bold flex items-center gap-2">
                    <span>{step.id}</span>
                    <span>{step.title}</span>
                  </h3>
                  <button
                    onClick={handleBack}
                    className="text-white/80 hover:text-white flex items-center gap-2 text-xs font-bold transition-colors bg-white/10 px-3 py-2 rounded-lg"
                  >
                    <Edit2 size={12} />
                    編集する
                  </button>
                </div>
                <div className="p-6 sm:p-8 space-y-8">
                  {step.fields.map((field: any) => {
                    return (
                      <div key={field.id} className="group">
                        {/* fields label */}
                        <label className="block text-sm text-neutral-500 font-bold mb-2">
                          {field.label}
                        </label>
                        {/* 入力内容 */}
                        <div className="text-neutral-800 text-base font-medium">
                          {renderValue(field)}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}

            {/* Action Buttons */}
            <div className="pt-6 flex flex-col sm:flex-row gap-4">
              <button
                onClick={handleBack}
                className="flex-1 py-4 border-2 bg-white border-neutral-200 rounded-xl font-black text-neutral-500 hover:bg-neutral-50 hover:border-neutral-300 transition-all flex items-center justify-center gap-2"
              >
                内容を修正する
              </button>
              <button 
                onClick={() => setIsSubmitted(true)}
                className="flex-1 py-4 bg-blue-600 text-white rounded-xl font-black shadow-lg shadow-blue-200 hover:bg-blue-700 transition-all flex items-center justify-center gap-2"
              >
                <Check size={22} strokeWidth={3} />
                この内容で投稿する
              </button>
            </div>
            <p className="text-center text-sm text-neutral-400 font-medium">
              投稿後も、募集開始前であれば内容の編集が可能です。
            </p>
          </div>
        )}
      </div>

      {/* Submission Success Modal */}
      {isSubmitted && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-300">
          <div className="bg-white rounded-3xl p-8 max-w-sm w-full shadow-2xl text-center scale-in-center animate-in zoom-in-95 duration-300">
            <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
              <PartyPopper size={40} />
            </div>
            <h3 className="text-2xl font-black text-neutral-800 mb-2">投稿が完了しました！</h3>
            <p className="text-neutral-600 text-sm font-medium mb-8 leading-relaxed">
              案件の投稿を受け付けました。<br />
              クリエイターからの提案をお待ちください。
            </p>
            <button
              onClick={() => router.push('/')}
              className="w-full py-4 bg-slate-800 text-white rounded-2xl font-black flex items-center justify-center gap-2 hover:bg-slate-900 transition-all shadow-lg"
            >
              <Home size={20} />
              トップページへ
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
