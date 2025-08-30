import Sidebar from '@/components/madeup/Sidebar';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 text-slate-900 flex flex-row w-screen overflow-hidden">
      <Sidebar />
      <main className="min-h-screen w-full overflow-auto">
        <div className="p-6 md:p-8 h-full overflow-auto flex w-full">
          {children}
        </div>
      </main>
    </div>
  );
}
