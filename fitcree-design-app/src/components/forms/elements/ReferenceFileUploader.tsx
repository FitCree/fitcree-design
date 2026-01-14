import React from 'react';
import { UploadCloud } from 'lucide-react';

// --- 参考資料・添付ファイルアップロード ---
export const ReferenceFileUploader = ({ 
  files = [], 
  onChange 
}: { 
  files?: File[]; 
  onChange: (files: File[]) => void 
}) => {
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(e.target.files || []);
    onChange([...files, ...selectedFiles]);
  };

  const handleDrop = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    const droppedFiles = Array.from(e.dataTransfer.files);
    onChange([...files, ...droppedFiles]);
  };

  const handleDragOver = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
  };

  return (
    <div className="flex items-center justify-center w-full">
      <label 
        className="flex flex-col items-center justify-center w-full h-32 border-2 border-neutral-300 border-dashed rounded-lg cursor-pointer bg-white hover:bg-neutral-50 transition-colors"
        onDrop={handleDrop}
        onDragOver={handleDragOver}
      >
        <div className="flex flex-col items-center justify-center pt-5 pb-6">
          <UploadCloud className="w-8 h-8 mb-3 text-neutral-400" />
          <p className="mb-2 text-sm text-neutral-600">
            <span className="font-semibold">クリックしてアップロード</span> またはドラッグ＆ドロップ
          </p>
          <p className="text-xs text-neutral-600">PDF, PNG, JPG, MP4 (最大 5MB)</p>
        </div>
        <input 
          type="file" 
          className="hidden" 
          onChange={handleFileChange}
          multiple
          accept=".pdf,.png,.jpg,.jpeg,.mp4"
        />
      </label>
    </div>
  );
};
