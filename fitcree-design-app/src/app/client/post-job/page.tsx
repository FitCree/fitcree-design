'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { JOB_POST_STEPS } from '../../../../docs/specs/job-post-spec';
import * as UI from '../../../components/forms/FormElements';
import { FormHeader, FormFooter, FormStepper } from '../../../components/forms/FormLayout';

export default function MultiStepJobPost() {
  const router = useRouter();
  const [currentStepIdx, setCurrentStepIdx] = useState(0);
  const [formData, setFormData] = useState<any>({});

  // ラジオボタンフィールドのデフォルト値を設定
  useEffect(() => {
    const newData: any = { ...formData };
    let hasChanges = false;

    JOB_POST_STEPS.forEach(step => {
      step.fields.forEach((field: any) => {
        if ((field.type === 'radio-list' || field.type === 'radio' || field.type === 'card-radio') && 
            !newData[field.id] && 
            field.options && 
            field.options.length > 0) {
          // 最初の選択肢をデフォルト値として設定
          const firstOption = typeof field.options[0] === 'string' 
            ? field.options[0] 
            : field.options[0].id;
          newData[field.id] = firstOption;
          hasChanges = true;
        }
      });
    });

    if (hasChanges) {
      setFormData(newData);
    }
  }, []); // 初回マウント時のみ実行

  const currentStep = JOB_POST_STEPS[currentStepIdx];
  const isLastStep = currentStepIdx === JOB_POST_STEPS.length - 1;
  const isFirstStep = currentStepIdx === 0;

  const updateData = (id: string, value: any) => {
    setFormData((prev: any) => ({ ...prev, [id]: value }));
  };

  const goPreview = () => {
    if (typeof window !== 'undefined') {
      window.localStorage.setItem('jobPostPreviewData', JSON.stringify(formData));
    }
    router.push('/client/post-job/preview');
  };

  const renderField = (field: any) => {
    switch (field.type) {
      case 'text':
        return (
          <UI.TextInput
            value={formData[field.id] || ''}
            onChange={(v: any) => updateData(field.id, v)}
            placeholder={field.placeholder}
            maxLength={field.maxLength}
          />
        );
      case 'textarea':
        return (
          <UI.TextArea
            value={formData[field.id] || ''}
            onChange={(v: any) => updateData(field.id, v)}
            placeholder={field.placeholder}
          />
        );
      case 'checkbox-grid':
        return (
          <UI.CheckboxGrid
            options={field.options}
            selectedValues={formData[field.id] || []}
            onChange={(v: any) => updateData(field.id, v)}
          />
        );
      case 'card-radio':
        return (
          <UI.RadioCard
            options={field.options}
            selectedValue={formData[field.id]}
            onChange={(v: any) => updateData(field.id, v)}
          />
        );
      case 'radio':
      case 'radio-list':
        return (
          <UI.RadioList
            options={field.options}
            name={field.id}
            selectedValue={formData[field.id]}
            onChange={(v: any) => updateData(field.id, v)}
            cols={field.cols}
          />
        );
      case 'url-list':
        return (
          <UI.UrlListInput
            urls={formData[field.id] || []}
            onChange={(v: any) => updateData(field.id, v)}
          />
        );
      case 'file':
        return <UI.FileUploader />;
      case 'toggle':
        return (
          <UI.ToggleSwitch
            checked={!!formData[field.id]}
            desc={field.desc}
            onChange={(v: any) => updateData(field.id, v)}
          />
        );
      case 'date':
        return (
          <UI.DateInput
            value={formData[field.id] || ''}
            onChange={(v: any) => updateData(field.id, v)}
          />
        );
      case 'select':
        return (
          <UI.SelectInput
            value={formData[field.id] || ''}
            onChange={(v: any) => updateData(field.id, v)}
            options={field.options}
            placeholder={field.placeholder}
          />
        );
      default:
        return <div className="text-sm text-neutral-400">未対応のフィールドタイプです</div>;
    }
  };

  const next = () => {
    if (isLastStep) goPreview();
    else setCurrentStepIdx(prev => prev + 1);
    window.scrollTo(0, 0);
  };

  const prev = () => {
    if (currentStepIdx > 0) setCurrentStepIdx(prev => prev - 1);
    window.scrollTo(0, 0);
  };

  return (
    <div className="min-h-screen bg-slate-100 pb-24">

      {/* Header */}
      <FormHeader title="案件投稿" onPreview={goPreview} />

      {/* Stepper */}
      <FormStepper currentStep={currentStep.id} steps={JOB_POST_STEPS} />

      {/* main */}
      <main className="max-w-2xl mx-auto pt-12 px-4">
        
        <h2 className="text-xl font-bold text-white flex items-center gap-y-2 gap-x-4 mb-6 bg-slate-500 p-3 rounded-lg">
          <span className="text-white text-sm font-black">STEP {currentStep.id}</span>
          {currentStep.title}
        </h2>

        {currentStep.tips && (
          <UI.TipsBox title="投稿のポイント" content={currentStep.tips} />
        )}

        <div className="space-y-6">
          {currentStep.fields.map((field: any) => (
            <UI.FormSection
              key={field.id}
              label={field.label}
              required={field.required}
              helpText={field.helpText}
              examples={field.examples}
              description={field.description}
            >
              {renderField(field)}
            </UI.FormSection>
          ))}
        </div>
      </main>

      {/* Footer */}
      <FormFooter
        onBack={prev}
        onNext={next}
        isFirst={isFirstStep}
        isLast={isLastStep}
      />
    </div>
  );
}