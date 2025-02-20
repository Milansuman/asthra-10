'use client';

import Image from 'next/image';
import { useState } from 'react';

import { api } from '@/trpc/react';
import { ArrowUp, Check, CheckCheck } from 'lucide-react';

import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from '@/components/ui/card';
import UploadImage from '../../_components/upload-media';

const Home = async ({ params }: { params: Promise<{ id: string }> }) => {
  const [url, setUrl] = useState<string | undefined>(undefined);
  const [copy, setCopy] = useState<boolean>(false);
  const { mutateAsync: uploadMedia, isPending: payLoading } =
    api.event.uploadEventImage.useMutation();

  const { id } = await params;

  return (
    <div className="conatiner flex justify-center items-center min-h-[70vh] cal">
      <Card className="flex flex-col gap-10">
        {url && (
          <CardHeader>
            <Image
              src={url}
              alt=""
              className="w-full"
              width={600}
              height={600}
            />
          </CardHeader>
        )}
        <CardContent>
          <UploadImage setUrl={setUrl} />
        </CardContent>
        <CardFooter className="flex flex-col gap-5">
          {url && (
            <Alert className="flex gap-3">
              <Button
                size={'icon'}
                className="gap-3 rounded-s"
                onClick={async () => {
                  await uploadMedia({
                    id: id,
                    poster: url,
                  });
                  setCopy(true);
                }}
              >
                {!copy ? <Check /> : <CheckCheck />}
              </Button>

              <div>
                <AlertTitle>{!copy ? 'Confirm' : 'Confirmed'}</AlertTitle>
                {/* <AlertDescription>{url}</AlertDescription> */}
              </div>
            </Alert>
          )}
          <Alert className="">
            <ArrowUp className="h-4 w-4" />
            <AlertTitle>Dont forget to confirm after uploading!</AlertTitle>
            <AlertDescription>
              Upload your image verify the poster then confirm to set the image
              as posters{' '}
            </AlertDescription>
          </Alert>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Home;
