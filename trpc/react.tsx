"use client";

import {
  QueryCache,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";

import { SessionProvider, getCsrfToken, getSession } from "next-auth/react";

import { createTRPCReact } from "@trpc/react-query";
import { useState } from "react";
import { toast } from "sonner";

import type { AppRouter } from "@/server/api/root";
import { TRPCError } from "@trpc/server";
import { links } from "./vanila";

const createQueryClient = () =>
  new QueryClient({
    queryCache: new QueryCache({
      onError: (error) => {
        if (error instanceof TRPCError) {
          toast.error(error.code, {
            description: error.message,
          });
        }
      },
    }),
  });

let clientQueryClientSingleton: QueryClient | undefined;
const getQueryClient = () => {
  if (typeof window === "undefined") {
    // Server: always make a new query client
    return createQueryClient();
  }
  // Browser: use singleton pattern to keep the same query client
  // biome-ignore lint/suspicious/noAssignInExpressions: <explanation>
  return (clientQueryClientSingleton ??= createQueryClient());
};

export const api = createTRPCReact<AppRouter>();

export function TRPCReactProvider(props: { children: React.ReactNode }) {
  const queryClient = getQueryClient();

  const [trpcClient] = useState(() =>
    api.createClient({
      links,
    }),
  );

  return (
    <SessionProvider>
      <QueryClientProvider client={queryClient}>
        <api.Provider client={trpcClient} queryClient={queryClient}>
          {props.children}
        </api.Provider>
      </QueryClientProvider>
    </SessionProvider>
  );
}
