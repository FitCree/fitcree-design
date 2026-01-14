import React from 'react';

// --- 選択：セレクトボックス ---
export const SelectInput = ({ value, onChange, options = [], placeholder }: any) => (
  <select
    value={value || ''}
    onChange={(e) => onChange(e.target.value)}
    className={`w-full p-3 border border-neutral-300 rounded-lg bg-white text-base focus:ring-2 focus:ring-blue-500 ${value ? 'text-neutral-800 font-medium' : 'text-neutral-600'}`}
  >
    <option value="">{placeholder || '選択'}</option>
    {options.map((opt: string) => (
      <option key={opt} value={opt}>{opt}</option>
    ))}
  </select>
);


