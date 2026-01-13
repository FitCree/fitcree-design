import React from 'react';

// --- 入力：テキストエリア ---
export const TextArea = ({ value, onChange, placeholder, rows = 5 }: any) => (
  <textarea 
    rows={rows} value={value || ''} onChange={(e) => onChange(e.target.value)} placeholder={placeholder}
    className="w-full p-4 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-sm leading-relaxed"
  />
);
