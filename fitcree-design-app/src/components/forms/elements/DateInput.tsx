import React from 'react';

// --- 入力：日付 ---
export const DateInput = ({ value, onChange }: any) => (
  <input
    type="date"
    value={value || ''}
    onChange={(e) => onChange(e.target.value)}
    className="w-full p-3 border border-neutral-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500"
  />
);


