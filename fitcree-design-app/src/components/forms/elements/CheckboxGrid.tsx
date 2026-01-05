import React from 'react';

// --- 選択：チェックボックスグリッド（カラム数可変） ---
export const CheckboxGrid = ({ options, selectedValues = [], onChange, cols = 3 }: any) => (
  <div className={`grid gap-2 ${cols === 4 ? 'grid-cols-2 sm:grid-cols-4' : 'grid-cols-2 sm:grid-cols-3'}`}>
    {options.map((opt: string) => (
      <label key={opt} className={`flex items-center p-3 rounded-lg border cursor-pointer transition-all ${selectedValues.includes(opt) ? 'bg-blue-50 border-blue-500 ring-1 ring-blue-500' : 'bg-white hover:bg-neutral-50'}`}>
        <input 
          type="checkbox" checked={selectedValues.includes(opt)}
          onChange={() => {
            const next = selectedValues.includes(opt) ? selectedValues.filter((v:any) => v !== opt) : [...selectedValues, opt];
            onChange(next);
          }}
          className="w-4 h-4 text-blue-500 rounded border-neutral-300 focus:ring-blue-500 mr-2"
        />
        <span className="text-sm text-neutral-800 font-medium">{opt}</span>
      </label>
    ))}
  </div>
);
