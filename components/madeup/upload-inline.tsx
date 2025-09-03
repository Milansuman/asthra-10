'use client';

import { FC, useState, useRef } from 'react';
import Image from 'next/image';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Upload, X, Check, Copy, FileImage } from 'lucide-react';
import { api } from '@/trpc/react';

type UploadMediaInlineProps = {
  value?: string;
  onChange: (url: string) => void;
  onRemove?: () => void;
};

const UploadMediaInline: React.FC<UploadMediaInlineProps> = ({ value, onChange, onRemove }) => {
  const [uploading, setUploading] = useState(false);
  const [copied, setCopied] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const uploadMutation = api.upload.uploadImage.useMutation({
    onSuccess: (result) => {
      onChange(result.url);
      // toast.success("Image uploaded successfully!");
      setUploading(false);
    },
    onError: (error) => {
      // toast.error("Upload failed", {
      //   description: error.message || "Please try again or contact support."
      // });
      setUploading(false);
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

    // Validate file size (8MB max)
    const maxSize = 8 * 1024 * 1024; // 8MB in bytes
    if (file.size > maxSize) {
      toast.error("File too large", {
        description: "Please select an image smaller than 8MB."
      });
      return;
    }

    setUploading(true);

    try {
      // Convert file to base64
      const reader = new FileReader();
      reader.onload = () => {
        const dataUrl = reader.result as string;
        uploadMutation.mutate({
          dataUrl,
          bucketName: 'posters'
        });
      };
      reader.onerror = () => {
        toast.error("Failed to read file");
        setUploading(false);
      };
      reader.readAsDataURL(file);
    } catch (error) {
      toast.error("Upload failed", {
        description: "An error occurred while processing the file."
      });
      setUploading(false);
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
              <Image
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
            Uploading...
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
        <p>• Maximum file size: 8MB</p>
        <p>• Recommended size: 1200x800px or 3:2 aspect ratio</p>
      </div>
    </div>
  );
};

export default UploadMediaInline;
