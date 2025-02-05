import '@/styles/globals.css';
import { Providers } from './providers';

export const metadata = {
  title: 'Asthra 9.0',
  description:
    "Asthra - The national level technical fest of St. Joseph's College of Engineering and Technology, Palai, framed with a vision to explore the possibilities of tomorrow.",
  icons: [{ rel: 'icon', url: '/favicon.ico' }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={'dark font-sans'}>
        <div className="fixed top-0 left-0 z-[-1] h-screen w-screen bg-background">
          <video
            src={'/glass.mp4'}
            autoPlay={true}
            loop={true}
            muted={true}
            className="h-full w-full object-cover"
          />
        </div>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
