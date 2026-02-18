'use client';

import React from 'react';
import { JOB_POST_STEPS } from '@/data/job-post-spec';
import { USAGE_PURPOSES } from '@/data/master-data';

export default function JobPostSpecPage() {
  const renderOptions = (field: any) => {
    if (field.type === 'checkbox-grid' && field.dependsOn === 'category') {
      return (
        <div className="space-y-2">
          <p className="text-sm text-gray-900">※「依頼分野」の選択によって変化</p>
          {Object.entries(field.categoryBasedOptions || USAGE_PURPOSES).map(([key, values]: [string, any]) => (
            <div key={key} className="border-l-2 border-gray-200 pl-2">
              <span className="text-gray-900 font-bold text-sm block mb-1">{key}</span>
              <div className="flex flex-wrap gap-1">
                {Array.isArray(values) && values.map((v: string) => (
                  <span key={v} className="inline-block px-2 py-0.5 bg-gray-100 text-gray-800 rounded text-sm border border-gray-200">
                    {v}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      );
    }

    if (field.options) {
      if (Array.isArray(field.options)) {
        return (
          <div className="flex flex-wrap gap-1">
            {field.options.map((opt: any, idx: number) => {
              const label = typeof opt === 'string' ? opt : (opt.label || opt.title || opt.id);
              const desc = typeof opt === 'object' ? (opt.desc || opt.description) : undefined;
              return (
                <span key={idx} className="inline-block px-2 py-0.5 bg-gray-100 text-gray-800 rounded text-sm border border-gray-200" title={desc}>
                  {label}
                </span>
              );
            })}
          </div>
        );
      }
    }

    if (field.type === 'conditional-date') {
      return (
        <div className="flex flex-wrap gap-1">
          {field.options?.map((opt: any) => (
            <span key={opt.id} className="inline-block px-2 py-0.5 bg-gray-100 text-gray-700 rounded text-sm border border-gray-200">
              {opt.label}
            </span>
          ))}
        </div>
      )
    }

    return <span className="text-gray-400 text-sm">-</span>;
  };

  return (
    <div className="min-h-screen bg-white p-12">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-gray-900 text-3xl font-bold mb-2">案件投稿フォーム 仕様書</h1>
        <p className="text-gray-900 mb-8 text-base">
          src/app/client/post-job/page.tsx で使用されているフォーム定義（src/data/job-post-spec.ts）を表示しています。
        </p>
        <div className="space-y-12">
          {JOB_POST_STEPS.map((step) => (
            <section key={step.id} className="border rounded-lg overflow-hidden">
              <div className="bg-gray-100 px-6 py-4 border-b">
                <h2 className="text-lg font-bold text-gray-900 flex flex-wrap items-center">
                  <span className="inline-block bg-blue-700 text-white text-sm px-2 py-1 rounded mr-2">STEP {step.id}</span>
                  {step.title}
                </h2>
                {step.tips && (
                  <p className="mt-2 text-base text-gray-900">
                    <span className="font-bold">TIPS テキスト :</span>
                    <span>{step.tips}</span>
                  </p>
                )}
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-sm text-left">
                  <thead className="bg-gray-50 text-gray-700 border-b">
                    <tr>
                      <th className="px-2 py-2 font-bold w-8">ID</th>
                      <th className="px-2 py-2 font-bold w-32">項目名 (Label)</th>
                      <th className="px-2 py-2 font-bold w-24">タイプ</th>
                      <th className="px-2 py-2 font-bold w-8">必須</th>
                      <th className="px-2 py-2 font-bold w-52">説明 / 補足</th>
                      <th className="px-2 py-2 font-bold w-52">選択肢 / 条件</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 [&_td]:align-top">
                    {step.fields.map((field: any) => (
                      <tr key={field.id}>
                        <td className="px-2 py-2 font-mono text-sm text-gray-900">{field.id}</td>
                        <td className="px-2 py-2 font-medium text-gray-900">{field.label}</td>
                        <td className="px-2 py-2">
                          <span className="inline-block px-2 py-1 rounded-full bg-blue-50 text-blue-800 text-sm border border-blue-100">
                            {field.type}
                          </span>
                        </td>
                        <td className="px-2 py-2 text-center">
                          {field.required ? (
                            <span className="inline-block w-2 h-2 rounded-full bg-red-500" title="必須" />
                          ) : (
                            <span className="inline-block w-2 h-2 rounded-full bg-gray-200" title="任意" />
                          )}
                        </td>
                        <td className="px-2 py-2 text-gray-900 text-sm">
                          {field.description && <div className="mb-1">{field.description}</div>}
                          {field.placeholder && (
                            <div className="text-gray-800">
                              <span className="font-bold text-sm uppercase mr-1 border border-gray-200 p-1 rounded">Placeholder</span>
                              {field.placeholder}
                            </div>
                          )}
                          {field.maxLength && (
                            <div className="text-gray-800 mt-1">
                              <span className="font-bold text-sm uppercase mr-1 border border-gray-200 p-1 rounded">Max</span>
                              {field.maxLength}文字
                            </div>
                          )}
                        </td>
                        <td className="px-2 py-2">
                          {renderOptions(field)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
          ))}
        </div>
      </div>
    </div>
  );
}
