import '@/styles/globals.css';
import Footer from '@/components/madeup/footer';
import { SplineViewer } from '@/components/madeup/spline-viewer';
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
      <body className={'dark ambit font-sans relative'}>
        <div className="fixed top-0 left-0 h-screen w-screen">
          <SplineViewer
            url="https://prod.spline.design/2GLk35LgytPBcf1w/scene.splinecode"
            className="relative h-full w-full bg-[#7ab1e1]"
          />
        </div>
        {/* <video
            src={'/glass.mp4'}
            autoPlay={true}
            loop={true}
            muted={true}
            className="h-full w-full object-cover"
          />
        </div> */}
        {/* <PointerWrapper> */}
        <Providers>
          {children}
          <Footer />
        </Providers>
        {/* </PointerWrapper> */}

      </body>
    </html>
  );
}
