import React from 'react';

// --- 選択：標準ラジオボタン（リスト形式） ---
export const RadioList = ({ options, name, selectedValue, onChange, cols }: any) => {
  // 文字列配列とオブジェクト配列の両方に対応
  const normalizedOptions = options.map((opt: any) => 
    typeof opt === 'string' ? { id: opt, label: opt } : opt
  );

  // カラム数の指定に応じてレイアウトを変更
  const getGridClass = () => {
    if (!cols || cols === 1) {
      return 'space-y-2'; // 1カラム（縦並び）
    } else if (cols === 2) {
      return 'grid grid-cols-1 sm:grid-cols-2 gap-2';
    } else if (cols === 3) {
      return 'grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2';
    }
    return 'space-y-2'; // デフォルトは1カラム
  };

  return (
    <ul className={getGridClass()}>
      {normalizedOptions.map((opt: any) => (
        <li key={opt.id}>
          <label className={`flex items-center p-3 border rounded-lg cursor-pointer hover:bg-neutral-50 ${selectedValue === opt.id ? 'bg-blue-50 border-blue-300' : 'bg-white border-neutral-300'}`}>
            <input 
              type="radio" name={name} checked={selectedValue === opt.id} onChange={() => onChange(opt.id)}
              className="w-4 h-4 text-blue-500 focus:ring-blue-500 mr-3"
            />
            <div>
              <span className="text-sm font-medium text-neutral-800">{opt.label}</span>
              {opt.sub && <span className="text-xs text-neutral-500 ml-2">({opt.sub})</span>}
            </div>
          </label>
        </li>
      ))}
    </ul>
  );
};

