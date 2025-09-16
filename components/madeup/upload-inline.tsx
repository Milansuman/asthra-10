'use client';

import { FC, useState, useRef } from 'react';
import Image from 'next/image';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Upload, X, Check, Copy, FileImage } from 'lucide-react';
import { api } from '@/trpc/react';
import { compressImageToDataUrl, getOptimalCompressionSettings, type CompressionOptions } from '@/lib/image-compression';

type UploadMediaInlineProps = {
  value?: string;
  onChange: (url: string) => void;
  onRemove?: () => void;
};

const CHUNK_SIZE = 5 * 1024 * 1024; // 5MB chunks
const COMPRESSION_THRESHOLD = 2 * 1024 * 1024; // 2MB - compress files larger than this

const UploadMediaInline: React.FC<UploadMediaInlineProps> = ({ value, onChange, onRemove }) => {
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [copied, setCopied] = useState(false);
  const [compressionStatus, setCompressionStatus] = useState<string>('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const initiateUploadMutation = api.upload.initiateMultipartUpload.useMutation();
  const uploadPartMutation = api.upload.uploadPart.useMutation();
  const completeUploadMutation = api.upload.completeMultipartUpload.useMutation();
  const abortUploadMutation = api.upload.abortMultipartUpload.useMutation();

  const uploadSmallImageMutation = api.upload.uploadImage.useMutation({
    onSuccess: (result) => {
      onChange(result.url);
      setUploading(false);
      setUploadProgress(0);
      setCompressionStatus('');
    },
    onError: (error) => {
      setUploading(false);
      setUploadProgress(0);
      setCompressionStatus('');
    },
  });

  const handleFileSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      toast.error("Invalid file type", {
        description: "Please select an image file (JPG, PNG, GIF, WebP)."
      });
      return;
    }

    // Validate file size (50MB max)
    const maxSize = 50 * 1024 * 1024; // 50MB in bytes
    if (file.size > maxSize) {
      toast.error("File too large", {
        description: "Please select an image smaller than 50MB."
      });
      return;
    }

    setUploading(true);
    setUploadProgress(0);
    setCompressionStatus('');

    try {
      let dataUrl: string;
      let isCompressed = false;

      // Check if file needs compression
      if (file.size > COMPRESSION_THRESHOLD) {
        setCompressionStatus('Compressing image...');

        // Get optimal compression settings based on file size
        const compressionOptions = getOptimalCompressionSettings(file.size);

        // Override format based on original file type to maintain transparency for PNGs
        compressionOptions.outputFormat = file.type === 'image/png' ? 'image/png' : 'image/jpeg';

        const { dataUrl: compressedDataUrl, compressionRatio } = await compressImageToDataUrl(file, compressionOptions);
        dataUrl = compressedDataUrl;
        isCompressed = true;

        const savedSize = Math.round(file.size * compressionRatio / 1024);
        setCompressionStatus(`Compressed (saved ${savedSize}KB)`);
        toast.success(`Image compressed - saved ${savedSize}KB (${Math.round(compressionRatio * 100)}% reduction)`);
      } else {
        // For small files, convert to base64 without compression
        const reader = new FileReader();
        dataUrl = await new Promise<string>((resolve, reject) => {
          reader.onload = () => resolve(reader.result as string);
          reader.onerror = () => reject(new Error('Failed to read file'));
          reader.readAsDataURL(file);
        });
      }

      // Upload the image (compressed or original)
      uploadSmallImageMutation.mutate({
        dataUrl,
        bucketName: 'assets',
        isCompressed
      });

    } catch (error) {
      toast.error("Upload failed", {
        description: error instanceof Error ? error.message : "An error occurred while processing the file."
      });
      setUploading(false);
      setUploadProgress(0);
      setCompressionStatus('');
    }
  };

  const handleMultipartUpload = async (file: File) => {
    let uploadId: string | undefined;
    let key: string | undefined;
    let bucket: string | undefined;

    try {
      // Initiate multipart upload
      const initResponse = await initiateUploadMutation.mutateAsync({
        fileName: file.name,
        contentType: file.type,
        bucketName: 'assets'
      });

      uploadId = initResponse.uploadId;
      key = initResponse.key;
      bucket = initResponse.bucket;

      // Calculate number of parts
      const totalParts = Math.ceil(file.size / CHUNK_SIZE);
      const parts: Array<{ ETag: string; PartNumber: number }> = [];

      // Upload parts
      for (let partNumber = 1; partNumber <= totalParts; partNumber++) {
        const start = (partNumber - 1) * CHUNK_SIZE;
        const end = Math.min(start + CHUNK_SIZE, file.size);
        const chunk = file.slice(start, end);

        // Convert chunk to base64
        const chunkBuffer = await chunk.arrayBuffer();
        const base64Chunk = Buffer.from(chunkBuffer).toString('base64');

        const partResponse = await uploadPartMutation.mutateAsync({
          bucket,
          key,
          uploadId,
          partNumber,
          data: base64Chunk
        });

        parts.push({
          ETag: partResponse.ETag,
          PartNumber: partNumber
        });

        // Update progress
        setUploadProgress((partNumber / totalParts) * 100);
      }

      // Complete multipart upload
      const completeResponse = await completeUploadMutation.mutateAsync({
        bucket,
        key,
        uploadId,
        parts
      });

      onChange(completeResponse.url);
      setUploading(false);
      setUploadProgress(0);
      toast.success("File uploaded successfully!");

    } catch (error) {
      // Abort multipart upload on error
      if (uploadId && key && bucket) {
        try {
          await abortUploadMutation.mutateAsync({
            bucket,
            key,
            uploadId
          });
        } catch (abortError) {
          console.error("Failed to abort multipart upload:", abortError);
        }
      }

      toast.error("Upload failed", {
        description: error instanceof Error ? error.message : "Please try again or contact support."
      });
      setUploading(false);
      setUploadProgress(0);
      throw error;
    }
  };

  const handleCopyUrl = async () => {
    if (value) {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      toast.success("Image URL copied to clipboard!");
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="space-y-4">
      {value && (
        <Card className="p-4 bg-slate-50 border border-slate-200">
          <div className="flex items-start gap-4">
            <div className="relative">
              <img
                src={value}
                alt="Event poster preview"
                width={120}
                height={120}
                className="object-cover rounded-lg border border-slate-200"
              />
            </div>

            <div className="flex-1 space-y-2">
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium text-green-700">✓ Image uploaded successfully</span>
              </div>

              <div className="p-2 bg-white border border-slate-200 rounded text-xs font-mono text-slate-700 break-all">
                {value}
              </div>

              <div className="flex gap-2">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={handleCopyUrl}
                  className="text-slate-600"
                >
                  {copied ? <Check className="w-3 h-3 mr-1" /> : <Copy className="w-3 h-3 mr-1" />}
                  {copied ? 'Copied!' : 'Copy URL'}
                </Button>

                {onRemove && (
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={onRemove}
                    className="text-red-600 hover:text-red-700"
                  >
                    <X className="w-3 h-3 mr-1" />
                    Remove
                  </Button>
                )}
              </div>
            </div>
          </div>
        </Card>
      )}

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileSelect}
        className="hidden"
      />

      <Button
        type="button"
        variant={value ? "outline" : "default"}
        onClick={handleUploadClick}
        disabled={uploading}
        className="w-full h-12"
      >
        {uploading ? (
          <>
            <div className="w-4 h-4 mr-2 border-2 border-current border-t-transparent animate-spin rounded-full" />
            {compressionStatus || (uploadProgress > 0 ? `Uploading... ${Math.round(uploadProgress)}%` : 'Uploading...')}
          </>
        ) : (
          <>
            {value ? <FileImage className="w-4 h-4 mr-2" /> : <Upload className="w-4 h-4 mr-2" />}
            {value ? 'Change Image' : 'Upload Event Poster'}
          </>
        )}
      </Button>

      <div className="text-xs text-slate-500">
        <p>• Supported formats: JPG, PNG, GIF, WebP</p>
        <p>• Maximum file size: 50MB</p>
        <p>• Recommended size: 1200x800px or 3:2 aspect ratio</p>
        <p>• Images over 2MB will be automatically compressed</p>
        <p>• Compression maintains quality while reducing file size</p>
      </div>
    </div>
  );
};
export default UploadMediaInline;