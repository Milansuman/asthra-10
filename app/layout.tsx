import '@/styles/globals.css';
import type { Metadata } from 'next';
import { manifestData } from './manifest';
import { Providers } from './providers';

export const metadata: Metadata = {
  ...manifestData,
  title: manifestData.name,
  icons: [{ rel: 'icon', url: '/favicon.ico' }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={'dark font-sans'}>
        {/* <div className="fixed top-0 left-0 z-[-1] h-screen w-screen bg-background">
          <video
            src={'/glass.mp4'}
            autoPlay={true}
            loop={true}
            muted={true}
            className="h-full w-full object-cover"
          />
        </div> */}
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
