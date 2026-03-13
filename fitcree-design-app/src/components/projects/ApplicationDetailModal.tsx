'use client';

import React, { useMemo } from 'react';
import { User } from '@/types/data';
import { ApplicationData } from '@/data/mock-applications';
import {
  X,
  Star,
  MapPin,
  MessageSquare,
  FileText,
  CircleDollarSign,
  ExternalLink,
  Image as ImageIcon,
  Calendar,
  Handshake,
  UserCircle,
} from 'lucide-react';

interface ApplicationDetailModalProps {
  creator: User;
  application: ApplicationData;
  onClose: () => void;
  onViewProfile: (creatorId: string) => void;
  onHire: (creatorId: string) => void;
}

export default function ApplicationDetailModal({
  creator,
  application,
  onClose,
  onViewProfile,
  onHire,
}: ApplicationDetailModalProps) {
  const subtotal = useMemo(
    () => application.quotes.reduce((acc, q) => acc + q.price, 0),
    [application.quotes]
  );

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] flex flex-col animate-in fade-in zoom-in-95 duration-200">
        {/* ヘッダー */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-neutral-200 shrink-0">
          <h2 className="text-lg font-bold text-neutral-800">応募内容</h2>
          <button
            onClick={onClose}
            className="text-neutral-400 hover:text-neutral-600 p-1 rounded-lg hover:bg-neutral-100 transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        {/* スクロール本体 */}
        <div className="overflow-y-auto flex-1 px-6 py-5 space-y-6">
          {/* クリエイター情報 */}
          <div className="flex items-start gap-4 p-4 bg-neutral-50 rounded-lg border border-neutral-100">
            <img
              src={creator.avatarUrl}
              alt={creator.name}
              className="w-14 h-14 rounded-full border border-neutral-200 object-cover"
            />
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1 flex-wrap">
                <span className="font-bold text-neutral-800 text-base">{creator.name}</span>
                {creator.role && (
                  <span className="text-xs bg-slate-100 text-slate-600 px-2 py-0.5 rounded font-bold">
                    {creator.role}
                  </span>
                )}
              </div>
              <div className="flex items-center gap-3 text-sm text-neutral-500 flex-wrap">
                {creator.rating && (
                  <span className="flex items-center gap-1">
                    <Star size={13} className="text-amber-400 fill-amber-400" />
                    <span className="font-bold text-neutral-700">{creator.rating}</span>
                    {creator.reviewCount !== undefined && (
                      <span className="text-neutral-400">({creator.reviewCount}件)</span>
                    )}
                  </span>
                )}
                {creator.location && (
                  <span className="flex items-center gap-1">
                    <MapPin size={13} />
                    {creator.location}
                  </span>
                )}
              </div>
              {creator.skills && creator.skills.length > 0 && (
                <div className="flex flex-wrap gap-1.5 mt-2">
                  {creator.skills.slice(0, 5).map((skill) => (
                    <span
                      key={skill}
                      className="text-xs bg-neutral-100 text-neutral-600 px-2 py-0.5 rounded"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              )}
            </div>
            <div className="shrink-0 text-right">
              <div className="flex items-center gap-1 text-xs text-neutral-400 mb-0.5">
                <Calendar size={12} />
                応募日
              </div>
              <p className="text-sm font-bold text-neutral-600">{application.appliedDate}</p>
            </div>
          </div>

          {/* 提案メッセージ */}
          <section>
            <h3 className="flex items-center gap-2 text-sm font-bold text-neutral-800 mb-2">
              <MessageSquare size={15} className="text-blue-500" />
              提案メッセージ
            </h3>
            <p className="text-sm text-neutral-700 leading-relaxed whitespace-pre-wrap bg-white border border-neutral-200 rounded-lg p-4">
              {application.message}
            </p>
          </section>

          {/* 特に見せたい作品 */}
          {application.portfolios.length > 0 && (
            <section>
              <h3 className="flex items-center gap-2 text-sm font-bold text-neutral-800 mb-2">
                <ImageIcon size={15} className="text-blue-500" />
                特に見せたい作品
              </h3>
              <div className="space-y-3">
                {application.portfolios.map((item) => (
                  <div
                    key={item.id}
                    className="flex gap-4 p-3 border border-neutral-200 rounded-lg bg-white"
                  >
                    <div className="w-28 h-20 shrink-0 rounded-md overflow-hidden bg-neutral-100 border border-neutral-100">
                      <img
                        src={item.image}
                        alt=""
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <span className="text-[11px] bg-orange-50 text-orange-600 px-1.5 py-0.5 rounded border border-orange-100 font-bold">
                        {item.category}
                      </span>
                      <h4 className="font-bold text-neutral-800 text-sm leading-snug mt-1 line-clamp-1">
                        {item.title}
                      </h4>
                      {item.description && (
                        <p className="text-xs text-neutral-500 mt-0.5 line-clamp-1">
                          {item.description}
                        </p>
                      )}
                      {item.url && (
                        <div className="flex items-center gap-1 text-blue-500 text-xs font-bold mt-1 truncate">
                          <ExternalLink size={11} />
                          <span className="truncate">{item.url}</span>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* ラフ案 */}
          {application.roughDraft && (
            <section>
              <h3 className="flex items-center gap-2 text-sm font-bold text-neutral-800 mb-2">
                <FileText size={15} className="text-blue-500" />
                ラフ案・構成案
              </h3>
              <p className="text-sm text-neutral-700 leading-relaxed bg-white border border-neutral-200 rounded-lg p-4">
                {application.roughDraft}
              </p>
            </section>
          )}

          {/* 概算見積もり */}
          {application.quotes.length > 0 && (
            <section>
              <h3 className="flex items-center gap-2 text-sm font-bold text-neutral-800 mb-2">
                <CircleDollarSign size={15} className="text-blue-500" />
                概算見積もり
              </h3>
              <div className="bg-white border border-neutral-200 rounded-lg p-4">
                <div className="space-y-2 mb-3">
                  {application.quotes.map((q) => (
                    <div
                      key={q.id}
                      className="flex justify-between items-center py-1.5 border-b border-neutral-50 last:border-0"
                    >
                      <span className="text-sm text-neutral-700">{q.item}</span>
                      <span className="text-sm font-bold text-neutral-800">
                        {q.price.toLocaleString()} 円
                      </span>
                    </div>
                  ))}
                </div>
                <div className="flex justify-between items-center pt-3 border-t border-neutral-200">
                  <span className="text-sm font-bold text-neutral-800">合計</span>
                  <span className="text-lg font-bold text-neutral-900">
                    {subtotal.toLocaleString()} 円
                  </span>
                </div>
              </div>
            </section>
          )}
        </div>

        {/* フッターボタン */}
        <div className="px-6 py-4 border-t border-neutral-200 flex gap-3 shrink-0">
          <button
            onClick={() => onViewProfile(creator.id)}
            className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg border border-neutral-300 text-sm font-bold text-neutral-700 hover:bg-neutral-50 transition-all"
          >
            <UserCircle size={16} />
            プロフィールを見る
          </button>
          <button
            onClick={() => onHire(creator.id)}
            className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg bg-blue-500 text-white text-sm font-bold hover:bg-blue-700 transition-all"
          >
            <Handshake size={16} />
            このクリエイターに頼む
          </button>
        </div>
      </div>
    </div>
  );
}
