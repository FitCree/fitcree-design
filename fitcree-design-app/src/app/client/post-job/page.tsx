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
        // conditional-checkbox-gridタイプのデフォルト値を設定
        if (field.type === 'conditional-checkbox-grid' && !newData[`${field.id}Type`]) {
          newData[`${field.id}Type`] = field.defaultMode || 'consult';
          newData[field.id] = [];
          hasChanges = true;
        }
        // conditional-dateタイプのデフォルト値を設定
        if (field.type === 'conditional-date' && !newData[`${field.id}Type`]) {
          newData[`${field.id}Type`] = field.defaultType || (field.options && field.options[0]?.id) || 'date';
          newData[field.id] = '';
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
    setFormData((prev: any) => {
      const newData = { ...prev, [id]: value };
      
      // 依頼分野が変更された場合、用途フィールドの選択肢を更新
      if (id === 'category') {
        // 用途フィールドの選択肢を更新し、選択されていた値が新しい選択肢に含まれない場合はリセット
        const usagePurposeField = JOB_POST_STEPS
          .flatMap((step: any) => step.fields)
          .find((f: any) => f.id === 'usagePurpose') as { categoryBasedOptions?: Record<string, string[]> } | undefined;

        if (usagePurposeField?.categoryBasedOptions) {
          const categoryValue = value;
          const newOptions = usagePurposeField.categoryBasedOptions[categoryValue] || usagePurposeField.categoryBasedOptions['default'] || [];
          const currentSelected = newData['usagePurpose'] || [];
          // 新しい選択肢に含まれない値を削除
          const validSelected = currentSelected.filter((v: string) => newOptions.includes(v));
          newData['usagePurpose'] = validSelected;
        }
      }
      
      return newData;
    });
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
            maxLength={field.maxLength}
          />
        );
      case 'checkbox-grid':
        // 動的な選択肢の処理（依頼分野に応じて用途の選択肢が変わる）
        let options = field.options;
        if (field.categoryBasedOptions && field.dependsOn) {
          const dependentValue = formData[field.dependsOn];
          if (dependentValue) {
            options = field.categoryBasedOptions[dependentValue] || field.categoryBasedOptions['default'] || [];
          } else {
            options = field.categoryBasedOptions['default'] || [];
          }
        }
        
        return (
          <UI.CheckboxGrid
            options={options}
            selectedValues={formData[field.id] || []}
            onChange={(v: any) => updateData(field.id, v)}
            cols={field.cols}
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
            title={field.title}
            description={field.description}
            onChange={(v: any) => updateData(field.id, v)}
          />
        );
      case 'toggle-group':
        return (
          <div className="space-y-3">
            {field.items.map((item: any) => (
              <UI.ToggleSwitch
                key={item.id}
                checked={!!formData[item.id]}
                title={item.title}
                description={item.description}
                onChange={(v: any) => updateData(item.id, v)}
              />
            ))}
          </div>
        );
      case 'date':
        return (
          <UI.DateInput
            value={formData[field.id] || ''}
            onChange={(v: any) => updateData(field.id, v)}
          />
        );
      case 'conditional-date':
        return (
          <UI.ConditionalDateInput
            typeValue={formData[`${field.id}Type`] || field.defaultType || (field.options && field.options[0]?.id) || 'date'}
            onTypeChange={(type) => updateData(`${field.id}Type`, type)}
            dateValue={formData[field.id] || ''}
            onDateChange={(date) => updateData(field.id, date)}
            helpText={field.helpText}
            options={field.options || []}
            defaultType={field.defaultType}
            dateInputId={field.dateInputId}
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
      case 'tag-input':
        return (
          <UI.TagInput
            value={formData[field.id] || []}
            onChange={(v: any) => updateData(field.id, v)}
            placeholder={field.placeholder}
            maxTags={field.maxTags}
          />
        );
      case 'reference-url-input':
        return (
          <UI.ReferenceUrlInput
            urls={formData[field.id] || []}
            onChange={(v: any) => updateData(field.id, v)}
            maxUrls={field.maxUrls}
          />
        );
      case 'reference-file-uploader':
        return (
          <UI.ReferenceFileUploader
            files={formData[field.id] || []}
            onChange={(v: any) => updateData(field.id, v)}
          />
        );
      case 'conditional-checkbox-grid':
        return (
          <UI.ConditionalCheckboxGrid
            modeValue={formData[`${field.id}Type`] || field.defaultMode || 'consult'}
            onModeChange={(mode: 'consult' | 'specified') => updateData(`${field.id}Type`, mode)}
            selectedValues={formData[field.id] || []}
            onValuesChange={(values: string[]) => updateData(field.id, values)}
            options={field.options || []}
            defaultMode={field.defaultMode || 'consult'}
            cols={field.cols || 3}
            modeOptions={field.modeOptions}
            checkboxHelpText={field.checkboxHelpText}
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
      <FormStepper
        currentStep={currentStep.id}
        steps={JOB_POST_STEPS}
        isStepClickable={() => true}
        onStepChange={(stepId) => {
          const nextIdx = JOB_POST_STEPS.findIndex((s) => s.id === stepId);
          if (nextIdx >= 0) setCurrentStepIdx(nextIdx);
          window.scrollTo(0, 0);
        }}
      />

      {/* main */}
      <main className="max-w-3xl mx-auto pt-12 px-4">
        
        <h2 className="text-xl font-bold text-white flex items-center gap-y-2 gap-x-4 mb-6 bg-slate-500 p-3 rounded-lg">
          <span className="text-white text-sm font-black">STEP {currentStep.id}</span>
          {currentStep.title}
        </h2>

        {currentStep.tips && (
          <UI.TipsBox title="このステップのポイント" content={currentStep.tips} />
        )}

        <div className="bg-white rounded-xl border border-neutral-200 pr-6 sm:pr-8 pl-6 sm:pl-8 pb-6 sm:pb-8">
          {currentStep.fields.map((field: any) => (
            <UI.FormSection
              key={field.id}
              label={field.label}
              required={field.required}
              helpText={field.type === 'conditional-date' ? undefined : field.helpText}
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