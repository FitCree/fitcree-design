'use client';

import React, { useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import {
  ArrowLeft,
  Save,
  ChevronRight,
  Globe,
  FileText,
  Image as ImageIcon,
  Camera,
  Briefcase,
  Wrench,
  Tag,
  Users,
  DollarSign,
  Shield,
  Eye,
  Sparkles,
  Info,
} from 'lucide-react';
import { TextInput } from '@/components/forms/elements/TextInput';
import { TextArea } from '@/components/forms/elements/TextArea';
import { SelectInput } from '@/components/forms/elements/SelectInput';
import { RadioList } from '@/components/forms/elements/RadioList';
import { TagInput } from '@/components/forms/elements/TagInput';
import { FileUploader } from '@/components/forms/elements/FileUploader';
import { FormSection } from '@/components/forms/elements/FormSection';
import { DetailSection } from '@/components/common/DetailSection';

// ===== おすすめタグデータ =====
const SUGGESTED_TAGS = {
  target: ['若年層', '高齢者', '女性', '男性'],
  purpose: ['UX向上', 'コンバージョン促進', '集客施策'],
  duration: ['デザイン', 'STUDIOの構築', '素材選定'],
  tools: ['Figma', 'Adobe Photoshop', 'Adobe XD', 'Illustrator', 'Sketch'],
  siteTags: ['ページ', 'オーシャンブルー', '近代的リッチ', '軽快'],
};

// ===== 業種一覧 =====
const INDUSTRIES = [
  '飲食',
  'IT・テクノロジー',
  '教育・学校',
  '医療・ヘルスケア',
  '不動産',
  '美容・ファッション',
  '金融・保険',
  '小売・EC',
  '製造',
  '旅行・観光',
  'メディア・エンタメ',
  'その他',
];

// ===== サイト種別 =====
const SITE_TYPES = [
  'LP',
  'コーポレート',
  'ECなど',
  'WEBサイトの部品やUIに関する制作',
];

// ===== 概算期間の単位 =====
const DURATION_UNITS = ['日間', '週間', 'ヶ月'];

// ===== 年齢制限 =====
const AGE_RESTRICTION_OPTIONS = [
  { id: 'all', label: '全年齢' },
  { id: 'r15', label: 'R-15' },
  { id: 'r18', label: 'R-18（グロテスク）' },
];

// ===== 生成AI =====
const AI_OPTIONS = [
  { id: 'none', label: '利用なし' },
  { id: 'process_only', label: '制作過程のみで利用', description: 'アイデア出しや中間成果物にのみ利用し、最終成果物には使用していません。' },
  { id: 'idea_only', label: 'アイデア出しのみで利用', description: '下書き・画像合成・レイアウト生成などにAIを利用しています。' },
  { id: 'full', label: '全面利用', description: '主要・個別など、作品の主要な部分にAIで生成したコンテンツを利用しています。' },
];

// ===== 公開範囲 =====
const VISIBILITY_OPTIONS = [
  { id: 'public', label: 'だれでも', description: '誰でも閲覧することができます。' },
  { id: 'fitcree_only', label: 'FitCreeユーザーのみ', sub: 'NEW' },
  { id: 'limited', label: '限定公開', description: '作品URLを知っている方のみ閲覧できるようになります。非公開にしたい場合は「下書き」をご活用ください。' },
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
  siteType: 'コーポレート',
  target: ['#若年層', '#女性'],
  purpose: ['#UX向上', '#コンバージョン促進', '#集客施策'],
  durationValue: '1',
  durationUnit: 'ヶ月',
  durationBreakdown: ['#デザイン', '#STUDIOの構築', '#素材選定'],
  tools: ['#Figma', '#Adobe Photoshop', '#Adobe XD'],
  siteTags: ['#ページ', '#オーシャンブルー', '#近代的リッチ', '#軽快'],
  clientType: 'client_anonymous',
  clientName: '',
  cost: '800,000',
  isAdult: false,
  aiUsage: 'none',
  ageRestriction: 'all',
  visibility: 'public',
};

// ===== おすすめタグボタン =====
function SuggestedTags({
  tags,
  currentValues,
  onAdd,
}: {
  tags: string[];
  currentValues: string[];
  onAdd: (tag: string) => void;
}) {
  const available = tags.filter((t) => !currentValues.includes(`#${t}`));
  if (available.length === 0) return null;
  return (
    <div className="flex flex-wrap items-center gap-1.5 mt-2">
      <span className="text-xs text-neutral-400 font-bold">例</span>
      {available.map((tag) => (
        <button
          key={tag}
          type="button"
          onClick={() => onAdd(tag)}
          className="px-2.5 py-1 text-xs font-medium rounded-md bg-orange-50 text-orange-600 border border-orange-200 hover:bg-orange-100 transition-colors"
        >
          {tag}
        </button>
      ))}
    </div>
  );
}


export default function PostWorkPageWrapper() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-neutral-100" />}>
      <PostWorkPage />
    </Suspense>
  );
}

function PostWorkPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const prefilled = searchParams.get('prefilled') === '1';

  // フォーム状態（prefilled時はモックデータ使用）
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
  const [durationUnit, setDurationUnit] = useState(prefilled ? PREFILLED_DATA.durationUnit : 'ヶ月');
  const [durationBreakdown, setDurationBreakdown] = useState<string[]>(
    prefilled ? PREFILLED_DATA.durationBreakdown : []
  );
  const [tools, setTools] = useState<string[]>(prefilled ? PREFILLED_DATA.tools : []);
  const [siteTags, setSiteTags] = useState<string[]>(prefilled ? PREFILLED_DATA.siteTags : []);
  const [clientType, setClientType] = useState(prefilled ? PREFILLED_DATA.clientType : 'self');
  const [clientName, setClientName] = useState('');
  const [cost, setCost] = useState(prefilled ? PREFILLED_DATA.cost : '');
  const [isAdult, setIsAdult] = useState(false);
  const [aiUsage, setAiUsage] = useState(prefilled ? PREFILLED_DATA.aiUsage : 'none');
  const [ageRestriction, setAgeRestriction] = useState(prefilled ? PREFILLED_DATA.ageRestriction : 'all');
  const [visibility, setVisibility] = useState(prefilled ? PREFILLED_DATA.visibility : 'public');

  const handleAddTag = (
    tag: string,
    current: string[],
    setter: (v: string[]) => void
  ) => {
    if (!current.includes(`#${tag}`)) {
      setter([...current, `#${tag}`]);
    }
  };

  return (
    <div className="min-h-screen bg-neutral-100">
      {/* ===== ヘッダー ===== */}
      <header className="bg-white border-b border-neutral-200 sticky top-0 z-30 px-4 py-3">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <button
            onClick={() => router.back()}
            className="text-neutral-600 hover:text-neutral-800 text-sm font-medium transition-colors"
          >
            投稿キャンセル
          </button>
          <div className="flex items-center gap-3">
            <button className="text-neutral-500 text-sm font-bold hover:text-neutral-700 transition-colors flex items-center gap-1.5">
              <Save size={15} />
              下書き保存
            </button>
            <button
              onClick={() => router.push('/creator/works/post/preview')}
              className="bg-orange-500 hover:bg-orange-600 text-white text-sm font-bold px-5 py-2 rounded-lg transition-all"
            >
              公開に進む！
            </button>
          </div>
        </div>
      </header>

      {/* ===== メインコンテンツ 2カラム ===== */}
      <main className="max-w-6xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* ========== 左カラム: サイトURL ========== */}
          <div className="lg:col-span-4">
            <div className="bg-white rounded-xl border border-neutral-200 p-6 lg:sticky lg:top-20">
              <h2 className="text-lg font-bold text-neutral-800 mb-1">
                <span className="text-orange-500">Webサイト</span> の作品を追加
              </h2>
              <p className="text-sm text-neutral-500 mb-5">
                WEBサイトのURLを入力してください。
              </p>

              <FormSection label="サイトURL" variant="creator">
                <div className="flex gap-2">
                  <div className="flex-1">
                    <TextInput
                      value={siteUrl}
                      onChange={setSiteUrl}
                      placeholder="https://fitcree.com/"
                      variant="creator"
                    />
                  </div>
                </div>
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

              {/* ヒント */}
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

          {/* ========== 右カラム: 詳細入力フォーム ========== */}
          <div className="lg:col-span-8 space-y-8">
            {/* ────── 作品概要 ────── */}
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
                  <TextInput
                    value={title}
                    onChange={setTitle}
                    placeholder="作品タイトルを入力してください"
                    maxLength={80}
                    variant="creator"
                  />
                </FormSection>

                <FormSection
                  label="サムネイル画像"
                  required
                  variant="creator"
                  description="この作品を一覧で表示する際のサムネイルをアップロードしてください。最も魅力的な全景を使いましょう。"
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
                  {captures.length > 0 ? (
                    <div className="grid grid-cols-3 gap-3 mb-3">
                      {captures.map((url, i) => (
                        <div key={i} className="aspect-video rounded-lg overflow-hidden border border-neutral-200 bg-neutral-50">
                          <img src={url} alt="" className="w-full h-full object-cover" />
                        </div>
                      ))}
                    </div>
                  ) : null}
                  <FileUploader
                    variant="creator"
                    label="ファイルをアップロード"
                    description="またはドラッグ＆ドロップ（最大6枚まで）JPG"
                    accept="image/jpeg,image/png"
                    multiple
                  />
                </FormSection>

                <FormSection
                  label="作品説明文"
                  variant="creator"
                  description="この作品の目的や背景、制作で工夫した点、あなたの作品への想いなどを自由にご入力してください。発注者はここから制作の意図が読み取れ、この分野の仕事は実績があるかどうかの識別ができる重要なポイントです。"
                  examples={[
                    '法人向けBtoBサイトのリニューアル。ユーザビリティ改善とSEO対策を両立させました。',
                    '新メニューのプロモーションのため、メニューページの改善と新規LP制作を実施しました。',
                  ]}
                >
                  <TextArea
                    value={description}
                    onChange={setDescription}
                    placeholder="作品の目的、制作背景、工夫した点などを記載してください"
                    rows={8}
                    maxLength={2000}
                    variant="creator"
                  />
                </FormSection>
            </DetailSection>

            {/* ────── 「WEBサイト」の制作情報 ────── */}
            <DetailSection title="「WEBサイト」の制作情報" icon={Wrench} bodyClassName="px-6 pb-6">
                <div className="mb-2">
                  <p className="text-sm text-neutral-500 mt-4">
                    発注者があなたにお仕事を依頼する際の判断材料になります。適切なキーワードを記載し、仕事獲得率をアップさせましょう。
                  </p>
                </div>

                <FormSection
                  label="サイト名"
                  required
                  variant="creator"
                  description="サイトの名前もしくは正式な名称を入力してください。"
                >
                  <TextInput
                    value={siteName}
                    onChange={setSiteName}
                    placeholder="サイト名を入力"
                    variant="creator"
                  />
                </FormSection>

                <FormSection
                  label="業種"
                  variant="creator"
                  description="このサイトの業種を選択しましょう。"
                >
                  <SelectInput
                    value={industry}
                    onChange={setIndustry}
                    options={INDUSTRIES}
                    placeholder="選択"
                    variant="creator"
                  />
                </FormSection>

                <FormSection
                  label="サイト種別"
                  variant="creator"
                  description="LP・コーポレート・ECなど、WEBサイトの種類を選択しましょう。"
                >
                  <SelectInput
                    value={siteType}
                    onChange={setSiteType}
                    options={SITE_TYPES}
                    placeholder="選択"
                    variant="creator"
                  />
                </FormSection>

                <FormSection
                  label="ターゲット"
                  variant="creator"
                  description="この作品の想定ターゲット（エンドユーザー）を入力しましょう。"
                >
                  <TagInput
                    value={target}
                    onChange={setTarget}
                    placeholder="タグを追加"
                    maxTags={10}
                    variant="creator"
                  />
                  <SuggestedTags
                    tags={SUGGESTED_TAGS.target}
                    currentValues={target}
                    onAdd={(tag) => handleAddTag(tag, target, setTarget)}
                  />
                </FormSection>

                <FormSection
                  label="目的／背景"
                  variant="creator"
                  description="この作品を作った目的や制作背景があれば、入力してください。"
                >
                  <TagInput
                    value={purpose}
                    onChange={setPurpose}
                    placeholder="タグを追加"
                    maxTags={10}
                    variant="creator"
                  />
                  <SuggestedTags
                    tags={SUGGESTED_TAGS.purpose}
                    currentValues={purpose}
                    onAdd={(tag) => handleAddTag(tag, purpose, setPurpose)}
                  />
                </FormSection>

                <FormSection
                  label="概算期間"
                  required
                  variant="creator"
                  description=""
                >
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-24">
                      <TextInput
                        value={durationValue}
                        onChange={setDurationValue}
                        placeholder=""
                        variant="creator"
                      />
                    </div>
                    <SelectInput
                      value={durationUnit}
                      onChange={setDurationUnit}
                      options={DURATION_UNITS}
                      variant="creator"
                    />
                  </div>
                  <p className="text-xs text-neutral-500 mb-2">期間に含まれたことをタグにしましょう</p>
                  <TagInput
                    value={durationBreakdown}
                    onChange={setDurationBreakdown}
                    placeholder="タグを追加"
                    maxTags={10}
                    variant="creator"
                  />
                  <SuggestedTags
                    tags={SUGGESTED_TAGS.duration}
                    currentValues={durationBreakdown}
                    onAdd={(tag) => handleAddTag(tag, durationBreakdown, setDurationBreakdown)}
                  />
                </FormSection>

                <FormSection
                  label="ツール／スキル"
                  variant="creator"
                  description="制作に使用したツールやスキルを追加しましょう。"
                >
                  <TagInput
                    value={tools}
                    onChange={setTools}
                    placeholder="タグを追加"
                    maxTags={10}
                    variant="creator"
                  />
                  <SuggestedTags
                    tags={SUGGESTED_TAGS.tools}
                    currentValues={tools}
                    onAdd={(tag) => handleAddTag(tag, tools, setTools)}
                  />
                </FormSection>

                <FormSection
                  label="サイトタグ"
                  variant="creator"
                  description="カラーやテイストなど、このサイトの特徴的な雰囲気を追記しましょう。"
                >
                  <TagInput
                    value={siteTags}
                    onChange={setSiteTags}
                    placeholder="タグを追加"
                    maxTags={15}
                    variant="creator"
                  />
                  <SuggestedTags
                    tags={SUGGESTED_TAGS.siteTags}
                    currentValues={siteTags}
                    onAdd={(tag) => handleAddTag(tag, siteTags, setSiteTags)}
                  />
                </FormSection>
            </DetailSection>

            {/* ────── 業務情報 ────── */}
            <DetailSection title="業務情報" icon={Briefcase} bodyClassName="px-6 pb-6">
                <FormSection
                  label="クライアント情報"
                  variant="creator"
                  description="この作品の制作を依頼してください。"
                >
                  <RadioList
                    name="clientType"
                    selectedValue={clientType}
                    onChange={setClientType}
                    variant="creator"
                    options={[
                      { id: 'self', label: '自主制作' },
                      {
                        id: 'client_anonymous',
                        label: 'クライアントあり（名前は非公開）',
                        description: '外部案件で、クライアント名は公開されません。',
                      },
                      {
                        id: 'client_public',
                        label: 'クライアントあり（名前公開可）',
                        description:
                          'クライアントの許可を得た場合に選択してください（企業名もしくは一部を入力）',
                      },
                    ]}
                  />
                  {clientType === 'client_public' && (
                    <div className="mt-3">
                      <TextInput
                        value={clientName}
                        onChange={setClientName}
                        placeholder="クライアント名を入力してください（最小3文字）"
                        variant="creator"
                      />
                    </div>
                  )}
                </FormSection>

                <FormSection
                  label="費用感"
                  variant="creator"
                  description='案件の費用（税別可）、または自主制作の場合は「FitCreeで仕事された仕事もしてもらうとしたらどれくらい？」の想定費用を入力してください。'
                >
                  <div className="flex items-center gap-2">
                    <div className="flex-1">
                      <TextInput
                        value={cost}
                        onChange={setCost}
                        placeholder=""
                        variant="creator"
                      />
                    </div>
                    <span className="text-sm text-neutral-500 font-medium">円</span>
                  </div>
                </FormSection>
            </DetailSection>

            {/* ────── 公開設定 ────── */}
            <DetailSection title="公開設定" icon={Shield} bodyClassName="px-6 pb-6">
                <FormSection
                  label="成人向けコンテンツ"
                  variant="creator"
                  description=""
                >
                  <label className="flex items-center gap-3 cursor-pointer">
                    <div
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                        isAdult ? 'bg-orange-500' : 'bg-neutral-300'
                      }`}
                      onClick={() => setIsAdult(!isAdult)}
                    >
                      <span
                        className={`inline-block h-5 w-5 transform rounded-full bg-white shadow-sm transition-transform ${
                          isAdult ? 'translate-x-5' : 'translate-x-0.5'
                        }`}
                      />
                    </div>
                    <span className="text-sm text-neutral-700">
                      成人向けの作品の場合、チェックをしてください。
                    </span>
                  </label>
                </FormSection>

                <FormSection
                  label="生成AI"
                  variant="creator"
                  description="この作品における生成AIの利用状況を教えてください。"
                >
                  <RadioList
                    name="aiUsage"
                    selectedValue={aiUsage}
                    onChange={setAiUsage}
                    variant="creator"
                    options={AI_OPTIONS}
                  />
                </FormSection>

                <FormSection
                  label="年齢制限"
                  variant="creator"
                  description="見る側の方の作品なら、年齢制限をする必要があれば、選択してください。"
                >
                  <RadioList
                    name="ageRestriction"
                    selectedValue={ageRestriction}
                    onChange={setAgeRestriction}
                    variant="creator"
                    options={AGE_RESTRICTION_OPTIONS}
                  />
                </FormSection>

                <FormSection
                  label="公開範囲"
                  variant="creator"
                  description=""
                >
                  <RadioList
                    name="visibility"
                    selectedValue={visibility}
                    onChange={setVisibility}
                    variant="creator"
                    options={VISIBILITY_OPTIONS}
                  />
                  {visibility === 'limited' && (
                    <p className="text-xs text-neutral-500 mt-2 pl-1">
                      作品URLを知っている方のみ閲覧できるようになります。非公開にしたい場合は「下書き」をご活用ください。
                    </p>
                  )}
                </FormSection>
            </DetailSection>

            {/* ===== 送信ボタン ===== */}
            <div className="pb-8">
              <button
                onClick={() => router.push('/creator/works/post/preview')}
                className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-4 rounded-xl transition-all text-base flex items-center justify-center gap-2"
              >
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
