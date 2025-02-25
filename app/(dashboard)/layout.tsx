import Dock, { type DockItemData } from '@/components/madeup/Dock';

const Items: DockItemData[] = [
  {
    link: "/",
    label: "Home",
  },
  {
    link: "/dashboard",
    label: "Passes",
  },
  {
    link: "/dashboard/events",
    label: "Events",
  },
  {
    link: "/dashboard/events/edit",
    label: "Edit Events",
  }
]

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="bg-blue-700 min-h-screen">
    {children}
    <Dock items={Items} className='z-0' />
  </div>;
}
