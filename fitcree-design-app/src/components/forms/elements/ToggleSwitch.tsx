import React from 'react';

// --- 切替：トグルスイッチ ---
export const ToggleSwitch = ({ checked = false, onChange, desc }: any) => (
  <label className="flex items-center gap-3 cursor-pointer select-none">
    <div className="relative inline-flex items-center">
      <input
        type="checkbox"
        className="sr-only peer"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
      />
      <div className="w-11 h-6 bg-neutral-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-blue-300 rounded-full peer peer-checked:bg-blue-500 transition-colors" />
      <div className={`absolute left-1 top-1 w-4 h-4 bg-white rounded-full shadow transition-transform ${checked ? 'translate-x-5' : ''}`} />
    </div>
    {desc && <span className="text-sm text-neutral-600">{desc}</span>}
  </label>
);


