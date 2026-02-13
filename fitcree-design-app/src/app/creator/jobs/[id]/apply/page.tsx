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
  ChevronRight
} from 'lucide-react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { MOCK_CLIENTS, Project } from '@/data/mock-data';
import { BUDGET_RANGES, REQUEST_CATEGORIES } from '@/data/master-data';

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
    { id: 1, item: 'デザイン費（トップページ）', unit: '1', price: 120000 },
    { id: 2, item: 'デザイン費（下層ページ）', unit: '2', price: 80000 },
  ]);

  // 初期表示用の選択済みポートフォリオ (Mock)
  const [selectedPortfolios, setSelectedPortfolios] = useState([
    { id: 1, title: '気軽に訪れることのできるレストランのWebサイトのポートフォリオ', category: 'WEB', image: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&q=80&w=200' },
    { id: 2, title: '高級レストランのWebサイトのポートフォリオ', category: 'WEB', image: 'https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&q=80&w=200' },
  ]);

  // クライアントからの要望設定 (Mock based on project details if available, otherwise default)
  const clientRequirements = {
    message: true,
    draft: project?.details?.requirements?.includes('rough') || false,
    quote: true
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

  // 要望中バッジ
  const RequestedBadge = () => (
    <span className="ml-2 inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold bg-orange-100 text-orange-600 border border-orange-200">
      <AlertCircle className="w-3 h-3 mr-0.5" />
      要望中
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

  if (view === 'complete') {
    return (
      <div className="min-h-screen bg-neutral-50 flex items-center justify-center p-4">
        <div className="bg-white p-12 rounded-2xl  max-w-lg w-full text-center">
          <div className="flex justify-center mb-6">
            <svg width="100" height="100" viewBox="0 0 100 100" className="text-orange-500">
              <path d="M30 20 H70 V50 H30 Z" fill="currentColor" opacity="0.2" />
              <path d="M45 15 H55 V25 H45 Z" fill="currentColor" />
              <path d="M70 40 H80 V50 H70 Z" fill="currentColor" />
              <path d="M20 40 H30 V50 H20 Z" fill="currentColor" />
              <path d="M45 45 H55 V60 H45 Z" fill="currentColor" />
            </svg>
          </div>
          <h1 className="text-neutral-800 text-3xl font-bold mb-4">応募完了！</h1>
          <p className="text-neutral-600 mb-8 leading-relaxed">
            お疲れ様でした。応募が完了しました！<br />
            この調子でどんどん応募を投稿し、<br />
            仕事を獲得していきましょう！
          </p>
          <Link
            href="/creator/search"
            className="block w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-4 rounded-xl transition-colors shadow-lg shadow-orange-200"
          >
            仕事検索ページへ
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8F9FA] pb-20">
      <header className="bg-white border-b sticky top-0 z-10 px-4 py-3">
        <div className="max-w-3xl mx-auto flex items-center justify-between">
          <div className="flex-1">
            <button
              onClick={() => router.back()}
              className="text-neutral-500 hover:text-neutral-600 text-sm font-medium transition-colors"
            >
              応募キャンセル
            </button>
          </div>
          <h1 className="text-neutral-800 text-lg font-bold flex-1 text-center whitespace-nowrap hidden sm:block">仕事に応募する</h1>
          <div className="flex-1 flex justify-end items-center gap-2 sm:gap-4">
            <button className="text-neutral-500 text-sm font-medium hover:text-neutral-700 transition-colors">
              下書き保存
            </button>
            <button
              onClick={() => setView('confirm')}
              className="bg-orange-500 hover:bg-orange-600 text-white text-xs sm:text-sm font-bold px-4 py-2 rounded-lg transition-all  shadow-orange-100"
            >
              応募する
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-3xl mx-auto p-4 space-y-6">

        {/* 依頼内容の確認 */}
        <section className="bg-white border border-neutral-200 rounded-xl  overflow-hidden">
          <div className="bg-neutral-50 border-b border-neutral-100 p-4 flex items-center justify-between">
            <div className="flex items-center gap-2 text-neutral-700">
              <Info className="w-5 h-5 text-neutral-400" />
              <h2 className="font-bold">依頼内容の確認</h2>
            </div>
            <button className="text-xs text-blue-500 font-bold flex items-center gap-1 hover:underline">
              案件詳細を別タブで開く <ExternalLink className="w-3 h-3" />
            </button>
          </div>
          <div className="p-6 space-y-4">
            <div>
              <p className="text-xs font-bold text-neutral-400 uppercase mb-1">案件名</p>
              <h3 className="font-bold text-neutral-800 leading-snug">{jobInfo.title}</h3>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-xs font-bold text-neutral-400 uppercase mb-1">予算</p>
                <p className="text-sm font-bold text-neutral-700">{jobInfo.budget}</p>
              </div>
              <div>
                <p className="text-xs font-bold text-neutral-400 uppercase mb-1">希望納期</p>
                <p className="text-sm font-bold text-neutral-700">{jobInfo.deadline}</p>
              </div>
            </div>
            <div>
              <p className="text-xs font-bold text-neutral-400 uppercase mb-1">依頼詳細（抜粋）</p>
              <p className="text-sm text-neutral-600 leading-relaxed bg-neutral-50 p-3 rounded-lg border border-neutral-100">
                {jobInfo.description}
              </p>
            </div>
          </div>
        </section>

        {/* Section: Portfolios */}
        <section className="bg-white rounded-xl  overflow-hidden">
          <div className="bg-[#4E6382] p-4 flex items-center gap-2 text-white">
            <ImageIcon className="w-5 h-5" />
            <h2 className="font-bold">実績となるポートフォリオの選択</h2>
          </div>
          <div className="p-6">
            <div className="mb-6 space-y-3">
              <p className="text-sm font-medium text-neutral-700">
                クライアントに送付する作品を選択してください（最大３つ）。
              </p>
              <div className="flex items-start gap-2 bg-blue-50 border border-blue-100 p-3 rounded-lg">
                <Lightbulb className="w-4 h-4 text-blue-500 mt-0.5 flex-shrink-0" />
                <p className="text-sm text-blue-600 leading-relaxed font-medium">
                  本案件に関連のある作品を掲載しましょう。関連性が高いほど受注率がアップします。
                </p>
              </div>
            </div>

            <div className="space-y-4 mb-6">
              {selectedPortfolios.map(item => (
                <div key={item.id} className="flex items-center gap-4 group">
                  <div className="relative w-32 h-20 flex-shrink-0 rounded-lg overflow-hidden border bg-neutral-100 ">
                    <img src={item.image} alt="" className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="px-2 py-0.5 rounded border text-[10px] font-bold text-neutral-500 bg-white uppercase">
                        {item.category}
                      </span>
                    </div>
                    <p className="text-sm text-neutral-800 line-clamp-2 leading-snug">
                      {item.title}
                    </p>
                  </div>
                  <button
                    onClick={() => removePortfolio(item.id)}
                    className="p-2 text-neutral-300 hover:text-red-500 transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              ))}
            </div>

            {selectedPortfolios.length < 3 && (
              <button className="w-full py-4 bg-[#F0F4F8] hover:bg-[#E1E8F0] border border-transparent rounded-lg text-neutral-400 transition-all flex items-center justify-center group">
                <Plus className="w-6 h-6 group-hover:scale-110 transition-transform" />
              </button>
            )}
          </div>
        </section>

        {/* Section: Proposal Message */}
        <section className="bg-white rounded-xl  overflow-hidden">
          <div className="bg-[#4E6382] p-4 flex items-center gap-2 text-white">
            <MessageSquare className="w-5 h-5" />
            <h2 className="font-bold flex items-center">
              提案メッセージ
              {clientRequirements.message && <RequestedBadge />}
            </h2>
          </div>
          <div className="p-6">
            <p className="text-sm text-neutral-500 mb-4">
              案件へのアプローチや、課題解決に向けた意気込みを記載してください。
            </p>
            <textarea
              className="w-full h-40 p-4 border rounded-lg bg-neutral-50 focus:ring-2 focus:ring-orange-500 outline-none transition-all"
              placeholder="例：これまでの経験を活かし、ユーザーに刺さるデザインをご提案します..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
          </div>
        </section>

        {/* Section: Rough Draft */}
        <section className="bg-white rounded-xl  overflow-hidden">
          <div className="bg-[#4E6382] p-4 flex items-center gap-2 text-white">
            <FileText className="w-5 h-5" />
            <h2 className="font-bold flex items-center">
              ラフ案・構成案
              {clientRequirements.draft && <RequestedBadge />}
            </h2>
          </div>
          <div className="p-6">
            <p className="text-sm text-neutral-500 mb-4">
              具体的な完成イメージや、構成案の説明を記載、または添付してください。
            </p>
            <textarea
              className="w-full h-32 p-4 border rounded-lg bg-neutral-50 focus:ring-2 focus:ring-orange-500 outline-none transition-all mb-4"
              placeholder="ラフ案の補足説明など..."
              value={roughDraft}
              onChange={(e) => setRoughDraft(e.target.value)}
            />
            <button className="w-full py-3 border-2 border-dashed border-neutral-300 rounded-xl text-neutral-400 hover:text-neutral-600 hover:border-neutral-400 transition-all flex items-center justify-center gap-2 text-sm">
              <Plus className="w-4 h-4" /> 構成案ファイルをアップロードする
            </button>
          </div>
        </section>

        {/* Section: Quotation */}
        <section className="bg-white rounded-xl overflow-hidden">
          <div className="bg-[#4E6382] p-4 flex items-center gap-2 text-white">
            <CircleDollarSign className="w-5 h-5" />
            <h2 className="font-bold flex items-center">
              概算見積もり
              {clientRequirements.quote && <RequestedBadge />}
            </h2>
          </div>
          <div className="p-6">
            <div className="space-y-4 mb-6">
              <div className="grid grid-cols-12 gap-2 text-xs font-bold text-neutral-600 px-2 uppercase tracking-wider">
                <div className="col-span-6">項目</div>
                <div className="col-span-2 text-center">数量</div>
                <div className="col-span-3 text-right">単価</div>
                <div className="col-span-1"></div>
              </div>
              {quotes.map((q) => (
                <div key={q.id} className="grid grid-cols-12 gap-2 items-center">
                  <div className="col-span-6">
                    <input
                      type="text"
                      className="text-neutral-600 w-full p-3 border border-neutral-300 rounded-lg bg-neutral-50 text-sm focus:ring-2 focus:ring-orange-500 outline-none"
                      placeholder="作業工程など"
                      value={q.item}
                      onChange={(e) => updateQuote(q.id, 'item', e.target.value)}
                    />
                  </div>
                  <div className="col-span-2">
                    <input
                      type="number"
                      className="text-neutral-600 w-full p-3 border border-neutral-300 rounded-lg bg-neutral-50 text-sm focus:ring-2 focus:ring-orange-500 outline-none text-center"
                      value={q.unit}
                      onChange={(e) => updateQuote(q.id, 'unit', e.target.value)}
                    />
                  </div>
                  <div className="col-span-3">
                    <input
                      type="number"
                      className="text-neutral-600 w-full p-3 border border-neutral-300 rounded-lg bg-neutral-50 text-sm focus:ring-2 focus:ring-orange-500 outline-none text-right"
                      value={q.price}
                      onChange={(e) => updateQuote(q.id, 'price', e.target.value)}
                    />
                  </div>
                  <div className="col-span-1 flex justify-center">
                    <button
                      onClick={() => handleRemoveQuote(q.id)}
                      className="text-neutral-300 hover:text-red-500 transition-colors"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
            <button
              onClick={handleAddQuote}
              className="flex items-center gap-2 text-orange-500 text-sm font-bold hover:text-orange-600 mb-8"
            >
              <Plus className="w-4 h-4" /> 見積もり内訳を追加する
            </button>

            <div className="bg-[#FFF8F1] rounded-2xl p-6 space-y-4 mb-6">
              <h3 className="text-neutral-800 text-center font-bold text-lg mb-4">あなたのお受取り想定</h3>
              <div className="space-y-2 border-b border-orange-100 pb-4">
                <div className="flex justify-between text-neutral-800 text-sm">
                  <span>見積もり合計額</span>
                  <span className="font-medium text-black">{subtotal.toLocaleString()} 円</span>
                </div>
                <div className="flex justify-between text-neutral-800 text-sm">
                  <span>システム利用料（10%）</span>
                  <span className="font-medium text-red-400">-{fee.toLocaleString()} 円</span>
                </div>
              </div>
              <div className="flex justify-between items-end pt-2">
                <span className="text-neutral-800 font-bold">お受取り想定額</span>
                <div className="text-right">
                  <span className="text-2xl font-black text-orange-500">{totalPayout.toLocaleString()}</span>
                  <span className="text-sm font-bold ml-1">円</span>
                </div>
              </div>
            </div>

            {/* 新たに追加した注釈部分 */}
            <div className="px-2 space-y-2">
              <ul className="text-xs text-neutral-600 space-y-1 list-disc pl-4">
                <li>クリエイター手取りはクライアントに表示されません</li>
                <li>クリエイター・クライアント双方に別々のシステム手数料がかかります</li>
              </ul>
              <a
                href="#"
                className="inline-flex items-center text-sm text-blue-500 font-bold hover:underline gap-1 group"
              >
                システム手数料の詳細はこちら
                <ChevronRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
              </a>
            </div>
          </div>
        </section>

        <button
          onClick={() => setView('confirm')}
          className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-5 rounded-xl transition-all shadow-lg shadow-orange-100 text-lg"
        >
          この内容で応募する
        </button>
      </main>

      {/* Confirmation Modal */}
      {view === 'confirm' && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-6">
          <div className="bg-white rounded-2xl max-w-md w-full p-8 relative animate-in fade-in zoom-in duration-200 shadow-2xl">
            <button
              onClick={() => setView('form')}
              className="absolute top-4 right-4 text-neutral-400 hover:text-neutral-600"
            >
              <X className="w-6 h-6" />
            </button>
            <h2 className="text-neutral-800 text-2xl font-bold text-center mb-8 mt-4">応募しますか？</h2>
            <div className="flex gap-4 mb-6">
              <button
                onClick={() => setView('form')}
                className="flex-1 py-4 border-2 border-neutral-100 rounded-xl font-bold text-neutral-500 hover:bg-neutral-50 transition-colors"
              >
                編集に戻る
              </button>
              <button
                onClick={() => setView('complete')}
                className="flex-1 py-4 bg-orange-500 text-white rounded-xl font-bold hover:bg-orange-600 shadow-lg shadow-orange-100 transition-colors"
              >
                応募する
              </button>
            </div>
            <p className="text-center text-xs text-neutral-600">
              応募後の応募取り消しは可能です。
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
