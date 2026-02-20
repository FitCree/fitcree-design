import { getFormTheme } from './form-theme';

// --- 入力：テキストエリア ---
export const TextArea = ({ value, onChange, placeholder, rows = 10, maxLength, variant = 'client' }: any) => {
  const theme = getFormTheme(variant);
  return (
    <div className="w-full">
      <textarea
        rows={rows}
        value={value || ''}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        maxLength={maxLength}
        className={`w-full p-4 border border-neutral-300 rounded-lg outline-none text-base leading-relaxed text-neutral-800 placeholder:text-neutral-400 focus:ring-2 ${theme.ring}`}
      />
      {maxLength && (
        <div className="text-right text-xs text-neutral-600 mt-1">
          {value?.length || 0} / {maxLength}文字
        </div>
      )}
    </div>
  );
};
