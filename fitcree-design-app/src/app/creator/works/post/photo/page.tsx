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
import { AI_OPTIONS_PHOTO as AI_OPTIONS } from '@/constants/ai-options';
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
  equipment: ['Sony α7 IV', 'Nikon Z6 III', 'Canon EOS R5', 'FUJIFILM X-T5', 'Lightroom', 'Capture One', 'Photoshop'],
  photoTags: ['夜景', '長時間露光', 'マジックアワー', 'モノクロ', '星景', '多重露光', 'RAW現像'],
  responsibilities: ['撮影', 'レタッチ', 'ディレクション', 'スタイリング', 'ロケハン', '編集', '機材手配'],
};

// ===== 写真ジャンル =====
const PHOTO_GENRES = [
  '風景・自然', 'ポートレート', '建築・都市', '料理・フード',
  '動物・ペット', 'ファッション・コスチューム', 'スポーツ・アクション',
  'ドキュメンタリー', '航空・空撮', '夜景・星景', 'マクロ・接写',
  'SNS・商品撮影', 'ブライダル・記念写真', 'その他',
];

// ===== モック入力済みデータ =====
const PREFILLED_IMAGES: UploadedImage[] = [
  { id: 'mock-1', preview: 'https://images.unsplash.com/photo-1433086966358-54859d0ed716?auto=format&fit=crop&q=80&w=400', name: 'akiu_falls_01.jpg' },
  { id: 'mock-2', preview: 'https://images.unsplash.com/photo-1501854140801-50d01698950b?auto=format&fit=crop&q=80&w=400', name: 'akiu_falls_02.jpg' },
  { id: 'mock-3', preview: 'https://images.unsplash.com/photo-1470770903676-69b98201ea1c?auto=format&fit=crop&q=80&w=400', name: 'akiu_falls_03.jpg' },
  { id: 'mock-4', preview: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&q=80&w=400', name: 'akiu_landscape_01.jpg' },
  { id: 'mock-5', preview: 'https://images.unsplash.com/photo-1511884642898-4c92249e20b6?auto=format&fit=crop&q=80&w=400', name: 'akiu_landscape_02.jpg' },
  { id: 'mock-6', preview: 'https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&q=80&w=400', name: 'akiu_forest_01.jpg' },
];

const PREFILLED_DATA = {
  title: '夏休みの秋保大滝を撮影｜宮城県',
  description: `宮城県仙台市にある秋保大滝を夏に撮影した作品です。\n\n長時間露光を活用し、流れ落ちる水の柔らかさを表現しました。マジックアワーの時間帯に合わせて入山し、光の変化を捉えた6枚のシリーズです。\n\nRAW現像はCapture Oneを使用し、緑の深みと水しぶきの白を活かした仕上がりにしています。`,
  photoName: '秋保大滝 夏景色シリーズ',
  industry: '旅行・観光',
  photoGenre: '風景・自然',
  shootingLocation: '宮城県仙台市太白区',
  durationValue: '1',
  durationUnit: '日',
  equipment: ['#Sony α7 IV', '#Capture One'],
  photoTags: ['#風景', '#滝', '#長時間露光', '#マジックアワー'],
  responsibilities: ['#撮影', '#レタッチ'],
  clientType: 'self',
  aiUsage: 'none',
  ageRestriction: 'all',
  visibility: 'public',
};

export default function PostPhotoPageWrapper() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-neutral-100" />}>
      <PostPhotoPage />
    </Suspense>
  );
}

function PostPhotoPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const prefilled = searchParams.get('prefilled') === '1';

  const [title, setTitle] = useState(prefilled ? PREFILLED_DATA.title : '');
  const [description, setDescription] = useState(prefilled ? PREFILLED_DATA.description : '');
  const [photoName, setPhotoName] = useState(prefilled ? PREFILLED_DATA.photoName : '');
  const [industry, setIndustry] = useState(prefilled ? PREFILLED_DATA.industry : '');
  const [photoGenre, setPhotoGenre] = useState(prefilled ? PREFILLED_DATA.photoGenre : '');
  const [shootingLocation, setShootingLocation] = useState(prefilled ? PREFILLED_DATA.shootingLocation : '');
  const [equipment, setEquipment] = useState<string[]>(prefilled ? PREFILLED_DATA.equipment : []);
  const [photoTags, setPhotoTags] = useState<string[]>(prefilled ? PREFILLED_DATA.photoTags : []);
  const [responsibilities, setResponsibilities] = useState<string[]>(prefilled ? PREFILLED_DATA.responsibilities : []);
  const [durationValue, setDurationValue] = useState(prefilled ? PREFILLED_DATA.durationValue : '');
  const [durationUnit, setDurationUnit] = useState(prefilled ? PREFILLED_DATA.durationUnit : '日');
  const [clientType, setClientType] = useState(prefilled ? PREFILLED_DATA.clientType : 'self');
  const [clientName, setClientName] = useState('');
  const [aiUsage, setAiUsage] = useState(prefilled ? PREFILLED_DATA.aiUsage : 'none');
  const [ageRestriction, setAgeRestriction] = useState(prefilled ? PREFILLED_DATA.ageRestriction : 'all');
  const [visibility, setVisibility] = useState(prefilled ? PREFILLED_DATA.visibility : 'public');

  const previewUrl = '/creator/works/post/preview?category=photo';

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
              categoryLabel="写真"
              uploadSubtitle="写真をアップロードしてください"
              hintText="1枚目の写真がサムネイルになります。最も印象的な1枚を先頭にしましょう。"
              emptyText="写真がまだありません"
              emptySubText="上のエリアから写真を追加してください"
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
                  '夏休みの秋保大滝を撮影｜宮城県',
                  '東京夜景シリーズ 渋谷スクランブル',
                  'ポートレート撮影 自然光スタジオ',
                ]}
              >
                <TextInput value={title} onChange={setTitle} placeholder="作品タイトルを入力してください" maxLength={80} variant="creator" />
              </FormSection>

              <FormSection
                label="作品説明文"
                variant="creator"
                description="この作品の撮影背景・こだわり・技法などを自由に記入してください。"
                examples={[
                  '長時間露光で水の流れを柔らかく表現しました。マジックアワーに合わせて入山し、光の変化を6枚に収めたシリーズです。',
                  '自然光のみで撮影したポートレートシリーズです。モデルの表情と光の陰影を活かしたシンプルな構成を意識しました。',
                ]}
              >
                <TextArea value={description} onChange={setDescription} placeholder="撮影の背景、技法、こだわりなどを記載してください" rows={8} maxLength={2000} variant="creator" />
              </FormSection>
            </DetailSection>

            <DetailSection title="「写真」の制作情報" icon={Wrench} bodyClassName="px-6 pb-6">
              <div className="mb-2">
                <p className="text-sm text-neutral-500 mt-4">
                  発注者があなたにお仕事を依頼する際の判断材料になります。適切なキーワードを記載し、仕事獲得率をアップさせましょう。
                </p>
              </div>

              <FormSection label="写真タイトル・作品名" variant="creator" description="作品の正式タイトルや作品名を入力してください。">
                <TextInput value={photoName} onChange={setPhotoName} placeholder="例：秋保大滝 夏景色シリーズ" variant="creator" />
              </FormSection>

              <FormSection label="業種" variant="creator" description="この写真のクライアント業種を選択しましょう。">
                <SelectInput value={industry} onChange={setIndustry} options={INDUSTRIES} placeholder="選択" variant="creator" />
              </FormSection>

              <FormSection label="写真ジャンル" variant="creator" description="撮影した写真のジャンルを選択しましょう。">
                <SelectInput value={photoGenre} onChange={setPhotoGenre} options={PHOTO_GENRES} placeholder="選択" variant="creator" />
              </FormSection>

              <FormSection label="撮影場所" variant="creator" description="撮影を行った場所を入力してください。">
                <TextInput value={shootingLocation} onChange={setShootingLocation} placeholder="例：宮城県仙台市太白区" variant="creator" />
              </FormSection>

              <FormSection label="使用機材／ソフト" variant="creator" description="撮影や現像に使用した機材・ソフトウェアを追加しましょう。">
                <TagInput value={equipment} onChange={setEquipment} placeholder="タグを追加" maxTags={10} variant="creator" />
                <SuggestedTags tags={SUGGESTED_TAGS.equipment} currentValues={equipment} onAdd={(tag) => handleAddTag(tag, equipment, setEquipment)} />
              </FormSection>

              <FormSection label="自由タグ" variant="creator" description="撮影スタイルや雰囲気など、この作品の特徴を自由に追記しましょう。">
                <TagInput value={photoTags} onChange={setPhotoTags} placeholder="タグを追加" maxTags={15} variant="creator" />
                <SuggestedTags tags={SUGGESTED_TAGS.photoTags} currentValues={photoTags} onAdd={(tag) => handleAddTag(tag, photoTags, setPhotoTags)} />
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
