import React from 'react';

// --- 入力：テキスト ---
export const TextInput = ({ value, onChange, placeholder, maxLength }: any) => (
  <div className="w-full">
    <input 
      type="text" value={value || ''} onChange={(e) => onChange(e.target.value)} placeholder={placeholder}
      className="w-full bg-white p-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-sm transition-all"
    />
    {maxLength && <div className="text-right text-xs text-neutral-600 mt-1">{value?.length || 0}/{maxLength}文字</div>}
  </div>
);

