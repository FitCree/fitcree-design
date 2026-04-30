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
import { AI_OPTIONS_GRAPHIC as AI_OPTIONS } from '@/constants/ai-options';
import { INDUSTRIES } from '@/constants/work-options';
import { PostFormHeader } from '@/components/creator/post/PostFormHeader';
import { PostSubmitButton } from '@/components/creator/post/PostSubmitButton';
import { SuggestedTags } from '@/components/creator/post/SuggestedTags';
import { ImageUploadPanel } from '@/components/creator/post/ImageUploadPanel';
import { BusinessInfoSection } from '@/components/creator/post/BusinessInfoSection';
import { PublicationSettingsSection } from '@/components/creator/post/PublicationSettingsSection';
import type { UploadedImage } from '@/components/creator/post/ImageUploadPanel';

// ===== おすすめタグ =====
const SUGGESTED_TAGS = {
  tools: ['Adobe Illustrator', 'Adobe InDesign', 'Adobe Photoshop', 'Figma', 'Canva', 'CorelDRAW'],
  graphicTags: ['ロゴデザイン', 'ブランディング', 'タイポグラフィ', 'フラットデザイン', 'ミニマル', 'コーポレート'],
  responsibilities: ['ディレクション', 'デザイン', 'ロゴデザイン', 'ブランドガイドライン', 'DTP', '入稿'],
};

// ===== グラフィック種別 =====
const GRAPHIC_TYPES = [
  'ロゴ・VI（ブランドアイデンティティ）',
  'フライヤー・チラシ',
  'ポスター',
  'パンフレット・冊子',
  'パッケージデザイン',
  '名刺・カード類',
  'バナー・広告',
  'インフォグラフィック',
  'SNSコンテンツ',
  '展示・サイン',
  'その他',
];

// ===== モック入力済みデータ =====
const PREFILLED_IMAGES: UploadedImage[] = [
  { id: 'mock-1', preview: 'https://images.unsplash.com/photo-1626785774625-ddcddc3445e9?auto=format&fit=crop&q=80&w=400', name: 'logo_main.jpg' },
  { id: 'mock-2', preview: 'https://images.unsplash.com/photo-1611532736597-de2d4265fba3?auto=format&fit=crop&q=80&w=400', name: 'logo_variation.jpg' },
  { id: 'mock-3', preview: 'https://images.unsplash.com/photo-1634942537034-2531766767d1?auto=format&fit=crop&q=80&w=400', name: 'brand_guideline.jpg' },
  { id: 'mock-4', preview: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&q=80&w=400', name: 'color_palette.jpg' },
  { id: 'mock-5', preview: 'https://images.unsplash.com/photo-1558655146-d09347e92766?auto=format&fit=crop&q=80&w=400', name: 'typography.jpg' },
  { id: 'mock-6', preview: 'https://images.unsplash.com/photo-1572044162444-ad60f128bdea?auto=format&fit=crop&q=80&w=400', name: 'mockup.jpg' },
];

const PREFILLED_DATA = {
  title: 'テクノロジー企業のロゴ・VI設計',
  description: `ITスタートアップ企業のコーポレートアイデンティティを一から設計した案件です。\n\nロゴの設計から始まり、カラーパレット・タイポグラフィの選定、ブランドガイドラインの作成まで一貫して担当しました。「先進性」と「信頼感」を両立させるミニマルなデザインを採用しています。\n\n名刺・封筒・パワーポイントテンプレートへの展開も対応し、VIシステムとして統一感のあるブランドを構築しました。`,
  graphicName: 'TechVision ロゴ・ブランドアイデンティティ',
  industry: 'IT・テクノロジー',
  graphicType: 'ロゴ・VI（ブランドアイデンティティ）',
  durationValue: '2',
  durationUnit: '週間',
  tools: ['#Adobe Illustrator', '#Adobe InDesign'],
  graphicTags: ['#ロゴデザイン', '#ブランドアイデンティティ', '#VI設計', '#コーポレートカラー'],
  responsibilities: ['#ディレクション', '#ロゴデザイン', '#ブランドガイドライン'],
  clientType: 'client_anonymous',
  aiUsage: 'none',
  ageRestriction: 'all',
  visibility: 'public',
};

export default function PostGraphicPageWrapper() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-neutral-100" />}>
      <PostGraphicPage />
    </Suspense>
  );
}

function PostGraphicPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const prefilled = searchParams.get('prefilled') === '1';

  const [title, setTitle] = useState(prefilled ? PREFILLED_DATA.title : '');
  const [description, setDescription] = useState(prefilled ? PREFILLED_DATA.description : '');
  const [graphicName, setGraphicName] = useState(prefilled ? PREFILLED_DATA.graphicName : '');
  const [industry, setIndustry] = useState(prefilled ? PREFILLED_DATA.industry : '');
  const [graphicType, setGraphicType] = useState(prefilled ? PREFILLED_DATA.graphicType : '');
  const [tools, setTools] = useState<string[]>(prefilled ? PREFILLED_DATA.tools : []);
  const [graphicTags, setGraphicTags] = useState<string[]>(prefilled ? PREFILLED_DATA.graphicTags : []);
  const [responsibilities, setResponsibilities] = useState<string[]>(prefilled ? PREFILLED_DATA.responsibilities : []);
  const [durationValue, setDurationValue] = useState(prefilled ? PREFILLED_DATA.durationValue : '');
  const [durationUnit, setDurationUnit] = useState(prefilled ? PREFILLED_DATA.durationUnit : '日');
  const [clientType, setClientType] = useState(prefilled ? PREFILLED_DATA.clientType : 'self');
  const [clientName, setClientName] = useState('');
  const [aiUsage, setAiUsage] = useState(prefilled ? PREFILLED_DATA.aiUsage : 'none');
  const [ageRestriction, setAgeRestriction] = useState(prefilled ? PREFILLED_DATA.ageRestriction : 'all');
  const [visibility, setVisibility] = useState(prefilled ? PREFILLED_DATA.visibility : 'public');

  const previewUrl = '/creator/works/post/preview?category=graphic';

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
              categoryLabel="グラフィック"
              hintText="1枚目の画像がサムネイルになります。最も印象的なビジュアルを先頭にしましょう。"
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
                  'テクノロジー企業のロゴ・VI設計',
                  '老舗レストランのメニュー・パンフレット制作',
                  'スタートアップのブランドアイデンティティ構築',
                ]}
              >
                <TextInput value={title} onChange={setTitle} placeholder="作品タイトルを入力してください" maxLength={80} variant="creator" />
              </FormSection>

              <FormSection
                label="作品説明文"
                variant="creator"
                description="この作品の制作背景・こだわり・工夫した点などを自由に記入してください。"
                examples={[
                  '企業の採用強化を目的にブランドを一新しました。ロゴ設計からガイドライン作成まで一貫して担当しています。',
                  'ターゲット層に響くビジュアルを意識し、カラーパレットとタイポグラフィから設計しました。',
                ]}
              >
                <TextArea value={description} onChange={setDescription} placeholder="制作の背景、工夫した点、こだわりなどを記載してください" rows={8} maxLength={2000} variant="creator" />
              </FormSection>
            </DetailSection>

            <DetailSection title="「グラフィック」の制作情報" icon={Wrench} bodyClassName="px-6 pb-6">
              <div className="mb-2">
                <p className="text-sm text-neutral-500 mt-4">
                  発注者があなたにお仕事を依頼する際の判断材料になります。適切なキーワードを記載し、仕事獲得率をアップさせましょう。
                </p>
              </div>

              <FormSection label="グラフィックタイトル・作品名" variant="creator" description="作品の正式タイトルや作品名を入力してください。">
                <TextInput value={graphicName} onChange={setGraphicName} placeholder="例：TechVision ロゴ・ブランドアイデンティティ" variant="creator" />
              </FormSection>

              <FormSection label="業種" variant="creator" description="この作品のクライアント業種を選択しましょう。">
                <SelectInput value={industry} onChange={setIndustry} options={INDUSTRIES} placeholder="選択" variant="creator" />
              </FormSection>

              <FormSection label="グラフィック種別" variant="creator" description="制作したグラフィックの種別を選択しましょう。">
                <SelectInput value={graphicType} onChange={setGraphicType} options={GRAPHIC_TYPES} placeholder="選択" variant="creator" />
              </FormSection>

              <FormSection label="使用ツール／ソフト" variant="creator" description="制作に使用したツール・ソフトウェアを追加しましょう。">
                <TagInput value={tools} onChange={setTools} placeholder="タグを追加" maxTags={10} variant="creator" />
                <SuggestedTags tags={SUGGESTED_TAGS.tools} currentValues={tools} onAdd={(tag) => handleAddTag(tag, tools, setTools)} />
              </FormSection>

              <FormSection label="自由タグ" variant="creator" description="デザインスタイルや特徴など、この作品を表すキーワードを自由に追記しましょう。">
                <TagInput value={graphicTags} onChange={setGraphicTags} placeholder="タグを追加" maxTags={15} variant="creator" />
                <SuggestedTags tags={SUGGESTED_TAGS.graphicTags} currentValues={graphicTags} onAdd={(tag) => handleAddTag(tag, graphicTags, setGraphicTags)} />
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
