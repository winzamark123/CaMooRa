import React from 'react';
import { Card } from '@/components/ui/card';
import { trpc } from '@/lib/trpc/client';
import Image from 'next/image';
import UsernameProfilePic from './User/UsernameProfilePic';

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
    <Card className="flex flex-col gap-2 rounded-2xl border-slate-400 p-6">
      <UsernameProfilePic id={id} />
      {isLoadingImages && <div>Loading Images...</div>}
      <div className="flex gap-4 p-4">
        {user_images?.map((image, index) => (
          <div className="relative h-64 w-full" key={index}>
            <Image
              className="rounded-xl object-cover"
              src={image}
              alt="profile"
              fill
            />
          </div>
        ))}
      </div>
      <div className="flex justify-end">
        <p>View More</p>
      </div>
    </Card>
  );
}
