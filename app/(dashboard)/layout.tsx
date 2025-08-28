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
  // {
  //   link: "/dashboard/events/edit",
  //   label: "Edit Events",
  // },
  {
    link: "/dashboard/users",
    label: "User-Manage"
  },
  // {
  //   link: "/dashboard/attendence",
  //   label: "Attendence",
  // },
  {
    link: "/dashboard/desk",
    label: "Desk-Participants",
  },
  {
    link: "/dashboard/desk/scan",
    label: "Spot Registration",
  },
  {
    link: "/dashboard/order",
    label: "Payment Resolver",
  },
]

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="min-h-screen overflow-y-auto overflow-x-hidden pb-24 bg-white text-black">
    {children}
    <Dock items={Items} className='z-0' />
  </div>;
}
