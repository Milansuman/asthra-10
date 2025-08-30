'use client';

import Image from 'next/image';
import { useState } from 'react';

import { api } from '@/trpc/react';
import { ArrowUp, Check, CheckCheck, ImageIcon } from 'lucide-react';

import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import UploadImage from '../../_components/upload-media';

const UploadEdit = ({
  id,
  uploading,
  setUploading,
  progress,
  setProgress
}: {
  id: string;
  uploading: boolean;
  setUploading: React.Dispatch<React.SetStateAction<boolean>>;
  progress: number;
  setProgress: React.Dispatch<React.SetStateAction<number>>;
}) => {
  const [url, setUrl] = useState<string | undefined>(undefined);
  const [confirmed, setConfirmed] = useState<boolean>(false);
  const { mutateAsync: uploadMedia, isPending: payLoading } =
    api.event.uploadEventImage.useMutation();

  return (
    <div className="container flex justify-center items-center min-h-[70vh] py-8">
      <Card className="w-full max-w-2xl shadow-lg">
        <CardHeader className="pb-4">
          <h2 className="text-2xl font-bold text-center">Update Event Poster</h2>
          <p className="text-muted-foreground text-center">
            Upload a new image for your event
          </p>
        </CardHeader>

        <CardContent className="space-y-6 p-6">
          {uploading && (
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Uploading...</span>
                <span>{progress}%</span>
              </div>
              <Progress value={progress} className="h-2" />
            </div>
          )}

          {url ? (
            <div className="rounded-lg border-2 border-dashed p-4 flex justify-center">
              <Image
                src={url}
                alt="Preview"
                className="w-full max-h-96 object-contain rounded-lg"
                width={600}
                height={600}
              />
            </div>
          ) : (
            <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-8 text-center">
              <ImageIcon className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
              <p className="text-muted-foreground mb-4">
                Drag and drop your image here or click to browse
              </p>
              <UploadImage
                setUrl={setUrl}
                setUploading={setUploading}
                setProgress={setProgress}
              />
            </div>
          )}
        </CardContent>

        <CardFooter className="flex flex-col gap-4 p-6 pt-0">
          {url && (
            <Alert className="bg-muted/50">
              <div className="flex items-start gap-3">
                <Button
                  size={'icon'}
                  className="rounded-full flex-shrink-0"
                  onClick={async () => {
                    await uploadMedia({
                      id: id,
                      poster: url,
                    });
                    setConfirmed(true);
                    setTimeout(() => setConfirmed(false), 2000);
                  }}
                  disabled={payLoading}
                >
                  {!confirmed ? <Check size={18} /> : <CheckCheck size={18} />}
                </Button>

                <div className="flex-1">
                  <AlertTitle className="text-sm mb-1">
                    {!confirmed ? "Confirm to update poster" : "Poster updated successfully!"}
                  </AlertTitle>
                  <AlertDescription className="text-xs">
                    {!confirmed
                      ? "Click the button to confirm this image as your event poster"
                      : "Your event poster has been updated successfully."
                    }
                  </AlertDescription>
                </div>
              </div>
            </Alert>
          )}

          <Alert variant="default" className="bg-primary/5 border-primary/10">
            <ArrowUp className="h-4 w-4 text-primary" />
            <AlertTitle className="text-primary">Don't forget to confirm!</AlertTitle>
            <AlertDescription className="text-primary/80">
              Verify the poster looks correct, then confirm to set it as your event poster
            </AlertDescription>
          </Alert>
        </CardFooter>
      </Card>
    </div>
  );
};

export default UploadEdit;