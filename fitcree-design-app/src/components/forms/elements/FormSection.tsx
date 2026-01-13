import React from 'react';
import { AlertCircle } from 'lucide-react';

// --- 共通：フォームセクション枠 ---
export const FormSection = ({ label, required, children, helpText, examples, description }: any) => (
  <section className="mt-10">
    <div className="flex items-center gap-2 mb-2">
      <label className="text-base font-bold text-neutral-800">
        {label}
      </label>
      {required && (
        <span className="border border-red-600 bg-white text-red-600 text-xs px-2 py-0.5 rounded-full">必須</span>
      )}
    </div>
    {description && (
      <p className="text-sm text-neutral-600 mb-2">{description}</p>
    )}
    {children}
    {examples && examples.length > 0 && (
      <ul className="text-sm text-neutral-600 mt-2 space-y-1 list-disc list-inside">
        {examples.map((example: string, index: number) => (
          <li key={index} className="pl-4 [text-indent:-1rem]">
            例 : {example}
          </li>
        ))}
      </ul>
    )}
    {helpText && (
      <p className="text-xs text-neutral-600 mt-2 flex items-center gap-1">
        <AlertCircle size={12} /> {helpText}
      </p>
    )}
  </section>
);

