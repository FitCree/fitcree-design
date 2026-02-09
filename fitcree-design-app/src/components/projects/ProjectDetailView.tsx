"use client";

import React from 'react';
import { Project, User } from '@/data/mock-data';
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

interface ProjectDetailViewProps {
  project: Project;
  client?: User;
  isClientView?: boolean;
}

export default function ProjectDetailView({ project, client, isClientView = false }: ProjectDetailViewProps) {
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
    <div className="flex items-center gap-2 mb-4 border-b border-neutral-200 pb-2">
      <div className="text-blue-600">
        {icon}
      </div>
      <h2 className="text-lg font-bold text-neutral-900">{title}</h2>
    </div>
  );

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      {/* Header Section */}
      <div className="bg-white rounded-xl border border-neutral-200 px-4 py-8 sm:p-8">
        <div className="flex flex-wrap items-center gap-4 mb-4">
          <p className={`text-xs font-bold px-2 py-0.5 rounded tracking-wider ${project.status === 'recruiting' ? 'bg-blue-100 text-blue-700' :
            project.status === 'selection' ? 'bg-sky-100 text-sky-700' :
              'bg-green-100 text-green-700'
            }`}>
            {project.statusLabel}
          </p>
          <p className="text-sm font-bold text-neutral-500">掲載日:{project.postedDate}</p>
        </div>

        <h1 className="text-2xl sm:text-3xl font-black text-neutral-900 mb-6">
          {project.title}
        </h1>

        <div className="flex flex-wrap items-center gap-2 mb-8">
          <span className="bg-orange-100 text-neutral-700 px-3 py-1 rounded-full border border-orange-200 text-xs text-orange-600 font-bold flex items-center gap-1">
            <Tag size={12} />
            {project.category}
          </span>
          {details.industry?.map((ind, i) => (
            <span key={i} className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full border border-blue-100 text-xs font-bold flex items-center gap-1">
              <Building2 size={12} />
              {ind}
            </span>
          ))}
          {details.requestType && (
            <span className="bg-purple-50 text-purple-700 px-3 py-1 rounded-full border border-purple-100 text-xs font-bold flex items-center gap-1">
              {details.requestType === 'proposal' ? <Lightbulb size={12} /> :
                details.requestType === 'specified' ? <Target size={12} /> :
                  <Handshake size={12} />
              }
              {details.requestType === 'proposal' ? '提案型' :
                details.requestType === 'specified' ? '指定型' :
                  '伴走型'}
            </span>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="flex items-start gap-3">
            <div className="bg-blue-50 p-2 rounded-lg text-blue-600">
              <DollarSign size={20} />
            </div>
            <p>
              <span className="block text-xs text-neutral-500 font-bold">予算レンジ</span>
              <span className="block font-bold text-neutral-900 text-lg">{project.budget}</span>
            </p>
          </div>

          <div className="flex items-start gap-3">
            <div className={`p-2 rounded-lg ${details.deadlineDate?.type === 'asap' ? 'text-white bg-orange-500' : 'text-blue-600 bg-blue-50'
              }`}>
              {details.deadlineDate?.type === 'asap' ? <Zap size={20} /> : <Calendar size={20} />}
            </div>
            <p>
              <span className="block text-xs text-neutral-500 font-bold">希望納期</span>
              <span className="block font-bold text-neutral-900 text-lg">
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
              <span className="block text-xs text-neutral-500 font-bold">契約タイプ</span>
              <span className="block font-bold text-neutral-900 text-lg">単発</span>
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-8">
          {/* Detailed Info */}
          <section className="bg-white rounded-xl border border-neutral-200 px-4 py-8 sm:p-8">
            {renderSectionTitle('案件概要', <FileText size={20} />)}

            <div className="space-y-8">
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
                  <div className="flex flex-wrap gap-2">
                    {details.usagePurpose.map((usage, i) => (
                      <span key={i} className="bg-neutral-100 text-neutral-600 px-3 py-1 rounded-full text-sm font-bold">
                        {usage}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {details.taste && details.taste.length > 0 && (
                <div>
                  <h3 className="font-bold text-neutral-900 mb-2">求めるテイスト</h3>
                  <div className="flex flex-wrap gap-2">
                    {details.taste.map((tag, i) => (
                      <span key={i} className="bg-neutral-100 text-neutral-600 px-3 py-1 rounded-full text-sm font-bold">
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </section>

          {/* Conditions & Requirements */}
          <section className="bg-white rounded-xl border border-neutral-300 px-4 py-8 sm:p-8">
            {renderSectionTitle('募集条件・制約', <CheckCircle2 size={20} />)}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="font-bold text-neutral-900 mb-3 text-sm">必須条件・制約</h3>
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
                      <li key={i} className="flex items-center gap-2 text-sm text-neutral-700">
                        <CheckCircle2 size={16} className="text-green-500" />
                        {label}
                      </li>
                    );
                  })}
                  {!details.conditions?.length && <li className="text-sm text-neutral-400">特になし</li>}
                </ul>
              </div>

              <div>
                <h3 className="font-bold text-neutral-900 mb-3 text-sm">納品形式</h3>
                <div className="flex flex-wrap gap-2">
                  {details.deliveryFormat?.mode === 'consult' ? (
                    <span className="text-sm text-neutral-600 italic">相談して決定</span>
                  ) : (
                    details.deliveryFormat?.values.map((v, i) => (
                      <span key={i} className="bg-neutral-100 text-neutral-700 px-3 py-1 rounded-lg text-sm font-bold border border-neutral-200">
                        {v}
                      </span>
                    ))
                  )}
                </div>
              </div>
            </div>

            <div className="mt-8 pt-8 border-t border-neutral-100">
              <h3 className="font-bold text-neutral-900 mb-3 text-sm">実績公開・権利</h3>
              <div className="flex flex-wrap gap-6">
                <div className="flex items-center gap-2">
                  <div className="text-neutral-400">
                    <Eye size={18} />
                  </div>
                  <div>
                    <p className="text-xs text-neutral-500 font-bold">実績公開</p>
                    <p className="text-sm font-bold text-neutral-800">
                      {details.publicity === 'ok' ? '公開OK' :
                        details.publicity === 'partial' ? '一部相談' :
                          '完全非公開'}
                    </p>
                  </div>
                </div>
                {details.conditions?.includes('copyrightTransfer') && (
                  <div className="flex items-center gap-2">
                    <div className="text-neutral-400">
                      <ShieldCheck size={18} />
                    </div>
                    <div>
                      <p className="text-xs text-neutral-500 font-bold">著作権</p>
                      <p className="text-sm font-bold text-neutral-800">譲渡必須</p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="mt-8 pt-8 border-t border-neutral-100">
              <h3 className="font-bold text-neutral-900 mb-3 text-sm">応募時に必要なもの</h3>
              <div className="flex flex-wrap gap-4">
                {details.requirements?.map((req, i) => {
                  const label = {
                    proposal: '提案メッセージ',
                    rough: 'ラフ案・構成案',
                    estimate: '概算見積もり'
                  }[req] || req;
                  return (
                    <div key={i} className="flex items-center gap-1.5 bg-sky-50 text-sky-700 px-3 py-1 rounded-full text-xs font-bold border border-sky-100">
                      <CheckCircle2 size={12} />
                      {label}
                    </div>
                  );
                })}
              </div>
            </div>
          </section>

          {/* Reference Materials */}
          {(details.referenceUrls?.length || details.referenceFiles?.length) ? (
            <section className="bg-white rounded-xl border border-neutral-200 px-4 py-8 sm:p-8">
              {renderSectionTitle('参考資料', <Link2 size={20} />)}
              <div className="space-y-6">
                {details.referenceUrls && details.referenceUrls.length > 0 && (
                  <div>
                    <h3 className="font-bold text-neutral-900 mb-3 text-sm">参考URL</h3>
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
                    <h3 className="font-bold text-neutral-900 mb-3 text-sm">添付ファイル</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {details.referenceFiles.map((file, i) => (
                        <div key={i} className="flex items-center gap-3 p-3 rounded-lg border border-neutral-200 bg-neutral-50">
                          <div className="bg-white p-2 rounded border border-neutral-200 text-neutral-400">
                            <Paperclip size={18} />
                          </div>
                          <span className="text-sm font-bold text-neutral-700 truncate">{file}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </section>
          ) : null}

          {/* Persona */}
          {details.persona && (
            <section className="bg-white rounded-xl border border-neutral-300 px-4 py-8 sm:p-8">
              {renderSectionTitle('求めるパートナー像', <Users size={20} />)}
              <p className="text-neutral-700 leading-relaxed italic whitespace-pre-wrap">
                「{details.persona}」
              </p>
            </section>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Client Info Card */}
          {client && (
            <div>
              {!isClientView && (
                <div className="mb-6 pb-6 border-b border-neutral-300">
                  <button className="w-full bg-orange-500 hover:bg-orange-600 text-white font-black py-4 rounded-full transition-all flex items-center justify-center gap-2">
                    <Mail size={18} />
                    この案件に応募する
                  </button>
                </div>
              )}

              <div>
                <h2 className="font-bold text-neutral-900 mb-4">依頼者情報</h2>
                <div className="flex items-center gap-4 mb-4">
                  <img src={client.avatarUrl} alt="" className="w-14 h-14 rounded-full border border-neutral-100" />
                  <div>
                    <h3 className="font-bold text-neutral-900">{client.name}</h3>
                    <p className="text-sm text-neutral-500">{client.company}</p>
                  </div>
                </div>

                <div className="space-y-4 mb-8">
                  <div className="flex justify-between text-sm">
                    <span className="text-neutral-600">本人確認</span>
                    <span className="text-green-600 font-bold flex items-center gap-1">
                      <CheckCircle2 size={14} /> 完了
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-neutral-600">プロジェクト完了率</span>
                    <span className="text-neutral-900 font-bold">100%</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Links for Creators (only if not client view) */}
          {!isClientView && (
            <div className="mt-6 border-t border-neutral-300 mb-6 pt-6">
              <h2 className="font-bold text-neutral-900 mb-4 px-1">依頼を保存</h2>
              <div className="grid grid-cols-2 gap-2">
                <button className="bg-white flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl border border-neutral-200 text-sm font-bold text-neutral-600 hover:bg-neutral-50 transition-colors">
                  <Link2 size={16} /> リンクコピー
                </button>
                <button className="bg-white flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl border border-neutral-200 text-sm font-bold text-neutral-600 hover:bg-neutral-50 transition-colors">
                  <Heart size={16} /> 保存
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
