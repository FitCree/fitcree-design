import React from 'react';

// --- 選択：チェックボックスグリッド（カラム数可変） ---
export const CheckboxGrid = ({ options, selectedValues = [], onChange, cols = 3 }: any) => {
  const gridClass = cols === 2 
    ? 'grid-cols-1 sm:grid-cols-2' 
    : cols === 4 
    ? 'grid-cols-2 sm:grid-cols-4' 
    : 'grid-cols-2 sm:grid-cols-3';
  
  // オブジェクト形式の選択肢かどうかを判定
  const isObjectOptions = options.length > 0 && typeof options[0] === 'object' && options[0].id;
  
  return (
    <ul className={`grid gap-2 items-stretch ${gridClass}`}>
      {options.map((opt: any) => {
        const optId = typeof opt === 'string' ? opt : opt.id;
        const optTitle = typeof opt === 'string' ? opt : opt.title;
        const optDescription = typeof opt === 'object' ? opt.description : undefined;
        const isSelected = selectedValues.includes(optId);
        
        return (
          <li key={optId} className="h-full">
            <label className={`flex h-full items-center p-3 rounded-lg border cursor-pointer transition-all ${isSelected ? 'bg-blue-50 border-blue-500 ring-1 ring-blue-500' : 'bg-white hover:bg-neutral-50'}`}>
              <input 
                type="checkbox" 
                checked={isSelected}
                onChange={() => {
                  const next = isSelected ? selectedValues.filter((v: any) => v !== optId) : [...selectedValues, optId];
                  onChange(next);
                }}
                className="w-5 h-5 text-indigo-600 rounded focus:ring-indigo-500 mr-3 flex-shrink-0"
              />
              {optDescription ? (
                <div className="flex-1">
                  <span className="font-bold text-neutral-800 text-sm block">{optTitle}</span>
                  <span className="text-sm text-neutral-600 mt-1">{optDescription}</span>
                </div>
              ) : (
                <span className="text-sm text-neutral-800 font-medium">{optTitle}</span>
              )}
            </label>
          </li>
        );
      })}
    </ul>
  );
};
