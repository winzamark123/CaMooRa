'use client';

import { useUser } from '@clerk/nextjs';
import { trpc } from '@/lib/trpc/client';
import { usePathname } from 'next/navigation';

export default function Page() {
  const { isSignedIn, user: currentUser } = useUser();
  const pathname = usePathname();
  const clerkId = pathname.split('/').pop() || '';

  if (!isSignedIn) {
    return <div>Sign in to view your saved photographers</div>;
  }

  if (clerkId !== currentUser.id) {
    return <div>Unauthorized</div>;
  }

  const { data, isLoading, error } =
    trpc.user.getFavoritePhotographers.useQuery({ clerkId });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div>
      <h2>Favorite Photographers</h2>
      <ul>
        {data?.map((photographer) => (
          <li key={photographer.clerkId}>{photographer.clerkId}</li>
        ))}
      </ul>
    </div>
  );
}
