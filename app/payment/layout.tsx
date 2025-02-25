export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <main className="z-10 relative bg-[url(/spline-backup.png)] bg-[#d5e7ff]">
        {children}
      </main>
    </>
  );
}
