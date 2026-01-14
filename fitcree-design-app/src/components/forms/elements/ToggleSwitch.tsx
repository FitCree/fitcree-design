import React from 'react';

interface ToggleSwitchProps {
  checked?: boolean;
  onChange: (checked: boolean) => void;
  desc?: string;
  title?: string;
  description?: string;
}

// --- 切替：トグルスイッチ ---
export const ToggleSwitch = ({ checked = false, onChange, desc, title, description }: ToggleSwitchProps) => {
  // タイトルと説明文がある場合は、リッチなUIを表示
  if (title || description) {
    return (
      <label className="flex items-center p-3 border rounded-lg hover:bg-neutral-50 cursor-pointer">
        <div className="relative inline-flex items-center mr-3 flex-shrink-0">
          <input
            type="checkbox"
            className="sr-only peer"
            checked={checked}
            onChange={(e) => onChange(e.target.checked)}
          />
          <div className="w-11 h-6 bg-neutral-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-indigo-500 rounded-full peer peer-checked:bg-indigo-600 transition-colors" />
          <div className={`absolute left-1 top-1 w-4 h-4 bg-white rounded-full shadow transition-transform ${checked ? 'translate-x-5' : ''}`} />
        </div>
        <div className="flex-1">
          {title && <span className="font-bold text-neutral-800 text-sm block">{title}</span>}
          {description && <span className="text-sm text-neutral-600 mt-0.5">{description}</span>}
        </div>
      </label>
    );
  }

  // 従来のシンプルなUI（後方互換性のため）
  return (
    <label className="flex items-center gap-3 cursor-pointer select-none">
      <div className="relative inline-flex items-center">
        <input
          type="checkbox"
          className="sr-only peer"
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
        />
        <div className="w-11 h-6 bg-neutral-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-blue-300 rounded-full peer peer-checked:bg-blue-500 transition-colors" />
        <div className={`absolute left-1 top-1 w-4 h-4 bg-white rounded-full shadow transition-transform ${checked ? 'translate-x-5' : ''}`} />
      </div>
      {desc && <span className="text-sm text-neutral-600">{desc}</span>}
    </label>
  );
};


