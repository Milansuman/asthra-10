"use client"

import Footer from '@/components/madeup/footer';
import { SplineViewer } from '@/components/madeup/spline-viewer';
import Dock, { type DockItemData } from '@/components/madeup/Dock';
import { isMobileDevice } from '@/hooks/mobile';
import { AsthraLoader } from '@/components/madeup/loading';

const Items: DockItemData[] = [
  {
    link: "/",
    label: "Home",
  },
  {
    link: "/events",
    label: "All Events",
  },
  {
    link: "/profile",
    label: "Profile",
  }
]

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  return (
    <>
      <div className="fixed top-0 left-0 h-screen bg-white w-screen -z-10 flex justify-center items-center">
        {/* <video
            src={'/.mp4'}
            autoPlay={true}
            loop={true}
            muted={true}
            className="h-full w-full object-cover"
          />*/}

      </div>
      <main className="relative overflow-y-auto h-screen overflow-x-hidden">
        {/* <AsthraLoader /> */}
        {children}
        {/* <Footer /> */}
      </main>
      {/* <Dock items={Items} /> */}
    </>
  );
}
