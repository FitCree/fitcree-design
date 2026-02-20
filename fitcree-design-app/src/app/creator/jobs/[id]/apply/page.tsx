"use client";

import React, { useState, useMemo } from 'react';
import {
  ArrowLeft,
  Plus,
  Trash2,
  CheckCircle2,
  Image as ImageIcon,
  CircleDollarSign,
  MessageSquare,
  FileText,
  X,
  AlertCircle,
  Info,
  ExternalLink,
  Lightbulb,
  ChevronRight,
  Upload
} from 'lucide-react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { MOCK_CLIENTS, Project } from '@/data/mock-data';
import { BUDGET_RANGES, REQUEST_CATEGORIES } from '@/data/master-data';
import { TextInput } from '@/components/forms/elements/TextInput';
import { SelectInput } from '@/components/forms/elements/SelectInput';
import { TextArea } from '@/components/forms/elements/TextArea';
import { TipsBox } from '@/components/forms/elements/TipsBox';
import { AddButton } from '@/components/forms/elements/AddButton';
import { FileUploader } from '@/components/forms/elements/FileUploader';

export default function JobApplyPage() {
  const params = useParams();
  const router = useRouter();
  const projectId = Number(params.id);

  // Find the project from MOCK_CLIENTS
  const project = useMemo(() => {
    for (const client of MOCK_CLIENTS) {
      if (client.projects) {
        const found = client.projects.find(p => p.id === projectId);
        if (found) return found;
      }
    }
    return null;
  }, [projectId]);

  const [view, setView] = useState<'form' | 'confirm' | 'complete'>('form');
  const [message, setMessage] = useState('');
  const [roughDraft, setRoughDraft] = useState('');
  const [quotes, setQuotes] = useState([
    { id: 1, item: 'デザイン費', unit: '3', price: 40000 },
    { id: 2, item: 'コーディング費', unit: '1', price: 40000 },
    { id: 3, item: '', unit: '0', price: 0 },
  ]);

  // 初期表示用の選択済みポートフォリオ (Mock)
  const [selectedPortfolios, setSelectedPortfolios] = useState([
    { id: 1, title: '気軽に訪れることのできるレストランのWebサイトのポートフォリオ', category: 'Webサイト', image: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&q=80&w=200', description: '説明テキスト' },
    { id: 2, title: '高級レストランのWebサイトのポートフォリオ', category: 'Webサイト', image: 'https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&q=80&w=200', description: '説明テキスト' },
  ]);

  // Portfolio Add Modal State
  const [showPortfolioModal, setShowPortfolioModal] = useState(false);
  const [newPortfolio, setNewPortfolio] = useState({
    title: '',
    category: '',
    description: '',
    image: null as string | null
  });
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  // クライアントからの要望設定 (Dynamic based on project details)
  const clientRequirements = {
    message: project?.details?.requirements?.includes('proposal') ?? true,
    draft: project?.details?.requirements?.includes('rough') ?? false,
    quote: project?.details?.requirements?.includes('estimate') ?? true
  };

  const subtotal = useMemo(() => {
    return quotes.reduce((acc, q) => acc + (Number(q.unit) * Number(q.price)), 0);
  }, [quotes]);

  const fee = Math.floor(subtotal * 0.1);
  const totalPayout = subtotal - fee;

  const handleAddQuote = () => {
    setQuotes([...quotes, { id: Date.now(), item: '', unit: '1', price: 0 }]);
  };

  const handleRemoveQuote = (id: number) => {
    setQuotes(quotes.filter(q => q.id !== id));
  };

  const updateQuote = (id: number, field: keyof typeof quotes[0], value: string | number) => {
    setQuotes(quotes.map(q => q.id === id ? { ...q, [field]: value } : q));
  };

  const removePortfolio = (id: number) => {
    setSelectedPortfolios(selectedPortfolios.filter(p => p.id !== id));
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result as string);
        setNewPortfolio({ ...newPortfolio, image: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddPortfolio = () => {
    if (!newPortfolio.title || !newPortfolio.image) return;

    setSelectedPortfolios([
      ...selectedPortfolios,
      {
        id: Date.now(),
        title: newPortfolio.title,
        category: newPortfolio.category,
        image: newPortfolio.image,
        description: newPortfolio.description
      }
    ]);

    // Reset and close
    setNewPortfolio({
      title: '',
      category: '',
      description: '',
      image: null
    });
    setPreviewImage(null);
    setShowPortfolioModal(false);
  };

  // クライアントからの要望ありバッジ
  const RequestedBadge = () => (
    <span className="flex gap-1 items-center px-3 py-0.5 rounded-full text-sm font-bold border border-sky-100 bg-sky-50 text-sky-700">
      <CheckCircle2 size={14} />
      要望あり
    </span>
  );

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Project not found (ID: {projectId})</p>
      </div>
    );
  }

  const jobInfo = {
    title: project.title,
    budget: BUDGET_RANGES[project.budgetRangeId],
    deadline: project.deadline,
    description: project.details?.background || '詳細なし'
  };

  const requirementLabels: Record<string, string> = {
    proposal: '提案メッセージ',
    rough: 'ラフ案・構成案',
    estimate: '概算見積もり'
  };

  if (view === 'complete') {
    return (
      <div className="min-h-screen bg-neutral-50 flex items-center justify-center p-4">
        <div className="bg-white p-16 rounded-2xl  max-w-lg w-full text-center">
          <div className="flex justify-center mb-6">
            <img src="/images/fitcree_logomark.svg" alt="FitCree" className="h-12 w-auto" width={48} height={48} />
          </div>
          <h1 className="text-neutral-800 text-3xl font-bold mb-4">応募完了！</h1>
          <p className="text-neutral-700 text-base mb-8 leading-relaxed">
            お疲れ様でした。応募が完了しました！<br />
            この調子でどんどん応募を投稿し、<br />
            仕事を獲得していきましょう！
          </p>
          <Link
            href="/creator/search"
            className="block w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-4 rounded-xl transition-colors"
          >
            仕事検索ページへ
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div>
      <header className="bg-white border-b sticky top-0 z-10 px-4 py-3">
        <div className="max-w-3xl mx-auto flex items-center justify-between">
          <div className="flex-1">
            <button
              onClick={() => router.back()}
              className="text-neutral-700 hover:text-neutral-800 text-sm font-medium transition-colors"
            >
              応募キャンセル
            </button>
          </div>
          <h1 className="text-neutral-800 text-lg font-bold flex-1 text-center whitespace-nowrap hidden sm:block">案件へ応募する</h1>
          <div className="flex-1 flex justify-end items-center gap-2 sm:gap-4">
            {/* <button className="text-neutral-500 text-sm font-medium hover:text-neutral-700 transition-colors">
              下書き保存
            </button> */}
            <button
              onClick={() => setView('confirm')}
              className="bg-orange-500 hover:bg-orange-600 text-white text-xs sm:text-sm font-bold px-4 py-2 rounded-lg transition-all"
            >
              応募する
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto bg-slate-100">
        <div className="max-w-3xl mx-auto p-8 pb-20 space-y-8">

          {/* 応募する案件 */}
          <section className="bg-white border border-neutral-200 rounded-xl overflow-hidden">
            <div className="bg-neutral-100 border-b border-neutral-100 p-4 flex items-center justify-between">
              <div className="flex items-center gap-2 text-neutral-700">
                <Info size={20} className="text-neutral-400" />
                <h2 className="font-bold">応募する案件</h2>
              </div>
              <Link
                href={`/projects/${projectId}`}
                target="_blank"
                className="text-xs text-blue-500 font-bold flex items-center gap-1 hover:underline"
              >
                案件詳細を別タブで開く <ExternalLink className="w-3 h-3" />
              </Link>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <h3 className="text-lg font-bold text-neutral-800 leading-snug">{jobInfo.title}</h3>
              </div>
              <div>
                <p className="text-sm font-bold text-neutral-500 uppercase mb-1">提出してほしいもの (必須ではありません)</p>
                <ul className="flex flex-wrap gap-2 mt-2">
                  {project.details?.requirements?.map((req, i) => (
                    <li key={i} className="flex items-center gap-1 bg-sky-50 text-sky-700 px-3 py-1 rounded-full text-sm font-bold border border-sky-100">
                      <CheckCircle2 size={14} />
                      {requirementLabels[req] || req}
                    </li>
                  ))}
                  {!project.details?.requirements?.length && <li className="text-sm text-neutral-500">特になし</li>}
                </ul>
              </div>
            </div>
          </section>

          {/* Section: Portfolios */}
          <section className="bg-white rounded-xl  overflow-hidden">
            <div className="bg-slate-500 p-4 flex items-center gap-2 text-white">
              <ImageIcon size={20} className="" />
              <h2 className="font-bold">特に見せたい作品の選択 (必須)</h2>
            </div>
            <div className="p-6">
              <div className="mb-6 space-y-3">
                <p className="text-base font-medium text-neutral-700">
                  クライアントに特に見てほしい作品を選択してください（最低1つ、最大6つ）。
                </p>
                <TipsBox
                  variant="creator"
                  title="作品選びのアドバイス"
                  content="本案件に関連のある作品を掲載しましょう。関連性が高いほど受注率がアップします。"
                />
              </div>

              <div className="space-y-4 mb-6">
                {selectedPortfolios.map(item => (
                  <div key={item.id} className="flex gap-4 group">
                    <div className="relative w-50 h-30 flex-shrink-0 rounded-lg overflow-hidden border bg-neutral-100 ">
                      <img src={item.image} alt="" className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="bg-orange-50 text-neutral-800 px-2 py-0.5 rounded-full border border-orange-200 text-xs text-orange-500 font-bold">
                          {item.category}
                        </span>
                      </div>
                      <p className="text-sm text-neutral-800 line-clamp-2 leading-snug">
                        {item.title}
                      </p>
                    </div>
                    <button
                      onClick={() => removePortfolio(item.id)}
                      className="p-2 text-neutral-500 hover:text-red-500 transition-colors"
                    >
                      <Trash2 size={20} />
                    </button>
                  </div>
                ))}
              </div>

              {selectedPortfolios.length < 6 && (
                <AddButton
                  label="作品を追加する"
                  onClick={() => setShowPortfolioModal(true)}
                  variant="creator"
                />
              )}
            </div>
          </section>

          {/* Section: Proposal Message */}
          <section className="bg-white rounded-xl overflow-hidden">
            <div className="bg-slate-500 p-4 flex items-center gap-2 text-white">
              <MessageSquare className="w-5 h-5" />
              <h2 className="font-bold flex items-center justify-between w-full">
                提案メッセージ
                {clientRequirements.message && <RequestedBadge />}
              </h2>
            </div>
            <div className="p-6">
              <p className="text-base text-neutral-700 mb-4">
                案件へのアプローチや、課題解決に向けた意気込みを記載してください。
              </p>
              <TextArea
                variant="creator"
                rows={8}
                placeholder="例：これまでの経験を活かし、ユーザーに刺さるデザインをご提案します..."
                value={message}
                onChange={(val: string) => setMessage(val)}
              />
            </div>
          </section>

          {/* Section: Rough Draft */}
          <section className="bg-white rounded-xl  overflow-hidden">
            <div className="bg-slate-500 p-4 flex items-center gap-2 text-white">
              <FileText className="w-5 h-5" />
              <h2 className="font-bold flex items-center justify-between w-full">
                ラフ案・構成案
                {clientRequirements.draft && <RequestedBadge />}
              </h2>
            </div>
            <div className="p-6">
              <p className="text-base text-neutral-700 mb-4">
                具体的な完成イメージや構成案の説明があれば、添付または記載してください。
              </p>
              <FileUploader
                variant="creator"
                label="ラフ案・構成案ファイルをアップロードする"
                description="PDF, PNG, JPG (1ファイル、合計5MBまで)"
                onChange={handleImageUpload}
                accept="image/jpeg,image/png,application/pdf"
                previewImage={previewImage}
                className="mb-4"
              />
              <TextArea
                variant="creator"
                rows={8}
                placeholder="ラフ案の補足説明など..."
                value={roughDraft}
                onChange={(val: string) => setRoughDraft(val)}
              />
            </div>
          </section>

          {/* Section: Quotation */}
          <section className="bg-white rounded-xl overflow-hidden">
            <div className="bg-slate-500 p-4 flex items-center gap-2 text-white">
              <CircleDollarSign className="w-5 h-5" />
              <h2 className="font-bold flex items-center justify-between w-full">
                概算見積もり
                {clientRequirements.quote && <RequestedBadge />}
              </h2>
            </div>
            <div className="p-6">
              <div className="space-y-4 mb-6">
                {/* <div className="grid grid-cols-11 gap-2 text-sm font-bold text-neutral-700 px-2 uppercase tracking-wider">
                  <div className="col-span-5">項目</div>
                  <div className="col-span-1">数量</div>
                  <div className="col-span-2">単価</div>
                  <div className="col-span-2 text-right">小計</div>
                  <div className="col-span-1"></div>
                </div> */}
                <div className="grid grid-cols-12 gap-2 text-sm font-bold text-neutral-700 uppercase tracking-wider">
                  <div className="col-span-8 pl-2">項目</div>
                  <div className="col-span-3 pl-2">金額</div>
                  <div className="col-span-1"></div>
                </div>
                {quotes.map((q) => (
                  <div key={q.id} className="grid grid-cols-12 gap-2 items-center">
                    {/* 項目 */}
                    <div className="col-span-8">
                      <TextInput
                        variant="creator"
                        placeholder="作業工程など"
                        value={q.item}
                        onChange={(val: string) => updateQuote(q.id, 'item', val)}
                      />
                    </div>
                    {/* 金額 */}
                    <div className="col-span-3 flex items-end">
                      <TextInput
                        variant="creator"
                        value={q.price}
                        onChange={(val: string) => updateQuote(q.id, 'price', val)}
                      />
                      <span className="text-sm text-neutral-500 ml-1">円</span>
                    </div>
                    {/* 削除 */}
                    <div className="col-span-1 flex justify-center">
                      <button
                        onClick={() => handleRemoveQuote(q.id)}
                        className="text-neutral-400 hover:text-red-500 transition-colors"
                      >
                        <Trash2 size={20} />
                      </button>
                    </div>
                  </div>
                  // <div key={q.id} className="grid grid-cols-11 gap-2 items-center">
                  //   {/* 項目 */}
                  //   <div className="col-span-5">
                  //     <input
                  //       type="text"
                  //       className="text-neutral-700 w-full py-3 px-2 border border-neutral-300 rounded-lg bg-neutral-50 text-sm focus:ring-2 focus:ring-orange-500 outline-none"
                  //       placeholder="作業工程など"
                  //       value={q.item}
                  //       onChange={(e) => updateQuote(q.id, 'item', e.target.value)}
                  //     />
                  //   </div>
                  //   {/* 数量 */}
                  //   <div className="col-span-1">
                  //     <input
                  //       type="number"
                  //       className="text-neutral-700 w-full py-3 px-2 border border-neutral-300 rounded-lg bg-neutral-50 text-sm focus:ring-2 focus:ring-orange-500 outline-none text-center"
                  //       value={q.unit}
                  //       onChange={(e) => updateQuote(q.id, 'unit', e.target.value)}
                  //     />
                  //   </div>
                  //   {/* 単価 */}
                  //   <div className="col-span-2">
                  //     <input
                  //       type="number"
                  //       className="text-neutral-700 w-full py-3 px-2 border border-neutral-300 rounded-lg bg-neutral-50 text-sm focus:ring-2 focus:ring-orange-500 outline-none text-right"
                  //       value={q.price}
                  //       onChange={(e) => updateQuote(q.id, 'price', e.target.value)}
                  //     />
                  //   </div>
                  //   {/* 小計 */}
                  //   <div className="col-span-2 text-right pr-2">
                  //     <span className="text-base font-bold text-neutral-700">
                  //       {(Number(q.unit) * Number(q.price)).toLocaleString()} 円
                  //     </span>
                  //   </div>
                  //   {/* 削除 */}
                  //   <div className="col-span-1 flex justify-center">
                  //     <button
                  //       onClick={() => handleRemoveQuote(q.id)}
                  //       className="text-neutral-400 hover:text-red-500 transition-colors"
                  //     >
                  //       <Trash2 size={20} />
                  //     </button>
                  //   </div>
                  // </div>
                ))}
              </div>
              <AddButton
                variant="creator"
                label="見積もり内訳を追加する"
                onClick={handleAddQuote}
              />

              <div className="bg-orange-50 rounded-sm p-6 mt-12 mb-6">
                <h3 className="text-neutral-800 text-center font-bold text-lg mb-6">あなたの受取り想定</h3>
                <p className="flex justify-between text-neutral-900">
                  <span className="text-base font-bold">見積もり合計額</span>
                  <span className="font-bold text-neutral-900 text-lg">{subtotal.toLocaleString()} 円</span>
                </p>
                <p className="flex justify-between text-neutral-900 text-sm mt-2">
                  <span>システム利用料（10%）</span>
                  <span className="text-red-500 text-lg">-{fee.toLocaleString()} 円</span>
                </p>
                <p className="flex justify-between items-end mt-6">
                  <span className="text-neutral-800 font-bold">受取り想定額</span>
                  <span className="text-right text-neutral-800">
                    <span className="text-3xl text-orange-500 font-black">{totalPayout.toLocaleString()}</span>
                    <span className="text-base ml-1 font-bold">円</span>
                  </span>
                </p>
              </div>

              <div className="px-2 space-y-2">
                <ul className="text-sm text-neutral-600 leading-relaxed space-y-1 list-disc pl-4">
                  <li>クライアントには「見積もり合計額」のみ送信されます。「受取り想定額」は送信されません。</li>
                  <li>クリエイター・クライアント双方に別々のシステム手数料がかかります。詳しくは、
                    <a href="#" className="text-blue-500 font-bold hover:underline gap-1 group">
                      システム手数料について
                    </a>
                    をご覧ください。
                  </li>
                </ul>
              </div>
            </div>
          </section>

          <button
            onClick={() => setView('confirm')}
            className="mt-6 w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-5 rounded-xl transition-all text-lg"
          >
            この内容で応募する
          </button>
        </div>

      </main>

      {/* モーダル：ポートフォリオの追加 */}
      {showPortfolioModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-6">
          <div className="bg-white rounded-2xl max-w-xl w-full p-8 pb-12 relative animate-in fade-in zoom-in duration-200 shadow-xl">
            <button
              onClick={() => setShowPortfolioModal(false)}
              className="absolute top-4 right-4 text-neutral-400 hover:text-neutral-600 transition-colors"
            >
              <X size={24} />
            </button>

            <h2 className="text-neutral-800 text-xl font-bold mb-6">ポートフォリオの追加</h2>

            <div className="space-y-6 overflow-y-auto max-h-[80vh]">
              {/* Image Upload */}
              <div>
                <label className="block text-sm font-bold text-neutral-700 mb-2">
                  作品の画像 <span className="text-red-500">*</span>
                </label>
                <div className="relative group">
                  <div className={`border-2 border-dashed rounded-xl flex flex-col items-center justify-center overflow-hidden transition-all ${previewImage ? 'border-orange-500 aspect-video' : 'border-neutral-300 py-10 hover:border-neutral-400'}`}>
                    {previewImage ? (
                      <img src={previewImage} alt="Preview" className="w-full h-full object-cover" />
                    ) : (
                      <div className="text-center">
                        <Upload className="mx-auto text-neutral-400 mb-2" size={32} />
                        <p className="text-sm text-neutral-500">クリックして画像をアップロード</p>
                        <p className="text-xs text-neutral-400 mt-1">JPGまたはPNG (1枚のみ)</p>
                      </div>
                    )}
                    <input
                      type="file"
                      accept="image/jpeg,image/png"
                      className="absolute inset-0 opacity-0 cursor-pointer"
                      onChange={handleImageUpload}
                    />
                  </div>
                </div>
              </div>

              {/* Title */}
              <div>
                <label className="block text-sm font-bold text-neutral-700 mb-2">
                  作品のタイトル <span className="text-red-500">*</span>
                </label>
                <TextInput
                  variant="creator"
                  placeholder="例：レストランのWebサイト制作"
                  value={newPortfolio.title}
                  onChange={(val: string) => setNewPortfolio({ ...newPortfolio, title: val })}
                />
              </div>

              {/* Category */}
              <div>
                <label className="block text-sm font-bold text-neutral-700 mb-2">
                  作品の分野 <span className="text-red-500">*</span>
                </label>
                <SelectInput
                  variant="creator"
                  value={newPortfolio.category}
                  options={REQUEST_CATEGORIES}
                  onChange={(val: string) => setNewPortfolio({ ...newPortfolio, category: val })}
                />
              </div>

              {/* Details */}
              <div>
                <label className="block text-sm font-bold text-neutral-700 mb-2">
                  作品の詳細
                </label>
                <TextArea
                  variant="creator"
                  placeholder="制作の背景や、使用したスキルなどを記載してください"
                  rows={4}
                  value={newPortfolio.description}
                  onChange={(val: string) => setNewPortfolio({ ...newPortfolio, description: val })}
                />
              </div>

              <div className="flex gap-4 pt-4">
                <button
                  onClick={() => setShowPortfolioModal(false)}
                  className="flex-1 py-3 border border-neutral-300 rounded-lg font-bold text-neutral-600 hover:bg-neutral-50 transition-colors"
                >
                  キャンセル
                </button>
                <button
                  onClick={handleAddPortfolio}
                  disabled={!newPortfolio.title || !newPortfolio.image || !newPortfolio.category}
                  className="flex-1 py-3 bg-orange-500 text-white rounded-lg font-bold hover:bg-orange-600 transition-colors disabled:bg-neutral-300 disabled:cursor-not-allowed"
                >
                  登録する
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Confirmation Modal */}
      {view === 'confirm' && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-6">
          <div className="bg-white rounded-2xl max-w-md w-full p-8 relative animate-in fade-in zoom-in duration-200 shadow-xl">
            <h2 className="text-neutral-800 text-2xl font-bold text-center mb-8 mt-4">応募しますか？</h2>
            <div className="flex gap-4 mb-6">
              <button
                onClick={() => setView('form')}
                className="flex-1 py-4 border-2 border-neutral-200 rounded-xl font-bold text-neutral-600 hover:bg-neutral-50 transition-colors"
              >
                編集に戻る
              </button>
              <button
                onClick={() => setView('complete')}
                className="flex-1 py-4 bg-orange-500 text-white rounded-xl font-bold hover:bg-orange-600 transition-colors"
              >
                応募する
              </button>
            </div>
            <p className="text-center text-base text-neutral-600">
              応募後の応募取り下げは可能です。
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
