import { User } from '@/types/data';
import { MapPin, BadgeCheck, Settings, Share2, Check, Plus } from 'lucide-react';

interface CreatorProfileHeaderProps {
  user: User;
  onAddWork?: () => void;
}

export default function CreatorProfileHeader({ user, onAddWork }: CreatorProfileHeaderProps) {
  return (
    <section className="rounded-lg py-10 md:py-16 md:px-6">
      <div className="flex flex-col md:flex-row gap-6 md:gap-8">
        {/* アバター */}
        <div className="flex-shrink-0 flex justify-center md:justify-start">
          <img
            src={user.avatarUrl}
            alt={`${user.name}のアバター`}
            className="w-28 h-28 rounded-full border-2 border-neutral-200 bg-neutral-100"
          />
        </div>

        {/* プロフィール情報 */}
        <div className="flex-grow min-w-0">
          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
            {/* 左: 名前・ロール・ロケーション */}
            <div>
              <h1 className="text-2xl font-bold text-neutral-800">{user.name}</h1>
              {user.role && (
                <p className="text-neutral-500 text-sm mt-1">{user.role}</p>
              )}

              <div className="flex flex-wrap items-center gap-3 mt-3">
                <span className="text-sm text-neutral-700">個人</span>
                {user.location && (
                  <span className="flex items-center gap-1 text-sm text-neutral-700">
                    <MapPin className="w-3.5 h-3.5" aria-hidden="true" />
                    {user.location}
                  </span>
                )}
              </div>

              {/* 認証バッジ */}
              <div className="flex flex-wrap items-center gap-3 mt-3">
                <span className="flex items-center gap-1 text-sm text-neutral-500">
                  <Check className="w-4 h-4 text-green-500" aria-hidden="true" />
                  本人確認
                </span>
                <span className="flex items-center gap-1 text-sm text-neutral-500">
                  <Check className="w-4 h-4 text-green-500" aria-hidden="true" />
                  機密保持契約(NDA)
                </span>
                <span className="flex items-center gap-1 text-sm text-neutral-500">
                  <Check className="w-4 h-4 text-green-500" aria-hidden="true" />
                  インボイス
                </span>
              </div>
            </div>

            {/* 右: ボタン群 */}
            <div className="min-w-60 flex flex-col gap-2 flex-shrink-0">
              <button
                onClick={onAddWork}
                className="flex items-center gap-4 w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-4 rounded-lg transition-colors focus-visible:ring-2 focus-visible:ring-orange-500 focus-visible:ring-offset-2"
              >
                <Plus className="w-4 h-4" aria-hidden="true" />
                作品を追加
              </button>
              <div className="flex gap-2">
                <button
                  onClick={() => alert('このページは準備中です')}
                  className="flex items-center gap-4 flex-1 bg-white border border-neutral-200 text-neutral-700 font-bold py-3 px-4 rounded-lg hover:bg-neutral-50 transition-colors focus-visible:ring-2 focus-visible:ring-neutral-400 focus-visible:ring-offset-2 text-sm"
                >
                  <Settings className="w-4 h-4" aria-hidden="true" />
                  プロフィール編集
                </button>
                {/* <button
                  onClick={() => alert('このページは準備中です')}
                  className="flex items-center justify-center gap-2 flex-1 bg-white border border-neutral-200 text-neutral-700 font-bold py-3 px-4 rounded-lg hover:bg-neutral-50 transition-colors focus-visible:ring-2 focus-visible:ring-neutral-400 focus-visible:ring-offset-2 text-sm"
                >
                  <Share2 className="w-4 h-4" aria-hidden="true" />
                  シェア
                </button> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
