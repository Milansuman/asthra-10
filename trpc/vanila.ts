import type { AppRouter } from '@/server/api/root';
import { createTRPCClient } from '@trpc/client';
import { loggerLink, httpBatchLink } from '@trpc/client';
import SuperJSON from 'superjson';

export const links = [
  loggerLink({
    enabled: (op) =>
      process.env.NODE_ENV === 'development' ||
      (op.direction === 'down' && op.result instanceof Error),
  }),
  httpBatchLink({
    transformer: SuperJSON,
    url: `${getBaseUrl()}/api/trpc`,
    headers: () => {
      const headers = new Headers();
      headers.set('x-trpc-source', 'nextjs-react');
      return headers;
    },
  }),
];

function getBaseUrl() {
  if (typeof window !== 'undefined') return window.location.origin;
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`;
  return `http://localhost:${process.env.PORT ?? 3000}`;
}

export const api = createTRPCClient<AppRouter>({
  links,
});
