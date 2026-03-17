'use client';

import React from 'react';
import { Consultation } from '@/data/mock-consultations';
import {
  X,
  MapPin,
  MessageSquare,
  Briefcase,
  Calendar,
  CircleDollarSign,
  ExternalLink,
  Handshake,
  Building2,
  Image as ImageIcon,
} from 'lucide-react';

interface ConsultationDetailModalProps {
  consultation: Consultation;
  onClose: () => void;
  onViewClient: (clientId: string) => void;
  onAccept: (consultationId: string) => void;
}

export default function ConsultationDetailModal({
  consultation,
  onClose,
  onViewClient,
  onAccept,
}: ConsultationDetailModalProps) {
  const isActionable = consultation.status === 'unread' || consultation.status === 'read';

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] flex flex-col animate-in fade-in zoom-in-95 duration-200">
        {/* ヘッダー */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-neutral-200 shrink-0">
          <h2 className="text-lg font-bold text-neutral-800">お仕事の相談内容</h2>
          <button
            onClick={onClose}
            className="text-neutral-400 hover:text-neutral-600 p-1 rounded-lg hover:bg-neutral-100 transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        {/* スクロール本体 */}
        <div className="overflow-y-auto flex-1 px-6 py-5 space-y-6">
          {/* クライアント情報 */}
          <div className="flex items-start gap-4 p-4 bg-neutral-50 rounded-lg border border-neutral-100">
            <img
              src={consultation.clientAvatarUrl}
              alt={consultation.clientName}
              className="w-14 h-14 rounded-full border border-neutral-200 object-cover"
            />
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1 flex-wrap">
                <span className="font-bold text-neutral-800 text-base">
                  {consultation.clientName}
                </span>
              </div>
              {consultation.clientCompany && (
                <div className="flex items-center gap-1 text-sm text-neutral-500">
                  <Building2 size={13} />
                  {consultation.clientCompany}
                </div>
              )}
            </div>
            <div className="shrink-0 text-right">
              <div className="flex items-center gap-1 text-xs text-neutral-400 mb-0.5">
                <Calendar size={12} />
                相談日
              </div>
              <p className="text-sm font-bold text-neutral-600">{consultation.createdAt}</p>
            </div>
          </div>

          {/* 気になった作品 */}
          <section>
            <h3 className="flex items-center gap-2 text-sm font-bold text-neutral-800 mb-2">
              <ImageIcon size={15} className="text-orange-500" />
              気になった作品
            </h3>
            <div className="flex gap-4 p-3 border border-neutral-200 rounded-lg bg-white">
              <div className="w-28 h-20 shrink-0 rounded-md overflow-hidden bg-neutral-100 border border-neutral-100">
                <img
                  src={consultation.portfolioImage}
                  alt=""
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1 min-w-0 flex items-center">
                <h4 className="font-bold text-neutral-800 text-sm leading-snug line-clamp-2">
                  {consultation.portfolioTitle}
                </h4>
              </div>
            </div>
          </section>

          {/* 相談タイトル */}
          <section>
            <h3 className="flex items-center gap-2 text-sm font-bold text-neutral-800 mb-2">
              <Briefcase size={15} className="text-orange-500" />
              相談タイトル
            </h3>
            <p className="text-base font-bold text-neutral-900 bg-white border border-neutral-200 rounded-lg p-4">
              {consultation.title}
            </p>
          </section>

          {/* 希望条件 */}
          <section>
            <h3 className="flex items-center gap-2 text-sm font-bold text-neutral-800 mb-2">
              <CircleDollarSign size={15} className="text-orange-500" />
              希望条件
            </h3>
            <div className="bg-white border border-neutral-200 rounded-lg p-4 space-y-2">
              <div className="flex justify-between items-center py-1.5">
                <span className="text-sm text-neutral-500">カテゴリ</span>
                <span className="text-sm font-bold text-neutral-800">
                  {consultation.category}
                </span>
              </div>
              <div className="flex justify-between items-center py-1.5 border-t border-neutral-50">
                <span className="text-sm text-neutral-500">予算感</span>
                <span className="text-sm font-bold text-neutral-800">
                  {consultation.budgetRange}
                </span>
              </div>
              {consultation.deadline && (
                <div className="flex justify-between items-center py-1.5 border-t border-neutral-50">
                  <span className="text-sm text-neutral-500">希望納期</span>
                  <span className="text-sm font-bold text-neutral-800">
                    {consultation.deadline}
                  </span>
                </div>
              )}
            </div>
          </section>

          {/* 相談メッセージ */}
          <section>
            <h3 className="flex items-center gap-2 text-sm font-bold text-neutral-800 mb-2">
              <MessageSquare size={15} className="text-orange-500" />
              相談メッセージ
            </h3>
            <p className="text-sm text-neutral-700 leading-relaxed whitespace-pre-wrap bg-white border border-neutral-200 rounded-lg p-4">
              {consultation.message}
            </p>
          </section>
        </div>

        {/* フッターボタン */}
        <div className="px-6 py-4 border-t border-neutral-200 flex gap-3 shrink-0">
          <button
            onClick={() => onViewClient(consultation.clientId)}
            className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg border border-neutral-300 text-sm font-bold text-neutral-700 hover:bg-neutral-50 transition-all"
          >
            <ExternalLink size={16} />
            クライアント情報を見る
          </button>
          {isActionable && (
            <button
              onClick={() => onAccept(consultation.id)}
              className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg bg-orange-500 text-white text-sm font-bold hover:bg-orange-600 transition-all"
            >
              <Handshake size={16} />
              この相談を受ける
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
