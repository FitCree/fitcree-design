import React from 'react';
import { getFormTheme } from './form-theme';
import { AlertCircle } from 'lucide-react';

// --- 共通：フォームセクション枠 ---
export const FormSection = ({ label, required, children, helpText, examples, description, variant = 'client' }: any) => {
  const theme = getFormTheme(variant);
  return (
    <section className="mt-10 first:mt-0">
      <div className="flex items-center gap-2 mb-2">
        <label className="text-base font-bold text-neutral-800">
          {label}
        </label>
        {required && (
          <span className={`border border-red-700 text-red-700 bg-red-50 text-xs font-bold px-2 py-0.5 rounded-full`}>必須</span>
        )}
      </div>
      {description && (
        <p className="text-sm text-neutral-600 mb-2 whitespace-pre-line">{description}</p>
      )}
      {children}
      {examples && examples.length > 0 && (
        <div className="mt-2">
          <p className="text-xs text-neutral-700 mb-1">記入例</p>
          <ul className="text-sm text-neutral-600 space-y-1 list-disc list-outside ml-4">
            {examples.map((example: string, index: number) => (
              <li key={index}>
                {example}
              </li>
            ))}
          </ul>
        </div>
      )}
      {helpText && (
        <p className="text-xs text-neutral-600 mt-2 flex items-center gap-1">
          <AlertCircle size={12} /> {helpText}
        </p>
      )}
    </section>
  );
};
