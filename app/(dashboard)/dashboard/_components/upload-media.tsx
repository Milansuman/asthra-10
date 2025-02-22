'use client';


import { FC, useState } from 'react';

//@ts-ignore
import { CldImage, CldUploadWidget, type CldUploadWidgetInfo } from 'next-cloudinary';

import { Button } from '@/components/ui/button';
import { env } from '@/env';

interface Widget {
  close: () => void;
}

function mbToBytes(mb: number): number {
  const bytesInMegabyte = 1024 * 1024;
  const bytes = mb * bytesInMegabyte;
  return bytes;
}

type UploadMediaProps = {
  setUrl: React.Dispatch<React.SetStateAction<string | undefined>>;
};

const UploadImage:React.FC<UploadMediaProps> = ({setUrl }) => {
  const [id, setId] = useState<CldUploadWidgetInfo['public_id']>();
  return (
      <CldUploadWidget
        options={{
          sources: ["local", "google_drive", "url"],
          folder: 'posters',
          maxImageFileSize: mbToBytes(8), //8 mb max image size
          maxVideoFileSize: mbToBytes(5), //5 mb max video size
          multiple: false,
          maxFiles: 1,
        }}
        uploadPreset={env.NEXT_PUBLIC_CLOUDINARY_CLOUD_PRESET}
        onSuccess={(result, { widget }: { widget: Widget }) => {
          if (result?.info) {
            const url = result?.info as CldUploadWidgetInfo;
            setId(url.public_id);
            setUrl(url.url);
          }
          widget.close();
        }}
      >
        {({ open }) => {
          function handleOnClick() {
            open();
          }
          return (<Button onClick={handleOnClick}>Upload Image</Button>)
        }}
      </CldUploadWidget>
  );
};

export default UploadImage;