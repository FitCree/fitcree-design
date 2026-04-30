'use client';

import React, { useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import {
  Video, FileText, Wrench, Info, Youtube, CheckCircle2, AlertCircle,
} from 'lucide-react';
import { TextInput } from '@/components/forms/elements/TextInput';
import { TextArea } from '@/components/forms/elements/TextArea';
import { SelectInput } from '@/components/forms/elements/SelectInput';
import { TagInput } from '@/components/forms/elements/TagInput';
import { FileUploader } from '@/components/forms/elements/FileUploader';
import { FormSection } from '@/components/forms/elements/FormSection';
import { DetailSection } from '@/components/common/DetailSection';
import { AI_OPTIONS_VIDEO as AI_OPTIONS } from '@/constants/ai-options';
import { INDUSTRIES } from '@/constants/work-options';
import { PostFormHeader } from '@/components/creator/post/PostFormHeader';
import { PostSubmitButton } from '@/components/creator/post/PostSubmitButton';
import { SuggestedTags } from '@/components/creator/post/SuggestedTags';
import { BusinessInfoSection } from '@/components/creator/post/BusinessInfoSection';
import { PublicationSettingsSection } from '@/components/creator/post/PublicationSettingsSection';

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

function getYouTubeThumbnail(videoId: string): string {
  return `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;
}

// ===== おすすめタグデータ =====
const SUGGESTED_TAGS = {
  tools: ['Premiere Pro', 'After Effects', 'DaVinci Resolve', 'Final Cut Pro', 'Photoshop', 'Illustrator', 'Cinema 4D', 'Blender'],
  videoTags: ['モーショングラフィックス', 'アニメーション', 'タイムラプス', '空撮ドローン', 'ドキュメンタリー', 'インタビュー', 'テロップ制作'],
  responsibilities: ['ディレクション', '撮影', '編集', 'カラーグレーディング', 'モーショングラフィックス', 'ナレーション', '企画・構成', '音響・SE'],
};

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
  aiUsage: 'none',
  ageRestriction: 'all',
  visibility: 'public',
};

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

  const [youtubeUrl, setYoutubeUrl] = useState(prefilled ? PREFILLED_DATA.youtubeUrl : '');
  const [videoAdded, setVideoAdded] = useState(prefilled);
  const [videoId, setVideoId] = useState<string | null>(
    prefilled ? extractYouTubeId(PREFILLED_DATA.youtubeUrl) : null
  );

  const [title, setTitle] = useState(prefilled ? PREFILLED_DATA.title : '');
  const [description, setDescription] = useState(prefilled ? PREFILLED_DATA.description : '');
  const [captures] = useState<string[]>([]);
  const [videoName, setVideoName] = useState(prefilled ? PREFILLED_DATA.videoName : '');
  const [industry, setIndustry] = useState(prefilled ? PREFILLED_DATA.industry : '');
  const [videoType, setVideoType] = useState(prefilled ? PREFILLED_DATA.videoType : '');
  const [tools, setTools] = useState<string[]>(prefilled ? PREFILLED_DATA.tools : []);
  const [videoTags, setVideoTags] = useState<string[]>(prefilled ? PREFILLED_DATA.videoTags : []);
  const [responsibilities, setResponsibilities] = useState<string[]>(prefilled ? PREFILLED_DATA.responsibilities : []);
  const [durationValue, setDurationValue] = useState(prefilled ? PREFILLED_DATA.durationValue : '');
  const [durationUnit, setDurationUnit] = useState(prefilled ? PREFILLED_DATA.durationUnit : '週間');
  const [clientType, setClientType] = useState(prefilled ? PREFILLED_DATA.clientType : 'self');
  const [clientName, setClientName] = useState('');
  const [aiUsage, setAiUsage] = useState(prefilled ? PREFILLED_DATA.aiUsage : 'none');
  const [ageRestriction, setAgeRestriction] = useState(prefilled ? PREFILLED_DATA.ageRestriction : 'all');
  const [visibility, setVisibility] = useState(prefilled ? PREFILLED_DATA.visibility : 'public');

  const previewUrl = '/creator/works/post/preview?category=video';
  const isValidYouTubeUrl = youtubeUrl.trim() !== '' && extractYouTubeId(youtubeUrl) !== null;

  const handleAddVideo = () => {
    const id = extractYouTubeId(youtubeUrl);
    if (id) { setVideoId(id); setVideoAdded(true); }
  };

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

          {/* ===== 左カラム: YouTube URL ===== */}
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

              {videoAdded && videoId && (
                <div className="mt-4">
                  <p className="text-xs text-neutral-500 font-bold mb-2">自動取得サムネイル</p>
                  <div className="relative rounded-lg overflow-hidden aspect-video bg-neutral-100 border border-neutral-200">
                    <img src={getYouTubeThumbnail(videoId)} alt="サムネイル" className="w-full h-full object-cover" />
                  </div>
                  <p className="text-xs text-neutral-400 mt-1">
                    ※ サムネイルはYouTubeから自動取得されます
                  </p>
                </div>
              )}

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

          <div className="lg:col-span-8 space-y-8">
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
                <TextInput value={title} onChange={setTitle} placeholder="作品タイトルを入力してください" maxLength={80} variant="creator" />
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
                <FileUploader variant="creator" label="ファイルをアップロード" description="またはドラッグ＆ドロップ" accept="image/jpeg,image/png" multiple />
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
                <TextArea value={description} onChange={setDescription} placeholder="動画の目的、制作背景、工夫した点などを記載してください" rows={8} maxLength={2000} variant="creator" />
              </FormSection>
            </DetailSection>

            <DetailSection title="「動画」の制作情報" icon={Wrench} bodyClassName="px-6 pb-6">
              <div className="mb-2">
                <p className="text-sm text-neutral-500 mt-4">
                  発注者があなたにお仕事を依頼する際の判断材料になります。適切なキーワードを記載し、仕事獲得率をアップさせましょう。
                </p>
              </div>

              <FormSection label="動画タイトル・作品名" variant="creator" description="動画の正式タイトルや作品名を入力してください。">
                <TextInput value={videoName} onChange={setVideoName} placeholder="例：採用プロモーション動画 2024年版" variant="creator" />
              </FormSection>

              <FormSection label="業種" variant="creator" description="この動画のクライアント業種を選択しましょう。">
                <SelectInput value={industry} onChange={setIndustry} options={INDUSTRIES} placeholder="選択" variant="creator" />
              </FormSection>

              <FormSection label="動画種別" variant="creator" description="制作した動画のジャンルを選択しましょう。">
                <SelectInput value={videoType} onChange={setVideoType} options={VIDEO_TYPES} placeholder="選択" variant="creator" />
              </FormSection>

              <FormSection label="使用ツール／ソフト" variant="creator" description="制作に使用したソフトウェアやツールを追加しましょう。">
                <TagInput value={tools} onChange={setTools} placeholder="タグを追加" maxTags={10} variant="creator" />
                <SuggestedTags tags={SUGGESTED_TAGS.tools} currentValues={tools} onAdd={(tag) => handleAddTag(tag, tools, setTools)} />
              </FormSection>

              <FormSection label="自由タグ" variant="creator" description="動画のスタイルや技法など、この動画の特徴を自由に追記しましょう。">
                <TagInput value={videoTags} onChange={setVideoTags} placeholder="タグを追加" maxTags={15} variant="creator" />
                <SuggestedTags tags={SUGGESTED_TAGS.videoTags} currentValues={videoTags} onAdd={(tag) => handleAddTag(tag, videoTags, setVideoTags)} />
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
