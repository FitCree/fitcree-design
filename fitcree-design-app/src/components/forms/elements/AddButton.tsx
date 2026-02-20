import React from 'react';
import { Plus } from 'lucide-react';
import { getFormTheme } from './form-theme';

interface AddButtonProps {
  label: string;
  onClick: () => void;
  variant?: 'client' | 'creator';
  className?: string;
  iconSize?: number;
}

/**
 * リンク形式の「追加」ボタンコンポーネント
 * テキストとプラスアイコンを組み合わせた汎用的なデザイン
 */
export const AddButton = ({
  label,
  onClick,
  variant = 'client',
  className = '',
  iconSize = 18
}: AddButtonProps) => {
  const theme = getFormTheme(variant);
  const isCreator = variant === 'creator';

  return (
    <button
      onClick={onClick}
      type="button"
      className={`w-full py-4 flex items-center justify-center gap-2 rounded-xl border-1 border transition-all hover:bg-white bg-opacity-50 ${isCreator
        ? 'border-orange-200 text-orange-600 hover:border-orange-400'
        : 'border-blue-200 text-blue-600 hover:border-blue-400'
        } ${className}`}
    >
      <Plus size={iconSize} />
      <span className="text-sm font-bold">{label}</span>
    </button>
  );
};
