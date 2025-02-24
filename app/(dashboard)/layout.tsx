export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="bg-blue-700">{children}</div>;
}
