import React from 'react';
import * as LucideIcons from 'lucide-react';

interface DeadlineOption {
  id: string;
  label: string;
  icon: keyof typeof LucideIcons;
}

interface ConditionalDateInputProps {
  typeValue: string;
  onTypeChange: (type: string) => void;
  dateValue?: string;
  onDateChange: (date: string) => void;
  helpText?: string;
  options: DeadlineOption[];
  defaultType?: string;
  dateInputId?: string; // 日付入力を表示する選択肢のID
}

// --- 入力：条件付き日付入力（希望納期） ---
export const ConditionalDateInput = ({
  typeValue,
  onTypeChange,
  dateValue = '',
  onDateChange,
  helpText,
  options,
  defaultType,
  dateInputId
}: ConditionalDateInputProps) => {
  // 日付入力を表示する選択肢のID（指定がない場合は最初の選択肢）
  const targetDateInputId = dateInputId || options[0]?.id;

  return (
    <div>
      {/* ラジオボタン選択 */}
      <div className="flex flex-col sm:flex-row gap-3 mb-4">
        {options.map((option) => {
          const IconComponent = LucideIcons[option.icon] as React.ComponentType<{ className?: string; size?: number }>;
          const isSelected = typeValue === option.id;
          
          return (
            <label 
              key={option.id}
              className={`flex-1 px-4 py-6 border rounded-lg cursor-pointer text-center transition-all ${
                isSelected
                  ? 'bg-blue-50 border-blue-500 ring-1 ring-blue-500' 
                  : 'bg-white border-neutral-300 hover:bg-neutral-50'
              }`}
            >
              <input 
                type="radio" 
                name="deadlineType" 
                value={option.id} 
                checked={isSelected} 
                onChange={() => onTypeChange(option.id)} 
                className="hidden"
              />
              {IconComponent && <IconComponent className="mx-auto mb-2 text-blue-600" size={24} />}
              <span className="font-bold text-sm block text-neutral-800">{option.label}</span>
            </label>
          );
        })}
      </div>
      
      {/* 日付入力（指定された選択肢が選択された場合のみ表示） */}
      {typeValue === targetDateInputId && (
        <div className="transition-all duration-300 ease-in-out">
          <input 
            type="date" 
            className="w-full sm:w-1/2 p-3 text-base text-neutral-800 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            value={dateValue}
            onChange={(e) => onDateChange(e.target.value)}
          />
          {helpText && (
            <p className="text-sm text-neutral-600 mt-2">{helpText}</p>
          )}
        </div>
      )}
    </div>
  );
};
