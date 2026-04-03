import {
  Globe,
  PenTool,
  Palette,
  Camera,
  Video,
  FileText,
  Music,
  Mic,
  Code,
  MoreHorizontal,
  LucideIcon,
} from 'lucide-react';

const CATEGORY_ICONS: Record<string, LucideIcon> = {
  'Webサイト': Globe,
  'イラスト': PenTool,
  'グラフィック': Palette,
  '写真': Camera,
  '動画': Video,
  'ライティング・編集': FileText,
  '音楽・サウンド': Music,
  '声・パフォーマンス': Mic,
  'エンジニアリング': Code,
  'その他': MoreHorizontal,
};

interface CategoryBadgeProps {
  name: string;
  /** アイコン・テキストサイズ（デフォルト: "sm"） */
  size?: 'xs' | 'sm';
}

export default function CategoryBadge({ name, size = 'sm' }: CategoryBadgeProps) {
  const Icon = CATEGORY_ICONS[name];
  const textSize = size === 'xs' ? 'text-xs' : 'text-sm';
  const iconSize = size === 'xs' ? 12 : 14;

  return (
    <span className={`inline-flex items-center gap-1 bg-orange-50 text-orange-500 px-3 py-1 rounded-full border border-orange-200 ${textSize} font-bold`}>
      {Icon && <Icon size={iconSize} />}
      {name}
    </span>
  );
}

export { CATEGORY_ICONS };
