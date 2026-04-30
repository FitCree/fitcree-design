'use client';

import React, { useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import {
  ArrowLeft,
  Save,
  ChevronRight,
  Video,
  FileText,
  Briefcase,
  Wrench,
  Shield,
  Info,
  Youtube,
  CheckCircle2,
  AlertCircle,
} from 'lucide-react';
import { TextInput } from '@/components/forms/elements/TextInput';
import { TextArea } from '@/components/forms/elements/TextArea';
import { SelectInput } from '@/components/forms/elements/SelectInput';
import { RadioList } from '@/components/forms/elements/RadioList';
import { TagInput } from '@/components/forms/elements/TagInput';
import { FileUploader } from '@/components/forms/elements/FileUploader';
import { FormSection } from '@/components/forms/elements/FormSection';
import { DetailSection } from '@/components/common/DetailSection';
import { AI_OPTIONS_VIDEO as AI_OPTIONS } from '@/constants/ai-options';
import { AGE_RESTRICTION_OPTIONS, VISIBILITY_OPTIONS } from '@/constants/work-options';

// ===== YouTube URL から動画ID を抽出 =====
function extractYouTubeId(url: string): string | null {
  const patterns = [
    /(?:youtube\.com\/watch\?v=)([a-zA-Z0-9_-]{11})/,
    /(?:youtu\.be\/)([a-zA-Z0-9_-]{11})/,
    /(?:youtube\.com\/embed\/)([a-zA-Z0-9_-]{11})/,
    /(?:youtube\.com\/shorts\/)([a-zA-Z0-9_-]{11})/,
  ];
  for (const pattern of patterns) {
    const m = url.match(pattern);
    if (m) return m[1];
  }
  return null;
}

// ===== YouTube サムネイルURL =====
function getYouTubeThumbnail(videoId: string): string {
  return `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;
}

// ===== おすすめタグデータ =====
const SUGGESTED_TAGS = {
  tools: ['Premiere Pro', 'After Effects', 'DaVinci Resolve', 'Final Cut Pro', 'Photoshop', 'Illustrator', 'Cinema 4D', 'Blender'],
  videoTags: ['モーショングラフィックス', 'アニメーション', 'タイムラプス', '空撮ドローン', 'ドキュメンタリー', 'インタビュー', 'テロップ制作'],
  responsibilities: ['ディレクション', '撮影', '編集', 'カラーグレーディング', 'モーショングラフィックス', 'ナレーション', '企画・構成', '音響・SE'],
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

// ===== 動画種別 =====
const VIDEO_TYPES = [
  'プロモーション動画（PR動画）',
  'CM・広告映像',
  'コーポレートムービー',
  'サービス紹介・製品紹介',
  '採用動画',
  'イベント・セミナー映像',
  'ウェディング・記念映像',
  '音楽PV・MVK',
  'YouTubeコンテンツ',
  'SNS向けショート動画',
  'ドキュメンタリー',
  'アニメーション',
  'モーショングラフィックス',
  'オンライン授業・教育コンテンツ',
  'インタビュー・対談映像',
  '空撮・ドローン映像',
  'その他',
];

// ===== 概算期間 =====
const DURATION_UNITS = ['時間', '日', '週間', 'ヶ月'];

// ===== モック入力済みデータ =====
const PREFILLED_DATA = {
  youtubeUrl: 'https://www.youtube.com/watch?v=031CPKWyl10',
  title: 'スタートアップ企業の採用プロモーション動画',
  description: `スタートアップ企業の採用強化を目的に、社内の雰囲気や働き方を伝えるプロモーション動画を制作しました。\n\n社員インタビューとオフィスの日常風景を組み合わせ、企業文化がリアルに伝わる構成を意識しています。カラーグレーディングでは企業ブランドカラーに合わせた温かみのある仕上がりにしました。`,
  videoName: 'スタートアップ株式会社 採用PV',
  industry: 'IT・テクノロジー',
  videoType: '採用動画',
  durationValue: '2',
  durationUnit: '週間',
  tools: ['#Premiere Pro', '#After Effects'],
  videoTags: ['#インタビュー', '#モーショングラフィックス'],
  responsibilities: ['#ディレクション', '#撮影', '#編集', '#カラーグレーディング'],
  clientType: 'client_anonymous',
  clientName: '',
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
      {/* <span className="text-xs text-neutral-400 font-bold">例</span> */}
      {available.map((tag) => (
        <button
          key={tag}
          type="button"
          onClick={() => onAdd(tag)}
          className="px-2.5 py-1 text-xs font-medium rounded-md bg-white text-orange-500 border border-orange-200 hover:bg-orange-50 transition-colors"
        >
          #{tag}
        </button>
      ))}
    </div>
  );
}

export default function PostVideoPageWrapper() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-neutral-100" />}>
      <PostVideoPage />
    </Suspense>
  );
}

function PostVideoPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const prefilled = searchParams.get('prefilled') === '1';

  // YouTube URL 関連
  const [youtubeUrl, setYoutubeUrl] = useState(prefilled ? PREFILLED_DATA.youtubeUrl : '');
  const [videoAdded, setVideoAdded] = useState(prefilled);
  const [videoId, setVideoId] = useState<string | null>(
    prefilled ? extractYouTubeId(PREFILLED_DATA.youtubeUrl) : null
  );

  // 作品概要
  const [title, setTitle] = useState(prefilled ? PREFILLED_DATA.title : '');
  const [description, setDescription] = useState(prefilled ? PREFILLED_DATA.description : '');
  const [captures] = useState<string[]>([]);

  // 動画制作情報
  const [videoName, setVideoName] = useState(prefilled ? PREFILLED_DATA.videoName : '');
  const [industry, setIndustry] = useState(prefilled ? PREFILLED_DATA.industry : '');
  const [videoType, setVideoType] = useState(prefilled ? PREFILLED_DATA.videoType : '');
  const [tools, setTools] = useState<string[]>(prefilled ? PREFILLED_DATA.tools : []);
  const [videoTags, setVideoTags] = useState<string[]>(prefilled ? PREFILLED_DATA.videoTags : []);

  // 業務情報
  const [responsibilities, setResponsibilities] = useState<string[]>(prefilled ? PREFILLED_DATA.responsibilities : []);
  const [durationValue, setDurationValue] = useState(prefilled ? PREFILLED_DATA.durationValue : '');
  const [durationUnit, setDurationUnit] = useState(prefilled ? PREFILLED_DATA.durationUnit : '週間');
  const [clientType, setClientType] = useState(prefilled ? PREFILLED_DATA.clientType : 'self');
  const [clientName, setClientName] = useState('');

  // 公開設定
  const [aiUsage, setAiUsage] = useState(prefilled ? PREFILLED_DATA.aiUsage : 'none');
  const [ageRestriction, setAgeRestriction] = useState(prefilled ? PREFILLED_DATA.ageRestriction : 'all');
  const [visibility, setVisibility] = useState(prefilled ? PREFILLED_DATA.visibility : 'public');

  const handleAddVideo = () => {
    const id = extractYouTubeId(youtubeUrl);
    if (id) {
      setVideoId(id);
      setVideoAdded(true);
    }
  };

  const handleAddTag = (
    tag: string,
    current: string[],
    setter: (v: string[]) => void
  ) => {
    if (!current.includes(`#${tag}`)) {
      setter([...current, `#${tag}`]);
    }
  };

  const isValidYouTubeUrl = youtubeUrl.trim() !== '' && extractYouTubeId(youtubeUrl) !== null;

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
          <div className="flex items-center gap-6">
            <button className="text-neutral-500 text-sm font-bold hover:text-neutral-700 transition-colors flex items-center gap-1.5">
              <Save size={15} />
              下書き保存
            </button>
            <button
              onClick={() => router.push('/creator/works/post/preview?category=video')}
              className="bg-orange-500 hover:bg-orange-600 text-white text-sm font-bold px-5 py-2 rounded-lg transition-all"
            >
              公開に進む
            </button>
          </div>
        </div>
      </header>

      {/* ===== メインコンテンツ ===== */}
      <main className="max-w-6xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

          {/* ========== 左カラム: YouTube URL ========== */}
          <div className="lg:col-span-4">
            <div className="bg-white rounded-xl border border-neutral-200 p-6 lg:sticky lg:top-20">
              <h2 className="text-lg font-bold text-neutral-800 mb-1">
                <span className="text-orange-500">動画</span> の作品を追加
              </h2>
              <p className="text-sm text-neutral-500 mb-5">
                YouTubeに公開している動画のURLを入力してください。
              </p>

              <FormSection label="YouTube URL" variant="creator">
                <TextInput
                  value={youtubeUrl}
                  onChange={setYoutubeUrl}
                  placeholder="https://www.youtube.com/watch?v=..."
                  variant="creator"
                />
                {youtubeUrl.trim() && !isValidYouTubeUrl && (
                  <p className="text-xs text-red-500 mt-1 flex items-center gap-1">
                    <AlertCircle size={12} />
                    有効なYouTube URLを入力してください
                  </p>
                )}
              </FormSection>

              <button
                onClick={handleAddVideo}
                disabled={!isValidYouTubeUrl}
                className={`mt-4 w-full py-2.5 rounded-lg text-sm font-bold transition-all ${
                  isValidYouTubeUrl
                    ? 'bg-orange-500 text-white hover:bg-orange-600'
                    : 'bg-neutral-200 text-neutral-400 cursor-not-allowed'
                }`}
              >
                動画を追加する
              </button>

              {/* 動画プレビュー */}
              {videoAdded && videoId && (
                <div className="mt-5">
                  <div className="relative rounded-lg overflow-hidden bg-black aspect-video">
                    <iframe
                      src={`https://www.youtube.com/embed/${videoId}`}
                      className="w-full h-full"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  </div>
                  <div className="mt-2 p-2 bg-green-50 border border-green-200 rounded-lg">
                    <p className="text-xs text-green-700 font-bold flex items-center gap-1.5">
                      <CheckCircle2 size={13} />
                      YouTubeが追加されました
                    </p>
                  </div>
                </div>
              )}

              {/* サムネイルプレビュー */}
              {videoAdded && videoId && (
                <div className="mt-4">
                  <p className="text-xs text-neutral-500 font-bold mb-2">自動取得サムネイル</p>
                  <div className="relative rounded-lg overflow-hidden aspect-video bg-neutral-100 border border-neutral-200">
                    <img
                      src={getYouTubeThumbnail(videoId)}
                      alt="サムネイル"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <p className="text-xs text-neutral-400 mt-1">
                    ※ サムネイルはYouTubeから自動取得されます
                  </p>
                </div>
              )}

              {/* ヒント */}
              <div className="mt-5 p-3 bg-blue-50 border border-blue-100 rounded-lg">
                <p className="text-xs text-blue-700 leading-relaxed flex items-start gap-1.5">
                  <Info size={13} className="shrink-0 mt-0.5" />
                  <span>
                    動画は直接アップロードできません。YouTubeに公開またはURLを知っている人のみ公開の動画を使用してください。
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
                description="この作品のタイトルとして表示されます。検索を意識したキーワードを含めましょう。"
                examples={[
                  '株式会社〇〇 採用プロモーション動画',
                  '新商品ローンチCM 30秒ver',
                  'スタートアップ コーポレートムービー制作',
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
                label="キャプチャ（任意）"
                variant="creator"
                description="動画のスクリーンショットや制作過程の画像があれば追加してください。最大6枚まで。"
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
                <FileUploader
                  variant="creator"
                  label="ファイルをアップロード"
                  description="またはドラッグ＆ドロップ"
                  accept="image/jpeg,image/png"
                  multiple
                />
              </FormSection>

              <FormSection
                label="作品説明文"
                variant="creator"
                description="この動画の目的・背景・制作で工夫した点などを自由に記入してください。"
                examples={[
                  '採用強化を目的に、社内の雰囲気と社員の声を伝えるPR動画を制作しました。インタビューとBロールを効果的に組み合わせ、企業文化をリアルに伝える構成を意識しています。',
                  '新商品のローンチに合わせた30秒CMです。ターゲットである20代女性に響くよう、明るいトーンとテンポの良い編集にしました。',
                ]}
              >
                <TextArea
                  value={description}
                  onChange={setDescription}
                  placeholder="動画の目的、制作背景、工夫した点などを記載してください"
                  rows={8}
                  maxLength={2000}
                  variant="creator"
                />
              </FormSection>
            </DetailSection>

            {/* ────── 「動画」の制作情報 ────── */}
            <DetailSection title="「動画」の制作情報" icon={Wrench} bodyClassName="px-6 pb-6">
              <div className="mb-2">
                <p className="text-sm text-neutral-500 mt-4">
                  発注者があなたにお仕事を依頼する際の判断材料になります。適切なキーワードを記載し、仕事獲得率をアップさせましょう。
                </p>
              </div>

              <FormSection
                label="動画タイトル・作品名"
                variant="creator"
                description="動画の正式タイトルや作品名を入力してください。"
              >
                <TextInput
                  value={videoName}
                  onChange={setVideoName}
                  placeholder="例：採用プロモーション動画 2024年版"
                  variant="creator"
                />
              </FormSection>

              <FormSection
                label="業種"
                variant="creator"
                description="この動画のクライアント業種を選択しましょう。"
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
                label="動画種別"
                variant="creator"
                description="制作した動画のジャンルを選択しましょう。"
              >
                <SelectInput
                  value={videoType}
                  onChange={setVideoType}
                  options={VIDEO_TYPES}
                  placeholder="選択"
                  variant="creator"
                />
              </FormSection>

              <FormSection
                label="使用ツール／ソフト"
                variant="creator"
                description="制作に使用したソフトウェアやツールを追加しましょう。"
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
                label="自由タグ"
                variant="creator"
                description="動画のスタイルや技法など、この動画の特徴を自由に追記しましょう。"
              >
                <TagInput
                  value={videoTags}
                  onChange={setVideoTags}
                  placeholder="タグを追加"
                  maxTags={15}
                  variant="creator"
                />
                <SuggestedTags
                  tags={SUGGESTED_TAGS.videoTags}
                  currentValues={videoTags}
                  onAdd={(tag) => handleAddTag(tag, videoTags, setVideoTags)}
                />
              </FormSection>
            </DetailSection>

            {/* ────── 業務情報 ────── */}
            <DetailSection title="業務情報" icon={Briefcase} bodyClassName="p-6">
              <FormSection
                label="担当範囲"
                variant="creator"
                description="この作品であなたが担当した範囲をタグで入力してください。"
              >
                <TagInput
                  value={responsibilities}
                  onChange={setResponsibilities}
                  placeholder="タグを追加"
                  variant="creator"
                />
                <SuggestedTags
                  tags={SUGGESTED_TAGS.responsibilities}
                  currentValues={responsibilities}
                  onAdd={(tag) => handleAddTag(tag, responsibilities, setResponsibilities)}
                />
              </FormSection>

              <FormSection
                label="概算期間"
                variant="creator"
                description="担当範囲においてかかった時間を入力してください。"
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
              </FormSection>

              <FormSection
                label="クライアント情報"
                variant="creator"
                description="この作品の相手を選択してください。"
              >
                <RadioList
                  name="clientType"
                  selectedValue={clientType}
                  onChange={setClientType}
                  variant="creator"
                  options={[
                    { id: 'self', label: 'クライアントなし（自主制作／仮想制作）' },
                    {
                      id: 'client_anonymous',
                      label: 'クライアントあり（名前は非公開）',
                      description: '外部案件で、クライアント名は公開されません。',
                    },
                    {
                      id: 'client_public',
                      label: 'クライアントあり（名前公開可）',
                      description: 'クライアントの許可を得た場合に選択してください（企業名もしくは一部を入力）',
                    },
                  ]}
                />
                {clientType === 'client_public' && (
                  <div className="mt-3">
                    <TextInput
                      value={clientName}
                      onChange={setClientName}
                      placeholder="クライアント名を入力"
                      variant="creator"
                    />
                  </div>
                )}
              </FormSection>
            </DetailSection>

            {/* ────── 公開設定 ────── */}
            <DetailSection title="公開設定" icon={Shield} bodyClassName="p-6">
              <FormSection
                label="生成AIの利用状況"
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
                description="成人向けコンテンツを含む場合は、適切な年齢制限を選択してください。"
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
                onClick={() => router.push('/creator/works/post/preview?category=video')}
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
