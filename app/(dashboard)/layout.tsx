import Dock, { type DockItemData } from '@/components/madeup/Dock';

const Items: DockItemData[] = [
  // {
  //   link: "/",
  //   label: "Home",
  // },
  {
    link: "/dashboard",
    label: "Dashboard",
  },
  {
    link: "/dashboard/events",
    label: "Events",
  },
  // {
  //   link: "/dashboard/upload",
  //   label: "Upload",
  // },
  {
    link: "/dashboard/events/edit",
    label: "Edit Events",
  },
  {
    link: "/dashboard/users",
    label: "User-Manage"
  },
  {
    link: "/dashboard/attendence",
    label: "Attendence",
  },
  {
    link: "/dashboard/desk",
    label: "Desk-Participants",
  },
  {
    link: "/dashboard/desk/scan",
    label: "Spot Registration",
  },
]

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="bg-[url(/spline-backup-dark.png)] bg-blend-soft-light bg-black/70 h-screen overflow-auto pb-24">
    {children}
    <Dock items={Items} className='z-0' />
  </div>;
}
