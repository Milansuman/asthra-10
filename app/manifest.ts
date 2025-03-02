import type { MetadataRoute } from 'next';

export const manifestData = {
  name: 'Asthra 9.0',
  description:
    "Asthra - The national level technical fest of St. Joseph's College of Engineering and Technology, Palai, framed with a vision to explore the possibilities of tomorrow.",
} satisfies MetadataRoute.Manifest;

export default function manifest(): MetadataRoute.Manifest {
  return {
    ...manifestData,
    short_name: 'Asthra',
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#000000',
    // icons: [
    //   {
    //     src: '/icon-192x192.png',
    //     sizes: '192x192',
    //     type: 'image/png',
    //   },
    //   {
    //     src: '/icon-512x512.png',
    //     sizes: '512x512',
    //     type: 'image/png',
    //   },
    // ],
  };
}
