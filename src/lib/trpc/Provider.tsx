// THIS WRAPS ALL REACT COMPONENT TO CALL THE
// ENDPOINT AND PROVIDE THE DATA FOR ALL COMPONENTS
'use client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { httpBatchLink } from '@trpc/client';
import React, { useState } from 'react';

import { trpc } from './client';

export default function Provider({ children }: { children: React.ReactNode }) {
  if (!process.env.NEXT_PUBLIC_TRPC_URL) {
    throw new Error('Please add NEXT_PUBLIC_TRPC_URL to .env.local');
  }

  const [queryClient] = useState(() => new QueryClient({}));
  const [trpcClient] = useState(
    trpc.createClient({
      links: [
        httpBatchLink({
          url: process.env.NEXT_PUBLIC_TRPC_URL,
        }),
      ],
    })
  );
  return (
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </trpc.Provider>
  );
}
