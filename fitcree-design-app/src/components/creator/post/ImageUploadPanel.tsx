'use client';

import React, { useState, useCallback, useRef } from 'react';
import { Upload, X, ImageIcon, CheckCircle2, Info } from 'lucide-react';

export interface UploadedImage {
  id: string;
  preview: string;
  name: string;
  file?: File;
}

interface ImageUploadPanelProps {
  categoryLabel: string;
  hintText: string;
  uploadSubtitle?: string;
  emptyText?: string;
  emptySubText?: string;
  maxImages?: number;
  initialImages?: UploadedImage[];
}

export function ImageUploadPanel({
  categoryLabel,
  hintText,
  uploadSubtitle = '画像をアップロードしてください',
  emptyText = '画像がまだありません',
  emptySubText = '上のエリアから画像を追加してください',
  maxImages = 9,
  initialImages = [],
}: ImageUploadPanelProps) {
  const [images, setImages] = useState<UploadedImage[]>(initialImages);
  const [isDragging, setIsDragging] = useState(false);
  const [dragOverId, setDragOverId] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const dragSortId = useRef<string | null>(null);
  const isDragSort = useRef(false);

  const addFiles = useCallback((files: FileList | File[]) => {
    const arr = Array.from(files);
    const accepted = arr.filter((f) => f.type === 'image/jpeg' || f.type === 'image/png');
    const remaining = maxImages - images.length;
    const toAdd = accepted.slice(0, remaining);
    const newImages: UploadedImage[] = toAdd.map((file) => ({
      id: `${Date.now()}-${Math.random()}`,
      preview: URL.createObjectURL(file),
      name: file.name,
      file,
    }));
    setImages((prev) => [...prev, ...newImages]);
  }, [images.length, maxImages]);

  const removeImage = useCallback((id: string) => {
    setImages((prev) => prev.filter((img) => img.id !== id));
  }, []);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    if (!isDragSort.current) setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (isDragSort.current) return;
    if (images.length >= maxImages) return;
    addFiles(e.dataTransfer.files);
  }, [addFiles, images.length, maxImages]);

  const handleSortDragStart = useCallback((id: string) => {
    dragSortId.current = id;
    isDragSort.current = true;
  }, []);

  const handleSortDragOver = useCallback((e: React.DragEvent, id: string) => {
    e.preventDefault();
    e.stopPropagation();
    if (dragSortId.current && dragSortId.current !== id) setDragOverId(id);
  }, []);

  const handleSortDrop = useCallback((e: React.DragEvent, targetId: string) => {
    e.preventDefault();
    e.stopPropagation();
    const fromId = dragSortId.current;
    if (!fromId || fromId === targetId) { setDragOverId(null); return; }
    setImages((prev) => {
      const arr = [...prev];
      const fromIdx = arr.findIndex((img) => img.id === fromId);
      const toIdx = arr.findIndex((img) => img.id === targetId);
      if (fromIdx === -1 || toIdx === -1) return prev;
      const [item] = arr.splice(fromIdx, 1);
      arr.splice(toIdx, 0, item);
      return arr;
    });
    setDragOverId(null);
    dragSortId.current = null;
  }, []);

  const handleSortDragEnd = useCallback(() => {
    isDragSort.current = false;
    dragSortId.current = null;
    setDragOverId(null);
  }, []);

  return (
    <div
      className="bg-white rounded-xl border border-neutral-200 lg:sticky lg:top-20 flex flex-col"
      style={{ maxHeight: 'calc(100vh - 5.5rem)' }}
    >
      <div className="p-6 pb-4 shrink-0">
        <h2 className="text-lg font-bold text-neutral-800 mb-1">
          <span className="text-orange-500">{categoryLabel}</span> の作品を追加
        </h2>
        <p className="text-sm text-neutral-500 mb-4">
          {uploadSubtitle}（最大{maxImages}枚）。
        </p>

        {images.length < maxImages && (
          <div
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
            className={`border-2 border-dashed rounded-xl p-5 text-center cursor-pointer transition-all ${
              isDragging
                ? 'border-orange-400 bg-orange-50'
                : 'border-neutral-300 bg-neutral-50 hover:border-orange-300 hover:bg-orange-50/50'
            }`}
          >
            <Upload size={22} className={`mx-auto mb-2 ${isDragging ? 'text-orange-500' : 'text-neutral-400'}`} />
            <p className="text-sm font-bold text-neutral-600">ドラッグ＆ドロップ</p>
            <p className="text-xs text-neutral-400 mt-1">またはクリックしてファイルを選択</p>
            <p className="text-xs text-neutral-400 mt-1">JPG / PNG　残り{maxImages - images.length}枚</p>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/jpeg,image/png"
              multiple
              className="hidden"
              onChange={(e) => { if (e.target.files) addFiles(e.target.files); e.target.value = ''; }}
            />
          </div>
        )}

        {images.length >= maxImages && (
          <div className="p-3 bg-green-50 border border-green-200 rounded-xl">
            <p className="text-xs text-green-700 font-bold flex items-center gap-1.5">
              <CheckCircle2 size={13} />
              最大枚数（{maxImages}枚）に達しました
            </p>
          </div>
        )}
      </div>

      <div className="flex-1 overflow-y-auto px-6 pb-6 min-h-0">
        {images.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-8 text-center">
            <ImageIcon size={36} className="text-neutral-300 mb-3" />
            <p className="text-sm text-neutral-400 font-medium">{emptyText}</p>
            <p className="text-xs text-neutral-300 mt-1">{emptySubText}</p>
          </div>
        ) : (
          <div className="space-y-3">
            {images.map((img) => (
              <div
                key={img.id}
                draggable
                onDragStart={() => handleSortDragStart(img.id)}
                onDragOver={(e) => handleSortDragOver(e, img.id)}
                onDrop={(e) => handleSortDrop(e, img.id)}
                onDragEnd={handleSortDragEnd}
                className={`relative rounded-xl overflow-hidden border bg-neutral-100 cursor-grab active:cursor-grabbing transition-all ${
                  dragOverId === img.id
                    ? 'border-orange-400 ring-2 ring-orange-300 scale-[0.98]'
                    : 'border-neutral-200'
                }`}
              >
                <img src={img.preview} alt={img.name} className="w-full object-cover pointer-events-none" />
                <button
                  type="button"
                  onClick={() => removeImage(img.id)}
                  className="absolute top-2 right-2 w-6 h-6 flex items-center justify-center rounded-full bg-black/70 text-white hover:bg-black transition-colors shadow"
                  title="削除"
                >
                  <X size={12} />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="px-6 pb-6 shrink-0">
        <div className="p-3 bg-blue-50 border border-blue-100 rounded-lg">
          <p className="text-xs text-blue-700 leading-relaxed flex items-start gap-1.5">
            <Info size={13} className="shrink-0 mt-0.5" />
            <span>{hintText}</span>
          </p>
        </div>
      </div>
    </div>
  );
}
