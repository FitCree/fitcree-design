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
import { AI_OPTIONS_GRAPHIC as AI_OPTIONS } from '@/constants/ai-options';
import { AGE_RESTRICTION_OPTIONS, VISIBILITY_OPTIONS } from '@/constants/work-options';

// ===== おすすめタグ =====
const SUGGESTED_TAGS = {
  tools: ['Adobe Illustrator', 'Adobe InDesign', 'Adobe Photoshop', 'Figma', 'Canva', 'CorelDRAW'],
  graphicTags: ['ロゴデザイン', 'ブランディング', 'タイポグラフィ', 'フラットデザイン', 'ミニマル', 'コーポレート'],
  responsibilities: ['ディレクション', 'デザイン', 'ロゴデザイン', 'ブランドガイドライン', 'DTP', '入稿'],
};

// ===== 業種 =====
const INDUSTRIES = [
  '飲食', 'IT・テクノロジー', '教育・学校', '医療・ヘルスケア', '不動産',
  '美容・ファッション', '金融・保険', '小売・EC', '製造', '旅行・観光',
  'メディア・エンタメ', 'その他',
];

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

// ===== 概算期間 =====
const DURATION_UNITS = ['時間', '日', '週間', 'ヶ月'];

// ===== モック入力済みデータ =====
const PREFILLED_IMAGES = [
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
      <span className="text-xs text-neutral-400 font-bold">例</span>
      {available.map((tag) => (
        <button key={tag} type="button" onClick={() => onAdd(tag)}
          className="px-2.5 py-1 text-xs font-medium rounded-md bg-orange-50 text-orange-500 border border-orange-100 hover:bg-orange-100 transition-colors">
          {tag}
        </button>
      ))}
    </div>
  );
}

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

  const MAX_IMAGES = 9;

  const [images, setImages] = useState<UploadedImage[]>(prefilled ? PREFILLED_IMAGES : []);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const dragSortId = useRef<string | null>(null);
  const isDragSort = useRef(false);
  const [dragOverId, setDragOverId] = useState<string | null>(null);

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
            <button onClick={() => router.push('/creator/works/post/preview?category=graphic')}
              className="bg-orange-500 hover:bg-orange-600 text-white text-sm font-bold px-5 py-2 rounded-lg transition-all">
              公開に進む
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

          {/* ===== 左カラム: 画像アップロード ===== */}
          <div className="lg:col-span-4">
            <div className="bg-white rounded-xl border border-neutral-200 lg:sticky lg:top-20 flex flex-col"
              style={{ maxHeight: 'calc(100vh - 5.5rem)' }}>

              <div className="p-6 pb-4 shrink-0">
                <h2 className="text-lg font-bold text-neutral-800 mb-1">
                  <span className="text-orange-500">グラフィック</span> の作品を追加
                </h2>
                <p className="text-sm text-neutral-500 mb-4">
                  画像をアップロードしてください（最大{MAX_IMAGES}枚）。
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
                    <p className="text-sm text-neutral-400 font-medium">画像がまだありません</p>
                    <p className="text-xs text-neutral-300 mt-1">上のエリアから画像を追加してください</p>
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
                    <span>1枚目の画像がサムネイルになります。最も印象的なビジュアルを先頭にしましょう。</span>
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
                examples={['テクノロジー企業のロゴ・VI設計', '老舗レストランのメニュー・パンフレット制作', 'スタートアップのブランドアイデンティティ構築']}>
                <TextInput value={title} onChange={setTitle} placeholder="作品タイトルを入力してください" maxLength={80} variant="creator" />
              </FormSection>

              <FormSection label="作品説明文" variant="creator"
                description="この作品の制作背景・こだわり・工夫した点などを自由に記入してください。"
                examples={['企業の採用強化を目的にブランドを一新しました。ロゴ設計からガイドライン作成まで一貫して担当しています。', 'ターゲット層に響くビジュアルを意識し、カラーパレットとタイポグラフィから設計しました。']}>
                <TextArea value={description} onChange={setDescription} placeholder="制作の背景、工夫した点、こだわりなどを記載してください" rows={8} maxLength={2000} variant="creator" />
              </FormSection>
            </DetailSection>

            {/* 「グラフィック」の制作情報 */}
            <DetailSection title="「グラフィック」の制作情報" icon={Wrench} bodyClassName="px-6 pb-6">
              <div className="mb-2">
                <p className="text-sm text-neutral-500 mt-4">発注者があなたにお仕事を依頼する際の判断材料になります。適切なキーワードを記載し、仕事獲得率をアップさせましょう。</p>
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

            {/* 業務情報 */}
            <DetailSection title="業務情報" icon={Briefcase} bodyClassName="p-6">
              <FormSection label="担当範囲" variant="creator" description="この作品であなたが担当した範囲をタグで入力してください。">
                <TagInput value={responsibilities} onChange={setResponsibilities} placeholder="例：#ディレクション、#デザイン" variant="creator" />
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
              <button onClick={() => router.push('/creator/works/post/preview?category=graphic')}
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
