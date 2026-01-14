import React from 'react';

interface ModeOption {
  id: 'consult' | 'specified';
  label: string;
}

interface ConditionalCheckboxGridProps {
  modeValue: 'consult' | 'specified';
  onModeChange: (mode: 'consult' | 'specified') => void;
  selectedValues?: string[];
  onValuesChange: (values: string[]) => void;
  options: string[];
  defaultMode?: 'consult' | 'specified';
  cols?: number;
  modeOptions?: ModeOption[];
  checkboxHelpText?: string;
}

// --- 選択：条件付きチェックボックスグリッド（2段階方式） ---
export const ConditionalCheckboxGrid = ({
  modeValue,
  onModeChange,
  selectedValues = [],
  onValuesChange,
  options,
  defaultMode = 'consult',
  cols = 3,
  modeOptions = [
    { id: 'consult' as const, label: '相談して決める (推奨)' },
    { id: 'specified' as const, label: '形式を指定する' }
  ],
  checkboxHelpText
}: ConditionalCheckboxGridProps) => {
  const gridClass = cols === 2 
    ? 'grid-cols-1 sm:grid-cols-2' 
    : cols === 4 
    ? 'grid-cols-2 sm:grid-cols-4' 
    : 'grid-cols-2 sm:grid-cols-3';

  const handleCheckboxChange = (format: string) => {
    const next = selectedValues.includes(format)
      ? selectedValues.filter((v) => v !== format)
      : [...selectedValues, format];
    onValuesChange(next);
  };

  return (
    <div>
      {/* Toggle Mode */}
      <div className="flex gap-4 mb-4">
        {modeOptions.map((modeOption) => (
          <label 
            key={modeOption.id}
            className={`flex-1 p-3 border rounded-lg cursor-pointer flex items-center transition-all ${
              modeValue === modeOption.id 
                ? 'bg-blue-50 border-blue-500 text-blue-700 ring-1 ring-blue-500' 
                : 'bg-white border-neutral-300 hover:bg-neutral-50 text-neutral-800'
            }`}
          >
            <input 
              type="radio" 
              name="deliveryFormatType" 
              value={modeOption.id}
              checked={modeValue === modeOption.id}
              onChange={() => onModeChange(modeOption.id)}
              className="mr-4 w-4 h-4 text-blue-600"
            />
            <span className="font-bold text-sm">{modeOption.label}</span>
          </label>
        ))}
      </div>

      {/* Detailed Checkboxes (Only visible when 'specified' is selected) */}
      {modeValue === 'specified' && (
        <div className="transition-all duration-300 ease-in-out">
          {checkboxHelpText && (
            <p className="text-sm text-neutral-600 mb-2">{checkboxHelpText}</p>
          )}
          <ul className={`grid gap-2 items-stretch ${gridClass}`}>
            {options.map((format) => {
              const isSelected = selectedValues.includes(format);
              return (
                <li key={format} className="h-full">
                  <label className={`flex h-full items-center p-3 rounded-lg border cursor-pointer transition-all ${isSelected ? 'bg-blue-50 border-blue-500 ring-1 ring-blue-500' : 'bg-white hover:bg-neutral-50'}`}>
                    <input 
                      type="checkbox" 
                      checked={isSelected}
                      onChange={() => handleCheckboxChange(format)}
                      className="w-5 h-5 text-blue-600 rounded focus:ring-blue-500 mr-3 flex-shrink-0"
                    />
                    <span className="text-sm text-neutral-800 font-medium">{format}</span>
                  </label>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
};
