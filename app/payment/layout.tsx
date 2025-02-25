export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <main className="z-10 relative bg-[url(/spline-backup.png)] bg-blend-soft-light bg-black/70">
        {children}
      </main>
    </>
  );
}
