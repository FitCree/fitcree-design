'use client';

import { Shield } from 'lucide-react';
import { RadioList } from '@/components/forms/elements/RadioList';
import { FormSection } from '@/components/forms/elements/FormSection';
import { DetailSection } from '@/components/common/DetailSection';
import { AGE_RESTRICTION_OPTIONS, VISIBILITY_OPTIONS } from '@/constants/work-options';

interface RadioOption {
  id: string;
  label: string;
  description?: string;
}

interface PublicationSettingsSectionProps {
  aiOptions: RadioOption[];
  aiUsage: string;
  onAiUsageChange: (v: string) => void;
  ageRestriction: string;
  onAgeRestrictionChange: (v: string) => void;
  visibility: string;
  onVisibilityChange: (v: string) => void;
}

export function PublicationSettingsSection({
  aiOptions,
  aiUsage,
  onAiUsageChange,
  ageRestriction,
  onAgeRestrictionChange,
  visibility,
  onVisibilityChange,
}: PublicationSettingsSectionProps) {
  return (
    <DetailSection title="公開設定" icon={Shield} bodyClassName="p-6">
      <FormSection
        label="生成AIの利用状況"
        variant="creator"
        description="この作品における生成AIの利用状況を教えてください。"
      >
        <RadioList
          name="aiUsage"
          selectedValue={aiUsage}
          onChange={onAiUsageChange}
          variant="creator"
          options={aiOptions}
        />
      </FormSection>

      <FormSection
        label="年齢制限"
        variant="creator"
        description="成人向けコンテンツを含む場合は、適切な年齢制限を選択してください。"
      >
        <RadioList
          name="ageRestriction"
          selectedValue={ageRestriction}
          onChange={onAgeRestrictionChange}
          variant="creator"
          options={AGE_RESTRICTION_OPTIONS}
        />
      </FormSection>

      <FormSection
        label="公開範囲"
        variant="creator"
        description=""
      >
        <RadioList
          name="visibility"
          selectedValue={visibility}
          onChange={onVisibilityChange}
          variant="creator"
          options={VISIBILITY_OPTIONS}
        />
        {visibility === 'limited' && (
          <p className="text-xs text-neutral-500 mt-2 pl-1">
            作品URLを知っている方のみ閲覧できるようになります。非公開にしたい場合は「下書き」をご活用ください。
          </p>
        )}
      </FormSection>
    </DetailSection>
  );
}
