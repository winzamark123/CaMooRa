import React from 'react';
import { Card } from '@/components/ui/card';
import { trpc } from '@/lib/trpc/client';
import Image from 'next/image';

interface ProfileCardProps {
  id: string;
}

export default function ProfileCard({ id }: ProfileCardProps) {
  const {
    data: user_profile,
    isLoading,
    error,
  } = trpc.profile.getProfile.useQuery({ clerkId: id });

  const { data: user_images, isLoading: isLoadingImages } =
    trpc.images.getAllImages.useQuery({ clerkId: id });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (!user_profile) {
    return <div>No Profile Available for this User</div>;
  }

  return (
    <Card className="flex h-80 flex-col justify-end gap-2 rounded-2xl border-slate-400 p-6">
      {isLoadingImages && <div>Loading Images...</div>}
      {user_images && user_images.length > 0 && (
        <Image
          className="rounded-xl object-cover"
          src={user_images[0].url}
          alt="profile"
          fill
          style={{
            filter: 'brightness(0.65)',
          }}
        />
      )}
      <div className="z-10 flex gap-2  text-white">
        <p>{user_profile.firstName}</p>
        <p>{user_profile.lastName}</p>
      </div>
    </Card>
  );
}
