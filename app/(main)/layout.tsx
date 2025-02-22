import Footer from '@/components/madeup/footer';
import { SplineViewer } from '@/components/madeup/spline-viewer';
import Dock, { type DockItemData } from '@/components/madeup/Dock';
import { GlowArea } from '@/components/ui/glow';

const Items: DockItemData[] = [
  {
    link: "/",
    label: "Home",
  },
  {
    link: "/events",
    label: "Workshops & Events",
  },
  {
    link: "/asthra",
    label: "Asthra Pass",
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
      <div className="fixed top-0 left-0 h-screen w-screen">
        {/* <video
            src={'/glass.mp4'}
            autoPlay={true}
            loop={true}
            muted={true}
            className="h-full w-full object-cover"
          />*/}
        <SplineViewer
          url="https://prod.spline.design/2GLk35LgytPBcf1w/scene.splinecode"
          className="relative h-full w-full bg-[url(/spline-backup.png)] bg-[#7ab1e1]"
        />
      </div>
      <GlowArea>
      {children}
      <Dock items={Items} />
      <Footer />
      </GlowArea>
    </>
  );
}
