"use client"

import { ArrowUp, Check, Copy, Upload, ImageIcon, Plus } from 'lucide-react';
import Image from 'next/image';
import { Suspense, useState } from 'react';
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert";
import { Button } from '@/components/ui/button';
import { Card, CardFooter, CardHeader, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import UploadImage from '../_components/upload-media';
import { useSearchParams } from 'next/navigation';
import UploadEdit from "./_components/upload-edit";
import { uploadBase64ToS3 } from '@/lib/upload-utils';

const Home = () => {
  const [url, setUrl] = useState<string | undefined>(undefined);
  const [copy, setCopy] = useState<boolean>(false);
  const [uploading, setUploading] = useState<boolean>(false);
  const [progress, setProgress] = useState<number>(0);

  return (
    <>
      <Suspense fallback={<div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>}>
        <SearchParamsComponent
          setUrl={setUrl}
          copy={copy}
          setCopy={setCopy}
          url={url}
          uploading={uploading}
          setUploading={setUploading}
          progress={progress}
          setProgress={setProgress}
        />
      </Suspense>
    </>
  );
};

const SearchParamsComponent = ({
  setUrl,
  copy,
  setCopy,
  url,
  uploading,
  setUploading,
  progress,
  setProgress
}: {
  setUrl: React.Dispatch<React.SetStateAction<string | undefined>>,
  copy: boolean,
  setCopy: React.Dispatch<React.SetStateAction<boolean>>,
  url?: string,
  uploading: boolean,
  setUploading: React.Dispatch<React.SetStateAction<boolean>>,
  progress: number,
  setProgress: React.Dispatch<React.SetStateAction<number>>
}) => {
  const searchParams = useSearchParams();
  const [uploadComplete, setUploadComplete] = useState(false);

  const handleUploadSuccess = (newUrl: string) => {
    setUrl(newUrl);
    setUploadComplete(true);
  };

  const handleAddAnother = () => {
    setUrl(undefined);
    setUploadComplete(false);
    setCopy(false);
  };

  return (
    <>
        <UploadEdit
          id={searchParams.get("id")!}
          uploading={uploading}
          setUploading={setUploading}
          progress={progress}
          setProgress={setProgress}
        />
    </>
  );
};

export default Home;