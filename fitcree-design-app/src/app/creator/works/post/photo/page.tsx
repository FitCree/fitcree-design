'use client';

import React, { useState, useCallback, useRef, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import {
  Save, ChevronRight, FileText, Briefcase, Wrench, Shield, Info,
  Upload, X, ImageIcon, CheckCircle2,
} from 'lucide-react';
import { TextInput } from '@/components/forms/elements/TextInput';
import { TextArea } from '@/components/forms/elements/TextArea';
import { SelectInput } from '@/components/forms/elements/SelectInput';
import { RadioList } from '@/components/forms/elements/RadioList';
import { TagInput } from '@/components/forms/elements/TagInput';
import { FormSection } from '@/components/forms/elements/FormSection';
import { DetailSection } from '@/components/common/DetailSection';
import { AI_OPTIONS_PHOTO as AI_OPTIONS } from '@/constants/ai-options';
import { AGE_RESTRICTION_OPTIONS, VISIBILITY_OPTIONS } from '@/constants/work-options';

// ===== おすすめタグ =====
const SUGGESTED_TAGS = {
  equipment: ['Sony α7 IV', 'Nikon Z6 III', 'Canon EOS R5', 'FUJIFILM X-T5', 'Lightroom', 'Capture One', 'Photoshop'],
  photoTags: ['夜景', '長時間露光', 'マジックアワー', 'モノクロ', '星景', '多重露光', 'RAW現像'],
  responsibilities: ['撮影', 'レタッチ', 'ディレクション', 'スタイリング', 'ロケハン', '編集', '機材手配'],
};

// ===== 業種 =====
const INDUSTRIES = [
  '飲食', 'IT・テクノロジー', '教育・学校', '医療・ヘルスケア', '不動産',
  '美容・ファッション', '金融・保険', '小売・EC', '製造', '旅行・観光',
  'メディア・エンタメ', 'その他',
];

// ===== 写真ジャンル =====
const PHOTO_GENRES = [
  '風景・自然', 'ポートレート', '建築・都市', '料理・フード',
  '動物・ペット', 'ファッション・コスチューム', 'スポーツ・アクション',
  'ドキュメンタリー', '航空・空撮', '夜景・星景', 'マクロ・接写',
  'SNS・商品撮影', 'ブライダル・記念写真', 'その他',
];

// ===== 概算期間 =====
const DURATION_UNITS = ['時間', '日', '週間', 'ヶ月'];

// ===== モック入力済みデータ =====
const PREFILLED_IMAGES = [
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
  clientName: '',
  aiUsage: 'none',
  ageRestriction: 'all',
  visibility: 'public',
};

// ===== アップロード画像の型 =====
interface UploadedImage {
  id: string;
  preview: string;
  name: string;
  file?: File;
}

// ===== おすすめタグボタン =====
function SuggestedTags({ tags, currentValues, onAdd }: { tags: string[]; currentValues: string[]; onAdd: (tag: string) => void; }) {
  const available = tags.filter((t) => !currentValues.includes(`#${t}`));
  if (available.length === 0) return null;
  return (
    <div className="flex flex-wrap items-center gap-1.5 mt-2">
      {/* <span className="text-xs text-neutral-400 font-bold">例</span> */}
      {available.map((tag) => (
        <button key={tag} type="button" onClick={() => onAdd(tag)}
          className="px-2.5 py-1 text-xs font-medium rounded-md bg-white text-orange-500 border border-orange-200 hover:bg-orange-50 transition-colors">
          #{tag}
        </button>
      ))}
    </div>
  );
}

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

  const MAX_IMAGES = 9;

  const [images, setImages] = useState<UploadedImage[]>(prefilled ? PREFILLED_IMAGES : []);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const dragSortId = useRef<string | null>(null);
  const isDragSort = useRef(false);
  const [dragOverId, setDragOverId] = useState<string | null>(null);

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

  const addFiles = useCallback((files: FileList | File[]) => {
    const arr = Array.from(files);
    const accepted = arr.filter((f) => f.type === 'image/jpeg' || f.type === 'image/png');
    const remaining = MAX_IMAGES - images.length;
    const toAdd = accepted.slice(0, remaining);
    const newImages: UploadedImage[] = toAdd.map((file) => ({
      id: `${Date.now()}-${Math.random()}`, preview: URL.createObjectURL(file), name: file.name, file,
    }));
    setImages((prev) => [...prev, ...newImages]);
  }, [images.length]);

  const removeImage = useCallback((id: string) => {
    setImages((prev) => prev.filter((img) => img.id !== id));
  }, []);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    if (!isDragSort.current) setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (isDragSort.current) return;
    if (images.length >= MAX_IMAGES) return;
    addFiles(e.dataTransfer.files);
  }, [addFiles, images.length]);

  const handleSortDragStart = useCallback((id: string) => {
    dragSortId.current = id;
    isDragSort.current = true;
  }, []);

  const handleSortDragOver = useCallback((e: React.DragEvent, id: string) => {
    e.preventDefault();
    e.stopPropagation();
    if (dragSortId.current && dragSortId.current !== id) setDragOverId(id);
  }, []);

  const handleSortDrop = useCallback((e: React.DragEvent, targetId: string) => {
    e.preventDefault();
    e.stopPropagation();
    const fromId = dragSortId.current;
    if (!fromId || fromId === targetId) { setDragOverId(null); return; }
    setImages((prev) => {
      const arr = [...prev];
      const fromIdx = arr.findIndex((img) => img.id === fromId);
      const toIdx = arr.findIndex((img) => img.id === targetId);
      if (fromIdx === -1 || toIdx === -1) return prev;
      const [item] = arr.splice(fromIdx, 1);
      arr.splice(toIdx, 0, item);
      return arr;
    });
    setDragOverId(null);
    dragSortId.current = null;
  }, []);

  const handleSortDragEnd = useCallback(() => {
    isDragSort.current = false;
    dragSortId.current = null;
    setDragOverId(null);
  }, []);

  const handleAddTag = (tag: string, current: string[], setter: (v: string[]) => void) => {
    if (!current.includes(`#${tag}`)) setter([...current, `#${tag}`]);
  };

  return (
    <div className="min-h-screen bg-neutral-100">
      {/* ヘッダー */}
      <header className="bg-white border-b border-neutral-200 sticky top-0 z-30 px-4 py-3">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <button onClick={() => router.back()} className="text-neutral-600 hover:text-neutral-800 text-sm font-medium transition-colors">
            投稿キャンセル
          </button>
          <div className="flex items-center gap-6">
            <button className="text-neutral-500 text-sm font-bold hover:text-neutral-700 transition-colors flex items-center gap-1.5">
              <Save size={15} />下書き保存
            </button>
            <button onClick={() => router.push('/creator/works/post/preview?category=photo')}
              className="bg-orange-500 hover:bg-orange-600 text-white text-sm font-bold px-5 py-2 rounded-lg transition-all">
              公開に進む
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

          {/* ===== 左カラム: 写真アップロード ===== */}
          <div className="lg:col-span-4">
            <div className="bg-white rounded-xl border border-neutral-200 lg:sticky lg:top-20 flex flex-col"
              style={{ maxHeight: 'calc(100vh - 5.5rem)' }}>

              <div className="p-6 pb-4 shrink-0">
                <h2 className="text-lg font-bold text-neutral-800 mb-1">
                  <span className="text-orange-500">写真</span> の作品を追加
                </h2>
                <p className="text-sm text-neutral-500 mb-4">
                  写真をアップロードしてください（最大{MAX_IMAGES}枚）。
                </p>

                {images.length < MAX_IMAGES && (
                  <div onDragOver={handleDragOver} onDragLeave={handleDragLeave} onDrop={handleDrop}
                    onClick={() => fileInputRef.current?.click()}
                    className={`border-2 border-dashed rounded-xl p-5 text-center cursor-pointer transition-all ${
                      isDragging ? 'border-orange-400 bg-orange-50' : 'border-neutral-300 bg-neutral-50 hover:border-orange-300 hover:bg-orange-50/50'
                    }`}>
                    <Upload size={22} className={`mx-auto mb-2 ${isDragging ? 'text-orange-500' : 'text-neutral-400'}`} />
                    <p className="text-sm font-bold text-neutral-600">ドラッグ＆ドロップ</p>
                    <p className="text-xs text-neutral-400 mt-1">またはクリックしてファイルを選択</p>
                    <p className="text-xs text-neutral-400 mt-1">JPG / PNG　残り{MAX_IMAGES - images.length}枚</p>
                    <input ref={fileInputRef} type="file" accept="image/jpeg,image/png" multiple className="hidden"
                      onChange={(e) => { if (e.target.files) addFiles(e.target.files); e.target.value = ''; }} />
                  </div>
                )}

                {images.length >= MAX_IMAGES && (
                  <div className="p-3 bg-green-50 border border-green-200 rounded-xl">
                    <p className="text-xs text-green-700 font-bold flex items-center gap-1.5">
                      <CheckCircle2 size={13} />最大枚数（{MAX_IMAGES}枚）に達しました
                    </p>
                  </div>
                )}
              </div>

              {/* 画像一覧（スクロール） */}
              <div className="flex-1 overflow-y-auto px-6 pb-6 min-h-0">
                {images.length === 0 ? (
                  <div className="flex flex-col items-center justify-center py-8 text-center">
                    <ImageIcon size={36} className="text-neutral-300 mb-3" />
                    <p className="text-sm text-neutral-400 font-medium">写真がまだありません</p>
                    <p className="text-xs text-neutral-300 mt-1">上のエリアから写真を追加してください</p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {images.map((img) => (
                      <div key={img.id} draggable
                        onDragStart={() => handleSortDragStart(img.id)}
                        onDragOver={(e) => handleSortDragOver(e, img.id)}
                        onDrop={(e) => handleSortDrop(e, img.id)}
                        onDragEnd={handleSortDragEnd}
                        className={`relative rounded-xl overflow-hidden border bg-neutral-100 cursor-grab active:cursor-grabbing transition-all ${
                          dragOverId === img.id ? 'border-orange-400 ring-2 ring-orange-300 scale-[0.98]' : 'border-neutral-200'
                        }`}>
                        <img src={img.preview} alt={img.name} className="w-full object-cover pointer-events-none" />
                        <button type="button" onClick={() => removeImage(img.id)}
                          className="absolute top-2 right-2 w-6 h-6 flex items-center justify-center rounded-full bg-black/70 text-white hover:bg-black transition-colors shadow"
                          title="削除">
                          <X size={12} />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* ヒント */}
              <div className="px-6 pb-6 shrink-0">
                <div className="p-3 bg-blue-50 border border-blue-100 rounded-lg">
                  <p className="text-xs text-blue-700 leading-relaxed flex items-start gap-1.5">
                    <Info size={13} className="shrink-0 mt-0.5" />
                    <span>1枚目の写真がサムネイルになります。最も印象的な1枚を先頭にしましょう。</span>
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* ===== 右カラム ===== */}
          <div className="lg:col-span-8 space-y-8">

            {/* 作品概要 */}
            <DetailSection title="作品概要" icon={FileText} bodyClassName="p-6 space-y-0">
              <FormSection label="作品タイトル" required variant="creator"
                description="この作品のタイトルとして表示されます。検索を意識したキーワードを含めましょう。"
                examples={['夏休みの秋保大滝を撮影｜宮城県', '東京夜景シリーズ 渋谷スクランブル', 'ポートレート撮影 自然光スタジオ']}>
                <TextInput value={title} onChange={setTitle} placeholder="作品タイトルを入力してください" maxLength={80} variant="creator" />
              </FormSection>

              <FormSection label="作品説明文" variant="creator"
                description="この作品の撮影背景・こだわり・技法などを自由に記入してください。"
                examples={['長時間露光で水の流れを柔らかく表現しました。マジックアワーに合わせて入山し、光の変化を6枚に収めたシリーズです。', '自然光のみで撮影したポートレートシリーズです。モデルの表情と光の陰影を活かしたシンプルな構成を意識しました。']}>
                <TextArea value={description} onChange={setDescription} placeholder="撮影の背景、技法、こだわりなどを記載してください" rows={8} maxLength={2000} variant="creator" />
              </FormSection>
            </DetailSection>

            {/* 「写真」の制作情報 */}
            <DetailSection title="「写真」の制作情報" icon={Wrench} bodyClassName="px-6 pb-6">
              <div className="mb-2">
                <p className="text-sm text-neutral-500 mt-4">発注者があなたにお仕事を依頼する際の判断材料になります。適切なキーワードを記載し、仕事獲得率をアップさせましょう。</p>
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

            {/* 業務情報 */}
            <DetailSection title="業務情報" icon={Briefcase} bodyClassName="p-6">
              <FormSection label="担当範囲" variant="creator" description="この作品であなたが担当した範囲をタグで入力してください。">
                <TagInput value={responsibilities} onChange={setResponsibilities} placeholder="タグを追加" variant="creator" />
                <SuggestedTags tags={SUGGESTED_TAGS.responsibilities} currentValues={responsibilities} onAdd={(tag) => handleAddTag(tag, responsibilities, setResponsibilities)} />
              </FormSection>

              <FormSection label="概算期間" variant="creator" description="担当範囲においてかかった時間を入力してください。">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-24">
                    <TextInput value={durationValue} onChange={setDurationValue} placeholder="" variant="creator" />
                  </div>
                  <SelectInput value={durationUnit} onChange={setDurationUnit} options={DURATION_UNITS} variant="creator" />
                </div>
              </FormSection>

              <FormSection label="クライアント情報" variant="creator" description="この作品の相手を選択してください。">
                <RadioList name="clientType" selectedValue={clientType} onChange={setClientType} variant="creator"
                  options={[
                    { id: 'self', label: 'クライアントなし（自主制作／仮想制作）' },
                    { id: 'client_anonymous', label: 'クライアントあり（名前は非公開）', description: '外部案件で、クライアント名は公開されません。' },
                    { id: 'client_public', label: 'クライアントあり（名前公開可）', description: 'クライアントの許可を得た場合に選択してください（企業名もしくは一部を入力）' },
                  ]} />
                {clientType === 'client_public' && (
                  <div className="mt-3">
                    <TextInput value={clientName} onChange={setClientName} placeholder="クライアント名を入力" variant="creator" />
                  </div>
                )}
              </FormSection>
            </DetailSection>

            {/* 公開設定 */}
            <DetailSection title="公開設定" icon={Shield} bodyClassName="p-6">
              <FormSection label="生成AIの利用状況" variant="creator" description="この作品における生成AIの利用状況を教えてください。">
                <RadioList name="aiUsage" selectedValue={aiUsage} onChange={setAiUsage} variant="creator" options={AI_OPTIONS} />
              </FormSection>

              <FormSection label="年齢制限" variant="creator" description="成人向けコンテンツを含む場合は、適切な年齢制限を選択してください。">
                <RadioList name="ageRestriction" selectedValue={ageRestriction} onChange={setAgeRestriction} variant="creator" options={AGE_RESTRICTION_OPTIONS} />
              </FormSection>

              <FormSection label="公開範囲" variant="creator" description="">
                <RadioList name="visibility" selectedValue={visibility} onChange={setVisibility} variant="creator" options={VISIBILITY_OPTIONS} />
                {visibility === 'limited' && (
                  <p className="text-xs text-neutral-500 mt-2 pl-1">作品URLを知っている方のみ閲覧できるようになります。非公開にしたい場合は「下書き」をご活用ください。</p>
                )}
              </FormSection>
            </DetailSection>

            {/* 送信ボタン */}
            <div className="pb-8">
              <button onClick={() => router.push('/creator/works/post/preview?category=photo')}
                className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-4 rounded-xl transition-all text-base flex items-center justify-center gap-2">
                この内容で公開に進む
                <ChevronRight size={18} />
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
