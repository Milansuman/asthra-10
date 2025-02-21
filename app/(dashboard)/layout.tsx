import '@/styles/globals.css';
import type { Metadata } from 'next';
import { manifestData } from '@/app/(main)/manifest';
import { Providers } from '../(main)/providers';

export const metadata: Metadata = {
  ...manifestData,
  title: manifestData.name,
  icons: [{ rel: 'icon', url: '/favicon.ico' }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={'dark ambit relative font-sans bg-neutral-800'}>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
