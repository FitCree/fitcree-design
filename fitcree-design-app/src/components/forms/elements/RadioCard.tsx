import React from 'react';
import { CheckCircle2 } from 'lucide-react';

// --- 選択：ラジオカード（アイコン付き） ---
export const RadioCard = ({ options, selectedValue, onChange }: any) => (
  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
    {options.map((opt: any) => (
      <div 
        key={opt.id} onClick={() => onChange(opt.id)}
        className={`relative p-4 rounded-xl border-2 cursor-pointer transition-all ${selectedValue === opt.id ? 'border-blue-500 bg-blue-50' : 'border-neutral-300 bg-white hover:border-blue-300'}`}
      >
        <div className="text-3xl mb-3">{opt.icon}</div>
        <h3 className="font-bold text-sm text-neutral-800 mb-1">{opt.label}</h3>
        {opt.subDesc && <p className="text-[10px] text-blue-600 font-bold mb-1">{opt.subDesc}</p>}
        <p className="text-[11px] text-neutral-500 leading-snug">{opt.desc}</p>
        {selectedValue === opt.id && <CheckCircle2 size={18} className="absolute top-3 right-3 text-blue-500" />}
      </div>
    ))}
  </div>
);

