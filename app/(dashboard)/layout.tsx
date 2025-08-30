import Sidebar from '@/components/madeup/Sidebar';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 text-slate-900 flex w-screen overflow-hidden">
      <Sidebar />
      <main className="flex-1 flex flex-col min-h-screen overflow-auto">
        <div className="flex-1 flex flex-col p-6 md:p-8 overflow-auto">
          {children}
        </div>
      </main>
    </div>
  );
}
