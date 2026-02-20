import { getFormTheme } from './form-theme';

// --- 入力：テキスト ---
export const TextInput = ({ value, onChange, placeholder, maxLength, variant = 'client' }: any) => {
  const theme = getFormTheme(variant);
  return (
    <div className="w-full">
      <input
        type="text"
        value={value || ''}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className={`w-full bg-white p-3 border border-neutral-300 rounded-lg outline-none text-base text-neutral-800 transition-all focus:ring-2 ${theme.ring}`}
      />
      {maxLength && <div className="text-right text-xs text-neutral-600 mt-1">{value?.length || 0} / {maxLength}文字</div>}
    </div>
  );
};
