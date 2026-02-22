"use client";

import React, { useState, useMemo } from 'react';
import {
  Plus,
  Trash2,
  X,
  ChevronRight,
  Search,
  Settings2,
  Link as LinkIcon,
  Globe,
  User,
  Settings,
  Briefcase,
} from 'lucide-react';
import Link from 'next/link';
import { SKILL_CATEGORIES, SKILL_MASTER, SKILL_LEVEL_LABELS } from '@/data/master-data';
import { TipsBox } from '@/components/forms/elements/TipsBox';

export default function CreatorSkillsPage() {
  // --- 状態管理 ---
  const [skills, setSkills] = useState([
    {
      id: 1,
      name: 'Adobe Illustrator',
      category: 'Design',
      level: 3,
      works: { internal: 3, external: 7, personal: 2 }
    },
    {
      id: 2,
      name: 'Figma',
      category: 'Design',
      level: 2,
      works: { internal: 0, external: 1, personal: 3 }
    },
    {
      id: 3,
      name: 'React',
      category: 'Development',
      level: 1,
      works: { internal: 0, external: 0, personal: 1 }
    },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingSkill, setEditingSkill] = useState<any>(null);
  const [activeTab, setActiveTab] = useState('all');

  const [formData, setFormData] = useState({
    name: '',
    category: 'Design',
    level: 2
  });

  const getTotalWorks = (works: any) => works.internal + works.external + works.personal;

  // --- ハンドラー ---
  const openAddModal = () => {
    setEditingSkill(null);
    setFormData({ name: '', category: 'Design', level: 2 });
    setIsModalOpen(true);
  };

  const openEditModal = (skill: any) => {
    setEditingSkill(skill);
    setFormData({ name: skill.name, category: skill.category, level: skill.level });
    setIsModalOpen(true);
  };

  const handleSelectSuggest = (suggest: any) => {
    setFormData({
      ...formData,
      name: suggest.name,
      category: suggest.cat // カテゴリーを自動セット
    });
  };

  const handleSaveSkill = () => {
    if (!formData.name) return;
    if (editingSkill) {
      setSkills(skills.map(s => s.id === editingSkill.id ? { ...s, ...formData } : s));
    } else {
      setSkills([{ id: Date.now(), ...formData, works: { internal: 0, external: 0, personal: 0 } }, ...skills]);
    }
    setIsModalOpen(false);
  };

  const deleteSkill = (id: number) => {
    setSkills(skills.filter(s => s.id !== id));
    setIsModalOpen(false);
  };

  const filteredSkills = useMemo(() => {
    if (activeTab === 'all') return skills;
    return skills.filter(s => s.category === activeTab);
  }, [skills, activeTab]);

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 pb-16 text-neutral-900">
      <div className="mb-8">
        <h1 className="text-2xl font-bold flex items-center gap-2 text-neutral-800 tracking-tight border-b-2 border-orange-500 pb-2 inline-flex">
          <Settings2 className="text-orange-500" strokeWidth={3} />
          プロフィール編集
        </h1>
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        {/* サイドナビゲーション */}
        <aside className="w-[20%] flex-shrink-0">
          <nav className="flex flex-col space-y-1">
            <Link
              href="/creator/profile"
              className="px-4 py-3 text-sm text-neutral-600 hover:bg-neutral-100 transition-colors"
            >
              基本情報
            </Link>
            <Link
              href="/creator/profile/skills"
              className="px-4 py-3 text-sm font-bold bg-orange-50 text-orange-600 border-l-4 border-orange-500"
            >
              スキル・ツール
            </Link>
            <Link
              href="#"
              className="px-4 py-3 text-sm text-neutral-600 hover:bg-neutral-100 transition-colors"
            >
              ポートフォリオ管理
            </Link>
          </nav>
        </aside>

        {/* メインコンテンツ */}
        <main className="w-[80%] bg-white rounded-xl border border-neutral-200 p-6 md:p-8">

          <header className=" mb-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <h2 className="text-xl font-bold text-neutral-800">スキル・ツールの登録</h2>
            </div>
            <button
              onClick={openAddModal}
              className="px-6 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-lg font-bold flex items-center justify-center gap-2 transition-colors active:scale-95"
            >
              <Plus className="w-5 h-5" strokeWidth={3} />
              スキルを追加
            </button>
          </header>
          <TipsBox title="登録のポイント" content="道具を登録し、実績と紐づけましょう。カテゴリーは自動判定されます。" />


          {/* カテゴリタブ */}
          <div className="w-full flex items-center gap-2 mb-8 overflow-x-auto pb-4 scrollbar-hide">
            {(() => {
              const activeCategories = new Set(skills.map(s => s.category));
              return SKILL_CATEGORIES.filter(cat => cat.id === 'all' || activeCategories.has(cat.id)).map(cat => {
                const Icon = cat.icon;
                return (
                  <button
                    key={cat.id}
                    onClick={() => setActiveTab(cat.id)}
                    className={`whitespace-nowrap px-4 py-2 rounded-lg text-sm font-bold transition-colors flex items-center gap-2 ${activeTab === cat.id
                      ? 'bg-slate-700  text-white'
                      : 'bg-white text-neutral-500 border border-neutral-200 hover:border-neutral-300'
                      }`}
                  >
                    <Icon size={16} />
                    {cat.label}
                  </button>
                );
              });
            })()}
          </div>

          {/* スキルリスト */}
          <div className="grid grid-cols-1 gap-4">
            {filteredSkills.length > 0 ? (
              filteredSkills.map(skill => {
                const total = getTotalWorks(skill.works);
                const categoryLabel = SKILL_CATEGORIES.find(c => c.id === skill.category)?.label || skill.category;
                const levelInfo = SKILL_LEVEL_LABELS[skill.level];
                return (
                  <div
                    key={skill.id}
                    onClick={() => openEditModal(skill)}
                    className="group bg-white rounded-lg border border-neutral-200 p-6 hover:border-orange-300 transition-colors cursor-pointer relative overflow-hidden"
                  >
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
                      <div className="flex-1">
                        <div className="flex gap-4 mb-4">
                          <div className="flex flex-col">
                            <span className="text-xs font-bold text-neutral-500 tracking-widest mb-0.5">{categoryLabel}</span>
                            <h3 className="text-xl font-bold text-neutral-800 tracking-tight leading-none">{skill.name}</h3>
                          </div>
                          {/* SKILL_LEVEL_LABELS */}
                          <span className={`px-2 py-1 rounded text-xs font-bold border h-fit ${levelInfo.color}`}>
                            {levelInfo.label.split('（')[0]}
                          </span>
                        </div>

                        <div className="flex flex-wrap gap-8 items-center">
                          <div className="flex flex-col">
                            <span className="text-xs font-bold text-neutral-400 uppercase tracking-widest">Total Works</span>
                            <div className="flex items-center gap-1.5 mt-0.5">
                              <span className={`text-2xl font-bold ${total > 0 ? 'text-neutral-900' : 'text-neutral-300'}`}>
                                {total.toString().padStart(2, '0')}
                              </span>
                            </div>
                          </div>

                          <div className="w-px h-10 bg-neutral-200 hidden md:block" />

                          <div className="flex-1 min-w-[200px]">
                            <span className="text-xs font-bold text-neutral-400 uppercase tracking-widest mb-2 block">作品内訳</span>
                            <div className="flex gap-4">
                              <div className="flex items-center gap-1">
                                <Briefcase size={14} className={skill.works.internal > 0 ? "text-orange-300" : "text-neutral-300"} />
                                <span className="text-xs font-bold text-neutral-400 uppercase tracking-widest">内部</span>
                                <span className="text-sm font-bold text-neutral-600">{skill.works.internal}</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <Globe size={14} className={skill.works.external > 0 ? "text-blue-300" : "text-neutral-300"} />
                                <span className="text-xs font-bold text-neutral-400 uppercase tracking-widest">外部</span>
                                <span className="text-sm font-bold text-neutral-600">{skill.works.external}</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <User size={14} className={skill.works.personal > 0 ? "text-green-300" : "text-neutral-300"} />
                                <span className="text-xs font-bold text-neutral-400 uppercase tracking-widest">個人</span>
                                <span className="text-sm font-bold text-neutral-600">{skill.works.personal}</span>
                              </div>
                            </div>
                            <div className="w-full h-1.5 bg-neutral-100 rounded-full mt-2 flex overflow-hidden">
                              <div style={{ width: `${total ? (skill.works.internal / total) * 100 : 0}%` }} className="bg-orange-400 h-full transition-all" />
                              <div style={{ width: `${total ? (skill.works.external / total) * 100 : 0}%` }} className="bg-blue-400 h-full transition-all" />
                              <div style={{ width: `${total ? (skill.works.personal / total) * 100 : 0}%` }} className="bg-green-400 h-full transition-all" />
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="text-neutral-400">
                        <Settings size={14} strokeWidth={3} />
                      </div>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="text-center py-16 bg-white rounded-lg border-2 border-dashed border-neutral-300">
                <p className="text-neutral-500 font-bold">まだこのカテゴリにスキルはありません。</p>
              </div>
            )}
          </div>

          {/* 編集・追加モーダル */}
          {isModalOpen && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
              <div className="absolute inset-0 bg-neutral-900/40 backdrop-blur-sm" onClick={() => setIsModalOpen(false)} />
              <div className="relative bg-white w-full max-w-xl rounded-lg shadow-lg overflow-hidden animate-in fade-in zoom-in duration-200">
                <div className="p-6 border-b border-neutral-200 flex items-center justify-between bg-slate-100/50">
                  <div>
                    <h2 className="text-xl font-bold text-neutral-800">
                      {editingSkill ? 'スキルの編集' : 'スキルの追加'}
                    </h2>
                    <p className="text-xs text-neutral-500 font-medium mt-1">マスターから選ぶとカテゴリーが自動適用されます</p>
                  </div>
                  <button onClick={() => setIsModalOpen(false)} className="p-2 hover:bg-neutral-200 rounded-full transition-colors">
                    <X className="w-5 h-5 text-neutral-500" />
                  </button>
                </div>

                <div className="p-6 space-y-6 max-h-[70vh] overflow-y-auto">
                  {/* スキル名入力 & サジェスト */}
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-neutral-500 uppercase tracking-widest ml-1">Skill Name</label>
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400 w-5 h-5" />
                      <input
                        type="text"
                        placeholder="例: Adobe Illustrator"
                        className="w-full pl-10 pr-4 py-3 bg-slate-100 border border-neutral-200 rounded-lg focus:bg-white focus:border-orange-500 focus:ring-2 focus:ring-orange-200 outline-none transition-all font-semibold"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      />
                    </div>
                    {/* 自動判定されたカテゴリーの表示 */}
                    <div className="flex items-center gap-2 mt-2 ml-1">
                      <span className="text-xs font-bold text-neutral-400 uppercase tracking-widest">Auto-Category:</span>
                      <span className="px-2 py-0.5 bg-neutral-800 text-white text-xs font-bold rounded uppercase">
                        {SKILL_CATEGORIES.find(c => c.id === formData.category)?.label || 'Other'}
                      </span>
                    </div>

                    {!editingSkill && formData.name && (
                      <div className="space-y-2 mt-4">
                        <span className="text-xs font-bold text-neutral-400 uppercase tracking-widest">マスターから選択</span>
                        <div className="flex flex-wrap gap-2">
                          {SKILL_MASTER
                            .filter(s => s.name.toLowerCase().includes(formData.name.toLowerCase()))
                            .map(s => (
                              <button
                                key={s.name}
                                onClick={() => handleSelectSuggest(s)}
                                className="px-3 py-1.5 bg-white border border-neutral-200 rounded-lg text-sm font-bold text-orange-600 hover:border-orange-500 hover:bg-orange-50 transition-colors flex items-center gap-2"
                              >
                                {s.name}
                                <span className="px-1.5 py-0.5 bg-slate-100 text-xs text-neutral-500 rounded uppercase">{s.cat}</span>
                              </button>
                            ))
                          }
                        </div>
                      </div>
                    )}
                  </div>

                  {/* 熟練度 */}
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-neutral-500 uppercase tracking-widest ml-1">Proficiency</label>
                    <div className="grid grid-cols-1 gap-2">
                      {[3, 2, 1].map((lv) => (
                        <button
                          key={lv}
                          onClick={() => setFormData({ ...formData, level: lv })}
                          className={`p-3 rounded-lg border-2 text-left transition-colors flex items-start gap-4 ${formData.level === lv ? 'border-orange-500 bg-orange-50/50' : 'border-neutral-200 hover:border-neutral-300 bg-white'
                            }`}
                        >
                          <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 mt-0.5 ${formData.level === lv ? 'border-orange-500 bg-orange-500' : 'border-neutral-300'
                            }`}>
                            {formData.level === lv && <div className="w-2 h-2 bg-white rounded-full" />}
                          </div>
                          <div>
                            <div className="font-bold text-neutral-800 text-sm">{SKILL_LEVEL_LABELS[lv].label}</div>
                            <div className="text-xs text-neutral-500 mt-0.5">{SKILL_LEVEL_LABELS[lv].desc}</div>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>

                  {editingSkill && (
                    <div className="p-4 bg-slate-100 rounded-lg space-y-3 border border-neutral-200">
                      <label className="text-xs font-bold text-neutral-500 uppercase tracking-widest block">Work Experience Details</label>
                      <div className="grid grid-cols-3 gap-3">
                        <div className="bg-white p-3 rounded-lg border border-neutral-200 text-center">
                          <div className="text-xs font-bold text-neutral-400 mb-1 flex items-center justify-center gap-1"><Briefcase size={12} /> FitCree内実績</div>
                          <div className="text-lg font-bold text-orange-600">{editingSkill.works.internal}</div>
                        </div>
                        <div className="bg-white p-3 rounded-lg border border-neutral-200 text-center">
                          <div className="text-xs font-bold text-neutral-400 mb-1 flex items-center justify-center gap-1"><Globe size={12} /> 外部実績</div>
                          <div className="text-lg font-bold text-blue-600">{editingSkill.works.external}</div>
                        </div>
                        <div className="bg-white p-3 rounded-lg border border-neutral-200 text-center">
                          <div className="text-xs font-bold text-neutral-400 mb-1 flex items-center justify-center gap-1"><User size={12} /> 自主制作</div>
                          <div className="text-lg font-bold text-green-600">{editingSkill.works.personal}</div>
                        </div>
                      </div>
                      <button className="w-full py-2 bg-white border border-neutral-300 text-neutral-700 rounded-lg text-sm font-bold hover:bg-neutral-50 flex items-center justify-center gap-2 transition-colors">
                        <LinkIcon size={14} /> 作品一覧で紐づけを確認
                      </button>
                    </div>
                  )}
                </div>

                <div className="p-4 border-t border-neutral-200 flex flex-col md:flex-row gap-3 bg-slate-50">
                  {editingSkill && (
                    <button onClick={() => deleteSkill(editingSkill.id)} className="order-3 md:order-1 px-4 py-2 text-red-600 font-bold hover:bg-red-50 rounded-lg transition-colors flex items-center justify-center gap-2 border border-transparent hover:border-red-200">
                      <Trash2 size={16} /> スキルを削除
                    </button>
                  )}
                  <div className="flex-1 order-2 flex justify-end gap-3">
                    <button onClick={() => setIsModalOpen(false)} className="px-6 py-2 bg-white border border-neutral-300 text-neutral-600 font-bold rounded-lg hover:bg-neutral-50 transition-colors">
                      キャンセル
                    </button>
                    <button onClick={handleSaveSkill} className="px-6 py-2 bg-orange-500 text-white font-bold rounded-lg hover:bg-orange-600 transition-colors" disabled={!formData.name}>
                      保存する
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
