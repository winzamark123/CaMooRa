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
    <Card className="flex border-black p-8">
      <div className="flex flex-col border-r-2">
        <p>{user_profile.firstName}</p>
        <p>{user_profile.lastName}</p>
        <p>{user_profile.profilePicURL}</p>
      </div>
      {isLoadingImages && <div>Loading Images...</div>}
      <div className="flex gap-4 p-8">
        {user_images?.map((image) => (
          <div
            className="relative aspect-square w-32 border border-black"
            key={image}
          >
            <Image
              className="h-24 w-24 object-cover"
              src={image}
              alt="profile"
              fill
            />
          </div>
        ))}
      </div>
    </Card>
  );
}
