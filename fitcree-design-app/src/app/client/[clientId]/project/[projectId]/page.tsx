"use client";

import React, { useState, useRef, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { MOCK_CLIENTS, Project, User } from '@/data/mock-data';
import { PROJECT_STATUS_CONFIG } from '@/data/master-data';
import { projectToFormData } from '@/lib/project-to-form';
import ProjectDetailView from '@/components/projects/ProjectDetailView';
import { ArrowLeft, Pencil, MoreVertical, Copy, XCircle, Archive, X, Info, BarChart3 } from 'lucide-react';
import HeaderClient from '@/components/common/header-client';
import ApplicationDetailModal from '@/components/projects/ApplicationDetailModal';
import { getApplicationByCreatorId } from '@/data/mock-applications';

const CLOSE_REASONS = [
  '良いクリエイターが見つかった',
  '十分な応募が集まった',
  '選考を開始したい',
  'その他',
];

export default function ClientProjectDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);
  const [showDuplicateModal, setShowDuplicateModal] = useState(false);
  const [showCloseModal, setShowCloseModal] = useState(false);
  const [closeReason, setCloseReason] = useState('');
  const [closeReasonOther, setCloseReasonOther] = useState('');
  const [selectedCreator, setSelectedCreator] = useState<User | null>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  // メニュー外クリックで閉じる
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    };
    if (menuOpen) document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [menuOpen]);

  const projectIdStr = params.projectId as string;
  const projectId = parseInt(projectIdStr);

  // Find project and its client
  let project: Project | undefined;
  let client: User | undefined;

  for (const c of MOCK_CLIENTS) {
    const p = c.projects?.find(p => p.id === projectId);
    if (p) {
      project = p;
      client = c;
      break;
    }
  }

  if (!project) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen space-y-4">
        <h2 className="text-2xl font-bold text-neutral-900">案件が見つかりません</h2>
        <p className="text-neutral-600">指定されたIDの案件データは存在しません。</p>
        <button
          onClick={() => router.back()}
          className="text-blue-600 hover:underline flex items-center gap-1"
        >
          <ArrowLeft size={16} /> 戻る
        </button>
      </div>
    );
  }

  const statusConfig = PROJECT_STATUS_CONFIG[project.status];

  const handleDuplicate = () => {
    const formData = projectToFormData(project!);
    // タイトルに「コピー」を付加
    formData.title = `${formData.title}（コピー）`;
    localStorage.setItem('jobPostPrefillData', JSON.stringify(formData));
    router.push('/client/post-job');
  };

  const canCloseRecruitment = closeReason && (closeReason !== 'その他' || closeReasonOther.trim());

  const handleCloseRecruitment = () => {
    if (!canCloseRecruitment) return;
    alert('募集を締め切りました。');
    setShowCloseModal(false);
    setCloseReason('');
    setCloseReasonOther('');
  };

  return (
    <div className="min-h-screen bg-neutral-50">
      <HeaderClient />
      <main className="pt-10 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto mb-6 flex items-center justify-between">
          <button
            onClick={() => router.push(`/client/${params.clientId}`)}
            className="text-neutral-500 hover:text-neutral-800 flex items-center gap-1 text-sm font-bold transition-colors"
          >
            <ArrowLeft size={16} /> ダッシュボードへ戻る
          </button>

          <div className="flex items-center gap-2">
            <button
              onClick={() => router.push(`/client/${params.clientId}/project/${projectId}/edit`)}
              className="bg-white border border-neutral-200 hover:border-neutral-300 text-neutral-800 text-sm font-bold px-4 py-2 rounded-lg transition-all flex items-center gap-2"
            >
              <Pencil size={14} />
              この仕事を編集する
            </button>

            {/* Analytics */}
            <button
              onClick={() => router.push(`/client/${params.clientId}/project/${projectId}/analytics`)}
              className="bg-white border border-neutral-200 hover:border-neutral-300 text-neutral-500 hover:text-blue-600 p-2 rounded-lg transition-all"
              aria-label="分析・応募状況"
              title="分析・応募状況"
            >
              <BarChart3 size={16} />
            </button>

            {/* More menu */}
            <div className="relative" ref={menuRef}>
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="bg-white border border-neutral-200 hover:border-neutral-300 text-neutral-500 hover:text-neutral-800 p-2 rounded-lg transition-all"
                aria-label="その他のメニュー"
              >
                <MoreVertical size={16} />
              </button>
              {menuOpen && (
                <div className="absolute right-0 mt-1 w-48 bg-white border border-neutral-200 rounded-lg shadow-lg py-1 z-30">
                  <button
                    onClick={() => { setMenuOpen(false); setShowDuplicateModal(true); }}
                    className="w-full text-left px-4 py-2.5 text-sm text-neutral-700 hover:bg-neutral-50 flex items-center gap-2"
                  >
                    <Copy size={14} className="text-neutral-400" />
                    依頼を複製
                  </button>
                  <button
                    onClick={() => { setMenuOpen(false); setShowCloseModal(true); }}
                    className="w-full text-left px-4 py-2.5 text-sm text-neutral-700 hover:bg-neutral-50 flex items-center gap-2"
                  >
                    <Archive size={14} className="text-neutral-400" />
                    募集を締め切る
                  </button>
                  <div className="border-t border-neutral-100 my-1" />
                  <button
                    onClick={() => { setMenuOpen(false); router.push(`/client/${params.clientId}/project/${projectId}/cancel`); }}
                    className="w-full text-left px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 flex items-center gap-2"
                  >
                    <XCircle size={14} className="text-red-400" />
                    依頼を取り下げる
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
        <ProjectDetailView
          project={project}
          client={client}
          isClientView={true}
          onCreatorClick={(creator) => setSelectedCreator(creator)}
        />
      </main>

      {/* ===== 依頼を複製モーダル ===== */}
      {showDuplicateModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={() => setShowDuplicateModal(false)}>
          <div className="bg-white rounded-xl max-w-md w-full p-6 animate-in fade-in zoom-in-95 duration-200" onClick={(e) => e.stopPropagation()}>
            {/* Header */}
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold text-neutral-800">依頼を複製</h2>
              <button onClick={() => setShowDuplicateModal(false)} className="text-neutral-400 hover:text-neutral-600 p-1 rounded-lg hover:bg-neutral-100">
                <X size={18} />
              </button>
            </div>

            <p className="text-sm text-neutral-600 mb-4">
              以下の案件を複製して、新しい案件として投稿します。
            </p>

            {/* 対象案件 */}
            <div className="bg-neutral-50 rounded-lg p-4 border border-neutral-100 mb-4">
              <p className="text-sm font-bold text-neutral-800 leading-snug">{project.title}</p>
              <div className="flex items-center gap-3 mt-2">
                <span className={`text-xs font-bold px-2 py-0.5 rounded ${statusConfig.bg} ${statusConfig.color}`}>
                  {project.statusLabel}
                </span>
                <span className="text-sm text-neutral-500">掲載日: {project.postedDate}</span>
              </div>
            </div>

            <p className="text-sm text-neutral-500 mb-6">※ 掲載日は新しく設定されます</p>

            {/* ボタン */}
            <div className="flex gap-3 justify-end">
              <button
                onClick={() => setShowDuplicateModal(false)}
                className="px-4 py-2 rounded-lg border border-neutral-300 text-sm font-bold text-neutral-600 hover:bg-neutral-50 transition-all"
              >
                キャンセル
              </button>
              <button
                onClick={handleDuplicate}
                className="px-4 py-2 rounded-lg bg-blue-500 text-white text-sm font-bold hover:bg-blue-700 transition-all"
              >
                複製して編集する
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ===== 募集を締め切るモーダル ===== */}
      {showCloseModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={() => { setShowCloseModal(false); setCloseReason(''); setCloseReasonOther(''); }}>
          <div className="bg-white rounded-xl max-w-md w-full p-6 animate-in fade-in zoom-in-95 duration-200" onClick={(e) => e.stopPropagation()}>
            {/* Header */}
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold text-neutral-800">募集を締め切る</h2>
              <button onClick={() => { setShowCloseModal(false); setCloseReason(''); setCloseReasonOther(''); }} className="text-neutral-400 hover:text-neutral-600 p-1 rounded-lg hover:bg-neutral-100">
                <X size={18} />
              </button>
            </div>

            <p className="text-sm text-neutral-600 mb-4">
              以下の案件の募集を締め切ります。締め切り後、新規応募の受付が停止されます。
            </p>

            {/* 対象案件 */}
            <div className="bg-neutral-50 rounded-lg p-4 border border-neutral-100 mb-5">
              <p className="text-sm font-bold text-neutral-800 leading-snug">{project.title}</p>
              <div className="flex items-center gap-3 mt-2">
                <span className={`text-xs font-bold px-2 py-0.5 rounded ${statusConfig.bg} ${statusConfig.color}`}>
                  {project.statusLabel}
                </span>
                <span className="text-sm text-neutral-400">掲載日: {project.postedDate}</span>
              </div>
            </div>

            {/* 締め切り理由 */}
            <div className="mb-5">
              <h3 className="text-sm font-bold text-neutral-800 mb-3">締め切りの理由</h3>
              <div className="space-y-2">
                {CLOSE_REASONS.map((reason) => (
                  <label key={reason} className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-all ${closeReason === reason ? 'bg-blue-50 border-blue-300 ring-1 ring-blue-300' : 'bg-white border-neutral-200 hover:bg-neutral-50'}`}>
                    <input
                      type="radio"
                      name="closeReason"
                      checked={closeReason === reason}
                      onChange={() => setCloseReason(reason)}
                      className="w-4 h-4 accent-blue-500"
                    />
                    <span className="text-sm text-neutral-700">{reason}</span>
                  </label>
                ))}
              </div>
              {closeReason === 'その他' && (
                <div className="mt-3">
                  <textarea
                    value={closeReasonOther}
                    onChange={(e) => setCloseReasonOther(e.target.value)}
                    placeholder="締め切りの理由を入力してください（必須）"
                    className="w-full border border-neutral-300 rounded-lg p-3 text-sm text-neutral-700 placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-blue-300 resize-none"
                    rows={3}
                  />
                </div>
              )}
            </div>

            {/* 注意事項 */}
            <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-5">
              <div className="flex gap-2.5">
                <Info size={16} className="text-amber-500 shrink-0 mt-0.5" />
                <div className="space-y-1.5 text-xs text-neutral-700">
                  <p>募集を締め切ると、<span className="font-bold">クリエイターとの契約手続き・案件進行</span>のフェーズに移行します。</p>
                  <p>応募済みのクリエイターとのやりとりは引き続き可能です。</p>
                </div>
              </div>
            </div>

            {/* ボタン */}
            <div className="flex gap-3 justify-end">
              <button
                onClick={() => { setShowCloseModal(false); setCloseReason(''); setCloseReasonOther(''); }}
                className="px-4 py-2 rounded-lg border border-neutral-300 text-sm font-bold text-neutral-600 hover:bg-neutral-50 transition-all"
              >
                キャンセル
              </button>
              <button
                onClick={handleCloseRecruitment}
                disabled={!canCloseRecruitment}
                className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${canCloseRecruitment ? 'bg-blue-500 text-white hover:bg-blue-700' : 'bg-neutral-200 text-neutral-400 cursor-not-allowed'}`}
              >
                募集を締め切る
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ===== 応募内容モーダル ===== */}
      {selectedCreator && (() => {
        const app = getApplicationByCreatorId(selectedCreator.id);
        if (!app) return null;
        return (
          <ApplicationDetailModal
            creator={selectedCreator}
            application={app}
            onClose={() => setSelectedCreator(null)}
            onViewProfile={(id) => {
              setSelectedCreator(null);
              router.push(`/creator`);
            }}
            onHire={(id) => {
              setSelectedCreator(null);
              alert(`${selectedCreator.name}さんへの発注手続きに進みます（未実装）`);
            }}
          />
        );
      })()}
    </div>
  );
}
