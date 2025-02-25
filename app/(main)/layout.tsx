"use client"

import Footer from '@/components/madeup/footer';
import { SplineViewer } from '@/components/madeup/spline-viewer';
import Dock, { type DockItemData } from '@/components/madeup/Dock';
import { isMobileDevice } from '@/hooks/mobile';

const Items: DockItemData[] = [
  {
    link: "/",
    label: "Home",
  },
  {
    link: "/asthra",
    label: "Asthra Pass",
  },
  {
    link: "/events",
    label: "Workshops & Events",
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
      <div className="fixed top-0 left-0 h-screen w-screen -z-1">
        {/* <video
            src={'/glass.mp4'}
            autoPlay={true}
            loop={true}
            muted={true}
            className="h-full w-full object-cover"
          />*/}
        {isMobileDevice() ?
          <div className="relative h-full w-full bg-[url(/spline-backup.png)] bg-[#d5e7ff]" /> :
          <SplineViewer
            url="https://prod.spline.design/2GLk35LgytPBcf1w/scene.splinecode"
            className="relative h-full w-full bg-[url(/spline-backup.png)] bg-[#d5e7ff]"
          />}
      </div>
      <main className="z-10 relative">
        {children}
        <Footer />
      </main>
      <Dock items={Items} />
    </>
  );
}
