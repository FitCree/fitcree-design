"use client";

import React from 'react';
import { Eye, Heart, Share2, ExternalLink, Send, ChevronRight } from 'lucide-react';
import { WorkDetail } from '@/data/mock-work-details';
import { User } from '@/types/data';
import { PortfolioWork } from '@/types/data';
import WorkCard from './WorkCard';
import CreatorTabs from './CreatorTabs';


interface WorkDetailViewProps {
  work: WorkDetail;
  creator: User;
  /** プレビューモード（投稿前確認）の場合 true */
  isPreview?: boolean;
  /** 同じクリエイターの他の作品 */
  otherWorks?: PortfolioWork[];
  /** プレビュー時の公開ボタン押下コールバック */
  onPublish?: () => void;
}

/** セクション見出し（太字 + 下線） */
function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="text-lg font-bold text-neutral-800 pb-3 border-b border-neutral-200 mb-5">
      {children}
    </h2>
  );
}

export default function WorkDetailView({ work, creator, isPreview = false, otherWorks = [], onPublish }: WorkDetailViewProps) {
  return (
    <div className="min-h-screen bg-white">
      {/* ヒーロー画像 */}
      <div className="bg-neutral-100 py-8">
        <div className="max-w-4xl mx-auto px-4">
          <div className="rounded-xl overflow-hidden shadow-lg">
            <img
              src={work.heroImageUrl}
              alt={work.title}
              className="w-full aspect-[16/9] object-cover"
            />
          </div>
        </div>
      </div>

      {/* クリエイター情報バー（詳細ページのみ） */}
      {!isPreview && (
        <div className="max-w-4xl mx-auto px-4 py-6">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <img
                src={creator.avatarUrl}
                alt={creator.name}
                className="w-12 h-12 rounded-full border border-neutral-200"
              />
              <div>
                <p className="font-bold text-neutral-800">{creator.name}</p>
                <p className="text-xs text-neutral-500">{creator.role}</p>
                <div className="flex items-center gap-3 mt-1">
                  <span className="text-xs text-neutral-400">最終ログイン：8時間前</span>
                  <span className="text-xs text-green-600 font-medium">対応可能です</span>
                </div>
              </div>
            </div>
            <div className="flex flex-col items-end gap-2">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => alert('この機能は準備中です')}
                  className="bg-orange-500 hover:bg-orange-600 text-white text-sm font-bold py-2 px-5 rounded-lg transition-colors"
                >
                  編集する
                </button>
                <button
                  onClick={() => alert('この機能は準備中です')}
                  className="p-2 border border-neutral-200 rounded-lg hover:bg-neutral-50 transition-colors"
                >
                  <Share2 className="w-4 h-4 text-neutral-500" />
                </button>
              </div>
              {/* 統計 */}
              <div className="flex items-center gap-4 text-xs text-neutral-400">
                <span className="flex items-center gap-1">
                  <Eye className="w-3.5 h-3.5" /> {work.views}
                </span>
                <span className="flex items-center gap-1">
                  <Heart className="w-3.5 h-3.5" /> {work.likes}
                </span>
                <span className="flex items-center gap-1">
                  <Share2 className="w-3.5 h-3.5" /> {work.shares}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* メインコンテンツ */}
      <div className="max-w-4xl mx-auto px-4 pb-16">
        {/* タイトル */}
        <h1 className="text-2xl font-bold text-neutral-800 mb-10 mt-8">{work.title}</h1>

        {/* ── 作品概要 ── */}
        <section className="mb-10">
          <SectionHeading>作品概要</SectionHeading>

          {/* カテゴリ・期間 */}
          <div className="flex flex-wrap items-center gap-3 mb-4">
            <div className="flex items-center gap-2">
              <span className="text-xs text-neutral-500">分野：</span>
              <span className="inline-block text-xs text-white bg-neutral-700 rounded px-2 py-0.5 font-medium">
                {work.categoryLabel}
              </span>
            </div>
          </div>
          <div className="flex items-center gap-2 mb-5">
            <span className="text-xs text-neutral-500">担当期間：</span>
            <span className="text-sm text-neutral-700">{work.durationLabel}</span>
          </div>

          {/* 説明文 */}
          <p className="text-sm text-neutral-700 leading-relaxed whitespace-pre-line mb-6">
            {work.description}
          </p>

          {/* キャプチャ画像グリッド */}
          {work.captures.length > 0 && (
            <div className="grid grid-cols-2 gap-3">
              {work.captures.map((url, i) => (
                <div key={i} className="aspect-[4/3] rounded-lg overflow-hidden bg-neutral-100">
                  <img src={url} alt="" className="w-full h-full object-cover" />
                </div>
              ))}
            </div>
          )}
        </section>

        {/* ── 「WEBサイト」の制作情報 ── */}
        {work.category === 'web' && (
          <section className="mb-10">
            <SectionHeading>「WEBサイト」の制作情報</SectionHeading>

            <table className="w-full text-sm mb-5">
              <tbody>
                {work.siteName && (
                  <tr className="border-b border-neutral-100">
                    <td className="py-3 pr-4 text-neutral-500 w-36 align-top">サイト名：</td>
                    <td className="py-3 text-neutral-800">{work.siteName}</td>
                  </tr>
                )}
                {work.siteUrl && (
                  <tr className="border-b border-neutral-100">
                    <td className="py-3 pr-4 text-neutral-500 w-36 align-top">URL：</td>
                    <td className="py-3">
                      <a href={work.siteUrl} target="_blank" rel="noopener noreferrer"
                        className="text-blue-600 hover:text-blue-700 underline flex items-center gap-1 text-sm">
                        {work.siteUrl}
                        <ExternalLink className="w-3 h-3 flex-shrink-0" />
                      </a>
                    </td>
                  </tr>
                )}
                {work.industry && (
                  <tr className="border-b border-neutral-100">
                    <td className="py-3 pr-4 text-neutral-500 w-36 align-top">業種：</td>
                    <td className="py-3 text-neutral-800">{work.industry}</td>
                  </tr>
                )}
                {work.siteType && (
                  <tr className="border-b border-neutral-100">
                    <td className="py-3 pr-4 text-neutral-500 w-36 align-top">サイト種別：</td>
                    <td className="py-3 text-neutral-800">{work.siteType}</td>
                  </tr>
                )}
                {work.tools.length > 0 && (
                  <tr className="border-b border-neutral-100">
                    <td className="py-3 pr-4 text-neutral-500 w-36 align-top">使用ツール/スキル：</td>
                    <td className="py-3">
                      <div className="flex flex-wrap gap-2">
                        {work.tools.map((t, i) => (
                          <span key={i} className="text-sm text-neutral-600 bg-neutral-100 rounded-full px-3 py-0.5">
                            {t}
                          </span>
                        ))}
                      </div>
                    </td>
                  </tr>
                )}
                {work.siteTags.length > 0 && (
                  <tr>
                    <td className="py-3 pr-4 text-neutral-500 w-36 align-top">その他タグ：</td>
                    <td className="py-3">
                      <div className="flex flex-wrap gap-2">
                        {work.siteTags.map((t, i) => (
                          <span key={i} className="text-sm text-neutral-600 bg-neutral-100 rounded-full px-3 py-0.5">
                            {t}
                          </span>
                        ))}
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>

            {/* ターゲット・目的 */}
            {(work.target.length > 0 || work.purpose.length > 0) && (
              <table className="w-full text-sm">
                <tbody>
                  {work.target.length > 0 && (
                    <tr className="border-b border-neutral-100">
                      <td className="py-3 pr-4 text-neutral-500 w-36 align-top font-bold">ターゲット</td>
                      <td className="py-3">
                        <div className="flex flex-wrap gap-2">
                          {work.target.map((t, i) => (
                            <span key={i} className="text-sm text-orange-600 bg-orange-50 rounded-full px-3 py-0.5">
                              {t}
                            </span>
                          ))}
                        </div>
                      </td>
                    </tr>
                  )}
                  {work.purpose.length > 0 && (
                    <tr>
                      <td className="py-3 pr-4 text-neutral-500 w-36 align-top font-bold">目的/背景</td>
                      <td className="py-3">
                        <div className="flex flex-wrap gap-2">
                          {work.purpose.map((t, i) => (
                            <span key={i} className="text-sm text-orange-600 bg-orange-50 rounded-full px-3 py-0.5">
                              {t}
                            </span>
                          ))}
                        </div>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            )}
          </section>
        )}

        {/* ── 業務情報 ── */}
        <section className="mb-12">
          <SectionHeading>業務情報</SectionHeading>
          <table className="w-full text-sm">
            <tbody>
              <tr className="border-b border-neutral-100">
                <td className="py-3 pr-4 text-neutral-500 w-36 align-top">クライアント情報</td>
                <td className="py-3 text-neutral-800">
                  {work.clientType === 'self' ? '自主制作' :
                   work.clientType === 'client_anonymous' ? 'クライアントワーク（非公開）' :
                   work.clientName || 'クライアントワーク'}
                </td>
              </tr>
              <tr>
                <td className="py-3 pr-4 text-neutral-500 w-36 align-top">費用感</td>
                <td className="py-3 text-neutral-800">{work.cost}</td>
              </tr>
            </tbody>
          </table>
        </section>

        {/* ── CONTACT セクション（実際の詳細ページのみ） ── */}
        {!isPreview && (
          <section className="mb-12">
            <div className="bg-neutral-50 border border-neutral-200 rounded-2xl p-8">
              <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                <div>
                  <h2 className="text-2xl font-bold text-neutral-800 mb-1">CONTACT</h2>
                  <p className="text-sm text-neutral-600">
                    ぜひこのクリエイターに相談してみてください！
                  </p>
                </div>
                <button
                  onClick={() => alert('この機能は準備中です')}
                  className="flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-6 rounded-lg transition-colors flex-shrink-0"
                >
                  相談する
                  <Send className="w-4 h-4" />
                </button>
              </div>
              <div className="flex items-center gap-3 mt-6 pt-5 border-t border-neutral-200">
                <img
                  src={creator.avatarUrl}
                  alt={creator.name}
                  className="w-10 h-10 rounded-full border border-neutral-200"
                />
                <div>
                  <p className="font-bold text-neutral-800 text-sm">{creator.name}</p>
                  <p className="text-xs text-neutral-500">{creator.role}</p>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* ── 公開ボタン（プレビューのみ） ── */}
        {isPreview && onPublish && (
          <div className="pb-8">
            <button
              onClick={onPublish}
              className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-4 rounded-xl transition-all text-base flex items-center justify-center gap-2"
            >
              この内容で公開する
              <ChevronRight size={18} />
            </button>
          </div>
        )}

        {/* ── クリエイタータブ・人気作品（詳細ページのみ） ── */}
        {!isPreview && (
          <>
            {/* <div className="mb-6">
              <CreatorTabs activeTab="works" onTabChange={() => {}} />
            </div> */}

            {otherWorks.length > 0 && (
              <section>
                <h3 className="text-sm font-bold text-neutral-700 mb-4">その他の人気作品</h3>
                <div className="grid grid-cols-2 gap-5">
                  {otherWorks.slice(0, 4).map((w) => (
                    <WorkCard key={w.id} work={w} uniformRatio />
                  ))}
                </div>
                {otherWorks.length > 4 && (
                  <div className="mt-6">
                    <button
                      className="w-full py-3 border border-neutral-200 rounded-lg text-neutral-600 font-bold text-sm hover:bg-neutral-50 transition-colors"
                    >
                      もっとみる
                    </button>
                  </div>
                )}
              </section>
            )}
          </>
        )}
      </div>

    </div>
  );
}
