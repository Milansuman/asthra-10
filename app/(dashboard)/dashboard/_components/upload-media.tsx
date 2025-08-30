'use client';

import { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload, ImageIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { uploadBase64ToS3, fileToBase64 } from '@/lib/upload-utils';

interface UploadImageProps {
  setUrl: (url: string) => void;
  setUploading?: (uploading: boolean) => void;
  setProgress?: (progress: number) => void;
}

const UploadImage = ({ setUrl, setUploading, setProgress }: UploadImageProps) => {
  const simulateProgress = useCallback(() => {
    if (!setProgress) return;

    let progress = 0;
    const interval = setInterval(() => {
      progress += 5;
      setProgress(Math.min(progress, 90));

      if (progress >= 90) {
        clearInterval(interval);
      }
    }, 100);

    return () => clearInterval(interval);
  }, [setProgress]);

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (!file) return;

    if (setUploading) setUploading(true);
    const cleanupProgress = simulateProgress();

    try {
      // Convert file to base64
      const base64 = await fileToBase64(file);

      // Upload to S3
      const imageUrl = await uploadBase64ToS3(base64);

      // Complete progress
      if (setProgress) setProgress(100);

      // Set the URL
      setUrl(imageUrl);
    } catch (error) {
      console.error('Upload error:', error);
      // TODO: Show error to user
    } finally {
      setTimeout(() => {
        if (setUploading) setUploading(false);
        if (setProgress) setProgress(0);
      }, 500);

      if (cleanupProgress) cleanupProgress();
    }
  }, [setUrl, setUploading, setProgress, simulateProgress]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.gif', '.webp']
    },
    maxFiles: 1
  });

  return (
    <div
      {...getRootProps()}
      className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${isDragActive
          ? 'border-primary bg-primary/10'
          : 'border-muted-foreground/25 hover:border-muted-foreground/50'
        }`}
    >
      <input {...getInputProps()} />
      <div className="flex flex-col items-center justify-center gap-4">
        <div className="p-3 rounded-full bg-muted">
          {isDragActive ? (
            <Upload className="h-8 w-8 text-muted-foreground" />
          ) : (
            <ImageIcon className="h-8 w-8 text-muted-foreground" />
          )}
        </div>

        <div>
          <p className="font-medium mb-1">
            {isDragActive ? 'Drop the image here' : 'Upload an image'}
          </p>
          <p className="text-sm text-muted-foreground">
            Drag and drop or click to browse
          </p>
          <p className="text-xs text-muted-foreground mt-2">
            Supports: JPG, PNG, GIF, WebP
          </p>
        </div>

        <Button variant="outline" size="sm" className="mt-2">
          Select File
        </Button>
      </div>
    </div>
  );
};

export default UploadImage;