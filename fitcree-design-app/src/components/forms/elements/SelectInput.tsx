import { getFormTheme } from './form-theme';

// --- 選択：セレクトボックス ---
export const SelectInput = ({ value, onChange, options = [], placeholder, variant = 'client' }: any) => {
  const theme = getFormTheme(variant);
  return (
    <select
      value={value || ''}
      onChange={(e) => onChange(e.target.value)}
      className={`w-full p-3 border border-neutral-300 rounded-lg bg-white text-base focus:ring-2 ${theme.ring} ${value ? 'text-neutral-800 font-medium' : 'text-neutral-600'}`}
    >
      <option value="">{placeholder || '選択'}</option>
      {options.map((opt: string) => (
        <option key={opt} value={opt}>{opt}</option>
      ))}
    </select>
  );
};


