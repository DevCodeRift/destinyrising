'use client';

import { useState, useRef } from 'react';
import { ImageUploadResult } from '@/lib/storage/blob';

interface ImageUploadProps {
  onUpload: (result: ImageUploadResult) => void;
  folder?: string;
  accept?: string;
  maxSize?: number;
  className?: string;
  children?: React.ReactNode;
}

export function ImageUpload({
  onUpload,
  folder = 'items',
  accept = 'image/*',
  maxSize = 10 * 1024 * 1024, // 10MB
  className = '',
  children,
}: ImageUploadProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setError(null);
    setIsUploading(true);

    try {
      // Validate file size
      if (file.size > maxSize) {
        throw new Error(`File too large. Maximum size is ${Math.round(maxSize / 1024 / 1024)}MB`);
      }

      const formData = new FormData();
      formData.append('file', file);
      formData.append('folder', folder);

      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Upload failed');
      }

      onUpload(result.data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Upload failed');
    } finally {
      setIsUploading(false);
      // Reset the input
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className={className}>
      <input
        ref={fileInputRef}
        type="file"
        accept={accept}
        onChange={handleFileSelect}
        className="hidden"
        disabled={isUploading}
      />

      <button
        type="button"
        onClick={handleClick}
        disabled={isUploading}
        className={`
          relative overflow-hidden rounded-lg border-2 border-dashed
          ${isUploading
            ? 'border-gray-600 bg-gray-800 text-gray-400'
            : 'border-gray-600 hover:border-orange-400 bg-gray-900 text-gray-300'
          }
          ${error ? 'border-red-500 bg-red-900/20' : ''}
          transition-colors duration-200 p-4 w-full
          ${isUploading ? 'cursor-not-allowed' : 'cursor-pointer'}
        `}
      >
        {children || (
          <div className="text-center">
            {isUploading ? (
              <>
                <div className="mx-auto mb-2 h-8 w-8 animate-spin rounded-full border-2 border-orange-500 border-t-transparent"></div>
                <p className="text-sm text-gray-300">Uploading...</p>
              </>
            ) : (
              <>
                <svg
                  className="mx-auto mb-2 h-8 w-8 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                  />
                </svg>
                <p className="text-sm text-gray-300">
                  Click to upload or drag and drop
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  PNG, JPG, WebP up to {Math.round(maxSize / 1024 / 1024)}MB
                </p>
              </>
            )}
          </div>
        )}
      </button>

      {error && (
        <div className="mt-2 rounded-md bg-red-900/30 border border-red-500 p-2">
          <p className="text-sm text-red-300">{error}</p>
        </div>
      )}
    </div>
  );
}

// Hook for managing multiple image uploads
export function useImageUpload() {
  const [images, setImages] = useState<ImageUploadResult[]>([]);
  const [isUploading, setIsUploading] = useState(false);

  const addImage = (image: ImageUploadResult) => {
    setImages(prev => [...prev, image]);
  };

  const removeImage = (url: string) => {
    setImages(prev => prev.filter(img => img.url !== url));
  };

  const clearImages = () => {
    setImages([]);
  };

  return {
    images,
    addImage,
    removeImage,
    clearImages,
    isUploading,
    setIsUploading,
  };
}