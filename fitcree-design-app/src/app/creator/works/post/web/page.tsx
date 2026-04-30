'use client';

import React, { useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Globe, FileText, Wrench, Info } from 'lucide-react';
import { TextInput } from '@/components/forms/elements/TextInput';
import { TextArea } from '@/components/forms/elements/TextArea';
import { SelectInput } from '@/components/forms/elements/SelectInput';
import { TagInput } from '@/components/forms/elements/TagInput';
import { FileUploader } from '@/components/forms/elements/FileUploader';
import { FormSection } from '@/components/forms/elements/FormSection';
import { DetailSection } from '@/components/common/DetailSection';
import { AI_OPTIONS_WEB as AI_OPTIONS } from '@/constants/ai-options';
import { INDUSTRIES } from '@/constants/work-options';
import { PostFormHeader } from '@/components/creator/post/PostFormHeader';
import { PostSubmitButton } from '@/components/creator/post/PostSubmitButton';
import { SuggestedTags } from '@/components/creator/post/SuggestedTags';
import { BusinessInfoSection } from '@/components/creator/post/BusinessInfoSection';
import { PublicationSettingsSection } from '@/components/creator/post/PublicationSettingsSection';

// ===== おすすめタグデータ =====
const SUGGESTED_TAGS = {
  target: ['若年層', '高齢者', '女性', '男性'],
  purpose: ['UX向上', 'コンバージョン促進', '集客施策'],
  tools: ['Figma', 'Adobe Photoshop', 'Adobe XD', 'Illustrator', 'Sketch'],
  siteTags: ['ページ', 'オーシャンブルー', '近代的リッチ', '軽快'],
  responsibilities: ['ディレクション', 'デザイン', 'コーディング', 'ライティング', '撮影', '企画・構成'],
};

// ===== サイト種別 =====
const SITE_TYPES = [
  'コーポレートサイト',
  'サービスサイト',
  '採用サイト',
  'ブランドサイト',
  'LP（ランディングページ）',
  'ECサイト',
  'キャンペーンサイト',
  '予約サイト',
  'オウンドメディア',
  'ニュースサイト',
  'ブログサイト',
  'ポータルサイト',
  'マッチングサイト',
  'コミュニティサイト',
  '会員制サイト',
  'サブスクリプションサイト',
  'ポートフォリオサイト',
  'ギャラリーサイト',
  '学校サイト',
  '自治体サイト',
  'NPOサイト',
  'マニュアルサイト',
  'その他',
];

// ===== モック入力済みデータ =====
const PREFILLED_DATA = {
  siteUrl: 'https://fitcree.com/',
  title: '業務コード「Bakery」のコーポレートサイトデザイン',
  thumbnailUrl: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800',
  captures: [
    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=400',
    'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&q=80&w=400',
    'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&q=80&w=400',
  ],
  description: `お客様の課題解決を目的に、コーポレートサイトをリニューアルしました。ユーザビリティと視覚的訴求力の両立を目指し、モダンでクリーンなデザインに仕上げています。\n\nデニーネストでオポーネントスペースをメインシューアルにし、プランを確認しつつサービス内容を理解しやすい導線設計を行いました。\n\n特にCTAの配置やフォームのUX改善に注力しています。`,
  siteName: '業務コード「Bakery」',
  industry: '飲食',
  siteType: 'コーポレートサイト',
  target: ['#若年層', '#女性'],
  purpose: ['#UX向上', '#コンバージョン促進', '#集客施策'],
  durationValue: '1',
  durationUnit: 'ヶ月',
  tools: ['#Figma', '#Adobe Photoshop', '#Adobe XD'],
  siteTags: ['#ページ', '#オーシャンブルー', '#近代的リッチ', '#軽快'],
  responsibilities: ['#ディレクション', '#デザイン', '#コーディング'],
  clientType: 'client_anonymous',
  aiUsage: 'none',
  ageRestriction: 'all',
  visibility: 'public',
};

export default function PostWebPageWrapper() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-neutral-100" />}>
      <PostWebPage />
    </Suspense>
  );
}

function PostWebPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const prefilled = searchParams.get('prefilled') === '1';

  const [siteUrl, setSiteUrl] = useState(prefilled ? PREFILLED_DATA.siteUrl : '');
  const [siteAdded, setSiteAdded] = useState(prefilled);
  const [title, setTitle] = useState(prefilled ? PREFILLED_DATA.title : '');
  const [thumbnailUrl] = useState(prefilled ? PREFILLED_DATA.thumbnailUrl : '');
  const [captures] = useState<string[]>(prefilled ? PREFILLED_DATA.captures : []);
  const [description, setDescription] = useState(prefilled ? PREFILLED_DATA.description : '');
  const [siteName, setSiteName] = useState(prefilled ? PREFILLED_DATA.siteName : '');
  const [industry, setIndustry] = useState(prefilled ? PREFILLED_DATA.industry : '');
  const [siteType, setSiteType] = useState(prefilled ? PREFILLED_DATA.siteType : '');
  const [target, setTarget] = useState<string[]>(prefilled ? PREFILLED_DATA.target : []);
  const [purpose, setPurpose] = useState<string[]>(prefilled ? PREFILLED_DATA.purpose : []);
  const [durationValue, setDurationValue] = useState(prefilled ? PREFILLED_DATA.durationValue : '');
  const [durationUnit, setDurationUnit] = useState(prefilled ? PREFILLED_DATA.durationUnit : '');
  const [tools, setTools] = useState<string[]>(prefilled ? PREFILLED_DATA.tools : []);
  const [siteTags, setSiteTags] = useState<string[]>(prefilled ? PREFILLED_DATA.siteTags : []);
  const [responsibilities, setResponsibilities] = useState<string[]>(prefilled ? PREFILLED_DATA.responsibilities : []);
  const [clientType, setClientType] = useState(prefilled ? PREFILLED_DATA.clientType : 'self');
  const [clientName, setClientName] = useState('');
  const [aiUsage, setAiUsage] = useState(prefilled ? PREFILLED_DATA.aiUsage : 'none');
  const [ageRestriction, setAgeRestriction] = useState(prefilled ? PREFILLED_DATA.ageRestriction : 'all');
  const [visibility, setVisibility] = useState(prefilled ? PREFILLED_DATA.visibility : 'public');

  const previewUrl = '/creator/works/post/preview?category=web';

  const handleAddTag = (tag: string, current: string[], setter: (v: string[]) => void) => {
    if (!current.includes(`#${tag}`)) setter([...current, `#${tag}`]);
  };

  return (
    <div className="min-h-screen bg-neutral-100">
      <PostFormHeader
        onCancel={() => router.back()}
        onPublish={() => router.push(previewUrl)}
      />

      <main className="max-w-6xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

          {/* ===== 左カラム: サイトURL ===== */}
          <div className="lg:col-span-4">
            <div className="bg-white rounded-xl border border-neutral-200 p-6 lg:sticky lg:top-20">
              <h2 className="text-lg font-bold text-neutral-800 mb-1">
                <span className="text-orange-500">Webサイト</span> の作品を追加
              </h2>
              <p className="text-sm text-neutral-500 mb-5">
                WEBサイトのURLを入力してください。
              </p>

              <FormSection label="サイトURL" variant="creator">
                <TextInput
                  value={siteUrl}
                  onChange={setSiteUrl}
                  placeholder="https://fitcree.com/"
                  variant="creator"
                />
              </FormSection>

              <button
                onClick={() => setSiteAdded(true)}
                disabled={!siteUrl.trim()}
                className={`mt-4 w-full py-2.5 rounded-lg text-sm font-bold transition-all ${
                  siteUrl.trim()
                    ? 'bg-orange-500 text-white hover:bg-orange-600'
                    : 'bg-neutral-200 text-neutral-400 cursor-not-allowed'
                }`}
              >
                追加する
              </button>

              {siteAdded && siteUrl && (
                <div className="mt-5 p-3 bg-green-50 border border-green-200 rounded-lg">
                  <p className="text-sm text-green-700 font-bold flex items-center gap-1.5">
                    <Globe size={14} />
                    URLが追加されました
                  </p>
                  <p className="text-xs text-green-600 mt-1 truncate">{siteUrl}</p>
                </div>
              )}

              <div className="mt-6 p-3 bg-blue-50 border border-blue-100 rounded-lg">
                <p className="text-xs text-blue-700 leading-relaxed flex items-start gap-1.5">
                  <Info size={13} className="shrink-0 mt-0.5" />
                  <span>
                    このURLのサムネイルは自動で取得されることがあります。取得に問題がある場合は手動でアップロードしてください。
                  </span>
                </p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-8 space-y-8">
            <DetailSection title="作品概要" icon={FileText} bodyClassName="p-6 space-y-0">
              <FormSection
                label="作品タイトル"
                required
                variant="creator"
                description="このページのタイトルとして表示されます。検索を意識した組合せで、クライアントも使用するようなキーワードを入れましょう。"
                examples={[
                  '株式会社〇〇 コーポレートサイト制作',
                  '新規開店の子育てシステム入りLPデザイン',
                  '新ブランドの「チラシ」LPリニューアル',
                ]}
              >
                <TextInput value={title} onChange={setTitle} placeholder="作品タイトルを入力してください" maxLength={80} variant="creator" />
              </FormSection>

              <FormSection
                label="サムネイル画像"
                required
                variant="creator"
                description="この作品を一覧で表示する際のサムネイルをアップロードしてください。最も魅力が伝わる部分にしましょう。"
              >
                <FileUploader
                  variant="creator"
                  label="ファイルをアップロード"
                  description="またはドラッグ＆ドロップ"
                  accept="image/jpeg,image/png,image/webp"
                  previewImage={thumbnailUrl || null}
                />
              </FormSection>

              <FormSection
                label="キャプチャ"
                variant="creator"
                description="他にも見て欲しい部分などをアップロードしましょう。最大6枚まで追加できます。"
              >
                {captures.length > 0 && (
                  <div className="grid grid-cols-3 gap-3 mb-3">
                    {captures.map((url, i) => (
                      <div key={i} className="aspect-video rounded-lg overflow-hidden border border-neutral-200 bg-neutral-50">
                        <img src={url} alt="" className="w-full h-full object-cover" />
                      </div>
                    ))}
                  </div>
                )}
                <FileUploader variant="creator" label="ファイルをアップロード" description="またはドラッグ＆ドロップ" accept="image/jpeg,image/png" multiple />
              </FormSection>

              <FormSection
                label="作品説明文"
                variant="creator"
                description="この作品の目的や背景、制作で工夫した点、あなたの想いなどを自由に記入してください。 発注者はここから制作の意図やあなたの強みを読み取ります。"
                examples={[
                  '企業の採用強化を目的に、コーポレートサイトをリニューアルしました。学生が理解しやすいように情報を整理し、写真を多く取り入れています。',
                  '新しい飲食店ブランドの立ち上げに伴い、予約導線を意識したUI設計を行いました。ユーザーが直感的に操作できるよう、ボタン配置に工夫しています。',
                  '自主制作作品です。自分が得意とするシンプルなデザインを活かし、架空の美容室のサイトを想定して制作しました。',
                ]}
              >
                <TextArea value={description} onChange={setDescription} placeholder="作品の目的、制作背景、工夫した点などを記載してください" rows={8} maxLength={2000} variant="creator" />
              </FormSection>
            </DetailSection>

            <DetailSection title="「WEBサイト」の制作情報" icon={Wrench} bodyClassName="px-6 pb-6">
              <div className="mb-2">
                <p className="text-sm text-neutral-500 mt-4">
                  発注者があなたにお仕事を依頼する際の判断材料になります。適切なキーワードを記載し、仕事獲得率をアップさせましょう。
                </p>
              </div>

              <FormSection label="サイト名" required variant="creator" description="サイトの名前もしくは正式な名称を入力してください。">
                <TextInput value={siteName} onChange={setSiteName} placeholder="サイト名を入力" variant="creator" />
              </FormSection>

              <FormSection label="業種" variant="creator" description="このサイトの業種を選択しましょう。">
                <SelectInput value={industry} onChange={setIndustry} options={INDUSTRIES} placeholder="選択" variant="creator" />
              </FormSection>

              <FormSection label="サイト種別" variant="creator" description="LP・コーポレート・ECなど、WEBサイトの種類を選択しましょう。">
                <SelectInput value={siteType} onChange={setSiteType} options={SITE_TYPES} placeholder="選択" variant="creator" />
              </FormSection>

              <FormSection label="ターゲット" variant="creator" description="この作品の想定ターゲット（エンドユーザー）を入力しましょう。">
                <TagInput value={target} onChange={setTarget} placeholder="タグを追加" maxTags={10} variant="creator" />
                <SuggestedTags tags={SUGGESTED_TAGS.target} currentValues={target} onAdd={(tag) => handleAddTag(tag, target, setTarget)} />
              </FormSection>

              <FormSection label="目的／背景" variant="creator" description="この作品を作った目的や制作背景があれば、入力してください。">
                <TagInput value={purpose} onChange={setPurpose} placeholder="タグを追加" maxTags={10} variant="creator" />
                <SuggestedTags tags={SUGGESTED_TAGS.purpose} currentValues={purpose} onAdd={(tag) => handleAddTag(tag, purpose, setPurpose)} />
              </FormSection>

              <FormSection label="ツール／スキル" variant="creator" description="制作に使用したツールやスキルを追加しましょう。">
                <TagInput value={tools} onChange={setTools} placeholder="タグを追加" maxTags={10} variant="creator" />
                <SuggestedTags tags={SUGGESTED_TAGS.tools} currentValues={tools} onAdd={(tag) => handleAddTag(tag, tools, setTools)} />
              </FormSection>

              <FormSection label="自由タグ" variant="creator" description="カラーやテイストなど、このサイトの特徴的な雰囲気を自由に追記しましょう。">
                <TagInput value={siteTags} onChange={setSiteTags} placeholder="タグを追加" maxTags={15} variant="creator" />
                <SuggestedTags tags={SUGGESTED_TAGS.siteTags} currentValues={siteTags} onAdd={(tag) => handleAddTag(tag, siteTags, setSiteTags)} />
              </FormSection>
            </DetailSection>

            <BusinessInfoSection
              responsibilities={responsibilities}
              onResponsibilitiesChange={setResponsibilities}
              suggestedResponsibilities={SUGGESTED_TAGS.responsibilities}
              durationValue={durationValue}
              onDurationValueChange={setDurationValue}
              durationUnit={durationUnit}
              onDurationUnitChange={setDurationUnit}
              clientType={clientType}
              onClientTypeChange={setClientType}
              clientName={clientName}
              onClientNameChange={setClientName}
            />

            <PublicationSettingsSection
              aiOptions={AI_OPTIONS}
              aiUsage={aiUsage}
              onAiUsageChange={setAiUsage}
              ageRestriction={ageRestriction}
              onAgeRestrictionChange={setAgeRestriction}
              visibility={visibility}
              onVisibilityChange={setVisibility}
            />

            <PostSubmitButton onClick={() => router.push(previewUrl)} />
          </div>
        </div>
      </main>
    </div>
  );
}
