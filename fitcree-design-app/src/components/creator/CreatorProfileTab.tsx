import { User } from '@/types/data';
import { MapPin, Check, Link as LinkIcon, ExternalLink, Pencil } from 'lucide-react';
import ActionLinkButton from '@/components/common/ActionLinkButton';
import { ViewMode } from './CreatorProfileHeader';

// プロフィールのモックデータ（編集ページと同期）
const PROFILE_DATA = {
  catchphrase: 'キャラクターに命を吹き込む、物語のあるイラストを。',
  bio: `幅広いタッチでのイラスト制作が可能です。特にソーシャルゲームや出版向けのキャラクターデザインに強みがあります。

キャラクターの表情ひとつで、見る人の心に届くものが変わると信じています。
「このキャラクター、なんだか好きだな」と思ってもらえるような、親しみやすさと個性を両立したイラストを目指しています。`,
  links: {
    website: 'https://yamada-illustman.com',
    x: 'x.com/*****',
    instagram: 'instagram.com/*****',
    facebook: 'facebook.com/*****',
    youtube: 'youtube.com/*****',
    tiktok: 'tiktok.com/*****',
    note: 'note.com/*****',
  },
  verification: {
    identity: true,
    nda: true,
    invoice: true,
  },
};

interface CreatorProfileTabProps {
  user: User;
  viewMode?: ViewMode;
}

export default function CreatorProfileTab({ user, viewMode = 'creator' }: CreatorProfileTabProps) {
  return (
    <div className="max-w-2xl mx-auto space-y-10 py-6">

      {/* 自己紹介 */}
      <section>
        <div className="flex items-center justify-between mb-4 pb-2 border-b border-neutral-200">
          <h3 className="text-lg font-bold text-neutral-800">自己紹介</h3>
          {viewMode === 'creator' && (
            <ActionLinkButton href="/creator/profile" label="プロフィールを編集" icon={Pencil} />
          )}
        </div>

        {/* キャッチフレーズ */}
        <p className="text-2xl font-bold text-neutral-800 leading-relaxed mb-6">
          {PROFILE_DATA.catchphrase}
        </p>

        {/* 自己紹介文 */}
        <div className="text-base text-neutral-700 leading-relaxed whitespace-pre-line">
          {PROFILE_DATA.bio}
        </div>
      </section>

      {/* 外部リンク */}
      <section>
        <h3 className="text-lg font-bold text-neutral-800 mb-4 pb-2 border-b border-neutral-200">外部リンク</h3>

        <div className="space-y-3">
          {[
            { iconType: 'lucide' as const, label: 'My サイト', value: PROFILE_DATA.links.website },
            { iconType: 'image' as const, src: '/images/icon-sns/x.svg', label: 'X', value: PROFILE_DATA.links.x },
            { iconType: 'image' as const, src: '/images/icon-sns/note.svg', label: 'note', value: PROFILE_DATA.links.note },
            { iconType: 'image' as const, src: '/images/icon-sns/instagram.png', label: 'Instagram', value: PROFILE_DATA.links.instagram },
            { iconType: 'image' as const, src: '/images/icon-sns/tiktok.png', label: 'TikTok', value: PROFILE_DATA.links.tiktok },
            { iconType: 'image' as const, src: '/images/icon-sns/youtube.svg', label: 'YouTube', value: PROFILE_DATA.links.youtube },
            { iconType: 'image' as const, src: '/images/icon-sns/facebook.png', label: 'Facebook', value: PROFILE_DATA.links.facebook },
          ].map(({ iconType, src, label, value }) => (
            <div key={label} className="flex items-center gap-4 py-2">
              <span className="w-6 h-6 flex items-center justify-center text-neutral-500">
                {iconType === 'lucide' ? (
                  <LinkIcon className="w-4 h-4" />
                ) : (
                  <img src={src} alt={label} className="w-5 h-5 object-contain" />
                )}
              </span>
              <span className="text-sm font-bold text-neutral-700 w-24">{label}</span>
              <a
                href={value.startsWith('http') ? value : `https://${value}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-blue-600 hover:underline flex items-center gap-1"
              >
                {value}
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
