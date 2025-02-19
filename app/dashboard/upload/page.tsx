"use client"

import { ArrowUp, Check, Copy } from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert";
import { Button } from '@/components/ui/button';
import { Card, CardFooter, CardHeader, CardContent } from '@/components/ui/card';
import UploadImage from '../_components/upload-media';

const Home = () => {
  const [url, setUrl] = useState<string | undefined>(undefined);
  const [copy, setCopy] = useState<boolean>(false);
  return (
    <div className='conatiner flex justify-center items-center min-h-[70vh] cal'>
      <Card className='flex flex-col gap-10'>
        {url && <CardHeader>
          <Image src={url} alt="" className='w-full' width={600} height={600} />
        </CardHeader>}
        <CardContent>
          <UploadImage setUrl={setUrl} />
        </CardContent>
        <CardFooter className='flex flex-col gap-5'>
          {url && <Alert className='flex gap-3'>
            <Button size={'icon'} className='gap-3 rounded-s' onClick={async () => {
              await navigator.clipboard.writeText(url);
              setCopy(true)
            }}>
              {!copy ? <Copy /> : <Check />}
            </Button>

            <div>
              <AlertTitle>{!copy ? "Copy" : "Copied"}</AlertTitle>
              <AlertDescription>
                {url}
              </AlertDescription>
            </div>
          </Alert>}
          <Alert className=''>
            <ArrowUp className="h-4 w-4" />
            <AlertTitle>Dont forget to copy!</AlertTitle>
            <AlertDescription>
              Upload your image and Add this link in poster section before creating/editing events
            </AlertDescription>
          </Alert>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Home;