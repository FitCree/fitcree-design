'use client';

import React, { useState, useCallback, useRef } from 'react';
import { useRouter } from 'next/navigation';
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
import { WorkDetail } from '@/data/mock-work-details';
import SuggestedTags from './SuggestedTags';
import {
  INDUSTRIES, DURATION_UNITS, AGE_RESTRICTION_OPTIONS, VISIBILITY_OPTIONS,
} from './constants';
import { AI_OPTIONS_ILLUSTRATION as AI_OPTIONS } from '@/constants/ai-options';

const ILLUST_TYPES = [
  'キャラクターイラスト', '背景・風景イラスト', 'コンセプトアート',
  'ゲームアート・UI', 'ファンアート', '漫画・マンガ', 'ライトノベル表紙',
  '書籍・雑誌挿絵', 'グリーティングカード', 'SNS用イラスト',
  'アニメーション用イラスト', '絵本・児童書', 'ロゴ・アイコン',
  'キャラクターデザイン', 'その他',
];

const ART_STYLES = [
  'アニメ調', 'リアル調', '水彩・アナログ風', '油彩風',
  'ドット絵・PixelArt', 'ベクターイラスト', '手描き風',
  'ポップアート', 'モノクロ・線画', 'SD・デフォルメ', 'その他',
];

const SUGGESTED_TAGS = {
  tools: ['Procreate', 'Clip Studio Paint', 'Adobe Photoshop', 'Adobe Illustrator', 'SAI2', 'ibis Paint', 'Blender', 'GIMP'],
  illustTags: ['キャラクターデザイン', '背景イラスト', 'ファンアート', 'オリジナル', 'コミッション', 'カバーイラスト', 'グッズ用途'],
  responsibilities: ['ラフ', '線画', '彩色', '背景制作', 'キャラクターデザイン', 'コンセプトアート', 'ディレクション'],
};

interface UploadedImage {
  id: string;
  preview: string;
  name: string;
  file?: File;
}

interface IllustrationEditFormProps {
  workId: string;
  work: WorkDetail;
}

export default function IllustrationEditForm({ workId, work }: IllustrationEditFormProps) {
  const router = useRouter();
  const MAX_IMAGES = 10;

  // 既存画像をUploadedImage形式に変換
  const initialImages: UploadedImage[] = (work.illustImages ?? []).map((url, i) => ({
    id: `existing-${i}`,
    preview: url,
    name: `image_${i + 1}.png`,
  }));

  const [images, setImages] = useState<UploadedImage[]>(initialImages);
  const [isDragging, setIsDragging] = useState(false);
  const [dragSortId, setDragSortId] = useState<string | null>(null);
  const [dragOverId, setDragOverId] = useState<string | null>(null);
  const isDragSort = useRef(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [title, setTitle] = useState(work.title);
  const [description, setDescription] = useState(work.description);
  const [illustName, setIllustName] = useState(work.illustName || '');
  const [industry, setIndustry] = useState(work.industry || '');
  const [illustType, setIllustType] = useState(work.illustType || '');
  const [artStyle, setArtStyle] = useState(work.artStyle || '');
  const [tools, setTools] = useState<string[]>(work.tools);
  const [illustTags, setIllustTags] = useState<string[]>(work.siteTags);

  const [responsibilities, setResponsibilities] = useState<string[]>(work.responsibilities);
  const [durationValue, setDurationValue] = useState(work.durationValue || '');
  const [durationUnit, setDurationUnit] = useState(work.durationUnit || '週間');
  const [clientType, setClientType] = useState(work.clientType);
  const [clientName, setClientName] = useState(work.clientName || '');

  const [aiUsage, setAiUsage] = useState('none');
  const [ageRestriction, setAgeRestriction] = useState('all');
  const [visibility, setVisibility] = useState('public');

  const addFiles = useCallback((files: FileList | File[]) => {
    const arr = Array.from(files);
    const accepted = arr.filter((f) => f.type === 'image/jpeg' || f.type === 'image/png');
    const remaining = MAX_IMAGES - images.length;
    const toAdd = accepted.slice(0, remaining);
    const newImages: UploadedImage[] = toAdd.map((file) => ({
      id: `${Date.now()}-${Math.random()}`,
      preview: URL.createObjectURL(file),
      name: file.name,
      file,
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

  const handleSortDragStart = (id: string) => {
    setDragSortId(id);
    isDragSort.current = true;
  };

  const handleSortDragOver = (e: React.DragEvent, id: string) => {
    e.preventDefault();
    e.stopPropagation();
    if (dragSortId && dragSortId !== id) setDragOverId(id);
  };

  const handleSortDrop = (e: React.DragEvent, targetId: string) => {
    e.preventDefault();
    e.stopPropagation();
    if (!dragSortId || dragSortId === targetId) { setDragOverId(null); return; }
    setImages((prev) => {
      const arr = [...prev];
      const fromIdx = arr.findIndex((img) => img.id === dragSortId);
      const toIdx = arr.findIndex((img) => img.id === targetId);
      if (fromIdx === -1 || toIdx === -1) return prev;
      const [item] = arr.splice(fromIdx, 1);
      arr.splice(toIdx, 0, item);
      return arr;
    });
    setDragOverId(null);
    setDragSortId(null);
  };

  const handleSortDragEnd = () => {
    isDragSort.current = false;
    setDragSortId(null);
    setDragOverId(null);
  };

  const handleAddTag = (tag: string, current: string[], setter: (v: string[]) => void) => {
    if (!current.includes(`#${tag}`)) setter([...current, `#${tag}`]);
  };

  const handleUpdate = () => {
    alert('作品を更新しました');
    router.push(`/creator/works/${workId}`);
  };

  return (
    <div className="min-h-screen bg-neutral-100">
      {/* ヘッダー */}
      <header className="bg-white border-b border-neutral-200 sticky top-0 z-30 px-4 py-3">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <button
            onClick={() => router.back()}
            className="text-neutral-600 hover:text-neutral-800 text-sm font-medium transition-colors"
          >
            編集キャンセル
          </button>
          <div className="flex items-center gap-6">
            <button className="text-neutral-500 text-sm font-bold hover:text-neutral-700 transition-colors flex items-center gap-1.5">
              <Save size={15} />
              下書き保存
            </button>
            <button
              onClick={handleUpdate}
              className="bg-orange-500 hover:bg-orange-600 text-white text-sm font-bold px-5 py-2 rounded-lg transition-all"
            >
              更新する
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-8">
        {/* 編集バナー */}
        <div className="mb-6 bg-orange-50 border border-orange-200 rounded-xl px-5 py-3 flex items-center gap-2">
          <Info size={16} className="text-orange-500 shrink-0" />
          <p className="text-sm text-orange-700 font-medium">
            <span className="font-bold">作品を編集中</span> — 変更内容は「更新する」を押すまで反映されません。
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

          {/* ===== 左カラム: 画像管理 ===== */}
          <div className="lg:col-span-4">
            <div
              className="bg-white rounded-xl border border-neutral-200 lg:sticky lg:top-20 flex flex-col"
              style={{ maxHeight: 'calc(100vh - 5.5rem)' }}
            >
              {/* ヘッダー（固定） */}
              <div className="p-6 pb-4 shrink-0">
                <h2 className="text-lg font-bold text-neutral-800 mb-1">
                  <span className="text-orange-500">イラスト・アート</span> の作品を編集
                </h2>
                <p className="text-sm text-neutral-500 mb-4">
                  イラスト画像を追加・削除・並び替えできます（最大{MAX_IMAGES}枚）。
                </p>

                {/* ドロップゾーン */}
                {images.length < MAX_IMAGES && (
                  <div
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                    onClick={() => fileInputRef.current?.click()}
                    className={`border-2 border-dashed rounded-xl p-5 text-center cursor-pointer transition-all ${
                      isDragging
                        ? 'border-orange-400 bg-orange-50'
                        : 'border-neutral-300 bg-neutral-50 hover:border-orange-300 hover:bg-orange-50/50'
                    }`}
                  >
                    <Upload size={22} className={`mx-auto mb-2 ${isDragging ? 'text-orange-500' : 'text-neutral-400'}`} />
                    <p className="text-sm font-bold text-neutral-600">ドラッグ＆ドロップ</p>
                    <p className="text-xs text-neutral-400 mt-1">またはクリックしてファイルを選択</p>
                    <p className="text-xs text-neutral-400 mt-1">JPG / PNG　残り{MAX_IMAGES - images.length}枚</p>
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/jpeg,image/png"
                      multiple
                      className="hidden"
                      onChange={(e) => { if (e.target.files) addFiles(e.target.files); e.target.value = ''; }}
                    />
                  </div>
                )}

                {images.length >= MAX_IMAGES && (
                  <div className="p-3 bg-green-50 border border-green-200 rounded-xl">
                    <p className="text-xs text-green-700 font-bold flex items-center gap-1.5">
                      <CheckCircle2 size={13} />
                      最大枚数（{MAX_IMAGES}枚）に達しました
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
                      <div
                        key={img.id}
                        draggable
                        onDragStart={() => handleSortDragStart(img.id)}
                        onDragOver={(e) => handleSortDragOver(e, img.id)}
                        onDrop={(e) => handleSortDrop(e, img.id)}
                        onDragEnd={handleSortDragEnd}
                        className={`relative rounded-xl overflow-hidden border bg-neutral-100 cursor-grab active:cursor-grabbing transition-all ${
                          dragOverId === img.id
                            ? 'border-orange-400 ring-2 ring-orange-300 scale-[0.98]'
                            : 'border-neutral-200'
                        }`}
                      >
                        <img
                          src={img.preview}
                          alt={img.name}
                          className="w-full object-cover pointer-events-none"
                        />
                        <button
                          type="button"
                          onClick={() => removeImage(img.id)}
                          className="absolute top-2 right-2 w-6 h-6 flex items-center justify-center rounded-full bg-black/70 text-white hover:bg-black transition-colors shadow"
                          title="削除"
                        >
                          <X size={12} />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* ヒント（固定） */}
              <div className="px-6 pb-6 shrink-0">
                <div className="p-3 bg-blue-50 border border-blue-100 rounded-lg">
                  <p className="text-xs text-blue-700 leading-relaxed flex items-start gap-1.5">
                    <Info size={13} className="shrink-0 mt-0.5" />
                    <span>1枚目の画像がサムネイルになります。最もインパクトのあるイラストを先頭にしましょう。</span>
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* ===== 右カラム: 詳細フォーム ===== */}
          <div className="lg:col-span-8 space-y-8">

            {/* 作品概要 */}
            <DetailSection title="作品概要" icon={FileText} bodyClassName="p-6 space-y-0">
              <FormSection
                label="作品タイトル" required variant="creator"
                description="この作品のタイトルとして表示されます。検索を意識したキーワードを含めましょう。"
                examples={['ファンタジーRPG キャラクターデザイン集', 'オリジナルキャラクター「ルナ」フルイラスト', '書籍挿絵：異世界ファンタジー背景3点']}
              >
                <TextInput value={title} onChange={setTitle} placeholder="作品タイトルを入力してください" maxLength={80} variant="creator" />
              </FormSection>

              <FormSection
                label="作品説明文" variant="creator"
                description="この作品の目的・背景・制作で工夫した点などを自由に記入してください。"
              >
                <TextArea value={description} onChange={setDescription} placeholder="作品の目的、制作背景、工夫した点などを記載してください" rows={8} maxLength={2000} variant="creator" />
              </FormSection>
            </DetailSection>

            {/* 「イラスト・アート」の制作情報 */}
            <DetailSection title="「イラスト・アート」の制作情報" icon={Wrench} bodyClassName="px-6 pb-6">
              <p className="text-sm text-neutral-500 mt-4 mb-2">発注者があなたにお仕事を依頼する際の判断材料になります。適切なキーワードを記載し、仕事獲得率をアップさせましょう。</p>

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

            {/* 業務情報 */}
            <DetailSection title="業務情報" icon={Briefcase} bodyClassName="p-6">
              <FormSection label="担当範囲" variant="creator" description="この作品であなたが担当した範囲をタグで入力してください。">
                <TagInput value={responsibilities} onChange={setResponsibilities} placeholder="例：#ラフ、#線画、#彩色" variant="creator" />
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
                <RadioList
                  name="clientType"
                  selectedValue={clientType}
                  onChange={setClientType}
                  variant="creator"
                  options={[
                    { id: 'self', label: 'クライアントなし（自主制作／仮想制作）' },
                    { id: 'client_anonymous', label: 'クライアントあり（名前は非公開）', description: '外部案件で、クライアント名は公開されません。' },
                    { id: 'client_public', label: 'クライアントあり（名前公開可）', description: 'クライアントの許可を得た場合に選択してください（企業名もしくは一部を入力）' },
                  ]}
                />
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

            {/* 更新ボタン */}
            <div className="pb-8">
              <button
                onClick={handleUpdate}
                className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-4 rounded-xl transition-all text-base flex items-center justify-center gap-2"
              >
                この内容で更新する
                <ChevronRight size={18} />
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
