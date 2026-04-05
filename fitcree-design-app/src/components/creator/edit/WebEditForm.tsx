'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  Save, ChevronRight, Globe, FileText, Briefcase, Wrench, Shield, Info,
} from 'lucide-react';
import { TextInput } from '@/components/forms/elements/TextInput';
import { TextArea } from '@/components/forms/elements/TextArea';
import { SelectInput } from '@/components/forms/elements/SelectInput';
import { RadioList } from '@/components/forms/elements/RadioList';
import { TagInput } from '@/components/forms/elements/TagInput';
import { FileUploader } from '@/components/forms/elements/FileUploader';
import { FormSection } from '@/components/forms/elements/FormSection';
import { DetailSection } from '@/components/common/DetailSection';
import { WorkDetail } from '@/data/mock-work-details';
import SuggestedTags from './SuggestedTags';
import {
  INDUSTRIES, DURATION_UNITS, AGE_RESTRICTION_OPTIONS, VISIBILITY_OPTIONS,
} from './constants';
import { AI_OPTIONS_WEB as AI_OPTIONS } from '@/constants/ai-options';

const SITE_TYPES = [
  'コーポレートサイト', 'サービスサイト', '採用サイト', 'ブランドサイト',
  'LP（ランディングページ）', 'ECサイト', 'キャンペーンサイト', '予約サイト',
  'オウンドメディア', 'ニュースサイト', 'ブログサイト', 'ポータルサイト',
  'マッチングサイト', 'コミュニティサイト', '会員制サイト', 'サブスクリプションサイト',
  'ポートフォリオサイト', 'ギャラリーサイト', '学校サイト', '自治体サイト',
  'NPOサイト', 'マニュアルサイト', 'その他',
];

const SUGGESTED_TAGS = {
  target: ['若年層', '高齢者', '女性', '男性'],
  purpose: ['UX向上', 'コンバージョン促進', '集客施策'],
  tools: ['Figma', 'Adobe Photoshop', 'Adobe XD', 'Illustrator', 'Sketch'],
  siteTags: ['ページ', 'オーシャンブルー', '近代的リッチ', '軽快'],
  responsibilities: ['ディレクション', 'デザイン', 'コーディング', 'ライティング', '撮影', '企画・構成'],
};

interface WebEditFormProps {
  workId: string;
  work: WorkDetail;
}

export default function WebEditForm({ workId, work }: WebEditFormProps) {
  const router = useRouter();

  const [siteUrl, setSiteUrl] = useState(work.siteUrl || '');
  const [siteAdded, setSiteAdded] = useState(!!work.siteUrl);
  const [title, setTitle] = useState(work.title);
  const [thumbnailUrl] = useState(work.thumbnailUrl);
  const [captures] = useState<string[]>(work.captures);
  const [description, setDescription] = useState(work.description);
  const [siteName, setSiteName] = useState(work.siteName || '');
  const [industry, setIndustry] = useState(work.industry || '');
  const [siteType, setSiteType] = useState(work.siteType || '');
  const [target, setTarget] = useState<string[]>(work.target);
  const [purpose, setPurpose] = useState<string[]>(work.purpose);
  const [durationValue, setDurationValue] = useState(work.durationValue || '');
  const [durationUnit, setDurationUnit] = useState(work.durationUnit || '');
  const [tools, setTools] = useState<string[]>(work.tools);
  const [siteTags, setSiteTags] = useState<string[]>(work.siteTags);
  const [responsibilities, setResponsibilities] = useState<string[]>(work.responsibilities);
  const [clientType, setClientType] = useState(work.clientType);
  const [clientName, setClientName] = useState(work.clientName || '');
  const [aiUsage, setAiUsage] = useState('none');
  const [ageRestriction, setAgeRestriction] = useState('all');
  const [visibility, setVisibility] = useState('public');

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
          {/* 左カラム: サイトURL */}
          <div className="lg:col-span-4">
            <div className="bg-white rounded-xl border border-neutral-200 p-6 lg:sticky lg:top-20">
              <h2 className="text-lg font-bold text-neutral-800 mb-1">
                <span className="text-orange-500">Webサイト</span> の作品を編集
              </h2>
              <p className="text-sm text-neutral-500 mb-5">WEBサイトのURLを入力してください。</p>

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
                更新する
              </button>

              {siteAdded && siteUrl && (
                <div className="mt-5 p-3 bg-green-50 border border-green-200 rounded-lg">
                  <p className="text-sm text-green-700 font-bold flex items-center gap-1.5">
                    <Globe size={14} />
                    URLが設定されています
                  </p>
                  <p className="text-xs text-green-600 mt-1 truncate">{siteUrl}</p>
                </div>
              )}

              <div className="mt-6 p-3 bg-blue-50 border border-blue-100 rounded-lg">
                <p className="text-xs text-blue-700 leading-relaxed flex items-start gap-1.5">
                  <Info size={13} className="shrink-0 mt-0.5" />
                  <span>このURLのサムネイルは自動で取得されることがあります。取得に問題がある場合は手動でアップロードしてください。</span>
                </p>
              </div>
            </div>
          </div>

          {/* 右カラム: 詳細入力フォーム */}
          <div className="lg:col-span-8 space-y-8">
            {/* 作品概要 */}
            <DetailSection title="作品概要" icon={FileText} bodyClassName="p-6 space-y-0">
              <FormSection
                label="作品タイトル"
                required
                variant="creator"
                description="このページのタイトルとして表示されます。検索を意識した組合せで、クライアントも使用するようなキーワードを入れましょう。"
                examples={['株式会社〇〇 コーポレートサイト制作', '新規開店の子育てシステム入りLPデザイン', '新ブランドの「チラシ」LPリニューアル']}
              >
                <TextInput value={title} onChange={setTitle} placeholder="作品タイトルを入力してください" maxLength={80} variant="creator" />
              </FormSection>

              <FormSection label="サムネイル画像" required variant="creator" description="この作品を一覧で表示する際のサムネイルをアップロードしてください。最も魅力が伝わる部分にしましょう。">
                <FileUploader variant="creator" label="ファイルをアップロード" description="またはドラッグ＆ドロップ" accept="image/jpeg,image/png,image/webp" previewImage={thumbnailUrl || null} />
              </FormSection>

              <FormSection label="キャプチャ" variant="creator" description="他にも見て欲しい部分などをアップロードしましょう。最大6枚まで追加できます。">
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
                description="この作品の目的や背景、制作で工夫した点、あなたの想いなどを自由に記入してください。発注者はここから制作の意図やあなたの強みを読み取ります。"
                examples={['企業の採用強化を目的に、コーポレートサイトをリニューアルしました。', '新しい飲食店ブランドの立ち上げに伴い、予約導線を意識したUI設計を行いました。']}
              >
                <TextArea value={description} onChange={setDescription} placeholder="作品の目的、制作背景、工夫した点などを記載してください" rows={8} maxLength={2000} variant="creator" />
              </FormSection>
            </DetailSection>

            {/* 「WEBサイト」の制作情報 */}
            <DetailSection title="「WEBサイト」の制作情報" icon={Wrench} bodyClassName="px-6 pb-6">
              <p className="text-sm text-neutral-500 mt-4 mb-2">発注者があなたにお仕事を依頼する際の判断材料になります。適切なキーワードを記載し、仕事獲得率をアップさせましょう。</p>

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

            {/* 業務情報 */}
            <DetailSection title="業務情報" icon={Briefcase} bodyClassName="p-6">
              <FormSection label="担当範囲" variant="creator" description="この作品であなたが担当した範囲をタグで入力してください。">
                <TagInput value={responsibilities} onChange={setResponsibilities} placeholder="例：#ディレクション、#デザイン、#コーディング" variant="creator" />
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
