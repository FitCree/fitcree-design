'use client';

import React, { useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { FileText, Wrench } from 'lucide-react';
import { TextInput } from '@/components/forms/elements/TextInput';
import { TextArea } from '@/components/forms/elements/TextArea';
import { SelectInput } from '@/components/forms/elements/SelectInput';
import { TagInput } from '@/components/forms/elements/TagInput';
import { FormSection } from '@/components/forms/elements/FormSection';
import { DetailSection } from '@/components/common/DetailSection';
import { AI_OPTIONS_ILLUSTRATION as AI_OPTIONS } from '@/constants/ai-options';
import { INDUSTRIES } from '@/constants/work-options';
import { PostFormHeader } from '@/components/creator/post/PostFormHeader';
import { PostSubmitButton } from '@/components/creator/post/PostSubmitButton';
import { SuggestedTags } from '@/components/creator/post/SuggestedTags';
import { ImageUploadPanel } from '@/components/creator/post/ImageUploadPanel';
import { BusinessInfoSection } from '@/components/creator/post/BusinessInfoSection';
import { PublicationSettingsSection } from '@/components/creator/post/PublicationSettingsSection';
import type { UploadedImage } from '@/components/creator/post/ImageUploadPanel';

// ===== おすすめタグデータ =====
const SUGGESTED_TAGS = {
  tools: ['Procreate', 'Clip Studio Paint', 'Adobe Photoshop', 'Adobe Illustrator', 'SAI2', 'ibis Paint', 'Blender', 'GIMP'],
  illustTags: ['キャラクターデザイン', '背景イラスト', 'ファンアート', 'オリジナル', 'コミッション', 'カバーイラスト', 'グッズ用途'],
  responsibilities: ['ラフ', '線画', '彩色', '背景制作', 'キャラクターデザイン', 'コンセプトアート', 'ディレクション'],
};

// ===== イラスト種別 =====
const ILLUST_TYPES = [
  'キャラクターイラスト',
  '背景・風景イラスト',
  'コンセプトアート',
  'ゲームアート・UI',
  'ファンアート',
  '漫画・マンガ',
  'ライトノベル表紙',
  '書籍・雑誌挿絵',
  'グリーティングカード',
  'SNS用イラスト',
  'アニメーション用イラスト',
  '絵本・児童書',
  'ロゴ・アイコン',
  'キャラクターデザイン',
  'その他',
];

// ===== 画風・スタイル =====
const ART_STYLES = [
  'アニメ調',
  'リアル調',
  '水彩・アナログ風',
  '油彩風',
  'ドット絵・PixelArt',
  'ベクターイラスト',
  '手描き風',
  'ポップアート',
  'モノクロ・線画',
  'SD・デフォルメ',
  'その他',
];

// ===== モック入力済みデータ =====
const PREFILLED_IMAGES: UploadedImage[] = [
  { id: 'mock-1', preview: 'https://images.unsplash.com/photo-1541961017774-22349e4a1262?auto=format&fit=crop&q=80&w=400', name: 'main_visual.png' },
  { id: 'mock-2', preview: 'https://images.unsplash.com/photo-1578632767115-351597cf2477?auto=format&fit=crop&q=80&w=400', name: 'detail_01.png' },
  { id: 'mock-3', preview: 'https://images.unsplash.com/photo-1615184697985-c9bde1b07da7?auto=format&fit=crop&q=80&w=400', name: 'detail_02.png' },
];

const PREFILLED_DATA = {
  title: 'ファンタジーRPGのキャラクターデザイン集',
  description: `ファンタジーRPGゲームのメインキャラクター3名のデザインを担当しました。\n\n世界観設定に合わせた衣装・武器・カラーパレットを一から設計し、ゲーム内UIへの組み込みも想定したデザインになっています。ラフ→線画→彩色まで一気通貫で対応しました。`,
  illustName: 'ファンタジーRPG キャラクターデザイン',
  industry: 'メディア・エンタメ',
  illustType: 'キャラクターイラスト',
  artStyle: 'アニメ調',
  durationValue: '3',
  durationUnit: '週間',
  tools: ['#Clip Studio Paint', '#Adobe Photoshop'],
  illustTags: ['#キャラクターデザイン', '#ファンタジー', '#ゲームアート'],
  responsibilities: ['#ラフ', '#線画', '#彩色', '#キャラクターデザイン'],
  clientType: 'client_anonymous',
  aiUsage: 'none',
  ageRestriction: 'all',
  visibility: 'public',
};

export default function PostIllustrationPageWrapper() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-neutral-100" />}>
      <PostIllustrationPage />
    </Suspense>
  );
}

function PostIllustrationPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const prefilled = searchParams.get('prefilled') === '1';

  const [title, setTitle] = useState(prefilled ? PREFILLED_DATA.title : '');
  const [description, setDescription] = useState(prefilled ? PREFILLED_DATA.description : '');
  const [illustName, setIllustName] = useState(prefilled ? PREFILLED_DATA.illustName : '');
  const [industry, setIndustry] = useState(prefilled ? PREFILLED_DATA.industry : '');
  const [illustType, setIllustType] = useState(prefilled ? PREFILLED_DATA.illustType : '');
  const [artStyle, setArtStyle] = useState(prefilled ? PREFILLED_DATA.artStyle : '');
  const [tools, setTools] = useState<string[]>(prefilled ? PREFILLED_DATA.tools : []);
  const [illustTags, setIllustTags] = useState<string[]>(prefilled ? PREFILLED_DATA.illustTags : []);
  const [responsibilities, setResponsibilities] = useState<string[]>(prefilled ? PREFILLED_DATA.responsibilities : []);
  const [durationValue, setDurationValue] = useState(prefilled ? PREFILLED_DATA.durationValue : '');
  const [durationUnit, setDurationUnit] = useState(prefilled ? PREFILLED_DATA.durationUnit : '週間');
  const [clientType, setClientType] = useState(prefilled ? PREFILLED_DATA.clientType : 'self');
  const [clientName, setClientName] = useState('');
  const [aiUsage, setAiUsage] = useState(prefilled ? PREFILLED_DATA.aiUsage : 'none');
  const [ageRestriction, setAgeRestriction] = useState(prefilled ? PREFILLED_DATA.ageRestriction : 'all');
  const [visibility, setVisibility] = useState(prefilled ? PREFILLED_DATA.visibility : 'public');

  const previewUrl = '/creator/works/post/preview?category=illustration';

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

          <div className="lg:col-span-4">
            <ImageUploadPanel
              categoryLabel="イラスト・アート"
              uploadSubtitle="イラスト画像をアップロードしてください"
              hintText="1枚目の画像がサムネイルになります。最もインパクトのあるイラストを先頭にしましょう。"
              initialImages={prefilled ? PREFILLED_IMAGES : []}
            />
          </div>

          <div className="lg:col-span-8 space-y-8">
            <DetailSection title="作品概要" icon={FileText} bodyClassName="p-6 space-y-0">
              <FormSection
                label="作品タイトル"
                required
                variant="creator"
                description="この作品のタイトルとして表示されます。検索を意識したキーワードを含めましょう。"
                examples={[
                  'ファンタジーRPG キャラクターデザイン集',
                  'オリジナルキャラクター「ルナ」フルイラスト',
                  '書籍挿絵：異世界ファンタジー背景3点',
                ]}
              >
                <TextInput value={title} onChange={setTitle} placeholder="作品タイトルを入力してください" maxLength={80} variant="creator" />
              </FormSection>

              <FormSection
                label="作品説明文"
                variant="creator"
                description="この作品の目的・背景・制作で工夫した点などを自由に記入してください。"
                examples={[
                  'ゲーム用のメインキャラクターデザインを担当しました。世界観に合わせた衣装・配色を意識し、アニメ調で統一感のある仕上がりにしています。',
                  '書籍の挿絵として依頼された背景イラスト3点です。水彩風のテイストで温かみのある雰囲気を表現しました。',
                ]}
              >
                <TextArea value={description} onChange={setDescription} placeholder="作品の目的、制作背景、工夫した点などを記載してください" rows={8} maxLength={2000} variant="creator" />
              </FormSection>
            </DetailSection>

            <DetailSection title="「イラスト・アート」の制作情報" icon={Wrench} bodyClassName="px-6 pb-6">
              <div className="mb-2">
                <p className="text-sm text-neutral-500 mt-4">
                  発注者があなたにお仕事を依頼する際の判断材料になります。適切なキーワードを記載し、仕事獲得率をアップさせましょう。
                </p>
              </div>

              <FormSection label="イラスト・作品名" variant="creator" description="作品の正式タイトルや作品名を入力してください。">
                <TextInput value={illustName} onChange={setIllustName} placeholder="例：ファンタジーRPG キャラクターデザイン" variant="creator" />
              </FormSection>

              <FormSection label="業種" variant="creator" description="この作品に関連するクライアント業種を選択しましょう。">
                <SelectInput value={industry} onChange={setIndustry} options={INDUSTRIES} placeholder="選択" variant="creator" />
              </FormSection>

              <FormSection label="イラスト種別" variant="creator" description="制作したイラストの種類を選択しましょう。">
                <SelectInput value={illustType} onChange={setIllustType} options={ILLUST_TYPES} placeholder="選択" variant="creator" />
              </FormSection>

              <FormSection label="画風・スタイル" variant="creator" description="作品の画風やテイストを選択しましょう。">
                <SelectInput value={artStyle} onChange={setArtStyle} options={ART_STYLES} placeholder="選択" variant="creator" />
              </FormSection>

              <FormSection label="使用ツール／ソフト" variant="creator" description="制作に使用したソフトウェアやツールを追加しましょう。">
                <TagInput value={tools} onChange={setTools} placeholder="タグを追加" maxTags={10} variant="creator" />
                <SuggestedTags tags={SUGGESTED_TAGS.tools} currentValues={tools} onAdd={(tag) => handleAddTag(tag, tools, setTools)} />
              </FormSection>

              <FormSection label="自由タグ" variant="creator" description="作品のテーマや用途など、この作品の特徴を自由に追記しましょう。">
                <TagInput value={illustTags} onChange={setIllustTags} placeholder="タグを追加" maxTags={15} variant="creator" />
                <SuggestedTags tags={SUGGESTED_TAGS.illustTags} currentValues={illustTags} onAdd={(tag) => handleAddTag(tag, illustTags, setIllustTags)} />
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
