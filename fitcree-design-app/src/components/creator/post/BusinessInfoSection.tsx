'use client';

import { Briefcase } from 'lucide-react';
import { TextInput } from '@/components/forms/elements/TextInput';
import { SelectInput } from '@/components/forms/elements/SelectInput';
import { RadioList } from '@/components/forms/elements/RadioList';
import { TagInput } from '@/components/forms/elements/TagInput';
import { FormSection } from '@/components/forms/elements/FormSection';
import { DetailSection } from '@/components/common/DetailSection';
import { DURATION_UNITS, CLIENT_TYPE_OPTIONS } from '@/constants/work-options';
import { SuggestedTags } from './SuggestedTags';

interface BusinessInfoSectionProps {
  responsibilities: string[];
  onResponsibilitiesChange: (v: string[]) => void;
  suggestedResponsibilities: string[];
  durationValue: string;
  onDurationValueChange: (v: string) => void;
  durationUnit: string;
  onDurationUnitChange: (v: string) => void;
  clientType: string;
  onClientTypeChange: (v: string) => void;
  clientName: string;
  onClientNameChange: (v: string) => void;
}

export function BusinessInfoSection({
  responsibilities,
  onResponsibilitiesChange,
  suggestedResponsibilities,
  durationValue,
  onDurationValueChange,
  durationUnit,
  onDurationUnitChange,
  clientType,
  onClientTypeChange,
  clientName,
  onClientNameChange,
}: BusinessInfoSectionProps) {
  const handleAddTag = (tag: string) => {
    if (!responsibilities.includes(`#${tag}`)) {
      onResponsibilitiesChange([...responsibilities, `#${tag}`]);
    }
  };

  return (
    <DetailSection title="業務情報" icon={Briefcase} bodyClassName="p-6">
      <FormSection
        label="担当範囲"
        variant="creator"
        description="この作品であなたが担当した範囲をタグで入力してください。"
      >
        <TagInput
          value={responsibilities}
          onChange={onResponsibilitiesChange}
          placeholder="タグを追加"
          variant="creator"
        />
        <SuggestedTags
          tags={suggestedResponsibilities}
          currentValues={responsibilities}
          onAdd={handleAddTag}
        />
      </FormSection>

      <FormSection
        label="概算期間"
        variant="creator"
        description="担当範囲においてかかった時間を入力してください。"
      >
        <div className="flex items-center gap-2 mb-2">
          <div className="w-24">
            <TextInput
              value={durationValue}
              onChange={onDurationValueChange}
              placeholder=""
              variant="creator"
            />
          </div>
          <SelectInput
            value={durationUnit}
            onChange={onDurationUnitChange}
            options={DURATION_UNITS}
            variant="creator"
          />
        </div>
      </FormSection>

      <FormSection
        label="クライアント情報"
        variant="creator"
        description="この作品の相手を選択してください。"
      >
        <RadioList
          name="clientType"
          selectedValue={clientType}
          onChange={onClientTypeChange}
          variant="creator"
          options={CLIENT_TYPE_OPTIONS}
        />
        {clientType === 'client_public' && (
          <div className="mt-3">
            <TextInput
              value={clientName}
              onChange={onClientNameChange}
              placeholder="クライアント名を入力"
              variant="creator"
            />
          </div>
        )}
      </FormSection>
    </DetailSection>
  );
}
