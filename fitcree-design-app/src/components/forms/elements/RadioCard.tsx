import React from 'react';
import { getFormTheme } from './form-theme';
import { CheckCircle2 } from 'lucide-react';

// --- 選択：ラジオカード（アイコン付き） ---
export const RadioCard = ({ options, selectedValue, onChange, variant = 'client' }: any) => {
  const theme = getFormTheme(variant);
  return (
    <ul className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      {options.map((opt: any) => (
        <li
          key={opt.id} onClick={() => onChange(opt.id)}
          className={`relative p-4 rounded-xl border-2 cursor-pointer transition-all flex flex-col ${selectedValue === opt.id ? `${theme.border} ${theme.bgSelected}` : `border-neutral-300 bg-white ${theme.borderHover}`}`}
        >
          <div className="text-3xl mb-3">{opt.icon}</div>
          <p className="font-bold text-sm text-neutral-800 mb-1">{opt.label}</p>
          <p className="text-sm text-neutral-500 leading-snug">{opt.desc}</p>
          {opt.recommend && (
            <div className="mt-2 pt-2 border-t border-neutral-200">
              <p className="text-xs text-indigo-500 font-bold mb-1">こんな時におすすめ</p>
              <p className="text-xs text-neutral-600 leading-tight">{opt.recommend}</p>
            </div>
          )}
          {selectedValue === opt.id && <CheckCircle2 size={18} className={`absolute top-3 right-3 ${theme.accent}`} />}
        </li>
      ))}
    </ul>
  );
};

