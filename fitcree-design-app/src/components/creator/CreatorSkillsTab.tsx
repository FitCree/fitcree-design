"use client";

import { useState, useMemo } from 'react';
import { Pencil, Briefcase, Globe, User, Star } from 'lucide-react';
import ActionLinkButton from '@/components/common/ActionLinkButton';
import GuestLoginCTA from '@/components/guest/GuestLoginCTA';
import { SKILL_CATEGORIES, SKILL_LEVEL_LABELS } from '@/data/master-data';
import { ViewMode } from './CreatorProfileHeader';

// スキルデータ（編集ページと同期）
const SKILLS_DATA = [
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
    name: 'Adobe Photoshop',
    category: 'Design',
    level: 3,
    works: { internal: 2, external: 5, personal: 1 }
  },
  {
    id: 4,
    name: 'After Effects',
    category: 'Video & Audio',
    level: 2,
    works: { internal: 1, external: 3, personal: 0 }
  },
  {
    id: 5,
    name: 'React',
    category: 'Development',
    level: 1,
    works: { internal: 0, external: 0, personal: 1 }
  },
];

interface CreatorSkillsTabProps {
  viewMode?: ViewMode;
}

export default function CreatorSkillsTab({ viewMode = 'creator' }: CreatorSkillsTabProps) {
  const [activeCategory, setActiveCategory] = useState('all');

  const activeCategories = useMemo(() => new Set(SKILLS_DATA.map(s => s.category)), []);

  const filteredSkills = useMemo(() => {
    if (activeCategory === 'all') return SKILLS_DATA;
    return SKILLS_DATA.filter(s => s.category === activeCategory);
  }, [activeCategory]);

  // カテゴリ別にグルーピング
  const groupedSkills = useMemo(() => {
    if (activeCategory !== 'all') return null;
    const groups: Record<string, typeof SKILLS_DATA> = {};
    SKILLS_DATA.forEach(skill => {
      if (!groups[skill.category]) groups[skill.category] = [];
      groups[skill.category].push(skill);
    });
    return groups;
  }, [activeCategory]);

  const getTotalWorks = (works: { internal: number; external: number; personal: number }) =>
    works.internal + works.external + works.personal;

  return (
    <div className="max-w-2xl mx-auto space-y-8 py-6">

      {/* カテゴリフィルター + 編集ボタン */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-hide">
        {SKILL_CATEGORIES.filter(cat => cat.id === 'all' || activeCategories.has(cat.id)).map(cat => {
          const Icon = cat.icon;
          return (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`whitespace-nowrap px-3 py-1.5 rounded-full text-xs font-bold transition-colors flex items-center gap-1.5 ${
                activeCategory === cat.id
                  ? 'bg-neutral-800 text-white'
                  : 'bg-white text-neutral-500 border border-neutral-200 hover:border-neutral-300'
              }`}
            >
              <Icon size={12} />
              {cat.label}
            </button>
          );
        })}
        {viewMode === 'creator' && (
          <div className="ml-auto shrink-0">
            <ActionLinkButton href="/creator/profile/skills" label="スキルを編集" icon={Pencil} />
          </div>
        )}
      </div>

      {/* スキル一覧 */}
      <div className="relative">
        {viewMode === 'guest' && (
          <GuestLoginCTA message="スキル・ツールを見るにはログインが必要です" overlay />
        )}
      <div className={viewMode === 'guest' ? 'blur-sm select-none pointer-events-none' : ''}>
      {activeCategory === 'all' && groupedSkills ? (
        // カテゴリ別グルーピング表示
        <div className="space-y-8">
          {Object.entries(groupedSkills).map(([categoryId, skills]) => {
            const categoryInfo = SKILL_CATEGORIES.find(c => c.id === categoryId);
            const CategoryIcon = categoryInfo?.icon;
            return (
              <section key={categoryId}>
                {/* カテゴリ見出し */}
                <div className="flex items-center gap-2 mb-3">
                  <span className="flex items-center gap-1.5 px-2.5 py-1 bg-neutral-800 text-white text-xs font-bold rounded-full">
                    {CategoryIcon && <CategoryIcon size={12} />}
                    {categoryInfo?.label ?? categoryId}
                  </span>
                </div>

                <div className="space-y-2">
                  {skills.map(skill => (
                    <SkillRow key={skill.id} skill={skill} getTotalWorks={getTotalWorks} />
                  ))}
                </div>
              </section>
            );
          })}
        </div>
      ) : (
        // フィルター時: フラットリスト
        <div className="space-y-2">
          {filteredSkills.length > 0 ? (
            filteredSkills.map(skill => (
              <SkillRow key={skill.id} skill={skill} getTotalWorks={getTotalWorks} />
            ))
          ) : (
            <p className="text-center py-10 text-neutral-400 text-sm">
              このカテゴリのスキルはありません
            </p>
          )}
        </div>
      )}
      </div>
      </div>
    </div>
  );
}

function SkillRow({
  skill,
  getTotalWorks,
}: {
  skill: (typeof SKILLS_DATA)[number];
  getTotalWorks: (works: { internal: number; external: number; personal: number }) => number;
}) {
  const total = getTotalWorks(skill.works);
  const levelInfo = SKILL_LEVEL_LABELS[skill.level];

  return (
    <div className="flex items-center justify-between gap-4 bg-white border border-neutral-100 rounded-xl px-4 py-3.5">
      {/* 左: スキル名 + レベル */}
      <div className="flex items-center gap-3 min-w-0">
        {/* レベルインジケーター（星アイコン3つ） */}
        <div className="flex gap-0.5 shrink-0">
          {[1, 2, 3].map(i => (
            <Star
              key={i}
              size={12}
              className={
                i <= skill.level
                  ? skill.level === 3
                    ? 'text-orange-500 fill-orange-500'
                    : 'text-sky-400 fill-sky-400'
                  : 'text-neutral-200 fill-neutral-200'
              }
            />
          ))}
        </div>
        <span className={`hidden sm:inline-flex shrink-0 w-14 justify-center py-0.5 rounded text-xs font-bold border ${levelInfo.color}`}>
          {skill.level === 3 ? '得意' : skill.level === 2 ? '実務可' : '習得中'}
        </span>
        <span className="font-bold text-neutral-800 text-sm truncate">{skill.name}</span>
      </div>

      {/* 右: 実績数 */}
      <div className="flex items-center gap-3 shrink-0 text-xs font-bold text-neutral-400">
        {total > 0 ? (
          <>
            <span className="text-neutral-800 font-bold text-sm tabular-nums">
              {total}
              <span className="text-neutral-400 text-xs font-medium ml-0.5">件</span>
            </span>
            <div className="hidden sm:flex items-center gap-2">
              {skill.works.internal > 0 && (
                <span className="flex items-center gap-1 text-orange-500">
                  <Briefcase size={11} />
                  {skill.works.internal}
                </span>
              )}
              {skill.works.external > 0 && (
                <span className="flex items-center gap-1 text-blue-500">
                  <Globe size={11} />
                  {skill.works.external}
                </span>
              )}
              {skill.works.personal > 0 && (
                <span className="flex items-center gap-1 text-green-500">
                  <User size={11} />
                  {skill.works.personal}
                </span>
              )}
            </div>
          </>
        ) : (
          <span className="text-neutral-300 text-xs">実績なし</span>
        )}
      </div>
    </div>
  );
}
