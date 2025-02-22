import '@/styles/globals.css';

import type { Metadata } from 'next';
import { manifestData } from './manifest';
import { Providers } from './providers';

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
      <body className={'text-white ambit relative font-sans overflow-x-hidden'}>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
