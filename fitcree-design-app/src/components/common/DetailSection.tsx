import React from 'react';
import { LucideIcon } from 'lucide-react';

/**
 * DetailSection Component
 * 
 * 案件詳細や応募フォームなどで使用される共通のセクション枠コンポーネントです。
 * 
 * @example
 * // 基本的な使い方 (solidバリアント)
 * <DetailSection title="提案メッセージ" icon={MessageSquare}>
 *   <p>内容...</p>
 * </DetailSection>
 * 
 * @example
 * // ヘッダー右側にバッジやリンクを表示する場合 (RequestedBadgeの例)
 * <DetailSection 
 *   title="概算見積もり" 
 *   icon={CircleDollarSign}
 *   headerRight={<RequestedBadge />} // 右側に「要望あり」バッジを表示
 * >
 *   <p>内容...</p>
 * </DetailSection>
 * 
 * @example
 * // サイドバー向け (simpleバリアント)
 * <DetailSection title="現在の状況" icon={Clock} variant="simple">
 *   <p>内容...</p>
 * </DetailSection>
 */
interface DetailSectionProps {
  /** セクションのタイトル (文字列またはReactNode) */
  title: string | React.ReactNode;
  /** ヘッダーに表示するアイコン (Lucideアイコンコンポーネント) */
  icon?: LucideIcon;
  /** セクションの内容 */
  children: React.ReactNode;
  /** 
   * セクションのスタイルバリアント
   * - solid: ヘッダー部分(h2部分)にのみ背景色(slate-500)がある標準スタイル (基本はこれ)
   * - info: ヘッダー部分(h2部分)にのみ薄いグレー(neutral-100)のスタイル (案件概要用)
   * - dark: 背景が全体的に暗い(neutral-800)スタイル (ヘルプセクション用)
   * - simple: ヘッダー背景がなく、タイトルのみが強調されるスタイル (右カラムやサイドバー用)
   */
  variant?: 'solid' | 'simple' | 'dark' | 'info';
  /** セクション全体に追加するクラス名 */
  className?: string;
  /** ボディ部分に追加するクラス名 (デフォルト: p-6) */
  bodyClassName?: string;
  /** ヘッダーの右側に配置するカスタム要素 (BadgeやLinkなど) */
  headerRight?: React.ReactNode;
}

export const DetailSection: React.FC<DetailSectionProps> = ({
  title,
  icon: Icon,
  children,
  variant = 'solid',
  className = '',
  bodyClassName = 'p-6',
  headerRight,
}) => {
  if (variant === 'solid') {
    return (
      <section className={`bg-white border border-neutral-200 rounded-2xl overflow-hidden ${className}`}>
        <div className="bg-slate-500 p-4 text-white flex items-center justify-between">
          <div className="flex items-center gap-2">
            {Icon && <Icon size={18} />}
            <h2 className="font-bold">{title}</h2>
          </div>
          {headerRight}
        </div>
        <div className={bodyClassName}>
          {children}
        </div>
      </section>
    );
  }

  if (variant === 'info') {
    return (
      <section className={`bg-white border border-neutral-200 rounded-xl overflow-hidden ${className}`}>
        <div className="bg-neutral-100 border-b border-neutral-100 p-4 flex items-center justify-between">
          <div className="flex items-center gap-2 text-neutral-700">
            {Icon && <Icon size={20} className="text-neutral-400" />}
            <h2 className="font-bold">{title}</h2>
          </div>
          {headerRight}
        </div>
        <div className={bodyClassName}>
          {children}
        </div>
      </section>
    );
  }

  if (variant === 'dark') {
    return (
      <section className={`bg-neutral-800 text-white border border-neutral-700 rounded-2xl p-6 ${className}`}>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-sm font-bold text-neutral-500 flex items-center gap-2 text-white">
            {Icon && <Icon size={16} />}
            {title}
          </h2>
          {headerRight}
        </div>
        <div className={bodyClassName === 'p-6' ? '' : bodyClassName}>
          {children}
        </div>
      </section>
    );
  }

  // default variant: 'simple'
  return (
    <section className={`bg-white border border-neutral-200 rounded-2xl p-6 ${className}`}>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-sm font-bold text-neutral-700 flex items-center gap-2">
          {Icon && <Icon size={16} />}
          {title}
        </h2>
        {headerRight}
      </div>
      <div className={bodyClassName === 'p-6' ? '' : bodyClassName}>
        {children}
      </div>
    </section>
  );
};
