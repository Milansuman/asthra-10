"use client"

import { ArrowUp, Check, Copy } from 'lucide-react';
import Image from 'next/image';
import { Suspense, useState } from 'react';
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert";
import { Button } from '@/components/ui/button';
import { Card, CardFooter, CardHeader, CardContent } from '@/components/ui/card';
import UploadImage from '../_components/upload-media';
import { useSearchParams } from 'next/navigation';
import UploadEdit from "./_components/upload-edit";

const Home = () => {
  const [url, setUrl] = useState<string | undefined>(undefined);
  const [copy, setCopy] = useState<boolean>(false);
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900">Media Upload</h1>
          <p className="text-slate-600 mt-1">Upload and manage media files for events</p>
        </div>
      </div>

      <Suspense fallback={
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-8">
          <div className="flex items-center justify-center">
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-slate-900"></div>
            <span className="ml-2 text-slate-600">Loading...</span>
          </div>
        </div>
      }>
        <SearchParamsComponent setUrl={setUrl} copy={copy} setCopy={setCopy} url={url} />
      </Suspense>
    </div>
  );
};

const SearchParamsComponent = ({ setUrl, copy, setCopy, url }: { setUrl: React.Dispatch<React.SetStateAction<string | undefined>>, copy: boolean, setCopy: React.Dispatch<React.SetStateAction<boolean>>, url?: string }) => {
  const searchParams = useSearchParams();
  return (
    <>
      {
        searchParams.get("id") ? <UploadEdit id={searchParams.get("id")!} /> :
          <div className="bg-white rounded-xl shadow-sm border border-slate-200">
            <div className="p-6">
              {url && (
                <div className="mb-6">
                  <div className="relative">
                    <Image
                      src={url}
                      alt="Uploaded media"
                      className="mx-auto max-h-96 w-auto rounded-lg shadow-sm"
                      width={600}
                      height={600}
                    />
                  </div>
                </div>
              )}

              <div className="space-y-6">
                <UploadImage setUrl={setUrl} />

                {url && (
                  <Alert className="bg-green-50 border-green-200">
                    <div className="flex items-center gap-3">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={async () => {
                          await navigator.clipboard.writeText(url);
                          setCopy(true)
                        }}
                        className="shrink-0"
                      >
                        {!copy ? <Copy className="w-4 h-4" /> : <Check className="w-4 h-4" />}
                        {!copy ? "Copy URL" : "Copied!"}
                      </Button>

                      <div className="flex-1">
                        <AlertTitle className="text-green-800">{!copy ? "Media Uploaded Successfully" : "URL Copied!"}</AlertTitle>
                        <AlertDescription className="text-green-700 text-sm font-mono">
                          {url}
                        </AlertDescription>
                      </div>
                    </div>
                  </Alert>
                )}

                <Alert className="bg-blue-50 border-blue-200">
                  <ArrowUp className="h-4 w-4 text-blue-600" />
                  <AlertTitle className="text-blue-800">Upload Instructions</AlertTitle>
                  <AlertDescription className="text-blue-700">
                    Upload your image and copy the link to use in the poster section when creating or editing events
                  </AlertDescription>
                </Alert>
              </div>
            </div>
          </div>
      }
    </>
  );
};

export default Home;
