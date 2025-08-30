'use client';

import { useState, useRef } from 'react';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import { Upload } from 'lucide-react';
import { api } from '@/trpc/react';

type UploadMediaProps = {
  setUrl: React.Dispatch<React.SetStateAction<string | undefined>>;
};

const UploadImage: React.FC<UploadMediaProps> = ({ setUrl }) => {
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const uploadMutation = api.upload.uploadImage.useMutation({
    onSuccess: (result) => {
      setUrl(result.url);
      toast.success("Image uploaded successfully!");
      setUploading(false);
    },
    onError: (error) => {
      toast.error("Upload failed", {
        description: error.message || "Please try again or contact support."
      });
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

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <>
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileSelect}
        className="hidden"
      />

      <Button
        onClick={handleUploadClick}
        disabled={uploading}
        className="w-full"
      >
        {uploading ? (
          <>
            <div className="w-4 h-4 mr-2 border-2 border-current border-t-transparent animate-spin rounded-full" />
            Uploading...
          </>
        ) : (
          <>
            <Upload className="w-4 h-4 mr-2" />
            Upload Image
          </>
        )}
      </Button>
    </>
  );
};

export default UploadImage;
