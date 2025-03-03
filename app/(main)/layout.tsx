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
      <div className="fixed top-0 left-0 h-screen w-screen -z-10">
        {/* <video
            src={'/glass.mp4'}
            autoPlay={true}
            loop={true}
            muted={true}
            className="h-full w-full object-cover"
          />*/}
        {isMobileDevice() ?
          <div className="relative h-full w-full bg-[url(/spline-backup-dark-mobile.png)] bg-blend-soft-light bg-black/10" /> :
          <SplineViewer
            url="https://prod.spline.design/eeFdLAQHPt2utu3p/scene.splinecode"
            className="relative h-full w-full bg-[url(/spline-backup-dark.png)] bg-black/60"
          />}
      </div>
      <main className="relative overflow-y-auto h-screen">
        {children}
        <Footer />
      </main>
      <Dock items={Items} />
    </>
  );
}
