"use client";

import React, { useState } from 'react';
import {
  Settings2,
  ChevronRight,
  Eye,
} from 'lucide-react';
import Link from 'next/link';
import { FormSection } from '@/components/forms/elements/FormSection';
import { TextInput } from '@/components/forms/elements/TextInput';
import { TextArea } from '@/components/forms/elements/TextArea';
import { SelectInput } from '@/components/forms/elements/SelectInput';
import { RadioList } from '@/components/forms/elements/RadioList';
import { FileUploader } from '@/components/forms/elements/FileUploader';

const VARIANT = 'creator';

// 分野選択肢
const FIELD_OPTIONS = ['WEB', 'グラフィック', 'イラスト', '写真', '動画', 'ライティング', '音楽・サウンド', '声・パフォーマンス', 'エンジニアリング', 'その他'];

// 都道府県
const PREFECTURES = [
  '北海道', '青森県', '岩手県', '宮城県', '秋田県', '山形県', '福島県',
  '茨城県', '栃木県', '群馬県', '埼玉県', '千葉県', '東京都', '神奈川県',
  '新潟県', '富山県', '石川県', '福井県', '山梨県', '長野県', '岐阜県',
  '静岡県', '愛知県', '三重県', '滋賀県', '京都府', '大阪府', '兵庫県',
  '奈良県', '和歌山県', '鳥取県', '島根県', '岡山県', '広島県', '山口県',
  '徳島県', '香川県', '愛媛県', '高知県', '福岡県', '佐賀県', '長崎県',
  '熊本県', '大分県', '宮崎県', '鹿児島県', '沖縄県', '海外',
];

// 市区町村（宮城県の例）
const CITIES_MIYAGI = ['仙台市', '石巻市', '大崎市', '登米市', '栗原市', '気仙沼市', '名取市', '多賀城市', '塩竈市', 'その他'];

// 区分選択肢
const CLASSIFICATION_OPTIONS = [
  { id: 'individual', label: '個人（屋号なし）' },
  { id: 'individual_brand', label: '個人（屋号あり）' },
];

// 主な利用用途
const USAGE_OPTIONS = [
  { id: 'creator', label: 'クリエイター（受注する）' },
  { id: 'client', label: 'クライアント（発注する）' },
];

// 本人確認情報
const VERIFICATION_ITEMS = [
  { label: '電話番号', status: '設定なし' },
  { label: '本人確認', status: '未確認' },
  { label: '機密保持契約(NDA)', status: '未契約' },
  { label: 'インボイス', status: '未設定' },
];

export default function CreatorProfileEditPage() {
  // 自己紹介
  const [catchphrase, setCatchphrase] = useState('キャラクターに命を吹き込む、物語のあるイラストを。');
  const [bio, setBio] = useState(
    '幅広いタッチでのイラスト制作が可能です。特にソーシャルゲームや出版向けのキャラクターデザインに強みがあります。\n\nキャラクターの表情ひとつで、見る人の心に届くものが変わると信じています。\n「このキャラクター、なんだか好きだな」と思ってもらえるような、親しみやすさと個性を両立したイラストを目指しています。'
  );

  // 基本プロフィール
  const [displayName, setDisplayName] = useState('山田 イラストマン');
  const [profileImage, setProfileImage] = useState<string | null>('https://api.dicebear.com/7.x/avataaars/svg?seed=Jack');
  const [field, setField] = useState('イラスト');
  const [jobTitle, setJobTitle] = useState('イラストレーター');
  const [prefecture, setPrefecture] = useState('東京都');
  const [city, setCity] = useState('');
  const [classification, setClassification] = useState('individual');
  const [brandName, setBrandName] = useState('株式会社FitCree');
  const [usage, setUsage] = useState('creator');

  // 外部リンク
  const [mysite, setMysite] = useState('');
  const [sns, setSns] = useState({
    x: '',
    note: '',
    instagram: '',
    tiktok: '',
    youtube: '',
    facebook: '',
  });

  const handleSnsChange = (key: string, value: string) => {
    setSns(prev => ({ ...prev, [key]: value }));
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 pb-16 text-neutral-900">
      {/* ページヘッダー */}
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-2xl font-bold flex items-center gap-2 text-neutral-800 tracking-tight border-b-2 border-orange-500 pb-2 inline-flex">
          <Settings2 className="text-orange-500" strokeWidth={3} />
          プロフィール編集
        </h1>
        <Link
          href="/creator?tab=profile"
          className="flex items-center gap-2 px-5 py-2.5 bg-orange-500 hover:bg-orange-600 text-white text-sm font-bold rounded-lg transition-colors"
        >
          <Eye className="w-4 h-4" />
          実際の表示を確認
        </Link>
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        {/* サイドナビゲーション */}
        <aside className="w-[20%] flex-shrink-0">
          <nav className="flex flex-col space-y-1">
            <Link
              href="/creator/profile"
              className="px-4 py-3 text-sm font-bold bg-orange-50 text-orange-600 border-l-4 border-orange-500"
            >
              基本情報
            </Link>
            <Link
              href="#"
              className="px-4 py-3 text-sm text-neutral-600 hover:bg-neutral-100 transition-colors"
            >
              ポートフォリオ管理
            </Link>
            <Link
              href="/creator/profile/skills"
              className="px-4 py-3 text-sm text-neutral-600 hover:bg-neutral-100 transition-colors"
            >
              スキル・ツール
            </Link>
          </nav>
        </aside>

        {/* メインコンテンツ */}
        <main className="w-[80%] space-y-12">

          {/* ═══════════ 自己紹介 ═══════════ */}
          <section className="bg-white rounded-xl border border-neutral-200 p-6 md:p-8">
            <h2 className="text-xl font-bold text-neutral-800 mb-6 pb-2 border-b border-neutral-200">自己紹介</h2>

            <FormSection label="キャッチフレーズ" variant={VARIANT}
              description="あなたの特徴、得意なことを一言で表しましょう（50文字以内、改行不可）"
            >
              <TextInput value={catchphrase} onChange={setCatchphrase} maxLength={50} variant={VARIANT} />
              <p className="text-sm text-orange-500 text-right mt-1 cursor-pointer hover:underline">キャッチコピーの例はこちら</p>
            </FormSection>

            <FormSection label="自己紹介文" variant={VARIANT}
              description="あなたのクリエイティブに対する想いや仕事への姿勢などを書きましょう（800文字以内、改行可）"
            >
              <TextArea value={bio} onChange={setBio} maxLength={800} rows={8} variant={VARIANT} />
              <p className="text-sm text-orange-500 text-right mt-1 cursor-pointer hover:underline">自己紹介文の例はこちら</p>
            </FormSection>
          </section>

          {/* ═══════════ 基本プロフィール情報 ═══════════ */}
          <section className="bg-white rounded-xl border border-neutral-200 p-6 md:p-8">
            <h2 className="text-xl font-bold text-neutral-800 mb-6 pb-2 border-b border-neutral-200">基本プロフィール情報</h2>

            <FormSection label="表示名" variant={VARIANT}>
              <TextInput value={displayName} onChange={setDisplayName} maxLength={20} variant={VARIANT} />
            </FormSection>

            <FormSection label="プロフィール写真" variant={VARIANT}>
              <div className="flex items-start gap-6">
                {/* 現在のアバター */}
                <div className="flex-shrink-0">
                  {profileImage ? (
                    <img
                      src={profileImage}
                      alt="プロフィール写真"
                      className="w-24 h-24 rounded-full border-2 border-orange-200 bg-orange-50 object-cover"
                    />
                  ) : (
                    <div className="w-24 h-24 rounded-full border-2 border-neutral-200 bg-neutral-100 flex items-center justify-center text-neutral-400">
                      No Image
                    </div>
                  )}
                </div>
                <div className="flex-1">
                  <p className="text-sm text-neutral-600 mb-3">
                    JPG、PNGファイルを選択してください。中央で丸く切り取られるため、正方形の写真を推奨しています。
                    <br />
                    <span className="text-xs text-neutral-500">画質は「保存」するまで反映されません。</span>
                  </p>
                  <FileUploader
                    label="写真をアップロード"
                    description="JPG, PNG（最大 3MB）"
                    accept="image/jpeg,image/png"
                    variant={VARIANT}
                    className="max-w-xs"
                  />
                </div>
              </div>
            </FormSection>

            <FormSection label="肩書き" variant={VARIANT}
              description="名前のすぐ下にも記載される肩書きです。メインとなる分野の選択と職種名を記載しましょう。「職種名」はあなたの職種を自由に記入してください。"
            >
              <div className="space-y-3">
                <div className="flex items-center gap-4">
                  <span className="text-sm font-bold text-neutral-700 w-16 flex-shrink-0">分野</span>
                  <SelectInput value={field} onChange={setField} options={FIELD_OPTIONS} variant={VARIANT} />
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-sm font-bold text-neutral-700 w-16 flex-shrink-0">職種名</span>
                  <TextInput value={jobTitle} onChange={setJobTitle} placeholder="例: WEBデザイナー" maxLength={20} variant={VARIANT} />
                </div>
              </div>
            </FormSection>

            <FormSection label="居住地" variant={VARIANT}>
              <div className="flex items-center gap-4">
                <SelectInput value={prefecture} onChange={setPrefecture} options={PREFECTURES} placeholder="選択" variant={VARIANT} />
                <SelectInput value={city} onChange={setCity} options={CITIES_MIYAGI} placeholder="選択" variant={VARIANT} />
              </div>
            </FormSection>

            <FormSection label="区分" variant={VARIANT}>
              <RadioList
                options={CLASSIFICATION_OPTIONS}
                name="classification"
                selectedValue={classification}
                onChange={setClassification}
                variant={VARIANT}
              />
              {classification === 'individual_brand' && (
                <div className="mt-3">
                  <TextInput value={brandName} onChange={setBrandName} placeholder="屋号を入力" variant={VARIANT} />
                </div>
              )}
              <p className="text-sm text-orange-500 mt-3 cursor-pointer hover:underline flex items-center gap-1">
                ✏️ 法人に切り替える
              </p>
            </FormSection>

            <FormSection label="主な利用用途" variant={VARIANT}
              description="再ログインやアクセス時の初期のモードになります。&#10;どちらを選択してもすべての機能をご利用いただけます。"
            >
              <RadioList
                options={USAGE_OPTIONS}
                name="usage"
                selectedValue={usage}
                onChange={setUsage}
                variant={VARIANT}
              />
            </FormSection>
          </section>

          {/* ═══════════ 外部リンク ═══════════ */}
          <section className="bg-white rounded-xl border border-neutral-200 p-6 md:p-8">
            <h2 className="text-xl font-bold text-neutral-800 mb-6 pb-2 border-b border-neutral-200">外部リンク</h2>

            <FormSection label="My サイト" variant={VARIANT}
              description="自分のウェブサイト・独自ドメインサイトをお持ちの場合に（1つのみ可）"
            >
              <div className="flex items-center gap-4">
                <span className="text-sm font-bold text-neutral-700 w-24 flex-shrink-0">URL</span>
                <TextInput value={mysite} onChange={setMysite} placeholder="URL" variant={VARIANT} />
              </div>
              <p className="text-xs text-neutral-500 mt-1 ml-28">例 : https://fitcree.com</p>
            </FormSection>

            <FormSection label="SNS" variant={VARIANT}>
              <div className="space-y-4">
                {[
                  { key: 'x', label: 'X', placeholder: '入力', example: 'https://x.com/*****' },
                  { key: 'note', label: 'note', placeholder: '入力', example: 'https://note.com/*****' },
                  { key: 'instagram', label: 'Instagram', placeholder: '入力', example: 'https://www.instagram.com/*****' },
                  { key: 'tiktok', label: 'TikTok', placeholder: '入力', example: 'https://tiktok.com/*****' },
                  { key: 'youtube', label: 'YouTube', placeholder: '入力', example: 'https://www.youtube.com/channel/*****' },
                  { key: 'facebook', label: 'Facebook', placeholder: '入力', example: 'https://www.facebook.com/*****' },
                ].map(({ key, label, placeholder, example }) => (
                  <div key={key}>
                    <div className="flex items-center gap-4">
                      <span className="text-sm font-bold text-neutral-700 w-24 flex-shrink-0">{label}</span>
                      <TextInput
                        value={sns[key as keyof typeof sns]}
                        onChange={(v: string) => handleSnsChange(key, v)}
                        placeholder={placeholder}
                        variant={VARIANT}
                      />
                    </div>
                    <p className="text-xs text-neutral-500 mt-1 ml-28">例 : {example}</p>
                  </div>
                ))}
              </div>
            </FormSection>
          </section>

          {/* ═══════════ 本人確認情報 ═══════════ */}
          <section className="bg-white rounded-xl border border-neutral-200 p-6 md:p-8">
            <h2 className="text-xl font-bold text-neutral-800 mb-6 pb-2 border-b border-neutral-200">本人確認情報</h2>

            <div className="divide-y divide-neutral-200">
              {VERIFICATION_ITEMS.map((item) => (
                <div key={item.label} className="flex items-center justify-between py-4">
                  <div className="flex items-center gap-6">
                    <span className="text-sm font-bold text-neutral-700 w-40">{item.label}</span>
                    <span className="text-sm text-neutral-500">{item.status}</span>
                  </div>
                  <button className="text-sm text-neutral-600 hover:text-orange-500 font-bold flex items-center gap-1 transition-colors">
                    設定 <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </section>

          {/* ═══════════ フッターボタン ═══════════ */}
          <div className="flex items-center justify-center gap-4 pt-4 pb-8">
            <button
              onClick={() => window.history.back()}
              className="px-8 py-3 bg-white border border-neutral-300 text-neutral-700 font-bold rounded-lg hover:bg-neutral-50 transition-colors"
            >
              キャンセル
            </button>
            <button
              onClick={() => alert('保存しました（デモ）')}
              className="px-8 py-3 bg-orange-500 hover:bg-orange-600 text-white font-bold rounded-lg transition-colors"
            >
              保存
            </button>
          </div>
        </main>
      </div>
    </div>
  );
}
