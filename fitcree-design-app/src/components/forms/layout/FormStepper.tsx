import React from 'react';
import { CheckCircle2 } from 'lucide-react';

// --- ステッパー（進捗バー） ---
export const FormStepper = ({ currentStep, steps }: any) => (
  <div className='max-w-screen-xl mx-auto py-2 px-6'>
    <div className="max-w-3xl mx-auto flex justify-between">
      <div className="absolute left-0 top-4 w-full h-0.5 bg-neutral-100 -z-10"></div>
      {steps.map((step: any, idx: number) => (
        <div key={step.id} className="flex flex-col items-center">
          <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold border-2 transition-all
            ${step.id <= currentStep ? 'bg-blue-500 border-blue-500 text-white' : 'bg-white border-neutral-300 text-neutral-400'}`}>
            {step.id < currentStep ? <CheckCircle2 size={16} /> : step.id}
          </div>
          <span className={`text-[10px] mt-1 font-bold ${step.id === currentStep ? 'text-blue-500' : 'text-neutral-400'}`}>
            {step.title}
          </span>
        </div>
      ))}
    </div>
  </div>
);

