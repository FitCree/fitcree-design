"use client";

import React, { useState } from 'react';
import {
  Search,
  Filter,
  Star,
  MapPin,
  ExternalLink,
  ChevronRight,
  User as UserIcon
} from 'lucide-react';
import { MOCK_CREATORS } from '@/data/mock-data';
import Link from 'next/link';

export default function CreatorsPage() {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div className="bg-neutral-50 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header & Search Area */}
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-neutral-900 font-outfit">クリエイターを探す (このページは仮作成中)</h1>
          <p className="text-neutral-500 mt-1">あなたのプロジェクトに最適なパートナーを見つけましょう</p>
        </div>

        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400" size={20} />
            <input
              type="text"
              placeholder="キーワード、スキル、カテゴリーで検索"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white border border-neutral-200 rounded-2xl py-3.5 pl-12 pr-4 text-base focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all shadow-sm"
            />
          </div>
          <button className="inline-flex items-center justify-center px-6 py-3.5 bg-white border border-neutral-200 text-neutral-700 font-bold rounded-2xl hover:bg-neutral-50 transition-all shadow-sm gap-2">
            <Filter size={20} />
            詳細フィルタ
          </button>
          <button className="inline-flex items-center justify-center px-8 py-3.5 bg-blue-600 text-white font-bold rounded-2xl hover:bg-blue-700 transition-all shadow-md gap-2">
            検索する
          </button>
        </div>
      </div>

      {/* Main Content Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Sidebar Filters (Hidden on small screens for now) */}
        <div className="hidden lg:block space-y-8">
          <div className="space-y-4">
            <h3 className="font-bold text-neutral-900 border-b border-neutral-100 pb-2">カテゴリー</h3>
            <div className="space-y-2">
              {['デザイン', 'イラスト', '写真・動画', 'Web制作', 'ライティング'].map(cat => (
                <label key={cat} className="flex items-center gap-2 cursor-pointer group">
                  <input type="checkbox" className="w-4 h-4 rounded border-neutral-300 text-blue-600 focus:ring-blue-500" />
                  <span className="text-sm text-neutral-600 group-hover:text-neutral-900 transition-colors">{cat}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="font-bold text-neutral-900 border-b border-neutral-100 pb-2">スキル件数</h3>
            <div className="space-y-2">
              {['シルバー', 'ゴールド', 'プラチナ'].map(level => (
                <label key={level} className="flex items-center gap-2 cursor-pointer group">
                  <input type="checkbox" className="w-4 h-4 rounded border-neutral-300 text-blue-600 focus:ring-blue-500" />
                  <span className="text-sm text-neutral-600 group-hover:text-neutral-900 transition-colors">{level}</span>
                </label>
              ))}
            </div>
          </div>
        </div>

        {/* Results Area */}
        <div className="lg:col-span-3 space-y-6">
          <div className="flex items-center justify-between">
            <p className="text-sm text-neutral-500 font-medium">
              <span className="text-neutral-900 font-bold">{MOCK_CREATORS.length}</span> 名のクリエイターが見つかりました
            </p>
            <select className="bg-transparent text-sm font-bold text-neutral-700 focus:outline-none cursor-pointer">
              <option>おすすめ順</option>
              <option>新着順</option>
              <option>評価の高い順</option>
            </select>
          </div>

          <div className="space-y-4">
            {MOCK_CREATORS.map((creator) => (
              <div key={creator.id} className="bg-white rounded-3xl border border-neutral-200 p-6 hover:border-blue-300 transition-all group relative">
                <div className="flex flex-col md:flex-row gap-6">
                  {/* Avatar & Basic Info */}
                  <div className="flex-shrink-0 flex flex-col items-center">
                    <div className="relative">
                      <img
                        src={creator.avatarUrl}
                        alt={creator.name}
                        className="w-24 h-24 rounded-2xl object-cover bg-neutral-100 border border-neutral-100"
                      />
                      <div className="absolute -bottom-2 -right-2 bg-white rounded-full p-1.5 shadow-sm border border-neutral-100">
                        <div className="bg-green-500 w-3 h-3 rounded-full border-2 border-white"></div>
                      </div>
                    </div>
                  </div>

                  {/* Details */}
                  <div className="flex-1 space-y-4">
                    <div className="flex flex-wrap items-start justify-between gap-4">
                      <div>
                        <h3 className="text-xl font-bold text-neutral-900 group-hover:text-blue-600 transition-colors">
                          {creator.name}
                        </h3>
                        <div className="flex items-center gap-4 mt-2 text-sm text-neutral-500">
                          <span className="flex items-center gap-1">
                            <Star size={16} className="text-yellow-400 fill-yellow-400" />
                            <span className="font-bold text-neutral-700">4.9</span>
                            <span>(48)</span>
                          </span>
                          <span className="flex items-center gap-1">
                            <MapPin size={16} />
                            東京都
                          </span>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <button className="px-5 py-2.5 bg-white border border-neutral-200 text-neutral-700 text-sm font-bold rounded-xl hover:bg-neutral-50 transition-all">
                          プロフィール
                        </button>
                        <button className="px-5 py-2.5 bg-blue-600 text-white text-sm font-bold rounded-xl hover:bg-blue-700 transition-all shadow-sm">
                          相談する
                        </button>
                      </div>
                    </div>

                    <p className="text-neutral-600 text-sm leading-relaxed line-clamp-2">
                      UI/UXデザインを中心に、ブランド構築からデジタルの実装まで幅広くサポートします。クライアントの課題の本質を捉え、持続可能な価値を生み出すデザインを提供することが得意です。
                    </p>

                    <div className="flex flex-wrap gap-2">
                      {['UI/UX', 'Figma', 'React', 'Branding'].map(tag => (
                        <span key={tag} className="text-xs font-bold text-neutral-500 bg-neutral-100 px-3 py-1 rounded-full">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Secondary Actions (Mobile/Hover) */}
                <Link
                  href={`/client/creators/${creator.id}`}
                  className="absolute top-6 right-6 text-neutral-300 hover:text-blue-600 transition-colors"
                >
                  <ExternalLink size={20} />
                </Link>
              </div>
            ))}
          </div>

          <div className="pt-8 flex justify-center">
            <button className="flex items-center gap-2 text-neutral-500 font-bold hover:text-blue-600 transition-colors">
              もっと見る
              <ChevronRight size={20} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
