import Sidebar from '@/components/madeup/Sidebar';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-white text-black flex">
      <Sidebar />
      <main className="flex-1 md:ml-80 overflow-y-auto">
        {children}
      </main>
    </div>
  );
}
