"use client";

import React, { useState, useEffect, useCallback } from 'react';
import { Eye, Heart, Share2, ExternalLink, Send, ChevronRight, ChevronLeft, MapPin, Check, Pencil, LogIn, X, MoreHorizontal } from 'lucide-react';
import { WorkDetail } from '@/data/mock-work-details';
import { User } from '@/types/data';
import { PortfolioWork } from '@/types/data';
import WorkCard from './WorkCard';
import CreatorTabs from './CreatorTabs';
import ActionLinkButton from '@/components/common/ActionLinkButton';
import GuestLoginCTA from '@/components/guest/GuestLoginCTA';
import type { ViewMode } from './CreatorProfileHeader';
import Link from 'next/link';


interface WorkDetailViewProps {
  work: WorkDetail;
  creator: User;
  /** プレビューモード（投稿前確認）の場合 true */
  isPreview?: boolean;
  /** 同じクリエイターの他の作品 */
  otherWorks?: PortfolioWork[];
  /** プレビュー時の公開ボタン押下コールバック */
  onPublish?: () => void;
  /** 表示モード */
  viewMode?: ViewMode;
}

/** セクション見出し（太字 + 下線） */
function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="text-lg font-bold text-neutral-800 pb-3 border-b border-neutral-200 mb-5">
      {children}
    </h2>
  );
}

export default function WorkDetailView({ work, creator, isPreview = false, otherWorks = [], onPublish, viewMode = 'creator' }: WorkDetailViewProps) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const images = work.category === 'photo'
    ? (work.photoImages ?? [])
    : work.category === 'graphic'
    ? (work.graphicImages ?? [])
    : (work.illustImages ?? []);

  const openLightbox = (index: number) => setLightboxIndex(index);
  const closeLightbox = () => setLightboxIndex(null);

  const goPrev = useCallback(() => {
    setLightboxIndex((i) => (i !== null ? (i - 1 + images.length) % images.length : null));
  }, [images.length]);

  const goNext = useCallback(() => {
    setLightboxIndex((i) => (i !== null ? (i + 1) % images.length : null));
  }, [images.length]);

  useEffect(() => {
    if (lightboxIndex === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') goPrev();
      else if (e.key === 'ArrowRight') goNext();
      else if (e.key === 'Escape') closeLightbox();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [lightboxIndex, goPrev, goNext]);

  return (
    <div className="min-h-screen bg-white">
      {/* ヒーロー画像 / 動画埋め込み / イラストグリッド */}
      <div className="bg-neutral-100 py-8">
        <div className="max-w-4xl mx-auto px-4">
          {(work.category === 'illustration' || work.category === 'photo' || work.category === 'graphic') && images.length > 0 ? (
            <div className="grid grid-cols-3 gap-3">
              {images.map((url, i) => (
                <div
                  key={i}
                  className="rounded-xl overflow-hidden shadow-md bg-white aspect-square cursor-zoom-in group relative"
                  onClick={() => openLightbox(i)}
                >
                  <img
                    src={url}
                    alt={`${work.title} ${i + 1}`}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300 rounded-xl" />
                </div>
              ))}
            </div>
          ) : (
            <div className="rounded-xl overflow-hidden shadow-lg">
              {work.category === 'video' && work.youtubeId ? (
                <div className="aspect-[16/9]">
                  <iframe
                    src={`https://www.youtube.com/embed/${work.youtubeId}`}
                    className="w-full h-full"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
              ) : (
                <img
                  src={work.heroImageUrl}
                  alt={work.title}
                  className="w-full aspect-[16/9] object-cover"
                />
              )}
            </div>
          )}
        </div>
      </div>

      {/* クリエイター情報バー（詳細ページのみ） */}
      {!isPreview && (
        <div className="max-w-4xl mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
            <div className="flex items-start gap-4">
              {viewMode === 'client' || viewMode === 'guest' ? (
                <Link href={viewMode === 'client' ? `/client/creators/${creator.id}` : `/guest/creator`}>
                  <img
                    src={creator.avatarUrl}
                    alt={creator.name}
                    className="w-14 h-14 rounded-full border border-neutral-200 hover:opacity-80 transition-opacity flex-shrink-0"
                  />
                </Link>
              ) : (
                <img
                  src={creator.avatarUrl}
                  alt={creator.name}
                  className="w-14 h-14 rounded-full border border-neutral-200 flex-shrink-0"
                />
              )}
              <div>
                {viewMode === 'client' || viewMode === 'guest' ? (
                  <Link href={viewMode === 'client' ? `/client/creators/${creator.id}` : `/guest/creator`} className={`font-bold text-neutral-800 text-lg transition-colors ${viewMode === 'client' ? 'hover:text-blue-600' : 'hover:text-orange-600'}`}>
                    {creator.name}
                  </Link>
                ) : (
                  <p className="font-bold text-neutral-800 text-lg">{creator.name}</p>
                )}
                {creator.role && (
                  <p className="text-sm text-neutral-600 mt-0.5">{creator.role}</p>
                )}
                <div className="flex flex-wrap items-center gap-3 mt-1.5">
                  <span className="text-xs text-neutral-600">個人</span>
                  {creator.location && (
                    <span className="flex items-center gap-1 text-xs text-neutral-600">
                      <MapPin className="w-3 h-3" />
                      {creator.location}
                    </span>
                  )}
                </div>
                {/* 認証バッジ */}
                <div className="flex flex-wrap items-center gap-3 mt-2">
                  <span className="flex items-center gap-1 text-xs text-neutral-600">
                    <Check className="w-3.5 h-3.5 text-green-500" />
                    本人確認
                  </span>
                  <span className="flex items-center gap-1 text-xs text-neutral-600">
                    <Check className="w-3.5 h-3.5 text-green-500" />
                    機密保持契約(NDA)
                  </span>
                  <span className="flex items-center gap-1 text-xs text-neutral-600">
                    <Check className="w-3.5 h-3.5 text-green-500" />
                    インボイス
                  </span>
                </div>
              </div>
            </div>
            <div className="flex flex-col items-stretch md:items-end gap-4 md:flex-shrink-0 w-full md:w-auto">
              <div className="flex items-center gap-2">
                {viewMode === 'creator' ? (
                  <ActionLinkButton href={`/creator/works/${work.id}/edit`} label="作品を編集" icon={Pencil} className="flex-1 justify-center md:flex-none" />
                ) : viewMode === 'guest' ? (
                  <Link
                    href="/login"
                    className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-orange-500 hover:bg-orange-600 text-white rounded-lg transition-colors text-sm font-bold md:flex-none"
                  >
                    <LogIn className="w-4 h-4" />
                    ログインして相談する
                  </Link>
                ) : (
                  <button
                    onClick={() => alert('お気に入りに追加しました')}
                    className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 border border-neutral-300 rounded-lg hover:bg-neutral-50 transition-colors text-sm font-bold text-neutral-700 md:flex-none"
                  >
                    <Heart className="w-4 h-4" />
                    お気に入り
                  </button>
                )}
                {viewMode === 'creator' ? (
                  <div className="relative flex-shrink-0">
                    <button
                      onClick={() => setMenuOpen(!menuOpen)}
                      className="p-2.5 border border-neutral-200 rounded-lg hover:bg-neutral-50 transition-colors"
                      aria-label="メニューを開く"
                    >
                      <MoreHorizontal className="w-4 h-4 text-neutral-600" />
                    </button>
                    {menuOpen && (
                      <>
                        <div className="fixed inset-0 z-10" onClick={() => setMenuOpen(false)} />
                        <div className="absolute right-0 top-11 z-20 w-44 bg-white border border-neutral-200 rounded-lg py-1 shadow-md">
                          {['下書きに戻す', '先頭固定表示', 'アクセス状況'].map((item) => (
                            <button
                              key={item}
                              onClick={() => { setMenuOpen(false); alert('この機能は準備中です'); }}
                              className="w-full text-left px-4 py-2 text-sm text-neutral-700 hover:bg-neutral-50"
                            >
                              {item}
                            </button>
                          ))}
                          <button
                            onClick={() => { setMenuOpen(false); alert('この機能は準備中です'); }}
                            className="w-full text-left px-4 py-2 text-sm text-red-500 hover:bg-red-50"
                          >
                            削除
                          </button>
                        </div>
                      </>
                    )}
                  </div>
                ) : (
                  <button
                    onClick={() => alert('この機能は準備中です')}
                    className="p-2.5 border border-neutral-200 rounded-lg hover:bg-neutral-50 transition-colors flex-shrink-0"
                  >
                    <Share2 className="w-4 h-4 text-neutral-600" />
                  </button>
                )}
              </div>
              {/* 統計 */}
              <div className="flex items-center gap-4 text-xs text-neutral-600">
                <span className="flex items-center gap-1">
                  <Eye className="w-4 h-4" /> {work.views}
                </span>
                <span className="flex items-center gap-1">
                  <Heart className="w-4 h-4" /> {work.likes}
                </span>
                <span className="flex items-center gap-1">
                  <Share2 className="w-4 h-4" /> {work.shares}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* メインコンテンツ */}
      <div className="max-w-4xl mx-auto px-4 pb-16">
        {/* タイトル */}
        <h1 className={`text-2xl font-bold text-neutral-800 mb-10 ${isPreview ? 'mt-4' : 'mt-8'}`}>{work.title}</h1>

        {/* ── 作品概要 ── */}
        <section className="mb-10">
          <SectionHeading>作品概要</SectionHeading>

          {/* カテゴリ・期間 */}
          <div className="flex flex-wrap items-center gap-3 mb-4">
            <div className="flex items-center gap-2">
              <span className="text-sm font-bold text-neutral-700">分野：</span>
              <span className="whitespace-nowrap px-4 py-1.5 rounded-full text-sm font-bold transition-colors bg-slate-700 text-white">
                {work.categoryLabel}
              </span>
            </div>
          </div>

          {/* 説明文 */}
          <p className="textbase text-neutral-800 leading-relaxed whitespace-pre-line mb-6">
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

        {/* ── 「動画」の制作情報 ── */}
        {work.category === 'video' && (
          <section className="mb-10">
            <SectionHeading>「動画」の制作情報</SectionHeading>
            <table className="w-full text-sm mb-5">
              <tbody>
                {work.videoName && (
                  <tr>
                    <td className="py-3 pr-4 font-bold text-neutral-800 md:w-40 align-top">動画タイトル・作品名</td>
                    <td className="py-3 text-neutral-800">{work.videoName}</td>
                  </tr>
                )}
                {work.industry && (
                  <tr>
                    <td className="py-3 pr-4 font-bold text-neutral-800 md:w-40 align-top">業種</td>
                    <td className="py-3 text-neutral-800">{work.industry}</td>
                  </tr>
                )}
                {work.videoType && (
                  <tr>
                    <td className="py-3 pr-4 font-bold text-neutral-800 md:w-40 align-top">動画種別</td>
                    <td className="py-3 text-neutral-800">{work.videoType}</td>
                  </tr>
                )}
                {work.tools.length > 0 && (
                  <tr>
                    <td className="py-3 pr-4 font-bold text-neutral-800 md:w-40 align-top">使用ツール／ソフト</td>
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
                    <td className="py-3 pr-4 font-bold text-neutral-800 md:w-40 align-top">自由タグ</td>
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
          </section>
        )}

        {/* ── 「イラスト・アート」の制作情報 ── */}
        {work.category === 'illustration' && (
          <section className="mb-10">
            <SectionHeading>「イラスト・アート」の制作情報</SectionHeading>
            <table className="w-full text-sm mb-5">
              <tbody>
                {work.illustName && (
                  <tr>
                    <td className="py-3 pr-4 font-bold text-neutral-800 md:w-40 align-top">イラスト・作品名</td>
                    <td className="py-3 text-neutral-800">{work.illustName}</td>
                  </tr>
                )}
                {work.industry && (
                  <tr>
                    <td className="py-3 pr-4 font-bold text-neutral-800 md:w-40 align-top">業種</td>
                    <td className="py-3 text-neutral-800">{work.industry}</td>
                  </tr>
                )}
                {work.illustType && (
                  <tr>
                    <td className="py-3 pr-4 font-bold text-neutral-800 md:w-40 align-top">イラスト種別</td>
                    <td className="py-3 text-neutral-800">{work.illustType}</td>
                  </tr>
                )}
                {work.artStyle && (
                  <tr>
                    <td className="py-3 pr-4 font-bold text-neutral-800 md:w-40 align-top">画風・スタイル</td>
                    <td className="py-3 text-neutral-800">{work.artStyle}</td>
                  </tr>
                )}
                {work.tools.length > 0 && (
                  <tr>
                    <td className="py-3 pr-4 font-bold text-neutral-800 md:w-40 align-top">使用ツール／ソフト</td>
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
                    <td className="py-3 pr-4 font-bold text-neutral-800 md:w-40 align-top">自由タグ</td>
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
          </section>
        )}

        {/* ── 「グラフィック」の制作情報 ── */}
        {work.category === 'graphic' && (
          <section className="mb-10">
            <SectionHeading>「グラフィック」の制作情報</SectionHeading>
            <table className="w-full text-sm mb-5">
              <tbody>
                {work.graphicName && (
                  <tr>
                    <td className="py-3 pr-4 font-bold text-neutral-800 md:w-40 align-top">グラフィックタイトル・作品名</td>
                    <td className="py-3 text-neutral-800">{work.graphicName}</td>
                  </tr>
                )}
                {work.industry && (
                  <tr>
                    <td className="py-3 pr-4 font-bold text-neutral-800 md:w-40 align-top">業種</td>
                    <td className="py-3 text-neutral-800">{work.industry}</td>
                  </tr>
                )}
                {work.graphicType && (
                  <tr>
                    <td className="py-3 pr-4 font-bold text-neutral-800 md:w-40 align-top">グラフィック種別</td>
                    <td className="py-3 text-neutral-800">{work.graphicType}</td>
                  </tr>
                )}
                {work.tools.length > 0 && (
                  <tr>
                    <td className="py-3 pr-4 font-bold text-neutral-800 md:w-40 align-top">使用ツール／ソフト</td>
                    <td className="py-3">
                      <div className="flex flex-wrap gap-2">
                        {work.tools.map((t, i) => (
                          <span key={i} className="text-sm text-neutral-600 bg-neutral-100 rounded-full px-3 py-0.5">{t}</span>
                        ))}
                      </div>
                    </td>
                  </tr>
                )}
                {work.siteTags.length > 0 && (
                  <tr>
                    <td className="py-3 pr-4 font-bold text-neutral-800 md:w-40 align-top">自由タグ</td>
                    <td className="py-3">
                      <div className="flex flex-wrap gap-2">
                        {work.siteTags.map((t, i) => (
                          <span key={i} className="text-sm text-neutral-600 bg-neutral-100 rounded-full px-3 py-0.5">{t}</span>
                        ))}
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </section>
        )}

        {/* ── 「写真」の制作情報 ── */}
        {work.category === 'photo' && (
          <section className="mb-10">
            <SectionHeading>「写真」の制作情報</SectionHeading>
            <table className="w-full text-sm mb-5">
              <tbody>
                {work.photoName && (
                  <tr>
                    <td className="py-3 pr-4 font-bold text-neutral-800 md:w-40 align-top">写真タイトル・作品名</td>
                    <td className="py-3 text-neutral-800">{work.photoName}</td>
                  </tr>
                )}
                {work.industry && (
                  <tr>
                    <td className="py-3 pr-4 font-bold text-neutral-800 md:w-40 align-top">業種</td>
                    <td className="py-3 text-neutral-800">{work.industry}</td>
                  </tr>
                )}
                {work.photoGenre && (
                  <tr>
                    <td className="py-3 pr-4 font-bold text-neutral-800 md:w-40 align-top">写真ジャンル</td>
                    <td className="py-3 text-neutral-800">{work.photoGenre}</td>
                  </tr>
                )}
                {work.shootingLocation && (
                  <tr>
                    <td className="py-3 pr-4 font-bold text-neutral-800 md:w-40 align-top">撮影場所</td>
                    <td className="py-3 text-neutral-800">{work.shootingLocation}</td>
                  </tr>
                )}
                {work.tools.length > 0 && (
                  <tr>
                    <td className="py-3 pr-4 font-bold text-neutral-800 md:w-40 align-top">使用機材／ソフト</td>
                    <td className="py-3">
                      <div className="flex flex-wrap gap-2">
                        {work.tools.map((t, i) => (
                          <span key={i} className="text-sm text-neutral-600 bg-neutral-100 rounded-full px-3 py-0.5">{t}</span>
                        ))}
                      </div>
                    </td>
                  </tr>
                )}
                {work.siteTags.length > 0 && (
                  <tr>
                    <td className="py-3 pr-4 font-bold text-neutral-800 md:w-40 align-top">自由タグ</td>
                    <td className="py-3">
                      <div className="flex flex-wrap gap-2">
                        {work.siteTags.map((t, i) => (
                          <span key={i} className="text-sm text-neutral-600 bg-neutral-100 rounded-full px-3 py-0.5">{t}</span>
                        ))}
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </section>
        )}

        {/* ── 「WEBサイト」の制作情報 ── */}
        {work.category === 'web' && (
          <section className="mb-10">
            <SectionHeading>「WEBサイト」の制作情報</SectionHeading>

            <table className="w-full text-sm mb-5">
              <tbody>
                {work.siteName && (
                  <tr className="">
                    <td className="py-3 pr-4 font-bold text-neutral-800 md:w-40 align-top">サイト名</td>
                    <td className="py-3 text-neutral-800">{work.siteName}</td>
                  </tr>
                )}
                {work.siteUrl && (
                  <tr>
                    <td className="py-3 pr-4 font-bold text-neutral-800 md:w-40 align-top">URL</td>
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
                  <tr>
                    <td className="py-3 pr-4 font-bold text-neutral-800 md:w-40 align-top">業種</td>
                    <td className="py-3 text-neutral-800">{work.industry}</td>
                  </tr>
                )}
                {work.siteType && (
                  <tr>
                    <td className="py-3 pr-4 font-bold text-neutral-800 md:w-40 align-top">サイト種別</td>
                    <td className="py-3 text-neutral-800">{work.siteType}</td>
                  </tr>
                )}
                {work.tools.length > 0 && (
                  <tr>
                    <td className="py-3 pr-4 font-bold text-neutral-800 md:w-40 align-top">使用ツール/スキル</td>
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
                    <td className="py-3 pr-4 font-bold text-neutral-800 md:w-40 align-top">その他タグ</td>
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
                {work.target.length > 0 && (
                  <tr>
                    <td className="py-3 pr-4 font-bold text-neutral-800 md:w-40 align-top">ターゲット</td>
                    <td className="py-3">
                      <div className="flex flex-wrap gap-2">
                        {work.target.map((t, i) => (
                          <span key={i} className="text-sm text-neutral-600 bg-neutral-100 rounded-full px-3 py-0.5">
                            {t}
                          </span>
                        ))}
                      </div>
                    </td>
                  </tr>
                )}
                {work.purpose.length > 0 && (
                  <tr>
                    <td className="py-3 pr-4 font-bold text-neutral-800 md:w-40 align-top">目的/背景</td>
                    <td className="py-3">
                      <div className="flex flex-wrap gap-2">
                        {work.purpose.map((t, i) => (
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
          </section>
        )}

        {/* ── 業務情報 ── */}
        <section className="mb-12">
          <SectionHeading>業務情報</SectionHeading>
          <table className="w-full text-sm">
            <tbody>
              {work.responsibilities.length > 0 && (
                <tr>
                  <td className="py-3 pr-4 font-bold text-neutral-800 md:w-40 align-top">担当範囲</td>
                  <td className="py-3">
                    <div className="flex flex-wrap gap-2">
                      {work.responsibilities.map((t, i) => (
                        <span key={i} className="text-sm text-neutral-600 bg-neutral-100 rounded-full px-3 py-0.5">
                          {t}
                        </span>
                      ))}
                    </div>
                  </td>
                </tr>
              )}
              {work.durationValue && (
                <tr>
                  <td className="py-3 pr-4 font-bold text-neutral-800 md:w-40 align-top">概算期間</td>
                  <td className="py-3 text-neutral-800">{work.durationValue}{work.durationUnit}</td>
                </tr>
              )}
              <tr>
                <td className="py-3 pr-4 font-bold text-neutral-800 md:w-40 align-top">クライアント情報</td>
                <td className="py-3 text-neutral-800">
                  {work.clientType === 'self' ? 'クライアントなし（自主制作／仮想制作）' :
                   work.clientType === 'client_anonymous' ? 'クライアントワーク（非公開）' :
                   work.clientName || 'クライアントワーク'}
                </td>
              </tr>
            </tbody>
          </table>
        </section>

        {/* ── CONTACT セクション（実際の詳細ページのみ） ── */}
        {!isPreview && (
          <section className="mb-12">
            <div className={`rounded-2xl p-10 border ${
              viewMode === 'client'
                ? 'bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200'
                : 'bg-gradient-to-br from-orange-50 to-orange-100 border-orange-200'
            }`}>
              <div className="flex flex-col items-center text-center gap-4">
                <h2 className="text-2xl font-bold text-neutral-800">CONTACT</h2>
                <p className="text-sm text-neutral-600">
                  ぜひこのクリエイターに相談してみてください！
                </p>
                <div className="flex items-center gap-3 mt-2">
                  <img
                    src={creator.avatarUrl}
                    alt={creator.name}
                    className="w-12 h-12 rounded-full border-2 border-white shadow-sm"
                  />
                  <div className="text-left">
                    <p className="font-bold text-neutral-800 text-sm">{creator.name}</p>
                    <p className="text-xs text-neutral-600">{creator.role}</p>
                  </div>
                </div>
                {viewMode === 'guest' ? (
                  <Link
                    href="/login"
                    className="flex items-center gap-2 text-white font-bold py-3.5 px-10 rounded-full transition-colors shadow-md mt-2 bg-orange-500 hover:bg-orange-600 shadow-orange-200"
                  >
                    <LogIn className="w-4 h-4" />
                    ログインして相談する
                  </Link>
                ) : viewMode === 'client' ? (
                  <Link
                    href={`/client/creators/${creator.id}/consult?workId=${work.id}`}
                    className="flex items-center gap-2 text-white font-bold py-3.5 px-10 rounded-full transition-colors shadow-md mt-2 bg-blue-600 hover:bg-blue-700 shadow-blue-200"
                  >
                    この作品について相談する
                    <Send className="w-4 h-4" />
                  </Link>
                ) : (
                  <button
                    onClick={() => alert('この機能は準備中です')}
                    className="flex items-center gap-2 text-white font-bold py-3.5 px-10 rounded-full transition-colors shadow-md mt-2 bg-orange-500 hover:bg-orange-600 shadow-orange-200"
                  >
                    相談する
                    <Send className="w-4 h-4" />
                  </button>
                )}
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
              <section className="mt-20 border-t border-neutral-200 pt-8">
                <h3 className="text-base font-bold text-neutral-700 mb-4">その他の人気作品</h3>
                <div className="grid grid-cols-2 gap-5">
                  {otherWorks.slice(0, 4).map((w) => (
                    <WorkCard key={w.id} work={w} uniformRatio viewMode={viewMode} />
                  ))}
                </div>
                {otherWorks.length > 4 && (
                  <div className="mt-6">
                    {viewMode === 'guest' ? (
                      <GuestLoginCTA message="すべての作品を見るにはログインが必要です" />
                    ) : (
                      <button
                        className="w-full py-3 border border-neutral-200 rounded-lg text-neutral-600 font-bold text-sm hover:bg-neutral-50 transition-colors"
                      >
                        もっとみる
                      </button>
                    )}
                  </div>
                )}
              </section>
            )}
          </>
        )}
      </div>

      {/* ===== ライトボックスモーダル ===== */}
      {lightboxIndex !== null && images.length > 0 && (
        <div
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center"
          onClick={closeLightbox}
        >
          {/* 閉じるボタン */}
          <button
            onClick={closeLightbox}
            className="absolute top-4 right-4 z-10 w-10 h-10 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
          >
            <X size={20} />
          </button>

          {/* 枚数カウンター */}
          <div className="absolute top-4 left-1/2 -translate-x-1/2 z-10 px-4 py-1.5 rounded-full bg-white/10 text-white text-sm font-bold">
            {lightboxIndex + 1} / {images.length}
          </div>

          {/* 前へボタン */}
          {images.length > 1 && (
            <button
              onClick={(e) => { e.stopPropagation(); goPrev(); }}
              className="absolute left-4 z-10 w-12 h-12 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
            >
              <ChevronLeft size={26} />
            </button>
          )}

          {/* メイン画像 */}
          <div
            className="max-w-4xl max-h-[85vh] mx-16 flex items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={images[lightboxIndex]}
              alt={`${work.title} ${lightboxIndex + 1}`}
              className="max-w-full max-h-[85vh] object-contain rounded-xl shadow-2xl"
            />
          </div>

          {/* 次へボタン */}
          {images.length > 1 && (
            <button
              onClick={(e) => { e.stopPropagation(); goNext(); }}
              className="absolute right-4 z-10 w-12 h-12 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
            >
              <ChevronRight size={26} />
            </button>
          )}

          {/* サムネイルドット */}
          {images.length > 1 && (
            <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex items-center gap-2">
              {images.map((_, i) => (
                <button
                  key={i}
                  onClick={(e) => { e.stopPropagation(); setLightboxIndex(i); }}
                  className={`rounded-full transition-all ${
                    i === lightboxIndex
                      ? 'w-5 h-2 bg-white'
                      : 'w-2 h-2 bg-white/40 hover:bg-white/70'
                  }`}
                />
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
