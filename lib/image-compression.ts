// Image compression utilities for client-side compression before upload
import imageCompression from 'browser-image-compression';

export interface CompressionOptions {
  quality?: number; // 0.1 to 1.0
  maxWidthOrHeight?: number;
  maxSizeMB?: number;
  outputFormat?: 'image/jpeg' | 'image/png' | 'image/webp';
  useWebWorker?: boolean;
}

export async function compressImage(
  file: File, 
  options: CompressionOptions = {}
): Promise<{ compressedFile: File; compressionRatio: number }> {
  const {
    quality = 0.8,
    maxWidthOrHeight = 1920,
    maxSizeMB = 2,
    outputFormat = 'image/jpeg',
    useWebWorker = true
  } = options;

  try {
    const compressionOptions = {
      maxSizeMB,
      maxWidthOrHeight,
      useWebWorker,
      fileType: outputFormat,
      initialQuality: quality,
    };

    const compressedFile = await imageCompression(file, compressionOptions);
    const compressionRatio = (file.size - compressedFile.size) / file.size;

    return { compressedFile, compressionRatio };
  } catch (error) {
    console.error('Image compression failed:', error);
    throw new Error('Failed to compress image');
  }
}

export async function compressImageToDataUrl(
  file: File,
  options: CompressionOptions = {}
): Promise<{ dataUrl: string; compressionRatio: number }> {
  const { compressedFile, compressionRatio } = await compressImage(file, options);
  
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      resolve({ 
        dataUrl: reader.result as string, 
        compressionRatio 
      });
    };
    reader.onerror = () => reject(new Error('Failed to read compressed file'));
    reader.readAsDataURL(compressedFile);
  });
}

// Additional utility for getting optimal compression settings based on file size
export function getOptimalCompressionSettings(fileSizeBytes: number): CompressionOptions {
  const fileSizeMB = fileSizeBytes / (1024 * 1024);
  
  if (fileSizeMB < 1) {
    // Small files - minimal compression
    return {
      quality: 0.9,
      maxWidthOrHeight: 1920,
      maxSizeMB: 0.8,
    };
  } else if (fileSizeMB < 5) {
    // Medium files - balanced compression
    return {
      quality: 0.8,
      maxWidthOrHeight: 1920,
      maxSizeMB: 1.5,
    };
  } else if (fileSizeMB < 15) {
    // Large files - aggressive compression
    return {
      quality: 0.7,
      maxWidthOrHeight: 1600,
      maxSizeMB: 2,
    };
  } else {
    // Very large files - maximum compression
    return {
      quality: 0.6,
      maxWidthOrHeight: 1200,
      maxSizeMB: 2.5,
    };
  }
}
