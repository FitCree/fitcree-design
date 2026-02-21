"use client";

import React from 'react';
import { useRouter } from 'next/navigation';
import { Project, User } from '@/types/data';
import {
  Calendar,
  Clock,
  MapPin,
  Briefcase,
  Tag,
  ExternalLink,
  FileText,
  CheckCircle2,
  AlertCircle,
  Users,
  ChevronRight,
  MessageCircle,
  Zap,
  DollarSign,
  Heart,
  Mail,
  Building2,
  Target,
  Lightbulb,
  Handshake,
  Link2,
  Paperclip,
  Globe,
  Eye,
  ShieldCheck
} from 'lucide-react';
import { BUDGET_RANGES, REQUEST_CATEGORIES, PROJECT_STATUS_CONFIG } from '@/data/master-data';

interface ProjectDetailViewProps {
  project: Project;
  client?: User;
  isClientView?: boolean;
  isApplied?: boolean;
}

export default function ProjectDetailView({ project, client, isClientView = false, isApplied = false }: ProjectDetailViewProps) {
  const router = useRouter();
  const details = project.details;

  if (!details) {
    return (
      <div className="bg-white rounded-xl border border-neutral-200 p-12 text-center">
        <AlertCircle size={48} className="mx-auto text-neutral-300 mb-4" />
        <h2 className="text-xl font-bold text-neutral-900 mb-2">詳細情報がありません</h2>
        <p className="text-neutral-500">この案件の詳細データが見つかりませんでした。</p>
      </div>
    );
  }

  const renderSectionTitle = (title: string, icon: React.ReactNode) => (
    <div className="bg-slate-500 p-4 flex items-center gap-2 text-white">
      <div className="text-white">
        {React.isValidElement(icon) ? React.cloneElement(icon as React.ReactElement<any>, { size: 20 }) : icon}
      </div>
      <h2 className="font-bold">{title}</h2>
    </div>
  );

  return (
    <div className="max-w-5xl mx-auto space-y-10">
      {/* Header Section */}
      <div className="bg-white rounded-xl border border-neutral-200 px-4 py-8 sm:p-8">
        <div className="flex flex-wrap items-center gap-4 mb-4">
          {/* ステータス */}
          <p className={`text-sm font-bold px-2 py-0.5 rounded tracking-wider ${PROJECT_STATUS_CONFIG[project.status].bg} ${PROJECT_STATUS_CONFIG[project.status].color}`}>
            {PROJECT_STATUS_CONFIG[project.status].label}
          </p>

          {/* 掲載日 */}
          <p className="flex items-center gap-1 text-sm text-neutral-800 whitespace-nowrap">
            <span>掲載日</span>
            <time dateTime={project.postedDate} className="font-bold">{project.postedDate}</time>
          </p>

          {/* 受注開始日 or 期限日 */}
          <p className="flex items-center gap-1 text-sm text-neutral-800 whitespace-nowrap">
            {project.status === 'in_progress' ? (
              <span>受注開始日</span>
            ) : (
              <span>期限日</span>
            )}
            <span className="font-bold">{project.status === 'in_progress' ? project.startDate || '---' : project.deadline}</span>
          </p>
        </div>

        {/* 案件タイトル */}
        <h1 className="text-2xl sm:text-3xl font-black text-neutral-900 leading-normal mb-6">
          {project.title}
        </h1>

        <div className="flex flex-wrap items-center gap-2 mb-8">
          {/* 依頼分野 */}
          <p className="bg-orange-50 text-neutral-800 px-3 py-1 rounded-full border border-orange-200 text-sm text-orange-500 font-bold">
            {REQUEST_CATEGORIES[project.categoryId]}
          </p>
          {/* 業種 */}
          {details.industry?.map((ind, i) => (
            <p key={i} className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full border border-blue-100 text-sm font-bold flex items-center gap-1">
              <Building2 size={12} />
              {ind}
            </p>
          ))}
          {/* 依頼形式 */}
          {details.requestType && (
            <p className="bg-purple-50 text-purple-700 px-3 py-1 rounded-full border border-purple-100 text-sm font-bold flex items-center gap-1">
              {details.requestType === 'proposal' ? <Lightbulb size={12} /> :
                details.requestType === 'specified' ? <Target size={12} /> :
                  <Handshake size={12} />
              }
              {details.requestType === 'proposal' ? '提案型' :
                details.requestType === 'specified' ? '指定型' :
                  '伴走型'}
            </p>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="flex items-start gap-3">
            <div className="bg-blue-50 p-2 rounded-lg text-blue-600">
              <DollarSign size={20} />
            </div>
            <p>
              <span className="block text-sm text-neutral-500 font-bold">予算レンジ</span>
              <span className="block font-bold text-neutral-900 text-base">{BUDGET_RANGES[project.budgetRangeId]}</span>
            </p>
          </div>

          <div className="flex items-start gap-3">
            <div className={`p-2 rounded-lg ${details.deadlineDate?.type === 'asap' ? 'text-white bg-orange-500' : 'text-blue-600 bg-blue-50'
              }`}>
              {details.deadlineDate?.type === 'asap' ? <Zap size={20} /> : <Calendar size={20} />}
            </div>
            <p>
              <span className="block text-sm text-neutral-500 font-bold">希望納期</span>
              <span className="block font-bold text-neutral-900 text-base">
                {details.deadlineDate?.type === 'asap' ? 'なるべく早く' :
                  details.deadlineDate?.type === 'negotiable' ? '相談して決定' :
                    details.deadlineDate?.value || project.deadline}
              </span>
            </p>
          </div>

          <div className="flex items-start gap-3">
            <div className="bg-blue-50 p-2 rounded-lg text-blue-600">
              <Briefcase size={20} />
            </div>
            <p>
              <span className="block text-sm text-neutral-500 font-bold">契約タイプ</span>
              <span className="block font-bold text-neutral-900 text-base">単発</span>
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-8">
          {/* Detailed Info */}
          <section className="bg-white rounded-xl border border-neutral-200 overflow-hidden">
            {renderSectionTitle('案件概要', <FileText />)}
            <div className="p-6 sm:p-8 space-y-8">
              <div>
                <h3 className="font-bold text-neutral-900 mb-2">依頼背景・目的</h3>
                <p className="text-neutral-800 leading-relaxed whitespace-pre-wrap">
                  {details.background || '未設定'}
                </p>
              </div>

              {details.target && (
                <div>
                  <h3 className="font-bold text-neutral-900 mb-2">ターゲットユーザー</h3>
                  <p className="text-neutral-800">{details.target}</p>
                </div>
              )}

              {details.usagePurpose && details.usagePurpose.length > 0 && (
                <div>
                  <h3 className="font-bold text-neutral-900 mb-2">作成物の用途</h3>
                  <ul className="flex flex-wrap gap-2">
                    {details.usagePurpose.map((usage, i) => (
                      <li key={i} className="bg-neutral-100 text-neutral-600 px-3 py-1 rounded-full text-sm font-bold">
                        {usage}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {details.taste && details.taste.length > 0 && (
                <div>
                  <h3 className="font-bold text-neutral-900 mb-2">求めるテイスト</h3>
                  <ul className="flex flex-wrap gap-2">
                    {details.taste.map((tag, i) => (
                      <li key={i} className="bg-neutral-100 text-neutral-600 px-3 py-1 rounded-full text-sm font-bold">
                        #{tag}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </section>

          {/* Conditions & Requirements */}
          <section className="bg-white rounded-xl border border-neutral-200 overflow-hidden">
            {renderSectionTitle('募集条件・制約', <CheckCircle2 />)}
            <div className="p-6 sm:p-8 space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h3 className="font-bold text-neutral-900 mb-3 text-base">必須条件・制約</h3>
                  <ul className="space-y-2">
                    {details.conditions?.map((cond, i) => {
                      const label = {
                        nda: 'NDA（秘密保持契約）締結',
                        residence: '居住地・対面指定あり',
                        invoiceIssuer: 'インボイス発行事業者',
                        copyrightTransfer: '著作権の譲渡',
                        onlineMeeting: 'オンライン会議可能'
                      }[cond] || cond;
                      return (
                        <li key={i} className="flex items-center gap-2 text-base text-neutral-800">
                          <CheckCircle2 size={16} className="text-green-500" />
                          {label}
                        </li>
                      );
                    })}
                    {!details.conditions?.length && <li className="text-base text-neutral-800">特になし</li>}
                  </ul>
                </div>

                <div>
                  <h3 className="font-bold text-neutral-900 mb-3 text-base">納品形式</h3>
                  {details.deliveryFormat?.mode === 'consult' ? (
                    <p className="text-base text-neutral-800">相談して決定</p>
                  ) : (
                    <ul className="flex flex-wrap gap-2">
                      {details.deliveryFormat?.values.map((v, i) => (
                        <li key={i} className="bg-neutral-100 text-neutral-600 px-3 py-1 rounded-full text-sm font-bold">
                          {v}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>

              <div className="pt-6 border-t border-neutral-100">
                <h3 className="font-bold text-neutral-900 mb-3 text-base">実績公開</h3>
                <p className="text-base text-neutral-800">
                  {details.publicity === 'ok' ? '公開OK' : details.publicity === 'partial' ? '一部相談' : '完全非公開'}
                </p>
              </div>

              <div className="pt-6 border-t border-neutral-100">
                <h3 className="font-bold text-neutral-900 mb-3 text-base">応募時に提出してほしいもの (必須ではありません)</h3>
                <ul className="flex flex-wrap gap-2">
                  {details.requirements?.map((req, i) => {
                    const label = {
                      proposal: '提案メッセージ',
                      rough: 'ラフ案・構成案',
                      estimate: '概算見積もり'
                    }[req] || req;
                    return (
                      <li key={i} className="flex items-center gap-1.5 bg-sky-50 text-sky-700 px-3 py-1 rounded-full text-base font-bold border border-sky-100">
                        <CheckCircle2 size={14} />
                        {label}
                      </li>
                    );
                  })}
                </ul>
                {!details.requirements?.length && <p className="text-base text-neutral-800">特になし</p>}
              </div>
            </div>
          </section>

          {/* Reference Materials */}
          {(details.referenceUrls?.length || details.referenceFiles?.length) ? (
            <section className="bg-white rounded-xl border border-neutral-200 overflow-hidden">
              {renderSectionTitle('参考資料', <Link2 />)}
              <div className="p-6 sm:p-8 space-y-8">
                {details.referenceUrls && details.referenceUrls.length > 0 && (
                  <div>
                    <h3 className="font-bold text-neutral-900 mb-3 text-base">参考URL</h3>
                    <div className="space-y-3">
                      {details.referenceUrls.map((url, i) => (
                        <a key={i} href={url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-blue-600 hover:text-blue-700 text-sm font-bold p-1 transition-colors">
                          <Globe size={16} />
                          <span className="truncate">{url}</span>
                          <ExternalLink size={14} className="ml-auto flex-shrink-0" />
                        </a>
                      ))}
                    </div>
                  </div>
                )}
                {details.referenceFiles && details.referenceFiles.length > 0 && (
                  <div>
                    <h3 className="font-bold text-neutral-900 mb-3 text-base">添付ファイル</h3>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {details.referenceFiles.map((file, i) => (
                        <li key={i}>
                          <button className="w-full block">
                            <div className="flex items-center gap-3 p-3 rounded-lg border border-neutral-200 bg-neutral-50">
                              <div className="bg-white p-2 rounded border border-neutral-200 text-neutral-400">
                                <Paperclip size={18} />
                              </div>
                              <span className="text-sm font-bold text-neutral-800 truncate">{file}</span>
                            </div>
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </section>
          ) : null}

          {/* Persona */}
          {details.persona && (
            <section className="bg-white rounded-xl border border-neutral-200 overflow-hidden">
              {renderSectionTitle('求めるパートナー像', <Users />)}
              <div className="p-6 sm:p-8">
                <p className="text-neutral-900 leading-relaxed">
                  {details.persona}
                </p>
              </div>
            </section>
          )}

          {!isClientView && (
            <div className="mt-12 flex justify-center">
              <button
                onClick={() => router.push(isApplied ? `/creator/jobs/${project.id}/application-details` : `/creator/jobs/${project.id}/apply`)}
                className={`w-full max-w-xs px-8 font-black py-4 rounded-full transition-all flex items-center justify-center gap-2 ${isApplied
                  ? "border-2 border-orange-500 text-orange-500 bg-white hover:bg-orange-50"
                  : "bg-orange-500 hover:bg-orange-600 text-white"
                  }`}
              >
                {isApplied ? (
                  <>
                    <FileText size={18} />
                    応募内容を確認する
                  </>
                ) : (
                  <>
                    <Mail size={18} />
                    この案件に応募する
                  </>
                )}
              </button>
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-6 sticky top-24 h-fit">
          {/* Client Info Card */}
          {client && (
            <div>
              {!isClientView && (
                <div className="mb-10">
                  <button
                    onClick={() => router.push(isApplied ? `/creator/jobs/${project.id}/application-details` : `/creator/jobs/${project.id}/apply`)}
                    className={`w-full font-black py-4 rounded-full transition-all flex items-center justify-center gap-2 ${isApplied
                      ? "border-2 border-orange-500 text-orange-500 bg-white hover:bg-orange-50"
                      : "bg-orange-500 hover:bg-orange-600 text-white"
                      }`}
                  >
                    {isApplied ? (
                      <>
                        <FileText size={18} />
                        応募内容を確認する
                      </>
                    ) : (
                      <>
                        <Mail size={18} />
                        この案件に応募する
                      </>
                    )}
                  </button>
                </div>
              )}

              {/* Links for Creators (only if not client view) */}
              {!isClientView && (
                <div className="mb-10">
                  <h2 className="font-bold text-neutral-900 mb-2 px-1">依頼を保存</h2>

                  <button
                    onClick={() => alert('リンクをコピーしました')}
                    className="bg-white w-full flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl border border-neutral-200 text-sm font-bold text-neutral-600 hover:bg-neutral-50 transition-colors"
                  >
                    <Link2 size={16} /> リンクコピー
                  </button>
                </div>
              )}

              {!isClientView && (
                <div className="mb-10">
                  <h2 className="font-bold text-neutral-900 mb-2 px-1">依頼者情報</h2>
                  <div className="flex items-center gap-4 mb-4">
                    <img src={client.avatarUrl} alt="" className="w-14 h-14 rounded-full border border-neutral-100" />
                    <div>
                      <h3 className="font-bold text-neutral-900">{client.name}</h3>
                      <p className="text-sm text-neutral-800">{client.company}</p>
                    </div>
                  </div>
                </div>
              )}

              {/* クリエイターリスト表示 */}
              {(() => {
                const isRecruiting = project.status === 'recruiting';
                const showApplicants = ['recruiting', 'selection'].includes(project.status);
                const showAssigned = ['in_progress', 'completed', 'closed'].includes(project.status);
                const creators = (showApplicants ? project.applicantUsers : showAssigned ? project.assignedUsers : []) || [];
                const title = showApplicants ? '応募中のクリエイター' : '担当クリエイター';

                // 募集中、またはクリエイターが存在する場合のみ表示
                if (creators.length === 0 && !isRecruiting) return null;

                return (
                  <div className="">
                    <h2 className="font-bold text-neutral-900 mb-2 px-1">{title}</h2>
                    {creators.length > 0 ? (
                      <div className="space-y-4">
                        {creators.map((creator) => (
                          <div key={creator.id} className="flex items-center gap-4 transition-colors cursor-pointer group">
                            <img src={creator.avatarUrl} alt="" className="w-10 h-10 rounded-full border border-neutral-100" />
                            <div className="flex-1 min-w-0">
                              <p className="font-bold text-neutral-900 text-sm truncate">{creator.name}</p>
                              {creator.company && <p className="text-xs text-neutral-500 truncate">{creator.company}</p>}
                            </div>
                            <ChevronRight size={16} className="text-neutral-400 group-hover:text-neutral-600 transition-colors" />
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="bg-neutral-50 border border-dashed border-neutral-200 rounded-xl p-6 text-center">
                        <Users size={24} className="mx-auto text-neutral-300 mb-2" />
                        <p className="text-sm text-neutral-500 leading-relaxed">
                          本案件にはまだ応募してきた<br />クリエイターがいません
                        </p>
                      </div>
                    )}

                    {showApplicants && isClientView && creators.length > 0 && (
                      <button className="w-full mt-6 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3.5 rounded-xl transition-all flex items-center justify-center gap-2 group">
                        <span>クリエイター選定へ進む</span>
                        <ChevronRight size={18} className="group-hover:translate-x-0.5 transition-transform" />
                      </button>
                    )}
                  </div>
                );
              })()}
            </div>
          )}
        </div>
      </div>
    </div >
  );
}
