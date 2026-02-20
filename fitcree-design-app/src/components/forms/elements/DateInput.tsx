import { getFormTheme } from './form-theme';

// --- 入力：日付 ---
export const DateInput = ({ value, onChange, variant = 'client' }: any) => {
  const theme = getFormTheme(variant);
  return (
    <input
      type="date"
      value={value || ''}
      onChange={(e) => onChange(e.target.value)}
      className={`w-full p-3 border border-neutral-300 rounded-lg text-base focus:ring-2 ${theme.ring}`}
    />
  );
};


