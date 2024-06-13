'use client';
import { trpc } from '@/lib/trpc/client';
import { usePathname } from 'next/navigation';

export default function Page() {
  const pathname = usePathname();
  const uid = pathname.split('/')[1];

  const { data, isLoading, error } = trpc.profile.getProfile.useQuery({
    userId: uid,
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }
  return (
    <main>
      <div className="flex flex-col">
        <h1>{data?.firstName}</h1>
        <h1>{data?.lastName}</h1>
        <h1>{data?.profilePicURL}</h1>
      </div>
    </main>
  );
}
