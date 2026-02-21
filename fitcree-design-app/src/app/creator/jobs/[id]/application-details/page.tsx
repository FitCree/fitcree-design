"use client";

import React, { useMemo, useState } from 'react';
import {
  ArrowLeft,
  Image as ImageIcon,
  CircleDollarSign,
  MessageSquare,
  FileText,
  ExternalLink,
  ChevronLeft,
  AlertTriangle,
  HelpCircle,
  XCircle,
  Clock
} from 'lucide-react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { MOCK_CLIENTS, Project } from '@/data/mock-data';
import { BUDGET_RANGES, REQUEST_CATEGORIES } from '@/data/master-data';
import HeaderCreator from '@/components/common/header-creator';
import Footer from '@/components/common/footer';
import { DetailSection } from '@/components/common/DetailSection';

export default function ApplicationDetailPage() {
  const params = useParams();
  const router = useRouter();
  const projectId = Number(params.id);
  const [showWithdrawModal, setShowWithdrawModal] = useState(false);

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

  // モックデータ：応募内容
  const applicationData = {
    message: "これまでのプロジェクト経験を活かし、ブランドの価値を最大化するデザインをご提案させていただきます。特にターゲット層に響く色使いとタイポグラフィには自信があります。納期についても柔軟に対応可能ですので、ぜひご検討いただけますと幸いです。",
    roughDraft: "既存のブランドガイドラインをベースにしつつ、新しさを感じさせるレイアウト案を想定しています。添付の資料にラフな構成をまとめておりますのでご確認ください。",
    quotes: [
      { id: 1, item: 'デザイン費（3案作成）', price: 60000 },
      { id: 2, item: '修正対応（無制限）', price: 20000 },
      { id: 3, item: '入稿データ作成', price: 10000 },
    ],
    portfolios: [
      { id: 1, title: '気軽に訪れることのできるレストランのWebサイトのポートフォリオ', category: 'Webサイト', image: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&q=80&w=200', description: '気軽に訪れていただけるよう、お客さんに寄り添ったデザインを心がけました', url: 'https://example.com/work1' },
      { id: 2, title: '高級レストランのWebサイトのポートフォリオ', category: 'Webサイト', image: 'https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&q=80&w=200', description: '高級感のあるデザインを心がけています', url: 'https://example.com/work2' },
    ]
  };

  const subtotal = useMemo(() => {
    return applicationData.quotes.reduce((acc, q) => acc + q.price, 0);
  }, []);

  const fee = Math.floor(subtotal * 0.1);
  const totalPayout = subtotal - fee;

  const handleWithdraw = () => {
    setShowWithdrawModal(false);
    alert('応募取り下げ申請を受け付けました。');
    router.push('/creator/applications');
  };

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Project not found (ID: {projectId})</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neutral-50">
      <HeaderCreator />

      <main className="pt-24 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto mb-6">
          <button
            onClick={() => router.back()}
            className="text-neutral-500 hover:text-neutral-800 flex items-center gap-1 text-sm font-bold transition-colors mb-4"
          >
            <ArrowLeft size={16} /> 案件詳細へ戻る
          </button>
          <div className="flex items-center gap-4 mb-8">
            <h1 className="text-2xl font-black text-neutral-900">応募内容の確認</h1>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

            {/* 左カラム: 応募内容詳細 */}
            <div className="lg:col-span-2 space-y-8">
              {/* 応募案件概要 */}
              <section className="border-l border-l-4 border-neutral-300 overflow-hidden p-4">
                <dl>
                  <dt className="text-sm font-bold flex items-center gap-2 text-neutral-500">
                    応募した案件
                  </dt>
                  <dd className="text-xl font-black text-neutral-900 mt-2">
                    {project.title}
                  </dd>
                </dl>
              </section>

              {/* 提案メッセージ */}
              <DetailSection title="提案メッセージ" icon={MessageSquare}>
                <p className="text-neutral-800 leading-relaxed whitespace-pre-wrap text-base">
                  {applicationData.message}
                </p>
              </DetailSection>

              {/* 見せたい作品 */}
              <DetailSection title="特に見せたい作品" icon={ImageIcon}>
                <div className="space-y-4">
                  {applicationData.portfolios.map(item => (
                    <div key={item.id} className="flex gap-6 p-4 border border-neutral-200 rounded-xl bg-white">
                      <div className="relative w-48 h-32 flex-shrink-0 rounded-lg overflow-hidden border bg-neutral-100">
                        <img src={item.image} alt="" className="w-full h-full object-cover" />
                      </div>
                      <div className="flex-1 min-w-0 space-y-2">
                        <div className="flex items-center gap-2">
                          <span className="bg-orange-50 text-neutral-800 px-2 py-0.5 rounded-full border border-orange-200 text-xs text-orange-500 font-bold">
                            {item.category}
                          </span>
                        </div>
                        <h4 className="font-bold text-neutral-800 text-base leading-snug">
                          {item.title}
                        </h4>
                        {item.description && (
                          <p className="text-sm text-neutral-600 line-clamp-2">
                            {item.description}
                          </p>
                        )}
                        {item.url && (
                          <div className="flex items-center gap-1.5 text-blue-500 text-sm font-bold truncate">
                            <ExternalLink className="w-3.5 h-3.5" />
                            <a href={item.url} target="_blank" rel="noopener noreferrer" className="hover:underline">
                              {item.url}
                            </a>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </DetailSection>

              {/* ラフ案・構成案 */}
              <DetailSection title="ラフ案・構成案" icon={FileText} bodyClassName="p-6 space-y-4">
                <div className="flex items-center gap-3 p-3 border border-neutral-200 rounded-xl bg-neutral-50">
                  <div className="bg-white p-2 rounded-lg border border-neutral-100 text-neutral-400">
                    <FileText size={20} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-bold text-neutral-800">rough_draft_concept.pdf</p>
                    <p className="text-[10px] text-neutral-500 font-medium">1.2 MB</p>
                  </div>
                </div>
                <p className="text-neutral-800 leading-relaxed text-base">
                  {applicationData.roughDraft}
                </p>
              </DetailSection>

              {/* 概算見積もり */}
              <DetailSection title="概算見積もり" icon={CircleDollarSign}>
                <div className="space-y-3 mb-8">
                  {applicationData.quotes.map((q) => (
                    <div key={q.id} className="flex justify-between items-center py-2 border-b border-neutral-50">
                      <span className="text-neutral-700 font-medium">{q.item}</span>
                      <span className="text-neutral-900 font-bold">{q.price.toLocaleString()} 円</span>
                    </div>
                  ))}
                </div>

                <div className="bg-orange-50 rounded-2xl p-6">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-bold text-neutral-600">見積もり合計額</span>
                    <span className="text-lg font-black text-neutral-900">{subtotal.toLocaleString()} 円</span>
                  </div>
                  <div className="flex justify-between pt-4 border-t border-orange-200">
                    <span className="text-sm font-black text-neutral-800">受取り想定額</span>
                    <div className="text-right">
                      <span className="text-2xl text-orange-600 font-black">{totalPayout.toLocaleString()}</span>
                      <span className="text-xs font-bold text-orange-600 ml-1">円</span>
                      <p className="text-sm text-neutral-500 font-medium">※システム利用料（10%）を差し引いた金額</p>
                    </div>
                  </div>
                </div>

                <ul className="text-sm text-neutral-600 leading-relaxed space-y-1 list-disc pl-4 mt-4">
                  <li>クライアントには「見積もり合計額」のみ送信されています。「受取り想定額」は送信されません。</li>
                  <li>クリエイター・クライアント双方に別々のシステム手数料がかかります。詳しくは、<a href="#" target="_blank" className="text-blue-500 font-bold hover:underline gap-1 group">システム手数料について</a>をご覧ください。</li>
                </ul>
              </DetailSection>
            </div>

            {/* 右カラム: アクション & ステータス */}
            <div className="space-y-6">
              {/* ステータスカード */}
              <DetailSection title="現在の状況" icon={Clock} variant="simple">
                <div className="p-5 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl border border-blue-200 mb-6 flex flex-col items-center text-center gap-3">
                  <div className="bg-blue-600 p-3 rounded-full text-white">
                    <Clock size={24} />
                  </div>
                  <div>
                    <p className="text-xl font-black text-blue-900 leading-none">選定待ち</p>
                    <p className="text-sm text-blue-700 font-bold mt-2">クライアントが検討中です</p>
                  </div>
                </div>

                <div className="space-y-3">
                  <button
                    onClick={() => router.push(`/projects/${projectId}`)}
                    className="w-full py-4 px-6 border-2 border-neutral-200 rounded-full text-neutral-700 font-black hover:bg-neutral-50 transition-all flex items-center justify-center gap-2"
                  >
                    案件詳細へ戻る
                  </button>
                  <button
                    onClick={() => setShowWithdrawModal(true)}
                    className="w-full py-4 px-6 border-2 border-red-100 rounded-full text-red-500 font-black hover:bg-red-50 hover:border-red-200 transition-all flex items-center justify-center gap-2"
                  >
                    <XCircle size={18} />
                    応募を取り下げる
                  </button>
                </div>
              </DetailSection>

              {/* 注意事項 */}
              <DetailSection title="応募に関するご注意" icon={AlertTriangle} variant="simple">
                <ul className="space-y-2 list-disc pl-4 text-sm text-neutral-800 leading-relaxed">
                  <li>
                    修正をしたい場合は、運営までご相談ください。
                  </li>
                  <li>
                    発注先が決まり次第、受注・失注に関わらず運営より連絡します。
                  </li>
                  <li>
                    選定状況についてはお答えできません。
                  </li>
                </ul>
              </DetailSection>

              {/* ヘルプ */}
              <DetailSection title="お困りですか？" icon={HelpCircle} variant="dark">
                <div className="flex items-start gap-4">
                  <div>
                    <p className="text-sm text-white leading-relaxed mb-4">
                      選定プロセスや操作について不明点がある場合は、ヘルプセンターをご確認ください。
                    </p>
                    <button className="text-sm text-blue-400 font-black hover:underline flex items-center gap-1 text-left">
                      よくある質問を見る <ChevronLeft className="rotate-180 w-3 h-3" />
                    </button>
                  </div>
                </div>
              </DetailSection>
            </div>

          </div>
        </div>
      </main>
      <Footer />

      {/* 取り下げ確認モーダル */}
      {showWithdrawModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-6">
          <div className="bg-white rounded-3xl max-w-md w-full p-8 relative animate-in fade-in zoom-in duration-200 shadow-2xl">
            <div className="flex flex-col items-center text-center">
              <div className="bg-red-50 p-4 rounded-full text-red-500 mb-6">
                <AlertTriangle size={40} />
              </div>
              <h2 className="text-neutral-900 text-2xl font-black mb-4">応募を取り下げますか？</h2>
              <ul className="text-left space-y-2 list-disc pl-4 text-sm font-bold text-neutral-500 leading-relaxed mb-8">
                <li>
                  取り下げ申請を行うと、クライアントに辞退の通知が送られます。
                </li>
                <li>
                  取り下げ申請により応募内容はすべて破棄されます。再応募の際、前の内容は引き継がれませんのであらかじめご了承ください。
                </li>
              </ul>
              <div className="w-full space-y-3">
                <button
                  onClick={handleWithdraw}
                  className="w-full py-4 bg-red-500 text-white rounded-full font-black hover:bg-red-600 transition-all"
                >
                  はい、取り下げます
                </button>
                <button
                  onClick={() => setShowWithdrawModal(false)}
                  className="w-full py-4 border-2 border-neutral-200 bg-white text-neutral-500 rounded-full font-black hover:bg-neutral-50 transition-all"
                >
                  キャンセル
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
