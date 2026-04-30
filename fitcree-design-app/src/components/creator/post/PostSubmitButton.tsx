'use client';

import { ChevronRight } from 'lucide-react';

interface PostSubmitButtonProps {
  onClick: () => void;
}

export function PostSubmitButton({ onClick }: PostSubmitButtonProps) {
  return (
    <div className="pb-8">
      <button
        onClick={onClick}
        className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-4 rounded-xl transition-all text-base flex items-center justify-center gap-2"
      >
        この内容で公開に進む
        <ChevronRight size={18} />
      </button>
    </div>
  );
}
