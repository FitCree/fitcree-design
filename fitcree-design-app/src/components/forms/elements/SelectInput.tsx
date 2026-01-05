import React from 'react';

// --- 選択：セレクトボックス ---
export const SelectInput = ({ value, onChange, options = [], placeholder }: any) => (
  <select
    value={value || ''}
    onChange={(e) => onChange(e.target.value)}
    className="w-full p-3 border border-neutral-300 rounded-lg bg-white text-sm focus:ring-2 focus:ring-blue-500"
  >
    <option value="">{placeholder || '選択してください'}</option>
    {options.map((opt: string) => (
      <option key={opt} value={opt}>{opt}</option>
    ))}
  </select>
);


