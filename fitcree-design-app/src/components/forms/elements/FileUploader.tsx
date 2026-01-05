import React from 'react';
import { UploadCloud } from 'lucide-react';

// --- 特殊：ファイルアップロード ---
export const FileUploader = () => (
  <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-neutral-300 border-dashed rounded-lg cursor-pointer bg-white hover:bg-neutral-50 transition-colors">
    <div className="flex flex-col items-center justify-center pt-5 pb-6">
      <UploadCloud className="w-8 h-8 mb-2 text-neutral-400" />
      <p className="text-xs text-neutral-500"><span className="font-semibold">クリックしてアップロード</span></p>
      <p className="text-[10px] text-neutral-400 mt-1">PDF, PNG, JPG (最大 3MB)</p>
    </div>
    <input type="file" className="hidden" />
  </label>
);
