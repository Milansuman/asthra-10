export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="min-h-screen flex flex-col justify-center gap-4">
            <div className="flex flex-col md:flex-row gap-4 container items-start py-4">
                {children}
            </div>
        </div>
    )
}