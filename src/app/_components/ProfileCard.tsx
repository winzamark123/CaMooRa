import React from 'react';
import { Card } from '@/components/ui/card';
import { trpc } from '@/lib/trpc/client';
import { PhotoImage } from '@/components/PhotoImage';

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
    <Card className="flex flex-col justify-end sm:rounded-2xl sm:border-slate-400">
      {isLoadingImages && <div>Loading Images...</div>}
      {user_images && user_images.length > 0 && (
        <PhotoImage src={user_images[0].url} alt="profile" />
      )}
      <div className="absolute z-10 flex gap-2 p-6  text-white">
        <p>{user_profile.firstName}</p>
        <p>{user_profile.lastName}</p>
      </div>
    </Card>
  );
}
