'use client';
import Profile from '@/components/Profile/Profile';
import { trpc } from '@/lib/trpc/client';
import { usePathname } from 'next/navigation';
import UploadingImageButton from '@/components/Profile/UploadImageButton';

export default function Page() {
  const pathname = usePathname();
  const uid = pathname.split('/').pop() || '';

  const { data, isLoading, error } = trpc.profile.getProfile.useQuery({
    clerkId: uid,
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
      <Profile clerkId={uid} />
      <UploadingImageButton clerkId={uid} />
    </main>
  );
}
