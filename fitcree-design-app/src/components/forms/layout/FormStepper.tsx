import React from 'react';
import { CheckCircle2 } from 'lucide-react';

// --- ステッパー（進捗バー） ---
type Step = {
  id: number;
  title: string;
};

type FormStepperProps = {
  currentStep: number;
  steps: Step[];
  onStepChange?: (stepId: number) => void;
  isStepClickable?: (stepId: number, currentStep: number) => boolean;
};

export const FormStepper = ({
  currentStep,
  steps,
  onStepChange,
  isStepClickable,
}: FormStepperProps) => (
  <div className="max-w-screen-xl mx-auto py-2 px-6">
    <div className="max-w-3xl mx-auto flex justify-between relative">
      <div className="absolute left-0 top-4 w-full h-0.5 bg-neutral-100 -z-10" />
      {steps.map((step) => {
        const clickable =
          typeof onStepChange === 'function' &&
          (typeof isStepClickable === 'function'
            ? isStepClickable(step.id, currentStep)
            : step.id <= currentStep);

        return (
          <button
            key={step.id}
            type="button"
            disabled={!clickable}
            onClick={() => onStepChange?.(step.id)}
            aria-current={step.id === currentStep ? 'step' : undefined}
            className="flex flex-col items-center select-none p-0 bg-transparent border-0 disabled:opacity-60 disabled:cursor-not-allowed focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 focus-visible:ring-offset-2"
          >
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold border-2 transition-all
            ${step.id <= currentStep ? 'bg-blue-500 border-blue-500 text-white' : 'bg-white border-neutral-300 text-neutral-400'}`}
            >
              {step.id < currentStep ? <CheckCircle2 size={16} /> : step.id}
            </div>
            <span
              className={`text-[10px] mt-1 font-bold ${step.id === currentStep ? 'text-blue-500' : 'text-neutral-400'}`}
            >
              {step.title}
            </span>
          </button>
        );
      })}
    </div>
  </div>
);

