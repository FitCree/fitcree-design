import React from 'react';
import { HelpCircle } from 'lucide-react';

// --- ヒントボックス（画面上部用） ---
export const TipsBox = ({ title, content, variant = 'client' }: any) => {
  const isCreator = variant === 'creator';
  return (
    <div className={`${isCreator ? 'bg-orange-50 border-orange-200' : 'bg-sky-50 border-sky-200'} rounded-lg p-4 mb-8 flex items-start gap-3 border`}>
      <div className={`${isCreator ? 'text-orange-500' : 'text-sky-500'} mt-0.5`}><HelpCircle size={18} /></div>
      <div>
        <p className="font-bold text-neutral-800 text-sm mb-1">{title}</p>
        <p className="text-neutral-800 text-sm leading-relaxed">{content}</p>
      </div>
    </div>
  );
};

