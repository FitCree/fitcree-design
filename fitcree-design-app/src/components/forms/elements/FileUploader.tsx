import React from 'react';
import { Upload } from 'lucide-react';
import { getFormTheme } from './form-theme';

interface FileUploaderProps {
  label?: string;
  description?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onFilesChange?: (files: File[]) => void;
  accept?: string;
  multiple?: boolean;
  variant?: 'client' | 'creator';
  className?: string;
  previewImage?: string | null;
}

/**
 * 汎用ファイルアップローダーコンポーネント
 * 単一/複数選択、ドラッグ＆ドロップ、プレビュー表示に対応
 */
export const FileUploader = ({
  label = "クリックしてアップロード",
  description = "PDF, PNG, JPG (最大 3MB)",
  onChange,
  onFilesChange,
  accept,
  multiple = false,
  variant = 'client',
  className = '',
  previewImage = null
}: FileUploaderProps) => {
  const theme = getFormTheme(variant);
  const isCreator = variant === 'creator';

  const handleDrop = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    if (onFilesChange) {
      const droppedFiles = Array.from(e.dataTransfer.files);
      onFilesChange(droppedFiles);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (onChange) onChange(e);
    if (onFilesChange) {
      const selectedFiles = Array.from(e.target.files || []);
      onFilesChange(selectedFiles);
    }
  };

  return (
    <div className={`relative group ${className}`}>
      <label
        className={`flex flex-col items-center justify-center w-full min-h-32 border-2 border-neutral-300 border-dashed rounded-xl cursor-pointer bg-white ${theme.borderHover} transition-all overflow-hidden ${previewImage ? (isCreator ? 'border-orange-500' : 'border-blue-500') : ''}`}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
      >
        {previewImage ? (
          <img src={previewImage} alt="Preview" className="w-full h-full object-cover aspect-video" />
        ) : (
          <div className="flex flex-col items-center justify-center pt-5 pb-6 text-center px-4">
            <Upload className="w-8 h-8 mb-2 text-neutral-400" />
            <p className="text-sm text-neutral-500"><span className="font-semibold">{label}</span></p>
            {description && <p className="text-sm text-neutral-500 mt-1">{description}</p>}
          </div>
        )}
        <input
          type="file"
          className="hidden"
          onChange={handleChange}
          accept={accept}
          multiple={multiple}
        />
      </label>
    </div>
  );
};
