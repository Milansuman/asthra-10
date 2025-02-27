import Dock, { type DockItemData } from '@/components/madeup/Dock';

const Items: DockItemData[] = [
  {
    link: "/",
    label: "Home",
  },
  {
    link: "/dashboard",
    label: "Dashboard",
  },
  {
    link: "/dashboard/events",
    label: "Events",
  },
  {
    link: "/dashboard/upload",
    label: "Upload",
  },
  {
    link: "/dashboard/events/edit",
    label: "Edit Events",
  },
  {
    link: "/dashboard/attendance",
    label: "Attendance Scan",
  },
  // {
  //   link: "/dashboard/desk",
  //   label: "Desk",
  // },
  // {
  //   link: "/dashboard/desk/scan",
  //   label: "Desk Scan",
  // }
]

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="bg-[url(/spline-backup.png)] bg-blend-soft-light bg-black/70 min-h-screen flex">
    {children}
    <Dock items={Items} className='z-0' />
  </div>;
}
