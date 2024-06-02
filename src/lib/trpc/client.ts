// THIS IS THE CLIENT SIDE WHICH CALLS THE ENDPOINT
import { createTRPCReact } from '@trpc/react-query';
import type { AppRouter } from '@/server';

export const trpc = createTRPCReact<AppRouter>();
