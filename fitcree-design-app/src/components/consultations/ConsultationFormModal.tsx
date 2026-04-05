'use client';

import React from 'react';
import {
  X,
  ChevronLeft,
  Send,
  CheckCircle2,
  Briefcase,
  CircleDollarSign,
  MessageSquare,
  Image as ImageIcon,
} from 'lucide-react';
import { User, PortfolioWork } from '@/types/data';

export interface ConsultFormData {
  workId: string;
  title: string;
  category: string;
  budgetRange: string;
  deadline: string;
  message: string;
}

interface ConsultationConfirmModalProps {
  step: 'confirm' | 'done';
  form: ConsultFormData;
  creator: User;
  selectedWork?: PortfolioWork;
  onBack: () => void;
  onConfirm: () => void;
  onClose: () => void;
}

export default function ConsultationConfirmModal({
  step,
  form,
  creator,
  selectedWork,
  onBack,
  onConfirm,
  onClose,
}: ConsultationConfirmModalProps) {
  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl max-w-lg w-full max-h-[90vh] flex flex-col animate-in fade-in zoom-in-95 duration-200">
        {/* ヘッダー */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-neutral-200 shrink-0">
          <h2 className="text-base font-bold text-neutral-800">
            {step === 'done' ? '相談を送信しました' : '内容の確認'}
          </h2>
          <button
            onClick={onClose}
            className="text-neutral-400 hover:text-neutral-600 p-1 rounded-lg hover:bg-neutral-100 transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        {/* コンテンツ */}
        <div className="overflow-y-auto flex-1 px-6 py-5">
          {step === 'confirm' && (
            <div className="space-y-5">
              <p className="text-sm text-neutral-500">以下の内容で相談を送信します。ご確認ください。</p>

              {selectedWork && (
                <section>
                  <h3 className="flex items-center gap-1.5 text-xs font-bold text-neutral-500 mb-2">
                    <ImageIcon size={13} className="text-orange-500" />
                    気になった作品
                  </h3>
                  <div className="flex gap-3 p-3 border border-neutral-200 rounded-lg">
                    <img
                      src={selectedWork.thumbnailUrl}
                      alt=""
                      className="w-20 h-14 object-cover rounded-md shrink-0"
                    />
                    <span className="text-sm font-bold text-neutral-800 self-center">
                      {selectedWork.title}
                    </span>
                  </div>
                </section>
              )}

              <section>
                <h3 className="flex items-center gap-1.5 text-xs font-bold text-neutral-500 mb-2">
                  <Briefcase size={13} className="text-orange-500" />
                  相談タイトル
                </h3>
                <p className="text-sm font-bold text-neutral-800 bg-neutral-50 rounded-lg p-3 border border-neutral-100">
                  {form.title}
                </p>
              </section>

              <section>
                <h3 className="flex items-center gap-1.5 text-xs font-bold text-neutral-500 mb-2">
                  <CircleDollarSign size={13} className="text-orange-500" />
                  希望条件
                </h3>
                <div className="bg-neutral-50 rounded-lg p-3 border border-neutral-100 space-y-1.5">
                  <div className="flex justify-between text-sm">
                    <span className="text-neutral-500">依頼分野</span>
                    <span className="font-bold text-neutral-800">{form.category}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-neutral-500">予算感</span>
                    <span className="font-bold text-neutral-800">{form.budgetRange}</span>
                  </div>
                  {form.deadline && (
                    <div className="flex justify-between text-sm">
                      <span className="text-neutral-500">希望納期</span>
                      <span className="font-bold text-neutral-800">
                        {form.deadline.replace(/-/g, '/')}
                      </span>
                    </div>
                  )}
                </div>
              </section>

              <section>
                <h3 className="flex items-center gap-1.5 text-xs font-bold text-neutral-500 mb-2">
                  <MessageSquare size={13} className="text-orange-500" />
                  相談メッセージ
                </h3>
                <p className="text-sm text-neutral-700 leading-relaxed whitespace-pre-wrap bg-neutral-50 rounded-lg p-3 border border-neutral-100">
                  {form.message}
                </p>
              </section>
            </div>
          )}

          {step === 'done' && (
            <div className="py-10 flex flex-col items-center gap-4 text-center">
              <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center">
                <CheckCircle2 size={36} className="text-green-500" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-neutral-800 mb-1">
                  相談を送信しました！
                </h3>
                <p className="text-sm text-neutral-500">
                  {creator.name}さんが確認次第、ご連絡いたします。
                  <br />
                  返信があり次第、お知らせします。
                </p>
              </div>
            </div>
          )}
        </div>

        {/* フッターボタン */}
        <div className="px-6 py-4 border-t border-neutral-200 flex gap-3 shrink-0">
          {step === 'confirm' && (
            <>
              <button
                onClick={onBack}
                className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg border border-neutral-300 text-sm font-bold text-neutral-700 hover:bg-neutral-50 transition-colors"
              >
                <ChevronLeft size={16} />
                修正する
              </button>
              <button
                onClick={onConfirm}
                className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg bg-blue-600 text-white text-sm font-bold hover:bg-blue-700 transition-colors"
              >
                <Send size={16} />
                送信する
              </button>
            </>
          )}
          {step === 'done' && (
            <button
              onClick={onClose}
              className="flex-1 py-2.5 rounded-lg bg-neutral-800 text-white text-sm font-bold hover:bg-neutral-700 transition-colors"
            >
              閉じる
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
