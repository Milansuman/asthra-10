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
    <>
      <Suspense fallback={<pre>loading</pre>}>
        <SearchParamsComponent setUrl={setUrl} copy={copy} setCopy={setCopy} url={url}/>
      </Suspense>
    </>
  );
};

const SearchParamsComponent = ({ setUrl, copy, setCopy, url }: { setUrl: React.Dispatch<React.SetStateAction<string | undefined>>, copy: boolean, setCopy: React.Dispatch<React.SetStateAction<boolean>>, url?: string }) => {
  const searchParams = useSearchParams();
  return (
    <>
      {
        searchParams.get("id") ? <UploadEdit id={searchParams.get("id")!}/> :
        <div className='conatiner flex justify-center items-center min-h-[70vh] cal h-screen'>
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
      }
    </>
  );
};

export default Home;